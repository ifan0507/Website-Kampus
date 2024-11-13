package com.doyatama.university.service;


import com.doyatama.university.exception.BadRequestException;
import com.doyatama.university.exception.FileStorageException;
import com.doyatama.university.exception.ResourceNotFoundException;
import com.doyatama.university.model.Kegiatan;
import com.doyatama.university.payload.kegiatan.KegiatanRequest;
import com.doyatama.university.payload.kegiatan.KegiatanResponse;
import com.doyatama.university.payload.PagedResponse;
import com.doyatama.university.property.FileStorageProperties;
import com.doyatama.university.repository.KegiatanRepository;
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
public class KegiatanService {
    @Autowired
    private KegiatanRepository kegiatanRepository;

    private final Path fileStorageLocation;

    private static final Logger logger = LoggerFactory.getLogger(KegiatanService.class);

    @Autowired
    public KegiatanService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public PagedResponse<KegiatanResponse> getAllKegiatan(int page, int size) {
        validatePageNumberAndSize(page, size);

        // Retrieve Polls
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "id");
        Page<Kegiatan> kegiatans = kegiatanRepository.findAll(pageable);
        if(kegiatans.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), kegiatans.getNumber(),
                    kegiatans.getSize(), kegiatans.getTotalElements(), kegiatans.getTotalPages(), kegiatans.isLast(), 200);
        }
        // Map Polls to PollResponses containing vote counts and poll creator details
        List<KegiatanResponse> kegiatanResponses = kegiatans.map(asResponse -> {
            KegiatanResponse kegiatanResponse = new KegiatanResponse();
            kegiatanResponse.setId(asResponse.getId());
//            organisasiResponse.setCreatedAt(asResponse.getCreatedAt());
//            organisasiResponse.setUpdatedAt(asResponse.getUpdatedAt());
            kegiatanResponse.setName(asResponse.getName());
            kegiatanResponse.setDescription(asResponse.getDescription());
            kegiatanResponse.setSelengkapnya(asResponse.getSelengkapnya());
            kegiatanResponse.setFileName(asResponse.getFileName());
            kegiatanResponse.setFileType(asResponse.getFileType());
            kegiatanResponse.setData(asResponse.getData());

            return kegiatanResponse;
        }).getContent();
        return new PagedResponse<>(kegiatanResponses, kegiatans.getNumber(),
                kegiatans.getSize(), kegiatans.getTotalElements(), kegiatans.getTotalPages(), kegiatans.isLast(), 200);
    }

    public Kegiatan createKegiatan(UserPrincipal currentUser, @Valid KegiatanRequest kegiatanRequest, MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Kegiatan kegiatan = new Kegiatan();
//        organisasi.setCreatedBy(currentUser.getId());
//        organisasi.setUpdatedBy(currentUser.getId());
        kegiatan.setName(kegiatanRequest.getName());
        kegiatan.setDescription(kegiatanRequest.getDescription());
        kegiatan.setSelengkapnya(kegiatanRequest.getSelengkapnya());
        kegiatan.setFileName(fileName);
        kegiatan.setFileType(file.getContentType());
        kegiatan.setData(file.getBytes());

        return kegiatanRepository.save(kegiatan);


    }

    public KegiatanResponse getKegiatanById(Long kegiatanId) {
        Kegiatan kegiatan = kegiatanRepository.findById(kegiatanId).orElseThrow(
                () -> new ResourceNotFoundException("Kegiatan", "id", kegiatanId));
        KegiatanResponse kegiatanResponse = new KegiatanResponse();
        kegiatanResponse.setId(kegiatan.getId());
//        organisasiUploadResponse.setCreatedAt(organisasi.getCreatedAt());
//        organisasiUploadResponse.setUpdatedAt(organisasi.getUpdatedAt());
        return kegiatanResponse;
    }
    private void validatePageNumberAndSize(int page, int size) {
        if(page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }
        if(size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }
    public Kegiatan updateKegiatan(@Valid KegiatanRequest kegiatanRequest, Long id, UserPrincipal currentUser, MultipartFile file) throws IOException {
        return kegiatanRepository.findById(id).map(kegiatan -> {
//            organisasi.setUpdatedBy(currentUser.getId());
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            // Organisasi organisasi = new Organisasi();
    //        organisasi.setCreatedBy(currentUser.getId());
    //        organisasi.setUpdatedBy(currentUser.getId());
            kegiatan.setName(kegiatanRequest.getName());
            kegiatan.setDescription(kegiatanRequest.getDescription());
            kegiatan.setSelengkapnya(kegiatanRequest.getSelengkapnya());
            kegiatan.setFileName(fileName);
            kegiatan.setFileType(file.getContentType());
            try {
                kegiatan.setData(file.getBytes());
            } catch (IOException e) {
                // Handle the IOException here or rethrow it as an unchecked exception if needed.
                throw new RuntimeException("Error reading file content: " + e.getMessage(), e);
            }
            return kegiatanRepository.save(kegiatan);
        }).orElseThrow(() -> new ResourceNotFoundException("Kegiatan" , "id" , id));
    }
    public void deleteKegiatanById(Long id){
        Optional<Kegiatan> kegiatan = kegiatanRepository.findById(id);
        if(kegiatan.isPresent()){
            kegiatanRepository.deleteById(id);
        }else{
            throw new ResourceNotFoundException("Kegiatan", "id", id);
        }
    }
}
