import React, {useState} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom'
 
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
    const routeChange = () => {
      let path = '/';
      navigate(path);
    };
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            routeChange();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert('Invaild email/password')
        });
       
    }
 
    return(
        <div>
        <div>
            <h1>Login</h1>
        </div>
        <div className='form'>
            <div className="group1">
            <input
              placeholder='Email Address'
              type="text"
              id="email-address"
              className="input-box"
              value={email}
              required 
              onChange={(e) => setEmail(e.target.value)}
            />
            </div>
                    
            <input
              type="text"
              placeholder='Password'
              id="password"
              className="input-box"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          
        
        </div>
        <button className='submit-button' type='submit' onClick={onLogin}>Login</button>

        </div>
           
                        
        
    )
}
 
export default Login


