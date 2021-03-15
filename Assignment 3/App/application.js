const express = require('express');
const mongoose = require('mongoose');
require("./Database/conn");
const Student = require("./Schema/student");
const app = express();

const port = process.env.PORT || 8000;



app.use(express.json());


app.post("/students", function (req, res) {
    console.log(req.body);
    const user = new Student(req.body);

    user.save().then(function () {
        res.send(user);
    }).catch(function (e) {
        res.status(400).send(e);
    })
})


app.get("/students", async (req, res) =>{
    try {
        const studentsData = await Student.find();
        res.send(studentsData);
    } catch (e) {
        res.send(e);
    }
})

app.get("/students/:id", async(req,res) => {
    try{
        const id = req.params.id;

       const studentData= await Student.findById(id);
        res.send(studentData);
    }
    catch(e) {
        res.send(e);
    }
})


app.patch("/students/:name", async (req, res) => {
    try {
        const id = req.params.name;
        const updating = await Student.findByIdAndUpdate(id, req.body, {
            new: true
        });
        res.send(updating);
    }
    catch (e) {
        res.send(e);
    }
})
app.delete("/students/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deleting=await Student.findByIdAndDelete(id);
        if (!req.params.id) {
            return res.send(400).send();
        }
        res.send(deleting);
    } catch (e) {
        res.status(500).send(e);
    }
})



app.listen(port, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT 8000");
})