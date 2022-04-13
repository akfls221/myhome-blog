package com.taekwon.myhome.config;

import com.taekwon.myhome.security.JwtAuthenticationFilter;
import com.taekwon.myhome.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

/**
 * 서버 Security 보안 설정 작업
 * 참조 : https://daddyprogrammer.org/post/636/springboot2-springsecurity-authentication-authorization/
 */
@RequiredArgsConstructor
@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final JwtTokenProvider jwtTokenProvider;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable() // 기본설정 안함 기본설정시 > 비인증시 로그인폼 화면으로 redirect
                .cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues())
                .and()
                .csrf().disable() // csrf 보안 불필요
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) //jwt Token 인증으로 세션 불필요
                .and()
                .authorizeHttpRequests() //다음 리퀘스트에 대한 사용권한 체크
                .antMatchers("/api/v1/board", "/api/v1/boardUpdate/**").hasRole("ADMIN")
                .antMatchers("/api/v1/posts", "/api/v1/postsUpdate/**").hasRole("ADMIN")
                .antMatchers("/api/v1/feedBack", "/api/v1/feedBackView/**").hasAnyRole("ADMIN", "USER")
//                .antMatchers("/api/v1/manage/**").hasAnyRole("ADMIN", "USER")
                .anyRequest().permitAll()
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class); //jwt token 필터를 id/password 인증 필터 전에 넣는다
    }
}
