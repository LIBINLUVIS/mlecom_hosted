import React, { useContext, useEffect, useState } from "react";
import { Carousel } from "react-carousel-minimal";
import UserContext from "../context/UserContext";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import searchicon from "../assets/images/searchicon.jpg";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Rowbooks from "../components/Rowbooks";
import Recombooks from "../components/RecomBook";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Storebooks from "../components/StoreBooks";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from "../Axios";
import "../css/Rowbooks.css";
import "../css/home.css";

const HomePage = () => {
  const addcartapi="api/addcart/";
  let { userstate, sres, initial, user, recom_book,itemadd,fetchtrending,trending,Store,storebooks } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [openerr, setOpenErr] = useState(false);
  const [loaditem,setLoadItem]=useState(false);
  useEffect(() => {
    itemadd();
    userstate();
    recom_book();
   
   
 
  }, []);
  if(trending && trending[0]){
   
  }else{
    fetchtrending();
  }
  if(storebooks && storebooks[0]){

  }else{
    Store();
  }
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenErr(false);
  };
  const addcart=(bookid)=>{
    setLoadItem(true)
    let user=localStorage.getItem('user_id')
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ userid:user,Bookid:bookid});
      axios.post(addcartapi,body,config).then((res)=>{
        setLoadItem(false)
        setOpen(true);
        itemadd();
      }).catch((err)=>{
        setLoadItem(false)
        setOpenErr(true)
      })
  }


  var search_value = localStorage.getItem("search_value");

  const data = [
    {
      image:
        "https://manybooks.net/sites/default/files/2018-07/bookdisplaysmall.jpg",
      caption:
        "“A reader lives a thousand lives before he dies . . . The man who never reads lives only one.” - George R.R. Martin",
    },
    {
      image:
        "https://manybooks.net/sites/default/files/2018-07/bookcoverssmall2.jpg",
      caption:
        "“Until I feared I would lose it, I never loved to read. One does not love breathing.” - Harper Lee",
    },
    {
      image:
        "https://manybooks.net/sites/default/files/2018-07/bookstackssmall.jpg",
      caption:
        "“Never trust anyone who has not brought a book with them.” - Lemony Snicket",
    },
  ];

  const captionStyle = {
    fontSize: "1.5em",
    fontWeight: "bold",
  };
  return (

    <div style={{minHeight:"100vh"}} >

      <div class=" border-2 h-auto text-center w-full">
        <Carousel
          data={data}
          time={10000}
          width="100%"
          captionStyle={captionStyle}
          radius="10px"
          captionPosition="center"
          automatic={true}
          dots={true}
          pauseIconColor="white"
          pauseIconSize="40px"
          slideBackgroundColor="darkgrey"
          slideImageFit="cover"
       
        />
      </div>

      {/* <h1 class='p-8 text-4 text-center font-bold text-blue-800'> Home page </h1> */}

    <div class=' p-10' style={{backgroundColor:"black",minHeight:"100vh"}}>

        {initial ? (
          <>
            {sres[0] ? (
              <>
                {sres.length != 0 ? (
                  <>
                  {/* FIXME:*/}
                  
                    {sres.length <= 10 ? (
                      <>
                        <h2 className="trending_tit">
                          Showing results For {search_value}
                        </h2>
                        <div
                          className="searchresults"
                      
                        >
                          {sres.map((item, key) => (
                            <div
                              style={{
                             
                                padding: "20px",
                              }}
                              className="searchcards"
                            >
                              <Card sx={{ maxWidth: 330 }}>
                                <img
                                  src={item.img}
                                  style={{ height: "260px", width: "300px" }}
                                ></img>
                                <CardContent>
                                  <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                  >
                                    {item.Book_title}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {item.Book_Author}
                                  </Typography>
                                </CardContent>
                                <CardActions>
                                  {user && user.id ? (
                                    <>
                                      <Link to={`/ratings/${item.ISBN}`}>
                                        <Button
                                          variant="contained"
                                          color="success"
                                        >
                                          Rate
                                        </Button>
                                      </Link>
                                      <Button
                                        onClick={() => addcart(item.id)}
                                        disableRipple
                                        style={{ backgroundColor: "white" }}
                                      >
                                        <AddShoppingCartIcon className="carticon" />
                                      </Button>
                                    </>
                                  ) : (
                                    <>
                                      <Link to="/login">
                                        <Button
                                          variant="contained"
                                          color="success"
                                        >
                                          Rate
                                        </Button>
                                      </Link>
                                    </>
                                  )}
                                </CardActions>
                              </Card>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="trending_box">
                          <h2 className="trending_tit">Trending Books</h2>
                          <Rowbooks />
                        </div>
                        <div className="trending_box">
                          <h2 className="trending_tit">Recommendation</h2>
                          {user && user.id ? (
                            <>
                              <Recombooks />
                            </>
                          ) : (
                            <div className="login-recom">
                              <Link to="/login">
                                <Button variant="contained" color="success">
                                  Login for Recommendation
                                </Button>
                              </Link>
                            </div>
                          )}
                          <div className="trending_box">
                            <h2 className="trending_tit">Store Books</h2>
                            <Storebooks />
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ) : null}
              </>
            ) : (
              <>
                <h2 className="trending_tit">No Results Found</h2>
                <div className="notfound">
                  <img
                    src={searchicon}
                    style={{ height: "260px", width: "330px" }}
                  ></img>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="trending_box">
              <h2 className="trending_tit">Trending Books</h2>
              <Rowbooks />
            </div>
            <div className="trending_box">
              <h2 className="trending_tit">Recommendations</h2>
              {user && user.id ? (
                <>
                  <Recombooks />
                </>
              ) : (
                <div className="login-recom">
                  <Link to="/login">
                    <Button variant="contained" color="success">
                      Login for Recommendation
                    </Button>
                  </Link>
                </div>
              )}
              <div className="trending_box">
                <h2 className="trending_tit">Store Books</h2>
                <Storebooks />
              </div>
            </div>
          </>
        )}
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Book Added to Cart
          </Alert>
      </Snackbar>
      {openerr?<>
        <Snackbar open={openerr} autoHideDuration={6000} onClose={handleClose1}>
          <Alert onClose={handleClose1} severity="error" sx={{ width: '100%' }}>
           Oops Something Went Wrong try later!
          </Alert>
      </Snackbar>
      </>:null}
      <Snackbar open={loaditem}  >
          <Alert  severity="warning" sx={{ width: '100%' }}>
           Adding to cart...
          </Alert>
      </Snackbar>
    </div>
  );
};

export default HomePage;
