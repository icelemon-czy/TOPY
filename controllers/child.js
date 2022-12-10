import {db} from "../connect.js";
import jwt from "jsonwebtoken";
export const getChildren = (req, res) => {
    const parentId = req.query.pid;
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = `Select * from Child where parentId = ?`;

        const values =[parentId];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
};

export const addChild= (req,res)=>{
    const token = req.cookies.accessToken;
    if(!token) return req.status(401).json("Not logged in!");

    // Check token is legal (Not expired)
    jwt.verify(token,"secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");

        const q = "Insert into Child (`parentId`,`age`,`gender`,`name`) Values (?)";

        const values = [
            userInfo.id,
            req.body.age,
            req.body.gender,
            req.body.name,
        ];

        db.query(q,[values],(err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("Child has been created!");
        })

    })
}