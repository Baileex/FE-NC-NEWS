import React, { Component } from 'react';
import Errormsg from './Errormsg';
import * as api from "../api";
import { CarouselProvider, Slider, Slide, Image } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";



class ArticlePoster extends Component {
 state = {
    isLoading: true,
    topics: [],
    body: "",
    title: "",
    error: "",
  };

  componentDidMount = () => {
    this.fetchTopics();
  };

  

  handleTopics = event => {
    this.setState({ topic: event.target.value });
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

  handleChange = event => {
    const { name } = event.target;
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title, body, topic } = this.state;
    this.setState({
      title: "",
      body: "",
      post: true,
      topic: ""
    });
    api
      .postArticle(title, body, this.props.user, topic)
      .then(article => {})
      .catch(({ response }) => {
        this.setState({
          error: {
            msg: response.data.msg,
            status: response.status
          }
        });
      });
  };

  handleClick(event) {
    event.preventDefault()
  }


  render() {
    const { topics, body, title, error, topic, post } = this.state;
    if (error) return <Errormsg status={error.status} />;
    if (post === true) return <h1>Article posted!</h1>;
    return (  
      <div>
          <div className="post-container">
            <h2 className="new-topic">New Article</h2>
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
                  className="title-input"
                />{" "}
              </label>
              <label className="labels">
                Body:
                <textarea
                  required
                  rows="8"
                  cols="54"
                  type="text"
                  name="body"
                  value={this.state.body}
                  onChange={this.handleChange}
                  placeholder="Body"
                  className="input"
                />
              </label>
              <div className="dropdown">
                <button onClick={this.handleClick} className="dropbtn">
                  Choose a topic
                </button>
                <div className="dropdown-content">
                  {topics.map(topic => {
                    return (
                      <div key={topic.slug}>
                        <label onChange={this.handleTopics}>
                          <input
                            className="dropdown"
                            name="topic"
                            type="radio"
                            value={topic.slug}
                          />
                          {topic.slug}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              {error && (
                <Errormsg status={error.status} msg="topic not added" />
              )}
              <button
                className="w3-button w3-dark-grey w3-section topic-submit"
                disabled={!topic || !body || !title}
                onClick={this.closeModal}
              >
                Submit
              </button>
            </form>
            <CarouselProvider
              className="carousel"
              naturalSlideWidth={1}
              naturalSlideHeight={1}
              totalSlides={5}
              interval={5000}
              isPlaying={true}
              playDirection={"forward"}
            >
              <Slider>
                <Slide index={3}>
                  <Image src="https://images.pexels.com/photos/1438190/pexels-photo-1438190.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" />
                </Slide>
                <Slide index={1}>
                  <Image src="https://images.pexels.com/photos/2333332/pexels-photo-2333332.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" />
                </Slide>
                <Slide index={2}>
                  <Image src="https://images.pexels.com/photos/3205480/pexels-photo-3205480.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" />
                </Slide>
                <Slide index={4}>
                  <Image src="https://images.pexels.com/photos/177557/pexels-photo-177557.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                </Slide>
                <Slide index={5}>
                  <Image src="https://images.pexels.com/photos/242492/pexels-photo-242492.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                </Slide>
              </Slider>
            </CarouselProvider>
          </div>
        </div>
    );
  }
}


export default ArticlePoster;