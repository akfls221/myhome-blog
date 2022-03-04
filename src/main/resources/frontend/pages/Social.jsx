import React, {useEffect} from 'react';
import axios from "axios";
import {setCookie} from "../util/Cookie";
import {useNavigate} from "react-router";

const Social = () => {
  const navigate = useNavigate();

  const socialLogin = () => {
    let code = new URL(window.location.href).searchParams.get("code");
    let socialType =  new URL(window.location.href).pathname.substring(1);

    axios({
      method: "GET",
      url: 'http://localhost:8080/social/google/callback?code=' + code + "&socialType=" + socialType,
    }).then((res) => {
      const resData = res.data
      console.log("!!!!!!!!!!!!!", resData);
      setCookie('loginCookie', resData, {
        expires: new Date(Date.parse(new Date()) + 1000 * 60 * 60)
      });
      location.reload();
    }).catch(error => {
      throw new Error(error);
    });

  }

  useEffect(() => {
    socialLogin();
    navigate("/");

  }, []);

  return(
    <>
    </>
  )
}

export default Social;