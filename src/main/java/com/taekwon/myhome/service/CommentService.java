package com.taekwon.myhome.service;

import com.taekwon.myhome.domain.comment.Comment;
import com.taekwon.myhome.domain.comment.CommentRepository;
import com.taekwon.myhome.domain.feedBack.FeedBack;
import com.taekwon.myhome.domain.feedBack.FeedBackRepository;
import com.taekwon.myhome.domain.user.User;
import com.taekwon.myhome.domain.user.UserRepository;
import com.taekwon.myhome.exception.CUserNotFoundException;
import com.taekwon.myhome.exception.PostsFailedException;
import com.taekwon.myhome.web.dto.CommentRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final FeedBackRepository feedBackRepository;

    @Transactional
    public Long save(CommentRequestDto requestDto) {
        User user = userRepository.findById(requestDto.getUserId()).orElseThrow(() -> new CUserNotFoundException("일치하는 회원이 없습니다."));
        FeedBack feedBack = feedBackRepository.findById(requestDto.getFeedBackId()).orElseThrow(() -> new PostsFailedException("존재하는 게시글이 없습니다."));

        Comment comment = requestDto.toEntity(user);
        comment.setFeedBack(feedBack);

        return commentRepository.save(comment).getId();
    }

    @Transactional
    public void update(Long commentId, CommentRequestDto requestDto) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new PostsFailedException("존재하는 게시글이 없습니다."));
        comment.update(requestDto.getContent());
    }
}
