package com.doyatama.university.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.doyatama.university.exception.BadRequestException;
import com.doyatama.university.exception.FileStorageException;
import com.doyatama.university.exception.ResourceNotFoundException;
import com.doyatama.university.model.ImageFileName;
import com.doyatama.university.model.Pengumuman;
import com.doyatama.university.payload.PagedResponse;
import com.doyatama.university.payload.Pengumuman.PengumumanRequest;
import com.doyatama.university.payload.Pengumuman.PengumumanResponse;
import com.doyatama.university.payload.pengumuman_file.PengumumanFileResponse;
import com.doyatama.university.property.FileStorageProperties;
import com.doyatama.university.repository.PengumumanRepository;
import com.doyatama.university.security.UserPrincipal;
import com.doyatama.university.util.AppConstants;

@Service
public class PengumumanService {
    @Autowired
    private PengumumanRepository pengumumanRepository;

    private final Path fileStorageLocation;

    public PengumumanService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Tidak dapat membuat direktori untuk menyimpan file yang diunggah.",
                    ex);
        }
    }

    public PagedResponse<PengumumanResponse> getAllPengumuman(int page, int size) {
        validatePageNumberAndSize(page, size);

        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "id");
        Page<Pengumuman> pengumuman = pengumumanRepository.findAll(pageable);
        if (pengumuman.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), pengumuman.getNumber(),
                    pengumuman.getSize(), pengumuman.getTotalElements(), pengumuman.getTotalPages(),
                    pengumuman.isLast(), 200);
        }

        List<PengumumanResponse> pengumumanResponses = pengumuman.map(asResponse -> {
            PengumumanResponse pengumumanResponse = new PengumumanResponse();
            pengumumanResponse.setId(asResponse.getId());
            pengumumanResponse.setName(asResponse.getName());

            List<PengumumanFileResponse> fileNameResponses = asResponse.getPengumumanImages().stream().map(fileName -> {
                PengumumanFileResponse response = new PengumumanFileResponse();
                response.setFileName(fileName.getFileName());
                response.setPengumuman(null); // Placeholder jika memang diperlukan
                response.setData(null); // Jika data file tidak ingin dikembalikan
                return response;
            }).collect(Collectors.toList());

            pengumumanResponse.setFileNames(fileNameResponses); // Menggunakan fileNameResponses
            pengumumanResponse.setFileType(asResponse.getFileType());

            return pengumumanResponse;
        }).getContent();

        return new PagedResponse<>(pengumumanResponses, pengumuman.getNumber(),
                pengumuman.getSize(), pengumuman.getNumberOfElements(), pengumuman.getTotalPages(), pengumuman.isLast(),
                200);
    }

    public Pengumuman createPengumuman(UserPrincipal currentUser,
            @Valid @RequestBody PengumumanRequest pengumumanRequest,
            @RequestParam("files") List<MultipartFile> files) throws IOException {
        Pengumuman pengumuman = new Pengumuman();
        pengumuman.setName(pengumumanRequest.getName());
        pengumuman.setFileType(files.isEmpty() ? null : files.get(0).getContentType());

        List<ImageFileName> imageFileNames = new ArrayList<>();
        for (MultipartFile file : files) {
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            ImageFileName imageFileName = new ImageFileName();
            imageFileName.setFileName(fileName);
            imageFileName.setPengumuman(pengumuman); // Hubungkan file dengan pengumuman
            imageFileName.setData(file.getBytes());
            imageFileNames.add(imageFileName);
        }
        pengumuman.setPengumumanImages(imageFileNames);

        return pengumumanRepository.save(pengumuman);
    }

    public PengumumanResponse getPengumumanById(Long pengumumanId) {
        Pengumuman pengumuman = pengumumanRepository.findById(pengumumanId)
                .orElseThrow(() -> new ResourceNotFoundException("Galeri", "id", pengumumanId));

        // Buat PengumumanResponse dan set properti
        PengumumanResponse pengumumanResponse = new PengumumanResponse();
        pengumumanResponse.setId(pengumuman.getId());
        pengumumanResponse.setName(pengumuman.getName());

        List<ImageFileName> fileNames = pengumuman.getPengumumanImages();
        List<PengumumanFileResponse> fileResponses = new ArrayList<>();
        for (ImageFileName fileName : fileNames) {
            PengumumanFileResponse response = new PengumumanFileResponse();
            response.setFileName(fileName.getFileName());
            response.setData(fileName.getData());
            fileResponses.add(response);
        }

        pengumumanResponse.setFileNames(fileResponses);
        ;
        pengumumanResponse.setFileType(pengumuman.getFileType());

        return pengumumanResponse;
    }

    @Transactional
    public Pengumuman updatePengumuman(@Valid PengumumanRequest pengumumanRequest, Long id,
            UserPrincipal currentUser,
            @RequestParam("files") List<MultipartFile> files) throws IOException {

        return pengumumanRepository.findById(id).map(pengumumans -> {
            // Update basic fields
            pengumumans.setName(pengumumanRequest.getName());
            pengumumans.setFileType(files.isEmpty() ? null : files.get(0).getContentType());

            // Buat daftar nama file baru
            List<String> newFileNames = files.stream()
                    .map(file -> StringUtils.cleanPath(file.getOriginalFilename()))
                    .toList();

            // Hapus file lama yang tidak ada dalam daftar file baru
            pengumumans.getPengumumanImages().removeIf(existingFile -> {
                boolean shouldRemove = !newFileNames.contains(existingFile.getFileName());
                if (shouldRemove) {
                    existingFile.setPengumuman(null); // Putuskan relasi dengan pengumuman
                }
                return shouldRemove;
            });

            // Tambahkan atau perbarui file baru
            for (MultipartFile file : files) {
                String fileName = StringUtils.cleanPath(file.getOriginalFilename());

                // Cari file dengan nama yang sama
                ImageFileName existingFile = pengumumans.getPengumumanImages().stream()
                        .filter(f -> f.getFileName().equals(fileName))
                        .findFirst()
                        .orElse(null);

                if (existingFile != null) {
                    // Update data file jika sudah ada
                    try {
                        existingFile.setData(file.getBytes());
                    } catch (IOException e) {
                        throw new RuntimeException("Failed to update file content for file: " + fileName, e);
                    }
                } else {
                    // Tambahkan file baru jika belum ada
                    ImageFileName newFile = new ImageFileName();
                    newFile.setFileName(fileName);
                    newFile.setPengumuman(pengumumans);
                    try {
                        newFile.setData(file.getBytes());
                    } catch (IOException e) {
                        throw new RuntimeException("Failed to read file content for file: " + fileName, e);
                    }
                    pengumumans.getPengumumanImages().add(newFile);
                }
            }

            return pengumumanRepository.save(pengumumans);
        }).orElseThrow(() -> new ResourceNotFoundException("Pengumuman", "id", id));
    }

    public void deletePengumumanById(Long id) {
        Optional<Pengumuman> pengumuman = pengumumanRepository.findById(id);
        if (pengumuman.isPresent()) {
            pengumumanRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("Pengumuman", "id", id);
        }
    }

    private void validatePageNumberAndSize(int page, int size) {
        if (page < 0) {
            throw new BadRequestException("Nomor halaman tidak boleh kurang dari nol.");
        }
        if (size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Ukuran halaman tidak boleh lebih besar dari " + AppConstants.MAX_PAGE_SIZE);
        }
    }

}
