//Importing axios to do CRUD with API
import axios from "axios";


//Importing useState,useEffect for State Management
import { useEffect,useState } from "react";

//Importing useNavigate, useParams for navigation and get the params value
import { useNavigate,useParams } from "react-router-dom";


//Importing useFormik Hook for form validation
import { useFormik } from "formik";

//Importing Yup for to create Schema
import *as Yup from "yup";

const EditAuthorForm = () => {
  //using useParams hook to get the id value from the url
  const params = useParams();

  //Giving a loading text until the mockAPI fetch data
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let timeout;
    timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  //using useNavigate hook to navigate between one component to another component
  const navigate = useNavigate();

  //declating initial values for form fields
  const [data, setData] = useState({
    author_name: "",
    birth_date: "",
    short_bio: "",
    famous_works: "",
    image_url: "",
  });

  //fetching the particular data from api
  useEffect(() => {
    fetchParticularAuthorData();
  }, []);

  //updating the particular fetched data in the form fields
  useEffect(() => {
    formik.setValues(data); //updating formik.values used formik.setvalues(default state management)
  }, [data]);

  //fetching the particular data from api using the params value
  const fetchParticularAuthorData = async () => {
    try {
      let res = await axios.get(
        `https://65eed58eead08fa78a4f025d.mockapi.io/authors/${parseInt(
          params.id
        )}`
      );
      console.log(`Author Data fetched successfully!`);
      setData(res.data);
    } catch (error) {
      alert(`Network Error, while fetching author data!`);
      console.log(error);
    }
  };

  //declating validation Schema for form fields
  const validationSchema = Yup.object().shape({
    author_name: Yup.string().required("Author Name is Required"),
    birth_date: Yup.date()
      .required("Birth date is required")
      .max(new Date(), "Birth date cannot be in the future"),
    short_bio: Yup.string().required("Short Bio is Required"),
    famous_works: Yup.string().required(
      "One or above Famous Works/Works Required"
    ),
    image_url: Yup.string().url("Invalid URL format"),
  });

  //Handling form submission
  const formik = useFormik({
    initialValues: data,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.put(
          `https://65eed58eead08fa78a4f025d.mockapi.io/authors/${parseInt(
            params.id
          )}`,
          values,
          { headers: { "Content-Type": "application/json" } }
        );

        // Log the response from the server
        console.log(response);

        formik.resetForm();
        alert(`Author Data updation Successful!`);
        navigate("/modify-authors");
      } catch (error) {
        console.error("Error:", error);
        alert(`Network Error, while Updating author data, try again!`);
      }
    },
  });
  return (
    <>
      <div className="container">
        <div className="row">
          {loading ? (
            <div className="text-center text-white my-5 fs-2x">Loading...</div>
          ) : (
            // general form using useFormik hook
            <form
              onSubmit={formik.handleSubmit}
              className="bg-warning my-3 py-3 px-5"
            >
              <h1 className="text-center">Update Author Form</h1>
              <div className="row">
                <div className="mb-3 col-sm-12 col-lg-6">
                  <label className="form-label">
                    <b>Author Name : </b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="author_name"
                    placeholder="Enter Author Name"
                    defaultValue={formik.values.author_name}
                    onChange={formik.handleChange}
                  />
                  <h6 className="ps-2 mb-0 my-1 text-danger">
                    {formik.errors.author_name}
                  </h6>
                </div>
                <div className="mb-3 col-sm-12 col-lg-6">
                  <label className="form-label">
                    <b>Birth Date : </b>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="birth_date"
                    defaultValue={formik.values.birth_date}
                    onChange={formik.handleChange}
                  />
                  <h6 className="ps-2 mb-0 my-1 text-danger">
                    {formik.errors.birth_date}
                  </h6>
                </div>
                <div className="mb-3 col-12">
                  <label className="form-label">
                    <b>Short Biography : </b>
                  </label>
                  <input
                    className="form-control"
                    name="short_bio"
                    placeholder="The author's short biography"
                    defaultValue={formik.values.short_bio}
                    onChange={formik.handleChange}
                  />
                  <h6 className="ps-2 mb-0 my-1 text-danger">
                    {formik.errors.short_bio}
                  </h6>
                </div>
                <div className="mb-3 col-sm-12 col-lg-12">
                  <label className="form-label">
                    <b>Known Works : </b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="famous_works"
                    placeholder="Enter the author's known works"
                    defaultValue={formik.values.famous_works}
                    onChange={formik.handleChange}
                  />
                  <h6 className="ps-2 mb-0 my-1 text-danger">
                    {formik.errors.famous_works}
                  </h6>
                </div>
                <div className="mb-3 col-sm-12 col-lg-12">
                  <label className="form-label">
                    <b> as=Image URL : </b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="image_url"
                    placeholder="Enter Author's Image URL"
                    defaultValue={formik.values.image_url}
                    onChange={formik.handleChange}
                  />
                  <h6 className="ps-2 mb-0 my-1 text-danger">
                    {formik.errors.image_url}
                  </h6>
                </div>

                <div className="col-12 text-center">
                  <button type="submit" className="btn btn-primary w-50 mx-2">
                    Update Author
                  </button>
                </div>
              </div>
            </form>
          )}

          <div className="d-flex justify-content-center">
            <button
              className="btn text-center btn-warning w-50 w-lg-25 my-3"
              onClick={() => navigate("/")}
            >
              Go Back to Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAuthorForm;
