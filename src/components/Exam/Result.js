import React from 'react';
import { Col, Row, Progress, Divider, Button } from 'antd';
import { useSelector } from 'react-redux';
import { getScreenSize } from '../../features/generalSlice';
import { useHistory } from "react-router-dom";

const Result = ({ result, type }) => {

    const screenSize = useSelector(getScreenSize)
    const history = useHistory();

    const eachStat = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 10,
        marginBottom: 10
    }
    const label = {
        fontSize: 18,
    }

    return (
        <Col style={{ display: 'flex', justifyContent: 'center' }} >
            <Col style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', width: screenSize < 500 ? '70%' : (type !== "submitted" ? '30%' : '30%') }}>
                <Row style={{ fontSize: 20, marginBottom: 20, textAlign: 'center' }}>Exam Succesfully Submitted!</Row>
                <Button onClick={() => history.goBack()}>
                    Go Back!
                </Button>
                <Row style={{ ...eachStat, justifyContent: screenSize < 500 ? 'center' : 'space-between' }}>
                    <Col style={{ ...label, marginBottom: screenSize < 500 ? '15px' : '0' }}>
                        Answered Question
                    </Col>
                    <Col>
                        <Progress type="circle" percent={result.answeredQuestionNumber} format={percent => `${percent}%`} />
                    </Col>
                </Row>
                <Divider />
                <Row style={{ ...eachStat, justifyContent: screenSize < 500 ? 'center' : 'space-between' }}>
                    <Col style={{ ...label, marginBottom: screenSize < 500 ? '15px' : '0' }}>
                        Correct Answer Pct
                    </Col>
                    <Col>
                        <Progress type="circle" percent={result.correctAnswerNumber} strokeColor="green" format={percent => `${percent}%`} />
                    </Col>
                </Row>
                <Divider />
                <Row style={{ ...eachStat, justifyContent: screenSize < 500 ? 'center' : 'space-between' }}>
                    <Col style={{ ...label, marginBottom: screenSize < 500 ? '15px' : '0' }}>
                        Wrong Answer Pct
                    </Col>
                    <Col>
                        <Progress type="circle" percent={result.wrongAnswerNumber} strokeColor="red" format={percent => `${percent}%`} />
                    </Col>
                </Row>
                <Divider />
                <Row style={{ ...eachStat, justifyContent: screenSize < 500 ? 'center' : 'space-between' }}>
                    <Col style={{ ...label, marginBottom: screenSize < 500 ? '15px' : '0' }}>
                        Your Exam Result (Point)
                    </Col>
                    <Col>
                        <Progress type="circle" percent={result.point} format={percent => `${percent}`} />
                    </Col>
                </Row>
            </Col>
        </Col>
    )
}

export default Result
