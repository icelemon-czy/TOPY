import express from "express"
import authRoutes from "./routes/auth.js"
import childRoutes from "./routes/child.js"
import petRoutes from "./routes/pet.js"
import timeRoutes from "./routes/timeslot.js"
import matchRoutes from "./routes/match.js"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

//middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/child",childRoutes);
app.use("/api/pet",petRoutes);
app.use("/api/time",timeRoutes);
app.use("/api/match",matchRoutes);

app.listen(8801,()=>{
    console.log("Connected to backend!")
})