import React, {useState} from "react"
import "./parentregister.scss"
import { Link } from "react-router-dom";
// import axios from "axios";

const ParentRegister = () => {
    const[inputs,setInputs] = useState({
        username:"",
        email:"",
        age:"",
        password:"",
        name:"",
    });

    const[err,setErr] = useState(null);

    const handleChange = (e) =>{
        const v = e.target.name;
        const newInput = inputs;
        newInput[v] = e.target.value;
        setInputs(newInput);
    }

    const handleClick = async (e) =>{
        e.preventDefault();
        try {
            //  await axios.post("http://localhost:8800/api/auth/register", inputs);
            setErr(null);
        } catch (err) {
            setErr(err.response.data);
        }
    }


    return (
        <div className="register">
            <div className="card">
                <div className="left">
                    <h1>Welcome TOPY</h1>
                    <p>
                        Are you alone? <br/>
                        Do you need Pet Care Service? <br/>
                        DO you need Child Care Service?
                    </p>
                    <span>Do you have an account?</span>
                    <Link to={"/login"}>
                        <button>Login</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Parent Register</h1>
                    <form>
                        <input type="text" placeholder="Username" name={"username"} onChange={handleChange}/>
                        <input type="password" placeholder="Password" name={"password"} onChange={handleChange}/>
                        <input type="email" placeholder="Email" name={"email"} onChange={handleChange}/>
                        <input type={"number"} placeholder={"Age"} name={"age"} onChange={handleChange}/>
                        <input type="text" placeholder="gender" name={"gender"} onChange={handleChange}/>
                        <input type="text" placeholder="Phone" name={"phone"} onChange={handleChange}/>
                        <input type="text" placeholder="Address" name={"address"} onChange={handleChange}/>
                        <button onClick={handleClick}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ParentRegister;