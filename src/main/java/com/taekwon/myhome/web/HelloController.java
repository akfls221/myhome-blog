package com.taekwon.myhome.web;

import com.taekwon.myhome.web.dto.HelloResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HelloController {
    private static final String ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
    private static final String CLIENT_ID = "97349397252-mt48smpgrdhkman43m89gt5hh1644jn6.apps.googleusercontent.com";
    private static final String REDIRECT_URI = "http://localhost:8080/test/callback";
    private static final String RESPONSE_TYPE = "code";
    private static final String SCOPE = "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";

    @GetMapping("/hello")
    public String hello() {
        return "hello";
    }

    @GetMapping("/hello/dto")
    public HelloResponseDto responseDto(@RequestParam("name") String name, @RequestParam("amount") int amount) {

        HelloResponseDto result = new HelloResponseDto(name, amount);

        return result;
    }

    @GetMapping(value = "/login")
    public String socialLoginType() {
        return "redirect:" + ENDPOINT + "?client_id=" + CLIENT_ID + "&redirect_uri=" + REDIRECT_URI
                + "&response_type=" + RESPONSE_TYPE + "&scope=" + SCOPE;
    }

    @ResponseBody
    @GetMapping(value = "/test/callback")
    public ResponseEntity<String> callback(String code) {
        System.out.println(">> 소셜 로그인 API 서버로부터 받은 code :: {}" + code);
        return new ResponseEntity("dddd", HttpStatus.OK);
    }

//    @ResponseBody
//    @GetMapping(value = "/test/callback")
//    public ResponseEntity<String> callback2(String code) {
//        System.out.println(">> 소셜 로그인 API 서버로부터 받은 code :: {}" + code);
//        return new ResponseEntity("dddd", HttpStatus.OK);
//    }
}
