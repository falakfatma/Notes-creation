const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')
// app.set('views', path.join(__dirname, 'views'))
app.get("/",(req,res)=>{
    fs.readdir('./notes',(err,files)=>{
        if(err){
            console.log(err)
        }
    res.render("index",{files:files})  
    console.log("files",files)
    })
})
app.get("/file/:filename",(req,res)=>{
    fs.readFile(`./notes/${req.params.filename}`,'utf-8',(err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.render("file",{data:data, pathname:req.params.filename})
        }
    })
})
app.get("/edit/:pathname",(req,res)=>{
    res.render("create",{pathname:req.params.pathname})
})

app.post("/edit",(req,res)=>{ 
    fs.rename(`./notes/${req.body.previous}`, `./notes/${req.body.new}`,(err)=>{
        if(err){
            console.log(err)
        }
        res.redirect('/')
    })
})

app.post("/create",(req,res)=>{ 
    fs.writeFile(`./notes/${req.body.name.split(' ').join('')}.txt`, req.body.details,(err)=>{
        if(err){
            console.log(err)
        }
        res.redirect('/')
    })
})
app.listen(3000)