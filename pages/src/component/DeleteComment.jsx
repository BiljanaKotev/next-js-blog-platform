import React from 'react';
import axios from 'axios';
import './DeleteBtn.module.css';
import { API_URL } from '../api/service';

function DeleteComment({ commentId, postId, onCommentDeleted }) {
  const token = localStorage.getItem('authToken');

  const handleDelete = () => {
    axios
      .delete(`${API_URL}/blog-feed/${postId}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        console.log('successfully deleted');
        if (onCommentDeleted) {
          onCommentDeleted(commentId);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <button style={{ color: '#c91c1c', border: 'none', background: 'inherit' }} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default DeleteComment;
