import { Link } from 'react-router';
import tmpProfileImg from '../assets/tmp_profile.jpg'
import './Header.css'

interface HeaderType {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({isDark, setIsDark}: HeaderType) {

  const toggleSwitch = () => {
    setIsDark(prev => !prev);
  };

  return (
    <header id="nav-bar">
      <div>Grocery List App</div>
      <div>
        <div className="slider-container">
            <div
              className={`slider-switch ${isDark ? 'on' : 'off'}`}
              onClick={toggleSwitch}
            >
              <div className="slider-knob">{isDark ? 'ON' : 'OFF'}</div>
            </div>
        </div>
        <Link to="/index">Lists</Link>
        <Link to="/recipes">Recipes</Link>
        <button id="nav-profile-button">
          <img id="nav-profile-pic" src={tmpProfileImg} alt="Profile" />
        </button>
      </div>
    </header>
  );
};

export default Header;
