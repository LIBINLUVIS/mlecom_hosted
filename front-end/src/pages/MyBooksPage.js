import React, { useContext,useEffect } from "react";
import BookCard from "../components/BookCard";
import CircularProgress from '@mui/material/CircularProgress';
import UserContext from "../context/UserContext";
import "../css/bookcard.css";
import Rating from "@mui/material/Rating";


const MyBooksPage = () => {
  const { userstate,rating,user_rating,loading } = useContext(UserContext);
  useEffect(()=>{ 
    user_rating();
  },[])
  useEffect(() => {
    
    userstate();
  }, []);

  return (
    <>
 
      <div className="container" style={{minHeight:"100vh"}}>
          <div className="head_tit">
          <h1 style={{color:"white",fontSize:"30px",fontFamily:"sans-serif",fontWeight:"bold"}}>Rated Books</h1>
          </div>
        <div className="rated_outerbox">
          {loading?
          <div className="loader-box">
          <CircularProgress color="success" />
          </div>:
          <>
          {rating && rating[0] ? (
            <div>
              {rating.map((element, index) => (
                <BookCard
                  title={element.book_title}
                  author={element.book_auth}
                  rating={element.rating}
                  imgUrl={element.img_Lar}
                />
              ))}
            </div>
          ) : (
            <div className="not_rated">
              <h1 style={{fontSize:"30px",marginBottom:"20px"}}>User Not Rated Yet</h1>
              <Rating name="size-large" defaultValue={null} size="large" style={{marginLeft:"15px"}} readOnly/>
            </div>
          )}
          </>
         }
        </div>
      </div> 
    </>

  ); 
};

export default MyBooksPage;
