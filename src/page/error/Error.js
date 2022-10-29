import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/action';
function Error() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    console.log(user);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };
    return (
        <div>
            <h2>Error</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Error;
