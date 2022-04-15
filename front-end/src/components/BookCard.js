import React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

const BookCard = ({ author, imgUrl, title, rating }) => {
  const [value, setValue] = React.useState(2);
  console.log(value)
  return (
    <>
      <Box
        sx={{
          "& > legend": { mt: 2 },
        }}
      ></Box>

      <div className="container">
        <div className="book_img" >
          <img src={imgUrl} style={{ height: "150px", width: "150px" }}></img>
          <div className="book_details">
            <div className="book_horiz">
              <h2 className="book_tit">Book title - </h2>
              <p style={{ marginTop: "5px", marginLeft: "10px" }}>{title}</p>
            </div>
            <div className="book_horiz">
              <h2 className="book_tit">Book author - </h2>
              <p style={{ marginTop: "5px", marginLeft: "10px" }}>{author}</p>
            </div>
            <div className="book_horiz">
              <h2 className="book_tit">Ratings - </h2>
              <p style={{ marginTop: "5px", marginLeft: "10px" }}>
                    <Rating name="read-only" value={rating / 2} readOnly />
              </p>
        
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookCard;
