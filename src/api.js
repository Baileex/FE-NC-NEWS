import axios from "axios";

const baseURL = "https://ncnewsjb.herokuapp.com/api";

export const getTopics = () => {
  return axios
    .get(`${baseURL}/topics`)
    .then(({ data }) => {
      return data.topics;
    });
};

export const getArticles = (topic_slug, sort_by, order, limit, page ) => {
  return axios
    .get(`${baseURL}/articles`, {
      params: {
       topic: topic_slug,
       sort_by: sort_by,
       order: order,
       limit: limit,
       p: page
      }
    })
    .then(({ data }) => {
      return data
    });
};

export const getSingleArticle = article_id => {
  return axios
    .get(`${baseURL}/articles/${article_id}`)
    .then(({ data }) => {
      return data.article;
    });
};

export const getComments = (article_id, limit, p) => {
  return axios
    .get(`${baseURL}/articles/${article_id}/comments`, {params: {
      limit: limit,
      p: p
    }})
    .then(({ data }) => {
      return data;
    });
};

export const postComment = (article_id, user, newComment) => {
  return axios
    .post(
      `${baseURL}/articles/${article_id}/comments`,
      { body: newComment, username: user }
    )
    .then(({ data }) => {
      return data.comment;
    });
};

export const deleteComment = comment_id => {
  return axios.delete(
    `${baseURL}/comments/${comment_id}`
  )
}

export const patchVotes = (votes, id, object) => {
  return axios.patch(`${baseURL}/${object}/${id}`, { inc_votes: votes});
}

export const fetchUsers = () => {
  return axios.get(`${baseURL}/users`).then(({data}) => {
    return data.users
  });
}

export const getUserByUsername = (username) => {
  return axios.get(`${baseURL}/users/${username}`).then(({data}) => {
    return data.user;
  });
}

export const postTopic = (title, description) => {
return axios.post(`${baseURL}/topics`, {slug: title, description: description}).then(({data}) => {
  return data.topic;
})
}