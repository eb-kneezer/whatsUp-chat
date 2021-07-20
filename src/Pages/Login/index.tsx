import React from "react";

import { SiWhatsapp } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import "./Login.scss";
import { auth, provider, userDb } from "../../Firebase/firebase";

const LoginPage = () => {
  const doSignIn = () => {
    auth
      .signInWithPopup(provider)
      .then(result => {
        result.additionalUserInfo?.isNewUser &&
          userDb.ref(`users/${result.user?.uid}`).set({
            name: result.user?.displayName,
            email: result.user?.email,
            photo: result.user?.photoURL,
            uid: result.user?.uid,
          });
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='login'>
      <div className='login__img'></div>
      <div className='login__cta'>
        <div className='login__cta--icon'>
          <SiWhatsapp size='3em' />
        </div>
        <div className='login__cta--text'>Say WhatsUp!</div>
        <button onClick={doSignIn} className='login__cta--btn'>
          Log in
          <FcGoogle style={{ fontSize: "1.5rem", marginLeft: "10pxx" }} />
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
