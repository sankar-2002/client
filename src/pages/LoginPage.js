import { useState , useContext} from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext); //context will be set when the user id logged in

    async function login(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/login', {
            method:'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', //taking cookie from response header and including it in request header too so that we can use it for setting user context
        });

        if(response.status === 200) {
            response.json().then(userInfo => {
                setUserInfo(userInfo); //setting the userContext
                setRedirect(true);
            })
        } else {
            alert('Wrong credentials check your Username or Password');
        }
    }

    if(redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="UserName"
                onChange={ev => setUserName(ev.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                onChange={ev => setPassword(ev.target.value)}
            />
            <button>Login</button>
        </form>
    );
}