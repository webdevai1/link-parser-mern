import { Routes } from './routes';
import { BrowserRouter } from 'react-router-dom';
import { SnackBar } from 'components/SnackBar';
import { AuthContext } from 'context';
import { useAuth } from 'hooks';
import { Header } from 'components';
import './app.scss';

function App() {
  const { userId, login, logout, token } = useAuth();
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ token, userId, login, logout, isAuthenticated }}
    >
      <SnackBar>
        <BrowserRouter>
          {isAuthenticated && <Header />}
          <Routes isAuthenticated={isAuthenticated} />
        </BrowserRouter>
      </SnackBar>
    </AuthContext.Provider>
  );
}

export default App;
