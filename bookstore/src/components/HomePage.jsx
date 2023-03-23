import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Homepage.css";
import { Link, useParams ,  } from "react-router-dom";


function BooksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [result, setResult] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const user = useParams()
  // const location = useLocation();
  // const username=location.state
 
  useEffect(() => {
    axios
      .get("https://reactnd-books-api.udacity.com/books", {
        headers: {
          Authorization: "whatever-you-want",
        },
      })
      .then((response) => {
        setBooks(response.data.books);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Filter data based on search term
  const filteredData = books.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Update search term when user types in input box
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value === "") {
      setResult("");
    } else {
      filteredData.length > 0
        ? setResult("Show the results")
        : setResult("no result found");
    }
  };

  const handleLogin = () => {
    setLoggedIn(true);
    console.log(loggedIn)
  };


  return (
    <div className="mainpage">
      <div className="header">
        <img
          className="logo"
          src="https://kalvium.com/wp-content/uploads/2022/07/Logo-nav.png"
          alt=""
        />
        {loggedIn ? (
          <button className="button">
            {user}
          </button>
        ) : (
          <Link to="/register">
          <button className="button" onClick={handleLogin}>
           Register 
          </button>
          </Link>
         
        )}
      </div>
      <input
        id="searchbox"
        type="text"
        placeholder="Search your books"
        value={searchTerm}
        onChange={handleInputChange}
      />
      
      <p className="results" >{result}</p>
      <div className="Books">
        {filteredData.map((item) => (
          <div>
            <img src={item.imageLinks.thumbnail} alt="" />
            <h4 key={item.id}>{item.title}</h4>
            <p>
              {item.averageRating ? (
                <span>
                  <h3>{item.averageRating}⭐</h3>
                  <h3 className="cost">FREE</h3>
                </span>
              ) : (
                <span>
                  <h3>UR</h3>
                  <h3 className="cost">FREE</h3>
                </span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BooksPage;
