import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import "../css/Rowbooks.css";
import "../css/responsive.css";
import "../css/bookcard.css";
import Rating from "@mui/material/Rating";
import UserContext from "../context/UserContext";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import axios from "../Axios";
function Ratings(props) {
  const { rating,userstate } = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  var isbns = [];
  const ratingapi = "api/submitrating/";
  const isbn = `${props.match.params.id}`;
  const [value, setValue] = useState(0);
  if (rating && rating[0]) {
    var x = rating.length;
    for (var i = 0; i < x; i++) {
      isbns.push(rating[i].book_isbn);
    }
  }
  const handleClick = () => {
    setOpen(true);
  };
  useEffect(() => {
    
    userstate();
  }, []);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [book, setBook] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`api/book/${isbn}/`)
      .then((res) => {
        setLoading(false);
        if (res.data && res) {
          setBook(res.data);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const submitrating = (e) => {
    e.preventDefault();
    const userid = localStorage.getItem("user_id");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ userid: userid, isbn: isbn, rating: value });
    axios
      .post(ratingapi, body, config)
      .then((res) => {
        handleClick();
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="root" style={{ minHeight: "100vh" }}>
      <div className="head_tit">
        <h1
          style={{
            color: "white",
            fontSize: "30px",
            fontFamily: "sans-serif",
            fontWeight: "bold",
          }}
        >
          Rate Book
        </h1>
      </div>
      <div className="rated_outerbox_rate">
        {!loading ? (
          <>
            <div className="container">
              <div className="book_img">
                <img
                  src={book.img}
                  style={{ height: "150px", width: "150px" ,marginTop:"20px"}}
                ></img>
                <div className="book_details">
                  <div className="book_horiz">
                    <h2 className="book_tit">Book title - </h2>
                    <p style={{ marginTop: "5px", marginLeft: "10px" }}>
                      {book.title}
                    </p>
                  </div>
                  <div className="book_horiz">
                    <h2 className="book_tit">Book author - </h2>
                    <p style={{ marginTop: "5px", marginLeft: "10px" }}>
                      {book.author}
                    </p>
                  </div>
                  <div className="book_horiz">
                    <h2 className="book_tit">Book Publisher - </h2>
                    <p style={{ marginTop: "5px", marginLeft: "10px" }}>
                      {book.publisher}
                    </p>
                  </div>
                  <div className="book_horiz">
                    <h2 className="book_tit">Year of publishing - </h2>
                    <p style={{ marginTop: "5px", marginLeft: "10px" }}>
                      {book.year_publisher}
                    </p>
                  </div>

                  <div className="book_horiz">
                    <h2 className="book_tit1">Ratings - </h2>
                    {isbns.includes(isbn) ? (
                      <>
                        {isbns.map((obj) => (
                          <>
                            {obj == isbn ? (
                              <>
                                {rating.map((item) => (
                                  <>
                                    {item.book_isbn == obj ? (
                                      <div className='stars'>
                                        <Rating
                                          name="read-only"
                                          value={item.rating / 2}
                                          disabled
                                        />
                                      </div>
                                    ) : null}
                                  </>
                                ))}
                              </>
                            ) : null}
                          </>
                        ))}
                      </>
                    ) : (
                      <>
                        <p style={{ marginTop: "5px", marginLeft: "10px" }} className="stars">
                          <Rating
                            name="customized-10"
                            value={value}
                            max={10}
                            onChange={(event, newValue) => {
                              setValue(newValue);
                            }}
                          />
                        </p>
                      </>
                    )}
                  </div>
                  {isbns.includes(isbn) ? (
                    <>
                      <Button
                        variant="contained"
                        color="error"
                        style={{ marginTop: "20px" }}
                        className="rate-btn"
                      >
                        Alredy Rated
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={submitrating}
                        style={{ marginTop: "20px"}}
                        className="rate-btn"
                      >
                        Submit
                      </Button>
                    </>
                  )}
                  {open ? (
                    <>
                      <Snackbar
                        open={open}
                        autoHideDuration={3000}
                        onClose={handleClose}
                      >
                        <Alert
                          onClose={handleClose}
                          severity="success"
                          sx={{ width: "100%" }}
                        >
                          Rating Submited!
                        </Alert>
                      </Snackbar>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="skelton-box">
            <Skeleton variant="rectangular" width={310} height={200} />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Ratings;
