import { Calendar } from 'antd';
import React, { useEffect, useState } from 'react'
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { getScreenSize } from '../../features/generalSlice';
import { Descriptions, Badge } from 'antd';
import Item from 'antd/lib/list/Item';
import { CaretRightOutlined } from '@ant-design/icons';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Table, Tag, Space } from 'antd';
import data from '../../utils/datas';
import columns from '../../utils/columns';

const CalendarUser = ({ courses }) => {
    const [tableDatas, setTableDatas] = useState([{}]);

    const colors = ["purple", "blue", "green", "yellow", "orange", "brown", "coral", "aqua", "darkgoldenrod", "darkolivegreen", "gray", "greenyellow", "hotpink", "indigo", "khaki", "darkcyan", "goldenrod", "maroon"];

    const feedCell = (course, startCell) => {
        return (
            <div>
                <p style={{ color: `${colors[startCell]}` }}>{course.courseName}</p>
            </div>
        )
    };


    useEffect(() => {
        courses?.forEach((course, index) => {
            if (course.isFinished === 0) {
                var startTime = course.startTime;
                var day = course.day;
                var duration = course.duration / 30;
                var endTime = startTime;
                var startCell;
                data.forEach((item, index) => {
                    var zaman = item.zaman.substr(0, 5);
                    if (zaman === startTime) {
                        startCell = index;
                    }
                })
                switch (day) {
                    case 0:
                        while (duration != 0) {
                            data[startCell + duration - 1].pazartesi = feedCell(course, startCell);;
                            duration--;
                        }
                    case 1:
                        while (duration != 0) {
                            data[startCell + duration - 1].salı = feedCell(course, startCell);;
                            duration--;
                        }
                    case 2:
                        while (duration != 0) {
                            data[startCell + duration - 1].çarşamba = feedCell(course, startCell);
                            duration--;
                        }
                    case 3:
                        while (duration != 0) {
                            data[startCell + duration - 1].persembe = feedCell(course, startCell);;
                            duration--;
                        }
                    case 4:
                        while (duration != 0) {
                            data[startCell + duration - 1].cuma = feedCell(course, startCell);;
                            duration--;
                        }
                }
            }
        })
        setTableDatas(data);
    }, []);

    return (
        <Grid>
            <Grid item container spacing={2}>
                <Table columns={columns} dataSource={tableDatas} pagination={false} />
            </Grid>
        </Grid>
    )

}


export default CalendarUser;