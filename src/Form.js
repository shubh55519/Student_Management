import axios from 'axios'
// import React, { useState } from 'react'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import 'form.css';

function Form() {

  const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [avatar, setAvatar] = useState('');
  console.log(name, address, dob, email, avatar)
  
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(`Submitted: Name: ${name}, Address: ${address}, Email: ${email}, DOB: ${dob}, avatar: ${avatar}`)
    
    axios.post(`https://60e953c2673e350017c219b1.mockapi.io/student`, {
      name: name,
      address: address,
      email: email,
      dob: dob,
      avatar: avatar
    }).then((response) => {
      navigate('/')
      console.log(response)
    })
      .catch(err => console.log(err))
    setName("")
    setAddress("")
    setEmail("")
    setDob("")
    setAvatar("")
  }

  return (
    <>
      <Navbar />
      <div className='form-group'>
        <h1> Fill a new entry</h1>
        <form onSubmit={handleSubmit}>

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
        </form>
      </div>
    </>
  )
}
export default Form;