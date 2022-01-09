import React from 'react';
import { useState, useRef, useEffect } from 'react';

const LoadingBar = ({ uploading }) => {
  const [direction, setDirection] = useState(1);
  const [leftMargin, setLeftMargin] = useState(0);
  const [loadingText, setLoadingText] = useState(undefined);
  const intervalRef = useRef(undefined);

  useEffect(() => {
    if (uploading) {
      setLoadingText('Uploading...');
    } else {
      setLoadingText('Loading...');
    }
    return () => clearInterval(intervalRef.current)
  }, []);

  useEffect(() => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (direction) {
        setLeftMargin(prev => prev + 0.5);
      } else {
        setLeftMargin(prev => prev - 0.5);
      }
    }, 10)
  }, [direction]);

  useEffect(() => {
    if (leftMargin <= 0 && !direction) {
      setDirection(1);
    } else if (leftMargin >= 90 && direction) {
      setDirection(0);
    }
  }, [leftMargin])

  let leftMarginString = leftMargin + '%';

  return (
    <>
      <div id="loading-text">{loadingText}</div>
      <div id="loading-container">
        <div id="loading-bar" style={{marginLeft: leftMarginString}}></div>
      </div>
    </>
  )
}

export default LoadingBar;