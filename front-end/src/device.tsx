import React from 'react'

function Device() {
    return(
        <div>
            Device
        </div>
    )

}
export default Device

// import React, { useState, ChangeEvent, FormEvent } from 'react';

// interface LoginForm {
//     username: string;
//     password: string;
// }

// const Device: React.FC = () => {
//     const [loginForm, setLoginForm] = useState<LoginForm>({
//         username: '',
//         password: '',
//     });

//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//         setLoginForm({
//             ...loginForm,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         // Handle login form submission
//         // Example: Perform authentication, validate credentials, etc.
//         console.log(loginForm);
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Username:
//                     <input
//                         type="text"
//                         name="username"
//                         value={loginForm.username}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <label>
//                     Password:
//                     <input
//                         type="password"
//                         name="password"
//                         value={loginForm.password}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Device;
