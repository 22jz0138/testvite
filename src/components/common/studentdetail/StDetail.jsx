import React from 'react'
import { useState } from 'react';
import { EditButton } from '../../base/editButton/EditButton';
import { DeleteButton } from '../../base/deleteButton/DeleteButton';
import StudentModal from '../../base/modal/studentModal/StudentModal';
import styles from './StDetail.module.css';

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
                <StudentModal showFlag={showModal} setShowModal={setShowModal} data={detailData} />
                <div className={ isVisible ? styles.None : styles.detailArea}>
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
                            <p>チーム情報を読み込んでいます...</p>
                        )}
                    
                </div>
                <div>
                <div className={ isVisible ? styles.formArea : styles.None }>
                    <form  className={styles.editForm}>
                        <dl className={styles.innerForm}>
                            <div className={styles.teamForm}>
                                <dt><label htmlFor="text">所属チーム</label></dt>
                                <dd><input type="text" id="team"  ></input></dd>
                            </div>
                            <div className={styles.teamForm}>
                                <dt><label htmlFor="text">学年</label></dt>
                                <dd><input type="text" id="system" ></input></dd>
                            </div>
                            <div className={styles.teamForm}>
                                <dt><label htmlFor="text">学籍番号</label></dt>
                                <dd><input type="text" id="system" ></input></dd>
                            </div>
                            <button type="submit" className={styles.submitButton}>登録</button>
                        </dl>
                    </form>
                </div>
                </div>
            </div>
        </>
    )
}
