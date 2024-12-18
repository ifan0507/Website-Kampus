package com.doyatama.university.service;

import com.doyatama.university.exception.BadRequestException;
import com.doyatama.university.exception.FileStorageException;
import com.doyatama.university.exception.ResourceNotFoundException;
import com.doyatama.university.model.Alumni;

import com.doyatama.university.payload.PagedResponse;
import com.doyatama.university.payload.alumni.AlumniRequest;
import com.doyatama.university.payload.alumni.AlumniResponse;
import com.doyatama.university.property.FileStorageProperties;
import com.doyatama.university.repository.AlumniRepository;
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
import java.util.Collections;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author Doyatama
 */
@Service
public class AlumniService {
    @Autowired
    private AlumniRepository alumniRepository;

    private final Path fileStorageLocation;

    private static final Logger logger = LoggerFactory.getLogger(ProfilService.class);

    @Autowired
    public AlumniService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.",
                    ex);
        }
    }

    public PagedResponse<AlumniResponse> getAllAlumni(int page, int size) {
        validatePageNumberAndSize(page, size);

        // Retrieve Polls
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "id");
        Page<Alumni> alumnis = alumniRepository.findAll(pageable);
        if (alumnis.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), alumnis.getNumber(),
                    alumnis.getSize(), alumnis.getTotalElements(), alumnis.getTotalPages(), alumnis.isLast(), 200);
        }
        // Map Polls to PollResponses containing vote counts and poll creator details
        List<AlumniResponse> alumniResponses = alumnis.map(asResponse -> {
            AlumniResponse alumniResponse = new AlumniResponse();
            alumniResponse.setId(asResponse.getId());
            alumniResponse.setNim(asResponse.getNim());
            alumniResponse.setName(asResponse.getName());
            alumniResponse.setEmail(asResponse.getEmail());
            alumniResponse.setNo_hp(asResponse.getNo_hp());
            alumniResponse.setProgram_studi(asResponse.getProgram_studi());
            alumniResponse.setJudul_ta(asResponse.getJudul_ta());
            alumniResponse.setTgl_lulus(asResponse.getTgl_lulus());
            alumniResponse.setFileName(asResponse.getFileName());
            alumniResponse.setFileType(asResponse.getFileType());
            alumniResponse.setData(asResponse.getData());

            return alumniResponse;
        }).getContent();
        return new PagedResponse<>(alumniResponses, alumnis.getNumber(),
                alumnis.getSize(), alumnis.getTotalElements(), alumnis.getTotalPages(), alumnis.isLast(), 200);
    }

    public Alumni createAlumni(UserPrincipal currentUser, @Valid AlumniRequest alumniRequest, MultipartFile file)
            throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Alumni alumni = new Alumni();
        // organisasi.setCreatedBy(currentUser.getId());
        // organisasi.setUpdatedBy(currentUser.getId());
        alumni.setNim(alumniRequest.getNim());
        alumni.setName(alumniRequest.getName());
        alumni.setEmail(alumniRequest.getEmail());
        alumni.setNo_hp(alumniRequest.getNo_hp());
        alumni.setProgram_studi(alumniRequest.getProgram_studi());
        alumni.setJudul_ta(alumniRequest.getJudul_ta());
        alumni.setTgl_lulus(alumniRequest.getTgl_lulus());
        alumni.setFileName(fileName);
        alumni.setFileType(file.getContentType());
        alumni.setData(file.getBytes());

        return alumniRepository.save(alumni);

    }

    public AlumniResponse getAlumniById(Long alumniId) {
        Alumni alumni = alumniRepository.findById(alumniId).orElseThrow(
                () -> new ResourceNotFoundException("alumni", "id", alumniId));
        AlumniResponse alumniResponse = new AlumniResponse();
        alumniResponse.setId(alumni.getId());
        return alumniResponse;
    }

    private void validatePageNumberAndSize(int page, int size) {
        if (page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }
        if (size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }

    public Alumni updateAlumni(@Valid AlumniRequest alumniRequest, Long id, UserPrincipal currentUser,
            MultipartFile file) throws IOException {
        return alumniRepository.findById(id).map(alumni -> {
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());

            alumni.setNim(alumniRequest.getNim());
            alumni.setName(alumniRequest.getName());
            alumni.setEmail(alumniRequest.getEmail());
            alumni.setNo_hp(alumniRequest.getNo_hp());
            alumni.setProgram_studi(alumniRequest.getProgram_studi());
            alumni.setJudul_ta(alumniRequest.getJudul_ta());
            alumni.setTgl_lulus(alumniRequest.getTgl_lulus());
            alumni.setFileName(fileName);
            alumni.setFileType(file.getContentType());
            try {
                alumni.setData(file.getBytes());
            } catch (IOException e) {
                // Handle the IOException here or rethrow it as an unchecked exception if
                // needed.
                throw new RuntimeException("Error reading file content: " + e.getMessage(), e);
            }
            return alumniRepository.save(alumni);
        }).orElseThrow(() -> new ResourceNotFoundException("Profil", "id", id));
    }

    public void deleteAlumniById(Long id) {
        Optional<Alumni> alumni = alumniRepository.findById(id);
        if (alumni.isPresent()) {
            alumniRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("alumni", "id", id);
        }
    }
}
