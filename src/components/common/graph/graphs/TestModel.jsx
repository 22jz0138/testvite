// import React, { useState, useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const TestModel = (props) => {
//   const [chartData, setChartData] = useState({ labels: [], datasets: [] });

//   useEffect(() => {
//     const now = new Date();
//     const startHour = 10; // 開始時間
//     const endHour = 17; // 終了時間
//     const labels = [];

//     // 10時から17時までの30分ごとのラベルを生成
//     for (let hour = startHour; hour <= endHour; hour++) {
//       labels.push(`${hour}時`);
//       labels.push(`${hour}時30分`);
//     }

//     // データが存在するか確認し、visitorを取得
//     const visitorData = props.data?.visitor || [];
//     const divisionCounts = {};

//     // divisionごとにデータを分ける
//     visitorData.forEach(item => {
//       const itemTime = new Date(item.created_at);
//       console.log(item);
      
//       labels.forEach((label, index) => {
//         let start, end;
//         if (label.endsWith('時')) {
//           // 10時の場合
//           const hour = parseInt(label);
//           start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, 0); // 10時0分
//           end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, 29); // 10時29分
//         } else {
//           // 10時30分の場合
//           const hour = parseInt(label);
//           start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, 30); // 10時30分
//           end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, 59); // 10時59分
//         }

//         if (itemTime >= start && itemTime < end) {
//           const division = item.division; // divisionを取得
//           if (!divisionCounts[division]) {
//             divisionCounts[division] = new Array(labels.length).fill(0); // 初期化
//           }
//           divisionCounts[division][index]++; // カウントを増やす
//         }
//       });
//     });

//     // datasetsを作成
//     const datasets = [
//       {
//         label: '企業',
//         data: divisionCounts[1] || new Array(labels.length).fill(0),
//         backgroundColor: '#4d4d4d', // 企業の色
//       },
//       {
//         label: '教員',
//         data: divisionCounts[2] || new Array(labels.length).fill(0),
//         backgroundColor: '#ff9800', // 教員の色
//       },
//       {
//         label: 'JEC生徒',
//         data: divisionCounts[3] || new Array(labels.length).fill(0),
//         backgroundColor: '#4caf50', // JEC生徒の色
//       },
//       {
//         label: 'OB・OG',
//         data: divisionCounts[4] || new Array(labels.length).fill(0),
//         backgroundColor: '#f44336', // OB・OGの色
//       },
//       {
//         label: 'その他',
//         data: divisionCounts[5] || new Array(labels.length).fill(0),
//         backgroundColor: '#999999', // その他の色
//       },
//     ];

//     setChartData({
//       labels: labels, // 生成したラベルをそのまま設定
//       datasets: datasets,
//     });
//   }, [props.data])

//   return (
//     <div style={{ width: '100%', height: '50%' }}> {/* 幅を100%に設定 */}
//       <Bar 
//         data={chartData} 
//         options={{
//           responsive: true,
//           maintainAspectRatio: false, // アスペクト比を維持しない
//           scales: {
//             y: {
//               stacked: true, // Y軸を積み上げに設定
//             },
//             x: {
//               stacked: true, // X軸を積み上げに設定
//             },
//           },
//         }} 
//       />
//     </div>
//   )
// }

// export default TestModel;
import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import Ajax from '../../../../hooks/Ajax';
import { useAuth } from '../../../../context/AuthContext';
import GraphFilterModal from '../../../base/modal/graphFilterModal/graphFilterModal';

// 必要な要素を登録
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const TestModel = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [chartType, setChartType] = useState('bar'); // グラフの種類を管理
  const [visitorData, setVisitorData] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]); // 選択された年を管理
  const [selectedDivisions, setSelectedDivisions] = useState([1, 2, 3, 4, 5]); // 初期は全てのDIVISIONを選択
  const [isModalOpen, setIsModalOpen] = useState(false); // モーダルのオープン状態を管理
  const token = useAuth();

  const fetchVisitorData = () => {
    Ajax(null, token.token, 'visitor', 'get')
      .then((data) => {
        if (data.status === "success") {
          setVisitorData(data.visitor); // visitorデータを設定
          console.log(data);
        } else {
          console.log("データ取得失敗");
        }
      });
  };

  useEffect(() => {
    fetchVisitorData();
  }, []);

  useEffect(() => {
    const startHour = 10; // 開始時間
    const endHour = 17; // 終了時間
    const labels = [];

    // 各年のラベルを生成
    selectedYears.forEach(year => {
      for (let hour = startHour; hour <= endHour; hour++) {
        labels.push(`${year}年 ${hour}時`);
        labels.push(`${year}年 ${hour}時30分`);
      }
    });

    const divisionCounts = {
      1: new Array(labels.length).fill(0), // 企業
      2: new Array(labels.length).fill(0), // 教員
      3: new Array(labels.length).fill(0), // JEC生徒
      4: new Array(labels.length).fill(0), // OB・OG
      5: new Array(labels.length).fill(0), // その他
    };

    // チェックボックスが選択されていない場合は今日のデータを表示
    const filteredVisitorData = selectedYears.length > 0 
      ? visitorData.filter(item => {
          const itemYear = new Date(item.created_at).getFullYear();
          return selectedYears.includes(itemYear);
        })
      : visitorData.filter(item => {
          const itemDate = new Date(item.created_at);
          return itemDate.toDateString() === new Date().toDateString(); // 今日の日付と一致するデータを取得
        });

    // divisionごとにデータを分ける
    filteredVisitorData.forEach(item => {
      const itemTime = new Date(item.created_at);
      const itemHour = itemTime.getHours(); // 時刻を取得
      const itemMinute = itemTime.getMinutes(); // 分を取得

      // 各年のラベルに対応するインデックスを計算
      selectedYears.forEach(year => {
        const labelIndex = (year - selectedYears[0]) * (endHour - startHour + 1) * 2 + (itemHour - startHour) * 2 + (itemMinute >= 30 ? 1 : 0);
        const division = item.division; // divisionを取得

        if (divisionCounts[division]) {
          divisionCounts[division][labelIndex]++; // カウントを増やす
        }
      });
    });

    // datasetsを作成
    const datasets = [];

    // 選択されたDIVISIONごとにデータセットを作成
    selectedDivisions.forEach(division => {
      const dataForDivision = divisionCounts[division];
      
      // 同じ年のデータをスタッキングするために、データを年ごとにまとめる
      const stackedData = selectedYears.map((year, index) => {
        return dataForDivision.slice(index * (endHour - startHour + 1) * 2, (index + 1) * (endHour - startHour + 1) * 2);
      }).flat();

      datasets.push({
        label: `${division === 1 ? '企業' : division === 2 ? '教員' : division === 3 ? 'JEC生徒' : division === 4 ? 'OB・OG' : 'その他'}`,
        data: stackedData,
        backgroundColor: division === 1 ? '#4d4d4d' : division === 2 ? '#ff9800' : division === 3 ? '#4caf50' : division === 4 ? '#f44336' : '#999999',
        stack: 'stacked', // スタッキング用の設定を追加
      });
    });

    setChartData({
      labels: labels, // 生成したラベルをそのまま設定
      datasets: datasets,
    });
  }, [visitorData, selectedYears, selectedDivisions]); // visitorData, selectedYears, selectedDivisionsが更新された時に実行

  // グラフの種類を切り替えるハンドラー
  const handleChartTypeChange = (e) => {
    setChartType(e.target.value);
  };

  // 年の選択ハンドラー
  const handleYearChange = (e) => {
    const year = parseInt(e.target.value);
    if (selectedYears.includes(year)) {
      setSelectedYears(selectedYears.filter(y => y !== year)); // 選択解除
    } else {
      setSelectedYears([...selectedYears, year]); // 選択追加
    }
  };

  // DIVISIONの選択ハンドラー
  const handleDivisionChange = (e) => {
    const division = parseInt(e.target.value);
    if (selectedDivisions.includes(division)) {
      setSelectedDivisions(selectedDivisions.filter(d => d !== division)); // 選択解除
    } else {
      setSelectedDivisions([...selectedDivisions, division]); // 選択追加
    }
  };

  // 年の選択肢を生成
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let year = 2023; year <= currentYear; year++) {
    yearOptions.push(year);
  }

  // DIVISIONの選択肢を生成
  const divisionOptions = [
    { id: 1, name: '企業' },
    { id: 2, name: '教員' },
    { id: 3, name: 'JEC生徒' },
    { id: 4, name: 'OB・OG' },
    { id: 5, name: 'その他' },
  ];

  return (
    <div style={{ width: '100%', maxHeight: '50%' }}>
      <GraphFilterModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} // モーダルを閉じるハンドラー
        yearOptions={yearOptions} 
        divisionOptions={divisionOptions} 
        selectedYears={selectedYears} 
        selectedDivisions={selectedDivisions} 
        handleYearChange={handleYearChange} 
        handleDivisionChange={handleDivisionChange} 
      />
      <button onClick={() => setIsModalOpen(true)}>選択する</button> 
      <div style={{ width: '100%', height: '5%' }}>
        <label>
          <input 
            type="radio" 
            value="bar" 
            checked={chartType === 'bar'} 
            onChange={handleChartTypeChange} 
          />
          棒グラフ
        </label>
        <label>
          <input 
            type="radio" 
            value="line" 
            checked={chartType === 'line'} 
            onChange={handleChartTypeChange} 
          />
          折れ線グラフ
        </label>
      </div>
      
      <div style={{ width: '100%', height: '100%' }}>
        {chartType === 'bar' ? (
          <Bar 
            data={chartData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
               
                y: { stacked: true, min: 0 }, // Y軸はスタッキング
                x: { stacked: false }, // X軸はスタッキングしない
              },
            }} 
          />
        ) : (
          <Line 
            data={chartData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: { stacked: false, min: 0 }, // 折れ線グラフではスタッキングしない
                x: { stacked: false },
              },
            }} 
          />
        )}
      </div>
      
    </div>
  );
}

export default TestModel;
