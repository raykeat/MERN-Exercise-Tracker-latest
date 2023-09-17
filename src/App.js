import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import EditExercise from "./components/edit-exercises.component";
import ExercisesList from "./components/exercises-list.component";
import SpecificExercise from "./components/specific-exercise.component";


function App() {
  return (

    <Router>
      <div className = "container">
        <Navbar />
        {/* self closing html tag that represents line break */}
        <br/>

        <Routes>
          {/*Route maps specific URL paths to different React Components*/}
          <Route path = "/" exact element={<ExercisesList />} />
          <Route path = "/create" element={<CreateExercise />} />
          <Route path = "/user" element={<CreateUser />} />
          <Route path = "/editpost" element={<EditExercise />} />
          <Route path = "/specificpost/editpost" element={<EditExercise />} />
          <Route path = "/specificpost" element={<SpecificExercise />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
