import React, { useEffect, useState, useContext } from "react";
import "../css/Rowbooks.css";
import "../css/responsive.css";
import { Link, Redirect } from "react-router-dom";
import axios from "../Axios";
import UserContext from "../context/UserContext";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Skeleton from "@mui/material/Skeleton";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Rowbooks() {
  const addcartapi = "api/addcart/";
  let { user, itemadd, trending } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [openerr, setOpenErr] = useState(false);
  const [loaditem, setLoadItem] = useState(false);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleClose1 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenErr(false);
  };
  const addcart = (bookid) => {
    setLoadItem(true);
    let user = localStorage.getItem("user_id");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ userid: user, Bookid: bookid });
    axios
      .post(addcartapi, body, config)
      .then((res) => {
        setLoadItem(false);
        setOpen(true);
        itemadd();
      })
      .catch((err) => {
        setLoadItem(false);
        setOpenErr(true);
      });
  };

  return (
    <div className="row">
      <div className="posters">
        {trending && trending[0] ? (
          <>
            {trending.map((obj) => (
              <>
                <div className="trending_books">
                  <img src={obj.img} alt="poster" className="img_books" />
                  <div className='book_content'>
                  <h>{obj.title}</h><br/>
                  <h>{obj.author}</h>
                  </div>
                  <div className="trending_icons">
                    {user && user.id ? (
                      <>
                        <Link to={`/ratings/${obj.isbn}`}>
                          <Button variant="contained" color="success">
                            Rate
                          </Button>
                        </Link>
                        <div className='cart-btn'>
                        <Button
                          onClick={() => addcart(obj.id)}
                          disableRipple
                          style={{ backgroundColor: "white" }}
                          
                        
                        >
                          <AddShoppingCartIcon className="carticon" />
                        </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Link to="/login">
                          <Button variant="contained" color="success">
                            Rate
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </>
            ))}
          </>
        ) : (
          <div className="trending_skeleton">
            <div className="skelton-box">
              <Skeleton variant="rectangular" width={210} height={118} />
              <Skeleton variant="text" animation="wave" />
              <Skeleton variant="text" animation="wave" />
            </div>
            <div className="skelton-box">
              <Skeleton variant="rectangular" width={210} height={118} />
              <Skeleton variant="text" animation="wave" />
              <Skeleton variant="text" animation="wave" />
            </div>
            <div className="skelton-box">
              <Skeleton variant="rectangular" width={210} height={118} />
              <Skeleton variant="text" animation="wave" />
              <Skeleton variant="text" animation="wave" />
            </div>
            <div className="skelton-box">
              <Skeleton variant="rectangular" width={210} height={118} />
              <Skeleton variant="text" animation="wave" />
              <Skeleton variant="text" animation="wave" />
            </div>
            <div className="skelton-box">
              <Skeleton variant="rectangular" width={210} height={118} />
              <Skeleton variant="text" animation="wave" />
              <Skeleton variant="text" animation="wave" />
            </div>
          </div>
        )}
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Book Added to Cart
        </Alert>
      </Snackbar>
      {openerr ? (
        <>
          <Snackbar
            open={openerr}
            autoHideDuration={6000}
            onClose={handleClose1}
          >
            <Alert
              onClose={handleClose1}
              severity="error"
              sx={{ width: "100%" }}
            >
              Oops Something Went Wrong try later!
            </Alert>
          </Snackbar>
        </>
      ) : null}
      <Snackbar open={loaditem}>
        <Alert severity="warning" sx={{ width: "100%" }}>
          Adding to cart...
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Rowbooks;
