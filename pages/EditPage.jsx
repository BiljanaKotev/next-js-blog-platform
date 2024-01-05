import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/EditPage.module.css';
import service from '../pages/src/api/service';
import axios from 'axios';
import { API_URL } from '../pages/src/api/service';

function EditPage() {
  const [userPost, setUserPost] = useState({});
  const [coverImgFile, setCoverImgFile] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    axios
      .get(`${API_URL}/user-posts/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        const postData = response.data;
        setUserPost(postData);
        setTitle(postData.title);
        setContent(postData.content);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [navigate, token, id]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setCoverImgFile(e.target.files[0]);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();

    const postData = {
      title: title,
      content: content,
      coverImg: userPost.coverImg,
    };

    service
      .editPostWithImage(id, postData, coverImgFile, token)
      .then((response) => {
        console.log(response);
        navigate(`/blog-feed/${id}`);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <main className='edit-main'>
      <form onSubmit={handleEdit}>
        <div className='edit-form-container form-container'>
          <div className='edit-input-container'>
            <label className='cover-img-label' htmlFor='coverImg'>
              Add a cover image
            </label>
            <input className='cover-img-input' type='file' name='coverImg' id='coverImg' onChange={handleFileChange} />
            {coverImgFile && <img className='cover-img-preview' src={URL.createObjectURL(coverImgFile)} alt='Cover preview' />}
          </div>
          <div>
            <textarea className='create-post-title fs-1 mt-5 edit-post-textarea' name='title' id='title' onChange={(e) => setTitle(e.target.value)} value={title}></textarea>
          </div>
          <div>
            <textarea
              className='create-post-content fs-3 mt-5 edit-post-textarea'
              name='content'
              id='content'
              onChange={(e) => setContent(e.target.value)}
              value={content}
            ></textarea>
          </div>
        </div>
        <button className='edit-update-btn' type='submit'>
          Update Post
        </button>
      </form>
    </main>
  );
}

export default EditPage;
