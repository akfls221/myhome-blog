package com.taekwon.myhome.web;

import com.taekwon.myhome.web.dto.ResponseDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "hello";
    }

    @GetMapping("/hello/dto")
    public ResponseDto responseDto(@RequestParam("name") String name, @RequestParam("amount") int amount) {

        ResponseDto result = new ResponseDto(name, amount);

        return result;


    }
}
