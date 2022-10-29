import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoutes = ({ children }) => {
    const user = useSelector((state) => state.user);
    const location = useLocation();
    const pathname = location.pathname;
    if (!user) {
        alert('You must login');
        // user is not authenticated
        window.location.href = `/login?continute=${pathname}`;

        return <></>;
    }
    return children;
};
