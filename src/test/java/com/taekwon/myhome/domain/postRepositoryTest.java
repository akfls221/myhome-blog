package com.taekwon.myhome.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import java.util.List;
import static org.assertj.core.api.Assertions.*;


@SpringBootTest
@Rollback
class postRepositoryTest {

    @Autowired
    PostsRepository postRepository;


    @BeforeEach
    void cleanUP() {
        postRepository.deleteAll();
    }

    @Test
    void insert_test() {
        String title = "제목입니다";
        String content = "예에엥?";

        //given
        postRepository.save(Posts.builder()
                .title(title)
                .content(content)
                .build());

        //when
        List<Posts> result = postRepository.findAll();

        //then
        assertThat(result.get(0).getTitle()).isEqualTo(title);
        assertThat(result.get(0).getContent()).isEqualTo(content);
    }

}