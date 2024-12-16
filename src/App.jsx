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
import QuestionnaireDetail from './components/pages/questionnaire/detail/QuestionnaireDetail';
function App() {

  return (
    <>
        <Routes>
                  <Route path='/admin/'element={<Dashboard />}/>
                  <Route path='/admin/login'element={<Login />}/>
                  <Route path='/admin/team'element={<MainTeamPage />}/>
                  <Route path='/admin/question'element={<QuestionnairePage />}/>
                  <Route path='/admin/questionnairedetail' element={<QuestionnaireDetail/>}/>
                  <Route path='/admin/reception'element={<ReceptionPage />}/>
                  <Route path='/admin/visitor'element={<VisitorsLogPage />}/>
                  <Route path='/admin/student'element={<StudentPage />}/>
                  <Route path='/admin/student/:id'element={<DetailStudent />}/>
                  <Route path='/admin/area'element={<AreaPage />}/>
                  <Route path='/admin/team/:id' element={<Detail />} />
                  <Route path='/admin/NotTeam' element={<NoTeam/>}/>
                  <Route path="/admin/*" element={<NoMatch />} />
        </Routes>
      
    </>
  )
}

export default App
