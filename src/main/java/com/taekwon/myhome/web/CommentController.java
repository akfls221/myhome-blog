package com.taekwon.myhome.web;

import com.taekwon.myhome.service.CommentService;
import com.taekwon.myhome.web.dto.CommentRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:8081/")
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/api/v1/comment")
    public Long save(@RequestBody CommentRequestDto requestDto) {
        return commentService.save(requestDto);
    }

    @PostMapping("/api/v1/comment/{commentId}")
    public void update(@PathVariable Long commentId, @RequestBody CommentRequestDto requestDto) {
        commentService.update(commentId, requestDto);
    }
}
