import React from "react";
import styles from './StudentCSVAddModal.module.css'
import { useAuth } from "../../../../context/AuthContext";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Papa from 'papaparse';
import Ajax from "../../../../hooks/Ajax";

const StudentCSVAddModal = (props) => {
    const token = useAuth();
    const navigate = useNavigate();
    // console.log(props);
    const teamData = Object.values(props.selectData)
    const closeModal = () => {
        props.setShowCSVModal(false);
    };
    const [data, setData] = useState([]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            Papa.parse(file, {
                header: true, 
                skipEmptyLines: true,
                complete: (results) => {
                    setData(results.data); 
                    console.log(results);
                },
                error: (error) => {
                    console.error("CSVパース中にエラー:", error);
                }
            });
        }
    };

    const handleUpload = async () => {
        try {
            for (const row of data) {
                const req = {
                    teamNumber: Number(row['チーム番号']),  
                    studentId: row['学籍番号'],
                    grade: Number(row['学年']),
                    name: row['氏名'],
                };
                console.log(req);
                console.log(token);
                
                // Ajax(null, token.token, 'student', 'post',  req)
                // .then((data) => {
                //     if(data.status === "success") {
                //     console.log("dekita");
                //     closeModal();
                //     } else {
                //     console.log(data.status);
                //     console.log(data.message);
                //     console.log(token.token );
                //     console.log(req);
                //     }   
                // })
            }
            alert("すべての登録が完了しました");
        } catch (error) {
            console.error("エラーが発生しました:", error);
        }
    };

    return (
    <>
    {props.showFlag ? (
    <div id={styles.overlay} style={overlay}>
        <div id={styles.addModalContent} style={modalContent}>
           <div className={styles.addModalTitleArea}>
                <p>登録するCSVファイルを選択してください</p>
                <button  className={styles.cancelButton} onClick={closeModal}><span>×</span></button>
           </div>
           <div>
                <form action="" >
                    <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    />
                    <button onClick={handleUpload}>登録</button>
                </form>
           </div>
        </div>
    </div>
    ) : null}

    </>
    );
};
const modalContent = {
    background: "white",
    width:"500px",
    height:"650px",
    padding: "10px",
    borderRadius: "10px",

  };

  const overlay = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };


export default StudentCSVAddModal;
