import React, { useState, ChangeEvent, FormEvent } from 'react';
import { UserProps } from '../interfaces/UserProps';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



function LoginPage() {
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()
    const [inputs, setInputs] = useState<UserProps>({ username: '', password: '' });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log(JSON.stringify(inputs));
        console.log(inputs.username);


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            username: inputs.username,
            password: inputs.password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow' as RequestRedirect
        };

        fetch("http://192.168.2.74:3000/api/login", requestOptions)
            .then(response => response.text())
            .then(result => {
                const resultJson = JSON.parse(result);
                if ( resultJson.username ===  inputs.username){
                    MySwal.fire({
                        html: <i>{resultJson.username}</i>,
                        icon: 'success'
                    }).then((value) =>{
                        localStorage.setItem('token', resultJson.token)
                        navigate('/devicepage')
                    })
                    // alert(resultJson.username)
                    // console.log(" Correct username")
                } else{
                    MySwal.fire({
                        html: <i>{resultJson.message}</i>,
                        icon: 'error'
                    })
                    // console.log(" Incorrect username")
                    // alert(resultJson.message)
                    // console.log(result);
                }
            })
            .catch(error => { 
                console.log('error', error);
            });




    };

    return (
        <div>
            <h2>LoginPage</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={inputs.username} onChange={handleChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={inputs.password} onChange={handleChange} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
