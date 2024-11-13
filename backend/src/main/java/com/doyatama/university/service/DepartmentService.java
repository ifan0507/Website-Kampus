package com.doyatama.university.service;


import com.doyatama.university.exception.BadRequestException;
import com.doyatama.university.exception.FileStorageException;
import com.doyatama.university.exception.ResourceNotFoundException;
import com.doyatama.university.model.Department;
import com.doyatama.university.payload.department.DepartmentRequest;
import com.doyatama.university.payload.department.DepartmentResponse;
import com.doyatama.university.payload.PagedResponse;
import com.doyatama.university.property.FileStorageProperties;
import com.doyatama.university.repository.DepartmentRepository;
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
public class DepartmentService {
    @Autowired
    private DepartmentRepository departmentRepository;

    private final Path fileStorageLocation;

    private static final Logger logger = LoggerFactory.getLogger(DepartmentService.class);

    @Autowired
    public DepartmentService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public PagedResponse<DepartmentResponse> getAllDepartment(int page, int size) {
        validatePageNumberAndSize(page, size);

        // Retrieve Polls
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "id");
        Page<Department> departments = departmentRepository.findAll(pageable);
        if(departments.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), departments.getNumber(),
                    departments.getSize(), departments.getTotalElements(), departments.getTotalPages(), departments.isLast(), 200);
        }
        // Map Polls to PollResponses containing vote counts and poll creator details
        List<DepartmentResponse> departmentResponses = departments.map(asResponse -> {
            DepartmentResponse departmentResponse = new DepartmentResponse();
            departmentResponse.setId(asResponse.getId());
//            organisasiResponse.setCreatedAt(asResponse.getCreatedAt());
//            organisasiResponse.setUpdatedAt(asResponse.getUpdatedAt());
            departmentResponse.setName(asResponse.getName());
            departmentResponse.setDescription(asResponse.getDescription());
            departmentResponse.setKompetensi(asResponse.getKompetensi());
            departmentResponse.setPeluang(asResponse.getPeluang());
            departmentResponse.setFileName(asResponse.getFileName());
            departmentResponse.setFileType(asResponse.getFileType());
            departmentResponse.setData(asResponse.getData());

            return departmentResponse;
        }).getContent();
        return new PagedResponse<>(departmentResponses, departments.getNumber(),
                departments.getSize(), departments.getTotalElements(), departments.getTotalPages(), departments.isLast(), 200);
    }

    public Department createDepartment(UserPrincipal currentUser, @Valid DepartmentRequest departmentRequest, MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Department department = new Department();
//        organisasi.setCreatedBy(currentUser.getId());
//        organisasi.setUpdatedBy(currentUser.getId());
        department.setName(departmentRequest.getName());
        department.setDescription(departmentRequest.getDescription());
        department.setKompetensi(departmentRequest.getKompetensi());
        department.setPeluang(departmentRequest.getPeluang());
        department.setFileName(fileName);
        department.setFileType(file.getContentType());
        department.setData(file.getBytes());

        return departmentRepository.save(department);
    }

    public DepartmentResponse getDepartmentById(Long departmentId) {
        Department department = departmentRepository.findById(departmentId).orElseThrow(
                () -> new ResourceNotFoundException("Department", "id", departmentId));
        DepartmentResponse departmentResponse = new DepartmentResponse();
        departmentResponse.setId(department.getId());
//        organisasiUploadResponse.setCreatedAt(organisasi.getCreatedAt());
//        organisasiUploadResponse.setUpdatedAt(organisasi.getUpdatedAt());
        return departmentResponse;
    }
    private void validatePageNumberAndSize(int page, int size) {
        if(page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }
        if(size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }
    public Department updateDepartment(@Valid DepartmentRequest departmentRequest, Long id, UserPrincipal currentUser, MultipartFile file) throws IOException {
        return departmentRepository.findById(id).map(department -> {
//            organisasi.setUpdatedBy(currentUser.getId());
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            // Organisasi organisasi = new Organisasi();
            //        organisasi.setCreatedBy(currentUser.getId());
            //        organisasi.setUpdatedBy(currentUser.getId());
            department.setName(departmentRequest.getName());
            department.setDescription(departmentRequest.getDescription());
            department.setKompetensi(departmentRequest.getKompetensi());
            department.setPeluang(departmentRequest.getPeluang());
            department.setFileName(fileName);
            department.setFileType(file.getContentType());
            try {
                department.setData(file.getBytes());
            } catch (IOException e) {
                // Handle the IOException here or rethrow it as an unchecked exception if needed.
                throw new RuntimeException("Error reading file content: " + e.getMessage(), e);
            }
            return departmentRepository.save(department);
        }).orElseThrow(() -> new ResourceNotFoundException("Department" , "id" , id));
    }
    public void deleteDepartmentById(Long id){
        Optional<Department> department = departmentRepository.findById(id);
        if(department.isPresent()){
            departmentRepository.deleteById(id);
        }else{
            throw new ResourceNotFoundException("Department", "id", id);
        }
    }
}
