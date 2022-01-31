import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import { Statistic, Form, Input, message, Upload, Button as AntdButton } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import axios from '../../utils/apiCall';
import { setRefresh } from '../../features/generalSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useHistory } from 'react-router-dom';

const HomeworkDetailTab = ({ info, isOwner }) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const [fileList, setFileList] = useState([]);

    const download = () => {
        axios(`/uploads/Homeworks/FromTeacher/${info.filePath}`, {
            method: 'GET',
            responseType: 'blob',
        }).then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', info.homeworkName + "." + info.filePath.split(".")[info.filePath.split(".").length - 1]);
            document.body.appendChild(link);
            link.click();
        })
    }

    const handleSubmit = (values) => {

        const formData = new FormData();
        fileList.forEach((file, index) => {
            if (index === 0) {
                formData.append('files', file);
            }
        });
        if (values.deadLine) {
            formData.append('deadLine', values.deadLine);
        }
        if (values.homeworkName) {
            formData.append('homeworkName', values.homeworkName);
        }
        if (values.weight) {
            formData.append('weight', values.weight);
        }

        axios(`courses/update-homework/${info?.id}`, {
            method: 'put',
            processData: false,
            data: formData
        }).then(async (res) => {
            await setTimeout(() => { dispatch(setRefresh()); }, 500);
            message.success(res.data);
            setFileList([]);
            dispatch(setRefresh());
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


    const deleteDocument = () => {
        axios.delete(`/courses1/${info?.id}/deleteHomework`)
            .then((res) => {
                message.success(res.data);
                setFileList([]);
                dispatch(setRefresh());
            })
    }


    return (
        isEdit ? (
            <Grid item container>
                <Grid item container xs={0.5} lg={0} />
                <Grid item container xs={11} lg={12} >
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={handleSubmit}
                        autoComplete="off"
                        style={{ width: '100%' }}
                    >
                        <Form.Item
                            label="Homework Name"
                            name="homeworkName"
                        >
                            <Input defaultValue={info?.homeworkName} />
                        </Form.Item>

                        <Form.Item
                            label="Deadline"
                            name="deadLine"
                        >
                            <Input defaultValue={info?.deadLine} />
                        </Form.Item>
                        <Form.Item
                            label="Homework Weight"
                            name="weight"
                        >
                            <Input defaultValue={info?.weight} />
                        </Form.Item>
                        <Form.Item
                            label="Homework File"
                            name="file"
                        >
                            <Upload {...props}>
                                <AntdButton icon={<UploadOutlined />}>Upload New File</AntdButton>
                            </Upload>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button color="error" onClick={() => setIsEdit(false)} style={{ marginRight: 20 }}>
                                Cancel
                            </Button>
                            <Button variant="contained" type="submit">
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                </Grid>
                <Grid item container xs={0.5} lg={0} />
            </Grid>
        ) : (
            <Grid item container>
                <Grid container item xs={1.5} md={0} />
                <Grid container item xs={9} md={12} style={{ paddingBottom: 0 }}>
                    {isOwner && (
                        <Grid item container xs={12} justifyContent="flex-end" style={{ marginTop: 10, marginBottom: 10 }} >
                            <IconButton onClick={() => setIsEdit(true)} color="primary">
                                <EditIcon />
                            </IconButton>
                        </Grid>
                    )}
                    <Grid item container xs={12} md={6}>
                        <Statistic title="Homework Name" value={info?.homeworkName} />
                    </Grid>
                    <Grid item container style={{ marginTop: 20 }} xs={12} md={6}>
                        <Statistic title="Course Name" formatter={() => <Link to={`/courses/${info?.Course?.id}`}>{info?.Course?.courseName}</Link>} />
                    </Grid>
                    <Grid item container style={{ marginTop: 20 }} xs={12} md={6}>
                        <Statistic title="Teacher Name" value={info?.Course?.Teacher?.fullName} />
                    </Grid>
                    <Grid item container style={{ marginTop: 20 }} xs={12} md={6}>
                        <Statistic title="Deadline" value={info?.deadLine} />
                    </Grid>
                    <Grid item container style={{ marginTop: 20 }} xs={12} md={6}>
                        <Statistic title="Homework Weight" value={`${info?.weight}%`} />
                    </Grid>
                    {info?.filePath ? (
                        <React.Fragment>
                            <Grid item container style={{ marginTop: 20 }} xs={12} md={12}>
                                <Button variant="contained" startIcon={<DownloadIcon />} onClick={() => download()}>
                                    Download Document
                                </Button>
                            </Grid>
                            {isOwner && (
                                <Grid item container style={{ marginTop: 20 }} xs={12} md={12}>
                                    <Button variant="text" startIcon={<DeleteIcon />} onClick={() => deleteDocument()} color="error">
                                        Delete Document
                                    </Button>
                                </Grid>
                            )}
                        </React.Fragment>
                    ) : (
                        <Grid item container style={{ marginTop: 20 }} xs={12} md={6}>
                            <Statistic title="Homework Status" value="No Homework Document" />
                        </Grid>
                    )}
                </Grid>
                <Grid container item xs={1.5} md={0} />
            </Grid>
        )
    )
}

export default HomeworkDetailTab
