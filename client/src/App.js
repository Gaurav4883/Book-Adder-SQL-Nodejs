import './App.css';
import {
  BrowserRouter as Gaurav, Route, Routes
} from "react-router-dom";
import Home from './pages/Home';
import Add from './pages/Add';
import Update from './pages/Update';
import Error from './pages/Error';
import './style.css'

function App() {
  return (
    <div className="App">
      <Gaurav>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/add' element={<Add />} />
          <Route exact path='/books/:id/update' element={<Update />} />
          <Route exact path='/*' element={<Error />} />
        </Routes>
      </Gaurav>
    </div>
  );
}

export default App;
