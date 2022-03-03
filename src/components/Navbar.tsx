import React, { FC } from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';

const Navbar: FC = (props) => {
    return (
        <nav>
            <h2><Link to="/">Student List Management</Link></h2>
        </nav>
    );
}

export default Navbar;