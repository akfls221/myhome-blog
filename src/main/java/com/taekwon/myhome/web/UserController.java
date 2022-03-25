package com.taekwon.myhome.web;

import com.taekwon.myhome.service.UserService;
import com.taekwon.myhome.web.dto.ProfileEditRequestDto;
import com.taekwon.myhome.web.dto.SignResponseDto;
import com.taekwon.myhome.web.dto.UserListResponseDto;
import com.taekwon.myhome.web.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/v1/manage")
public class UserController {

    private final UserService userService;

    @GetMapping("/users")
    public Page<UserListResponseDto> finAllUsers(Pageable pageable) {
        return userService.findAllUsers(pageable);
    }

    @GetMapping("/user/{id}")
    public UserResponseDto findByUid(@PathVariable Long id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String name = authentication.getName();
        System.out.println("name = " + name);
        return userService.findById(id);
    }

    @PostMapping("/userEdit")
    public SignResponseDto userModify(@RequestBody ProfileEditRequestDto requestDto) {
        return userService.userModify(requestDto);
    }

}
