import React, { useState } from 'react';
import styles from './TeamButton.module.css'; // CSSモジュールをimport

const TeamButton = ({ initialVisualType, label }) => {
  // visualTypeの状態を管理
  const [visualType, setVisualType] = useState(initialVisualType);

  // クリック時にビジュアルを切り替える関数
  const toggleVisualType = () => {
    setVisualType((prevType) => (prevType === 'primary' ? 'secondary' : 'primary'));
    console.log("クリックできた");
  };

  // ビジュアルの種類に応じたクラスを割り当てる
  const className = visualType === 'primary' ? styles.teamButtonPrimary : styles.teamButtonSecondary;

  return (
    <button className={`${styles.teamButton} ${className}`} onClick={toggleVisualType}>
      {label}
    </button>
  );
};

export default TeamButton;
