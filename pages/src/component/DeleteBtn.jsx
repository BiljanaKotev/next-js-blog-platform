import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../api/service';
import './DeleteBtn.module.css';

function DeleteBtn() {
  const navigate = useNavigate();
  const { id } = useParams();

  const deletePost = () => {
    const token = localStorage.getItem('authToken');

    axios
      .delete(`${API_URL}/user-posts/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Error deleting the post:', error.response ? error.response.data : error.message);
      });
  };

  return (
    <div>
      <button className='delete-btn' onClick={deletePost}>
        Delete
      </button>
    </div>
  );
}

export default DeleteBtn;
