import {db} from "../connect.js";
import jwt from "jsonwebtoken";
export const getTimeSlots= (req, res) => {
    const seniorId = req.query.sid;
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = `Select * from TimeSlot where sid = (?) order by year,month,day,start`;

        const values =[seniorId];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
};

export const addTimeSlot= (req,res)=>{
    const token = req.cookies.accessToken;
    if(!token) return req.status(401).json("Not logged in!");

    // Check token is legal (Not expired)
    jwt.verify(token,"secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");

        const q = "Insert into TimeSlot (`sid`,`type`,`year`,`month`,`day`,`start`,`end`) Values (?)";

        const values = [
            userInfo.id,
            0,
            req.body.year,
            req.body.month,
            req.body.day,
            req.body.start,
            req.body.end,
        ];

        db.query(q,[values],(err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("Time Slot has been created!");
        })

    })
}

export const getPC= (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return req.status(401).json("Not logged in!");

    // Check token is legal (Not expired)
    jwt.verify(token,"secretkey", (err, userInfo) => {
        const childId = req.query.child;
        const petId = req.query.pet;
        const year = req.query.year;
        const month = req.query.month;
        const day = req.query.day;
        const start = req.query.start;
        const end = req.query.end;

        const q = `select name,sid from Senior, (select distinct sid from TimeSlot where type = 0 AND year = (?) AND month =(?) AND Day = (?) AND start <= (?) AND end >= (?)) AS t where Senior.id = t.sid AND Senior.allergy != (select type from pet where id = (?)) `;

        const values =[year,month,day,start,end,petId];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    })
};

// Child is null TimeSlot = 0 or 1
export const getP= (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return req.status(401).json("Not logged in!");

    // Check token is legal (Not expired)
    jwt.verify(token,"secretkey", (err, userInfo) => {
        const petId = req.query.pet;
        const year = req.query.year;
        const month = req.query.month;
        const day = req.query.day;
        const start = req.query.start;
        const end = req.query.end;

        const q = `select name,sid from Senior, (select distinct sid from TimeSlot where type != 2 AND year = (?) AND month =(?) AND Day = (?) AND start <= (?) AND end >= (?)) AS t where Senior.id = t.sid AND Senior.allergy != (select type from pet where id = (?)) `;

        const values =[year,month,day,start,end,petId];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    })
};

export const getC= (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return req.status(401).json("Not logged in!");

    // Check token is legal (Not expired)
    jwt.verify(token,"secretkey", (err, userInfo) => {
        const childId = req.query.child;
        const year = req.query.year;
        const month = req.query.month;
        const day = req.query.day;
        const start = req.query.start;
        const end = req.query.end;

        const q = `select name,sid from Senior,(select distinct sid from TimeSlot where type != 1 AND year = (?) AND month =(?) AND Day = (?) AND start <= (?) AND end >= (?)) AS t where Senior.id = t.sid`;

        const values =[year,month,day,start,end];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    })
};

export const getPick= (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return req.status(401).json("Not logged in!");

    // Check token is legal (Not expired)
    jwt.verify(token,"secretkey", (err, userInfo) => {
        const sid= req.query.sid;
        const year = req.query.year;
        const month = req.query.month;
        const day = req.query.day;
        const start = req.query.start;
        const end = req.query.end;

        const q = `select id,type,start,end from TimeSlot where sid = (?) AND year = (?) And month=(?) AND day=(?) AND start<=(?) AND end >= (?)`;

        const values =[sid,year,month,day,start,end];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    })
};

export const addTimeSlotParent= (req,res)=>{
    const token = req.cookies.accessToken;
    if(!token) return req.status(401).json("Not logged in!");

    // Check token is legal (Not expired)
    jwt.verify(token,"secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");

        const q = "Insert into TimeSlot (`sid`,`type`,`year`,`month`,`day`,`start`,`end`) Values (?)";

        const values = [
            req.body.sid,
            req.body.type,
            req.body.year,
            req.body.month,
            req.body.day,
            req.body.start,
            req.body.end,
        ];

        db.query(q,[values],(err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("Time Slot has been created!");
        })

    })
}

export const deleteTimeSlotParent = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        const q = "DELETE FROM TimeSlot WHERE `id`= (?)";

        const values =[req.body.id];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0)
                return res.status(200).json("Match has been deleted.");
        });
    });
};