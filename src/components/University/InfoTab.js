import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { getScreenSize } from '../../features/generalSlice';
import { Statistic } from 'antd';

const InfoTab = ({ university }) => {

    const size = useSelector(getScreenSize);

    const teacherNumber = university?.teachers?.length;
    const coursesNumber = university?.teachers?.reduce((sum, b) => sum + b.courses.length, 0);
    const studentNumber = university?.teachers?.reduce((sum, b) => sum + b.courses.reduce((sum2, a) => sum2 + a.Students.length, 0), 0)

    return (
        <Card style={{ width: size < 1200 ? '80%' : '100%', padding: 20, marginLeft: 'auto', marginRight: 'auto' }}>
            <Grid item container>
                <Grid item container xs={12} lg={4} justifyContent="center" alignItems="center" style={{ marginBottom: size < 800 ? 20 : 0 }}>
                    <Image src={university.imageUrl} size='small' />
                </Grid>
                <Grid item container xs={12} lg={8} justifyContent="center" alignItems="center">
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Grid item lg={12} textAlign="center" style={{ fontSize: 25, fontWeight: 500, height: 'min-content', paddingBottom: 10 }}>
                            {university.name}
                        </Grid>
                        <Grid item lg={12} textAlign="center" style={{ fontSize: 15, fontWeight: 400, height: 'min-content' }}>
                            {university.address}
                        </Grid>
                        <Grid item lg={12} textAlign="center" style={{ fontSize: 15, fontWeight: 400, height: 'min-content' }}>
                            {university.foundationYear}
                        </Grid>
                        <Grid item lg={12} textAlign="center" style={{ fontSize: 15, fontWeight: 400, height: 'min-content' }}>
                            {university.phone}
                        </Grid>
                    </div>
                </Grid>
                <Grid item container justifyContent="space-around" style={{ marginTop: 20 }}>
                    <Grid
                        style={{ fontSize: 15, marginTop: 15, fontWeight: 500, textAlign: 'center' }}
                    >
                        <Statistic title="Teacher Number" value={teacherNumber} />
                    </Grid>
                    <Grid
                        style={{ fontSize: 15, marginTop: 15, fontWeight: 500, textAlign: 'center' }}
                    >
                        <Statistic title="Course Number" value={coursesNumber} />
                    </Grid>
                    <Grid
                        style={{ fontSize: 15, marginTop: 15, fontWeight: 500, textAlign: 'center' }}
                    >
                        <Statistic title="Student Number" value={studentNumber} />
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    )
}

export default InfoTab;