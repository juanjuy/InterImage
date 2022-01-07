import React from 'react'
import { useState, useEffect } from 'react';
const axios = require('axios');
import {Buffer} from 'buffer';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router";

const DisplayImage = () => {
  const [retrievedImage, setRetrievedImage] = useState(undefined);
  const [src, setSrc] = useState(undefined);

  let { id } = useParams();

  const getImage = async () => {
    let data = await axios.get(`http://localhost:8000/images/${id}`);
    setRetrievedImage(data.data);
  }

  if (!retrievedImage) {
    getImage();
  }

  useEffect(() => {
    if (retrievedImage) {
      let data = retrievedImage.data.data;
      let buffer = Buffer.from(data);
      setSrc(`data:${retrievedImage.contentType};base64,${buffer.toString('base64')}`);
    }
  }, [retrievedImage]);

  if (retrievedImage) {
    return (
      <main>
        <div>Uploaded Successfully!</div>
        <img src={src} />
        <div>Your image url is <a>http://localhost:3001/{id}</a></div>
      </main>
    )
  } else {
    return (
      <>Loading...</>
    )
  }
}

const Upload = () => {
  let navigate = useNavigate();

  const formSubmit = async (event) => {
    event.preventDefault();
    let formElement = document.querySelector('#image-form');
    let formData = new FormData(formElement);
    let submission = await axios.post('http://localhost:8000/images', formData);
    navigate(`/${submission.data}`);
  }
  
  return (
    <main>
      <h1>Upload Your Image</h1>
      <p>File should be JPG, PNG, etc...</p>
      <div id="dnd">
        Drag and drop your image here
      </div>
      <p>Or</p>
      <form id="image-form" method="post" action="http://localhost:8000/images" encType="multipart/form-data" onSubmit={formSubmit}>
        <input type="file"
          id="image-upload" name="image"
          accept="image/*" />
        <input type="submit" value="Upload" />
      </form>
    </main>
  )
}
const App = () => {
  return (
    <Router>
      <Routes>
          <Route path = "/" element={<Upload />} />
          <Route path="/:id" element={<DisplayImage />} />
      </Routes>
    </Router>
  )
}

export default App;