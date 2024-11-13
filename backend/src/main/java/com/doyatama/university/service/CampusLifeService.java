package com.doyatama.university.service;


import com.doyatama.university.exception.BadRequestException;
import com.doyatama.university.exception.FileStorageException;
import com.doyatama.university.exception.ResourceNotFoundException;
import com.doyatama.university.model.CampusLife;
import com.doyatama.university.payload.campus_life.CampusLifeRequest;
import com.doyatama.university.payload.campus_life.CampusLifeResponse;
import com.doyatama.university.payload.PagedResponse;
import com.doyatama.university.property.FileStorageProperties;
import com.doyatama.university.repository.CampusLifeRepository;
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
public class CampusLifeService {
    @Autowired
    private CampusLifeRepository campusLifeRepository;

    private final Path fileStorageLocation;

    private static final Logger logger = LoggerFactory.getLogger(CampusLifeService.class);

    @Autowired
    public CampusLifeService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public PagedResponse<CampusLifeResponse> getAllCampusLife(int page, int size) {
        validatePageNumberAndSize(page, size);

        // Retrieve Polls
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "id");
        Page<CampusLife> campuslifes = campusLifeRepository.findAll(pageable);
        if(campuslifes.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), campuslifes.getNumber(),
                    campuslifes.getSize(), campuslifes.getTotalElements(), campuslifes.getTotalPages(), campuslifes.isLast(), 200);
        }
        // Map Polls to PollResponses containing vote counts and poll creator details
        List<CampusLifeResponse> campusLifeResponses = campuslifes.map(asResponse -> {
            CampusLifeResponse campusLifeResponse = new CampusLifeResponse();
            campusLifeResponse.setId(asResponse.getId());
//            organisasiResponse.setCreatedAt(asResponse.getCreatedAt());
//            organisasiResponse.setUpdatedAt(asResponse.getUpdatedAt());
            campusLifeResponse.setName(asResponse.getName());
            campusLifeResponse.setDescription(asResponse.getDescription());
            campusLifeResponse.setFileName(asResponse.getFileName());
            campusLifeResponse.setFileType(asResponse.getFileType());
            campusLifeResponse.setData(asResponse.getData());

            return campusLifeResponse;
        }).getContent();
        return new PagedResponse<>(campusLifeResponses, campuslifes.getNumber(),
                campuslifes.getSize(), campuslifes.getTotalElements(), campuslifes.getTotalPages(), campuslifes.isLast(), 200);
    }

    public CampusLife createCampusLife(UserPrincipal currentUser, @Valid CampusLifeRequest campusLifeRequest, MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        CampusLife campusLife = new CampusLife();
//        organisasi.setCreatedBy(currentUser.getId());
//        organisasi.setUpdatedBy(currentUser.getId());
        campusLife.setName(campusLifeRequest.getName());
        campusLife.setDescription(campusLifeRequest.getDescription());
        campusLife.setFileName(fileName);
        campusLife.setFileType(file.getContentType());
        campusLife.setData(file.getBytes());

        return campusLifeRepository.save(campusLife);
    }

    public CampusLifeResponse getCampusLifeById(Long campusLifeId) {
        CampusLife campusLife = campusLifeRepository.findById(campusLifeId).orElseThrow(
                () -> new ResourceNotFoundException("CampusLife", "id", campusLifeId));
        CampusLifeResponse campusLifeResponse = new CampusLifeResponse();
        campusLifeResponse.setId(campusLife.getId());
//        organisasiUploadResponse.setCreatedAt(organisasi.getCreatedAt());
//        organisasiUploadResponse.setUpdatedAt(organisasi.getUpdatedAt());
        return campusLifeResponse;
    }
    private void validatePageNumberAndSize(int page, int size) {
        if(page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }
        if(size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }
    public CampusLife updateCampusLife(@Valid CampusLifeRequest campusLifeRequest, Long id, UserPrincipal currentUser, MultipartFile file) throws IOException {
        return campusLifeRepository.findById(id).map(campusLife -> {
//            organisasi.setUpdatedBy(currentUser.getId());
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            // Organisasi organisasi = new Organisasi();
            //        organisasi.setCreatedBy(currentUser.getId());
            //        organisasi.setUpdatedBy(currentUser.getId());
            campusLife.setName(campusLifeRequest.getName());
            campusLife.setDescription(campusLifeRequest.getDescription());
            campusLife.setFileName(fileName);
            campusLife.setFileType(file.getContentType());
            try {
                campusLife.setData(file.getBytes());
            } catch (IOException e) {
                // Handle the IOException here or rethrow it as an unchecked exception if needed.
                throw new RuntimeException("Error reading file content: " + e.getMessage(), e);
            }
            return campusLifeRepository.save(campusLife);
        }).orElseThrow(() -> new ResourceNotFoundException("CampusLife" , "id" , id));
    }
    public void deleteCampusLifeById(Long id){
        Optional<CampusLife> campusLife = campusLifeRepository.findById(id);
        if(campusLife.isPresent()){
            campusLifeRepository.deleteById(id);
        }else{
            throw new ResourceNotFoundException("CampusLife", "id", id);
        }
    }
}
