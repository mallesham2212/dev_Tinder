import React, { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../../utils/connections';

const Connections = () => {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.connection);

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "requests/connections", { withCredentials: true });
      dispatch(addConnection(res?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  return (
    <div className="flex justify-center">
      {users && (
        <div className="flex flex-col gap-4 w-full max-w-4xl p-4 "> 
          <h2 className='text-center text-2xl font-semibold'>Connections</h2>
          {users.map(user => (
            <div key={user._id} className="flex flex-col md:flex-row gap-2 items-center justify-between my-3 card bg-base-300 w-full mx-auto shadow-lg rounded-lg p-4 "> 
              <div className="flex-shrink-0"> 
                <img
                  src={user.photoUrl}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="rounded-full object-cover w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32" 
                />
              </div>
              <div className="flex flex-col justify-center text-center md:text-left"> 
                <h2 className="text-xl font-bold mb-1">{user.firstName} {user.lastName}</h2> 
                <p className="text-gray-700 mb-1">Age: {user.age}</p> 
                <p className="text-gray-600">{user.about}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Connections;