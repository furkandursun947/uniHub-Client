import React, { useState } from 'react'
import { Button, Input, Form, Collapse, DatePicker, message, Col, Row } from 'antd';
import AddQuestionCard from './AddQuestionCard';
import axios from '../../utils/apiCall';
import { useSelector } from 'react-redux';
import { getScreenSize } from '../../features/generalSlice';

const Panel = Collapse.Panel;

const AddExamModal = ({ courseId, closeModal }) => {

    const [form] = Form.useForm();
    const size = useSelector(getScreenSize);
    const [questions, setQuestions] = useState([]);


    const handleSubmitExam = (values) => {
        values.date[0] = values.date[0].format("DD.MM.YYYY HH:mm");
        values.date[1] = values.date[1].format("DD.MM.YYYY HH:mm");
        handleUpload(values)
    }

    const handleUpload = (exam) => {

        const formData = new FormData();
        questions.forEach(el => {
            formData.append('files', el.image);
        });

        formData.append('questions', JSON.stringify(questions));
        formData.append('exam', JSON.stringify(exam));

        axios(`courses1/${courseId}/addExam`, {
            method: 'post',
            processData: false,
            data: formData
        }).then((res) => {
            message.success(res.data);
        }).catch((err) => {
            message.error(err.message)
        }).finally(() => {
            closeModal();
        })
    }

    const addQuestion = () => {
        const questionType = {
            question: "",
            image: null,
            choice1: "",
            choice2: "",
            choice3: "",
            choice4: "",
            answer: "",
        }
        setQuestions([...questions, questionType])
    }

    const onHandleUpload = (value, index) => {
        if (value.fileList.length === 1) {
            questions[index].image = value.file;
            setQuestions([...questions])
        } else {
            questions[index].image = null;
            setQuestions([...questions])
        }
    }

    const handleQuestionChange = (value, index) => {
        questions[index].question = value;
        setQuestions([...questions]);
    }

    const handleChoicesChange = (value, choiceNo, index) => {
        switch (choiceNo) {
            case 1:
                questions[index].choice1 = value;
                setQuestions([...questions]);
                break;
            case 2:
                questions[index].choice2 = value;
                setQuestions([...questions]);
                break;
            case 3:
                questions[index].choice3 = value;
                setQuestions([...questions]);
                break;
            case 4:
                questions[index].choice4 = value;
                setQuestions([...questions]);
                break;
            default:
                break;
        }
    }

    const handleAnswerChange = (value, index) => {
        questions[index].answer = value;
        setQuestions([...questions]);
    }

    return (
        <div className="add-exam-modal-container" style={{ padding: size > 500 ? '40px' : '20px' }}>
            <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                onFinish={handleSubmitExam}
            >
                <Form.Item label="Exam Name" name="examName" required>
                    <Input />
                </Form.Item>
                <Form.Item label="Exam Date" name="date">
                    <DatePicker.RangePicker minuteStep={15} format="DD/MM/YYYY HH:mm" showTime={{ format: 'HH:mm' }} />
                </Form.Item>
                <Form.Item label="Exam Weight Percentage" name="weight" required>
                    <Input />
                </Form.Item>
                {questions.length ? (
                    <Col xs={24} md={18} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                        <Collapse style={{ margin: '0 auto 20px auto' }}>
                            {questions.map((el, index) => (
                                <Panel header={`Question ${index + 1}`} key={index}>
                                    <AddQuestionCard
                                        index={index}
                                        question={questions[index]}
                                        handleQuestionChange={handleQuestionChange}
                                        onHandleUpload={onHandleUpload}
                                        handleChoicesChange={handleChoicesChange}
                                        handleAnswerChange={handleAnswerChange}
                                    />
                                </Panel>
                            ))}
                        </Collapse>
                    </Col>
                ) : null}


                <Form.Item>
                    <Row>
                        <Col xs={0} md={7} />
                        <Col xs={12} md={5} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                type="secondary"
                                onClick={addQuestion}
                            >
                                Add Question
                            </Button>
                        </Col>
                        <Col xs={12} md={5} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                Submit Exam
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddExamModal