import React, { useState } from 'react';
import axios from '../../utils/apiCall';
import { Upload, message, Button, Input, Form, DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../features/userSlice';
import { getScreenSize, setRefresh } from '../../features/generalSlice';
const EditProfileModal = ({ user, closeModal, changed }) => {

    
    const size = useSelector(getScreenSize);
    const dispatch = useDispatch();
    const [saving, setSaving] = useState(false);
    const [formValid, setFormValid] = useState(false);
    var userType = useSelector(getUser);
    userType = userType.isStudent;

    const handleSubmit = (values) => {
        setSaving(true);
        if(values.password != values.password2){
            message.error("Şifreler eşleşmedi.")
            setSaving(false);
        }
        else{
            setSaving(true);
            const updatedUser = {
                fullName: values.fullname,
                email: values.email,
                password: values.password
            }
            if(userType){
                axios.put(`/students/${user.id}`, {fullName:updatedUser.fullName, email: updatedUser.email, password: updatedUser.password}).
                then((res) => {
                    setSaving(false);
                    message.success("Güncellendi.");
                    changed();
                    closeModal();
                })
                .catch((err) => {
                    setSaving(false);
                    message.error("Şifre yanlış.");
                });
            }
        }

    }

    const checkFormValid = (values) => {
        console.log(values);
    }

    return (
        <div className="edit-profile-modal-container" style={{ padding: size > 500 ? '40px':'20px'}}>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                onFinish={handleSubmit}
            >
                <Form.Item label="Fullname" name="fullname" initialValue={user.fullName}>
                    <Input value={user.fullName}/>
                </Form.Item>
                <Form.Item label="Email" name="email" initialValue={user.email}>
                    <Input />
                </Form.Item>
                <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item label="Confirm Password" name="password2" rules={[{ required: true, message: 'Please input your password!' }]} onChange={checkFormValid}>
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={saving}
                        style={{ marginLeft: '28.4%'}}
                    >
                        {saving ? 'Saving' : 'Save'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditProfileModal;
