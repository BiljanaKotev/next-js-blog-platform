import Navbar from './component/Navbar';
import { Routes, Route } from 'react-router-dom';
import SignupPage from '../SignupPage';
import LoginPage from '../LoginPage';
import Dashboard from '../Dashboard';
import HomePage from '../HomePage';
import CreatePost from '../CreatePost';
import BlogFeed from '../BlogFeed';
import BlogPost from '../BlogPost';
import UserPost from '../UserPost';
import EditComments from './component/EditComments';
import { useContext } from 'react';
import { AuthContext } from '../src/context/auth.context';
import EditPage from '../EditPage';
import { useState } from 'react';
import { useRouter } from 'next/router'; // Import the useRouter hook from Next.js

function App() {
  const contextValues = useContext(AuthContext);
  const { user } = contextValues || {};
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState(undefined);
  let navbarColor = 'f';
  let navLinkColor = '';

  navbarColor = router.pathname === '/create-post' ? '#f5f5f5' : '';
  navLinkColor = router.pathname === '/login' ? '#000000' : '';

  return (
    <div className='App'>
      <Navbar color={navbarColor} navLinkColor={navLinkColor} />

      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/signup' element={<SignupPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/dashboard' element={<Dashboard key={user?.id || 'default'} />} />
        <Route path='/create-post' element={<CreatePost />}></Route>
        <Route path='/blog-feed' element={<BlogFeed />}></Route>
        <Route path='/blog-feed/:id' element={<BlogPost />}></Route>
        <Route path='/user-posts/:id' element={<UserPost errMsg={errorMsg} setErrMsg={setErrorMsg} />}></Route>
        <Route path='/user-posts/:id/edit' element={<EditPage />} />
        <Route path='/blog-feed/:postId/comments/:commentId' element={<EditComments />} />
      </Routes>
    </div>
  );
}

export default App;
