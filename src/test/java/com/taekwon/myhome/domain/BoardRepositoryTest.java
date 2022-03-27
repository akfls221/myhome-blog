//package com.taekwon.myhome.domain;
//
//import com.taekwon.myhome.domain.board.Board;
//import com.taekwon.myhome.domain.board.BoardRepository;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.annotation.Rollback;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//import static org.assertj.core.api.Assertions.assertThat;
//
//
//@SpringBootTest
//@Rollback
//class BoardRepositoryTest {
//
//    @Autowired
//    BoardRepository repository;
//
//
//    @BeforeEach
//    void cleanUP() {
//        repository.deleteAll();
//    }
//
//    @Test
//    void insert_test() {
//        String title = "제목입니다";
//        String content = "예에엥?";
//        String sub = "TTTTTTT";
//
//        //given
//        repository.save(Board.builder()
//                .title(title)
//                .content(content)
//                .sub(sub)
//                .build());
//
//        //when
//        List<Board> result = repository.findAll();
//
//        //then
//        assertThat(result.get(0).getTitle()).isEqualTo(title);
//        assertThat(result.get(0).getContent()).isEqualTo(content);
//        assertThat(result.get(0).getSub()).isEqualTo(sub);
//    }
//
////    @Test
////    void BaseTimeEntity_insert() {
////        //given
////        LocalDateTime now = LocalDateTime.now();
////        repository.save(Board.builder()
////                .title("title")
////                .content("content")
////                .author("author")
////                .build());
////
////        //when
////        List<Board> all = repository.findAll();
////
////        //then
////        Board posts = all.get(0);
////        System.out.println(">>>>>>CreatedDate = " + posts.getCreatedDate());
////        System.out.println(">>>>>>ModifiedDate = " + posts.getModifiedDate());
////
////        assertThat(posts.getCreatedDate()).isAfter(now);
////        assertThat(posts.getModifiedDate()).isAfter(now);
////    }
//
//}