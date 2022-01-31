import React, { useEffect, useState } from 'react'
import './styles/Profile.css';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Tabs } from 'antd';
import axios from '../utils/apiCall';
import Grid from '@mui/material/Grid';
import { useDispatch } from 'react-redux';
import { getRefresh, getScreenSize } from '../features/generalSlice';
import { getUser } from '../../src/features/userSlice'
import Info from '../components/Profile/Info';
import UserCourses from '../components/Profile/UserCourses'
import Grades from '../components/Profile/Grades';
import Calendar from '../components/Profile/Calendar';
const { TabPane } = Tabs;

const ProfilePage = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [changed, setChanged] = useState(false);
    const [activeKey, setActiveKey] = useState("1");
    const user = useSelector(getUser);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const size = useSelector(getScreenSize);
    const refresh = useSelector(getRefresh);
    const userId = user?.id;


    useEffect(() => {
        setLoading(true);
        if (user?.isStudent) {
            axios.get(`/students/${userId}`)
                .then((res) => {
                    setUserInfo(res.data)
                })
                .finally(() => setLoading(false))
        }
        else {
            axios.get(`/teachers/${userId}`)
                .then((res) => {
                    setUserInfo(res.data)
                })
                .finally(() => setLoading(false))
        }

    }, [userId, refresh, changed]);


    const RenderTabScreensStudent = () => {
        switch (activeKey) {
            case "1":
                return <Info user={userInfo} type={user?.isStudent ? 'Student' : 'Teacher'} changedUser={() => setChanged(true)} isOwner={true} />
            case "2":
                return <UserCourses user={userInfo} type={user?.isStudent ? 'Student' : 'Teacher'} isFinished={0} />
            case "3":
                return <UserCourses user={userInfo} type={user?.isStudent ? 'Student' : 'Teacher'} isFinished={1} />
            case "4":
                return <Grades user={userInfo} />
            case "5":
                return <Calendar courses={userInfo?.Courses} />
            default:
                return
        }
    }

    const RenderTabScreensTeacher = () => {
        switch (activeKey) {
            case "1":
                return <Info user={userInfo} type={user?.isStudent ? 'Student' : 'Teacher'} isOwner={true} />
            case "2":
                return <UserCourses user={userInfo} type={user?.isStudent ? 'Student' : 'Teacher'} isFinished={0} />
            case "3":
                return <UserCourses user={userInfo} type={user?.isStudent ? 'Student' : 'Teacher'} isFinished={1} />
            case "4":
                return <Calendar courses={userInfo?.courses} />
            default:
                return
        }
    }


    return (
        <Grid container justifyContent='center' style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
            {loading ? "Loading..." : (
                <Grid item container spacing={2}>
                    <Grid item container xs={0} sm={0} md={0} lg={2} />
                    <Grid item container xs={12} sm={12} md={3} lg={1.5}>
                        {user.isStudent ? (
                            <Tabs activeKey={activeKey} onTabClick={setActiveKey} tabPosition={size > 850 ? 'left' : 'top'} style={{ width: '100%' }} centered>
                                <TabPane tab="Info" key="1" />
                                <TabPane tab="Active Courses" key="2" />
                                <TabPane tab="Closed Courses" key="3" />
                                <TabPane tab="Grades" key="4" />
                                <TabPane tab="Weekly Schedule" key="5" />
                            </Tabs>
                        ) : (
                            <Tabs activeKey={activeKey} onTabClick={setActiveKey} tabPosition={size > 850 ? 'left' : 'top'} style={{ width: '100%' }} centered>
                                <TabPane tab="Info" key="1" />
                                <TabPane tab="Active Courses" key="2" />
                                <TabPane tab="Closed Courses" key="3" />
                                <TabPane tab="Weekly Schedule" key="4" />
                            </Tabs>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={9} lg={5}>
                        {user.isStudent ? (
                            RenderTabScreensStudent()
                        ) : (
                            RenderTabScreensTeacher()
                        )}
                    </Grid>
                    <Grid item container xs={0} sm={0} md={0} lg={2} />
                </Grid>

            )}
        </Grid>
    )
}


export default ProfilePage;