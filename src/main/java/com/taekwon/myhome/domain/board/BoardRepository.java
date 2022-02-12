package com.taekwon.myhome.domain.board;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BoardRepository extends JpaRepository<Board, Long> {

    @Query("select b from Board b order by b.id desc")
    Page<Board> findAllDesc(Pageable pageable);
}
