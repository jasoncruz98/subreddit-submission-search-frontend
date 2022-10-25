import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useAllSubmissions } from './api/hooks/submission'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

//TODO:
// Add a search bar
// Add data hook to fetch data from https://github.com/pushshift/api
// Make search bar call data hook
// Add a loading spinner while data is loading
// Debounce search bar
// Add infinite scroll
// Add button to save submission to local storage
// Add button to remove submission from local storage
// Add App Bar with button to view saved submissions

function App() {
  const [count, setCount] = useState(0)

  const { data } = useAllSubmissions();

  return (
    <div className="App">
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
         {data?.map((submission) => (
           <CardContent sx={{
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center',
             justifyContent: 'center',
             textAlign: 'center',
             padding: '1rem',
             margin: '1rem',
             backgroundColor: 'white',
             borderRadius: '1rem',
             boxShadow: '0 0 1rem rgba(0, 0, 0, 0.2)',
          }}>
        <div key={submission.id}>
          <h1>{submission.title}</h1>
          <p>{submission.selftext}</p>
          <p>{submission.url}</p>
          </div>
          </CardContent>
      ))}
    </div>
  )
}

export default App
