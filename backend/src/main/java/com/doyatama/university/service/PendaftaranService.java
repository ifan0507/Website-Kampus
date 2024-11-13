package com.doyatama.university.service;


import com.doyatama.university.exception.BadRequestException;
import com.doyatama.university.exception.FileStorageException;
import com.doyatama.university.exception.ResourceNotFoundException;
import com.doyatama.university.model.Pendaftaran;
import com.doyatama.university.payload.pendaftaran.PendaftaranRequest;
import com.doyatama.university.payload.pendaftaran.PendaftaranResponse;
import com.doyatama.university.payload.PagedResponse;
import com.doyatama.university.property.FileStorageProperties;
import com.doyatama.university.repository.PendaftaranRepository;
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
public class PendaftaranService {
    @Autowired
    private PendaftaranRepository pendaftaranRepository;

    private final Path fileStorageLocation;

    private static final Logger logger = LoggerFactory.getLogger(PendaftaranService.class);

    @Autowired
    public PendaftaranService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public PagedResponse<PendaftaranResponse> getAllPendaftaran(int page, int size) {
        validatePageNumberAndSize(page, size);

        // Retrieve Polls
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "id");
        Page<Pendaftaran> pendaftarans = pendaftaranRepository.findAll(pageable);
        if(pendaftarans.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), pendaftarans.getNumber(),
                    pendaftarans.getSize(), pendaftarans.getTotalElements(), pendaftarans.getTotalPages(), pendaftarans.isLast(), 200);
        }
        // Map Polls to PollResponses containing vote counts and poll creator details
        List<PendaftaranResponse> pendaftaranResponses = pendaftarans.map(asResponse -> {
            PendaftaranResponse pendaftaranResponse = new PendaftaranResponse();
            pendaftaranResponse.setId(asResponse.getId());
//            organisasiResponse.setCreatedAt(asResponse.getCreatedAt());
//            organisasiResponse.setUpdatedAt(asResponse.getUpdatedAt());
            pendaftaranResponse.setName(asResponse.getName());
            pendaftaranResponse.setDescription(asResponse.getDescription());
            pendaftaranResponse.setFileName(asResponse.getFileName());
            pendaftaranResponse.setFileType(asResponse.getFileType());
            pendaftaranResponse.setData(asResponse.getData());

            return pendaftaranResponse;
        }).getContent();
        return new PagedResponse<>(pendaftaranResponses, pendaftarans.getNumber(),
                pendaftarans.getSize(), pendaftarans.getTotalElements(), pendaftarans.getTotalPages(), pendaftarans.isLast(), 200);
    }

    public Pendaftaran createPendaftaran(UserPrincipal currentUser, @Valid PendaftaranRequest pendaftaranRequest, MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Pendaftaran pendaftaran = new Pendaftaran();
//        organisasi.setCreatedBy(currentUser.getId());
//        organisasi.setUpdatedBy(currentUser.getId());
        pendaftaran.setName(pendaftaranRequest.getName());
        pendaftaran.setDescription(pendaftaranRequest.getDescription());
        pendaftaran.setFileName(fileName);
        pendaftaran.setFileType(file.getContentType());
        pendaftaran.setData(file.getBytes());

        return pendaftaranRepository.save(pendaftaran);


    }

    public PendaftaranResponse getPendaftaranById(Long pendaftaranId) {
        Pendaftaran pendaftaran = pendaftaranRepository.findById(pendaftaranId).orElseThrow(
                () -> new ResourceNotFoundException("Pendaftaran", "id", pendaftaranId));
        PendaftaranResponse pendaftaranResponse = new PendaftaranResponse();
        pendaftaranResponse.setId(pendaftaran.getId());
//        organisasiUploadResponse.setCreatedAt(organisasi.getCreatedAt());
//        organisasiUploadResponse.setUpdatedAt(organisasi.getUpdatedAt());
        return pendaftaranResponse;
    }
    private void validatePageNumberAndSize(int page, int size) {
        if(page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }
        if(size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }
    public Pendaftaran updatePendaftaran(@Valid PendaftaranRequest pendaftaranRequest, Long id, UserPrincipal currentUser, MultipartFile file) throws IOException {
        return pendaftaranRepository.findById(id).map(pendaftaran -> {
//            organisasi.setUpdatedBy(currentUser.getId());
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            // Organisasi organisasi = new Organisasi();
            //        organisasi.setCreatedBy(currentUser.getId());
            //        organisasi.setUpdatedBy(currentUser.getId());
            pendaftaran.setName(pendaftaranRequest.getName());
            pendaftaran.setDescription(pendaftaranRequest.getDescription());
            pendaftaran.setFileName(fileName);
            pendaftaran.setFileType(file.getContentType());
            try {
                pendaftaran.setData(file.getBytes());
            } catch (IOException e) {
                // Handle the IOException here or rethrow it as an unchecked exception if needed.
                throw new RuntimeException("Error reading file content: " + e.getMessage(), e);
            }
            return pendaftaranRepository.save(pendaftaran);
        }).orElseThrow(() -> new ResourceNotFoundException("Pendaftaran" , "id" , id));
    }
    public void deletePendaftaranById(Long id){
        Optional<Pendaftaran> pendaftaran = pendaftaranRepository.findById(id);
        if(pendaftaran.isPresent()){
            pendaftaranRepository.deleteById(id);
        }else{
            throw new ResourceNotFoundException("Pendaftaran", "id", id);
        }
    }
}
