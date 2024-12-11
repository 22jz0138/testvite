import * as React from 'react';
import {useState,useEffect} from 'react';
import Ajax from '../../../hooks/Ajax';
import { useAuth } from '../../../context/AuthContext';
import StudentAddModal from '../../base/modal/studentaddmodal/StudentAddModal';
import { Link } from "react-router-dom";
import styles from './Student.module.css';

export default function Student() {
    const token = useAuth();
    const [studentData, setStudentData] = useState([]);
    const [StudentDetail, setStudentDetail] = useState();
    const [teamData,setTeamData] = useState();
    const [showModal, setShowModal] = useState(false);
    const handleDetailClick = (e) =>{
        const studentId  = e.target.getAttribute("data-key");
        setStudentData(studentId);
    }
    const ShowModal = () => {
        console.log("おされた");
        Ajax(null, token.token, 'team', 'get')
        .then((data) => {
            if(data.status === "success") {
                setTeamData(data.team);
                console.log("dekita");
                console.log("チームデータ",data);
            } else {
                console.log(data.status);
            }
            setShowModal(true);
        });
        console.log(showModal);
      };

    useEffect(() => {
        Ajax(null, token.token, 'student', 'get')
        .then((data) => {
            if(data.status === "success") {
                setStudentData(data.student);
                console.log("dekita");
            } else {
                console.log(data.status);
            }
        });
    }, [token]);

    return (
        <>
            <div className={styles.listArea}>
                <div className={styles.processingArea}>
                    <button className={styles.addeStudentButton} onClick={ShowModal}><p>+ </p></button>
                </div>
                {showModal && <StudentAddModal showFlag={showModal} setShowModal={setShowModal} selectData={teamData}/>}
                <div className={styles.studentListArea}>
                    <div className={styles.listHeader}>
                        <ul className={styles.listTitle}>
                            <li>ID</li>
                            <li>学年</li>
                            <li>チーム番号</li>
                            <li>氏名</li>
                            <li>学籍番号</li>
                            <li>内定先ID</li>
                        </ul>
                    </div>
                    <div className={styles.columnBody}>
                        {studentData.map((item) => (
                        <Link
                        to={`/admin/student/${item.id}`}
                        >
                            <ul key={item.number} className={styles.studentsColumnWrapper}>
                                <div key={item.name} data-key={item.id} className={styles.studentsColumn} onClick={handleDetailClick}>
                                    <li>{item.id}</li>
                                    <li>{item.grade}</li>
                                    <li>{item.team_id}</li>
                                    <li>{item.name}</li>
                                    <li>{item.number}</li>
                                    <li>{item.employment_target_id}</li>
                                </div>
                            </ul>
                        </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
