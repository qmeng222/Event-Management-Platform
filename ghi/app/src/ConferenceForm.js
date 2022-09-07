import React from "react";

class ConferenceForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      starts: "",
      ends: "",
      description: "",
      maxPres: "",
      maxAtt: "",
      locations: [],
    };

    // bind in constructor:
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleMaxPresChange = this.handleMaxPresChange.bind(this);
    this.handleMaxAttendeesChange = this.handleMaxAttendeesChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // methods to update the components' state:
  handleNameChange(event) {
    const value = event.target.value;
    this.setState({ name: value });
  }
  handleStartDateChange(event) {
    const value = event.target.value;
    this.setState({ starts: value });
  }
  handleEndDateChange(event) {
    const value = event.target.value;
    this.setState({ ends: value });
  }
  handleDescriptionChange(event) {
    const value = event.target.value;
    this.setState({ description: value });
  }
  handleMaxPresChange(event) {
    const value = event.target.value;
    this.setState({ maxPres: value });
  }
  handleMaxAttendeesChange(event) {
    const value = event.target.value;
    this.setState({ maxAtt: value });
  }
  handleLocationChange(event) {
    const value = event.target.value;
    this.setState({ location: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    data.max_presentations = data.maxPres;
    data.max_attendees = data.maxAtt;
    delete data.maxPres;
    delete data.maxAtt;
    delete data.locations;

    const conferenceUrl = "http://localhost:8000/api/conferences/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(conferenceUrl, fetchConfig);
    if (response.ok) {
      const newConference = await response.json();
      console.log(newConference);

      const cleared = {
        name: "",
        starts: "",
        ends: "",
        description: "",
        maxPres: "",
        maxAtt: "",
        location: "",
      };
      this.setState(cleared);
    }
  }

  // load the locations for the dropdown:
  async componentDidMount() {
    const url = "http://localhost:8000/api/locations/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ locations: data.locations });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new conference</h1>
            <form onSubmit={this.handleSubmit} id="create-conference-form">
              {/* NAME: */}
              <div className="form-floating mb-3">
                <input
                  value={this.state.name}
                  onChange={this.handleNameChange}
                  placeholder="Name"
                  required
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                />
                <label htmlFor="name">Name</label>
              </div>

              {/* STARTS: */}
              <div
                className="form-floating mb-3"
                data-provide="datepicker-inline"
              >
                <input
                  value={this.state.starts}
                  onChange={this.handleStartDateChange}
                  placeholder="Starts"
                  type="date"
                  name="starts"
                  id="starts"
                  className="form-control"
                />
                <label htmlFor="starts">Start</label>
              </div>

              {/* ENDS: */}
              <div
                className="form-floating mb-3"
                data-provide="datepicker-inline"
              >
                <input
                  value={this.state.ends}
                  onChange={this.handleEndDateChange}
                  placeholder="Ends"
                  type="date"
                  name="ends"
                  id="ends"
                  className="form-control"
                />
                <label htmlFor="ends">Ends</label>
              </div>

              {/* DESCRIPTION: */}
              <div className="form-floating mb-3">
                <textarea
                  value={this.state.description}
                  onChange={this.handleDescriptionChange}
                  required
                  name="description"
                  id="description"
                  rows="9"
                  className="form-control"
                ></textarea>
                <label htmlFor="description">Description</label>
              </div>

              {/* MAX PRESENTATIONS: */}
              <div className="form-floating mb-3">
                <input
                  value={this.state.maxPres}
                  onChange={this.handleMaxPresChange}
                  placeholder="Max presentations"
                  required
                  type="number"
                  name="max_presentations"
                  id="max_presentations"
                  className="form-control"
                />
                <label htmlFor="max_presentations">Maximum presentations</label>
              </div>

              {/* MAX ATTENDEES: */}
              <div className="form-floating mb-3">
                <input
                  value={this.state.maxAtt}
                  onChange={this.handleMaxAttendeesChange}
                  placeholder="Max attendees"
                  required
                  type="number"
                  name="max_attendees"
                  id="max_attendees"
                  className="form-control"
                />
                <label htmlFor="max_attendees">Maximum attendees</label>
              </div>

              {/* CHOOSE A LOCATION: */}
              <div className="mb-3">
                <select
                  value={this.state.location}
                  onChange={this.handleLocationChange}
                  required
                  name="location"
                  id="location"
                  className="form-select"
                >
                  <option value="">Choose a location</option>
                  {this.state.locations.map((location) => {
                    return (
                      <option value={location.id} key={location.href}>
                        {location.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ConferenceForm;
