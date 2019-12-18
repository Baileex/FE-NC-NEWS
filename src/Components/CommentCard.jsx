import React from "react";
import Voter from "./Voter";
import formatDate from "../utils/utils";

const CommentCard = props => {
  const {comment, user} = props;
  return (
    <div>
      <li className="comment" key={comment.comment_id}>
        <div className="comment-body flex justify-content-between">
          <div className="comment-wrap">
            <div className="comment-author flex flex-wrap align-items-center">
              <span className="fn">
                <h6>{comment.author}</h6>
              </span>
              <br></br>
              <span className="comment-meta">
                <h6>{formatDate(comment.created_at)}</h6>
                <br></br>
                <Voter
                  id={comment.comment_id}
                  object="comments"
                  votes={comment.votes}
                ></Voter>
              </span>
            </div>
            <p>{comment.body}</p>
          </div>
          {comment.author === user && (
            <button
              className="w3-button w3-light-grey w3-section delete-button"
              onClick={() => this.removeComment(comment.comment_id)}
            >
              Delete
            </button>
          )}
        </div>
      </li>
    </div>
  );
};

export default CommentCard;
