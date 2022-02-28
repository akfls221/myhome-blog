package com.taekwon.myhome.service;

import com.taekwon.myhome.domain.board.Board;
import com.taekwon.myhome.domain.board.BoardRepository;
import com.taekwon.myhome.web.dto.BoardListResponseDto;
import com.taekwon.myhome.web.dto.BoardResponseDto;
import com.taekwon.myhome.web.dto.BoardSaveRequestDto;
import com.taekwon.myhome.web.dto.BoardUpdateRequestDto;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    @Transactional
    public Long save(BoardSaveRequestDto requestDto) { return boardRepository.save(requestDto.toEntity()).getId();}

    @Transactional
    public Long update(Long id, BoardUpdateRequestDto requestDto){
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));

        board.updateBoard(requestDto.getTitle(), requestDto.getSub(), requestDto.getContent());

        return id;
    }

    public BoardResponseDto findById(Long id) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));

        return new BoardResponseDto(board);
    }

    public Page<BoardListResponseDto> findAllDesc (Pageable pageable) {
        int page = pageable.getPageNumber() == 0 ? 0 : (pageable.getPageNumber() - 1);
        pageable = PageRequest.of(page, 6);
        return boardRepository.findAllDesc(pageable).map((board) -> new BoardListResponseDto(board));
    }

    public List<BoardListResponseDto> findTop3() {
        return boardRepository.findTop3ByOrderByCreatedDateDesc().stream().map((BoardListResponseDto::new)).collect(Collectors.toList());
    }
}
