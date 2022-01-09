import React from 'react';
import { useRef, useEffect } from 'react';
import dndImage from '../images/image.svg';
import { useNavigate } from "react-router-dom";
const axios = require('axios');

const UploadScreen = () => {
  const dragTimeoutRef = useRef(undefined);
  let navigate = useNavigate();

  const formSubmit = async (event) => {
    event.preventDefault();
    let formElement = document.querySelector('#image-form');
    let formData = new FormData(formElement);
    let submission = await axios.post('/api/images', formData);
    navigate(`/uploaded/${submission.data}`);
  }

  const dropHandler = async (event) => {
    event.preventDefault();
    let opaqueElements = document.querySelectorAll('.dnd-opaque');
    opaqueElements.forEach(el => el.style.opacity = 1);
    let droppedFile = event.dataTransfer.files[0];
    if (!droppedFile.type.includes('image/')) {
      alert('You may only upload image files.');
      return;
    }

    let formElement = document.querySelector('#image-form');
    let formData = new FormData(formElement);
    formData.set('image', droppedFile);
    let submission = await axios.post('/api/images', formData);
    navigate(`/uploaded/${submission.data}`);
  }

  const dragHandler = event => {
    event.preventDefault();
    let opaqueElements = document.querySelectorAll('.dnd-opaque');
    opaqueElements.forEach(el => el.style.opacity = 0.2);
    clearTimeout(dragTimeoutRef.current);
    dragTimeoutRef.current = setTimeout(() => {
      opaqueElements.forEach(el => el.style.opacity = 1);
    }, 100)
  }

  const bodyDropHandler = event => {
    event.preventDefault();
  }

  const dragEnd = event => {
    event.preventDefault();
    let opaqueElements = document.querySelectorAll('.dnd-opaque');
    opaqueElements.forEach(el => el.style.opacity = 1);
  }

  useEffect(() => {
    document.body.addEventListener('dragover', dragHandler);
    document.body.addEventListener('dragend', dragEnd);
    document.body.addEventListener('drop', bodyDropHandler);
  }, [])

  return (
    <main>
      <div className="dnd-opaque">
        <h1>Upload Your Image</h1>
        <p>File should be JPG, PNG, etc...</p>
      </div>
      <div id="dnd" onDrop={dropHandler} >
        <img id="dnd-image" src={dndImage} ></img>
        <div id="dnd-text">Drag & Drop your image here</div>
      </div>
      <div className="dnd-opaque">
        <p id="or">Or</p>
        <form id="image-form" method="post" action="/api/images" encType="multipart/form-data" onSubmit={formSubmit}>
          <label htmlFor="image-upload">Choose a file</label>
          <input type="file"
            id="image-upload" name="image"
            accept="image/*" onChange={formSubmit} />
        </form>
      </div>
    </main>
  )
}

export default UploadScreen;