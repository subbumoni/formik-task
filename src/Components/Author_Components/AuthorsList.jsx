//Importing axios to do CRUD with API
import axios from "axios";

//Importing useState,useEffect for State Management
import { useEffect,useState } from "react";

const AuthorsList = () => {
  //Giving a loading text until the mockAPI fetch data
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  //using useState hook to store fetched data
  const [authorData, setAuthorData] = useState([]);

  //fetching Mock-Api data using axios get method
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let res = await axios.get(
        "https://65eed58eead08fa78a4f025d.mockapi.io/authors"
      );
      console.log(`Authors Data fetched successfully!`);
      setAuthorData(res.data);
    } catch (error) {
      alert(
        `Network Error, while fetching authors data, kindly refresh again!`
      );
      console.log(error);
    }
  };
  return (
    <>
      <div className="container h-100">
        <h1 className="h1 text-center text-info my-4">
          <span className="px-3 border border-2 border-info">
            Author Profiles
          </span>
        </h1>
        {authorData.length === 0 ? (
          <h3 className="text-white text-center my-5 ">
            There is no author profiles.
            <br /> Add new author to see profiles !
          </h3>
        ) : (
          <div className="row d-flex justify-content-center h-100">
            {authorData.map((item, index) => {
              return (
                <div
                  key={index}
                  className="col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-4"
                >
                  <div className="card border border-success text-center h-100">
                    {loading ? (
                      <div className="py-5">Loading...</div>
                    ) : (
                      <>
                        <div className="card-header bg-success text-white">
                          <h5 className="card-title">{item.author_name}</h5>
                        </div>
                        <div className="card-body">
                          <img
                            src={item.image_url}
                            className="img-fluid mb-4"
                            alt="profileImg"
                          />
                          <p className="card-text mb-2">
                            <b>Name : </b> {item.author_name}
                          </p>
                          <p className="card-text mb-2">
                            <b>Birth Date : </b> {item.birth_date}
                          </p>
                          <p className="card-text mb-2">
                            <b>Short Biography : </b> {item.short_bio}
                          </p>
                          <p className="card-text mb-2">
                            <b>Famous Works : </b> {item.famous_works}
                          </p>
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

export default AuthorsList;
