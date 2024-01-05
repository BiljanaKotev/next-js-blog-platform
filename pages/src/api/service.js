// src/api/service.js

import axios from 'axios';
export const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api` || 'http://localhost:5005/api';

const api = axios.create({
  baseURL: API_URL,
});

const errorHandler = (err) => {
  throw err;
};

// USED ON THE DASHBOARD PAGE

const uploadProfilePic = (uploadData, token) => {
  return api
    .post('/upload', uploadData, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data)
    .catch(errorHandler);
};

// USED ON THE CREATE POST PAGE
const createPostWithImage = (postData, coverImgFile, token) => {
  const uploadData = new FormData();
  uploadData.append('imgUrl', coverImgFile);

  return api
    .post('/upload', uploadData, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      postData.coverImg = response.data.fileUrl;

      return api.post('/create-post', postData, { headers: { Authorization: `Bearer ${token}` } });
    })
    .then((res) => res.data)
    .catch(errorHandler);
};

// USED ON THE BLOGFEED PAGE
const fetchBlogFeed = (token) => {
  return axios
    .get(`${API_URL}/blog-feed`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error fetching blog feed:', error);
      return Promise.reject(error);
    });
};

// USED ON THE EDIT PAGE
const editPostWithImage = (postId, postData, coverImgFile, token) => {
  const uploadData = new FormData();

  if (coverImgFile) {
    uploadData.append('imgUrl', coverImgFile);

    return api
      .post('/upload', uploadData, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        postData.coverImg = response.data.fileUrl;

        return api.put(`/user-posts/${postId}`, postData, { headers: { Authorization: `Bearer ${token}` } });
      })
      .then((res) => res.data)
      .catch(errorHandler);
  } else {
    return api
      .put(`/user-posts/${postId}`, postData, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.data)
      .catch(errorHandler);
  }
};

const service = { createPostWithImage, uploadProfilePic, fetchBlogFeed, editPostWithImage };

export default service;
