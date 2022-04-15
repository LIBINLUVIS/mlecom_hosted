import React, { useEffect, useState, useContext } from "react";
import axios from "../Axios";
import "../css/Rowbooks.css";
import Skeleton from "@mui/material/Skeleton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
function RecomBook() {
  const addcartapi = "api/addcart/";
  let { user, recombook, nullrecom, itemadd } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [openerr, setOpenErr] = useState(false);
  const [loaditem, setLoadItem] = useState(false);
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
  return (
    <div className="row">
      <div className="posters">
        {recombook && recombook[0] ? (
          <>
            {nullrecom ? (
              <>
                <h1 style={{ margin: "auto" ,color:"white"}}>No Recommentations found</h1>
              </>
            ) : (
              <>
                {recombook.map((obj) => (
                  <>
                    <div className="trending_books">
                      <img src={obj.img} alt="book_img" className="img_books" />
                      <h>{obj.title}</h>
                      <h>{obj.author}</h>
                      <div className="trending_icons">
                        {user && user.id ? (
                          <>
                            <Link to={`/ratings/${obj.isbn}`}>
                              <Button variant="contained" color="success">
                                Rate
                              </Button>
                            </Link> 
                            <div className="cart-btn">
                            <Button
                              onClick={() => addcart(obj.id)}
                              disableRipple
                              style={{ backgroundColor: "white" }}
                            >
                              <AddShoppingCartIcon className="carticon" />
                            </Button>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </>
                ))}
              </>
            )}
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

export default RecomBook;
