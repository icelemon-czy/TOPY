import React, {useState} from "react"
import "./seniorregister.scss"
import { Link } from "react-router-dom";
import axios from "axios";

const SeniorRegister = () => {
    const[inputs,setInputs] = useState({
        name:"",
        password:"",
        email:"",
        age:"",
        allergy:"",
        gender:"",
        phone:"",
        address:"",
        ssn:"",
    });

    const[err,setErr] = useState(null);

    const handleChange = (e) =>{
        const v = e.target.name;
        const newInput = inputs;
        newInput[v] = e.target.value;
        setInputs(newInput);
    }

    /**
     * First Pass the Background Check
     * Then register the senior
     */
    const handleClick = async (e) =>{
        e.preventDefault();
        if(inputs.ssn == ""){
            setErr("Please provide SSN and pass the background check!");
            return;
        }
        try {
            const data = await axios.get("http://localhost:8801/api/auth/senior/check", {
                params:{
                    ssn:inputs.ssn,
                }
            }).then(
                (res) => {
                    return res.data;
                }
            );
            if(data == 1){
                setErr("Doesn't pass background check");
                return;
            }
        } catch (err) {
            setErr(err.response.data);
            return;
        }

        try {
            await axios.post("http://localhost:8801/api/auth/senior/register", inputs);
            setErr("Register Success! ");
        } catch (err) {
            setErr(err.response.data);
        }
    }


    return (
        <div className="seniorregister">
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
                    <h1>Senior Register</h1>
                    <form>
                        <input type="text" placeholder="Username" name={"name"} onChange={handleChange}/>
                        <input type="password" placeholder="Password" name={"password"} onChange={handleChange}/>
                        <input type="email" placeholder="Email" name={"email"} onChange={handleChange}/>
                        <input type={"number"} placeholder={"Age"} name={"age"} onChange={handleChange}/>
                        <input type="text" placeholder="Allergy" name={"allergy"} onChange={handleChange}/>
                        <input type="text" placeholder="Gender" name={"gender"} onChange={handleChange}/>
                        <input type="text" placeholder="Phone" name={"phone"} onChange={handleChange}/>
                        <input type="text" placeholder="Address" name={"address"} onChange={handleChange}/>
                        <input type={"number"} placeholder={"SSN for background check"} name={"ssn"} onChange={handleChange}/>
                        {err && err}
                        <button onClick={handleClick}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SeniorRegister;