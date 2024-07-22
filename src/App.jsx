//Importing App.jsx stylesheet
import "./App.css";

//Importing Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";


//Importing react-router-dom components
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Importing other necessary child components
import Navbar from "./Basic_Components/Navbar";
import BooksList from "./Book_Components/BooksList";
import AddBookForm from "./Book_Components/AddBookForm";
import ModifyBooks from "./Book_Components/ModifyBooks";
import EditBookForm from "./Book_Components/EditBookForm";
import AuthorsList from "./Components/Author_Components/AuthorsList";
import ModifyAuthors from "./Components/Author_Components/ModifyAuthors";
import EditAuthorForm from "./Components/Author_Components/EditAuthorForm";
import Footer from "./Basic_Components/Footer";

function App() {
  return (
    <>
      {/* Navigating one element to another element using react-router-dom */}
      <BrowserRouter>
        <Navbar />
        <h1 className="py-2 main-head text-center text-white">
          Library Management System
        </h1>
        <Routes>
          <Route path="/" element={<BooksList />} />
          <Route path="/add-book-form" element={<AddBookForm />} />
          <Routes path="/modify-books" element={<ModifyBooks />} />
          <Routes path="/edit-book-form/:id" element={<EditBookForm />} />
          <Routes path="/authors" element={<AuthorsList />} />
          <Routes path="/add-author-form" element={<ModifyAuthors />} />
          <Routes path="/edit-author-form/:id" element={<EditAuthorForm />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
