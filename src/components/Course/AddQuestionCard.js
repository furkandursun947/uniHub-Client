import React from 'react'
import { Upload, Button, Input, Row } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const AddQuestionCard = ({ index, question, onHandleUpload, handleChoicesChange, handleQuestionChange, handleAnswerChange }) => {

    return (
        <div className="add-question-card-each-container">
            <Row>
                <Input.TextArea
                    rows={4}
                    placeholder="Question" 
                    value={question.name}
                    onChange={(e) => handleQuestionChange(e.target.value, index)}
                />
            </Row>
            <Row>  
                <Upload
                    listType="picture"
                    onChange={(value) => onHandleUpload(value, index)} 
                    beforeUpload={() => false}
                >
                    <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
            </Row>
            <Row>
                <Input 
                    placeholder="Choice 1" 
                    value={question.choice1}
                    onChange={(e) => handleChoicesChange(e.target.value, 1, index)}
                />
            </Row>
            <Row>
                <Input 
                    placeholder="Choice 2" 
                    value={question.choice2}
                    onChange={(e) => handleChoicesChange(e.target.value, 2, index)}
                />
            </Row>
            <Row>
                <Input 
                    placeholder="Choice 3" 
                    value={question.choice3}
                    onChange={(e) => handleChoicesChange(e.target.value, 3, index)}
                />
            </Row>
            <Row>
                <Input 
                    placeholder="Choice 4" 
                    value={question.choice4}
                    onChange={(e) => handleChoicesChange(e.target.value, 4, index)}
                />
            </Row>
            <Row>
                <Input 
                    placeholder="Answer (Correct Choice's Number e.g. 3)"
                    value={question.answer}
                    onChange={(e) => handleAnswerChange(e.target.value, index)}    
                />
            </Row>
        </div>
    )
}

export default AddQuestionCard
