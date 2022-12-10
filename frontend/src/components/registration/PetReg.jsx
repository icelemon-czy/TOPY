import "./petreg.scss";
import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {makeRequest} from "../../axios";

const PetReg =({setPetReg})=>{
    const[inputs,setInputs] = useState({
        name:"",
        type:"dog",
    });

    const[err,setErr] = useState(null);

    const handleChange = (e) =>{
        const v = e.target.name;
        const newInput = inputs;
        newInput[v] = e.target.value;
        setInputs(newInput);
    }

    // Use Query client
    const queryClient = useQueryClient();

    // Mutations
    const mutation = useMutation(
        (newPet) => {
            return makeRequest.post("/pet", newPet);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                setErr("Success Register");
                queryClient.invalidateQueries(['pet']);
            },
        }
    );

    const handleClick = async (e) => {
        e.preventDefault();
        mutation.mutate(inputs);
    };

    return (
        <div className={"reg"}>
            <div className="wrapper">
                <h1>Register Pet</h1>
                <form>
                    <label>Pet Name</label>
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                    />
                    <label>Pet Type</label>
                    <label className={"radio"}>
                        <input type={"radio"} name={"type"} value={"cat"} onChange={handleChange}/>
                        Cat
                    </label>

                    <label className={"radio"}>
                        <input type={"radio"} name={"type"} value={"dog"} onChange={handleChange} defaultChecked/>
                        Dog
                    </label>

                    <button onClick={handleClick}>Register</button>
                    {err && err}
                </form>
                <button className="close" onClick={ ()=> setPetReg(false) }>
                    close
                </button>
            </div>
        </div>
    )
}
export default PetReg;