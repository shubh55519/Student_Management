import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Update({ studentId, setIsModalOpen }) {
    console.log(studentId, setIsModalOpen)
    console.log("studentId->", studentId,)
     
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [avatar, setAvatar] = useState('');
    const navigate = useNavigate();

    console.log(name, address, email, dob, avatar)

    useEffect(() => {
        const fetchStudent = async (studentId) => {

            try {
                const response = await axios.get(`https://60e953c2673e350017c219b1.mockapi.io/student/${studentId}`);
                // console.log(response.data);
                const { name, address, email, dob, avatar } = response.data
                // console.log(name, address, email, dob, avatar)
                setName(name);
                setAddress(address);
                setEmail(email);
                setDob(dob);
                setAvatar(avatar);
                throw new Error("StudentId might undefined")
            } catch (error) {
                console.error('Error fetching student:', error);
            }
        }
        fetchStudent(studentId)

    }, [])

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            navigate('/');
            setIsModalOpen(false);
            await axios.put(`https://60e953c2673e350017c219b1.mockapi.io/student/${studentId}`, {
                name: name,
                address: address,
                dob: dob,
                email: email,
                avatar: avatar
            });
            setName('')
            setEmail('')
            setDob('')
            setAddress('')
            setAvatar('')
        } catch (error) {
            console.error('Error editing resource:', error);
        }
    };
    

    return (
        <>
            <h1>Update</h1>
            <form onSubmit={handleUpdate}>
                <div className='form-group'>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="dob">DOB:</label>
                    <input
                        type="date"
                        id="dob"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                    />
                    <label htmlFor="avatar">Photo URL:</label>
                    <input
                        type="url"
                        id="avatar"
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                        required
                    />
                    <button type="submit">Submit</button>
                </div>
            </form>
        </>
    );
}

export default Update;
