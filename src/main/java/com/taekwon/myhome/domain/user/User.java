package com.taekwon.myhome.domain.user;

import com.taekwon.myhome.domain.BaseTimeEntity;
import com.taekwon.myhome.domain.feedBack.FeedBack;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class User extends BaseTimeEntity implements UserDetails {

    @Id
    @Column(name = "user_id")
    @GeneratedValue
    private Long id;

    @Column(nullable = false, unique = true, length=30)
    private String uid;

    private String password;

    private String name;

    private String profileImageUrl;

    @ElementCollection(fetch = FetchType.EAGER)
    @Column(nullable = false)
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    private String socialType;

    private String nickName;

    private String email;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream().map((role) -> new SimpleGrantedAuthority(role)).collect(Collectors.toList());
    }

    public User update(String name, String picture) {
        this.name = name;
        this.profileImageUrl = picture;

        return this;
    }

    public User userModify(String uid, String password, String name, String nickName, String profileImageUrl) {
        this.uid = uid;
        this.password = password;
        this.name = name;
        this.nickName = nickName;
        this.profileImageUrl = profileImageUrl;

        return this;
    }

    @Override
    public String getUsername() {
        return uid;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
