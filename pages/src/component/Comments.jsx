import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import './Comments.module.css';
import { Link } from 'react-router-dom';
import DeleteComment from './DeleteComment';
import { API_URL } from '../api/service';
import capitalizeName from '../utils/utils';

function Comments() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [dropDown, setIsDropDown] = useState(false);
  const token = localStorage.getItem('authToken');
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${API_URL}/blog-feed/${id}/comments`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/blog-feed/${id}/comments`, { text: newComment }, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setComments([...comments, response.data]);
        setNewComment('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dropDownMenu = (commentId) => {
    if (dropDown === commentId) {
      setIsDropDown(false);
    } else {
      setIsDropDown(commentId);
    }
  };

  const handleCommentDeleted = (deletedCommentId) => {
    setComments((prevComments) => prevComments.filter((comment) => comment._id !== deletedCommentId));
  };

  return (
    <div className='comments-wrapper'>
      <form onSubmit={handleSubmit}>
        <div className='comments-textarea-container'>
          <textarea className='comments-textarea' value={newComment} onChange={(e) => setNewComment(e.target.value)} cols='30' rows='10'></textarea>
          <button className='comments-btn' type='submit'>
            Add Comment
          </button>
        </div>
      </form>

      {comments.map((comment) => (
        <div key={comment._id} className='comments-container'>
          <div className='user-img-container'>
            <img className='blogfeed-profile-pic' src={comment.author.profilePicUrl} alt='User' />
          </div>
          <p className='comment-author'>
            <strong>{capitalizeName(comment.author.name)}</strong>: {comment.text}
          </p>

          <button className='ellipsis' onClick={() => dropDownMenu(comment._id)}>
            ...
          </button>
          {dropDown === comment._id ? (
            <ul style={{ display: 'block' }} className='comments-dropdown'>
              <Link to={`/blog-feed/${id}/comments/${comment._id}`}>
                <li className='comment-edit-link'>Edit</li>
              </Link>

              <DeleteComment commentId={comment._id} postId={id} onCommentDeleted={handleCommentDeleted} />
            </ul>
          ) : (
            <ul style={{ display: 'none' }} className='comments-dropdown'>
              <Link to={`/blog-feed/${id}/comments/${comment._id}`}>
                <li>Edit</li>
              </Link>

              <DeleteComment commentId={comment._id} postId={id} />
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default Comments;
