
//Importing axios to do CRUD with API
import axios from "axios";

//Importing useState,useEffect for State Management
import { useEffect,useState } from "react";


const BooksList = () => {
  //Giving a loading text until the mockAPI fetch data
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  //using useState hook to store fetched data
  const [bookData, setBookData] = useState([]);

  //fetching Mock-Api data using axios get method
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let res = await axios.get(
        "https://65eed58eead08fa78a4f025d.mockapi.io/Books"
      );
      console.log(`Books Data fetched successfully!`);
      setBookData(res.data);
    } catch (error) {
      alert(`Network Error, while fetching books data, kindly refresh again!`);
      console.log(error);
    }
  };
  return (
    <>
      <div className="container h-100">
        <h1 className="h1 text-center text-warning my-4">
          <span className="px-3 border border-2 border-warning">Books</span>
        </h1>
        {bookData.length === 0 ? (
          <h3 className="text-white text-center my-5 ">
            There is no Books available now!
            <br /> Kindly add new books!
          </h3>
        ) : (
          <div className="row d-flex justify-content-center h-100">
            {bookData.map((item, index) => {
              return (
                <div key={index} className="col-12 mb-4">
                  <div className="card border border-primary text-center h-100">
                    {loading ? (
                      <div className="py-5">Loading...</div>
                    ) : (
                      <>
                        <div className="row mx-0">
                          <div className="col-12 card-header bg-primary text-white">
                            <h5 className="card-title">{item.title}</h5>
                          </div>
                          <div className="col-md-12 col-lg-4 p-3 d-flex justify-content-center align-items-center">
                            <img
                              src={item.image_url}
                              className="img-fluid rounded"
                              alt="book-img"
                            />
                          </div>
                          <div className="col-md-12 col-lg-8">
                            <div className="card-body">
                              <h3 className="card-title mb-3 text-warning text-decoration-underline py-1">
                                Book Info
                              </h3>
                              <p className="card-text mb-2">
                                <b>Title : </b> {item.title}
                              </p>
                              <p className="card-text mb-2">
                                <b>Author : </b> {item.author}
                              </p>
                              <p className="card-text mb-2">
                                <b>Publication Date : </b>{" "}
                                {item.publication_date}
                              </p>
                              <p className="card-text mb-2">
                                <b>ISBN No : </b> {item.isbn_no}
                              </p>
                              <p className="card-text mb-2">
                                <b>Series : </b> {item.series}
                              </p>
                              <p className="card-text mb-2">
                                <b>Plot : </b> {item.plot}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default BooksList;