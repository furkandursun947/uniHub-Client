import axios from '../utils/apiCall';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { getRefresh, getScreenSize } from '../features/generalSlice';
import { Tabs } from 'antd';
import HomeworkDetailTab from '../components/Homework/HomeworkDetailTab';
import StudentUploadsTab from '../components/Homework/StudentUploadsTab';
import StudentHomeworkCard from '../components/Homework/StudentHomeworkCard';
import { getIsUserLogged, getUser } from '../features/userSlice';

const { TabPane } = Tabs;

const HomeworkPage = () => {

    const isLogged = useSelector(getIsUserLogged);
    const user = useSelector(getUser);
    const { homeworkId } = useParams();
    const [homework, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeKey, setActiveKey] = useState("1");
    const size = useSelector(getScreenSize);
    const refresh = useSelector(getRefresh);

    const isStudent = isLogged ? (user?.isStudent ? true : false) : false;
    const studentId = isStudent ? user?.id : null;
    const teacherId = isStudent ? null : user?.id;
    const isOwner = !isStudent && homework?.Course.TeacherId ? (homework.Course.TeacherId === teacherId) : false;

    useEffect(() => {
        setLoading(true);
        axios.get(`/courses/get-homework/${homeworkId}`)
            .then((res) => {
                setCourse(res.data);
            })
            .finally(() => setLoading(false))
    }, [homeworkId, refresh])

    const RenderTabScreens = () => {

        switch (activeKey) {
            case "1":
                return <HomeworkDetailTab isOwner={isOwner} info={homework} />
            case "2": {
                if (isStudent) {
                    return <StudentHomeworkCard info={homework} homeworkId={homeworkId} studentId={studentId} studentNumber={1} />
                } else if (isOwner) {
                    return <StudentUploadsTab students={homework?.Course?.Students} homeworkId={homeworkId} />
                }
                break;
            }
            default:
                return <HomeworkDetailTab isOwner={isOwner} />
        }
    }

    return (
        <Grid container justifyContent='center'>
            {loading ? "Loading..." : (
                homework ? (
                    <Grid item container spacing={2}>
                        <Grid item container xs={0} sm={0} md={0} lg={2} />
                        <Grid item container xs={12} sm={12} md={3} lg={1.5}>
                            <Tabs activeKey={activeKey} onTabClick={setActiveKey} tabPosition={size > 850 ? 'left' : 'top'} style={{ width: '100%' }} centered>
                                <TabPane tab="Info" key="1" />
                                {isOwner && (
                                    <TabPane tab="Uploads" key="2" />
                                )}
                                {isStudent && (
                                    <TabPane tab="Upload" key="2" />
                                )}
                            </Tabs>
                        </Grid>
                        <Grid item xs={12} sm={12} md={9} lg={5}>
                            {RenderTabScreens()}
                        </Grid>
                        <Grid item container xs={0} sm={0} md={0} lg={2} />
                    </Grid>
                ) : (
                    <Grid container justifyContent="center">
                        Homework Not Found
                    </Grid>
                )
            )}
        </Grid>
    )
}

export default HomeworkPage
