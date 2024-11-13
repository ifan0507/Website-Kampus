package com.doyatama.university.service;


import com.doyatama.university.exception.BadRequestException;
import com.doyatama.university.exception.FileStorageException;
import com.doyatama.university.exception.ResourceNotFoundException;
import com.doyatama.university.model.Selayang;
import com.doyatama.university.payload.selayang.SelayangResponse;
import com.doyatama.university.payload.selayang.SelayangRequest;
import com.doyatama.university.payload.PagedResponse;
import com.doyatama.university.property.FileStorageProperties;
import com.doyatama.university.repository.SelayangRepository;
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
public class SelayangService {
    @Autowired
    private SelayangRepository selayangRepository;

    private final Path fileStorageLocation;

    private static final Logger logger = LoggerFactory.getLogger(SelayangService.class);

    @Autowired
    public SelayangService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public PagedResponse<SelayangResponse> getAllSelayang(int page, int size) {
        validatePageNumberAndSize(page, size);

        // Retrieve Polls
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "id");
        Page<Selayang> selayangs = selayangRepository.findAll(pageable);
        if(selayangs.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), selayangs.getNumber(),
                    selayangs.getSize(), selayangs.getTotalElements(), selayangs.getTotalPages(), selayangs.isLast(), 200);
        }
        // Map Polls to PollResponses containing vote counts and poll creator details
        List<SelayangResponse> selayangResponses = selayangs.map(asResponse -> {
            SelayangResponse selayangResponse = new SelayangResponse();
            selayangResponse.setId(asResponse.getId());
//            organisasiResponse.setCreatedAt(asResponse.getCreatedAt());
//            organisasiResponse.setUpdatedAt(asResponse.getUpdatedAt());
            selayangResponse.setName(asResponse.getName());
            selayangResponse.setDescription(asResponse.getDescription());
            selayangResponse.setFileName(asResponse.getFileName());
            selayangResponse.setFileType(asResponse.getFileType());
            selayangResponse.setData(asResponse.getData());

            return selayangResponse;
        }).getContent();
        return new PagedResponse<>(selayangResponses, selayangs.getNumber(),
                selayangs.getSize(), selayangs.getTotalElements(), selayangs.getTotalPages(), selayangs.isLast(), 200);
    }

    public Selayang createSelayang(UserPrincipal currentUser, @Valid SelayangRequest selayangRequest, MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Selayang selayang = new Selayang();
//        organisasi.setCreatedBy(currentUser.getId());
//        organisasi.setUpdatedBy(currentUser.getId());
        selayang.setName(selayangRequest.getName());
        selayang.setDescription(selayangRequest.getDescription());
        selayang.setFileName(fileName);
        selayang.setFileType(file.getContentType());
        selayang.setData(file.getBytes());

        return selayangRepository.save(selayang);


    }

    public SelayangResponse getSelayangById(Long selayangId) {
        Selayang selayang = selayangRepository.findById(selayangId).orElseThrow(
                () -> new ResourceNotFoundException("Selayang", "id", selayangId));
        SelayangResponse selayangResponse = new SelayangResponse();
        selayangResponse.setId(selayang.getId());
//        organisasiUploadResponse.setCreatedAt(organisasi.getCreatedAt());
//        organisasiUploadResponse.setUpdatedAt(organisasi.getUpdatedAt());
        return selayangResponse;
    }
    private void validatePageNumberAndSize(int page, int size) {
        if(page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }
        if(size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }
    public Selayang updateSelayang(@Valid SelayangRequest selayangRequest, Long id, UserPrincipal currentUser, MultipartFile file) throws IOException {
        return selayangRepository.findById(id).map(selayang -> {
//            organisasi.setUpdatedBy(currentUser.getId());
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            // Organisasi organisasi = new Organisasi();
            //        organisasi.setCreatedBy(currentUser.getId());
            //        organisasi.setUpdatedBy(currentUser.getId());
            selayang.setName(selayangRequest.getName());
            selayang.setDescription(selayangRequest.getDescription());
            selayang.setFileName(fileName);
            selayang.setFileType(file.getContentType());
            try {
                selayang.setData(file.getBytes());
            } catch (IOException e) {
                // Handle the IOException here or rethrow it as an unchecked exception if needed.
                throw new RuntimeException("Error reading file content: " + e.getMessage(), e);
            }
            return selayangRepository.save(selayang);
        }).orElseThrow(() -> new ResourceNotFoundException("Selayang" , "id" , id));
    }
    public void deleteSelayangById(Long id){
        Optional<Selayang> selayang = selayangRepository.findById(id);
        if(selayang.isPresent()){
            selayangRepository.deleteById(id);
        }else{
            throw new ResourceNotFoundException("Selayang", "id", id);
        }
    }
}
