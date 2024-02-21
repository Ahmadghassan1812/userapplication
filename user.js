const { json } = require('body-parser');
const express = require('express')
var app= express();
var fs=require('fs')

app.get('/',function(req,res){
    res.send("Start my server")
})
app.get('/listusers', function (req,res)
  {
res.send("list users")
  })
  app.get('/user/:id',function(req,res){
    if(req.params.id>0 && req.params.id<4){
    
        var data = fs.readFileSync(__dirname+"/users.json")
        data= JSON.parse(String(data))
        console.log(data)
        var user = data['user'+req.params.id]
        console.log(user)
        res.send(user)
    }
    else
    {
        res.send("user id error")
    }
    }
  )
  app.delete('/deletuser/:id',function(req,res)
  {
    var data = fs.readFileSync(__dirname+"/users.json")
    data= JSON.parse(String(data))
    delete data['user'+req.params.id]
    res.send(data)
  })
  var bodyParser= require('body-parser')
var urlEncoded= bodyParser.urlencoded({extended:false})
app.get('/form', function(req,res){
    res.sendFile(__dirname+"/form.html")
}
)
app.post('/addUser', urlEncoded,function(req,res) 
{
    var newUser={name:"", password:"", profession:""}
    newUser.name=req.body.name
    newUser.password=req.body.password
    newUser.profession=req.body.profession
    var data= fs.readFileSync(__dirname+"/users.json") 
    data= JSON.parse(String(data))
    data['user4']= newUser
    res.send(data)
})
  var server=app.listen(9000,function()
{
    var host = server.address().address
    var port = server.address().port
})