import { useState } from 'react'
import './App.css'
import { useAllSubmissions } from './api/hooks/submission'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import useDebounce from './api/hooks/useDebounce';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';


//TODO:
// [DONE] Add a search bar
// [DONE] Add data hook to fetch data from https://github.com/pushshift/api
// [DONE] Make search bar call data hook
// Add a loading spinner while data is loading
// [DONE] Debounce search bar
// Add infinite scroll
// Add button to save submission to local storage
// Add button to remove submission from local storage
// Add App Bar with button to view saved submissions

export interface RedditPost {
    id: number
    title: string
    selftext: string
    url: string
}

function App() {
  
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, loading: isLoading, error: isError } = useAllSubmissions(debouncedSearchTerm);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearchTerm(value);
  };


  return (
    <div className="App">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextField id="outlined-search" label="Search field" type="search" onChange={handleSearchInputChange} />
        {isError ? <div>Something went wrong...</div> : (
          isLoading ? <CircularProgress
          sx={{
            marginY: 2,
          }}
        color="secondary"
        size={24}
      /> : (data?.map((post: RedditPost) => (
        <Card
          sx={{
            width: '80%',
            marginY: 2,
          }}
          key={post.id}>
          <CardContent
          key={post.id}
             sx={{
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
          }}
          >
            <h2>{post.title}</h2>
            <p>{post.selftext}</p>
            <a href={post.url} target="_blank" rel="noreferrer">Link</a>
          </CardContent>
        </Card>
      ))))}
        
      </Box>
    </div>
  )
}

export default App
