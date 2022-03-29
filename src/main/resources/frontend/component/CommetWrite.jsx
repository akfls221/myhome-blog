import react, {memo, useEffect, useState} from 'react';
import React from "react";
import {getCookie} from "../util/Cookie";
import Picker from "emoji-mart/dist-modern/components/picker/picker";
import axios from "axios";
import {backend} from "../util/config";
import {toast} from "react-toastify";

const CommentWrite = memo(({feedBackId, getFeedBackView}) => {
  const [replyContent, setReplyContent] = useState('');
  const [writeState, setWriteState] = useState(true);
  const [previewState, setPreviewState] = useState(false);
  const [profile, setProfile] = useState('../static/img/user_icon.png');
  const [emojiState, setEmojiState] = useState(false);

  const userInfo = getCookie('loginCookie');


  const handleReply = (e) => {
    setReplyContent(e.target.value);
  }

  const handleTabWrite = (e) => {
    e.preventDefault();
    setWriteState(true);
    setPreviewState(false);
  }

  const handelTabPreview = (e) => {
    e.preventDefault();
    setWriteState(false);
    setPreviewState(true);
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
    let emoji = e.native;
    setReplyContent(prevState => {
      return prevState + emoji;
    });
    setEmojiState(false);
  }

  const submitComment = (e) => {
    e.preventDefault();

    if (userInfo === undefined) {
      toast.info('로그인 후 이용 부탁드립니다.', {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER
      });
      return;
    } else if (replyContent.length === 0 || replyContent === '') {
      toast.error('댓글 내용은 필수 입력값 입니다.', {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }

    axios({
      method: "POST",
      url: `http://${backend}/api/v1/comment`,
      data: {
        feedBackId: feedBackId,
        userId: userInfo.id,
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
      toast.success('댓글이 등록되었습니다.', {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER
      });
      setReplyContent('');
      getFeedBackView();

    }).catch(error => {
      console.log(error);
      toast.error('댓글등록에 문제가 있습니다. 관리자에게 문의해 주세요.', {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER
      });
    });
  }

  useEffect(() => {
    if (userInfo !== undefined) {
      setProfile(userInfo.picture)
    }
  }, []);

  return (
      <>
        <img className="comment-profile" src={profile}/>
        <form className="comment" onSubmit={submitComment}>
          <header className="comment-header">
            <div className="tabnav-tabs">
              <button className="tabnav-tab" aria-selected={writeState} onClick={handleTabWrite}>write</button>
              <button className="tabnav-tab" aria-selected={previewState} onClick={handelTabPreview}>Preview</button>
              <div className="emoji-plus" onClick={handleEmojiState}>
                +
                <i className="bi bi-emoji-laughing"/>
              </div>
              {emojiState === true &&
              <div className="dropdown">
                <Picker onSelect={addEmoji} sheetSize={16} style={{bottom: '10px', right: '10px'}} emojiSize={20}/>
              </div>
              }
            </div>
          </header>
          <div className="comment-content">
            {writeState === true ?
                <textarea className="comment-area"
                          type="text"
                          value={replyContent}
                          onChange={handleReply}
                          placeholder="댓글 내용을 입력해주세요."
                />
                :
                <textarea className="comment-area"
                          readOnly
                          value={replyContent}
                          placeholder="작성된 댓글이 없습니다."
                />
            }
          </div>
          <footer className="new-comment-footer">
            <div></div>
            <button className="btn-sm btn-comment" onClick={submitComment}>Comment</button>
          </footer>
        </form>
      </>
  );


});

export default CommentWrite;

