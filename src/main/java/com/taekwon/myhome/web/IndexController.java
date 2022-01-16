package com.taekwon.myhome.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/notice")
    public String notice() {
        return "notice";
    }

    @GetMapping("/posts")
    public String posts() {
        return "posts";
    }
}
