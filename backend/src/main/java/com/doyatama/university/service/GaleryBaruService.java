package com.doyatama.university.service;

import com.doyatama.university.exception.BadRequestException;
import com.doyatama.university.exception.FileStorageException;
import com.doyatama.university.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.doyatama.university.model.GaleryBaru;
import com.doyatama.university.model.GaleryFileName;
import com.doyatama.university.payload.PagedResponse;
import com.doyatama.university.payload.file_name.FileNameResponse;
import com.doyatama.university.payload.galery_baru.GaleryBaruRequest;
import com.doyatama.university.payload.galery_baru.GaleryBaruResponse;
import com.doyatama.university.property.FileStorageProperties;
import com.doyatama.university.repository.GaleryBaruReposytory;
import com.doyatama.university.security.UserPrincipal;
import com.doyatama.university.util.AppConstants;

@Service
public class GaleryBaruService {

    @Autowired
    private GaleryBaruReposytory galeryBaruRepository;

    private final Path fileStorageLocation;

    @Autowired
    public GaleryBaruService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Tidak dapat membuat direktori untuk menyimpan file yang diunggah.",
                    ex);
        }
    }

    public PagedResponse<GaleryBaruResponse> getAllGaleryBaru(int page, int size) {
        validatePageNumberAndSize(page, size);

        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "id");
        Page<GaleryBaru> galeryBaru = galeryBaruRepository.findAll(pageable);
        if (galeryBaru.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), galeryBaru.getNumber(),
                    galeryBaru.getSize(), galeryBaru.getTotalElements(), galeryBaru.getTotalPages(),
                    galeryBaru.isLast(), 200);
        }

        List<GaleryBaruResponse> galeryBaruResponses = galeryBaru.map(asResponse -> {
            GaleryBaruResponse galeryBaruResponse = new GaleryBaruResponse();
            galeryBaruResponse.setId(asResponse.getId());
            galeryBaruResponse.setName(asResponse.getName());
            galeryBaruResponse.setDescription(asResponse.getDescription());

            List<GaleryFileName> fileNames = asResponse.getFileNames();
            List<FileNameResponse> fileNameResponses = new ArrayList<>();
            for (GaleryFileName fileName : fileNames) {
                FileNameResponse response = new FileNameResponse();
                response.setFileName(fileName.getFileName());
                fileNameResponses.add(response);
            }
            galeryBaruResponse.setFileNames(fileNameResponses); // Menggunakan fileNameResponses
            galeryBaruResponse.setFileType(asResponse.getFileType());

            return galeryBaruResponse;
        }).getContent();

        return new PagedResponse<>(galeryBaruResponses, galeryBaru.getNumber(),
                galeryBaru.getSize(), galeryBaru.getNumberOfElements(), galeryBaru.getTotalPages(), galeryBaru.isLast(),
                200);
    }

    public GaleryBaru createGaleryBaru(UserPrincipal currentUser,
            @Valid @RequestBody GaleryBaruRequest galeryBaruRequest,
            @RequestParam("files") List<MultipartFile> files) throws IOException {
        GaleryBaru galeryBaru = new GaleryBaru();
        galeryBaru.setName(galeryBaruRequest.getName());
        galeryBaru.setDescription(galeryBaruRequest.getDescription());
        galeryBaru.setFileType(files.isEmpty() ? null : files.get(0).getContentType());

        List<GaleryFileName> galeryFileNames = new ArrayList<>();
        for (MultipartFile file : files) {
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            GaleryFileName galeryFileName = new GaleryFileName();
            galeryFileName.setFileName(fileName);
            galeryFileName.setGallery(galeryBaru); // Hubungkan file dengan galeri
            galeryFileName.setData(file.getBytes());
            galeryFileNames.add(galeryFileName);
        }
        galeryBaru.setFileNames(galeryFileNames);

        return galeryBaruRepository.save(galeryBaru);
    }

    public GaleryBaruResponse getGaleryBaruById(Long galeryId) {
        GaleryBaru galeryBaru = galeryBaruRepository.findById(galeryId)
                .orElseThrow(() -> new ResourceNotFoundException("Galeri", "id", galeryId));

        // Buat GaleryBaruResponse dan set properti
        GaleryBaruResponse galeryBaruResponse = new GaleryBaruResponse();
        galeryBaruResponse.setId(galeryBaru.getId());
        galeryBaruResponse.setName(galeryBaru.getName());
        galeryBaruResponse.setDescription(galeryBaru.getDescription());

        List<GaleryFileName> fileNames = galeryBaru.getFileNames();
        List<FileNameResponse> fileNameResponses = new ArrayList<>();
        for (GaleryFileName fileName : fileNames) {
            FileNameResponse response = new FileNameResponse();
            response.setFileName(fileName.getFileName());
            response.setData(fileName.getData());
            fileNameResponses.add(response);
        }

        galeryBaruResponse.setFileNames(fileNameResponses);
        galeryBaruResponse.setFileType(galeryBaru.getFileType());

        return galeryBaruResponse;
    }

    @Transactional
    public GaleryBaru updateGaleryBaru(@Valid GaleryBaruRequest galeryBaruRequest, Long id,
            UserPrincipal currentUser,
            @RequestParam("files") List<MultipartFile> files) throws IOException {

        return galeryBaruRepository.findById(id).map(galeryBarus -> {
            // Update basic fields
            galeryBarus.setName(galeryBaruRequest.getName());
            galeryBarus.setDescription(galeryBaruRequest.getDescription());
            galeryBarus.setFileType(files.isEmpty() ? null : files.get(0).getContentType());

            // Buat daftar nama file baru
            List<String> newFileNames = files.stream()
                    .map(file -> StringUtils.cleanPath(file.getOriginalFilename()))
                    .toList();

            // Hapus file lama yang tidak ada dalam daftar file baru
            galeryBarus.getFileNames().removeIf(existingFile -> {
                boolean shouldRemove = !newFileNames.contains(existingFile.getFileName());
                if (shouldRemove) {
                    existingFile.setGallery(null); // Putuskan relasi dengan galeri
                }
                return shouldRemove;
            });

            // Tambahkan atau perbarui file baru
            for (MultipartFile file : files) {
                String fileName = StringUtils.cleanPath(file.getOriginalFilename());

                // Cari file dengan nama yang sama
                GaleryFileName existingFile = galeryBarus.getFileNames().stream()
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
                    GaleryFileName newFile = new GaleryFileName();
                    newFile.setFileName(fileName);
                    newFile.setGallery(galeryBarus);
                    try {
                        newFile.setData(file.getBytes());
                    } catch (IOException e) {
                        throw new RuntimeException("Failed to read file content for file: " + fileName, e);
                    }
                    galeryBarus.getFileNames().add(newFile);
                }
            }

            return galeryBaruRepository.save(galeryBarus);
        }).orElseThrow(() -> new ResourceNotFoundException("Galery", "id", id));
    }

    public void deleteGaleryBaruById(Long id) {
        Optional<GaleryBaru> galeryBaru = galeryBaruRepository.findById(id);
        if (galeryBaru.isPresent()) {
            galeryBaruRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("Galery", "id", id);
        }
    }

    // public void deleteMediaItem(Long mediaItemId) {
    // mediaItemRepository.deleteById(mediaItemId);
    // }

    private void validatePageNumberAndSize(int page, int size) {
        if (page < 0) {
            throw new BadRequestException("Nomor halaman tidak boleh kurang dari nol.");
        }
        if (size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Ukuran halaman tidak boleh lebih besar dari " + AppConstants.MAX_PAGE_SIZE);
        }
    }

}
