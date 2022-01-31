import axios from '../../utils/apiCall';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Button, Grid, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { Statistic, Upload, message, Form } from 'antd';
import { setRefresh } from '../../features/generalSlice';
import { useDispatch } from 'react-redux';
import UploadOutlined from '@mui/icons-material/UploadOutlined';
import EditIcon from '@mui/icons-material/Edit';

const StudentHomeworkCard = ({ homeworkId, studentId, studentNumber, info }) => {

    const [homework, setHomework] = useState({});
    const [fileList, setFileList] = useState([]);
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);


    useEffect(() => {
        axios.post('get-course-by-student-id', {
            homeworkId,
            studentId
        }).then((response) => setHomework(response.data));
    }, [homeworkId, studentId])


    const download = () => {
        axios(`/uploads/Homeworks/FromStudent/${homework.filePath}`, {
            method: 'GET',
            responseType: 'blob',
        }).then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', studentNumber + "_" + info.homeworkName + "." + info.filePath.split(".")[info.filePath.split(".").length - 1]);
            document.body.appendChild(link);
            link.click();
        })
    }

    const props = {
        onRemove: (file) => {
            const files = fileList.filter((el) => el !== file);
            setFileList(files);
        },
        beforeUpload: (file) => {
            setFileList([file])
            return false;
        },
        fileList,
    };

    const handleSubmit = () => {
        const formData = new FormData();
        fileList.forEach((file, index) => {
            if (index === 0) {
                formData.append('files', file);
            }
        });
        formData.append('homeworkId', homeworkId);
        formData.append('studentId', studentId);

        const url = isEdit ? "courses/update-students-homework" : "courses/add-students-homework";
        const method = isEdit ? "put" : "post";

        axios(url, {
            method,
            processData: false,
            data: formData
        }).then(async (res) => {
            await setTimeout(() => { dispatch(setRefresh()); }, 500);
            message.success(res.data);
            setFileList([]);
            dispatch(setRefresh());
        })
    }

    let grade = "Not Graded Yet";
    info?.Course.Students.forEach((student) => {
        if (student.id === studentId) {
            student.Homework.forEach((homework) => {
                if (homework.id === Number(homeworkId)) {
                    if (homework.StudentHasHomework?.note) {
                        grade = homework.StudentHasHomework.note
                    }
                }
            })
        }
    })

    const x = moment(info?.deadLine, "DD.MM.YYYY").unix();
    const y = moment().unix();
    const isPastDeadline = x < y;

    return (
        <Grid item container>
            <Grid container item xs={1.5} md={0} />
            <Grid container item xs={9} md={12} style={{ paddingBottom: 0 }}>
                <Grid item container style={{ marginTop: 20 }} xs={12} md={6}>
                    <Statistic title="Deadline" value={info?.deadLine} />
                </Grid>
                <Grid item container style={{ marginTop: 20 }} xs={12} md={6}>
                    <Statistic title="Homework Grade" value={`${grade}`} />
                </Grid>
                <Grid item container style={{ marginTop: 20 }} xs={12} md={6}>
                    <Statistic title="Homework Weight" value={`${info?.weight}%`} />
                </Grid>
                {homework ? (
                    <React.Fragment>
                        <Grid item container style={{ marginTop: 20 }} xs={12} md={6}>
                            <Statistic title="Uploaded Date" value={moment(homework.updatedAt).format('HH:mm DD/MM/YYYY')} />
                        </Grid>
                        <Grid item container style={{ marginTop: 20 }} xs={12} md={12}>
                            {!isEdit ? (
                                <React.Fragment>
                                    <Button variant="contained" startIcon={<DownloadIcon />} onClick={() => download()}>
                                        Your Homework
                                    </Button>
                                    <IconButton style={{ marginLeft: '10px' }} onClick={() => setIsEdit(true)}>
                                        <EditIcon />
                                    </IconButton>
                                </React.Fragment>
                            ) : (
                                <Grid item container style={{ marginTop: 20 }} xs={12} md={6}>
                                    <Form style={{ width: '100%' }}>
                                        <Form.Item>
                                            <Upload {...props}>
                                                <Button variant="contained" startIcon={<UploadOutlined />}>Upload New File</Button>
                                            </Upload>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button variant="text" color="error" onClick={() => setIsEdit(false)} style={{ marginRight: 20 }}>
                                                Cancel
                                            </Button>
                                            <Button variant="contained" color="success" onClick={() => handleSubmit()}>
                                                Submit
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Grid>
                            )}
                        </Grid>
                    </React.Fragment>
                ) : (
                    <Grid item container style={{ marginTop: 20 }} xs={12} md={12}>
                        <Form>
                            <Grid item container xs={12} md={12} style={{ marginBottom: 20, marginTop: 20, fontSize: 14, fontWeight: 600 }}>
                                <p>You haven't uploaded homework.</p>
                            </Grid>
                            {!isPastDeadline ? (
                                <>
                                    <Form.Item>
                                        <Upload {...props}>
                                            <Button variant="contained" startIcon={<UploadOutlined />}>Upload New File</Button>
                                        </Upload>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button variant="contained" color="success" onClick={() => handleSubmit()}>
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </>
                            ) : (
                                <p>
                                    Deadline is past.
                                </p>
                            )}
                        </Form>
                    </Grid>
                )}
            </Grid>
            <Grid container item xs={1.5} md={0} />
        </Grid>
    )
}

export default StudentHomeworkCard
