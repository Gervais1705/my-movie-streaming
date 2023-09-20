import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
const Header = () => {
    return (
        <div className='header'>

        <div className='logo'>
            <Link to='/'>Gervais@ Streaming</Link>
        </div>
        <div className='user-image'>
            <img src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png" alt="user" />
        </div>
    </div>
    );
};

export default Header;