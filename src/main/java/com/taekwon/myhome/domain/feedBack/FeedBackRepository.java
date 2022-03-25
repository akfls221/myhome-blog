package com.taekwon.myhome.domain.feedBack;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.OptionalLong;

public interface FeedBackRepository extends JpaRepository<FeedBack, Long> {

    @Query("select f from FeedBack f order by f.id desc")
    Page<FeedBack> findAllDesc(Pageable pageable);

    Page<FeedBack> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    Page<FeedBack> findByContentContainingIgnoreCase(String content, Pageable pageable);

    @Query(value = "select f, u.name from FeedBack f join fetch f.user u where u.name =:searchValue",
            countQuery = "select count(f) from FeedBack f left join f.user u where u.name =:searchValue")
    Page<FeedBack> findByFeedBackAuthor(@Param("searchValue") String searchValue, Pageable pageable);
}
