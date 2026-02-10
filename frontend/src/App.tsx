import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShoppingListCollection } from './components/ShoppingListCollection';
import { ShoppingListView } from './components/ShoppingListView';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShoppingListCollection />} />
        <Route path="/lists/:id" element={<ShoppingListView />} />
      </Routes>
    </Router>
  );
}

export default App;
