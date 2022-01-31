import { Button, Col, Collapse, DatePicker, Input, Row, Form, message } from 'antd'
import moment from 'moment';
import React from 'react';
import axios from '../../utils/apiCall';
import { useDispatch } from 'react-redux';
import { setRefresh } from '../../features/generalSlice';
import { useHistory } from 'react-router-dom';

const Panel = Collapse.Panel;

const TeacherEdit = ({ exam }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const onFormHandle = (values) => {
        let exam2 = {}
        if (values.aexamName) {
            exam2.examName = values.aexamName;
        }
        if (values.adate) {
            exam2.startDate = moment(values.adate[0]).format("DD/MM/YYYY HH:mm");
            exam2.deadLine = moment(values.adate[1]).format("DD/MM/YYYY HH:mm");
        }
        if (values.aweight) {
            exam2.weight = values.aweight;
        }

        let question = {}
        for (const [key, value] of Object.entries(values)) {
            if (key[0] !== "a") {
                const [id, choice] = key.split("-");
                question[id] = { ...question[id], [choice]: value };
            }
        }
        axios.put(`/update-exam/${exam.id}`, {
            exam: exam2,
            questions: question
        })
            .then((res) => {
                message.success(res.data);
                dispatch(setRefresh());
                history.push(`/courses/${exam.CourseId}`)
            })
    }

    return (
        <Form
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            onFinish={onFormHandle}
        >
            <Form.Item label="Exam Name" name="aexamName" required>
                <Input defaultValue={exam.examName} />
            </Form.Item>
            <Form.Item label="Exam Date" name="adate">
                <DatePicker.RangePicker minuteStep={15} format="DD/MM/YYYY HH:mm" showTime={{ format: 'HH:mm' }}
                    defaultValue={[moment(exam.startDate, "DD/MM/YYYY HH:mm"), moment(exam.deadLine, "DD/MM/YYYY HH:mm")]}
                />
            </Form.Item>
            <Form.Item label="Exam Weight" name="aweight" required>
                <Input defaultValue={exam.weight} />
            </Form.Item>

            {exam.questions?.length ? (
                <Col xs={24} md={18} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                    <Collapse style={{ margin: '0 auto 20px auto' }}>
                        {exam.questions?.map((el, index) => (
                            <Panel header={`Question ${index + 1}`} key={index}>
                                <Form.Item label="Question" name={el.id + "-question"}>
                                    <Input defaultValue={el.question} />
                                </Form.Item>
                                <Form.Item label="Choice 1" name={el.id + "-1"}>
                                    <Input defaultValue={el.choice1} />
                                </Form.Item>
                                <Form.Item label="Choice 2" name={el.id + "-2"}>
                                    <Input defaultValue={el.choice2} />
                                </Form.Item>
                                <Form.Item label="Choice 3" name={el.id + "-3"}>
                                    <Input defaultValue={el.choice3} />
                                </Form.Item>
                                <Form.Item label="Choice 4" name={el.id + "-4"}>
                                    <Input defaultValue={el.choice4} />
                                </Form.Item>
                                <Form.Item label="Answer" name={el.id + "-answer"}>
                                    <Input defaultValue={el.answer} />
                                </Form.Item>
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
                            onClick={() => history.push(`/courses/${exam.CourseId}`)}
                        >
                            Cancel
                        </Button>
                    </Col>
                    <Col xs={12} md={5} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            Save
                        </Button>
                    </Col>
                </Row>
            </Form.Item>
        </Form>
    )
}

export default TeacherEdit
