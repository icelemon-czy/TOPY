import "./childprofile.scss";

const ChildProfile=({setOpenChildProfile,child})=>{
    return (
        <div className={"prof"}>
            <div className="wrapper">
                <h1>Child Profile</h1>
                <label> Name : {child.name}</label>
                <label>Age : {child.age}</label>
                <label>Gender : {child.gender == 0 ? "Boy" : "Girl"}</label>
                <button className="close" onClick={ ()=> setOpenChildProfile(false) }>
                    close
                </button>
            </div>
        </div>
    )
}
export default ChildProfile;