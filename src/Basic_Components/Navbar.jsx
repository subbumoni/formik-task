//Importing useState for State Management
import { useState } from "react";

//Importing Link from react-router-dom for navigation
import { Link } from "react-router-dom";


const Navbar = () => {
  //using state to update the active tab
  const [activeTab, setActiveTab] = useState("/");

  // activating the tab as per click
  const handleChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid px-4 px-lg-5 justify-content-between">
          {/* through Link tab declaring where to navigate by click */}
          <div className="d-flex justify-content-center">
            <button
              className="navbar-toggler collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navItems"
              aria-controls="navItems"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <Link
              to={"/"}
              className="navbar-brand d-lg-flex d-inline-block align-items-center"
            >
              <img
                src="/Images/formik_brand1.png"
                alt="axios_logo"
                className="img-fluid nav-logo d-none d-lg-block"
              />
              <h2 className="h2 ms-2 mb-0 d-md-block d-lg-none">Dashboard</h2>
            </Link>
          </div>

          {/* Nav Links  */}
          <div className="navbar-collapse collapse" id="navItems">
            <ul className="navbar-nav me-auto my-2 mb-lg-0 ms-lg-4">
              <li className="nav-item">
                <Link
                  to="/"
                  onClick={() => handleChange("/")}
                  className={`nav-link ${activeTab === "/" ? "active" : ""}`}
                >
                  Books
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/authors"
                  onClick={() => handleChange("/authors")}
                  className={`nav-link ${
                    activeTab === "/authors" ? "active" : ""
                  }`}
                >
                  Authors
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/add-book-form"
                  onClick={() => handleChange("/add-book-form")}
                  className={`nav-link ${
                    activeTab === "/add-book-form" ? "active" : ""
                  }`}
                >
                  Add Books
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/add-author-form"
                  onClick={() => handleChange("/add-author-form")}
                  className={`nav-link ${
                    activeTab === "/add-author-form" ? "active" : ""
                  }`}
                >
                  Add Authors
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/modify-books"
                  onClick={() => handleChange("/modify-books")}
                  className={`nav-link ${
                    activeTab === "/modify-books" ? "active" : ""
                  }`}
                >
                  Modify Books
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/modify-authors"
                  onClick={() => handleChange("/modify-authors")}
                  className={`nav-link ${
                    activeTab === "/modify-authors" ? "active" : ""
                  }`}
                >
                  Modify Authors
                </Link>
              </li>
            </ul>
          </div>

          {/* Admin  */}
          <div>
            <span className="me-3 d-none d-xl-inline text-white">Admin</span>
            <img
              className="img-profile rounded-circle"
              src="Images/profile.jfif"
              alt="User-Profile"
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
