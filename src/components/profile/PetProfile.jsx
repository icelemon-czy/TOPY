import "./petprofile.scss"

const PetProfile=({setOpenPetProfile,pet})=> {
    return (
        <div className={"prof"}>
            <div className="wrapper">
                <h1>Pet Profile</h1>

                <label> Name : {pet.name}</label>
                <label> Pet Type : {pet.type}</label>

                <button className="close" onClick={() => setOpenPetProfile(false)}>
                    close
                </button>
            </div>
        </div>
    )
}
export default PetProfile;