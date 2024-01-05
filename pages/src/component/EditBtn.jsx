import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import DeleteBtn from './DeleteBtn';
import '../../../styles/UserPosts.module.css';
import './EditBtn.module.css';

function EditBtn() {
  const navigate = useNavigate();
  const { id } = useParams();

  const editPost = () => {
    navigate(`/user-posts/${id}/edit`);
  };

  return (
    <div className='user-posts-btns-container'>
      <DeleteBtn />
      <button className='edit-btn' onClick={editPost}>
        Edit
      </button>
    </div>
  );
}

export default EditBtn;
