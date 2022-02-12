package com.taekwon.myhome.web;

import com.taekwon.myhome.service.PostsService;
import com.taekwon.myhome.web.dto.PostsListResponseDto;
import com.taekwon.myhome.web.dto.PostsResponseDto;
import com.taekwon.myhome.web.dto.PostsSaveRequestDto;
import com.taekwon.myhome.web.dto.PostsUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:8081/")
public class PostsApiController {

    private final PostsService postsService;

    @PostMapping("/api/v1/posts")
    public long save(@RequestBody PostsSaveRequestDto requestDto) {
        return postsService.save(requestDto);
    }

    @PutMapping("/api/v1/posts/{id}")
    public Long update(@PathVariable Long id, @RequestBody PostsUpdateRequestDto requestDto) {
        return postsService.update(id, requestDto);
    }

    @GetMapping("/api/v1/posts/{id}")
    public PostsResponseDto findById(@PathVariable Long id) {
        return postsService.findById(id);
    }

    @PostMapping("/api/v1/postsList")
    public Page<PostsListResponseDto> findAllDesc(Pageable pageable) {
        return postsService.findAllDesc(pageable);
    }
}
