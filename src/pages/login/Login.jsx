import React, {useContext, useState} from "react"
import "./login.scss"
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/authContext";

const Login =() => {
    const[inputs,setInputs] = useState({
        parentLogin:false,
        name:"",
        password:"",
    });

    const [err, setErr] = useState(null);

    const navigate = useNavigate()

    const handleChange = (e) =>{
        const v = e.target.name;
        const newInput = inputs;
        newInput[v] = e.target.value;
        setInputs(newInput);
    }

    const {login} = useContext(AuthContext);

    const handleParentLogin = async (e)=>{
        const newInput = inputs;
        newInput.parentLogin = true;
        setInputs(newInput);

        e.preventDefault();
        try {
            await login(newInput);
            navigate("/parentProfile")
        }catch (err){
            setErr(err.response.data);
        }
    };

    const handleSeniorLogin = async (e)=>{
        const newInput = inputs;
        newInput.parentLogin = false;
        setInputs(newInput);

        e.preventDefault();
        try {
            await login(newInput);

            // navigate("/")
        }catch (err){
            setErr(err.response.data);
        }
    };

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
                        <input type={"text"} placeholder={"Username"} name={"name"} onChange={handleChange}/>
                        <input type={"password"} placeholder={"Password"} name={"password"} onChange={handleChange}/>

                        <button onClick={handleSeniorLogin}>Senior Login</button>
                        <button onClick={handleParentLogin}>Parent Login</button>
                        {err && err}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;