import React, { Component } from "react";
import * as api from "../api";
import Errormsg from "./Errormsg";

class TopicAdder extends Component {
  state = {
  title: "",
  description: "",
  error: ""
  }

  handleChange = event  => {
    const {name} = event.target
    this.setState({[name]: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault();
    const {title, description} = this.state;
    api.postTopic(title, description).then(topic => {
      this.setState({title: "", description: ""})
    }).catch(({ response }) => {
        this.setState({
          error: {
            msg: response.data.msg,
            status: response.status
          },
        });
      });
  }

  render() {
    const {error} = this.state;
    return (
      <>
        <h3>New Topic</h3>
        <div className="topics-form">
          <form onSubmit={this.handleSubmit}>
            <label className="labels">
              Title:
              <input
                required
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
                placeholder="Title"
                className="input"
              />{" "}
            </label>
            <label className="labels">
              Description:
              <textarea
                required
                rows="2"
                cols="34"
                type="text"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
                placeholder="Description"
                className="input"
              />
            </label>
            {error && <Errormsg/>}
            <button className="w3-button w3-light-grey w3-section topic-submit">Submit</button>
          </form>
        </div>
      </>
    );
  }
}

export default TopicAdder;
