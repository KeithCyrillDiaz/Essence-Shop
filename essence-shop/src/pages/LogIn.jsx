


const LoginForm = () => {
  return (
    <div className='form'>
        <h2>Essence <span>Shop</span></h2>
        <input type="text" 
        placeholder='Email'
        />
       <input type="password" 
        placeholder="Password" 
        />
    </div>
  )
}


const LogIn = () => {
  return (
    <div className="logIn">
        <div className="container">
            <LoginForm/>
        </div>
    </div>
  )
}

export default LogIn
