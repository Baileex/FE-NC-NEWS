import React from "react";
import {
  Card,
  Title,
  Topic,
  Author,
  Date,
  Readmore,
  Commentcount
} from "../component-css/articledesign";
import formatDate from "../utils/utils";
import { Link } from "@reach/router";
import Voter from "./Voter";

const ArticleCard = props => {
  const { article, loggedUser } = props;
  return (
    <div>
      <Card key={article.article_id}>
        <Title>{article.title}</Title>
        <Topic>
          <Link className="hashtag" to={`/topics/${article.topic}`}>#{article.topic}</Link>
        </Topic>

        <Author>By: {article.author}</Author>
        {article.author !== loggedUser && (
          <Voter
            id={article.article_id}
            object="articles"
            votes={article.votes}
          />
        )}
        <Date>{formatDate(article.created_at)}</Date>
        <Commentcount>Comments: {article.comment_count}</Commentcount>
        <Readmore>
          <Link className="readmore" to={`/articles/${article.article_id}`}>Read More...</Link>
        </Readmore>
      </Card>
    </div>
  );
};

export default ArticleCard;
