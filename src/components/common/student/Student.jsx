import * as React from 'react';
import {useState,useEffect} from 'react';
import Ajax from '../../../hooks/Ajax';
import { useAuth } from '../../../context/AuthContext';
import { Link } from "react-router-dom";
import styles from './Student.module.css';

export default function BasicExampleDataGrid() {
    const token = useAuth();
    const [studentData, setStudentData] = useState([]);
    const [StudentDetail, setStudentDetail] = useState();
    const handleDetailClick = (e) =>{
        const studentId  = e.target.getAttribute("data-key");
        setStudentData(studentId);
    }
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
                    to={`/student/${item.id}`}
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
        </>
    );
}
