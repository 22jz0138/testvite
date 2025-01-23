import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress } from '@mui/material';
import { Link } from "react-router-dom";
import Ajax from '../../../hooks/Ajax';
import { useAuth } from '../../../context/AuthContext';
import QuestionnaireModal from '../../base/modal/questionnaireModall/questionnaireModal';
import styles from './QuestionnaireList.module.css';

const QuestionnaireList = () => {
    const token = useAuth();
    const [queData, setQueData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const ShowModal = () => {
        setShowModal(true);
    };
    console.log(token);
    
    useEffect(() => {
        setLoading(true);
        Ajax(null, token.token, 'questionnaire', 'get')
            .then((data) => {
                if (data.status === "success") {
                    setQueData(data.questionnaire);
                } else {
                    console.log(data.status);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, [token.token]);

    return (
        <>
            <div className={styles.listArea}>
                <div className={styles.pageTitle}>
                    <h2>アンケート一覧</h2>
                </div>
                <div className={styles.processingArea}>
                    <div className={styles.innerProcessing}>
                        <Button variant="contained" color="primary" onClick={ShowModal} style={{ marginLeft: '20px' }}>
                            + 新規登録
                        </Button>
                    </div>
                </div>

                {showModal && (
                    <QuestionnaireModal showFlag={showModal} setShowModal={setShowModal} />
                )}

                <div className={styles.questionnaireListArea}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>タイトル</TableCell>
                                    <TableCell>詳細</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={2} style={{ textAlign: 'center' }}>
                                            <CircularProgress />
                                            <p>ロード中...</p>
                                        </TableCell>
                                    </TableRow>
                                ) : queData.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={2} style={{ textAlign: 'center' }}>
                                            <p>該当するデータは見つかりませんでした。</p>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    queData.map((que) => (
                                        <TableRow key={que.id} component={Link} to={`/admin/questionnairedetail/${que.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <TableCell>{que.title}</TableCell>
                                            <TableCell>詳細</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>
    );
}

export default QuestionnaireList;
