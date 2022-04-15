import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from './../context/UserContext'
import "../css/home.css";

const Dropdown = ({ isOpen, toggle }) => {

    let { user, logoutUser } = useContext(UserContext) 

  return (
    <div
      class={
        isOpen
          ? 'md:hidden flex flex-col text-center font-light text-xl justify-center items-center text-white'
          : 'hidden'
      }
      onClick={toggle}
      // id='navtoggle'
    >
      <Link to='/' class='p-4 hover:bg-blue-800 bg-blend-normal bg-black min-w-full '>
        Home
      </Link>
      <Link to='/books' class='p-4 hover:bg-blue-800 bg-black min-w-full'>
      Rated Books
      </Link>
      <Link to='/cart' class='p-4 hover:bg-blue-800 bg-black min-w-full'>
      Cart
      </Link>
      <Link to='/orders' class='p-4 hover:bg-blue-800 bg-black min-w-full'>
      My Orders
      </Link>
        <Link to='/dashboard' class='p-4 hover:bg-blue-800 bg-black min-w-full'>
          Profile
        </Link>
      {!user ?
        <Link to='/login' class='p-4 bg-black min-w-full'>
            Login
        </Link>
        : 
        <Link to='/' onClick={logoutUser} class='p-4 bg-black min-w-full'>
            Logout
        </Link>
      }
    </div>
  );
};

export default Dropdown;