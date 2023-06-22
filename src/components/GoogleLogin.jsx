import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { client } from '../client';
import { useNavigate } from 'react-router-dom';

const GoogleLogin = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  function handleSignOut(e) {
    setUser({});
    document.getElementById('signInDiv').hidden = false;
  }

  function handleCallbackResponse(res) {
    // console.log(res);
    // console.log('Encoded JWT ID token' + res.credential);
    var userObject = jwt_decode(res.credential);
    // console.log(userObject);
    // console.log(JSON.stringify(userObject));
    localStorage.setItem('user', JSON.stringify(userObject));

    const { name, sub, picture } = userObject;
    // console.log(sub);

    //the format is the same to the user.js file in schemas folder of sanity server
    const doc = {
      _type: 'user',
      _id: sub,
      userName: name,
      image: picture,
    };
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });

    setUser(userObject);
    document.getElementById('signInDiv').hidden = true;
  }

  useEffect(() => {
    // console.log(process.env.REACT_APP_GOOGLE_APT_TOKEN);
    window.google?.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_APT_TOKEN,
      // '335174323231-dccd6vbj85kthjnp2fccc5f9gcb97cek.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });
    window.google?.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      {
        theme: 'outline',
        size: 'larger',
      }
    );
    // if (userObject) window.google?.accounts.id.prompt();
  }, []);
  return (
    <div className="shadow-2xl">
      <div className="cursor-pointer" id="signInDiv"></div>

      {/* {Object.keys(user).length !== 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )} */}

      {user && (
        <div>
          <img src={user?.picture} alt={user?.name} />
          <h3>{user?.name}</h3>
        </div>
      )}
    </div>
  );
};
export default GoogleLogin;
