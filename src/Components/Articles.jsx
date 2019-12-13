import React, { Component } from "react";
import * as api from "../api";
import {
  ArticleList,
} from "../articledesign";
import LoadingIcon from "./LoadingIcon";
import ArticlesSorter from "./ArticlesSorter";
import ErrorPage from "./ErrorPage";
import Pagination from "./Pagination";
import ArticleCard from "./ArticleCard";

class Articles extends Component {
  state = {
    articles: [],
    isLoading: true,
    error: null,
    searchTerm: "",
    page: 1,
    limit: 10,
    maxPages: null
  };

  componentDidMount = () => {
    this.fetchArticles();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.topic_slug !== this.props.topic_slug || prevState.page !== this.state.page) {
      this.fetchArticles();
    }
  };

  fetchArticles = (sort_by, order) => {
    const { topic_slug } = this.props;
    const {page, limit} = this.state;
    api
      .getArticles(topic_slug, sort_by, order, limit, page)
      .then(({articles, total_count}) => {
        let max = Math.ceil(total_count / limit);
        this.setState({ articles: articles, isLoading: false, maxPages: max});
      }).catch(({ response }) => {
        this.setState({
          error: {
            msg: response.data.msg,
            status: response.status
          },
          isLoading: false
        });
      });
  };

  stateUpdater = searchInput => {
    this.setState({ searchTerm: searchInput });
  };


  changePage = (direction) => {
   this.setState(currentState => {
     return {page: currentState.page + direction}
   })
  }

  render() {
    const { articles, isLoading, error} = this.state;
    const { loggedUser } = this.props;
    if (isLoading === true) return <LoadingIcon />;
    if (error) return <ErrorPage status={error.status} msg={error.msg} />;

    return (
      <div className="body">
      <div className="section-header">
        <div className="sorter">
          <ArticlesSorter fetchArticles={this.fetchArticles} />
        </div>
        <Pagination changePage={this.changePage} page={this.state.page} maxPages={this.state.maxPages}/>
        <div className="search-bar">
        </div>
        </div>
        <div className="container-articles">
          <ArticleList articles={articles}  margin={1000}>
            {articles.map(article => {
              return (
                <ArticleCard article={article} loggedUser={loggedUser} key={article.article_id}/>
              );
            })}
          </ArticleList>
        </div>
      </div>
    );
  }
}

export default Articles;
