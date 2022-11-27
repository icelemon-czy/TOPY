import "./signuptimeslot.scss"
import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {makeRequest} from "../../axios";

const SignUpTimeSlot = ({setOpenSignUp})=> {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = String(today.getFullYear());
    const min_date = yyyy+'-'+mm + '-' + dd ;

    const[inputs,setInputs] = useState({
        year:yyyy,
        month:mm,
        day:dd,
        hours:new Set(),
    });

    const handleDateChange = (e) =>{
        const newDate = e.target.value;
        const newYear = newDate.split("-")[0];
        const newMonth = newDate.split("-")[1];
        const newDay = newDate.split("-")[2];
        const newInput = inputs;
        newInput["year"] = newYear;
        newInput["month"] = newMonth;
        newInput["day"] = newDay;
        setInputs(newInput);
    }

    const handleHourChange = (e)=>{
        const newInput = inputs;
        if(e.target.checked){
            newInput.hours.add(parseInt(e.target.value));
        }else{
            newInput.hours.delete(parseInt(e.target.value));
        }
        setInputs(newInput);
    }

    // Use Query client
    const queryClient = useQueryClient();

    // Mutations
    const mutation = useMutation(
        (newTimeSlot) => {
            return makeRequest.post("/time", newTimeSlot);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(['time']);
            },
        }
    );

    const handleClick = async (e)=> {
        e.preventDefault();
        console.log(inputs.hours.has(14));
        while (inputs.hours.size > 0) {
            const v1 = inputs.hours.values().next().value;
            inputs.hours.delete(v1);
            var start = v1;
            var end = v1;
            while (inputs.hours.size > 0 && inputs.hours.has((start - 1))) {
                start = start - 1;
                inputs.hours.delete(start);
            }
            while (inputs.hours.size > 0 && inputs.hours.has((end + 1))) {
                end = end + 1;
                inputs.hours.delete(end);
            }
            mutation.mutate({year: inputs.year, month: inputs.month, day: inputs.day, start: start, end: (end + 1)});
        }
        setOpenSignUp(false);
    }


    return (
        <div className={"signup"}>
            <div className="wrapper">
                <h1>Sign Up Time Slot</h1>
                <form>
                    <label>Date</label>
                    <input
                        type={"date"}
                        min={min_date}
                        max={"2023-12-31"}
                        defaultValue={min_date}
                        onChange={handleDateChange}
                    />
                    <label>Hours</label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={9} onClick={handleHourChange}/>
                        9 - 10
                    </label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={10} onClick={handleHourChange}/>
                        10 - 11
                    </label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={11} onClick={handleHourChange}/>
                        11 - 12
                    </label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={12} onClick={handleHourChange}/>
                        12 - 13
                    </label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={13} onClick={handleHourChange}/>
                        13 - 14
                    </label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={14} onClick={handleHourChange}/>
                        14 - 15
                    </label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={15} onClick={handleHourChange}/>
                        15 - 16
                    </label>

                    <label className={"checkbox"}>
                        <input type={"checkbox"} name={"checkbox"} value={16} onClick={handleHourChange}/>
                        16 - 17
                    </label>

                    <button onClick={handleClick}>Sign Up</button>
                </form>
                <button className="close" onClick={() =>setOpenSignUp(false) }>
                    close
                </button>
            </div>
        </div>
    )
}

export default SignUpTimeSlot;