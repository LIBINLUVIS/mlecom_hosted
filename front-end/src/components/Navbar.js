import { React, useContext,useEffect } from "react";
import { Link } from "react-router-dom";
import SearchField from "react-search-field";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import COMPANYLOGO from "../assets/images/Suyati-logo-01.svg";
import UserContext from "../context/UserContext";
import Avatar from "@mui/material/Avatar";
import LinearProgress from '@mui/material/LinearProgress';
import "../css/Navbar.css";

const SearchBar = () => {

  let { searchvalue, booksearch } = useContext(UserContext);

  const style = "relative m-3 w-full md:w-1/4 bg-blue-800";

  return (
    <SearchField
      classNames={style}
      placeholder="Search books"
      onChange={searchvalue}
      searchText=""
      onSearchClick={booksearch}
    />
  );

};

const Navbar = ({ toggle }) => {

  let { user, searchload } = useContext(UserContext);

  const LeftNavbar = () => {
    return (
      <Link to="/">
        <div class="w-40 h-20 pt-2 cursor-pointer logo-head">
          <img src={COMPANYLOGO} alt="suyati-company-logo" />
        </div>
      </Link>
    );
  };

  const RightNavbar = () => {
    return ( 
      !user &&
        <div class="md:flex hidden space-x-2 justify-evenly">
          <Link to="/login">
            <button class="mt-2 mr-4 px-8 py-4 text-blue-100 hover:bg-blue-600 font-semibold bg-blue-700 rounded-3xl drop-shadow">
              Login
            </button>
          </Link>
        </div>
    );
  };

  const MiddleNavbar = () => {

    let { user,cartcount} = useContext(UserContext);
     
    const StyledBadge = styled(Badge)(({ theme }) => ({
      "& .MuiBadge-badge": {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
      },
    }));

    return (
      <>
        <div class="p-3 cursor-pointer md:hidden" onClick={toggle}>
          <svg
            class="text-blue-800 w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>

        <div class="md:flex hidden font-semibold text-blue-800">
          <Link
            to="/orders"
            class="px-8 py-6  hover:text-blue-400  rounded-3xl drop-shadow"
          >
            Orders
          </Link>

          <Link
            to="/books"
            class="px-8 py-6  hover:text-blue-400  rounded-3xl drop-shadow"
          >
            Ratings

          </Link>

          { user && <>  

            <Link
              to="/cart"
              class="p-4"
            >
                <IconButton aria-label="cart">
                  <StyledBadge badgeContent={cartcount} color="secondary">
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
            </Link>

            <Link
              to="/dashboard"
              class="pt-4 px-2 hover:text-blue-400 "
            >

            <Avatar src="/broken-image.jpg" />

            </Link>


          </> }

        </div>
      </>
    );
  };

  return (
    <header class="h-1/8 w-full bg-white border-b-2 drop-shadow-lg z-9" >
    {searchload?<>
      <LinearProgress color="secondary" />
    </>:null}
      <div class="w-full h-30 justify-between mt-2 start-end p-2 max-w-full max-h-full flex space-x-10 md:w-auto md:justify-center mx-auto ">
        <LeftNavbar/>
        <SearchBar />
        <MiddleNavbar />
        <RightNavbar />
      </div>
    </header>
  );
};

export default Navbar;
