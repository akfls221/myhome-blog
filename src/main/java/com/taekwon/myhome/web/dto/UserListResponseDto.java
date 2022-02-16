package com.taekwon.myhome.web.dto;

import com.taekwon.myhome.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Getter
public class UserListResponseDto {

    private Long id;
    private String uid;
    private String name;
    private List<String> roles;
    private LocalDateTime modifiedDate;

    public UserListResponseDto(User entity) {
        this.id = entity.getId();
        this.uid = entity.getUid();
        this.name = entity.getName();
        this.roles = entity.getRoles();
        this.modifiedDate = entity.getModifiedDate();
    }
}
