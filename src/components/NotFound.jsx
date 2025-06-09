import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
      textAlign: 'center'
    }}>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" style={{
        marginTop: '1.5rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#4f46e5',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '0.25rem'
      }}>
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
