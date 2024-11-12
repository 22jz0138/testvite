import React from 'react'
import styles from "./Login.module.css"
import { useState } from 'react'
import Ajax from '../../../hooks/Ajax';


function Login() {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const inputAccount = (e) => {
        setAccount(e.target.value);
    }
    const inputPassword = (e) => {
        setPassword(e.target.value);
    }
    console.log(account, password);
    const handleSubmit = (ev) => {
        ev.preventDefault();
        const req = {
            account : account,
            password : password
        }
        Ajax(null, null, 'login', 'POST',  req)
        .then((data) => {
            if(data.status === 'success') {
            console.log("dekita");
            } else {
            console.log(data.massage);
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
                                <dt><label htmlFor="account">アカウント</label></dt>
                                <dd><input type="text" id="account" onChange={inputAccount}></input></dd>
                            </div>
                            <div className={styles.formField}>
                                <dt><label htmlFor="password">パスワード</label></dt>
                                <dd><input type="password" id="password" onChange={inputPassword}></input></dd>
                            </div>
                        </dl>
                        <button type="submit">OK</button>
                    </form>
                </div>
            </div>
        </>
    );
  }
  
  export default Login;
