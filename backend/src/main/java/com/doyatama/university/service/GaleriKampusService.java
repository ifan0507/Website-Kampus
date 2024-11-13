package com.doyatama.university.service;


import com.doyatama.university.exception.BadRequestException;
import com.doyatama.university.exception.FileStorageException;
import com.doyatama.university.exception.ResourceNotFoundException;
import com.doyatama.university.model.GaleriKampus;
import com.doyatama.university.payload.PagedResponse;
import com.doyatama.university.payload.galeri_kampus.GaleriKampusRequest;
import com.doyatama.university.payload.galeri_kampus.GaleriKampusResponse;
import com.doyatama.university.property.FileStorageProperties;
import com.doyatama.university.repository.GaleriKampusRepository;
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
public class GaleriKampusService {
    @Autowired
    private GaleriKampusRepository galeriKampusRepository;

    private final Path fileStorageLocation;

    private static final Logger logger = LoggerFactory.getLogger(GaleriKampusService.class);

    @Autowired
    public GaleriKampusService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public PagedResponse<GaleriKampusResponse> getAllGaleriKampus(int page, int size) {
        validatePageNumberAndSize(page, size);

        // Retrieve Polls
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "id");
        Page<GaleriKampus> galeris = galeriKampusRepository.findAll(pageable);
        if(galeris.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), galeris.getNumber(),
                    galeris.getSize(), galeris.getTotalElements(), galeris.getTotalPages(), galeris.isLast(), 200);
        }
        // Map Polls to PollResponses containing vote counts and poll creator details
        List<GaleriKampusResponse> galeriKampusResponses = galeris.map(asResponse -> {
            GaleriKampusResponse galeriKampusResponse = new GaleriKampusResponse();
            galeriKampusResponse.setId(asResponse.getId());
//            kalenderResponse.setCreatedAt(asResponse.getCreatedAt());
//            kalenderResponse.setUpdatedAt(asResponse.getUpdatedAt());
            galeriKampusResponse.setFileName(asResponse.getFileName());
            galeriKampusResponse.setFileType(asResponse.getFileType());
            galeriKampusResponse.setData(asResponse.getData());

            return galeriKampusResponse;
        }).getContent();
        return new PagedResponse<>(galeriKampusResponses, galeris.getNumber(),
                galeris.getSize(), galeris.getTotalElements(), galeris.getTotalPages(), galeris.isLast(), 200);
    }

    public GaleriKampus createGaleriKampus(UserPrincipal currentUser, @Valid GaleriKampusRequest galeriKampusRequest, MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        GaleriKampus galeriKampus = new GaleriKampus();
//        kalender.setCreatedBy(currentUser.getId());
//        kalender.setUpdatedBy(currentUser.getId());
        galeriKampus.setFileName(fileName);
        galeriKampus.setFileType(file.getContentType());
        galeriKampus.setData(file.getBytes());
        return galeriKampusRepository.save(galeriKampus);
    }

    public GaleriKampusResponse getGaleriKampusById(Long galeriId) {
        GaleriKampus galeriKampus = galeriKampusRepository.findById(galeriId).orElseThrow(
                () -> new ResourceNotFoundException("GaleriKampus", "id", galeriId));
        GaleriKampusResponse galeriKampusResponse = new GaleriKampusResponse();
        galeriKampusResponse.setId(galeriKampus.getId());
//        kalenderUploadResponse.setCreatedAt(kalender.getCreatedAt());
//        kalenderUploadResponse.setUpdatedAt(kalender.getUpdatedAt());
        return galeriKampusResponse;
    }

    private void validatePageNumberAndSize(int page, int size) {
        if(page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }
        if(size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }

    public GaleriKampus updateGaleriKampus(GaleriKampusRequest galeriKampusRequest, Long id, UserPrincipal currentUser, MultipartFile file) throws IOException {
        return galeriKampusRepository.findById(id).map(galeriKampus -> {
//            kalender.setUpdatedBy(currentUser.getId());
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            // Kalender kalender = new Kalender();
            //        kalender.setCreatedBy(currentUser.getId());
            //        kalender.setUpdatedBy(currentUser.getId());
            galeriKampus.setFileName(fileName);
            galeriKampus.setFileType(file.getContentType());
            try {
                galeriKampus.setData(file.getBytes());
            } catch (IOException e) {
                // Handle the IOException here or rethrow it as an unchecked exception if needed.
                throw new RuntimeException("Error reading file content: " + e.getMessage(), e);
            }
            return galeriKampusRepository.save(galeriKampus);
        }).orElseThrow(() -> new ResourceNotFoundException("GaleriKampus" , "id" , id));
    }

    public void deleteGaleriKampusById(Long id){
        Optional<GaleriKampus> galeriKampus = galeriKampusRepository.findById(id);
        if(galeriKampus.isPresent()){
            galeriKampusRepository.deleteById(id);
        }else{
            throw new ResourceNotFoundException("GaleriKampus", "id", id);
        }
    }
}
