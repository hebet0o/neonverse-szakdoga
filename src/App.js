import './App.css';
import HeaderComponent from './components/HeaderComponent.js';
import HomeComponent from './components/HomeComponent.js';

//fonts
import "./font/fsalbert-extrabold.otf";
import "./font/SDGlitch_Demo.ttf"

function App() {
  return (
    <div className="App">
      <HeaderComponent></HeaderComponent>
      <HomeComponent></HomeComponent>
    </div>
  );
}

export default App;
