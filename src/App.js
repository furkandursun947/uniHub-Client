import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import CoursePage from './pages/CoursePage';
import HomePage from './pages/HomePage';
import StudentPage from './pages/StudentPage';
import TeacherPage from './pages/TeacherPage';
import ProfilePage from './pages/ProfilePage';
import ExamPage from './pages/ExamPage';
import UniversitiesPage from './pages/UniversitiesPage';
import UniversityPage from './pages/UniversityPage';
import HomeworkPage from './pages/HomeworkPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useDispatch } from 'react-redux';
import { setScreenSize } from './features/generalSlice';
import axios from './utils/apiCall';
import { login, logout } from './features/userSlice';
import './App.css';
import 'antd/dist/antd.css';
import 'semantic-ui-css/semantic.min.css'

function App() {

    const history = useHistory();
    const dispatch = useDispatch();
    const [size, setSize] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            axios.get("/login-with-token", {
                headers: { Authorization: localStorage.getItem("token") }
            }).then((res) => {
                dispatch(login(res.data))
            }).catch((err) => {
                localStorage.removeItem("token");
                dispatch(logout())
                history.push("/login")
            })
        }
    }, [dispatch, history])

    useEffect(() => {
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [])

    const updateDimensions = () => {
        dispatch(setScreenSize(window.innerWidth));
        setSize(window.innerWidth)
    };

    return (
        <div style={{ height: 'auto' }}>
            <Router>
                <Navbar />
                <div style={{ minHeight: '100vh', marginTop: size < 500 ? 10 : 50, marginBottom: 20 }}>
                    <Switch>
                        <Route exact path="/">
                            <HomePage />
                        </Route>
                        <Route exact path="/universities">
                            <UniversitiesPage />
                        </Route>
                        <Route path="/universities/:universityId">
                            <UniversityPage />
                        </Route>
                        <Route path="/teachers/:teacherId">
                            <TeacherPage />
                        </Route>
                        <Route path="/students/:studentId">
                            <StudentPage />
                        </Route>
                        <Route path="/courses/:courseId">
                            <CoursePage />
                        </Route>
                        <Route path="/exams/:examId">
                            <ExamPage />
                        </Route>
                        <Route path="/homeworks/:homeworkId">
                            <HomeworkPage />
                        </Route>
                        <Route path="/login">
                            <LoginPage />
                        </Route>
                        <Route path='/register'>
                            <RegisterPage />
                        </Route>
                        <Route path='/profile'>
                            <ProfilePage />
                        </Route>
                    </Switch>
                </div>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
