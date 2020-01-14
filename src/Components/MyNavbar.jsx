import React, { Component } from "react";
import * as api from "../api";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import styled from "styled-components";
import { Link } from "@reach/router";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorPage from "./ErrorPage";
import TopicAdder from "./TopicAdder";

const Navigate = styled.div`
position: fixed;
margin-top: 120px;
margin-bottom: 1px;
width: 100%
z-index: 10;
@media only screen and (max-width: 425px ) {
  width: 99%
}
`;

class MyNavbar extends Component {
  state = {
    topics: [],
    collapsed: true,
  };

  componentDidMount = () => {
    this.fetchTopics();
  };


  fetchTopics = () => {
    api
      .getTopics()
      .then(topics => {
        this.setState({ topics: topics });
      })
      .catch(({ response }) => {
        this.setState({
          error: {
            msg: response.data.msg,
            status: response.status
          }
        });
      });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.topics !== this.state.topics) {
      this.fetchTopics();
    }
  };

  toggleNavBar() {
    this.setState(currentState => {
      return { collapsed: !currentState.collapsed };
    });
  }

  render() {
    const { topics, error } = this.state;
    if (error) return <ErrorPage status={error.status} msg={error.msg} />;
    return (
      <Navigate>
        <Navbar bg="light" expand="lg" collapseOnSelect="true">
          <Navbar.Brand>
            <Link to="/" className="home-link">
              NC News
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/" className="link" onClick={this.toggleNavBar}>
                Home
              </Link>
              <Link to="/articles" className="link" onClick={this.toggleNavBar}>
                Articles
              </Link>
              <NavDropdown
                title="Topics"
                id="basic-nav-dropdown"
                className="NavDropdown"
                expand="lg"
              >
                <div className="topic-dd">
                  {topics.map(topic => {
                    return (
                      <li key={topic.slug}>
                        <Link
                          className="dropdown-links"
                          to={`/topics/${topic.slug}`}
                          onClick={this.toggleNavBar}
                        >
                          {topic.slug}
                        </Link>
                      </li>
                    );
                  })}
                  <NavDropdown.Divider />
                  <TopicAdder />
                </div>
              </NavDropdown>
              <Link
                to="/articles/newarticle"
                className="link"
              >
                New Article
              </Link>
            </Nav>
            <Link to="/user" className="logged-in" onClick={this.toggleNavBar}>
              Logged in as: {this.props.loggedUser}
            </Link>
          </Navbar.Collapse>
        </Navbar>
      </Navigate>
    );
  }
}

export default MyNavbar;
