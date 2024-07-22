//Importing axios to do CRUD with API
import axios from "axios";

//Importing useState,useEffect for State Management
import { useEffect, useState } from "react";

//Importing useNavigate hook for manual navigation
import { useNavigate } from "react-router-dom";

const ModifyAuthors = () => {
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

  //using useNavigate hook to navigate between one component to another component
  const navigate = useNavigate();

  //deleting using axios delete
  const [deleteAuthorData, setDeleteAuthorData] = useState([]);

  const handleDelete = async (id) => {
    try {
      let res = await axios.delete(
        `https://65eed58eead08fa78a4f025d.mockapi.io/authors/${id}`
      );
      setDeleteAuthorData(res.data);
      console.log(deleteAuthorData);
      alert(
        `The Author named ${res.data.author_name} data deleted Successfully !`
      );
    } catch (error) {
      alert(`Network Error, while deleting author data,try again!`);
      console.log(error);
    }
  };

  //fetching Mock-Api data using axios
  useEffect(() => {
    fetchData();
  }, [deleteAuthorData]);

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

  //loading text display until fetch done
  if (loading) {
    return <div className="py-5 text-center text-white">Loading...</div>;
  }
  return (
    <>
      <div className="container">
        <h2 className="text-center my-3 text-warning text-decoration-underline">
          Authors List
        </h2>
        <div className="table-responsive">
          {authorData.length === 0 ? (
            <h3 className="text-white text-center my-5 ">
              There is no Author profiles.
              <br /> Add new author to see profiles !
            </h3>
          ) : (
            <>
              <table className="table table-hover text-center mt-4">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Author Name</th>
                    <th scope="col">Birth Date</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {authorData.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{++index}</th>
                        <td>{item.author_name}</td>
                        <td>{item.birth_date}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() =>
                              navigate(`/edit-author-form/${item.id}`)
                            }
                          >
                            Update
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="text-center my-4">
                <button
                  className="btn btn-success"
                  onClick={() => navigate("/add-author-form")}
                >
                  Add Author
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ModifyAuthors;
