package com.taekwon.myhome.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.taekwon.myhome.util.OauthUser;
import com.taekwon.myhome.util.OAuthToken;
import com.taekwon.myhome.util.Oauth;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.LinkedHashMap;

@Service
@RequiredArgsConstructor
public class OAuthService {

    private final ObjectMapper objectMapper;
    private final RestTemplate restTemplate;
    private final Oauth oauth;

    public ResponseEntity<String> createPostRequest(String code, String socialType) {
        String url = oauth.makeTokenUrl(socialType);
        HttpEntity<MultiValueMap<String, String>> httpEntity = oauth.makePostRequest(code, socialType);

        return restTemplate.exchange(url, HttpMethod.POST, httpEntity, String.class);
    }

    public OAuthToken getAccessToken(ResponseEntity<String> response) {
        OAuthToken oAuthToken = null;
        try {
            oAuthToken = objectMapper.readValue(response.getBody(), OAuthToken.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return oAuthToken;
    }

    public ResponseEntity<JSONObject> createGetRequest(OAuthToken oAuthToken, String socialType) {
        String url = oauth.makeUserInfoUrl(socialType);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + oAuthToken.getAccess_token());
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity(headers);

        return restTemplate.exchange(url, HttpMethod.GET, request, JSONObject.class);
    }

    public OauthUser getUserInfo(ResponseEntity<JSONObject> userInfoResponse, String socialType) {
        JSONObject userInfo = userInfoResponse.getBody();
        OauthUser oauthUser = null;

        if (socialType.equals("google")) {
            oauthUser = OauthUser.builder()
                    .id((String) userInfo.get("id"))
                    .email((String) userInfo.get("email"))
                    .name((String) userInfo.get("name"))
                    .picture((String) userInfo.get("picture"))
                    .socialType(socialType)
                    .build();

        } else if (socialType.equals("kakao")) {
            LinkedHashMap kakao_account = (LinkedHashMap) userInfo.get("kakao_account");
            LinkedHashMap profileInfo = (LinkedHashMap) kakao_account.get("profile");

            oauthUser = OauthUser.builder()
                    .id(String.valueOf(userInfo.get("id")))
                    .email((String) kakao_account.get("email"))
                    .name((String) profileInfo.get("nickname"))
                    .picture((String) profileInfo.get("profile_image_url"))
                    .socialType(socialType)
                    .build();

        } else if (socialType.equals("naver")) {

        } else {
            return null;
        }
        return oauthUser;
    }

}
