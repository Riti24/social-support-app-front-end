import Layout from './components/Layout';
import { BrowserRouter as BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Layout></Layout>
    </BrowserRouter>
  )
}

export default App
