import React from 'react';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { getScreenSize } from '../../features/generalSlice';

const StudentsTab = ({ students }) => {
    
    const size = useSelector(getScreenSize);

    return (
        <Grid>
            <Grid item container spacing={2}>
                {students?.map((student, index) => (
                    <Grid key={index} item container xs={12} md={6} xl={4} justifyContent={ size > 850 ? "flex-start":"center" } style={{ marginTop: 20 }}>
                        <Card>
                            <Card.Content>
                                <Card.Header>
                                    <Link to={`/students/${student.id}`} className="course-tab-list-header">
                                        {student.fullName}
                                    </Link>
                                </Card.Header>
                                <Card.Meta>
                                    Student Number: {student.studentNumber}
                                </Card.Meta>
                                <Card.Description>
                                    Email: {student.email}
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
}

export default StudentsTab