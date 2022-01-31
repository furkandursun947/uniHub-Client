/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { getRefresh, getScreenSize, setRefresh } from '../../features/generalSlice';
import { Button, message, Modal } from 'antd';
import AddTeachersModal from './AddTeachersModal';
import axios from '../../utils/apiCall'
import DeleteTeacherModal from './DeleteTeacherModal';

const TeachersTab = ({ teachers, isRector, universityId }) => {

    const dispatch = useDispatch();
    const refresh = useSelector(getRefresh);
    const [unassignedTeachers, setUnassignedTeachers] = useState([]);
    const [isVisible, setIsvisible] = useState(false);
    const [isVisibleRemoveTeacher, setIsVisibleRemoveTeacher] = useState(false);
    const [teacherIds, setTeacherIds] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const size = useSelector(getScreenSize);

    useEffect(() => {
        if (isRector) {
            axios.get('get-unassigned-teachers')
                .then((res) => setUnassignedTeachers(res.data))
        }
    }, [isRector, universityId, refresh])

    const addTeachers = () => {
        axios.post('assign-teachers', {
            universityId,
            teacherIds
        }).then(() => {
            message.success('Teachers are added successfully!');
            dispatch(setRefresh());
            setIsvisible(false);
        })
    }

    const unAssignTeacher = () => {
        console.log(selectedTeacher.id)
        axios.post('unassign-teachers', { teacherId: selectedTeacher.id }).then(() => {
            setTimeout(() => {
                message.success('Teacher is removed successfully!');
                setIsVisibleRemoveTeacher(false);
                setSelectedTeacher(null);
            }, 500)
        }).then(() => {
            dispatch(setRefresh());
        })
    }

    return (
        <Grid>
            <Grid item container spacing={2}>
                {isRector && (
                    <Grid item container>
                        <Button onClick={() => setIsvisible(true)}>
                            Add Teachers
                        </Button>
                    </Grid>
                )}
                {teachers?.map((teacher, index) => {
                    if (teacher.isAssigned) {
                        return (
                            <Grid key={index} item container xs={12} md={6} xl={4} justifyContent={size > 850 ? "flex-start" : "center"} style={{ marginTop: 5 }}>
                                <Card>
                                    <Card.Content>
                                        <Card.Header>
                                            <Link to={`/teachers/${teacher.id}`} className="course-tab-list-header">
                                                {teacher.fullName}
                                            </Link>
                                        </Card.Header>
                                        <Card.Meta>
                                            Phone: {teacher.phone}
                                        </Card.Meta>
                                        <Card.Description>
                                            Email: {teacher.email}
                                        </Card.Description>
                                        <Grid container justifyContent="center" style={{ marginTop: 10 }}>
                                            {isRector && (
                                                <Button onClick={() => {
                                                    setIsVisibleRemoveTeacher(true);
                                                    setSelectedTeacher(teacher)
                                                }}>
                                                    Remove from University
                                                </Button>
                                            )}
                                        </Grid>
                                    </Card.Content>
                                </Card>
                            </Grid>
                        )
                    }
                })}
            </Grid>

            <Modal title="Add Teacher" visible={isVisible} onOk={addTeachers} onCancel={() => setIsvisible(false)}>
                <AddTeachersModal
                    setTeacherIds={setTeacherIds}
                    teachers={unassignedTeachers}
                />
            </Modal>
            <Modal
                title="Remove Teacher"
                visible={isVisibleRemoveTeacher}
                onOk={unAssignTeacher}
                onCancel={() => setIsVisibleRemoveTeacher(false)}
            >
                <DeleteTeacherModal
                    teacher={selectedTeacher}
                />
            </Modal>
        </Grid>
    )
}

export default TeachersTab;