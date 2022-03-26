package com.taekwon.myhome.web;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
//@CrossOrigin(origins = "http://localhost:80/")
@CrossOrigin(origins = "http://54.180.64.141:80/")
public class CommonApiController {

    @PostMapping("/api/img")
    public void imgUploader(@RequestBody MultipartFile file) {
        System.out.println("MultipartFile = " + file);
        String originalFilename = file.getOriginalFilename();
        System.out.println("originalFilename = " + originalFilename);
    }
}
