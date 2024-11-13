package com.doyatama.university.service;


import com.doyatama.university.exception.BadRequestException;
import com.doyatama.university.exception.FileStorageException;
import com.doyatama.university.exception.ResourceNotFoundException;
import com.doyatama.university.model.Organisasi;
import com.doyatama.university.payload.organisasi.OrganisasiUploadRequest;
import com.doyatama.university.payload.organisasi.OrganisasiUploadResponse;
import com.doyatama.university.payload.PagedResponse;
import com.doyatama.university.property.FileStorageProperties;
import com.doyatama.university.repository.OrganisasiRepository;
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
public class OrganisasiService {
    @Autowired
    private OrganisasiRepository organisasiRepository;

    private final Path fileStorageLocation;

    private static final Logger logger = LoggerFactory.getLogger(OrganisasiService.class);

    @Autowired
    public OrganisasiService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public PagedResponse<OrganisasiUploadResponse> getAllOrganisasi(int page, int size) {
        validatePageNumberAndSize(page, size);

        // Retrieve Polls
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "id");
        Page<Organisasi> organisasis = organisasiRepository.findAll(pageable);
        if(organisasis.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), organisasis.getNumber(),
                    organisasis.getSize(), organisasis.getTotalElements(), organisasis.getTotalPages(), organisasis.isLast(), 200);
        }
        // Map Polls to PollResponses containing vote counts and poll creator details
        List<OrganisasiUploadResponse> organisasiUploadResponses = organisasis.map(asResponse -> {
            OrganisasiUploadResponse organisasiResponse = new OrganisasiUploadResponse();
            organisasiResponse.setId(asResponse.getId());
//            organisasiResponse.setCreatedAt(asResponse.getCreatedAt());
//            organisasiResponse.setUpdatedAt(asResponse.getUpdatedAt());
            organisasiResponse.setName(asResponse.getName());
            organisasiResponse.setFileName(asResponse.getFileName());
            organisasiResponse.setFileType(asResponse.getFileType());
            organisasiResponse.setData(asResponse.getData());

            return organisasiResponse;
        }).getContent();
        return new PagedResponse<>(organisasiUploadResponses, organisasis.getNumber(),
                organisasis.getSize(), organisasis.getTotalElements(), organisasis.getTotalPages(), organisasis.isLast(), 200);
    }

    public Organisasi createOrganisasi(UserPrincipal currentUser, @Valid OrganisasiUploadRequest organisasiUploadRequest, MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Organisasi organisasi = new Organisasi();
//        organisasi.setCreatedBy(currentUser.getId());
//        organisasi.setUpdatedBy(currentUser.getId());
        organisasi.setName(organisasiUploadRequest.getName());
        organisasi.setFileName(fileName);
        organisasi.setFileType(file.getContentType());
        organisasi.setData(file.getBytes());

        return organisasiRepository.save(organisasi);


    }

    public OrganisasiUploadResponse getOrganisasiById(Long organisasiId) {
        Organisasi organisasi = organisasiRepository.findById(organisasiId).orElseThrow(
                () -> new ResourceNotFoundException("Organisasi", "id", organisasiId));
        OrganisasiUploadResponse organisasiUploadResponse = new OrganisasiUploadResponse();
        organisasiUploadResponse.setId(organisasi.getId());
//        organisasiUploadResponse.setCreatedAt(organisasi.getCreatedAt());
//        organisasiUploadResponse.setUpdatedAt(organisasi.getUpdatedAt());
        return organisasiUploadResponse;
    }
    private void validatePageNumberAndSize(int page, int size) {
        if(page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }
        if(size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }
    public Organisasi updateOrganisasi(@Valid OrganisasiUploadRequest organisasiUploadRequest, Long id, UserPrincipal currentUser, MultipartFile file) throws IOException {
        return organisasiRepository.findById(id).map(organisasi -> {
//            organisasi.setUpdatedBy(currentUser.getId());
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            // Organisasi organisasi = new Organisasi();
    //        organisasi.setCreatedBy(currentUser.getId());
    //        organisasi.setUpdatedBy(currentUser.getId());
            organisasi.setName(organisasiUploadRequest.getName());
            organisasi.setFileName(fileName);
            organisasi.setFileType(file.getContentType());
            try {
                organisasi.setData(file.getBytes());
            } catch (IOException e) {
                // Handle the IOException here or rethrow it as an unchecked exception if needed.
                throw new RuntimeException("Error reading file content: " + e.getMessage(), e);
            }
            return organisasiRepository.save(organisasi);
        }).orElseThrow(() -> new ResourceNotFoundException("Organisasi" , "id" , id));
    }
    public void deleteOrganisasiById(Long id){
        Optional<Organisasi> organisasi = organisasiRepository.findById(id);
        if(organisasi.isPresent()){
            organisasiRepository.deleteById(id);
        }else{
            throw new ResourceNotFoundException("Organisasi", "id", id);
        }
    }
}
