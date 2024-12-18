package com.doyatama.university.service;

import com.doyatama.university.exception.BadRequestException;
import com.doyatama.university.exception.FileStorageException;
import com.doyatama.university.exception.ResourceNotFoundException;
import com.doyatama.university.model.Dosen;
import com.doyatama.university.model.Profil;
import com.doyatama.university.payload.profil.ProfilRequest;
import com.doyatama.university.payload.profil.ProfilResponse;
import com.doyatama.university.payload.PagedResponse;
import com.doyatama.university.payload.dosen.DosenRequest;
import com.doyatama.university.payload.dosen.DosenResponse;
import com.doyatama.university.property.FileStorageProperties;
import com.doyatama.university.repository.DosenRepository;
import com.doyatama.university.repository.ProfilRepository;
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
public class DosenService {
    @Autowired
    private DosenRepository dosenRepository;

    private final Path fileStorageLocation;

    private static final Logger logger = LoggerFactory.getLogger(ProfilService.class);

    @Autowired
    public DosenService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.",
                    ex);
        }
    }

    public PagedResponse<DosenResponse> getAllDosen(int page, int size) {
        validatePageNumberAndSize(page, size);

        // Retrieve Polls
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "id");
        Page<Dosen> dosens = dosenRepository.findAll(pageable);
        if (dosens.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), dosens.getNumber(),
                    dosens.getSize(), dosens.getTotalElements(), dosens.getTotalPages(), dosens.isLast(), 200);
        }
        // Map Polls to PollResponses containing vote counts and poll creator details
        List<DosenResponse> dosenResponses = dosens.map(asResponse -> {
            DosenResponse dosenResponse = new DosenResponse();
            dosenResponse.setId(asResponse.getId());
            dosenResponse.setNip(asResponse.getNip());
            dosenResponse.setName(asResponse.getName());
            dosenResponse.setEmail(asResponse.getEmail());
            dosenResponse.setNo_hp(asResponse.getNo_hp());
            dosenResponse.setProgram_studi(asResponse.getProgram_studi());
            dosenResponse.setBidang_minat(asResponse.getBidang_minat());
            dosenResponse.setFileName(asResponse.getFileName());
            dosenResponse.setFileType(asResponse.getFileType());
            dosenResponse.setData(asResponse.getData());

            return dosenResponse;
        }).getContent();
        return new PagedResponse<>(dosenResponses, dosens.getNumber(),
                dosens.getSize(), dosens.getTotalElements(), dosens.getTotalPages(), dosens.isLast(), 200);
    }

    public Dosen createDosen(UserPrincipal currentUser, @Valid DosenRequest dosenRequest, MultipartFile file)
            throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Dosen dosen = new Dosen();
        // organisasi.setCreatedBy(currentUser.getId());
        // organisasi.setUpdatedBy(currentUser.getId());
        dosen.setNip(dosenRequest.getNip());
        dosen.setName(dosenRequest.getName());
        dosen.setEmail(dosenRequest.getEmail());
        dosen.setNo_hp(dosenRequest.getNo_hp());
        dosen.setProgram_studi(dosenRequest.getProgram_studi());
        dosen.setBidang_minat(dosenRequest.getBidang_minat());
        dosen.setFileName(fileName);
        dosen.setFileType(file.getContentType());
        dosen.setData(file.getBytes());

        return dosenRepository.save(dosen);

    }

    public DosenResponse getDosenById(Long dosenId) {
        Dosen dosen = dosenRepository.findById(dosenId).orElseThrow(
                () -> new ResourceNotFoundException("Dosen", "id", dosenId));
        DosenResponse dosenResponse = new DosenResponse();
        dosenResponse.setId(dosen.getId());
        return dosenResponse;
    }

    private void validatePageNumberAndSize(int page, int size) {
        if (page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }
        if (size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }

    public Dosen updateDosen(@Valid DosenRequest dosenRequest, Long id, UserPrincipal currentUser,
            MultipartFile file) throws IOException {
        return dosenRepository.findById(id).map(dosen -> {
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());

            dosen.setNip(dosenRequest.getNip());
            dosen.setName(dosenRequest.getName());
            dosen.setEmail(dosenRequest.getEmail());
            dosen.setNo_hp(dosenRequest.getNo_hp());
            dosen.setProgram_studi(dosenRequest.getProgram_studi());
            dosen.setFileName(fileName);
            dosen.setFileType(file.getContentType());
            try {
                dosen.setData(file.getBytes());
            } catch (IOException e) {
                // Handle the IOException here or rethrow it as an unchecked exception if
                // needed.
                throw new RuntimeException("Error reading file content: " + e.getMessage(), e);
            }
            return dosenRepository.save(dosen);
        }).orElseThrow(() -> new ResourceNotFoundException("Profil", "id", id));
    }

    public void deleteDosenById(Long id) {
        Optional<Dosen> dosen = dosenRepository.findById(id);
        if (dosen.isPresent()) {
            dosenRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("Dosen", "id", id);
        }
    }
}
