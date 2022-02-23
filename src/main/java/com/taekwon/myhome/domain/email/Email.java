package com.taekwon.myhome.domain.email;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class Email {

    @Id
    @GeneratedValue
    @Column(name = "email_access_id")
    private Long id;
    private String email;
    private String access_code;
    private LocalDateTime createDate;
}
