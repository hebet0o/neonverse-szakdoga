import './App.css';
import HeaderComponent from './components/HeaderComponent.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SocialMediaButtons from './components/SocialMediaButtons.js';


//fonts
import "./font/fsalbert-extrabold.otf";
import "./font/SDGlitch_Demo.ttf"

import Home from './components/HomeComponent.js';
import VirtualAssets from './components/VirtualAssetsComponent.js';
import NFT from './components/NFTComponent.js';
import VirtualEvents from './components/VirtualEventsComponent.js';
import Contact from './components/ContactComponent.js';
import Login from './components/LoginComponent.js';
import Register from './components/RegisterComponent.js';


function App() {
  return (
    <div className="App">
    <Router>
      <HeaderComponent className="HeaderComponent"/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/virtual-assets" element={<VirtualAssets />} />
        <Route path="/nft" element={<NFT />} />
        <Route path="/virtual-events" element={<VirtualEvents />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
    <SocialMediaButtons className="SocialMediaButtons"></SocialMediaButtons>
    </div>
  );
}

export default App;
