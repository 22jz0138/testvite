import { useLocation } from 'react-router-dom';

const useSetUrlPath = () => {
    const location = useLocation();
    const myPath = location.pathname;
  // パスの先頭1文字を削除 
    const modPath = myPath.length > 1 ? myPath.slice(1) : myPath;
  // falsyでなければ、" ＞ " を追加
    const finalPath = modPath ? ` > ${modPath}` : modPath;
    return finalPath;
};

export default useSetUrlPath;
