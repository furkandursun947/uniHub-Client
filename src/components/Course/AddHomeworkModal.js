import React, { useState } from 'react';
import axios from '../../utils/apiCall';
import { Upload, message, Button, Input, Form, DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { getScreenSize, setRefresh } from '../../features/generalSlice';

const AddHomeworkModal = ({ courseId, closeModal }) => {

    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const size = useSelector(getScreenSize);
    const dispatch = useDispatch();

    const handleUpload = (deadLine, homeworkName, weight) => {

        const formData = new FormData();
        fileList.forEach(file => {
          formData.append('files', file);
        });
        formData.append('deadLine', deadLine);
        formData.append('homeworkName', homeworkName);
        formData.append('weight', weight);

        setUploading(true);
        
        axios(`courses1/${courseId}/addHomework`,{
            method: 'post',
            processData: false,
            data: formData
        }).then((res) => {
            message.success(res.data);
            setFileList([]);
        }).catch((err) => {
            console.log(err)
        }).finally(async ()=> {
            await setTimeout(() => {dispatch(setRefresh());}, 1000);
            setUploading(false);
            dispatch(setRefresh());
            closeModal();
        })
    }

    const props = {
        onRemove: (file) => {
            const files = fileList.filter((el) => el !== file);
            setFileList(files);
        },
        beforeUpload: (file) => {
          setFileList([...fileList, file])
          return false;
        },
        fileList,
    };

    const handleSubmit = (values) => {
        const { homeworkName, weight } = values;
        const deadLine = values.deadLine.format("DD.MM.YYYY");
        handleUpload(deadLine, homeworkName, weight);
    }

    return (
        <div className="add-homework-modal-container" style={{ padding: size > 500 ? '40px':'20px'}}>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                onFinish={handleSubmit}
            >
                <Form.Item label="Homework Name" name="homeworkName" required>
                    <Input />
                </Form.Item>
                <Form.Item label="Deadline" name="deadLine" required>
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Select File" name="file" required>  
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Upload File</Button>
                    </Upload>
                </Form.Item>
                <Form.Item label="Homework Weight Percent" name="weight" required>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={uploading}
                        style={{ marginLeft: '28.4%'}}
                    >
                        {uploading ? 'Uploading' : 'Start Upload'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddHomeworkModal
