package com.taekwon.myhome;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class MyhomeApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyhomeApplication.class, args);
	}

}
