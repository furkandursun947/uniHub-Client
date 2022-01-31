import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import axios from '../utils/apiCall';
import Grid from '@mui/material/Grid';
import { Tabs } from 'antd';
import { useSelector } from 'react-redux';
import { getRefresh, getScreenSize } from '../features/generalSlice';
import { getUser } from '../features/userSlice';
import CourseDetailTab from '../components/Course/CourseDetailTab';
import ExamsTab from '../components/Course/ExamsTab';
import HomeworksTab from '../components/Course/HomeworksTab';
import StudentsTab from '../components/Course/StudentsTab';

const { TabPane } = Tabs;


const CoursePage = () => {

    const user = useSelector(getUser);
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [activeKey, setActiveKey] = useState("1");
    const [teacherInfo, setTeacherInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const size = useSelector(getScreenSize);
    const refresh = useSelector(getRefresh);

    const isStudent = user ? user.isStudent : false;
    const studentId = isStudent ? user.id : null;
    const teacherId = !isStudent ? user?.id : null;
    const isOwner = course?.TeacherId ? (course.TeacherId === teacherId) : false;
    let isEnrolledStudent = false;

    if (isStudent && course && course.Students) {
        course.Students.forEach((student) => {
            if (student.id === studentId) {
                isEnrolledStudent = true;
            }
        })
    }


    console.log(course)

    useEffect(() => {
        setLoading(true);
        axios.get(`/courses/${courseId}`)
            .then((res) => {
                setCourse(res.data)
                axios.get(`/teachers/${res.data.TeacherId}`)
                    .then(res => setTeacherInfo(res.data));
            })
            .finally(() => setLoading(false))
    }, [courseId, refresh]);

    const RenderTabScreens = () => {
        switch (activeKey) {
            case "1":
                return <CourseDetailTab info={course} teacherInfo={teacherInfo} isOwner={isOwner} isEnrolledStudent={((!isStudent && isOwner) || isEnrolledStudent)} />;
            case "2":
                return <StudentsTab students={course?.Students} />;
            case "3":
                return <HomeworksTab homeworks={course?.homeworks} courseId={courseId} isOwner={isOwner} />;
            case "4":
                return <ExamsTab exams={course?.exams} courseId={courseId} isOwner={isOwner} />;
            default:
                return <CourseDetailTab info={course} teacherInfo={teacherInfo} isOwner={isOwner} />;
        }
    }

    return (
        <Grid container justifyContent='center'>
            {loading ? "Loading..." : (
                course ? (
                    <Grid item container spacing={2}>
                        <Grid item container xs={0} sm={0} md={0} lg={2} />
                        <Grid item container xs={12} sm={12} md={3} lg={1.5}>
                            <Tabs activeKey={activeKey} onTabClick={setActiveKey} tabPosition={size > 850 ? 'left' : 'top'} style={{ width: '100%' }} centered>
                                <TabPane tab="Info" key="1" />
                                {((!isStudent && isOwner) || isEnrolledStudent) && (
                                    <>
                                        <TabPane tab="Students" key="2" />
                                        <TabPane tab="Homeworks" key="3" />
                                        <TabPane tab="Exams" key="4" />
                                    </>
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
                        Course Not Found
                    </Grid>
                )
            )}
        </Grid>
    )
}

export default CoursePage

