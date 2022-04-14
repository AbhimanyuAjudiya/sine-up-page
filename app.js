
const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const https = require("https");
const { write } = require("fs");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    const firstName = req.body.fname;
    const lastNamr = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastNamr
                }
            }
        ]
    };

    const jsoneData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/4bcf3cbb34";

    const options = {
        method : "POST",
        auth : "Abhimanyu1:e187a95dc7cda4fca1bdb9892ee69b82-us14"
    }

    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    
    request,write(jsoneData);
    request.end();

});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port no: 3000.");
});


// My API Key 
// e187a95dc7cda4fca1bdb9892ee69b82-us14