import './App.css';
import DataGrid from './components/DataGrid';

interface Person {
  id: number;
  name: string;
  age: number;
}

function App() {
  return (
    <div className="App">
      <h1>Data Grid Example</h1>
      <DataGrid<Person>
        data={[
          { id: 1, name: 'John Doe', age: 30 },
          { id: 2, name: 'Jane Smith', age: 25 },
          { id: 3, name: 'Bob Johnson', age: 35 },
        ]}
        columns={[{ key: 'id', header: 'ID' }, { key: 'name', header: 'Name' }, { key: 'age', header: 'Age' }]}
        pageSize={10}
      />
    </div>
  );
}

export default App;
