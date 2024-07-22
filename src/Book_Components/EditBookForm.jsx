//Importing axios to do CRUD with API
import axios from "axios";

//Importing useState,useEffect for State Management
import { useEffect, useState } from "react";


//Importing useNavigate, useParams for navigation and get the params value
import { useNavigate, useParams } from "react-router-dom";

//Importing useFormik Hook for form validation
import { useFormik } from "formik";

//Importing Yup for to create Schema
import * as Yup from "yup";



const EditBookForm = () => {
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
    title: "",
    author: "",
    publication_date: "",
    isbn_no: "",
    series: "",
    image_url: "",
    plot: "",
  });

  //fetching the particular data from api
  useEffect(() => {
    fetchParticularBookData();
  }, []);

  //updating the particular fetched data in the form fields
  useEffect(() => {
    formik.setValues(data); //updating formik.values used formik.setvalues(default state management)
  }, [data]);

  //fetching the particular data from api using the params value
  const fetchParticularBookData = async () => {
    try {
      let res = await axios.get(
        `https://65eed58eead08fa78a4f025d.mockapi.io/Books/${parseInt(
          params.id
        )}`
      );
      console.log(`Book Data fetched successfully!`);
      setData(res.data);
    } catch (error) {
      alert(`Network Error, while fetching book data!`);
      console.log(error);
    }
  };

  //declating validation Schema for form fields
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is Required"),
    author: Yup.string().required("Author is Required"),
    publication_date: Yup.date()
      .required("Publication date is required")
      .max(new Date(), "Publication date cannot be in the future"),
    isbn_no: Yup.string()
      .required("ISBN number is required")
      .matches(/^\d{3}-\d{10}$/, "Invalid ISBN format")
      .max(17, "ISBN number must be 17 characters long"),
    series: Yup.string(),
    plot: Yup.string().required("Plot is required"),
    image_url: Yup.string().url("Invalid URL format"),
  });

  //Handling form submission
  const formik = useFormik({
    initialValues: data,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.put(
          `https://65eed58eead08fa78a4f025d.mockapi.io/Books/${parseInt(
            params.id
          )}`,
          values,
          { headers: { "Content-Type": "application/json" } }
        );

        // Log the response from the server
        console.log(response);

        formik.resetForm();
        alert(`Book Data updation Successful!`);
        navigate("/modify-books");
      } catch (error) {
        console.error("Error:", error);
        alert(`Network Error, while Updating book data, try again!`);
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
              className="bg-info my-3 py-3 px-5"
            >
              <h1 className="text-center">Update Book Form</h1>
              <div className="row">
                <div className="mb-3 col-sm-12 col-lg-12">
                  <label className="form-label">
                    <b>Title/Name of the Book : </b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Enter Book Title"
                    defaultValue={formik.values.title}
                    onChange={formik.handleChange}
                  />
                  <h6 className="ps-2 mb-0 my-1 text-danger">
                    {formik.errors.title}
                  </h6>
                </div>
                <div className="mb-3 col-sm-12 col-lg-6">
                  <label className="form-label">
                    <b>Author Name : </b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="author"
                    placeholder="Enter Author Name"
                    defaultValue={formik.values.author}
                    onChange={formik.handleChange}
                  />
                  <h6 className="ps-2 mb-0 my-1 text-danger">
                    {formik.errors.author}
                  </h6>
                </div>
                <div className="mb-3 col-sm-12 col-lg-6">
                  <label className="form-label">
                    <b>Publication Date : </b>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="publication_date"
                    defaultValue={formik.values.publication_date}
                    onChange={formik.handleChange}
                  />
                  <h6 className="ps-2 mb-0 my-1 text-danger">
                    {formik.errors.publication_date}
                  </h6>
                </div>
                <div className="mb-3 col-sm-12 col-lg-6">
                  <label className="form-label">
                    <b>ISBN Number : </b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="isbn_no"
                    placeholder="e.g 213-5839954933"
                    defaultValue={formik.values.isbn_no}
                    onChange={formik.handleChange}
                  />
                  <div className="ps-2 mb-0 my-1 text-danger">
                    {formik.errors.isbn_no}
                  </div>
                </div>
                <div className="mb-3 col-sm-12 col-lg-6">
                  <label className="form-label">
                    <b>Series : </b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="series"
                    placeholder="Enter Series"
                    defaultValue={formik.values.series}
                    onChange={formik.handleChange}
                  />
                  <h6 className="ps-2 mb-0 my-1 text-danger">
                    {formik.errors.series}
                  </h6>
                </div>
                <div className="mb-3 col-sm-12 col-lg-12">
                  <label className="form-label">
                    <b>Book Cover Image URL : </b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="image_url"
                    placeholder="Enter Book Cover Image URL"
                    defaultValue={formik.values.image_url}
                    onChange={formik.handleChange}
                  />
                  <h6 className="ps-2 mb-0 my-1 text-danger">
                    {formik.errors.image_url}
                  </h6>
                </div>
                <div className="mb-3 col-12">
                  <label className="form-label">
                    <b>Plot : </b>
                  </label>
                  <input
                    
                    className="form-control"
                    name="plot"
                    placeholder="The Book's Plot"
                    defaultValue={formik.values.plot}
                    onChange={formik.handleChange}
                  />
                  <h6 className="ps-2 mb-0 my-1 text-danger">
                    {formik.errors.plot}
                  </h6>
                </div>
                <div className="col-12 text-center">
                  <button type="submit" className="btn btn-success w-50 mx-2">
                    Update Book
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

export default EditBookForm;
