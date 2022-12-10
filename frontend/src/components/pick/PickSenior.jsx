import "./picksenior.scss"
import {useState} from "react";
import axios from "axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {makeRequest} from "../../axios";

const SeniorPick =({setMatchSenior,setOpenPickSenior,setOpenSuccessPage,seniors,matchInfo})=>{
    const[selectedSenior,setSenior] = useState(null);
    const [err,setErr] = useState(null);

    // Use Query client
    const queryClient = useQueryClient();

    // Add Mutations - add timeslot
    const mutation = useMutation(
        (newTimeSlot) => {
            return makeRequest.post("/time/parent", newTimeSlot);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(['time']);
            },
        }
    );

    // Delete Mutations -delete timeslot
    const delMutation = useMutation(
        (timeSlotId) => {
            return makeRequest.delete("/time/parent", {data:{id:timeSlotId}});
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(['time']);
            },
        }
    );

    // Match Mutation - add match
    const matchMutation = useMutation(
        (newMatch) => {
            return makeRequest.post("/match", newMatch);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(['pmatch']);
            },
        }
    );

    const handleChange = (e)=>{
        setSenior(e.target.value);
        for(var i = 0;i<seniors.length;i++){
            if(seniors[i].sid == parseInt( e.target.value )){
                setMatchSenior(seniors[i].name);
            }
        }
    };

    const handleClick = async (e)=>{
        e.preventDefault();
        if(selectedSenior == null){
            setErr("Must pick one senior");
            return;
        }
        // Get TimeSlot id and type
        try {
            const data = await axios.get("http://localhost:8801/api/time/pick", {
                params: {
                    sid:selectedSenior,
                    year: matchInfo.year,
                    month: matchInfo.month,
                    day: matchInfo.day,
                    start: matchInfo.start,
                    end: matchInfo.end+1,
                },
                withCredentials:true,
            }).then(
                (res) => {
                    return res.data;
                }
            );

            let tid = data[0].id;
            let type = data[0].type;
            let start = data[0].start;
            let end = data[0].end;
            // Delete the original time slot
            delMutation.mutate(tid);
            // Add to the Match
            matchMutation.mutate({
                sid: selectedSenior,
                pid: matchInfo.pet,
                cid :matchInfo.child,
                year: matchInfo.year,
                month: matchInfo.month,
                day: matchInfo.day,
                start: matchInfo.start,
                end: matchInfo.end+1,
            });


            // Pet   (TimeSlot 0 or 1)
            // Child (TimeSlot 0 or 2)
            // Then add new timeslot
            // Case 1 Pet is null
            if(matchInfo.pet == null){
                if(type ==0){
                    mutation.mutate({
                        sid: selectedSenior,
                        type: 1,
                        year: matchInfo.year,
                        month: matchInfo.month,
                        day: matchInfo.day,
                        start: start,
                        end: end,
                    });
                }
                if(matchInfo.start == start){
                    // Nothing to do
                }else{
                    mutation.mutate({
                        sid: selectedSenior,
                        type: 2,
                        year: matchInfo.year,
                        month: matchInfo.month,
                        day: matchInfo.day,
                        start: matchInfo.start,
                        end: start,
                    });
                }

                if(matchInfo.end+1 == end){
                    // Nothing to do
                }else{
                    // end > match end+1
                    mutation.mutate({
                        sid: selectedSenior,
                        type: 2,
                        year: matchInfo.year,
                        month: matchInfo.month,
                        day: matchInfo.day,
                        start: matchInfo.end+1,
                        end: end,
                    });
                }

                setOpenPickSenior(false);
                setOpenSuccessPage(true);
                return;
            }

            // Case 2 Child is null
            if(matchInfo.child == null){
                if(type == 0){
                    mutation.mutate({
                        sid: selectedSenior,
                        type: 2,
                        year: matchInfo.year,
                        month: matchInfo.month,
                        day: matchInfo.day,
                        start: start,
                        end: end,
                    });
                }
                if(matchInfo.start == start){
                    // Nothing to do
                }else{
                    mutation.mutate({
                        sid: selectedSenior,
                        type: 1,
                        year: matchInfo.year,
                        month: matchInfo.month,
                        day: matchInfo.day,
                        start: matchInfo.start,
                        end: start,
                    });
                }

                if(matchInfo.end+1 == end){
                    // Nothing to do
                }else{
                    // end > match end+1
                    mutation.mutate({
                        sid: selectedSenior,
                        type: 1,
                        year: matchInfo.year,
                        month: matchInfo.month,
                        day: matchInfo.day,
                        start: matchInfo.end+1,
                        end: end,
                    });
                }
                setOpenPickSenior(false);
                setOpenSuccessPage(true);
                return;
            }

            // Case 3 Child and pet both are picked
            if(matchInfo.start == start){
                // Nothing to do
            }else{
                mutation.mutate({
                    sid: selectedSenior,
                    type: 0,
                    year: matchInfo.year,
                    month: matchInfo.month,
                    day: matchInfo.day,
                    start: matchInfo.start,
                    end: start,
                });
            }

            if(matchInfo.end+1 == end){
                // Nothing to do
            }else{
                // end > match end+1
                mutation.mutate({
                    sid: selectedSenior,
                    type: 0,
                    year: matchInfo.year,
                    month: matchInfo.month,
                    day: matchInfo.day,
                    start: matchInfo.end+1,
                    end: end,
                });
            }

            setOpenPickSenior(false);
            setOpenSuccessPage(true);

        }catch (err){
            setErr(err);
        }
    }

    return (
        <div className={"pick"}>
            <div className="wrapper">
                <h1>Match a senior</h1>
                <form>
                    <label>Pick a senior</label>
                    <div className={"senior"}>
                    {
                        seniors.map((senior,i)=>(
                            <div className={"pair"} key={i}>
                                <input type={"radio"} name={"senior"} value={senior.sid} onChange={handleChange}/>
                                <label className={"radio"}>
                                    {senior.name}
                                </label>
                            </div>
                        ))
                    }
                    </div>
                    {err && err}
                    <button onClick={handleClick}>Confirm</button>
                </form>
                <button className="close" onClick={ ()=> setOpenPickSenior(false) }>
                    close
                </button>
            </div>
        </div>
    )
}
export default SeniorPick;