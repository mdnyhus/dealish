import {Routes, Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RecipeListPage from './pages/RecipeListPage';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/recipes' element={<RecipeListPage />} />
    </Routes>
  );
}
