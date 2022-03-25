package com.taekwon.myhome.service;

import com.taekwon.myhome.domain.comment.Comment;
import com.taekwon.myhome.domain.feedBack.FeedBack;
import com.taekwon.myhome.domain.feedBack.FeedBackRepository;
import com.taekwon.myhome.domain.user.User;
import com.taekwon.myhome.domain.user.UserRepository;
import com.taekwon.myhome.exception.CUserNotFoundException;
import com.taekwon.myhome.exception.PostsFailedException;
import com.taekwon.myhome.web.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FeedBackService {

    private final FeedBackRepository feedBackRepository;
    private final UserRepository userRepository;

    @Transactional
    public Long save(FeedBackRequestDto requestDto) {
        User user = userRepository.findById(requestDto.getUserId()).orElseThrow(() -> new CUserNotFoundException("존재하는 회원이 없습니다."));

        return feedBackRepository.save(requestDto.toEntity(user)).getId();
    }

    public FeedBackResponseDto findById(Long id) {
        FeedBack feedBack = feedBackRepository.findById(id).orElseThrow(() -> new PostsFailedException("해당하는 피드백 게시물이 없습니다 id=" + id));
        List<Comment> comments = feedBack.getComments();
        comments.sort(Comparator.comparing(Comment::getId));

        List<CommentResponseDto> commentList = new ArrayList<>();

        comments.forEach(comment -> {
            commentList.add(CommentResponseDto.builder()
                    .id(comment.getId())
                    .modifiedDate(comment.getModifiedDate())
                    .user(new UserResponseDto(comment.getUser()))
                    .content(comment.getContent())
                    .build());
                }
        );

        return FeedBackResponseDto.builder()
                .id(feedBack.getId())
                .title(feedBack.getTitle())
                .content(feedBack.getContent())
                .feedbackType(feedBack.getFeedBackType())
                .auth(feedBack.getUser().getName())
                .modifyDate(feedBack.getModifiedDate())
                .comments(commentList)
                .build();
    }

    public boolean checkPw(FeedBackCheckAuthDto requestDto) {
        FeedBack feedBack = feedBackRepository.findById(requestDto.getBoardId()).orElseThrow(() -> new PostsFailedException("해당하는 피드백 게시물이 없습니다. id = " + requestDto.getBoardId()));

        if (requestDto.getUserId().equals(feedBack.getUser().getId())) {
            if (requestDto.getPassword().equals(feedBack.getPassword())) {
                return true;
            } else {
                throw new PostsFailedException("패스워드 입력 오류 입니다. 다시 확인해 주세요");
            }
        } else {
            throw new PostsFailedException("게시글을 작성한 회원만 열람이 가능합니다.");
        }
    }

    @Transactional
    public Long update(Long id, FeedBackRequestDto requestDto) {
        FeedBack feedBack = feedBackRepository.findById(id).orElseThrow(() -> new PostsFailedException("해당하는 피드백 게시물이 없습니다. id=" + id));

        if (feedBack.getUser().getId().equals(requestDto.getUserId())) {
            feedBack.update(requestDto.getTitle(), requestDto.getFeedBackType(), requestDto.getContent());
        } else {
            throw new PostsFailedException("해당 게시글은 작성자만 수정이 가능합니다.");
        }
        return id;
    }

    public Page<FeedBackListResponseDto> searchBoards(String type, String searchValue, Pageable pageable) {
        int page = pageable.getPageNumber() == 0 ? 0 : (pageable.getPageNumber() - 1);
        pageable = PageRequest.of(page, 10);

        if(searchValue.isBlank()) {
            return feedBackRepository.findAllDesc(pageable).map(FeedBackListResponseDto::new);
        } else if (type.equals("T")) {
            return feedBackRepository.findByTitleContainingIgnoreCase(searchValue, pageable).map(FeedBackListResponseDto::new);
        } else if (type.equals("C")){
            return feedBackRepository.findByContentContainingIgnoreCase(searchValue, pageable).map(FeedBackListResponseDto::new);
        } else if (type.equals("A")) {
            return feedBackRepository.findByFeedBackAuthor(searchValue, pageable).map(FeedBackListResponseDto::new);
        } else {
            throw new IllegalArgumentException("검색중 오류가 발생하였습니다. 관리자에게 문의해 주세요.");
        }
    }
}
