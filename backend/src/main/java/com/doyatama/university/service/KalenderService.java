package com.doyatama.university.service;


import com.doyatama.university.exception.BadRequestException;
import com.doyatama.university.exception.FileStorageException;
import com.doyatama.university.exception.ResourceNotFoundException;
import com.doyatama.university.model.Kalender;
import com.doyatama.university.payload.PagedResponse;
import com.doyatama.university.payload.File.KalenderUploadRequest;
import com.doyatama.university.payload.File.KalenderUploadResponse;
import com.doyatama.university.property.FileStorageProperties;
import com.doyatama.university.repository.KalenderRepository;
import com.doyatama.university.security.UserPrincipal;
import com.doyatama.university.util.AppConstants;
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
import java.nio.file.StandardCopyOption;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
/**
 *
 * @author Doyatama
 */
@Service
public class KalenderService {
    @Autowired
    private KalenderRepository kalenderRepository;

    private final Path fileStorageLocation;

    private static final Logger logger = LoggerFactory.getLogger(KalenderService.class);

    @Autowired
    public KalenderService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public PagedResponse<KalenderUploadResponse> getAllKalender(int page, int size) {
        validatePageNumberAndSize(page, size);

        // Retrieve Polls
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "id");
        Page<Kalender> kalenders = kalenderRepository.findAll(pageable);
        if(kalenders.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), kalenders.getNumber(),
                    kalenders.getSize(), kalenders.getTotalElements(), kalenders.getTotalPages(), kalenders.isLast(), 200);
        }
        // Map Polls to PollResponses containing vote counts and poll creator details
        List<KalenderUploadResponse> kalenderUploadResponses = kalenders.map(asResponse -> {
            KalenderUploadResponse kalenderResponse = new KalenderUploadResponse();
            kalenderResponse.setId(asResponse.getId());
//            kalenderResponse.setCreatedAt(asResponse.getCreatedAt());
//            kalenderResponse.setUpdatedAt(asResponse.getUpdatedAt());
            kalenderResponse.setFileName(asResponse.getFileName());
            kalenderResponse.setFileType(asResponse.getFileType());
            kalenderResponse.setData(asResponse.getData());

            return kalenderResponse;
        }).getContent();
        return new PagedResponse<>(kalenderUploadResponses, kalenders.getNumber(),
                kalenders.getSize(), kalenders.getTotalElements(), kalenders.getTotalPages(), kalenders.isLast(), 200);
    }

    public Kalender createKalender(UserPrincipal currentUser, @Valid KalenderUploadRequest kalenderUploadRequest, MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Kalender kalender = new Kalender();
//        kalender.setCreatedBy(currentUser.getId());
//        kalender.setUpdatedBy(currentUser.getId());
        kalender.setFileName(fileName);
        kalender.setFileType(file.getContentType());
        kalender.setData(file.getBytes());
        return kalenderRepository.save(kalender);
    }

    public KalenderUploadResponse getKalenderById(Long kalenderId) {
        Kalender kalender = kalenderRepository.findById(kalenderId).orElseThrow(
                () -> new ResourceNotFoundException("Kalender", "id", kalenderId));
        KalenderUploadResponse kalenderUploadResponse = new KalenderUploadResponse();
        kalenderUploadResponse.setId(kalender.getId());
//        kalenderUploadResponse.setCreatedAt(kalender.getCreatedAt());
//        kalenderUploadResponse.setUpdatedAt(kalender.getUpdatedAt());
        return kalenderUploadResponse;
    }

    private void validatePageNumberAndSize(int page, int size) {
        if(page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }
        if(size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }

    public Kalender updateKalender(KalenderUploadRequest kalenderUploadRequest, Long id, UserPrincipal currentUser, MultipartFile file) throws IOException {
        return kalenderRepository.findById(id).map(kalender -> {
//            kalender.setUpdatedBy(currentUser.getId());
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            // Kalender kalender = new Kalender();
    //        kalender.setCreatedBy(currentUser.getId());
    //        kalender.setUpdatedBy(currentUser.getId());
            kalender.setFileName(fileName);
            kalender.setFileType(file.getContentType());
            try {
                kalender.setData(file.getBytes());
            } catch (IOException e) {
                // Handle the IOException here or rethrow it as an unchecked exception if needed.
                throw new RuntimeException("Error reading file content: " + e.getMessage(), e);
            }
            return kalenderRepository.save(kalender);
        }).orElseThrow(() -> new ResourceNotFoundException("Kalender" , "id" , id));
    }

    public void deleteKalenderById(Long id){
        Optional<Kalender> kalender = kalenderRepository.findById(id);
        if(kalender.isPresent()){
            kalenderRepository.deleteById(id);
        }else{
            throw new ResourceNotFoundException("Kalender", "id", id);
        }
    }
}
