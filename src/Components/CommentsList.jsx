import React, { Component } from "react";
import * as api from "../api";
import CommentMaker from "./CommentMaker";
import Pagination from "./Pagination";
import ErrorPage from "./ErrorPage";
import CommentCard from "./CommentCard";

class CommentsList extends Component {
  state = {
    comments: [],
    isLoading: true,
    error: null,
    page: 1,
    maxPages: null,
    limit: 4
  };
  componentDidMount = () => {
    this.fetchComments();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.fetchComments();
    }
  }

  changePage = direction => {
    this.setState(currentState => {
      return { page: currentState.page + direction };
    });
  };

  fetchComments = () => {
    const { article_id } = this.props;
    const { limit, page } = this.state;
    api
      .getComments(article_id, limit, page)
      .then(({ comments, total_count }) => {
        let max = Math.ceil(total_count / limit);
        this.setState({ comments: comments, isLoading: false, maxPages: max });
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

  postNewComment = newComment => {
    const { article_id, user } = this.props;
    api
      .postComment(article_id, user, newComment)
      .then(postedComment => {
        this.setState(currentState => {
         return { comments: [...currentState.comments, postedComment] };
        });
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

  removeComment = comment_id => {
    this.setState(({ comments }) => {
      return {
        comments: comments.filter(comment => comment.comment_id !== comment_id)
      };
    });
    api.deleteComment(comment_id).catch(({ response }) => {
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
    const { comments, error } = this.state;
    const { user } = this.props;
    if (error) return <ErrorPage status={error.status} msg={error.msg} />;
    return (
      <div>
        <ul className="comment-list">
          {comments.map(comment => {
            return (
              <CommentCard comment={comment} user={user} removeComment={this.removeComment}/>
            );
          })}
        </ul>
        <Pagination
          changePage={this.changePage}
          page={this.state.page}
          maxPages={this.state.maxPages}
        />
        <CommentMaker postNewComment={this.postNewComment} />
      </div>
    );
  }
}

export default CommentsList;
