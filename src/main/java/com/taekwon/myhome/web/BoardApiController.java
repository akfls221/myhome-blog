package com.taekwon.myhome.web;

import com.taekwon.myhome.service.BoardService;
import com.taekwon.myhome.web.dto.BoardListResponseDto;
import com.taekwon.myhome.web.dto.BoardResponseDto;
import com.taekwon.myhome.web.dto.BoardSaveRequestDto;
import com.taekwon.myhome.web.dto.BoardUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:8081/")
public class BoardApiController {

    private final BoardService boardService;

    @PostMapping("/api/board")
    public long save(@RequestBody BoardSaveRequestDto requestDto) {
        return boardService.save(requestDto);
    }

    @PostMapping("/api/boardUpdate/{id}")
    public long update(@PathVariable Long id, BoardUpdateRequestDto requestDto) {
        return boardService.update(id, requestDto);
    }

    @GetMapping("/api/board/{id}")
    public BoardResponseDto findById(@PathVariable Long id) {
        return boardService.findById(id);
    }

    @PostMapping("/api/board/boardList")
    public Page<BoardListResponseDto> findAllDesc(Pageable pageable) {
        return boardService.findAllDesc(pageable);
    }
}
