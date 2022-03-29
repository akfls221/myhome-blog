import React, {memo, useState} from 'react';
import {getCookie} from "../util/Cookie";
import Picker from "emoji-mart/dist-modern/components/picker/picker";
import axios from "axios";
import {backend} from "../util/config";
import {toast} from "react-toastify";

const CommentList = memo(({value, getFeedBackView}) => {
  const [editComment, setEditComment] = useState(false);
  const [emojiState, setEmojiState] = useState(false);
  const [replyContent, setReplyContent] = useState(value.content);

  const userInfo = getCookie('loginCookie');

  const displayedAt = (createDate) => {
    const milliSeconds = new Date() - new Date(createDate);
    const seconds = milliSeconds / 1000;

    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  }

  const handleReply = (e) => {
    setReplyContent(e.target.value);
  }

  const handleEmojiState = (e) => {
    e.preventDefault();
    if (emojiState) {
      setEmojiState(false);
    } else {
      setEmojiState(true);
    }
  }

  const addEmoji = e => {
    let emoji =e.native;
    setReplyContent(prevState => {
      return prevState + emoji;
    });
    setEmojiState(false);
  }

  const handleEditComment = (e) => {
    e.preventDefault();
    if(editComment){
      setEditComment(false);
      setReplyContent(value.content);
    } else {
      setEditComment(true);
    }
  }

  const editCommentContent = (e) => {
    e.preventDefault();
console.log(userInfo.id)
    console.log(value.user.id)
    if (userInfo.id !== value.user.id) {
      toast.error('해당 댓글을 수정할 수 있는 권한이 없습니다.', {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }else if (replyContent.length === 0 || replyContent === '') {
      toast.error('댓글 내용은 필수 입력값 입니다.', {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }

    axios({
      method: "POST",
      url: `http://${backend}/api/v1/comment/${value.id}`,
      data: {
        content: replyContent,
      },
    }).then((res) => {
      if (res.data.error) {
        toast.error(res.data.message, {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER
        });
        return;
      }
      toast.success('댓글이 수정되었습니다.', {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER
      });
      setReplyContent('');
      setEditComment(false);
      getFeedBackView();

    }).catch(error => {
      console.log(error);
      toast.error('댓글 수정에 문제가 있습니다. 관리자에게 문의해 주세요.', {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER
      });
    });
  }

  return (
      <>
        <div className="comment-list-wrapper">
          <img className="comment-profile" src={value.user.profile}/>
          <div className="comment">
            <header className="comment-list-header">
              <div className="tabnav-tabs">
                <strong className="comment-text">{value.user.name}</strong> 님의 댓글 {displayedAt(value.modifiedDate)}
                {editComment === true &&
                <>
                  <div className="emoji-plus" onClick={handleEmojiState}>
                    +
                    <i className="bi bi-emoji-laughing"/>
                  </div>
                  {emojiState === true &&
                    <div className="dropdown">
                      <Picker onSelect={addEmoji} sheetSize={16} style={{bottom: '10px', right: '10px'}} emojiSize={20}/>
                    </div>
                  }
                </>
                }
              </div>
            </header>
            <div className="comment-content">
              {editComment === false ?
              value.content
              :
              <textarea className="comment-area"
                        value={replyContent}
                        onChange={handleReply}
                        placeholder="댓글 내용을 입력해주세요."
              />
              }
            </div>
            <footer className="new-comment-footer">
              <div/>
              {userInfo !== undefined && userInfo.id === value.user.id && editComment === false &&
                <button className="btn-sm btn-comment" onClick={handleEditComment}>수정</button>
              }
              {userInfo !== undefined && userInfo.id === value.user.id && editComment === true &&
              <>
                <div>
                  <button className="btn-sm btn-comment" onClick={editCommentContent}>Comment</button>
                  <button className="btn-sm btn-cancel" onClick={handleEditComment}>Cancel</button>
                </div>
              </>
              }
            </footer>
          </div>
        </div>
      </>

  )
});

export default CommentList;