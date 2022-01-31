import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';

const UniversitiesTab = ({ university }) => {

    return (
        <Grid item container spacing={2} justifyContent="center">
            {university?.map((one_university, index) => (
                <Grid key={index} item container xs={12} s={6} md={4} lg={3} justifyContent={"center"} style={{ marginTop: 5 }}>
                    <Card>
                        <Card.Content style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Image
                                src={one_university.imageUrl}
                                size='small'
                                style={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: 15 }}
                            />
                            <Card.Header>
                                <Link to={`/universities/${one_university.id}`} className="course-tab-list-header">
                                    {one_university.name}
                                </Link>
                            </Card.Header>
                            <Card.Meta>
                                Phone: {one_university.phone}
                            </Card.Meta>
                            <Card.Meta>
                                FoundationYear: {one_university.foundationYear}
                            </Card.Meta>
                            <Card.Description>
                                Address: {one_university.address}
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}

export default UniversitiesTab;