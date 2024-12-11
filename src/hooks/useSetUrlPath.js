import { useLocation } from 'react-router-dom';

const useSetUrlPath = () => {
const location = useLocation();
const myPath = location.pathname;
// パスの先頭1文字を削除 
const modPath = myPath.length > 1 ? myPath.slice(1) : myPath;

const pathNames = {
    area: '会場',
    visitor: '来場者一覧',
    team: 'チーム一覧',
    reception: '受付',
    question: 'アンケート',
    student: '学生一覧',
    "/": 'アナリティクス'
    };

    let translatedPath;

    // `student/<数字>` を判定
    if (/^student\/\d+$/.test(modPath)) {
        translatedPath = '学生詳細';
    } else {
        translatedPath = pathNames[modPath] || modPath;
    }

    const finalPath = translatedPath ? ` > ${translatedPath}` : translatedPath;

    return finalPath;
};

export default useSetUrlPath;
