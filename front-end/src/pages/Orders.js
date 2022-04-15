import React, { useState, useEffect, useContext } from "react";
import "../css/Cart.css";
import { Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "../Axios";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
function Orders() {
  let { user,userstate } = useContext(UserContext);
  const [order, setOrder] = useState([]);
  const [orderload, setOrderload] = useState(false);
  useEffect(() => {
    
    userstate();
  }, []);

  useEffect(() => {
    setOrderload(true);
    if (user && user.id) {
      axios.get(`api/userorders/${user.id}/`).then((res) => {
        setOrderload(false);

        if (res && res.status == 200) {
          setOrder(res.data);
        }
      });
    }
  }, []);
  const steps = ["Order Placed", "Shipped", "Delivered"];
  return (
    <div style={{ minHeight: "100vh" }}>
      {user && user.id ? (
        <>
          {orderload ? (
            <>
              <div className="ordered-box">
                <div className="progress-order">
                  <CircularProgress color="success" />
                </div>
              </div>
            </>
          ) : (
            <>
              {order && order[0] ? (
                <>
                  <div className="order_tit">
                    <h1
                      style={{
                        color: "white",
                        fontSize: "30px",
                        fontFamily: "sans-serif",
                        fontWeight: "bold",
                        
                      }}
                    >
                      Ordered Books
                    </h1>
                  </div>

                  <div className="ordered-box">
                    <div className="ordered-products">
                      {order.map((item) => (
                        <div style={{ display: "flex", padding: "10px" }} className="mobvieworderstatus">
                          <img
                            src={item.img}
                            alt=""
                            style={{ width: "150px", height: "200px" }}
                          ></img>
                          <div className="order-content">
                            <h>{item.title}</h>
                            <h>{item.author}</h>
                            <h>Qty-{item.Qty}</h>
                            <h>Purchased at-{item.purchased}</h>
                            {item.Status ? (
                              <>
                                <h>Delivered-Yes</h>
                              </>
                            ) : (
                              <>
                                <h>Delivered-No</h>
                              </>
                            )}
                          </div>
                          <div className="stepper">
                            {item.status ? (
                              <>
                                <Stepper activeStep={3} alternativeLabel>
                                  {steps.map((label) => (
                                    <Step key={label}>
                                      <StepLabel>{label}</StepLabel>
                                    </Step>
                                  ))}
                                </Stepper>
                              </>
                            ) : (
                              <>
                                <Stepper activeStep={1} alternativeLabel>
                                  {steps.map((label) => (
                                    <Step key={label}>
                                      <StepLabel>{label}</StepLabel>
                                    </Step>
                                  ))}
                                </Stepper>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="ordered-box">
                  <div className="not-order">
                    <h1 className="no-order-title">No Orders Yet</h1>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <Redirect to="/login" />
        </>
      )}
    </div>
  );
}

export default Orders;
