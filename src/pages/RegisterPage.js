import { useState } from "react";

export default function RegisterPage() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    async function register(ev) {
        ev.preventDefault(); //cancels the event if it is cancellable
        
        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }), //sending in the form of JSON
            headers: {'Content-Type':'application/json'},
        });

        //response mai body mai username or password mila
        // which is further used in server code(index.js) and added to MongoDB

        if(response.status === 200) {
            alert('Registration Successful');
        } else {
            alert('Registration Failed');
        }
    }


    return (
        <form className="register" onSubmit={register}>
            <h1>Register</h1>

            <input type="text"
                placeholder="UserName"
                value={username}
                onChange={ev => setUserName(ev.target.value)}
            />

            <input type="password"
                placeholder="Password"
                value={password}
                onChange={ev => setPassword(ev.target.value)}
            />

            <button>Register</button>
        </form>
    );
}