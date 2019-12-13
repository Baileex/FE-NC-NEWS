import React, { Component } from "react";
import * as api from "../api";
import ErrorPage from "./ErrorPage"
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
    const { user, error, loading} = this.state;
    if (loading === true) return <LoadingIcon />
    if (error) return <ErrorPage status={error.status} msg={error.msg} />
    return (
      <div className="container-profile">
        <img className="avatar" src={user.avatar_url} alt="Avatar"></img>
        <div className="user-text">
          <h2>Name: {user.name}</h2>
          <br>
          </br>
          <h2>Username: {user.username}</h2>
        </div>
      </div>
    );
  }
}

export default User;
