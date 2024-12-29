import React, { useState, useEffect } from 'react';
import styles from './Team.module.css';
import catjpg from '../../../assets/images.jpg';
import TeamButton from '../../base/teambutton/TeamButton';
import { Link } from "react-router-dom";
import { useAuth } from '../../../context/AuthContext';
import Ajax from '../../../hooks/Ajax';
import ReactLoading from "react-loading";
import AddTeamModal from '../../base/modal/addteamModal/AddTeamModal';
import { CiSearch } from "react-icons/ci";


export const Team = () => {
  const [isStyle, setIsStyle] = useState(true);
  const [team, setTeam] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const token = useAuth();
  const [showModal, setShowModal] = useState(false);

  const ShowModal = () => {
    setShowModal(true);
  };

  const setCardView = () => setIsStyle(true);
  const setListView = () => setIsStyle(false);

  const fetchTeamData = () => {
    Ajax(null, token.token, 'team', 'get')
      .then((data) => {
        if (data.status === "success") {
          setTeam(data.team || []);
          console.log("データ取得成功");
        } else {
          console.log(data.status);
        }
      });
  };

  useEffect(() => {
    fetchTeamData();
    const intervalId = setInterval(fetchTeamData, 5000);
    return () => clearInterval(intervalId);
  }, [token]);

  // フィルタリング処理
const filteredTeams = team.filter(t => 
  // チーム名を小文字に変換し、検索キーワード（小文字）を含むかチェック
  t.name.toLowerCase().includes(searchTerm.toLowerCase())
);

// ソート処理
const sortedTeams = [...filteredTeams].sort((a, b) => {
  // 昇順の場合
  if (sortOrder === 'asc') {
    // チーム番号を昇順で比較
    return a.num.localeCompare(b.num);
  } else {
    // 降順の場合
    // チーム番号を降順で比較
    return b.num.localeCompare(a.num);
  }
});


  return (
    <>
      <div className={styles.teamArea}>
        <AddTeamModal showFlag={showModal} setShowModal={setShowModal}/>
        <div className={styles.teamTopArea}>
          <div className={styles.pageTitle}>
            <h2>チーム一覧</h2>
          </div>
          <div className={styles.visualSet}>
            <label className={styles.sortBox}>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="asc">昇順</option>
                <option value="desc">降順</option>
              </select>
            </label>
            <label className={styles.searchArea}>
              <input 
                type="search" 
                placeholder="チーム名で検索"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
              
            </label>
            <div className={styles.visualButtonArea}>
              <TeamButton
                visualType="card"
                onClick={setCardView}
                isInactive={isStyle}
              />
              <TeamButton
                visualType="list"
                onClick={setListView}
                isInactive={isStyle}
              />
            </div>
            <button className={styles.addTeam} onClick={ShowModal}>add +</button>
          </div>
        </div>
        <div className={isStyle ? styles.teamCardArea : styles.teamAreaList}>
          {team.length === 0 ? (
            <article className={styles.loadingArea}>
              <ReactLoading type='spokes' color='#37ab9d'/>
            </article>
          ) : (
            sortedTeams.length === 0 ? (
              <div className={styles.noDataMessage}>
                キーワードに関連するデータは見つかりませんでした。
              </div>
            ) : (
              sortedTeams.map((team) => (
                <div
                  key={team.id}
                  className={isStyle ? styles.cardItem : styles.listItem}
                >
                  <Link
                    to={`/admin/team/${team.id}`}
                    className={isStyle ? "" : styles.listLink}
                  >
                    <div className={isStyle ? "" : styles.innerList}>
                      <p>{team.num}</p>
                    </div>
                    <div className={isStyle ? styles.teamImgCardArea : styles.teamImgListArea}>
                      <img src={catjpg} alt="口を開けた猫" />
                    </div>
                    <div className={isStyle ? "" : styles.innerList}>
                      <h2>{team.name}</h2>
                    </div>
                    <ul>
                      {team.students && team.students.map((student) => (
                        <li key={student.id}>
                          {student.name} ({student.grade}年生)
                        </li>
                      ))}
                    </ul>
                  </Link>
                </div>
              ))
            )
          )}
        </div>
      </div>
    </>
  );
};
