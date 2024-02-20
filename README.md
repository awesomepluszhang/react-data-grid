# Data Grid

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`
Launches the test runner in the interactive watch mode.\

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### How to use

#### Step 1: Import DataGrid  

First, import the DataGrid component into your project.  
`import { DataGrid } from './components';`

#### Step 2: Provide Data and Columns  

Pass the data and column configuration to the DataGrid component as props.  
```

const columns = [
    { key: 'userId', header: 'User Id', width: 100}, 
    { key: 'username', header: 'Username', width: 300}, 
    { key: 'email', header: 'Email', width: 300},
    { key: 'sex', header: 'Sex', width: 100 }
    // Add more columns as needed
];

const data = [
    { userId: 'ada2a8c4', username: 'Carroll.Collier', email: 'Jerel57@gmail.com', sex: 'female' },
    { userId: 'a093ddf6', username: 'Sonny_Kessler31', email: 'Kaya.Hegmann26@yahoo.com', sex: 'female' },
    { userId: 'b7254ef0', username: 'Lula.Upton', email: 'Irwin.Jacobs93@hotmail.com', sex: 'female' },
    // Add more data as needed
];
```

#### Step 3: Render the DataGrid  
Render the DataGrid component with the provided data and columns.  
```
<DataGrid<User>
    data={loadUsers(100000)}
    columns={[
        { key: 'userId', header: 'User Id', width: 100}, 
        { key: 'username', header: 'Username', width: 300}, 
        { key: 'email', header: 'Email', width: 300},
        { key: 'sex', header: 'Sex', width: 100 }
    ]}
    pageSize={10}
    rowHeight={30}  // not required, default is 20
    height={300} // not required, default is 300
/>
```
### Supported Features
#### 1. Searching:  

To search, type text into the search input box. The data grid will filter the rows based on the input value. And it will reset page to 1.

#### 2. Sorting:  

To sort, click on the column header. The data grid will sort the rows based on the selected column. Clicking again will toggle between ascending and descending order. And it will reset page to 1.

#### 3. Pagination:  
Clicking the pagination will go to the first item of the current page.

#### 4. Virtual Scrolling: 

Virtual scrolling is enabled by default. The data grid efficiently renders only the rows that are visible in the viewport, improving performance for large datasets. 

Scroll up and down to see the rows being rendered dynamically as you scroll through the data.
That's it! You've successfully integrated and used the DataGrid component in your project, allowing for searching, sorting, and efficient virtual scrolling.  