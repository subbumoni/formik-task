

//Importing formik components
import { ErrorMessage,Field,Form,Formik } from "formik";

//Importing Yup for to create Schema
import *as Yup from "yup";

//Importing useNavigate for manual navigation
import { useNavigate } from "react-router-dom";

//Importing axios to do CRUD with API
import axios from "axios";


const AddAuthorForm = () => {
  //using useNavigate hook to navigate between one component to another component
  const navigate = useNavigate();

  //declating initial values for form fields
  const initialValues = {
    author_name: "",
    birth_date: "",
    short_bio: "",
    famous_works: "",
    image_url: "",
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
  const handleSubmit = async (values, { resetForm }) => {
    // Setting default values for image_url if it's empty
    values.image_url =
      values.image_url === ""
        ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE6TYJIJDHxuJMM0m2-DYwD_0LKUT6gdWb_A&usqp=CAU"
        : values.image_url;

    console.log(values);

    try {
      // Send POST request using Axios
      const response = await axios.post(
        "https://65eed58eead08fa78a4f025d.mockapi.io/authors",
        values,
        { headers: { "Content-Type": "application/json" } }
      );

      // Log the response from the server
      console.log(response);

      // Reset the form and show a success message
      resetForm();
      alert(`New Author Data Added Successfully !`);
      navigate("/modify-authors");
    } catch (error) {
      // Log any errors that occur during the request
      console.error("Error:", error);
      alert(`Network Error, while Adding Author data, kindly refresh again!`);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          {/* Formik Form Template  */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="bg-info my-3 py-3 px-5">
              <h1 className="text-center">Add Author Form</h1>
              <div className="row">
                <div className="mb-3 col-sm-12 col-lg-6">
                  <label className="form-label">
                    <b>Author Name : </b>
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    name="author_name"
                    placeholder="Enter Author Name"
                  />
                  <ErrorMessage
                    name="author_name"
                    component="h6"
                    className="ps-2 mb-0 my-1 text-danger"
                  />
                </div>
                <div className="mb-3 col-sm-12 col-lg-6">
                  <label className="form-label">
                    <b>Birth Date : </b>
                  </label>
                  <Field
                    type="date"
                    className="form-control"
                    name="birth_date"
                  />
                  <ErrorMessage
                    name="birth_date"
                    component="h6"
                    className="ps-2 mb-0 my-1 text-danger"
                  />
                </div>
                <div className="mb-3 col-12">
                  <label className="form-label">
                    <b>Short Biography : </b>
                  </label>
                  <Field
                    as="textarea"
                    className="form-control"
                    name="short_bio"
                    placeholder="The author's short biography"
                  />
                  <ErrorMessage
                    name="short_bio"
                    component="h6"
                    className="ps-2 mb-0 my-1 text-danger"
                  />
                </div>
                <div className="mb-3 col-sm-12 col-lg-12">
                  <label className="form-label">
                    <b>Known Works : </b>
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    name="famous_works"
                    placeholder="Enter the author's known works"
                  />
                  <ErrorMessage
                    name="famous_works"
                    component="h6"
                    className="ps-2 mb-0 my-1 text-danger"
                  />
                </div>
                <div className="mb-3 col-sm-12 col-lg-12">
                  <label className="form-label">
                    <b> Image URL : </b>
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    name="image_url"
                    placeholder="Enter Author's Image URL"
                  />
                  <ErrorMessage
                    name="image_url"
                    component="h6"
                    className="ps-2 mb-0 my-1 text-danger"
                  />
                </div>
                <div className="col-12 text-center">
                  <button type="submit" className="btn btn-primary w-50 mx-2">
                    Add Author
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
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

export default AddAuthorForm;