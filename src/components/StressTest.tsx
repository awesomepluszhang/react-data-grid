import { useState, useEffect } from 'react';
import { User, loadUsers } from '../services';
import { orderBy } from 'lodash';
import { DataGrid } from './DataGrid';

const StressTest = () => {
  const [data, setData] = useState<User[]>(loadUsers(100000));
  const [iterations, setIterations] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const startTime = performance.now();

      // Simulate rapid updates (sorting, filtering)
      const newData = loadUsers();
      const filteredAndSortedData = orderBy(newData, ['userId'], ['asc']).filter(item =>
        Object.values(item).some(val => String(val).toLowerCase().includes('s'))
      );

      const endTime = performance.now();
      const timeElapsed = endTime - startTime;
      setElapsedTime(prevElapsedTime => prevElapsedTime + timeElapsed);
      setIterations(prevIterations => prevIterations + 1);
      setData(filteredAndSortedData);
    }, 100); // Interval time in milliseconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h2>Stress Test</h2>
      <p>Iterations: {iterations}</p>
      <p>Total Elapsed Time: {elapsedTime.toFixed(2)} ms</p>
      <DataGrid<User>
        data={data}
        columns={[
          { key: 'userId', header: 'User Id', width: 100 },
          { key: 'username', header: 'Username', width: 300 },
          { key: 'email', header: 'Email', width: 300 },
          { key: 'sex', header: 'Sex', width: 100 }
        ]}
        height={30}
        pageSize={10}
      />
    </div>
  );
};

export default StressTest;
