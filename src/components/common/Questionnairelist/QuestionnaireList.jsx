import React from 'react';
import Ajax from '../../../hooks/Ajax';
import { useAuth } from '../../../context/AuthContext';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './QuestionnaireList.module.css';
import QuestionnaireModal from '../../base/modal/questionnaireModall/questionnaireModal';

const QuestionnaireList = () => {
    const token = useAuth();
    const [queData, setQueData] = useState([]); // 初期値を空の配列に設定
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const ShowModal = () => {
        console.log("おされた");
        setShowModal(true);
        console.log(showModal);
    };
    useEffect(() => {
        Ajax(null, token.token, 'questionnaire', 'get')
        .then((data) => {
            if (data.status === "success") {
                setQueData(data.questionnaire);
                console.log(data.questionnaire);
                console.log("データ取得成功");
            } else {
                console.log(data.status);
            }
        });
    }, [token.token]);

    return (
        <>
            <QuestionnaireModal showFlag={showModal} setShowModal={setShowModal}/>
            <div className={styles.listArea}>
                <div className={styles.listWrapper}>
                    {queData.map((que) => (
                        <Link to={`/admin/questionnairedetail/${que.id}`} className={styles.quelistwrap}>
                            <button key={que.id} className={styles.queList}>
                                <p>{que.title}</p>
                            </button>
                        </Link>
                    ))}
                    <button className={styles.addQue} onClick={ShowModal}><span>+</span></button>
                </div>
            </div>
        </>
    );
}

export default QuestionnaireList;
