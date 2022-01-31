import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getScreenSize } from '../../features/generalSlice';
import { Card, Feed, Pagination } from 'semantic-ui-react';
import { Col, Row } from 'antd';
import moment from 'moment';
import axios from '../../utils/apiCall';
import QuestionCard from './QuestionCard';
import Result from './Result';

const StudentExam = ({ isAvaible, questions, studentId }) => {

    const screenSize = useSelector(getScreenSize);
    const [index, setIndex] = useState(0);
    const [userChoices, setUserChoices] = useState([]);
    const [remainingTime, setRemainingTime] = useState(moment().format("DD/MM/YYYY HH:mm:ss"));
    const { examId } = useParams();
    const isFinished = isAvaible ? (index === questions.questions.length ? true : false) : false

    useEffect(() => {
        setUserChoices([...Array.apply(null, { length: questions?.questions?.length }).map(() => "")])
    }, [questions])

    const handleSetUserChoices = (value) => {
        const temp = userChoices
        temp[index] = value;
        setUserChoices([...temp]);
    }

    const getRemainingTime = () => {
        const now = moment(remainingTime, 'DD/MM/YYYY HH:mm:ss')
        const then = moment(questions.deadLine + ':00', 'DD/MM/YYYY HH:mm:ss')
        return moment.utc(moment(then, 'DD/MM/YYYY HH:mm:ss').diff(moment(now, 'DD/MM/YYYY HH:mm:ss'))).format("HH:mm:ss")
    }

    useEffect(() => {
        let secTimer = setInterval(() => {
            setRemainingTime(moment().format("DD/MM/YYYY HH:mm:ss"))
        }, 1000)
        return () => clearInterval(secTimer);
    }, []);

    const remainingTimeCss = {
        position: screenSize < 500 ? 'relative' : 'absolute',
        right: 0,
        fontSize: 15,
        fontWeight: 600,
        color: '#555',
        margin: screenSize < 500 ? '0 auto 10px auto' : '0'
    }

    const calculateResult = () => {
        let answeredQuestionNumber = 0;
        let correctAnswerNumber = 0;
        userChoices.forEach((el, index) => {
            if (el) {
                answeredQuestionNumber += 1;
                if (el == parseInt(questions.questions[index].answer)) {
                    correctAnswerNumber += 1;
                }
            }
        });
        let point = Math.round(correctAnswerNumber * 100.0 / userChoices.length);
        let wrongAnswerNumber = answeredQuestionNumber - correctAnswerNumber;
        answeredQuestionNumber = Math.round(answeredQuestionNumber * 100.0 / userChoices.length);
        correctAnswerNumber = Math.round(correctAnswerNumber * 100 / userChoices.length);
        wrongAnswerNumber = Math.round(wrongAnswerNumber * 100 / userChoices.length);
        return {
            answeredQuestionNumber, correctAnswerNumber, point, wrongAnswerNumber
        }
    }

    const saveResults = async () => {
        const { point } = calculateResult();
        await axios.post('courses/addExamResult', {
            point,
            studentId,
            examId
        }).then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            {!isFinished ? (
                isAvaible ? (
                    <Col style={{ width: screenSize < 500 ? '90%' : '80%' }}>
                        <Row style={{ position: 'relative' }}>
                            <div style={remainingTimeCss}>Remaining Time: {getRemainingTime()}</div>
                            <div style={{ fontSize: 25, fontWeight: 700, textAlign: 'center', width: '100%' }}>
                                {questions.examName}
                            </div>
                        </Row>
                        <QuestionCard
                            question={questions.questions[index]}
                            index={index}
                            setIndex={setIndex}
                            selectedGlobal={userChoices[index]}
                            setSelectedGlobal={handleSetUserChoices}
                            length={questions.questions.length}
                            saveResults={saveResults}
                        />
                        <Row style={{ justifyContent: 'center' }}>
                            <Pagination
                                activePage={index + 1}
                                onPageChange={(e, { activePage }) => setIndex(activePage - 1)}
                                totalPages={questions.questions.length}
                            />
                        </Row>
                    </Col>
                ) : (
                    <Card>
                        <Card.Content>
                            <Card.Header textAlign="center">Exam Is Not Avaible</Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <Feed>
                                <Feed.Event>
                                    <Feed.Content>
                                        <Feed.Summary style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                            Exam Start Time: <span style={{ fontSize: 13, color: '#ac5353' }}>{questions.startDate}</span>
                                        </Feed.Summary>
                                    </Feed.Content>
                                </Feed.Event>
                                <Feed.Event>
                                    <Feed.Content>
                                        <Feed.Summary style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                            Exam End Time: <span style={{ fontSize: 13, color: '#ac5353' }}>{questions.deadLine}</span>
                                        </Feed.Summary>
                                    </Feed.Content>
                                </Feed.Event>
                            </Feed>
                        </Card.Content>
                    </Card>
                )
            ) : (
                <Result result={calculateResult()} />
            )}

        </div>
    )
}

export default StudentExam
