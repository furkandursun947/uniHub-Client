import React, { useState } from 'react';
import { Card, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import axios from '../../utils/apiCall';
import { useSelector, useDispatch } from 'react-redux';
import { getScreenSize, setRefresh } from '../../features/generalSlice';

const StudentUploadsTab = ({ students, homeworkId }) => {

    const size = useSelector(getScreenSize);
    const [studentsState, setStudentsState] = useState([ ...students ]);
    const [refresh, setRefresh2] = useState(true);
    const [updatedRecords, setUpdatedRecords] = useState([]);
    const dispatch = useDispatch();


    const updateStudentGrade = (grade, index) => {
        const student = studentsState[index];
        student.Homework.map((hw) => {
                if(hw.id.toString() === homeworkId){
                    hw.StudentHasHomework.note = parseFloat(grade);
                }
                return hw;
        })
        studentsState[index] = student;
        setStudentsState(studentsState);
        setRefresh2(!refresh);

        let isRecordIn = false;
        updatedRecords.forEach((el) => {
            if(el.id === student.id){
                isRecordIn = true;
                el.grade = parseFloat(grade);
            }
        }) 
        if(!isRecordIn){
            updatedRecords.push({ id: student.id, grade: parseFloat(grade) })
        }
        setUpdatedRecords(updatedRecords);
    }

    const checkIfStudentHasHomework = (homeworks) => {
        let result = false;
        homeworks.forEach(hw => {
            if(hw.id.toString() === homeworkId)
                result = true
        });
        return result;
    }

    const getStudentGrade = (homeworks) => {
        let grade = null;
        homeworks.forEach(hw => {
            if(hw.id.toString() === homeworkId){
                grade = hw.StudentHasHomework.note;
            }
        });
        return grade;
    }

    const handleSaveGrades = () => {
        axios.post(`courses/update-homework-grades/${homeworkId}`, updatedRecords)
        .then((res) => dispatch(setRefresh()));
    }

    const downloadStudentHomework = (homeworks) => {
        let path = null;
        homeworks.forEach(hw => {
            if(hw.id.toString() === homeworkId){
                path = hw.StudentHasHomework.filePath;
            }
        });
        axios(`/uploads/Homeworks/FromStudent/${path}`, {
            method: 'GET',
            responseType: 'blob',
        }).then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', "Homework#" + homeworkId + "." +path.split(".")[path.split(".").length - 1]);
            document.body.appendChild(link);
            link.click();
        })
    }

    return (
        <Grid item container className='student-uploads-tab-container'>
            <Grid item container xs={0.5} />
            <Grid item container xs={11} spacing={2} justifyContent="flex-start">
                {studentsState?.map((student, index) => (
                    <Grid key={index} item container xs={6} lg={4} xl={3} justifyContent={ size > 850 ? "flex-start":"center" } style={{ marginTop: 20 }}>
                        <Card>
                            <Card.Content>
                                <Card.Header>
                                    <Link to={`/students/${student.id}`} className="course-tab-list-header">
                                        {student.fullName}
                                    </Link>
                                </Card.Header>
                                
                                <Card.Content style={{ display: 'flex', justifyContent: 'center' }}>
                                    {checkIfStudentHasHomework(student.Homework) ? (
                                        <Button variant={"text"} onClick={() => downloadStudentHomework(student.Homework)}>
                                            Download
                                        </Button>
                                    ):(
                                        <Button variant={"text"} disabled>
                                            Not Uploaded
                                        </Button>
                                    )}
                                </Card.Content>
                                <Card.Content style={{ display: 'flex', justifyContent: 'center' }} className='grade-homework-input-container'>
                                    {checkIfStudentHasHomework(student.Homework) ? (
                                        <Input size="mini" label='Grade' placeholder='Enter' type="number"
                                            value={getStudentGrade(student.Homework)} onChange={(e) => updateStudentGrade(e.target.value, index)}
                                        />
                                    ):(
                                        <Input size="mini" label='Grade' placeholder='Enter' disabled />
                                    )}
                                    
                                </Card.Content>
                            </Card.Content>
                        </Card>
                    </Grid>
                ))}
                <Grid item container justifyContent="center">
                    <Grid item container style={{ marginTop: 20, width: size < 850 ? '50%':'100%' }} justifyContent="flex-start">
                        <Button variant="contained" size={"medium"} fullWidth={size < 850} onClick={handleSaveGrades} disabled={!updatedRecords.length}>
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container xs={0.5} />
        </Grid>
    )
}

export default StudentUploadsTab
