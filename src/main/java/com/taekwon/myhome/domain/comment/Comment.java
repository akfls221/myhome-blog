package com.taekwon.myhome.domain.comment;

import com.taekwon.myhome.domain.BaseTimeEntity;
import com.taekwon.myhome.domain.feedBack.FeedBack;
import com.taekwon.myhome.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class Comment extends BaseTimeEntity {

    @Id
    @Column(name = "comment_id")
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feedBack_id")
    private FeedBack feedBack;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    private String content;

    public void setFeedBack(FeedBack feedBack) {
        if (this.feedBack != null) {
            this.feedBack.getComments().remove(this);
        }
        this.feedBack = feedBack;
        feedBack.getComments().add(this);
    }

    public void update(String content) {
        this.content = content;
    }
}
