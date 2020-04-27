const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require('body-parser');
const axios = require('axios').default;
const _ = require("lodash");
let url = "https://covid.mathdro.id/api/countries/India";
let dataFeatched ={};

app.set('view engine' , 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));








app.get("/" ,function(req,res){


axios.get(url)
.then(function(response){
  dataFeatched = response.data
  res.render("home", {data:dataFeatched})
})
.catch(function(err){
  console.log("Error")
});


});

app.post("/",function(req,res){
   country = req.body.country;
   country = _.capitalize(country);
   url = "https://covid.mathdro.id/api/countries/"+country;

  axios.get(url)
  .then(function(response){
    dataFeatched = response.data
    res.render("home", {data:dataFeatched})
    console.log("Data Featched")
  })
  .catch(function(err){
    console.log("Error")
  });


})


app.get("/contact", function(req,res){
  res.render("contact");
})

app.get("/about", function(req,res){
  res.render("about");
})







app.listen(process.env.PORT || 3000, function(req,res){
  console.log("Server Started At 3000");
})
