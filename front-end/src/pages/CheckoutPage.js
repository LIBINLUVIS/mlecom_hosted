import React,{useContext,useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import UserContext from "../context/UserContext";
function CheckoutPage() {
    useEffect(() => {
    
        userstate();
      }, []);
    
    let {checkout,userstate} = useContext(UserContext);
    const emptycart=(e)=>{
      e.preventDefault();
        checkout(e);
    }

	return (

<form  onSubmit={emptycart} style={{margin:"10px",minHeight:"100vh"}}>
    <div class="py-12">
        <div class="max-w-md mx-auto bg-white shadow-lg rounded-lg md:max-w-xl ">
            <div class="md:flex ">
                <div class="w-full p-4 px-5 py-5">
                    <div class="flex flex-row">
                        <h2 class="text-3xl font-semibold">Please fill your payment: </h2>
                    </div>

                    <div class="flex flex-row text-xs pt-6 pb-5"> 
						<span class="font-bold">Information</span> 
						<small class="text-gray-400 ml-1"></small> 
						<span class="text-gray-400 ml-1">Shopping</span> 
						<small class="text-gray-400 ml-1"></small> 
						<span class="text-gray-400 ml-1">Payment</span> 
					</div> 
					
					<span>Shipping Address</span>

                    <div class="grid md:grid-cols-2 md:gap-2"> 
						<input type="text"  class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" name="ordername" placeholder="First name*" required/> 
					</div> 
					<input type="text"  class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" name="address" placeholder="Address*" required/> 
			

					<input type="text"  class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="Phone Number*" required/>

                    <div class="flex justify-between items-center pt-2"> 

						<button  type="submit" class="h-12 w-24 text-blue-500 text-xs font-medium">
							Place Order
						</button> 

					</div>
                </div>
            </div>
        </div>
    </div>
</form>

	);

}

export default CheckoutPage;
