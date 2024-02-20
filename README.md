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
`import DataGrid from './components/DataGrid';`

#### Step 2: Provide Data and Columns  

Pass the data and column configuration to the DataGrid component as props.  
```
const columns = [
  { key: 'id', header: 'ID', width: 100 },
  { key: 'name', header: 'Name', width: 200 },
  { key: 'age', header: 'Age', width: 100 },
  // Add more columns as needed
];

const data = [
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Alice', age: 25 },
  { id: 3, name: 'Bob', age: 35 },
  // Add more data as needed
];
```

#### Step 3: Render the DataGrid  
Render the DataGrid component with the provided data and columns.  
```
<DataGrid
  data={data}
  columns={columns}
  itemHeight={30} // Adjust item height as needed
  pageSize={10}   // Adjust page size as needed
/>
```
### Supported Features
#### 1. Searching:  

To search, type text into the search input box. The data grid will filter the rows based on the input value.

#### 2. Sorting:  

To sort, click on the column header. The data grid will sort the rows based on the selected column. Clicking again will toggle between ascending and descending order.

#### 3. Virtual Scrolling: 

Virtual scrolling is enabled by default. The data grid efficiently renders only the rows that are visible in the viewport, improving performance for large datasets. 

Scroll up and down to see the rows being rendered dynamically as you scroll through the data.
That's it! You've successfully integrated and used the DataGrid component in your project, allowing for searching, sorting, and efficient virtual scrolling.  