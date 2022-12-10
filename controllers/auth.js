import {db} from "../connect.js";
import jwt from "jsonwebtoken";

export const parentRegister =(req,res)=>{
    // Check user if exists
    const q = "SELECT * FROM Parent where name = ?"
    db.query(q,[req.body.name],(err,data)=>{
        if(err) return res.status(500).json(err);
        if(data.length) return res.status(409).json("User already exist");
        // Create a new user
        const q = "INSERT INTO Parent (`name`,`password`,`email`,`age`,`gender`,`phone`,`address`) VALUE (?)";
        const values = [
            req.body.name,
            req.body.password,
            req.body.email,
            req.body.age,
            req.body.gender,
            req.body.phone,
            req.body.address,
        ]
        db.query(q,[values],(err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("User has been created.");
        })
    })
}

export const parentLogin =(req,res)=>{
    // Whether we have the parent user ?
    const q = "SELECT * FROM Parent where name = ?"
    db.query(q,[req.body.name],(err,data)=> {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found");

        // Compare the password
        if(data[0].password != req.body.password) return res.status(400).json("Incorrect Password or Wrong Username");

        const token = jwt.sign({ id: data[0].id }, "secretkey");

        const { password, ...others } = data[0];

        res.cookie("accessToken",token,{
            httpOnly : true,
        }).status(200).json(others);
    })
}

export const seniorRegister =(req,res)=>{
    // Check user if exists
    const q = "SELECT * FROM Senior where name = ?"
    db.query(q,[req.body.name],(err,data)=>{
        if(err) return res.status(500).json(err);
        if(data.length) return res.status(409).json("User already exist");
        // Create a new user
        const q = "INSERT INTO Senior (`name`,`password`,`email`,`age`,`allergy`,`gender`,`phone`,`address`) VALUE (?)";
        const values = [
            req.body.name,
            req.body.password,
            req.body.email,
            req.body.age,
            req.body.allergy,
            req.body.gender,
            req.body.phone,
            req.body.address,
        ]
        db.query(q,[values],(err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("User has been created.");
        })
    })
}

export const seniorLogin =(req,res)=>{
    // Whether we have the parent user ?
    const q = "SELECT * FROM Senior where name = ?"
    db.query(q,[req.body.name],(err,data)=> {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found");

        // Compare the password
        if(data[0].password != req.body.password) return res.status(400).json("Incorrect Password or Wrong Username");

        const token = jwt.sign({ id: data[0].id }, "secretkey");

        const { password, ...others } = data[0];

        res.cookie("accessToken",token,{
            httpOnly : true,
        }).status(200).json(others);
    })
}

export const logout = (req,res) =>{
    res.clearCookie("accessToken",{
        secure:true,
        sameSite:"none"
    }).status(200).json("user log out!");
};

export const check = (req,res) =>{
    const q = "SELECT * FROM BackgroundCheck where SSN = ?"

    db.query(q,[req.query.ssn],(err,data)=> {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.length);
    })
};