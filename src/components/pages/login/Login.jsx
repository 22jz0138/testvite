import React from 'react'
import styles from "./Login.module.css"
import { useState } from 'react'
import Ajax from '../../../hooks/Ajax';
import { useAuth } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [errFlag, setErrFlag] = useState(true);
    const [inputError, setInputError] = useState(''); // 入力エラーメッセージ用のステート
    const { login } = useAuth();
    const navigate = useNavigate(); 

    const inputAccount = (e) => {
        const value = e.target.value;
        if (value.length > 255) {
            setInputError('アカウント名は255文字以内で入力してください。');
            setErrFlag(false);
        } else {
            setInputError('');
            setErrFlag(true);
            setAccount(value);
        }
    }

    const inputPassword = (e) => {
        const value = e.target.value;
        if (value.length > 255) {
            setInputError('パスワードは255文字以内で入力してください。');
            setErrFlag(false);
        } else {
            setInputError('');
            setErrFlag(true);
            setPassword(value);
        }
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
        if (account.length > 255 || password.length > 255) {
            return; // すでにエラーがある場合は送信しない
        }
        
        const req = {
            account: account,
            password: password
        }

        Ajax(null, null, 'login', 'POST', req)
        .then((data) => {
            if (data.status === "success") {
                const token = data.token;
                login(token);
                navigate('/admin');
            } else {
                setErrFlag(false);
                setInputError('アカウントまたはパスワードに誤りがあります');
            }
        })
    }

    return (
        <>
            <div className={styles.loginPage}>
                <div className={styles.loginArea}>
                    <h1 className={styles.loinLogo}>JPages</h1>
                    <form onSubmit={handleSubmit} className={styles.uiForm}>
                        <dl>
                            <div className={styles.formField}>
                                <dt><label htmlFor="account">account</label></dt>
                                <dd><input type="text" id="account" onChange={inputAccount}></input></dd>
                            </div> 
                            <div className={styles.formField}>
                                <dt><label htmlFor="password">password</label></dt>
                                <dd><input type="password" id="password" onChange={inputPassword}></input></dd>
                            </div>
                            <p className={styles.err}>{inputError}</p> {/* エラーメッセージを表示 */}
                        </dl>
                        <button type="submit" className={styles.loginButton}>OK</button>
                    </form>
                </div>  
            </div>
        </>
    );
}

export default Login;
