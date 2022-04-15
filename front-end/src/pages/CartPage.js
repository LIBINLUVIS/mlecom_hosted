import React, { useState, useEffect, useContext } from "react";
import axios from "../Axios";
import { Link, Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";
import { Button } from "@mui/material";
import "../css/Cart.css";

function Cart() {
  let { cartitems, user, itemadd } = useContext(UserContext);
  const [removed, setRemoved] = useState(false);
  const [qty, setQty] = useState(false);
  useEffect(() => {
    itemadd();
  }, [removed, qty]);
  const itemremove = (isbn) => {
    setRemoved(false);

    let userid = user.id;
    const removeapi = `api/remove/${userid}/`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ isbn: isbn });
    axios.post(removeapi, body, config).then((res) => {
      setRemoved(true);
    });
  };
  const incqty = (itemid, val) => {
    setQty(false);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ quantity: val, user_id: user.id });
    const incapi = `api/inccartcount/${itemid}/`;

    axios.post(incapi, body, config).then((res) => {
      setQty(true);
    });
  };
  return (

    <div class=' flex justify-center align-center p-10 w-full'>

		<div class='border-2 bg-white rounded-lg md:w-1/2'>

	
			<div class='px-10 w-full'>
				<div class="md:grid md:grid-cols-2 gap-2 ">
					<div class="col-span-2 p-5">
					<h2 class='p-8 text-xl md:text-4xl font-semibold text-yellow-500 bg-yellow-100 w-full rounded-md'> Your Cart </h2>

						{cartitems && cartitems[0] ? ( <>
							{cartitems.map((item) => (

								<div class='w-full px-2'>

									<div class="flex flex-col justify-between items-center mt-6 pt-6">
										<div class="flex items-center">  TODO:
										
										<img src={item.img} width="60" class="rounded-md "/>
											<div class="flex flex-col ml-3">  
											<span class="md:text-md font-medium">{item.title}</span> 
											<span class="text-xs font-light text-gray-400">#{item.isbn}</span> 
											</div>
										</div>
										<div class="flex justify-center items-center">
											<div class="pr-8 flex"> 
												<button onClick={() => { incqty(item.id, "sub"); }} > - </button>
												<input type="text" class="focus:outline-none bg-gray-100 border h-6 w-8 rounded text-sm px-2 mx-2" value={(item.Qty % 10 == 0) ? () => { itemremove(item.isbn); } : (item.Qty % 10)}/> 
												<button onClick={() => { incqty(item.id, "add"); }} > + </button>
											</div>

											<div> 
												<i class="fa fa-close text-xs font-medium"></i> 
											</div>
										</div>
									</div>
									<hr class='mt-4 p-0 b-8'/>
								</div>
							))}
							<Link to={"/checkout"}>
								<div class='bg-green-700 hover:bg-green-500 w-full flex justify-center align-center p-4 my-8 rounded-lg text-green-100 font-semibold text-4xl'>
									checkout
								</div>
							</Link>
						</>) : (
							// <Redirect to={"/"}></Redirect>
							<>
								<div class='flex justify-center align-center'>
									<img src='http://bookworldranchi.com/assets/website/images/empty-cart.png'/>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	</div>

  );
}

export default Cart;
