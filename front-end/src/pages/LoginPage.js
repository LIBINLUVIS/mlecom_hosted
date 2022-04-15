import { React, useContext, useState } from "react";
import companyLogo from "../assets/images/Suyati-logo-01.svg";
import bookShelf from "../assets/images/login-page-bookshelf.jpg";
import UserContext from "../context/UserContext";
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { Link } from "react-router-dom";
import "../css/login.css";

const LoginPage = () => {
  let { loginUser,loading,useralert,networkalert} = useContext(UserContext);

  return (
    <>
      <div class="flex sm:flex-col justify-center align-center" >
        <div class=" md:max-w-4xl md:ml-auto md:mr-auto md:flex m-10 bg-gradient-to-b from-blue-300 to-blue-100 rounded-2xl drop-shadow-2xl " id="mobviewlogin">
          {/* <!-- Book shelf image  --> */}
          <div class="flex-shrink">
            <img
              class="rounded-tl-2xl md:rounded-l-2xl h-48 w-full object-cover md:h-full md:w-48 opacity-80"
              src={bookShelf}
            />
          </div>

          {/* <!-- Login  --> */}
          <div class="flex flex-col justify-center align-center flex-grow opacity-90 mx-10">
            {/* <!-- Company logo --> */}
            <div class="flex justify-center align-center p-4 ">
              <img src={companyLogo} />
            </div>

            <hr class="border-t-2 border-yellow-300" />
             <div className="alert">
              {useralert?<>
              <Alert severity="error">User id is incorrect — check it out!</Alert>
              </>:null}
              {networkalert?<>
              <Alert severity="error">Network Error check connection — check it out!</Alert>
              </>:null}
             </div>
            {/* <!-- Form --> */}
            <div class="px-20" >
              <form
                onSubmit={loginUser}
                class="border-none flex flex-col justify-center align-center mt-16 "
              >
                <input
                  class="outline-none rounded p-2"
                  type="number"
                  min="0"
                  name="userid"
                  placeholder="User ID"
                  required
                />
                <br />
                {!loading ? (
                  <>
            
                   <div className="login_progressbar">
                   <CircularProgress color="success" style={{padding: "10px"}}/>
                   </div>
                    
                  </>
                ) : (
                  <input
                    type="submit"
                    class="p-6 w-full bg-yellow-400 rounded-lg font-semibold text-yellow-800 hover:bg-yellow-300"
                    value="Login"
                   
                    
                  />
                )}
              </form>
            </div>

            <div class="space-x-3 flex justify-center align-center p-4">
              <hr class="border-1 w-1/3 border-gray-400" />
              <label class="text-gray-400 text-center font-thin"> or </label>
              <hr class="border-1 w-1/3 border-gray-400" />
            </div>

            {/* <!-- Signup --> */}
            <div class="mb-8">
              <p class="text-center font-semibold text-gray-800">
                Don't have an account?
                <Link to='/signup'>
                <button class="p-1 mb-4 font-bold text-indigo-500 hover:text-indigo-400">
                  Signup
                </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
