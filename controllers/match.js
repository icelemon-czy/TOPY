import {db} from "../connect.js";
import jwt from "jsonwebtoken";

export const getMatches= (req, res) => {
    const seniorId = req.query.sid;
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "(select m.id As mid, Null As pName, name As cName, year,month,day,start,end from `Match` as m ,Child as c where m.sid = ? AND pid  is null AND m.cid = c.id UNION  ALL select m.id As mid, name As pName, Null As cName, year,month,day,start,end from `Match` as m ,Pet as p where m.sid = ? AND cid  is null AND m.pid = p.id) UNION ALl select m.id As mid, p.name As pName, c.name As cName, year,month,day,start,end from `Match` as m,Pet as p, Child as c where m.sid = ? AND pid is not null  AND cid is not null  And pid = p.id AND cid = c.id order by mid ";

        const values =[seniorId,seniorId,seniorId];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
};

export const getPMatches= (req, res) => {
    const parentId = req.query.pid;
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "select mid,s.name As sName,pName,cName,year,month,day,start,end from ((select m.id AS mid, m.sid As sid,name As pName,Null As cName, year,month,day,start,end from Pet as p,`Match` as m where parentId = (?) AND m.pid = p.id AND m.cid is null UNION All select m.id AS mid, m.sid As sid, Null As pName, name As cName, year,month,day,start,end from `Match` as m ,Child as c where parentId = (?)  AND pid  is null AND m.cid = c.id) UNION All select m.id AS mid, m.sid As sid, p.name As pName, c.name As cName, year,month,day,start,end from `Match` as m,Pet as p, Child as c where p.parentId = (?) AND c.parentId=2 AND m.pid is not null  AND m.cid is not null  And pid = p.id AND cid = c.id ) As t , Senior As s where t.sid = s.id";

        const values =[parentId,parentId,parentId];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
};


export const deleteMatch = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        const q = "DELETE FROM `Match` WHERE `id`= (?)";

        const values =[req.body.mid];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0)
                return res.status(200).json("Match has been deleted.");
        });
    });
};

export const addMatch= (req,res)=>{
    const token = req.cookies.accessToken;
    if(!token) return req.status(401).json("Not logged in!");

    // Check token is legal (Not expired)
    jwt.verify(token,"secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");

        const q = "Insert into `Match` (`sid`,`pid`,`cid`,`year`, `month`,`day`,`start`,`end`) Values (?)";

        const values = [
            req.body.sid,
            req.body.pid,
            req.body.cid,
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