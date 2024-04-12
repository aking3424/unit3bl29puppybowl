import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

const NavBar = ({ allPlayers }) => {
  return (
    <div className="NavContainer">
      <div className="NavBar">
        <Link id="FirstNavBItem" className="navBarItems" to='/'>Home |</Link>
        <Link className="navBarItems" to='AllPlayers'>All Players |</Link>
        <Link className="navBarItems" to='NewPlayerForm'>New Player Form |</Link>
        <Link className="navBarItems" to='DeletePlayer'>Delete Player |</Link>

        <Search allPlayers={allPlayers} />
      </div>
    </div>
  );
};

export default NavBar;