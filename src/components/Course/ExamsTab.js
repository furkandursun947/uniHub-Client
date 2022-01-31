import React, { useState } from 'react'
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Button, Grid, Modal } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddExamModal from './AddExamModal';
import { useSelector, useDispatch } from 'react-redux';
import { getScreenSize, setRefresh } from '../../features/generalSlice';

const ExamsTab = ({ exams, courseId, isOwner }) => {
    
    const [open, setOpen] = useState(false);
    const size = useSelector(getScreenSize);
    const dispatch = useDispatch();
    
    return (
        <>
            <Grid item container>
                <Grid item container spacing={2}>
                    {exams?.map((exam, index) => (
                        <Grid key={index} item container xs={12} md={6} xl={4} justifyContent={ size > 850 ? "flex-start":"center" } style={{ marginTop: 20 }}>
                            <Card>
                                <Card.Content>
                                    <Card.Header>
                                        <Link to={`/exams/${exam.id}`} className="course-tab-list-header">
                                            {exam.examName}
                                        </Link>
                                    </Card.Header>
                                    <Card.Meta>
                                        Start Time: {exam.startDate}
                                    </Card.Meta>
                                    <Card.Meta>
                                        End Time: {exam.deadLine}
                                    </Card.Meta>
                                    <Card.Description>
                                        Weight: {exam.weight}%
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                {isOwner && (
                    <Grid item container justifyContent="center">
                        <Grid item container style={{ marginTop: 20, width: size < 850 ? '50%':'100%' }} justifyContent="flex-start">
                            <Button variant="contained" size={"medium"} startIcon={<AddIcon />} fullWidth={size < 850} onClick={() => setOpen(true)}>
                                Add Exam
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Grid>
            {isOwner && (
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <AddExamModal courseId={courseId} closeModal={async() =>{
                        await setTimeout(() => {dispatch(setRefresh());}, 1000);
                        setOpen(false);
                        dispatch(setRefresh());
                    }} />
                </Modal>
            )}
        </>
    )
}

export default ExamsTab
