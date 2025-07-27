import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SuiviArticle } from './pages/SuiviArticle';
import LoginP from './pages/LoginP';
import NavbarUser from './pages/NavbarUser';
import UserHomeP from './pages/UserHomeP';
import ArticleDetail from './pages/ArticleDetail';
import HomePage from './pages/HomaPage';
import AjoutArticle from './pages/AjoutArticle';
import Upload from './pages/Upload';
import Dashboard from './pages/Dashboard';
import HomePageEditeur from './pages/HomaPageEditeur';
import ArticlesList from './pages/ArticlesList';
import ArticleModel from './pages/ArticleModal';
import AdminManager from './pages/AdminManager';
import Historique from './pages/Historique';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/SuiviArticle" element={<SuiviArticle />} />
          <Route path="/login" element={<LoginP />} />
          <Route path="/home" element={<UserHomeP />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/AjoutArticle" element={<AjoutArticle />} />
          <Route path="/Upload" element={<Upload />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/HomePageEditeur" element={<HomePageEditeur />} />
          <Route path="/ArticlesList" element={<ArticlesList />} />
          <Route path="/HomePageEditeur" element={<HomePageEditeur />} />
          <Route path="/AdminManager" element={<AdminManager />} />
          <Route path="/Historique" element={<Historique />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;