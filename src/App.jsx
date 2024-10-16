import './App.css';
import MainTeamPage from './components/pages/mainteam/MainTeamPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuestionnairePage from './components/pages/questionnaire/QuestionnairePage';
import ReceptionPage from './components/pages/reception/ReceptionPage';
import VisitorsLogPage from './components/pages/visitorslog/VisitorsLogPage';
import AreaPage from './components/pages/area/AreaPage';
import NoMatch from './components/pages/nomatch/NoMatch';

function App() {

  return (
    <>
      <Routes>
                <Route path='/'element={<MainTeamPage />}/>
                <Route path='/question'element={<QuestionnairePage />}/>
                <Route path='/reception'element={<ReceptionPage />}/>
                <Route path='/visitor'element={<VisitorsLogPage />}/>
                <Route path='/area'element={<AreaPage />}/>
                <Route path="/*" element={<NoMatch />} />
      </Routes>
      
    </>
  )
}

export default App
