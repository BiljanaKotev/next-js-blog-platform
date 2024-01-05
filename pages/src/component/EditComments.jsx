import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../component/EditComments.module.css';
import { API_URL } from '../api/service';

function EditComment() {
  const [commentText, setCommentText] = useState('');
  const token = localStorage.getItem('authToken');
  const { postId, commentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/blog-feed/${postId}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCommentText(response.data.text);
      });
  }, [postId, commentId, token]);

  const handleEdit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${API_URL}/blog-feed/${postId}/comments/${commentId}`,
        {
          text: commentText,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        navigate(`/blog-feed/${postId}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleEdit}>
        <div className='edit-comment-container'>
          <textarea className='edit-comment-textarea' value={commentText} onChange={(e) => setCommentText(e.target.value)} />
          <button className='edit-comment-save-btn' type='submit'>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditComment;
