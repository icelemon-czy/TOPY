import "./successpage.scss"
import {Fireworks} from "@fireworks-js/react";
import React from "react";
const SuccessPage=({setOpenSuccessPage,match,senior,petList,childList})=>{
    // Conversion
    //const pName = match
    const getCName = ()=>{
        if(match.child!= null) {
            for (var k = 0; k < childList.length; k++) {
                if (childList[k].id == parseInt(match.child)) {
                    return childList[k].name;
                }
            }
        }
        return null;
    }
    const getPName = ()=>{
        if(match.pet!= null) {
            for (var k = 0; k < petList.length; k++) {
                if (petList[k].id == parseInt(match.pet)) {
                    return petList[k].name;
                }
            }
        }
        return null;
    }
    const cName = getCName();
    const pName = getPName();
    return (
        <div className={"success"}>
            <div className="wrapper">
                <h1>
                     Congratulations!
                </h1>
                <p>
                    You have successfully register {cName} {cName &&pName && "and"} {pName} <br />
                    with {senior} from {match.start} to {match.end+1} at {" "+match.year+"/"+match.month+"/"+match.day}
                </p>
                <Fireworks
                    options={{
                        rocketsPoint: {
                            min: 0,
                            max: 100
                        }
                    }}
                    style={{
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        position: 'fixed',
                        background: "transparent"
                    }}
                />
                <button className="close" onClick={ ()=> setOpenSuccessPage(false) }>
                    close
                </button>
            </div>
        </div>
    )
}
export default SuccessPage;