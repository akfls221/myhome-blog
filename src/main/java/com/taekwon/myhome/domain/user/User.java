package com.taekwon.myhome.domain.user;

import com.taekwon.myhome.domain.BaseTimeEntity;
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
@Getter
@Builder
public class User extends BaseTimeEntity implements UserDetails {

    @Id
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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream().map((role) -> new SimpleGrantedAuthority(role)).collect(Collectors.toList());
    }

    @Builder
    public User(Long id, String uid, String password, String name, String profileImageUrl, List<String> roles) {
        this.id = id;
        this.uid = uid;
        this.password = password;
        this.name = name;
        this.profileImageUrl = profileImageUrl;
        this.roles = roles;
    }

    public User update(String name, String picture) {
        this.name = name;
        this.profileImageUrl = picture;

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
