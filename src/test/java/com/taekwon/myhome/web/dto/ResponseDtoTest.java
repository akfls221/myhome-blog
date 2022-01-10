package com.taekwon.myhome.web.dto;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class ResponseDtoTest {


    @Test
    void 롬복_테스트() {
        String name = "hello";
        int amount = 1000;

        ResponseDto dto = new ResponseDto(name, amount);

        assertThat(dto.getName()).isEqualTo(name);
        assertThat(dto.getAmount()).isEqualTo(amount);
    }
}