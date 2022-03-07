package com.taekwon.myhome.service;

import com.taekwon.myhome.domain.posts.Posts;
import com.taekwon.myhome.domain.posts.PostsRepository;
import com.taekwon.myhome.web.dto.PostsListResponseDto;
import com.taekwon.myhome.web.dto.PostsResponseDto;
import com.taekwon.myhome.web.dto.PostsSaveRequestDto;
import com.taekwon.myhome.web.dto.PostsUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PostsService {

    private final PostsRepository postsRepository;

    @Transactional
    public Long save(PostsSaveRequestDto requestDto) {
        return postsRepository.save(requestDto.toEntity()).getId();
    }

    @Transactional
    public Long update(Long id, PostsUpdateRequestDto requestDto) {
        Posts posts = postsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));

        posts.update(requestDto.getTitle(), requestDto.getContent(), requestDto.getAuthor(), requestDto.getType());

        return id;
    }

    public PostsResponseDto findById(Long id) {
        Posts posts = postsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));

        return new PostsResponseDto(posts);
    }

    public Page<PostsListResponseDto> searchPosts(String type, String searchValue, Pageable pageable) {
        int page = pageable.getPageNumber() == 0 ? 0 : (pageable.getPageNumber() - 1);
        pageable = PageRequest.of(page, 10);

        if(searchValue.isBlank()) {
            return postsRepository.findAllDesc(pageable).map(posts -> new PostsListResponseDto(posts));
        } else if (type.equals("T")) {
            return postsRepository.findByTitleContainingIgnoreCase(searchValue, pageable).map(PostsListResponseDto::new);
        } else if (type.equals("C")){
            return postsRepository.findByContentContainingIgnoreCase(searchValue, pageable).map(PostsListResponseDto::new);
        } else {
            throw new IllegalArgumentException("검색중 오류가 발생하였습니다. 관리자에게 문의해 주세요.");
        }
    }

    public List<PostsListResponseDto> findTop3() {
        return postsRepository.findTop3ByOrderByCreatedDateDesc().stream().map(PostsListResponseDto::new).collect(Collectors.toList());
    }
}
