import {createRef, useEffect} from 'react';
import React from "react";

const Comment = () => {
  const commentRef = createRef();

  useEffect(() => {
    const utterances = document.createElement('script');

    const utterancesConfig = {
      src: "https://utteranc.es/client.js",
      repo: "akfls221/myBlogComment",
      'issue-term': "pathname",
      theme: "github-light",
      crossOrigin: "anonymous",
      async: true,
    };

    Object.entries(utterancesConfig).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });

    commentRef.current.appendChild(utterances);
  }, []);

  return <div className="comments" ref={commentRef}></div>;

}

export default Comment;