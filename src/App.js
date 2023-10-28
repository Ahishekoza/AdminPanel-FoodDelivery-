import './App.css';
import AddFood from './pages/addFood/AddFood';
import { HomePage } from './pages/homepage/HomePage';
import {Routes,Route} from 'react-router-dom'
import Ordered from './pages/orderedFood/Ordered';
function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/addfood' element={<AddFood/>}/>
      <Route path='/orderdFood' element={<Ordered/>}/>
    </Routes>
  );
}

export default App;
