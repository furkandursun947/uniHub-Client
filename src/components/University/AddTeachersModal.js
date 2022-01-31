import React from 'react'
import { Select } from 'antd';
const { Option } = Select;

const AddTeachersModal = ({ teachers, setTeacherIds }) => {
    return (
        <div>
            <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select"
                onChange={(values) => setTeacherIds(values)}
            >
                {teachers.map((el, index) => (
                    <Option key={index} value={el.id}>
                        {el.fullName}
                    </Option>
                ))}
            </Select>
        </div>
    )
}

export default AddTeachersModal
