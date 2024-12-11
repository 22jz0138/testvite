import './App.css';
import MainTeamPage from './components/pages/mainteam/MainTeamPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login  from './components/pages/login/Login';
import QuestionnairePage from './components/pages/questionnaire/QuestionnairePage';
import ReceptionPage from './components/pages/reception/ReceptionPage';
import VisitorsLogPage from './components/pages/visitorslog/VisitorsLogPage';
import StudentPage from './components/pages/student/StudentPage';
import AreaPage from './components/pages/area/AreaPage';
import Detail from './components/pages/mainteam/detail/Detail';
import NoTeam from './components/pages/nomatch/NoTeam';
import NoMatch from './components/pages/nomatch/NoMatch';
import DetailStudent from './components/pages/student/detailStudent/DetailStudent';
import Dashboard from './components/pages/dashboard/dashboard';
function App() {

  return (
    <>
      <Routes>
                <Route path='/'element={<Dashboard />}/>
                <Route path='/login'element={<Login />}/>
                <Route path='/team'element={<MainTeamPage />}/>
                <Route path='/question'element={<QuestionnairePage />}/>
                <Route path='/reception'element={<ReceptionPage />}/>
                <Route path='/visitor'element={<VisitorsLogPage />}/>
                <Route path='/student'element={<StudentPage />}/>
                <Route path='/student/:id'element={<DetailStudent />}/>
                <Route path='/area'element={<AreaPage />}/>
                <Route path="/team/:id" element={<Detail />} />
                <Route path='/NotTeam' element={<NoTeam/>}/>
                <Route path="/*" element={<NoMatch />} />
      </Routes>
      
    </>
  )
}

export default App
