import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Error from './page/error/Error';
import { ProtectedRoutes } from './auth/ProtectedRoutes';
import { useSelector } from 'react-redux';
import Loading from './component/loading/Loading';
const Login = React.lazy(() => import('./page/login/Login'));
const Register = React.lazy(() => import('./page/register/Register'));
const ChatRoom = React.lazy(() => import('./page/chat/ChatRoom'));
function App() {
    const user = useSelector((state) => state.user);
    console.log(user);
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<Suspense fallback={<Loading />}>{user ? <ChatRoom /> : <Login />}</Suspense>}
                />
                <Route
                    path="login"
                    element={
                        <Suspense fallback={<Loading />}>
                            <Login />
                        </Suspense>
                    }
                />
                <Route
                    path="login/:id"
                    element={
                        <Suspense fallback={<Loading />}>
                            <Login />
                        </Suspense>
                    }
                />
                <Route
                    path="register"
                    element={
                        <Suspense fallback={<Loading />}>
                            <Register />
                        </Suspense>
                    }
                />
                <Route
                    path="error"
                    element={
                        <ProtectedRoutes>
                            <Error />
                        </ProtectedRoutes>
                    }
                />
                <Route
                    path="messenger"
                    element={
                        <ProtectedRoutes>
                            <Suspense fallback={<Loading />}>
                                <ChatRoom />
                            </Suspense>
                        </ProtectedRoutes>
                    }
                />
                <Route
                    path="messenger/friends"
                    element={
                        <ProtectedRoutes>
                            <ChatRoom />
                        </ProtectedRoutes>
                    }
                />
                <Route
                    path="messenger/groups"
                    element={
                        <ProtectedRoutes>
                            <ChatRoom />
                        </ProtectedRoutes>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
