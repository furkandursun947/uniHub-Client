import React, { useState } from 'react'
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { getScreenSize } from '../../features/generalSlice';
import { Descriptions, Badge } from 'antd';
import Item from 'antd/lib/list/Item';
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
const { Panel } = Collapse;


const Grades = ({user}) => {

    const size = useSelector(getScreenSize);
    const courses = user?.Courses;
    const exams = user?.Exams;
    const homeworks = user?.Homework;

    
    const collapseCourses = (course) => {
        return (<Panel header={`${course?.courseName}, Grade: ${course?.isFinished === 1 ? (course?.StudentHasCourse?.grade) : ('Not finished')}` } key={course?.id} className="site-collapse-custom-panel">
            <Collapse>
                <Panel header="Exams" key="0" className="site-collapse-custom-panel">
                    {
                        exams?.map((exam, index) => {
                            return course?.id === exam?.CourseId &&  (
                                <p>{exam?.examName}: {exam?.StudentHasExam?.note}</p>
                            )
                        })
                    }
                </Panel>
                <Panel header="Homeworks" key="1" className="site-collapse-custom-panel">
                    {
                        homeworks?.map((homework, index) => {
                            return course?.id == homework?.CourseId && (
                                <p>{homework?.homeworkName}: {homework?.StudentHasHomework?.note}</p>
                            )
                        })
                    }
                </Panel>
            </Collapse>
        </Panel>)
    }
    return (
        <Grid>
            <Grid item container spacing={2}>
                
                <Collapse key="0" style={{width:'75%'}} bordered={false} className="site-collapse-custom-collapse" expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}>
                <h3 className='gradesHeaders'>Active Courses</h3>
                {courses?.map((course, index) =>(
                    course?.isFinished === 0 ? (
                        collapseCourses(course)
                    ):('')))}
                </Collapse>
                <Collapse key="1" style={{width:'75%'}} bordered={false} className="site-collapse-custom-collapse" expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}>
                <h3 className='gradesHeaders'>Closed Courses</h3>
                {courses?.map((course, index) =>(
                    course?.isFinished === 1 ? (
                        collapseCourses(course)
                    ):('')))}
                </Collapse>
            </Grid>
        </Grid>
    )
}


export default Grades;