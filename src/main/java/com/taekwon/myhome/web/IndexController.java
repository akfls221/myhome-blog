package com.taekwon.myhome.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller("/")
public class IndexController {

    @GetMapping
    public String index() {
        return "index";
    }

    @GetMapping("notice")
    public String notice() {
        return "notice";
    }

    @GetMapping("notice_edit")
    public String noticeEdit() {
        return "notice_edit";
    }

    @GetMapping("posts")
    public String posts() {
        return "posts";
    }

    @GetMapping("/view/{id}")
    public String view(@PathVariable String id) {
        System.out.print("@@@@@@@@@@@@@@  id = " + id);
        return "view";

    }
}
