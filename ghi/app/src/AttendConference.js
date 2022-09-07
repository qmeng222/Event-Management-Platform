import React from "react";

class AttendConferenceForm extends React.Component {
  // constructor:
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      conferences: [],
    };

    // bind in constructor:
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleConferenceChange = this.handleConferenceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // methods to update the components' state:
  handleNameChange(event) {
    const value = event.target.value;
    this.setState({ name: value });
  }

  handleEmailChange(event) {
    const value = event.target.value;
    this.setState({ email: value });
  }

  handleConferenceChange(event) {
    const value = event.target.value;
    this.setState({ conference: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    delete data.conferences;
    console.log(data);
    // {name: 'noor99', email: 'noor99@example.com', conference: '/api/conferences/7/'}

    const confHref = data.conference; // "/api/conferences/7/";
    const attendeesUrl = `http://localhost:8001${confHref}attendees/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(attendeesUrl, fetchConfig);
    if (response.ok) {
      const attendee = await response.json();
      console.log(attendee);

      const cleared = {
        name: "",
        email: "",
        conference: "",
        // add a Boolean value in the component state to show the success message on a valid form submission
        bool: true,
      };
      this.setState(cleared);
    }
  }

  async componentDidMount() {
    const url = "http://localhost:8000/api/conferences/";

    const response = await fetch(url);
    // console.log(response)

    if (response.ok) {
      const data = await response.json();
      this.setState({ conferences: data.conferences });
    }
  }

  render() {
    // refere to ghi > attend-conference.html:
    let spinnerClass = "d-flex justify-content-center mb-3";
    let dropDownClass = "form-select d-none";
    if (this.state.conferences.length > 0) {
      spinnerClass = "d-flex justify-content-center mb-3 d-none";
      dropDownClass = "form-select";
    }

    let formClass = ""; // clear the form
    // refere to ghi > attend-conference.html:
    let alertClass = "alert alert-success d-none mb-0";
    if (this.state.bool) {
      // refere to ghi > attend-conference.html:
      formClass = "card shadow d-none";
      alertClass = "alert alert-success mb-0";
    }

    return (
      <div className="container">
        <div className="my-5">
          <div className="row">
            <div className="col col-sm-auto">
              <img
                width="300"
                className="bg-white rounded shadow d-block mx-auto mb-4"
                src="/logo.svg"
                alt="logo"
              />
            </div>
            <div className="col">
              <div className="card shadow">
                <div className="card-body">
                  <form
                    onSubmit={this.handleSubmit}
                    id="create-attendee-form"
                    className={formClass}
                  >
                    <h1 className="card-title">It's Conference Time!</h1>
                    <p className="mb-3">
                      Please choose which conference you'd like to attend.
                    </p>

                    <div
                      className={spinnerClass}
                      id="loading-conference-spinner"
                    >
                      <div
                        className="spinner-grow text-secondary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>

                    {/* CHOOSE A CONFERENCE: */}
                    <div className="mb-3">
                      <select
                        onChange={this.handleConferenceChange}
                        value={this.state.conference}
                        name="conference"
                        id="conference"
                        className={dropDownClass}
                        required
                      >
                        <option value="">Choose a conference</option>
                        {this.state.conferences.map((conference) => {
                          return (
                            <option
                              key={conference.href}
                              value={conference.href}
                            >
                              {conference.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <p className="mb-3">Now, tell us about yourself.</p>

                    <div className="row">
                      {/* NAME: */}
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            onChange={this.handleNameChange}
                            value={this.state.name}
                            placeholder="Your full name"
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                          />
                          <label htmlFor="name">Your full name</label>
                        </div>
                      </div>

                      {/* EMAIL: */}
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            onChange={this.handleEmailChange}
                            value={this.state.email}
                            placeholder="Your email address"
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                          />
                          <label htmlFor="email">Your email address</label>
                        </div>
                      </div>
                    </div>

                    <button className="btn btn-lg btn-primary">
                      I'm going!
                    </button>
                  </form>
                  <div className={alertClass} id="success-message">
                    Congratulations! You're all signed up!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AttendConferenceForm;
