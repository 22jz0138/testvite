import React from 'react';
import Ajax from '../../../hooks/Ajax';
import { useAuth } from '../../../context/AuthContext';
import { useState, useEffect } from 'react';
import styles from './QuestionnaireList.module.css';

const QuestionnaireList = () => {
    const token = useAuth();
    const [queData, setQueData] = useState([]); // 初期値を空の配列に設定

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
    }, [token.token]); // token.tokenを依存配列に追加

    return (
        <>
            <div className={styles.listArea}>
                <div className={styles.listWrapper}>
                    {queData.map((que) => (
                        <div key={que.id} className={styles.queList}>
                            <p>{que.title}</p>
                        </div>
                    ))}
                    <div><span>+</span></div>
                </div>
            </div>
        </>
    );
}

export default QuestionnaireList;
