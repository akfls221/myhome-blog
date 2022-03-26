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

import java.util.List;

@RequiredArgsConstructor
@RestController
//@CrossOrigin(origins = "http://localhost:80/")
@CrossOrigin(origins = "http://54.180.64.141:80/")
public class BoardApiController {

    private final BoardService boardService;

    @PostMapping("/api/v1/board")
    public long save(@RequestBody BoardSaveRequestDto requestDto) {
        return boardService.save(requestDto);
    }

    @PostMapping("/api/v1/boardUpdate/{id}")
    public long update(@PathVariable Long id, @RequestBody BoardUpdateRequestDto requestDto) {
        return boardService.update(id, requestDto);
    }

    @GetMapping("/api/v1/board/{id}")
    public BoardResponseDto findById(@PathVariable Long id) {
        return boardService.findById(id);
    }

    @PostMapping("/api/v1/board/boardList")
    public Page<BoardListResponseDto> searchBoards(String type, String searchValue, Pageable pageable) {
        return boardService.searchBoards(type, searchValue, pageable);
    }

    @PostMapping("/api/v1/board/recentBoardList")
    public List<BoardListResponseDto> findTop3() {
        return boardService.findTop3();
    }
}
