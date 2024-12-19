
const NotFound = () => {
    const message = "Sorry, the page you're looking for doesn't exist."
    return (
      <div 
      style={{ 
        textAlign: 'center', 
        padding: '50px', 
        fontSize: '18px',
        width: "100%",
        marginTop: "10%"
        }}>
        <h1 style={{ fontSize: '3rem', color: '#800020' }}>404 - Page Not Found</h1>
        <p style={{color: "black"}}>{message}</p>
        <a href="/" style={{ color: '#D4AF37' }}>Go back to Home</a>
      </div>
    );
  };

  export default NotFound