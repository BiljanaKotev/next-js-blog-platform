import React, { useState } from 'react';
import axios from 'axios';
import '../component/Search.module.css';
import { API_URL } from '../api/service';

function Search({ setFilteredPosts }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');

    axios
      .get(`${API_URL}/blog-feed`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        const filteredPosts = response.data.filter(
          (post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(filteredPosts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <div className='search-container'>
          <label htmlFor='searchBar'></label>
          <input className='search-bar' type='text' placeholder='Search' name='searchBar' id='searchBar' onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
          <button className='search-btn' type='submit'>
            Search
          </button>
        </div>
      </form>
    </header>
  );
}
export default Search;
