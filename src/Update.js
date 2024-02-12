import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Update({ studentId, setIsOpenModal }) {
    console.log(studentId)

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    // const [studentId, setStudentId] = useState([]);
    const navigate = useNavigate();


    console.log("studentId->", studentId, setIsOpenModal)
    console.log(name, address, email, dob, photoUrl)

    useEffect(() => {
        const fetchStudent = async (studentId) => {

            try {
                const response = await axios.get(`https://60e953c2673e350017c219b1.mockapi.io/student/${studentId}`);
                console.log(response.data);

            } catch (error) {
                console.error('Error editing resource:', error);
                // Handle error gracefully, e.g., display an error message
            }
        }
        fetchStudent(studentId)
    }, [studentId])


    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://60e953c2673e350017c219b1.mockapi.io/student/${studentId}`, {
                // name: name,
                // address: address,
                // dob: dob,
                // email: email,
                // photoUrl: photoUrl
                name: setName,
                address: setAddress,
                dob: setDob,
                email: setEmail,
                photoUrl: setPhotoUrl
            });
            console.log(response.data);
            // Log the response data if needed
            navigate('/');
            setIsOpenModal(false);
            setName('')
            setEmail('')
            setDob('')
            setAddress('')
            setPhotoUrl('')
        } catch (error) {
            console.error('Error editing resource:', error);
            // Handle error gracefully, e.g., display an error message
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
                    <label htmlFor="photoUrl">Photo URL:</label>
                    <input
                        type="url"
                        id="photoUrl"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        required
                    />
                    <button type="submit">Submit</button>
                </div>
            </form>
        </>
    );
}

export default Update;
