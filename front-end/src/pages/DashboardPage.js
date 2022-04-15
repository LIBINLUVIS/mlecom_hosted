import { React, useContext  } from "react";
import UserContext from "../context/UserContext";

const UserInfoDump = ({ value }) => {

  return (
    <div class="rounded-lg md:w-1/2 w-full border-4">
      <h2 class="p-10 bg-yellow-300 font-semibold text-4xl md:text-6xl text-blue-800">
        About
      </h2>
      <p class="">
        <ul class="font-extralight text-xl md:text-2xl p-8 space-y-4 bg-yellow-200">
          <li class='justify-between flex'>
            <span class='font-semibold mr-28'>ID </span> <span class='text-left flex-1'>{value.id}</span>
          </li>
          <li class='justify-between flex'>
            <span class='font-semibold mr-10'>Location </span> <span class='text-left flex-1'>{!value.Location ? "unknown" : value.Location}</span>
          </li>
          <li class='justify-between flex'>
            <span class='font-semibold mr-24'>Age </span> <span class='text-left flex-1'>{!value.Age ? "unknown" : value.Age}</span>
          </li>
        </ul>
      </p>
    </div>
  );
};

const DashboardPage = () => {
  
  const { user, logoutUser } = useContext(UserContext)

  return ( 
   <>
    <div class="bg-blue-800 p-20 space-y-8" style={{minHeight:"100vh"}}>
      <UserInfoDump value={user} />

      <button class='p-4 hover:bg-red-500 bg-red-600 font-semibold text-red-100 text-2xl rounded-lg w-1/2 h-20' onClick={logoutUser}> 
        LOGOUT 
      </button>

    </div>
   </>
  )
}

export default DashboardPage
