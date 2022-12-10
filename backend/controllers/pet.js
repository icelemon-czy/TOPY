import {db} from "../connect.js";
import jwt from "jsonwebtoken";
export const getPets = (req, res) => {
    const parentId = req.query.pid;
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = `Select * from Pet where parentId = ?`;

        const values =[parentId];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
};

export const addPet= (req,res)=>{
    const token = req.cookies.accessToken;
    if(!token) return req.status(401).json("Not logged in!");

    // Check token is legal (Not expired)
    jwt.verify(token,"secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");

        const q = "Insert into Pet (`parentId`,`type`,`name`) Values (?)";

        const values = [
            userInfo.id,
            req.body.type,
            req.body.name,
        ];

        db.query(q,[values],(err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("Pet has been created!");
        })

    })
}