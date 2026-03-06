import cooking from '../assets/cooking.png';
import { useState } from 'react';

function Header(){
    const [menuOpen, setMenuOpen] = useState(false);

    return(
        <header>
            <nav>
                <img src={cooking} alt="Mini Chef Master" className='logo' />
                <span className='logo-text'>
                    Mini Chef Master
                </span>

                <button
                    className="menu-toggle"
                    aria-label="Toggle navigation"
                    onClick={() => setMenuOpen(prev => !prev)}
                >
                    ☰
                </button>

                <span className={`nav-links${menuOpen ? ' open' : ''}`}>
                    <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
                    <a href="#recipes" onClick={() => setMenuOpen(false)}>Recipes</a>
                    <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
                </span>
            </nav>
        </header>
    )
}
export default Header