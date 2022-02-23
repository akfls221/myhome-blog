package com.taekwon.myhome.service;

import com.taekwon.myhome.domain.email.Email;
import com.taekwon.myhome.domain.email.EmailRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@AllArgsConstructor
@Service
public class EmailService {

    private final JavaMailSender emailSender;
    private final EmailRepository emailRepository;

    private Map<String, Object> emailCreate(String email) throws Exception {
        Map<String, Object> map = new HashMap<>();
        MimeMessage message = emailSender.createMimeMessage();
        String code = createRandomCode();

        message.addRecipients(Message.RecipientType.TO, email);
        message.setSubject("KwonBlog 가입 확인 코드 : " + code);

        String msg = "";
        msg += "<img width=\"120\" height=\"120\" style=\"margin-top: 0; margin-right: 0; margin-bottom: 32px; margin-left: 0px; padding-right: 30px; padding-left: 30px;\" src=\"http://localhost:8081/static/img/none-notice.png\" alt=\"\" loading=\"lazy\">";
        msg += "<h1 style=\"font-size: 30px; padding-right: 30px; padding-left: 30px;\">이메일 주소 확인</h1>";
        msg += "<p style=\"font-size: 17px; padding-right: 30px; padding-left: 30px;\">안녕하세요 KwonBlog 입니다.</p>";
        msg += "<p style=\"font-size: 17px; padding-right: 30px; padding-left: 30px;\">아래 확인 코드를 회원가입 창이 있는 브라우저 창에 입력하세요.</p>";
        msg += "<div style=\"padding-right: 30px; padding-left: 30px; margin: 32px 0 40px;\"><table style=\"border-collapse: collapse; border: 0; background-color: #F4F4F4; height: 70px; table-layout: fixed; word-wrap: break-word; border-radius: 6px;\"><tbody><tr><td style=\"text-align: center; vertical-align: middle; font-size: 30px;\">";
        msg += "<div style=\"font-size:40px; font-weight: bolder\">" + code + "</div>";

        message.setText(msg, "utf-8", "html");
        message.setFrom(new InternetAddress("kwonblogcheck@gmail.com", "KwonBlog 관리자"));

        map.put("message", message);
        map.put("code", code);

        return map;
    }

    @Transactional
    public void sendEmail(String to)throws Exception {
        Map<String, Object> emailMap = emailCreate(to);
        MimeMessage message = (MimeMessage) emailMap.get("message");
        LocalDateTime now = LocalDateTime.now();
        String code = emailMap.get("code").toString();

        try{
            emailSender.send(message);
            Email email = Email.builder()
                    .access_code(code)
                    .createDate(now)
                    .email(to)
                    .build();
            emailRepository.save(email);

        }catch(MailException es){
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
    }

    public boolean checkEmail(String email, String code) {
        String accessCode = emailRepository.findRecentEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("코드를 재발급 해주세요"))
                .getAccess_code();
        if (accessCode.equals(code)) {
            return true;
        } else {
            return false;
        }
    }

    private String createRandomCode() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 6; i++) { // 인증코드 6자리
            key.append((rnd.nextInt(10)));
        }
        return key.toString();
    }
}
