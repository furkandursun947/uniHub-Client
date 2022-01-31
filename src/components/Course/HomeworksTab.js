import React, { useState } from 'react';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getScreenSize } from '../../features/generalSlice';
import { Button, Grid, Modal } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddHomeworkModal from './AddHomeworkModal';

const HomeworksTab = ({ homeworks, courseId, isOwner }) => {
    
    const [open, setOpen] = useState(false);
    const size = useSelector(getScreenSize);

    return (
        <>
            <Grid item container>
                <Grid item container spacing={2}>
                    {homeworks?.map((homework, index) => (
                        <Grid key={index} item container xs={12} md={6} xl={4} justifyContent={ size > 850 ? "flex-start":"center" } style={{ marginTop: 20 }}>
                            <Card>
                                <Card.Content>
                                    <Card.Header>
                                        <Link to={`/homeworks/${homework.id}`} className="course-tab-list-header">
                                            {homework.homeworkName}
                                        </Link>
                                    </Card.Header>
                                    <Card.Meta>
                                        Deadline: {homework.deadLine}
                                    </Card.Meta>
                                    <Card.Description>
                                        Weight: {homework.weight}%
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
                                Add Homework
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
                    <AddHomeworkModal courseId={courseId} closeModal={() => setOpen(false)} />
                </Modal>
            )}
        </>
    )
}

export default HomeworksTab
