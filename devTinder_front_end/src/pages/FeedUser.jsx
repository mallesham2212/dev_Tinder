import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../../utils/feedSlice';

const FeedUser  = ({ user }) => {
    const dispatch = useDispatch();

    const handleRequestIgnore = async (status, _id) => {
        try {
            const res = await axios.post(BASE_URL + "request/send/" + status + "/" + _id, {}, { withCredentials: true });
            dispatch(removeFeed(_id));
        } catch (error) {
            console.log(error);
        }
    };

    const handleRequestInterest = async (status, _id) => {
        try {
            const res = await axios.post(BASE_URL + "request/send/" + status + "/" + _id, {}, { withCredentials: true });
            dispatch(removeFeed(_id));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center">
            <div className="card bg-base-300 max-w-xs md:max-w-md shadow-2xl my-10 mx-4"> {/* Centered card with responsive width */}
                <figure>
                    <img
                        src={user?.photoUrl}
                        alt={`${user?.firstName} ${user?.lastName}`}
                        className="rounded-t-lg object-cover w-full h-48" // Responsive image
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{user?.firstName} {user?.lastName}</h2>
                    {user?.age && <p>{user?.age} years old</p>}
                    <p>{user?.skills}</p>
                    <p>{user?.gender}</p>
                    <div className="card-actions justify-evenly">
                        <button onClick={() => handleRequestIgnore("ignored", user._id)} className="btn btn-primary">Ignore</button>
                        <button onClick={() => handleRequestInterest("intrested", user._id)} className="btn btn-secondary">Interested</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedUser ;
