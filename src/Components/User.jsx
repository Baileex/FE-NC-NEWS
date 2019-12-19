import React, { Component } from "react";
import * as api from "../api";
import ErrorPage from "./ErrorPage";
import LoadingIcon from "./LoadingIcon";

class User extends Component {
  state = {
    user: "",
    isLoading: true,
    error: null
  };

  componentDidMount = () => {
    this.getUser();
  };

  getUser = () => {
    const { loggedUser } = this.props;
    api
      .getUserByUsername(loggedUser)
      .then(user => {
        this.setState({ user: user });
      })
      .catch(({ response }) => {
        this.setState({
          error: {
            msg: response.data.msg,
            status: response.status
          },
          isLoading: false
        });
      });
  };

  render() {
    const { user, error, loading } = this.state;
    if (loading === true) return <LoadingIcon />;
    if (error) return <ErrorPage status={error.status} msg={error.msg} />;
    return (
      <div className="column">
        <div className="card">
          <img
            className="avatar"
            src={user.avatar_url}
            alt="Avatar"
          ></img>
          <div className="profile-container">
            <h2>Name: {user.name}</h2>
            <br></br>
            <h2>Username: {user.username}</h2>
            <br></br>
            <h2>About Me:</h2>
            <br></br>
            <p>I love reading about the news - my favorite articles are about cooking. I enjoy getting lots of votes on my articles! </p>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
