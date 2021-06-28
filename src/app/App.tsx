import routes from '../routes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="App">
      {routes()}
    </div>
  );
}

export default App;
