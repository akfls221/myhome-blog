package com.taekwon.myhome.service;

import com.taekwon.myhome.domain.user.User;
import com.taekwon.myhome.domain.user.UserRepository;
import com.taekwon.myhome.security.JwtTokenProvider;
import com.taekwon.myhome.web.dto.JoinRequestDto;
import com.taekwon.myhome.web.dto.SignResponseDto;
import com.taekwon.myhome.web.dto.SignRequestDto;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@RequiredArgsConstructor
@Service
public class SignService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Getter
    public enum CommonResponseDto{
        SUCCESS(true,0, "성공하셨습니다.");

        boolean success;
        int code;
        String msg;

        CommonResponseDto(boolean success, int code, String msg) {
            this.success = success;
            this.code = code;
            this.msg = msg;
        }
    }

    public SignResponseDto getSingleResult(SignRequestDto request) {

        User user = userRepository.findByUid(request.getUid()).orElseThrow(() -> new IllegalArgumentException("ID를 확인해 주세요"));
        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("패스워드를 확인해 주세요");
        }

        String accessToken = jwtTokenProvider.createToken(String.valueOf(user.getId()), user.getRoles());

        SignResponseDto response = SignResponseDto.builder()
                .success(CommonResponseDto.SUCCESS.success)
                .code(CommonResponseDto.SUCCESS.code)
                .msg(CommonResponseDto.SUCCESS.msg)
                .accessToken(accessToken)
                .id(user.getId())
                .uid(user.getUid())
                .name(user.getName())
                .email(user.getEmail())
                .socialType(user.getSocialType())
                .nickName(user.getNickName())
                .roles(user.getRoles())
                .picture(user.getProfileImageUrl())
                .build();

        return response;
    }

    public boolean isJoinedUser(String uid) {
        return userRepository.existsByUid(uid);
    }

    @Transactional
    public SignResponseDto join(JoinRequestDto request) {
        SignResponseDto response = new SignResponseDto();

        userRepository.save(User.builder()
                .uid(request.getUid())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .socialType("blog")
                .email(request.getEmail())
                .nickName(request.getNickName())
                .roles(Collections.singletonList("ROLE_USER"))
                .profileImageUrl(request.getProfileImageUrl())
                .build());

        setSuccessResponse(response);

        return response;
    }

    private void setSuccessResponse(SignResponseDto result) {
        result.setSuccess(true);
        result.setCode(CommonResponseDto.SUCCESS.getCode());
        result.setMsg(CommonResponseDto.SUCCESS.getMsg());
    }
}
