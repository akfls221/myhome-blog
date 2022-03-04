package com.taekwon.myhome.web;

import com.taekwon.myhome.service.EmailService;
import com.taekwon.myhome.service.SignService;
import com.taekwon.myhome.util.ProfileMaker;
import com.taekwon.myhome.web.dto.*;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1")
@CrossOrigin(origins = "http://localhost:8081/")
public class SignApiController {

    private final SignService signService;
    private final EmailService emailService;
    private final ProfileMaker profileMaker;
    @Value("${FilePath.dev}")
    private String rootPath;

    @PostMapping("/sign")
    public SignResponseDto sign(@RequestBody SignRequestDto request) {
        return signService.getSingleResult(request);
    }

    @PostMapping("/idCheck")
    public boolean isJoined(@RequestBody SignRequestDto request) {
        return signService.isJoinedUser(request.getUid());
    }


    @PostMapping("/join")
    public SignResponseDto join(@RequestBody JoinRequestDto request) {

        return signService.join(request);
    }

    @GetMapping("/email")
    public void emailCodeSend(String email) throws Exception {
        emailService.sendEmail(email);
    }

    @PostMapping(value = "/profile")
    public ProfileResponseDto uploadProfile(MultipartFile multipartFile) throws IOException {
        return profileMaker.saveFile(multipartFile);
    }

    @PostMapping(value = "/deleteProfile")
    public String deleteProfile(@RequestBody ProfileDeleteRequestDto requestPath) {
        return profileMaker.deleteProfile(requestPath);

    }

    @GetMapping(value = "/getProfile/{year}/{month}/{date}/{name}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<Resource> getProfile(@PathVariable String name,
                                               @PathVariable String year,
                                               @PathVariable String month,
                                               @PathVariable String date) {

        String subPath = "\\" + year + "\\" + month + "\\" + date + "\\";
        Resource resource = new FileSystemResource(rootPath + subPath + name);
        return new ResponseEntity<>(resource, HttpStatus.OK);
    }

    @GetMapping("/emailCheck")
    public boolean emailCheck(String email, String code) {
        return emailService.checkEmail(email, code);
    }
    
}
