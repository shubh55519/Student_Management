import axios from 'axios'
// import React, { useState } from 'react'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
// import 'form.css';

function Form({ name, address, dob, email, photoUrl, setAddress, setDob, setEmail, setName, setPhotoUrl }) {
  console.log(name, address, dob, email, photoUrl)
  
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(`Submitted: Name: ${name}, Address: ${address}, Email: ${email}, DOB: ${dob}, Photo URL: ${photoUrl}`)
    
    axios.post(`https://60e953c2673e350017c219b1.mockapi.io/student`, {
      name: name,
      address: address,
      email: email,
      dob: dob,
      photoUrl: photoUrl
    }).then((response) => {
      navigate('/')
      console.log(response)
    })
      .catch(err => console.log(err))
    setName("")
    setAddress("")
    setEmail("")
    setDob("")
    setPhotoUrl("")
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
          <label htmlFor="photoUrl">Photo URL:</label>
          <input
            type="url"
            id="photoUrl"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  )
}
export default Form;