import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext';

const Header = () => {
    const{authUser} = useContext(UserContext);

    return (
        <header>
        <div class="wrap header--flex">
            <h1 class="header--logo"  
        </h1>
    )
}

