import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Error from './page/error/Error';
import { ProtectedRoutes } from './auth/ProtectedRoutes';
import { useSelector } from 'react-redux';
import Loading from './component/loading/Loading';
import MessageList from './component/Sidebar/messagelist';
import Friends from './component/Sidebar/friends';
import Groups from './component/Sidebar/groups';
import ChatBox from './component/ChatBox/ChatBox';
const Login = React.lazy(() => import('./page/login/Login'));
const Register = React.lazy(() => import('./page/register/Register'));
const ChatRoom = React.lazy(() => import('./page/chat/ChatRoom'));
// const Friends = React.lazy(() => import('./component/Sidebar/friends'));
// const Groups = React.lazy(() => import('./component/Sidebar/groups'));
function App() {
    const { user, onlineUsers, room, conversation } = useSelector((state) => state);

    console.log(user, room, conversation);
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
                >
                    <Route
                        index
                        element={
                            <ProtectedRoutes>
                                <MessageList />
                            </ProtectedRoutes>
                        }
                    />
                    <Route path="friends" element={<Friends />} />
                    <Route
                        path="groups"
                        element={
                            <ProtectedRoutes>
                                <Groups />
                            </ProtectedRoutes>
                        }
                    />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
