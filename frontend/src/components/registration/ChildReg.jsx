import "./childreg.scss";
import {useState} from "react";
import {
    useMutation,
    useQueryClient,
    QueryClient,
} from '@tanstack/react-query'
import {makeRequest} from "../../axios";

const ChildReg =({setChildReg})=>{
    const[inputs,setInputs] = useState({
        name:"",
        age:"",
        gender:"male"
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
        (newChild) => {
            return makeRequest.post("/child", newChild);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                setErr("Success Register");
                queryClient.invalidateQueries(['child']);
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
                <h1>Register Child</h1>
                <form>
                    <label>Child Name</label>
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                    />
                    <label>Age</label>
                    <input
                        type={"number"}
                        min={"1"}
                        max={"30"}
                        name={"age"}
                        onChange={handleChange}
                    />
                    <label>Gender</label>
                    <label className={"radio"}>
                        <input type={"radio"} name={"gender"} value={"male"} onChange={handleChange} defaultChecked/>
                        Boy
                    </label>

                    <label className={"radio"}>
                        <input type={"radio"} name={"gender"} value={"female"} onChange={handleChange}/>
                        Girl
                    </label>

                    <button onClick={handleClick}>Register</button>
                    {err && err}

                </form>
                <button className="close" onClick={ ()=> setChildReg(false) }>
                    close
                </button>
            </div>
        </div>
    )
}
export default ChildReg;