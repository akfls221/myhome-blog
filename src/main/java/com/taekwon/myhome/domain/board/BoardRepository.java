package com.taekwon.myhome.domain.board;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {

    @Query("select b from Board b order by b.id desc")
    Page<Board> findAllDesc(Pageable pageable);

    List<Board> findTop3ByOrderByCreatedDateDesc();

    Page<Board> findByContentContainingIgnoreCase(String content, Pageable pageable);

    Page<Board> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    @Modifying
    @Query("update Board b set b.hitCount = b.hitCount + 1 where b.id = :id")
    int updateView(@Param("id") Long id);
}
