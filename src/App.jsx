
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Quiz from './components/Quiz';
import Result from './components/Result';
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;


