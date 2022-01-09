import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadScreen from './components/UploadScreen';
import ImageScreen from './components/ImageScreen';

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path = "/" element={<UploadScreen />} />
          <Route path="/images/:id" element={<ImageScreen />} />
          <Route path="/uploaded/:id" element={<ImageScreen />} />
      </Routes>
      <footer>
        <div>Created by <a href="https://github.com/juanjuy">Juan Juy</a></div>
      </footer>
    </Router>
  )
}

export default App;