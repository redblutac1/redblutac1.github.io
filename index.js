const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/main',function(req,res){
  res.sendFile(path.join(__dirname+'/main.html'));
});

router.get('/prog',function(req,res){
  res.sendFile(path.join(__dirname+'/prog.html'));
});

app.use("/pages",express.static(__dirname + '/pages'));
app.use("/scripts",express.static(__dirname + '/scripts'));

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000')