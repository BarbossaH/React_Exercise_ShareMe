import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';
import { Sidebar, UserProfile } from '../components';
import Pins from './Pins';
import { client } from '../client';
import logo from '../assets/logo.png';
import { useEffect, useRef, useState } from 'react';
import { userQuery } from '../utils/data';
import { fetchUer } from '../utils/fetchUser';

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  const userInfo = fetchUer();
  // localStorage.getItem('user') !== undefined
  //   ? JSON.parse(localStorage.getItem('user'))
  //   : localStorage.clear();

  // console.log(userInfo);

  useEffect(() => {
    const query = userQuery(userInfo?.sub);
    // console.log(query);
    client.fetch(query).then((data) => {
      // console.log(data);
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        {/* mobile siderbar */}
        <Sidebar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to={'/'}>
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="logo" className="w-28 rounded-lg" />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 flex bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className=" absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                color={'red'}
                className=" cursor-pointer"
                onClick={() => {
                  setToggleSidebar(false);
                }}
              />
            </div>
            {/* destop siderbar */}
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};
export default Home;
