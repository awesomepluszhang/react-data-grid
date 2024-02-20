import './App.css';
import { DataGrid } from './components';
import { User, loadUsers } from './services';

function App() {
  return (
    <div className="App">
      <h1>Data Grid Example</h1>
      <DataGrid<User>
          data={loadUsers(100000)}
          columns={[
            { key: 'userId', header: 'User Id', width: 100}, 
            { key: 'username', header: 'Username', width: 300}, 
            { key: 'email', header: 'Email', width: 300},
            { key: 'sex', header: 'Sex', width: 100 }
          ]}
          height={30}
          pageSize={10}
        />
    </div>
  );
}

export default App;
