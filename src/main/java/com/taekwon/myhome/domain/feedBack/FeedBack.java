package com.taekwon.myhome.domain.feedBack;

import com.taekwon.myhome.domain.BaseTimeEntity;
import com.taekwon.myhome.domain.comment.Comment;
import com.taekwon.myhome.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
public class FeedBack extends BaseTimeEntity {

    @Id
    @GeneratedValue
    @Column(name = "feedBack_id")
    private Long id;

    @Column(length = 100, nullable = false)
    private String title;

    //단방향 연관관계(User)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String feedBackType;

    private String password;

    @Column(columnDefinition = "LONGTEXT", nullable = false)
    private String content;

    private String resultType;

    @OneToMany(mappedBy = "feedBack")
    private List<Comment> comments = new ArrayList<>();

    public void update(String title, String feedBackType, String content) {
        this.title = title;
        this.feedBackType = feedBackType;
        this.content = content;
    }
}
