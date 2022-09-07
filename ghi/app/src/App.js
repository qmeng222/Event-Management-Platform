import Nav from "./Nav";
// import React from "react";
// import AttendeesList from "./AttendeesList";
// import LocationForm from "./LocationForm";
// import ConferenceForm from "./ConferenceForm";
import AttendConferenceForm from "./AttendConference";

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    // <React.Fragment>
    <>
      <Nav />
      <div className="container">
        <AttendConferenceForm />
        {/* <ConferenceForm /> */}
        {/* <LocationForm /> */}
        {/* <AttendeesList attendees={props.attendees} /> */}
      </div>
    </>
    // </React.Fragment>
  );
}

export default App;
