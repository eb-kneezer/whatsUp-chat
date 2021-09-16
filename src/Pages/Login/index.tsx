import { doSignIn } from "../../chatUtility";
import { SiWhatsapp } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import Loader from "react-loader-spinner";

import "./Login.scss";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // let clear =
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // return clearTimeout(clear);
  }, []);

  return (
    <div className='login'>
      {isLoading && (
        <div className='login__loader-wrapper'>
          <Loader
            type='Grid'
            color='#00bfa5'
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </div>
      )}
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
