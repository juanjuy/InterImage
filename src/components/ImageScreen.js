import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { Buffer } from 'buffer';
import checkImage from '../images/checkmark.svg';
import LoadingBar from './LoadingBar';
const axios = require('axios');
import { useNavigate } from "react-router-dom";

const ImageScreen = () => {
  let newlyUploaded = location.pathname.includes('uploaded');
  const [retrievedImage, setRetrievedImage] = useState(undefined);
  const [src, setSrc] = useState(undefined);
  let navigate = useNavigate();

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

  let url = `http://localhost:3001/images/${id}`;

  const copyLink = async (event) => {
    await navigator.clipboard.writeText(url);
    event.target.innerHTML = 'Link copied!';
  }

  if (retrievedImage) {
    return (
      <main>
        {newlyUploaded &&
        <><img src={checkImage} id="checkmark"></img>
          <div id="success-message">Uploaded Successfully!</div></>}
        <img src={src} id="retrieved-image" />
        <div id="url-container">
          <a id="url" href={url}>
            <span>{url}</span>
          </a>
          <button id="copy-button" onClick={copyLink}>Copy link</button>
        </div>
        <button id="home" onClick={() => navigate('/')}>Upload another image</button>
      </main>
    )
  } else {
    return (
      <main>
        <LoadingBar uploading={newlyUploaded} />
      </main>
    )
  }
}

export default ImageScreen;