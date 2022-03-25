package com.taekwon.myhome.web;

import com.taekwon.myhome.service.FeedBackService;
import com.taekwon.myhome.web.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:80/")
public class FeedBackApiController {

    private final FeedBackService feedBackService;

    @PostMapping("/api/v1/feedBack")
    public Long save(@RequestBody FeedBackRequestDto requestDto) {
        return feedBackService.save(requestDto);
    }

    @GetMapping("/api/v1/feedBack/{id}")
    public FeedBackResponseDto findById(@PathVariable Long id) {
        return feedBackService.findById(id);
    }

    @PostMapping("/api/v1/checkPw")
    public boolean checkPw(@RequestBody FeedBackCheckAuthDto requestDto) {
        return feedBackService.checkPw(requestDto);
    }

    @PostMapping("/api/v1/feedBack/{id}")
    public Long update(@PathVariable Long id, @RequestBody FeedBackRequestDto requestDto) {
        return feedBackService.update(id, requestDto);
    }

    @PostMapping("/api/v1/feedBackList")
    public Page<FeedBackListResponseDto> searchBoards(String type, String searchValue, Pageable pageable) {
        return feedBackService.searchBoards(type, searchValue, pageable);
    }

}
