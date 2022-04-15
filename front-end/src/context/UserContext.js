import { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "../Axios";
const UserContext = createContext();
export default UserContext;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [rating, setRating] = useState(null);
  const [search, setSearch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sres, setSres] = useState([]);
  const [nullrecom, setNullRecom] = useState(false);
  const [useralert, setUseralert] = useState(false);
  const [networkalert, setNetworkalert] = useState(false);
  const [initial, setInitial] = useState(false);
  const [recombook, setRecomBook] = useState([]);
  const [cartitems, setCartItems] = useState([]);
  const [cartcount, setCartCount] = useState(0);
  const [trending, setTrending] = useState([]);
  const [storebooks, setStorebooks] = useState([]);
  const [page, setPage] = useState(1);
  const [state, setState] = useState(false);
  const [searchload, setSearchload] = useState(false);

  const userid = localStorage.getItem("user_id");
  const history = useHistory();

  useEffect(() => {
    savesearch();
  }, [sres]);
  useEffect(() => {
    updatecount();
  }, [cartitems]);
  useEffect(() => {
    Store();
  }, [page]);
  const search_api = `api/search/?temp=${search}`;
  let loginUser = async (e) => {
    e.preventDefault();
    setLoading(false);
    let userid = e.target.userid.value;
    await axios
      .get(`api/login/${userid}/`)

      .then((res) => {
        setLoading(true);
        if (res.status == 200) {
          localStorage.setItem("user_id", res.data.id);
          setUser(res.data);
          history.push("/");
        } else {
          alert("Something went wrong");
          setLoading(true);
        }
      })
      .catch((err) => {
        if (!err.response) {
          setLoading(true);
          setNetworkalert(true);
          // alert('Network Error check connection')
        }
        if (err.response) {
          if (err.response.status == 500) {
            setLoading(true);
            setUseralert(true);
            // alert('User id is incorrect!')
          }
        }
      });
  };
  const handleClick = () => {
    
    setState(true);
  };

  const handleClose = () => {
    setState(false);
  };
  const user_rating = () => {
    setLoading(true);  
    axios
      .get(`api/user_rating/${userid}/`)

      .then((res) => {
        setLoading(false);
        if (res.status == 200) {
          setRating(res.data);
        } else {
          alert("Unavailable to fetch the user");
        }
      });
  };
  const logoutUser = () => {
    setUser(null);
    setRating(null);
    setNetworkalert(false);
    setUseralert(false);
    setCartCount(0);
    setCartItems(null);
    setLoading(true);
    setSearchload(false);
    setRecomBook(null)
    localStorage.removeItem("user_id");
    history.replace("/");
  };

  const userstate = () => {
    const userid = localStorage.getItem("user_id");
    axios
      .get(`api/login/${userid}/`)

      .then((res) => {
        if (res.status == 200) {
          setUser(res.data);
        } else {
          alert("Login again");
        }
      });
  };
  const searchvalue = (value, event) => {
    event.preventDefault();
    setSearch(value);
  };

  const booksearch = () => {
    setSearchload(true);
    axios
      .get(search_api)
      .then((res) => {
        if (res && res.status == 200) {
          localStorage.setItem("search_value", search);
          setSres(res.data);
          setInitial(true);
          setSearchload(false);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  const savesearch = () => {
    const saveapi = "api/savesearch/";
    const userlogin = localStorage.getItem("user_id");
    if (userlogin && sres.length == 1) {
      var title = sres[0].Book_title;
      var user = localStorage.getItem("user_id");
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ userid: user, Book_title: title });
      axios.post(saveapi, body, config).then((res) => {});
    }
  };

  const recom_book = async () => {
    await axios
      .get(`api/recommentation/${userid}/`)
      .then((res) => {
        if (res && res.status == 200) {
          if (res.data == 0) {
            setNullRecom(true);
            setRecomBook([{ value: "null" }]);
          }
          if (res.data != 0) {
            setNullRecom(false);
            setRecomBook(res.data);
          }
        }
      })
      .catch((err) => {});
  };
  const signupUser = (e) => {
    e.preventDefault();
    setLoading(false);
    const saveapi = "api/signup/";
    let userid = e.target.userid.value;
    let location = e.target.location.value;
    let age = e.target.age.value;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      userid: userid,
      location: location,
      age: age,
    });
    axios.post(saveapi, body, config).then((res) => {
      setLoading(true);
      setUseralert(false);
      history.push("/login");
    }).catch((err)=>{
      if(err.response.status == 500){
        setLoading(true);
        setUseralert(true);
      }
      
    });
  };

  const itemadd = () => {
    if (user && user.id) {
      const userid = user.id;
      axios.get(`api/getitems/${userid}/`).then((res) => {
        setCartItems(res.data);
      });
    }
  };
  const updatecount = () => {
    if (cartitems && cartitems[0]) {
      var count = cartitems.length;

      setCartCount(count);
    }
  };
  const checkout = (e) => {
    const saveorderapi = `api/saveorder/${user.id}/`;
    var items = {
      item: [],
    };
    var ordername = e.target.ordername.value;
    var address = e.target.address.value;
    {
      cartitems.map((itm) =>
      
        items.item.push({
          id: `${itm.bookid}`,
          qty: `${itm.Qty}`,
          ordername: ordername,
          address: address,
        })
      );
    }
    console.log(items.item)
    const body = JSON.stringify({ products: items.item });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios.post(saveorderapi, body, config).then((res) => {
      emptycart();
      history.push("/manageorder");
    });
  };

  const emptycart = () => {
    setCartItems(null);
    setCartCount(0);
    const emptycartapi = `api/emptycart/${user.id}/`;
    var cartids = {
      item: [],
    };
    {
      cartitems.map((itm) => cartids.item.push({ id: `${itm.id}` }));
    }
    const body = JSON.stringify({ id: cartids.item });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios.post(emptycartapi, body, config).then((res) => {});
  };

  const fetchtrending = async () => {
    await axios.get("api/trending/").then((res) => {
      setTrending(res.data);
    });
  };

  const Store = async () => {
    handleClick();
    const res = await axios.get(`api/list?page=${page}`);
    setStorebooks(res.data.results);
    handleClose();
  };

  let contextData = {
    user: user,
    rating: rating,
    loading: loading,
    useralert: useralert,
    networkalert: networkalert,
    loginUser: loginUser,
    logoutUser: logoutUser,
    userstate: userstate,
    user_rating: user_rating,
    searchvalue: searchvalue,
    booksearch: booksearch,
    sres: sres,
    initial: initial,
    search: search,
    recom_book: recom_book,
    nullrecom: nullrecom,
    recombook: recombook,
    signupUser: signupUser,
    itemadd: itemadd,
    cartcount: cartcount,
    cartitems: cartitems,
    checkout: checkout,
    fetchtrending: fetchtrending,
    trending: trending,
    Store: Store,
    storebooks: storebooks,
    page: page,
    setPage: setPage,
    handleClick: handleClick,
    state: state,
    searchload: searchload,
  };

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};
