import React, { useState } from 'react';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, message } from 'antd';
import { getRefresh, getScreenSize, setRefresh } from '../../features/generalSlice';
import BuyCourseModal from '../../components/University/BuyCourseModal';
import axios from '../../utils/apiCall';
import { getUser } from '../../features/userSlice';

const CourseTab = ({ courses }) => {

    const dispatch = useDispatch();
    const refresh = useSelector(getRefresh);
    const size = useSelector(getScreenSize);
    const [visible, setIsVisible] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const user = useSelector(getUser);
    const isStudent = user ? user.isStudent : false;
    const studentId = isStudent ? user.id : null;

    const [name, setName] = useState('');
    const [creditCard, setCreditCard] = useState('');
    const [date, setDate] = useState('');
    const [cvc, setCvc] = useState('');

    const handleOk = () => {
        axios.post(`/courses/${selectedCourse.id}/${studentId}`)
            .then((res) => message.success(res.data))
            .then(() => setIsVisible(false))
            .then(() => dispatch(setRefresh(!refresh)))
            .catch((err) => message.error(err.message))
    }

    const checkHasCourse = (course) => {
        let result = false;
        course.Students.forEach((student) => {
            if (studentId === student.id) {
                result = true;
            }
        })
        return result;
    }

    return (
        <Grid>
            <Grid item container spacing={2}>
                {courses?.map((course, index) => !course.isFinished && (
                    <Grid key={index} item container xs={12} md={6} xl={4} justifyContent={size > 850 ? "flex-start" : "center"} style={{ marginTop: 5 }}>
                        <Card>
                            <Card.Content>
                                <Card.Header>
                                    <Link to={`/courses/${course.id}`} className="course-tab-list-header">
                                        {course.courseName}
                                    </Link>
                                </Card.Header>
                                <Card.Meta>
                                    Lecturer: {course.teacher}
                                </Card.Meta>
                                <Card.Description>
                                    CRN: {course.crn}
                                </Card.Description>
                                <Card.Description>
                                    Price: {course.price}
                                </Card.Description>
                            </Card.Content>
                            {isStudent && (
                                (checkHasCourse(course)) === true ? null : (
                                    <Card.Content extra>
                                        <Button type="primary" onClick={() => {
                                            setIsVisible(true)
                                            setSelectedCourse(course)
                                        }}>
                                            Buy
                                        </Button>
                                    </Card.Content>
                                )
                            )}
                        </Card>
                    </Grid>
                ))}
                <Modal title="Buy Course" visible={visible} onOk={handleOk} onCancel={() => setIsVisible(false)}>
                    <BuyCourseModal
                        course={selectedCourse}
                        name={name}
                        setName={setName}
                        creditCard={creditCard}
                        setCreditCard={setCreditCard}
                        date={date}
                        setDate={setDate}
                        cvc={cvc}
                        setCvc={setCvc}
                    />
                </Modal>
            </Grid>
        </Grid>
    )
}

export default CourseTab;   