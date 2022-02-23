var Users = [{
    username : "admin",
    password : "admin"
}]

const login = (req, res) =>{
    console.log("Inside Login Post Request");
    console.log("Req Body : ",req.body);

    Users.filter(function(user){
        if(user.username === req.body.username && user.password === req.body.password){
            console.log("inside validate user");
            res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = user;
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end("Successful Login");
        }
        else{
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end("Login Failed. Please enter Valid credentials")
        }
    })
}
module.exports = login;