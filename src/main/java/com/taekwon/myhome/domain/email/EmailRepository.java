package com.taekwon.myhome.domain.email;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface EmailRepository extends JpaRepository<Email, Long> {

    @Query(value = "SELECT * FROM email WHERE email = :email AND create_date >= DATE_ADD(NOW(), INTERVAL -3 MINUTE) ORDER BY create_date DESC limit 1;", nativeQuery = true)
    Optional<Email> findRecentEmail(@Param("email") String email);

}
