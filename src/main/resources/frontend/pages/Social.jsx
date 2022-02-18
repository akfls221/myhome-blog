import React, {useEffect} from 'react';
import axios from "axios";
import {setCookie} from "../util/Cookie";
import {useNavigate} from "react-router";

const Social = () => {
  const navigate = useNavigate();

  const test = () => {
    let code = new URL(window.location.href).searchParams.get("code");

    axios({
      method: "GET",
      url: 'http://localhost:8080/social/google/callback?code=' + code,
    }).then((res) => {
      const resData = res.data
      console.log("!!!!!!!!!!!!!", resData);
      setCookie('loginCookie', resData, {
        // httpOnly: true,
      });
      location.reload();
    }).catch(error => {
      throw new Error(error);
    });

  }

  useEffect(() => {

    test();
    navigate("/");

  }, []);

  return(
    <>
    </>
  )
}

export default Social;