import React, { useState } from 'react'
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { getScreenSize, setRefresh } from '../../features/generalSlice';
import { Modal, Button, message } from 'antd';
import CreateCourseModal from './CreateCourseModal';
import { getUser } from '../../features/userSlice';
import moment from 'moment';
import axios from '../../utils/apiCall';

const UserCourses = ({ user, type, isFinished }) => {

    const dispatch = useDispatch();
    const sessionUser = useSelector(getUser)
    const [isVisible, setIsVisible] = useState(false);
    const [newCourse, setNewCourse] = useState({
        courseName: "",
        day: 1,
        duration: "",
        startTime: moment('08:30', 'HH:mm'),
        capacity: 0,
        price: 0,
        zoomLink: ""
    });
    const size = useSelector(getScreenSize);
    var courses = [];
    type === 'Student' ? courses = user.Courses : courses = user.courses;

    const handleOk = () => {
        if (moment.isMoment(newCourse.startTime)) {
            newCourse.startTime = newCourse.startTime.format("HH:mm");
        }
        axios.post('/courses', {
            teacherId: user.id,
            course: newCourse
        }).then((res) => {
            message.success(res.data);
            setIsVisible(false);
            dispatch(setRefresh());
            setNewCourse({
                courseName: "",
                day: 1,
                duration: "",
                startTime: moment('08:30', 'HH:mm'),
                capacity: 0,
                price: 0,
                zoomLink: ""
            });
        }).catch(err => message.error(err.message))
    }

    return (
        <Grid>
            {sessionUser && !sessionUser.isStudent && isFinished === 0 && (
                <Button onClick={() => setIsVisible(true)}>
                    Create Course
                </Button>
            )}
            <Grid item container spacing={2}>
                {courses?.map((course, index) => (
                    course?.isFinished === isFinished ? (
                        <Grid key={index} item container xs={12} md={6} xl={4} justifyContent={size > 850 ? "flex-start" : "center"} style={{ marginTop: 20 }}>
                            <Card>
                                <Card.Content>
                                    <Card.Header>
                                        {course.courseName}
                                    </Card.Header>
                                    <Card.Meta>
                                        <p style={{ textAlign: 'center' }}>Crn: {course.crn}</p>
                                    </Card.Meta>
                                </Card.Content>
                                <Card.Content extra>
                                    {isFinished === 1 ? (
                                        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Finished{type==='Student'? (`, Grade: ${course?.StudentHasCourse?.grade}`):('')}</p>
                                    ) : (
                                        <Link to={`/courses/${course.id}`} className="course-tab-list-header">
                                            <p style={{ textAlign: 'center', fontWeight: 'bold' }}>See More</p>
                                        </Link>
                                    )}

                                </Card.Content>
                            </Card>
                        </Grid>
                    ) : ('')
                ))}
            </Grid>
            <Modal title="Basic Modal" visible={isVisible} onOk={handleOk} onCancel={() => setIsVisible(false)}>
                <CreateCourseModal course={newCourse} setCourse={setNewCourse} />
            </Modal>
        </Grid>
    )
}


export default UserCourses;