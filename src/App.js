import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './forms/store';
import Main from './forms';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
        <Main/>        
    </div>
    </Provider>
  );
}

export default App;
