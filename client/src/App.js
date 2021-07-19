import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import IndexPage from './pages/Index/IndexPage'

import './App.css';

function App() {
  return (
    <div className="app">
      <Router>
        <Route exact path="/" component={IndexPage} />
      </Router>
    </div>
  );
}

export default App;
