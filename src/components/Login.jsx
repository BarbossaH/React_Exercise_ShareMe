import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
// import { useEffect, useState } from 'react';
// import jwt_decode from 'jwt-decode';
import GoogleLogin from './GoogleLogin';

const Login = () => {
  // const [user, setUser] = useState({});

  // function handleSignOut(e) {
  //   setUser({});
  //   document.getElementById('signInDiv').hidden = false;
  // }
  // function handleCallbackResponse(res) {
  //   console.log('Encoded JWT ID token' + res.credential);
  //   var userObject = jwt_decode(res.credential);
  //   console.log(userObject);
  //   setUser(userObject);
  //   document.getElementById('signInDiv').hidden = true;
  // }
  // useEffect(() => {
  //   window.google?.accounts.id.initialize({
  //     client_id:
  //       '335174323231-dccd6vbj85kthjnp2fccc5f9gcb97cek.apps.googleusercontent.com',
  //     callback: handleCallbackResponse,
  //   });
  //   window.google?.accounts.id.renderButton(
  //     document.getElementById('signInDiv'),
  //     {
  //       theme: 'outline',
  //       size: 'larger',
  //     }
  //   );
  //   window.google?.accounts.id.prompt();
  // }, []);
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} alt="logo" width="130px" />
          </div>
          {/* <div className="shadow-2xl">
            <div className="cursor-pointer" id="signInDiv"></div>
            {Object.keys(user).length !== 0 && (
              <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
            )}

            {user && (
              <div>
                <img src={user.picture} alt={user.name} />
                <h3>{user.name}</h3>
              </div>
            )}
          </div> */}
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};
export default Login;
