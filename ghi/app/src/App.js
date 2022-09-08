import Nav from "./Nav";
// import React from "react";
import MainPage from "./MainPage";
import LocationForm from "./LocationForm";
import ConferenceForm from "./ConferenceForm";
import AttendConferenceForm from "./AttendConferenceForm";
import PresentationForm from "./PresentationForm";
import AttendeesList from "./AttendeesList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="locations/new" element={<LocationForm />} />
          <Route path="conferences/new" element={<ConferenceForm />} />
          <Route path="attendees/new" element={<AttendConferenceForm />} />
          <Route path="presentations/new" element={<PresentationForm />} />
          <Route
            path="attendees"
            element={<AttendeesList attendees={props.attendees} />}
          />
        </Routes>
      </div>
    </BrowserRouter>

    // // <React.Fragment>
    // <>
    //   <Nav />
    //   <div className="container">
    //     <AttendConferenceForm />
    //     {/* <ConferenceForm /> */}
    //     {/* <LocationForm /> */}
    //     {/* <AttendeesList attendees={props.attendees} /> */}
    //   </div>
    // </>
    // // </React.Fragment>
  );
}

export default App;
