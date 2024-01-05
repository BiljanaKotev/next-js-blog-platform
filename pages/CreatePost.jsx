import React from 'react';
import '../styles/CreatePost.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../pages/src/context/auth.context';
import service from '../pages/src/api/service';
import capitalizeName from '../pages/src/utils/utils';

function CreatePost() {
  const [coverImgFile, setCoverImgFile] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('authToken');

  if (!user || !user._id) {
    console.error('No user is logged in');
    return;
  }

  const handleCoverImgChange = (e) => {
    setCoverImgFile(e.target.files[0]);
  };

  const handlePublish = () => {
    const postData = {
      title: title,
      content: content,
      author: user._id,
    };

    service
      .createPostWithImage(postData, coverImgFile, token)
      .then((response) => {
        console.log(response);
        navigate('/blog-feed');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
  };

  const handleTitle = (e) => setTitle(e.target.value);
  const handleContent = (e) => setContent(e.target.value);

  return (
    <main className='blog-main'>
      <form className='form create-form' onSubmit={handleCreateSubmit}>
        <div className='form-container'>
          <div className='create-post-input-container'>
            <label className='cover-img-label' htmlFor='coverImg'>
              Add a cover image
            </label>
            <input className='cover-img-input' name='coverImg' id='coverImg' type='file' accept='image/*' data-max-file-size-mb='1' onChange={handleCoverImgChange} />
            {coverImgFile && <img className='cover-img-preview' src={URL.createObjectURL(coverImgFile)} alt='Cover preview' />}
          </div>
          <div>
            <textarea
              className='create-post-title  mt-5 create-post-textarea'
              name='title'
              id='title'
              placeholder='New post title here...'
              value={title}
              onChange={handleTitle}
            ></textarea>
          </div>
          <div>
            <textarea
              className='create-post-content mt-5 create-post-textarea'
              name='content'
              id='content'
              placeholder='write your post content here...'
              value={content}
              onChange={handleContent}
            ></textarea>
          </div>
        </div>

        <p className='fs-5'>Created by: {capitalizeName(user.name)}</p>
        <button className='create-btn' type='submit' onClick={handlePublish}>
          Publish
        </button>
      </form>
    </main>
  );
}

export default CreatePost;
