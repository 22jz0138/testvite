import React from 'react'
import { useState } from 'react';
import { EditButton } from '../../base/editButton/EditButton';
import { DeleteButton } from '../../base/deleteButton/DeleteButton';
import styles from './StDetail.module.css';
import ReactLoading from "react-loading";
import StudentDeleteModal from '../../base/modal/studentDeleteModal/StudentDeleteModal';


export default function StDetail(props) {
    const [isVisible, setIsVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);
    // console.log(props);
    const detailData = props.stData;
    // console.log(detailData);
    const toggleVisibility = () => {
        setIsVisible((f) => !f);
    };
    const ShowModal = () => {
        console.log("おされた");
        setShowModal(true);
        console.log(showModal);
      };
    return (
        <>
            <div className={styles.studentDetailArea}>
                <div className={styles.titleAndEdit}>
                    <h1>基本情報</h1>
                    <EditButton
                    onClick={toggleVisibility}
                    />
                    
                </div>
                <div className={styles.expArea}>
                    <p>登録されている学生の情報を確認・編集します</p>
                    <small className={styles.smallp}>※編集する場合は右上のボタンを押してください</small>
                </div>
                <StudentDeleteModal showFlag={showModal} setShowModal={setShowModal} data={detailData} />
                <div className={styles.detailArea}>
                    {detailData ? (
                            <div className={styles.studentText}>
                                <div>
                                    <span>所属チーム</span>
                                    <p>{detailData.student.team_id}</p>
                                </div>
                                <div>
                                    <span>学年</span>
                                    <p>{detailData.student.grade || '情報がありません'}年</p>
                                </div>
                                <div>
                                    <span>学籍番号</span>
                                    <p>{detailData.student.number || '情報がありません'}</p>
                                </div>
                                <div>
                                    <span>氏名</span>
                                    <p>{detailData.student.name || '情報がありません'}</p>
                                </div>
                                {/* <DeleteButton
                                onClick={ShowModal}
                                /> */}
                                <div className={styles.deleteButtonWrapper}>
                                    <button onClick={ShowModal} className={styles.delete}><p>削除</p></button>
                                </div>
                            </div>
                        ) : (
                            <ReactLoading type='spokes' color='#37ab9d'/>
                        )}
                    
                </div>
            </div>
        </>
    )
}
