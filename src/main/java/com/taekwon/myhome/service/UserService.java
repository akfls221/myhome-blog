package com.taekwon.myhome.service;

import com.taekwon.myhome.domain.user.User;
import com.taekwon.myhome.domain.user.UserRepository;
import com.taekwon.myhome.exception.CUserNotFoundException;
import com.taekwon.myhome.security.JwtTokenProvider;
import com.taekwon.myhome.util.OauthUser;
import com.taekwon.myhome.util.OAuthToken;
import com.taekwon.myhome.web.dto.ProfileEditRequestDto;
import com.taekwon.myhome.web.dto.SignResponseDto;
import com.taekwon.myhome.web.dto.UserListResponseDto;
import com.taekwon.myhome.web.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@RequiredArgsConstructor
@Slf4j
@Service
public class UserService {

    private final UserRepository userRepository;
    private final OAuthService oauthService;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    public Page<UserListResponseDto> findAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable).map((user -> new UserListResponseDto(user)));
    }

    public UserResponseDto findById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new CUserNotFoundException("일치하는 회원이 없습니다."));
        return new UserResponseDto(user);
    }

    public SignResponseDto oauthLogin(String code, String socialType) {
        ResponseEntity<String> accessTokenResponse = oauthService.createPostRequest(code, socialType);
        OAuthToken oAuthToken = oauthService.getAccessToken(accessTokenResponse);
        log.info("Access Token: {}", oAuthToken.getAccess_token());

        ResponseEntity<JSONObject> userInfoResponse = oauthService.createGetRequest(oAuthToken, socialType);
        OauthUser oauthUser = oauthService.getUserInfo(userInfoResponse, socialType);

        User user = isJoinedUser(oauthUser);
        String token = jwtTokenProvider.createToken(String.valueOf(user.getId()), user.getRoles());

        SignResponseDto loginInfo = SignResponseDto.builder()
                .id(user.getId())
                .success(true)
                .code(0)
                .msg("Login Susses")
                .roles(user.getRoles())
                .name(user.getName())
                .uid(user.getUid())
                .picture(user.getProfileImageUrl())
                .accessToken(token)
                .socialType(user.getSocialType())
                .nickName(user.getNickName())
                .email(user.getEmail())
                .build();
        return loginInfo;
    }

    @Transactional
    public User isJoinedUser (OauthUser oauthUser) {
        if (userRepository.findByUid(oauthUser.email).isPresent()) {
            User user = userRepository.findByUid(oauthUser.email).get();
            user.update(oauthUser.name, oauthUser.picture);

            return user;
        } else {
            User user = User.builder()
                    .uid(oauthUser.email)
                    .email(oauthUser.email)
                    .roles(Collections.singletonList("ROLE_USER"))
                    .name(oauthUser.name)
                    .profileImageUrl(oauthUser.picture)
                    .socialType(oauthUser.socialType)
                    .nickName(oauthUser.name)
                    .build();
            userRepository.save(user);
            return user;
        }
    }

    @Transactional
    public SignResponseDto userModify(ProfileEditRequestDto requestDto) {
        User findUser = userRepository.findById(requestDto.getId()).orElseThrow(() -> new CUserNotFoundException("존재하는 회원이 없습니다."));

        if(requestDto.getPassword().isBlank()){
            findUser.userModify(
                    requestDto.getUid(),
                    findUser.getPassword(),
                    requestDto.getName(),
                    requestDto.getNickName(),
                    requestDto.getProfileImageUrl()
            );
        } else {
            findUser.userModify(
                    requestDto.getUid(),
                    passwordEncoder.encode(requestDto.getPassword()),
                    requestDto.getName(),
                    requestDto.getNickName(),
                    requestDto.getProfileImageUrl()
            );
        }

        String accessToken = jwtTokenProvider.createToken(String.valueOf(findUser.getId()), findUser.getRoles());

        return SignResponseDto.builder()
                .id(findUser.getId())
                .uid(findUser.getUid())
                .name(findUser.getName())
                .nickName(findUser.getNickName())
                .email(findUser.getEmail())
                .socialType(findUser.getSocialType())
                .accessToken(accessToken)
                .roles(findUser.getRoles())
                .picture(findUser.getProfileImageUrl())
                .build();
    }
}
