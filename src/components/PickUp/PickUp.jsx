import "./pickup.scss";
import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {makeRequest} from "../../axios";
const PickUp=({setOpenPickUp,matches})=> {
    const[inputs,setInputs] = useState({
        matches:new Set(),
    });

    const handleChange = (e)=>{
        const newInput = inputs;
        if(e.target.checked){
            newInput.matches.add(parseInt(e.target.value));
        }else{
            newInput.matches.delete(parseInt(e.target.value));
        }
        setInputs(newInput);
    }

    // Use Query client
    const queryClient = useQueryClient();

    // Mutations
    const mutation = useMutation(
        (matchId) => {
            return makeRequest.delete("/match/parent", {data:{mid:matchId}});
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(['pmatch']);
            },
        }
    );

    const handleClick = async (e)=> {
        e.preventDefault();
        inputs.matches.forEach(mid => {mutation.mutate(mid)});
        setInputs({ matches:new Set()});
        setOpenPickUp(false);
    }

    return (
        <div className={"pickup"}>
            <div className="wrapper">
                <h1>Pick up</h1>
                <form>
                    <label>pick up your child/pet </label>
                    <div>
                        {
                            matches.map((match, i) => (
                                <div className={"list"} key={i}>
                                    <input type={"checkbox"} value={match.mid} onClick={handleChange}/>
                                    <label>{"Match "+(i+1)+": "+match.sName+" is  with " + (match.pName?match.pName:"")+" "+(match.cName&&match.pName?"and ":"")+(match.cName?match.cName:"") +
                                        " at "+match.year+"/"+match.month+"/"+match.day +" from "+ match.start+" to "+match.end}</label>
                                </div>
                            ))
                        }
                    </div>


                    <button type={"submit"} onClick={handleClick}>Confirm</button>
                </form>
                <button className="close" onClick={() => setOpenPickUp(false)}>
                    close
                </button>
            </div>
        </div>
    )
}
export default PickUp;