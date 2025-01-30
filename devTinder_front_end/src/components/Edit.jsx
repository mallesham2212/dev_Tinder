import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/constants';
import { addUser  } from '../../utils/userSlice';


const Edit = ({ user }) => {
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [about, setAbout] = useState(user.about);
    const [toast, setToast] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setError("");
        try {
            const res = await axios.patch(BASE_URL + "profile/edit", {
                firstName,
                lastName,
                age,
                gender,
                photoUrl,
                about
            }, { withCredentials: true });
            dispatch(addUser (res?.data?.data));
            setToast(true);
            setTimeout(() => {
                setToast(false);
            }, 3000);
        } catch (error) {
            setError(error?.response?.data);
        }
    };

    return (
        <div className='flex flex-col md:flex-row mx-4 md:mx-10 justify-center'>
            <div className="card bg-base-100 w-full md:w-96 shadow-xl mb-4 md:mb-0">
                <div className="card-body">
                    <h2 className="card-title flex justify-center">Edit</h2>

                    <label className="input input-bordered flex items-center gap-2">
                        <input onChange={(e) => setFirstName(e.target.value)} type="text" className="grow" placeholder="First Name" value={firstName} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        <input onChange={(e) => setLastName(e.target.value)} type="text" className="grow" placeholder="Last Name" value={lastName} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value)) {
                                    setAge(value);
                                }
                            }}
                            type="text"
                            className="grow"
                            placeholder="Age"
                            value={age}
                        />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        <span className="mr-2"></span>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="grow bg-base-100"
                        >
                            <option value="" disabled>Select your gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            onChange={(e) => setPhotoUrl(e.target.value)}
                            type="text"
                            className="grow"
                            placeholder="Photo URL"
                            value={photoUrl}
                        />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            onChange={(e) => setAbout(e.target.value)}
                            type="text"
                            className="grow"
                            placeholder="About"
                            value={about}
                        />
                    </label>
                    < p className='text-red-800 flex items-center'>{error}</p>
                    <div className="card-actions justify-center">
                        <button onClick={handleSubmit} className="btn btn-primary flex align-middle">Save Profile</button>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 w-full md:w-auto">
                <div className="card bg-base-300 w-full md:w-96 shadow-2xl my-10 mx-6">
                    <figure>
                        <img src={user.photoUrl} className="w-full" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{user.firstName} {user.lastName}</h2>
                        <div className='flex justify-start'>
                            {user.age && <p>{user.age}</p>}
                            <p>{user.gender}</p>
                        </div>
                        <p>{user.about}</p>
                    </div>
                </div>
            </div>

            {toast && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Profile Updated Successfully</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Edit;