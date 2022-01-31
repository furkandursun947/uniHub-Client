import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import moment from 'moment';
import axios from '../utils/apiCall';
import StudentExam from '../components/Exam/StudentExam';
import Result from '../components/Exam/Result';
import TeacherEdit from '../components/Exam/TeacherEdit';
import { useSelector } from 'react-redux';
import { getRefresh } from '../features/generalSlice';
import { getIsUserLogged, getUser } from '../features/userSlice';

const ExamPage = () => {

    const isLogged = useSelector(getIsUserLogged);
    const user = useSelector(getUser);
    const refresh = useSelector(getRefresh);
    const [isAvaible, setIsAvaible] = useState(false);
    const [questions, setQuestions] = useState([]);
    const { examId } = useParams();

    let isStudent = isLogged ? (user.isStudent ? true : false) : false;
    const studentId = isStudent ? user?.id : null;
    const teacherId = isStudent ? null : user?.id;
    let result = null;
    let isStudentSubmit = false;
    let isOwner = !isStudent && questions ? questions?.Course?.TeacherId === teacherId : false;

    console.log(isOwner)

    questions?.Students?.forEach((student) => {
        if (studentId === student.id) {
            if (student.StudentHasExam) {
                isStudentSubmit = true;
                const answeredQuestionNumber = 100;
                const point = student.StudentHasExam.note;
                const correctAnswerNumber = student.StudentHasExam.note;
                const wrongAnswerNumber = 100 - student.StudentHasExam.note;

                result = {
                    point,
                    answeredQuestionNumber,
                    correctAnswerNumber,
                    wrongAnswerNumber,
                }
            }
        }
    })

    let temp = false;
    questions?.Course?.Students.forEach((student) => {
        if (studentId === student.id) {
            isStudent = true;
            temp = true;
        }
    })
    isStudent = temp;

    useEffect(() => {
        axios.post(`/courses3/getExam/${examId}`, {
            date: moment().format("DD/MM/YYYY HH:mm")
        }).then(res => {
            if (res.data.questions) {
                setQuestions(res.data)
                setIsAvaible(true)
            } else {
                setQuestions(res.data.exam)
                setIsAvaible(false)
            }
        })
            .catch(err => console.log(err))
    }, [examId, refresh])

    return (
        <div>
            {isOwner ? (
                <div style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <TeacherEdit exam={questions} />
                </div>
            ) : (
                isStudent ? (
                    isStudentSubmit ? (
                        <Result result={result} type="submitted" />
                    ) : (
                        <StudentExam
                            isAvaible={isAvaible}
                            questions={questions}
                            studentId={studentId}
                        />
                    )
                ) : null
            )}

        </div>
    )
}

export default ExamPage