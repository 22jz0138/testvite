import * as React from 'react';
import {useState,useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Ajax from '../../../hooks/Ajax';
import { useAuth } from '../../../context/AuthContext';
import styles from './Student.module.css';

const VISIBLE_FIELDS = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'grade', headerName: '学年', width: 150 },
    { field: 'team_id', headerName: 'チーム番号', width: 150 },
    { field: 'name', headerName: '氏名', width: 300 },
    { field: 'number', headerName: '学籍番号 ', width: 400 },
    { field: 'employment_target_id', headerName: '内定先ID', width: 400 },
];

export default function BasicExampleDataGrid() {
    const token = useAuth();
    const [studentData, setStudentData] = useState([]);
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
            {/* <div style={{ height: 600  }}>
                <DataGrid rows={studentData} columns={VISIBLE_FIELDS} pageSize={5} />
            </div> */}
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
                    {studentData.map((item, index) => (
                    <ul key={index} className={styles.studentsColumnWrapper}>
                        <div className={styles.studentsColumn}>
                            <li>{item.id}</li>
                            <li>{item.grade}</li>
                            <li>{item.team_id}</li>
                            <li>{item.name}</li>
                            <li>{item.number}</li>
                            <li>{item.employment_target_id}</li>
                        </div>
                    </ul>
                    ))}
                </div>
            </div>
        </>
    );
}
