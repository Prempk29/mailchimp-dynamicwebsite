const express = require("express");
const request = require("request");
const https = require("https");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));



app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})




app.post("/", function (req, res) {
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.mail;
    const data =
    {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_feilds:
                {
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };
    const jsondata = JSON.stringify(data);
    const url = "https://us11.api.mailchimp.com/3.0/lists/c72d970be4";
    const options =
    {
        method: "POST",
        auth: "prempk:0f4f59462189bf342f12935dd450073e-us11"

    }


    const request = https.request(url, options, function (response) {
        if(response.statusCode===200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html")
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
        
    })


    request.write(jsondata)
        request.end();


})
app.post("/failure.html",function(req,res)
{
    res.redirect("/");
})

app.listen(3000, function (req, res) {
    console.log("so the thing is i am working somehow");
})

//0f4f59462189bf342f12935dd450073e-us11 => api key
//list id c72d970be4