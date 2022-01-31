import { Grid } from '@mui/material';
import { Select, Input, TimePicker, InputNumber } from 'antd'
import moment from 'moment';
import React from 'react'
import days from '../../utils/days';

const Option = Select.Option;

const CreateCourseModal = ({ course, setCourse }) => {
    return (
        <div>
            <Grid item container>
                <Grid item container >
                    <Grid item container>
                        Course Name
                    </Grid>
                    <Grid item container style={{ marginTop: 10, marginBottom: 20 }}>
                        <Input value={course?.courseName} onChange={(e) => setCourse({ ...course, courseName: e.target.value })} />
                    </Grid>
                </Grid>
                <Grid item container >
                    <Grid item container>
                        Course Day
                    </Grid>
                    <Grid item container style={{ marginTop: 10, marginBottom: 20 }}>
                        <Select placeholder="Please select a day" style={{ width: '100%' }} value={course?.day} onChange={(e) => setCourse({ ...course, day: e })}>
                            {days.map((day, index) => <Option key={index} value={index + 1}>{day}</Option>)}
                        </Select>
                    </Grid>
                </Grid>
                <Grid item container >
                    <Grid item container>
                        Start Time
                    </Grid>
                    <Grid item container style={{ marginTop: 10, marginBottom: 20 }}>
                        <TimePicker format="HH:mm" minuteStep={30} defaultValue={moment('08:30', 'HH:mm')}
                            onChange={(e) => setCourse({ ...course, startTime: e.format('HH:mm') })} />
                    </Grid>
                </Grid>
                <Grid item container >
                    <Grid item container>
                        Duration
                    </Grid>
                    <Grid item container style={{ marginTop: 10, marginBottom: 20 }}>
                        <InputNumber value={course?.duration} onChange={(e) => setCourse({ ...course, duration: e })} />
                    </Grid>
                </Grid>
                <Grid item container >
                    <Grid item container>
                        Capacity
                    </Grid>
                    <Grid item container style={{ marginTop: 10, marginBottom: 20 }}>
                        <InputNumber value={course?.capacity} onChange={(e) => setCourse({ ...course, capacity: e })} />
                    </Grid>
                </Grid>
                <Grid item container >
                    <Grid item container>
                        Price
                    </Grid>
                    <Grid item container style={{ marginTop: 10, marginBottom: 20 }}>
                        <InputNumber value={course?.price} onChange={(e) => setCourse({ ...course, price: e })} />
                    </Grid>
                </Grid>
                <Grid item container >
                    <Grid item container>
                        Zoom Link
                    </Grid>
                    <Grid item container style={{ marginTop: 10, marginBottom: 20 }}>
                        <Input value={course?.zoomLink} onChange={(e) => setCourse({ ...course, zoomLink: e.target.value })} />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default CreateCourseModal

