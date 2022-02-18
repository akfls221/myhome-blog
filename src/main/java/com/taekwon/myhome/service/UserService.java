package com.taekwon.myhome.service;

import com.taekwon.myhome.domain.user.User;
import com.taekwon.myhome.domain.user.UserRepository;
import com.taekwon.myhome.exception.CUserNotFoundException;
import com.taekwon.myhome.security.JwtTokenProvider;
import com.taekwon.myhome.util.GoogleUser;
import com.taekwon.myhome.util.OAuthToken;
import com.taekwon.myhome.web.dto.SignResponseDto;
import com.taekwon.myhome.web.dto.UserListResponseDto;
import com.taekwon.myhome.web.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@RequiredArgsConstructor
@Slf4j
@Service
public class UserService {

    private final UserRepository userRepository;
    private final OAuthService oauthService;
    private final JwtTokenProvider jwtTokenProvider;

    public Page<UserListResponseDto> findAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable).map((user -> new UserListResponseDto(user)));
    }

    public UserResponseDto findById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(CUserNotFoundException::new);
        return new UserResponseDto(user);
    }

    public SignResponseDto oauthLogin(String code) {
        ResponseEntity<String> accessTokenResponse = oauthService.createPostRequest(code);
        OAuthToken oAuthToken = oauthService.getAccessToken(accessTokenResponse);
        log.info("Access Token: {}", oAuthToken.getAccess_token());

        ResponseEntity<String> userInfoResponse = oauthService.createGetRequest(oAuthToken);
        GoogleUser googleUser = oauthService.getUserInfo(userInfoResponse);

        User user = isJoinedUser(googleUser);
        String token = jwtTokenProvider.createToken(user.getUid(), user.getRoles());

        SignResponseDto loginInfo = SignResponseDto.builder()
                .success(true)
                .code(0)
                .msg("Login Susses")
                .roles(user.getRoles())
                .name(user.getName())
                .uid(user.getUid())
                .picture(user.getProfileImageUrl())
                .accessToken(token)
                .build();


        return loginInfo;
    }

    private User isJoinedUser (GoogleUser googleUser) {
        if (userRepository.findByUid(googleUser.email).isPresent()) {
            User user = userRepository.findByUid(googleUser.email).get();
            user.update(googleUser.name, googleUser.picture);

            return user;
        } else {
            User user = User.builder()
                    .uid(googleUser.email)
                    .roles(Collections.singletonList("ROLE_USER"))
                    .name(googleUser.name)
                    .profileImageUrl(googleUser.picture)
                    .build();

            userRepository.save(user);
            return user;
        }
    }
}
