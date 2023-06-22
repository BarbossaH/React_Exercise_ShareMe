import { client, urlFor } from '../client';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { fetchUer } from '../utils/fetchUser';
import { AiTwotoneDelete } from 'react-icons/ai';

const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {
  // console.log(destination, _id, postedBy);
  const [postHovered, setPostHovered] = useState(false);
  const [saveNumber, setSaveNumber] = useState(save?.length);
  const navigate = useNavigate();
  const userInfo = fetchUer();
  // console.log(userInfo.sub, postedBy?._id);
  // const alreadySaved = !!save?.filter((item) => {
  //   // console.log(item.postedBy._id === userInfo.sub);
  //   return item.postedBy._id === userInfo.sub;
  // })?.length;
  // console.log(save?.length);
  const savePin = (_id) => {
    if (!saveNumber) {
      const commit = client
        .patch(_id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [
          {
            _key: uuidv4(),
            userId: userInfo?.sub,
            postedBy: {
              _type: 'postedBy',
              _ref: userInfo?.sub,
            },
          },
        ])
        .commit();
      // console.log(commit);
      commit.then((result) => {
        const newSave = result.save?.length;
        // console.log(newSave);
        setSaveNumber(newSave);
        // console.log(result);
      });
    }
  };

  const deletePin = (id) => {
    client.delete(id).then((result) => {
      // console.log(result);
      // window.location.reload();
    });
  };
  // console.log(postHovered);
  return (
    <div className="m-2">
      <div
        onMouseEnter={() => {
          // console.log('entering');
          setPostHovered(true);
        }}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        {image && (
          <img
            className="rounded-lg w-full"
            src={urlFor(image).width(300).url()}
            alt="user-post"
          />
        )}
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: '100%' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {/* save button */}
              {saveNumber ? (
                <button
                  type="button"
                  className=" bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {saveNumber} Saved
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  type="button"
                  className=" bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  Save
                </button>
              )}
            </div>
            {/* the link of the picture */}
            <div className="flex justify-between items-center gap-2 w-full">
              {destination && (
                <a
                  href={destination}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:100 hover:shadow-md"
                >
                  <BsFillArrowUpRightCircleFill />
                  {destination.length > 15
                    ? `${destination.slice(0, 15)}...`
                    : destination}
                </a>
              )}
              {/* delete the pin if belonging to the owner */}
              {postedBy?._id === userInfo?.sub && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  className=" bg-white p-2 opacity-70 hover:opacity-100 text-dark font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`user-profile/${postedBy?._id}`}
        className="flex gap-2 mt-2 items-center"
      >
        <img
          src={postedBy?.image}
          alt="user-profile"
          className="w-8 h-8 rounded-full object-cover"
        />
        <p className=" font-semibold capitalize">{postedBy?.userName}</p>
      </Link>
    </div>
  );
};
export default Pin;
