import React, {useContext, useState} from "react"
import "./login.scss"
import {Link} from "react-router-dom";
// import {Link, useNavigate} from "react-router-dom";
// import {AuthContext} from "../../context/authContext";

const Login =() => {
    const[inputs,setInputs] = useState({
        username:"",
        password:"",
    });

    const [err, setErr] = useState(null);

//    const navigate = useNavigate()

    const handleChange = (e) =>{
        const v = e.target.name;
        const newInput = inputs;
        newInput[v] = e.target.value;
        setInputs(newInput);
    }

    // const {login} = useContext(AuthContext);

    // const handleLogin = async (e)=>{
    //     e.preventDefault();
    //     try {
    //         await login(inputs);
    //         navigate("/")
    //     }catch (err){
    //         setErr(err.response.data);
    //     }
    // };

    return (
        <div className={"login"}>
            <div className={"card"}>
                <div className={"left"}>
                    <h1> Welcome TOPY</h1>
                    <p>
                        Are you alone? <br/>
                        Do you need Pet Care Service? <br/>
                        DO you need Child Care Service?
                    </p>
                    <span>Don't you have an account?</span>
                    <Link to={"/seniorregister"}>
                        <button>Senior Register</button>
                    </Link>
                    <Link to={"/parentregister"}>
                        <button>Parent Register</button>
                    </Link>
                </div>
                <div className={"right"}>
                    <h1>Login</h1>
                    <form >
                        <input type={"text"} placeholder={"Username"} name={"username"} onChange={handleChange}/>
                        <input type={"text"} placeholder={"Password"} name={"password"} onChange={handleChange}/>
                        <button>Senior Login</button>
                        <button>Parent Login</button>
                        {/*<button onClick={handleLogin}>Login</button>*/}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;