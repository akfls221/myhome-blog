package com.taekwon.myhome.domain.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUid(String uid);

    boolean existsByUid(String uid);

    boolean existsByEmail(String email);

    Page<User> findAll(Pageable pageable);

    Optional<User> findById(Long id);
}
