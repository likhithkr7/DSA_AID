import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CategoriesScreen from "./screens/CategoriesScreen";
import SubCategoriesScreen from "./screens/SubCategoriesScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import NotesScreen from "./screens/NotesScreen";
import FeedbackScreen from "./screens/FeedbackScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route
              path="/notes/:id/:subcategoryId/:problemId"
              element={<NotesScreen />}
            />
            <Route path="/category/:id" element={<SubCategoriesScreen />} />
            <Route path="/:user/:id" element={<FeedbackScreen />} exact />
            <Route path="/:user" element={<CategoriesScreen />} exact />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
