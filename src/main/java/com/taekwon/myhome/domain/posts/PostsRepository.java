package com.taekwon.myhome.domain.posts;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostsRepository extends JpaRepository<Posts, Long> {

    @Query("select p from Posts p order by p.id desc")
    Page<Posts> findAllDesc(Pageable pageable);

    List<Posts> findTop3ByOrderByCreatedDateDesc();

    Page<Posts> findByContentContainingIgnoreCase(String content, Pageable pageable);

    Page<Posts> findByTitleContainingIgnoreCase(String title, Pageable pageable);
}
