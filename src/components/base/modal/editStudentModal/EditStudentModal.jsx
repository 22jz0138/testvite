import React from 'react'
import Ajax from "../../../../hooks/Ajax";
import { useAuth } from "../../../../context/AuthContext";
import { useParams,useNavigate, Navigate } from 'react-router-dom';

const EditStudentModal = () => {
    const token = useAuth();
    // const studentId = props.stID
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(props);
    const [putTeamNum, setPutTeamNum] = useState("");
    const [putGrade, setPutGrade] = useState("");
    const [putStudentId, setPutStudentId] = useState("");
    const [putName, setPutName] = useState("");
    

    const closeModal = () => {
        props.setShowModal(false);
    };

    const inputTeamNum = (e) => {
        setPutTeamNum(e.target.value);
    };

    const inputStudentName = (e) => {
        setPutName(e.target.value);
    };

    const inputStudentGrade = (e) => {
        setPutGrade(e.target.value);
    };

    const inputStudentIDNumber = (e) => {
        setPutStudentId(e.target.value);
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const newErrors = {};

        if (!putStudentId) newErrors.idNumber = "学籍番号を入力してください";
        if (!putName) newErrors.name = "氏名を入力してください";
        if (!putGrade) newErrors.grade = "学年を選択してください";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; // エラーがある場合は処理を中止
        }

        const req = {
            team_id: Number(putTeamNum),
            number: putStudentId,
            grade: Number(putGrade),
            name: putName
        };

        Ajax(null, token.token, 'student', 'put', req)
            .then((data) => {
                if (data.status === "success") {
                    closeModal();
                    alert("登録が完了しました");
                } else {
                    console.log(data.status);
                    console.log(data.message);
                }
            });
    };

    const isButtonDisabled = !putStudentId || !putName || !putGrade;

    return (
        <>
            {props.showFlag ? (
                <div id={styles.overlay} style={overlay}>
                    <div id={styles.addModalContent} style={modalContent}>
                        <div className={styles.addModalTitleArea}>
                            <p>登録する情報を入力してください</p>
                            <button className={styles.cancelButton} onClick={closeModal}><span>×</span></button>
                        </div>
                        <div className={styles.formArea}>
                            <form onSubmit={handleSubmit} className={styles.addForm}>
                                <dl className={styles.addInnerForm}>
                                    <div className={styles.addStudentForm}>
                                        <dt><label htmlFor="text">チーム番号</label></dt>
                                        <dd>
                                            <select name="teams" id="teams" className={styles.teams} onChange={inputTeamNum} required>
                                                <option value="">チームを選択してください</option>
                                                {teamData.map((team) => (
                                                    <option key={team.id} value={team.id} label={team.name}></option>
                                                ))}
                                            </select>
                                        </dd>
                                    </div>
                                    <div className={styles.addStudentForm}>
                                        <dt><label htmlFor="text">法人番号</label></dt>
                                        <dd><input type="text" id="employment_target_id" onChange={inputStudentEmployment}></input></dd>
                                    </div>
                                    <div className={styles.addStudentForm}>
                                        <dt><label htmlFor="text">学籍番号</label></dt>
                                        <dd>
                                            <input type="text" id="StudentID" maxLength={8} onChange={inputStudentIDNumber} placeholder="入力必須" required></input>
                                            {errors.idNumber && <span style={{ color: "red" }}>{errors.idNumber}</span>}
                                        </dd>
                                    </div>
                                    <div className={styles.addStudentForm}>
                                        <dt><label htmlFor="text">学年</label></dt>
                                        <dd>
                                            <input type="number" id="grade" max={3} min={1} onChange={inputStudentGrade} placeholder="入力必須" required></input>
                                            {errors.grade && <span style={{ color: "red" }}>{errors.grade}</span>}
                                        </dd>
                                    </div>
                                    <div className={styles.addStudentForm}>
                                        <dt><label htmlFor="text">氏名</label></dt>
                                        <dd>
                                            <input type="text" id="studentName" maxLength={15} onChange={inputStudentName} placeholder="入力必須" required></input>
                                            {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
                                        </dd>
                                    </div>
                                    <button 
                                        type="submit" 
                                        className={`${isButtonDisabled ? styles.disabled : styles.submitButton}`} 
                                        disabled={isButtonDisabled}
                                    >
                                        変更を確定する
                                    </button>
                                </dl>
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
    width: "500px",
    height: "650px",
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




export default EditStudentModal