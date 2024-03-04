import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Form from './component/Form'
import Addques from './pages/Addques'
import Home from './pages/Home'
import Layout from './pages/Layout';
import CreateTest from './pages/CreateTest'
import "./styles.css"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Addques" element={<Addques />} />
          <Route path="CreateTest" element={<CreateTest />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

