package com.taekwon.myhome.web;

import com.taekwon.myhome.service.PostsService;
import com.taekwon.myhome.web.dto.PostsListResponseDto;
import com.taekwon.myhome.web.dto.PostsResponseDto;
import com.taekwon.myhome.web.dto.PostsSaveRequestDto;
import com.taekwon.myhome.web.dto.PostsUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
//@CrossOrigin(origins = "http://localhost:80/")
@CrossOrigin(origins = "http://54.180.64.141:80/")
public class PostsApiController {

    private final PostsService postsService;

    @PostMapping("/api/v1/posts")
    public long save(@RequestBody PostsSaveRequestDto requestDto) {
        return postsService.save(requestDto);
    }

//    @CrossOrigin(origins = "http://localhost:80/")
    @CrossOrigin(origins = "http://54.180.64.141:80/")
    @PostMapping("/api/v1/postsUpdate/{id}")
    public Long update(@PathVariable Long id, @RequestBody PostsUpdateRequestDto requestDto) {
        return postsService.update(id, requestDto);
    }

    @GetMapping("/api/v1/posts/{id}")
    public PostsResponseDto findById(@PathVariable Long id) {
        return postsService.findById(id);
    }

    @PostMapping("/api/v1/postsList")
    public Page<PostsListResponseDto> searchPosts(String type, String searchValue, Pageable pageable) {
        return postsService.searchPosts(type, searchValue, pageable);
    }

    @PostMapping("/api/v1/recentPostList")
    public List<PostsListResponseDto> findTop3() {
        return postsService.findTop3();
    }

}
