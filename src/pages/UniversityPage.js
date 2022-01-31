import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import axios from '../utils/apiCall';
import Grid from '@mui/material/Grid';
import { Tabs } from 'antd';
import { useSelector } from 'react-redux';
import { getRefresh, getScreenSize } from '../features/generalSlice';
import TeachersTab from '../components/University/TeachersTab';
import InfoTab from '../components/University/InfoTab';
import CourseTab from '../components/University/CourseTab';
import { getIsUserLogged, getUser } from '../features/userSlice';
const { TabPane } = Tabs;


const UniversityPage = () => {

    const isLogged = useSelector(getIsUserLogged);
    const user = useSelector(getUser);
    const { universityId } = useParams();
    const [universities, setUniversity] = useState(null);
    const [activeKey, setActiveKey] = useState("1");
    const [loading, setLoading] = useState(true);
    const size = useSelector(getScreenSize);
    const refresh = useSelector(getRefresh);
    const [courses, setCourses] = useState([]);

    const teacherId = isLogged ? (user.isStudent ? null : user.id) : null;
    let isRector = false;

    universities?.teachers.forEach((teacher) => {
        if (teacher.id === teacherId) {
            isRector = teacher.isRector;
        }
    })

    useEffect(() => {
        setLoading(true);
        axios.get(`/universities/${universityId}`)
            .then((res) => {
                setUniversity(res.data)
                let temp = []
                res.data.teachers.forEach(element => {
                    element.courses.forEach(el => {
                        temp.push(el)
                    })
                });
                setCourses(temp)
            })
            .finally(() => setLoading(false))
    }, [universityId, refresh]);

    const RenderTabScreens = () => {
        switch (activeKey) {
            case "1":
                return <InfoTab university={universities} />
            case "2":
                return <TeachersTab teachers={universities?.teachers} isRector={isRector} universityId={universityId} />
            case "3":
                return <CourseTab courses={courses} />
            default:
                return <TeachersTab teachers={universities?.teachers} />
        }
    }

    return (
        <Grid container justifyContent='center'>
            {loading ? "Loading..." : (
                universities ? (
                    <Grid item container spacing={2}>
                        <Grid item container xs={0} sm={0} md={0} lg={2} />
                        <Grid item container xs={12} sm={12} md={3} lg={1.5}>
                            <Tabs activeKey={activeKey} onTabClick={setActiveKey} tabPosition={size > 850 ? 'left' : 'top'} style={{ width: '100%' }} centered>
                                <TabPane tab="Info" key="1" />
                                <TabPane tab="Teachers" key="2" />
                                <TabPane tab="Courses" key="3" />
                            </Tabs>
                        </Grid>
                        <Grid item xs={12} sm={12} md={9} lg={5}>
                            {RenderTabScreens()}
                        </Grid>
                        <Grid item container xs={0} sm={0} md={0} lg={2} />
                    </Grid>
                ) : (
                    <Grid container justifyContent="center">
                        Course Not Found
                    </Grid>
                )
            )}
        </Grid>
    )
}
//<TeachersTab teachers={universities?.teachers} />
export default UniversityPage

