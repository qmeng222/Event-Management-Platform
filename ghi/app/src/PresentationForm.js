import React from "react";

class PresentationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      presenterName: "",
      presenterEmail: "",
      companyName: "",
      title: "",
      synopsis: "",
      conferences: [],
    };

    // bind in constructor:
    this.handlePresenterNameChange = this.handlePresenterNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSynopsisChange = this.handleSynopsisChange.bind(this);
    this.handleConferenceChange = this.handleConferenceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // methods to update the components' state:
  handlePresenterNameChange(event) {
    const value = event.target.value;
    this.setState({ presenter_name: value });
  }

  handleEmailChange(event) {
    const value = event.target.value;
    this.setState({ presenter_email: value });
  }

  handleCompanyNameChange(event) {
    const value = event.target.value;
    this.setState({ company_name: value });
  }

  handleTitleChange(event) {
    const value = event.target.value;
    this.setState({ title: value });
  }

  handleSynopsisChange(event) {
    const value = event.target.value;
    this.setState({ synopsis: value });
  }

  handleConferenceChange(event) {
    const value = event.target.value;
    this.setState({ conference: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };

    data.presenter_name = data.presenterName;
    data.presenter_email = data.presenterEmail;
    data.company_name = data.companyName;
    delete data.presenterName;
    delete data.presenterEmail;
    delete data.companyName;

    delete data.conferences; // clear the dropdown
    console.log(data);

    const presentationUrl = `http://localhost:8000/api/conferences/${this.state.conference}/presentations/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(presentationUrl, fetchConfig);
    if (response.ok) {
      const newPresentation = await response.json();
      console.log(newPresentation);

      const cleared = {
        presenter_name: "",
        presenter_email: "",
        company_name: "",
        title: "",
        synopsis: "",
        conference: "",
        conferences: [],
      };
      this.setState(cleared);
    }
  }

  // load the states for the dropdown:
  async componentDidMount() {
    const url = "http://localhost:8000/api/conferences/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      this.setState({ conferences: data.conferences });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new Presentation</h1>
            <form onSubmit={this.handleSubmit} id="create-presentation-form">
              {/* PRESENTER NAME */}
              <div className="form-floating mb-3">
                <input
                  onChange={this.handlePresenterNameChange}
                  value={this.state.presenter_name}
                  placeholder="Presenter name"
                  required
                  type="text"
                  name="presenter_name"
                  id="presenter_name"
                  className="form-control"
                />
                <label htmlFor="presenter_name">Presenter Name</label>
              </div>

              {/* PRESENTER EMAIL */}
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleEmailChange}
                  value={this.state.presenter_email}
                  required
                  placeholder="Presenter email"
                  type="email"
                  name="presenter_email"
                  id="presenter_email"
                  className="form-control"
                />
                <label htmlFor="presenter_email">Presenter Email</label>
              </div>

              {/* COMPANY NAME */}
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleCompanyNameChange}
                  value={this.state.company_name}
                  placeholder="Company name"
                  required
                  type="text"
                  name="company_name"
                  id="company_name"
                  className="form-control"
                />
                <label htmlFor="company_name">Company Name</label>
              </div>

              {/* TITLE */}
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleTitleChange}
                  value={this.state.title}
                  placeholder="Title"
                  required
                  type="text"
                  name="title"
                  id="title"
                  className="form-control"
                />
                <label htmlFor="title">Title</label>
              </div>

              {/* SYNOPSIS */}
              <div className="mb-3">
                <label htmlFor="synopsis">Synopsis</label>
                <textarea
                  onChange={this.handleSynopsisChange}
                  value={this.state.synopsis}
                  name="synopsis"
                  id="synopsis"
                  rows="3"
                  className="form-control"
                ></textarea>
                <label htmlFor="synopsis">Synopsis</label>
              </div>

              {/* CHOOSE A CONFERENCE */}
              <div className="mb-3">
                <select
                  onChange={this.handleConferenceChange}
                  value={this.state.conference}
                  required
                  name="conference"
                  id="conference"
                  className="form-select"
                >
                  <option value="">Choose a conference</option>
                  {this.state.conferences.map((conference) => {
                    return (
                      <option key={conference.href} value={conference.id}>
                        {conference.name}
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

export default PresentationForm;
