package com.doyatama.university.service;

import com.doyatama.university.exception.BadRequestException;
import com.doyatama.university.exception.FileStorageException;
import com.doyatama.university.exception.ResourceNotFoundException;
import com.doyatama.university.model.Berita;
import com.doyatama.university.model.CategoryBerita;
import com.doyatama.university.model.GaleryBaru;
import com.doyatama.university.payload.berita.BeritaRequest;
import com.doyatama.university.payload.berita.BeritaResponse;
import com.doyatama.university.payload.PagedResponse;
import com.doyatama.university.property.FileStorageProperties;
import com.doyatama.university.repository.BeritaRepository;
import com.doyatama.university.repository.CategoryRepository;
import com.doyatama.university.repository.GaleryBaruReposytory;
import com.doyatama.university.security.UserPrincipal;
import com.doyatama.university.util.AppConstants;
import org.aspectj.weaver.ast.Or;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author Doyatama
 */
@Service
public class BeritaService {
    @Autowired
    private BeritaRepository beritaRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private GaleryBaruReposytory galeryBaruReposytory;

    private final Path fileStorageLocation;

    private static final Logger logger = LoggerFactory.getLogger(BeritaService.class);

    @Autowired
    public BeritaService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.",
                    ex);
        }
    }

    public PagedResponse<BeritaResponse> getAllBerita(int page, int size) {
        validatePageNumberAndSize(page, size);

        // Retrieve Berita
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "id");
        Page<Berita> beritas = beritaRepository.findAll(pageable);

        if (beritas.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), beritas.getNumber(),
                    beritas.getSize(), beritas.getTotalElements(), beritas.getTotalPages(), beritas.isLast(), 200);
        }

        List<BeritaResponse> beritaResponses = beritas.map(asResponse -> {
            BeritaResponse beritaResponse = new BeritaResponse();
            beritaResponse.setId(asResponse.getId());
            beritaResponse.setName(asResponse.getName());
            beritaResponse.setFileNameJudul(asResponse.getFileNameJudul());
            beritaResponse.setFileType(asResponse.getFileType());
            beritaResponse.setData(asResponse.getData());
            // Mengambil nama kategori jika ada, jika tidak maka null
            beritaResponse.setCategoryName(asResponse.getCategoryBerita() != null
                    ? asResponse.getCategoryBerita().getName()
                    : "Kategori Tidak Ditemukan"); // default value jika category null

            // Mengambil nama galeri jika ada
            beritaResponse.setGalleryName(asResponse.getGallery() != null
                    ? asResponse.getGallery().getName()
                    : "Galeri Tidak Ditemukan"); // default value jika gallery null

            beritaResponse.setDescription(asResponse.getDescription());
            beritaResponse.setSelengkapnya(asResponse.getSelengkapnya());

            beritaResponse.setCategoryId(
                    asResponse.getCategoryBerita() != null ? asResponse.getCategoryBerita().getId() : null);
            beritaResponse.setGaleryId(asResponse.getGallery() != null ? asResponse.getGallery().getId() : null);

            return beritaResponse;
        }).getContent();
        return new PagedResponse<>(beritaResponses, beritas.getNumber(),
                beritas.getSize(), beritas.getTotalElements(), beritas.getTotalPages(), beritas.isLast(), 200);
    }

    public Berita createBerita(UserPrincipal currentUser, @Valid BeritaRequest beritaRequest, MultipartFile file)
            throws IOException {

        // Ambil category berdasarkan ID dari request
        CategoryBerita category = categoryRepository.findById(beritaRequest.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Category not found with id ", "id", beritaRequest.getCategoryId()));

        // Log kategori yang ditemukan
        System.out.println("Found Category: " + category);

        // Ambil galeri berdasarkan ID dari request, cek null terlebih dahulu
        GaleryBaru galeryBaru = null;
        if (beritaRequest.getGaleryId() != null) {
            galeryBaru = galeryBaruReposytory.findById(beritaRequest.getGaleryId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Galery not found with id ", "id", beritaRequest.getGaleryId()));
        }

        // Log galeri yang ditemukan (jika ada)
        if (galeryBaru != null) {
            System.out.println("Found Galery: " + galeryBaru);
        } else {
            System.out.println("No Galery found, skipping galery assignment.");
        }

        String fileNameJudul = StringUtils.cleanPath(file.getOriginalFilename());

        // Proses berita
        Berita berita = new Berita();
        berita.setName(beritaRequest.getName());
        berita.setFileNameJudul(fileNameJudul);
        berita.setFileType(file.getContentType());
        berita.setCategoryBerita(category);
        berita.setDescription(beritaRequest.getDescription());
        berita.setSelengkapnya(beritaRequest.getSelengkapnya());
        berita.setGallery(galeryBaru); // Galeri bisa null jika tidak ada
        berita.setData(file.getBytes());
        // Simpan berita ke database
        return beritaRepository.save(berita);
    }

    public BeritaResponse getBeritaById(Long beritaId) {
        Berita berita = beritaRepository.findById(beritaId).orElseThrow(
                () -> new ResourceNotFoundException("Berita", "id", beritaId));
        BeritaResponse beritaResponse = new BeritaResponse();
        beritaResponse.setId(berita.getId());
        beritaResponse.setName(berita.getName());
        beritaResponse.setFileNameJudul(berita.getFileNameJudul());
        beritaResponse.setFileType(berita.getFileType());
        beritaResponse.setData(berita.getData());
        beritaResponse.setDescription(berita.getDescription());
        beritaResponse.setSelengkapnya(berita.getSelengkapnya());
        beritaResponse.setCategoryId(
                berita.getCategoryBerita() != null ? berita.getCategoryBerita().getId() : null);
        beritaResponse.setGaleryId(berita.getGallery() != null ? berita.getGallery().getId() : null);
        return beritaResponse;
    }

    private void validatePageNumberAndSize(int page, int size) {
        if (page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }
        if (size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }

    public Berita updateBerita(@Valid BeritaRequest beritaRequest, Long id, UserPrincipal currentUser,
            MultipartFile file)
            throws IOException {
        return beritaRepository.findById(id).map(berita -> {
            // organisasi.setUpdatedBy(currentUser.getId());
            // String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            CategoryBerita category = categoryRepository.findById(beritaRequest.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Category not found with id ", "id", +beritaRequest.getCategoryId()));
            GaleryBaru galeryBaru = galeryBaruReposytory.findById(beritaRequest.getGaleryId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Galery not found with id ", "id", +beritaRequest.getGaleryId()));

            // Organisasi organisasi = new Organisasi();
            // organisasi.setCreatedBy(currentUser.getId());
            // organisasi.setUpdatedBy(currentUser.getId());
            String fileNameJudul = StringUtils.cleanPath(file.getOriginalFilename());

            berita.setName(beritaRequest.getName());
            berita.setDescription(beritaRequest.getDescription());
            berita.setSelengkapnya(beritaRequest.getSelengkapnya());
            berita.setCategoryBerita(category);
            berita.setFileNameJudul(fileNameJudul);
            berita.setFileType(file.getContentType());
            berita.setGallery(galeryBaru);
            try {
                berita.setData(file.getBytes());
            } catch (IOException e) {
                throw new RuntimeException("Error reading file content: " + e.getMessage(),
                        e);
            }
            return beritaRepository.save(berita);
        }).orElseThrow(() -> new ResourceNotFoundException("Berita", "id", id));
    }

    public void deleteBeritaById(Long id) {
        Optional<Berita> berita = beritaRepository.findById(id);
        if (berita.isPresent()) {
            beritaRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("Berita", "id", id);
        }
    }
}
