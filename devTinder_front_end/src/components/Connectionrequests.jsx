import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addPendingConnection, removeRequest } from '../../utils/pendingRequestsSlice';

const ConnectionRequests = () => {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.pendingRequests);

  const handleReview = async (status, _id) => {
    try {
      const res = await axios.post(BASE_URL + "request/review/" + status + "/" + _id, {}, { withCredentials: true });
      dispatch(removeRequest(_id));
    } catch (error) {
      console.log(error);
    }
  };

  const getPendingRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "requests/received", { withCredentials: true });
      dispatch(addPendingConnection(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPendingRequests();
  }, []);

  if (!users) return null;

  return (
    <div className="flex justify-center">
      {users && (
        <div className="flex flex-col w-full max-w-3xl p-4"> {/* Added max width and padding */}
          {users.map(user => (
            <div key={user._id} className="flex flex-col justify-around md:flex-row  items-center my-3 card bg-base-300 w-full mx-auto shadow-lg rounded-lg p-4"> {/* Full width for cards */}
              <div className="flex flex-row items-center justify-between"> {/* Align text vertically */}
                <div className="flex-shrink-0"> {/* Prevent image from shrinking */}
                  <img
                    src={user?.fromUserId?.photoUrl}
                    alt={`${user?.fromUserId?.firstName} ${user?.fromUserId?.lastName}`}
                    className="w-24 h-24 md:w-36 md:h-36 rounded-full object-cover mr-4" // Responsive image sizes
                  />
                </div>
                <div className="text-center md:text-left"> {/* Center text on small screens, left-align on larger screens */}
                  <h1 className='text-lg font-semibold'>{user?.fromUserId?.firstName + " " + user?.fromUserId?.lastName}</h1>
                  <div className="card-actions justify-evenly mt-2"> {/* Added margin-top for spacing */}
                    <button onClick={() => handleReview("accepted", user._id)} className="btn btn-primary">Accept</button>
                    <button onClick={() => handleReview("rejected", user._id)} className="btn btn-secondary">Ignore</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConnectionRequests;