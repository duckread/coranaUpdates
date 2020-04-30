const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require('body-parser');
const axios = require('axios').default;
const _ = require("lodash");
const {getCode,getName} = require('country-list');


let url = "https://covid.mathdro.id/api/countries/India";
let dataFeatched ={};
let countryName = "India";
var pass;
let code = "IN"



app.set('view engine' , 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));








app.get("/" ,function(req,res){


axios.get(url)
.then(function(response){
  dataFeatched = response.data
  res.render("home", {data:dataFeatched,countryName:countryName,code:code})
})
.catch(function(err){
  console.log("Error")
});

});



app.post("/",function(req,res){

  let country = req.body.country;
   countryName = _.startCase(country);

   _.size(countryName)>3 ? code = getCode(countryName) : code = _.toUpper(countryName) ;

   url = "https://covid.mathdro.id/api/countries/"+countryName;


  axios.get(url)
  .then(function(response){
    dataFeatched = response.data
    res.render("home", {data:dataFeatched,countryName:countryName,code:code})

  })
  .catch(function(err){
    res.render("error")
    url="https://covid.mathdro.id/api/countries/India"
    countryName="India"
    code="IN"
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
