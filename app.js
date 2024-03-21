const express = require('express');
const session = require('express-session');
const nocache = require('nocache');

// express app
const app = express();

//nocache middleware
app.use(nocache())

//making files public
 app.use(express.static('public'))

// view engine embbeded js
app.set('view engine', 'ejs') 

//listening requests
app.listen(3000)

//middleware 
app.use(express.urlencoded({extended:true}))

// session middleware
app.use(session({
    secret:'key that will sign cookie',  
    resave:false,
    saveUninitialized:false,   
}))


app.get('/',(req,res)=>{
    // console.log(req.body,'........')
    if(req.session.isAuth){
        res.redirect('/home')
    }else{
         res.redirect('/login')
    } 

})

app.get('/login',(req,res)=>{
    if(req.session.isAuth){
        res.redirect('/home')

    }else{
        const message = req.session.error
        res.render('login',{msg:message})
    }
})

const data = { user:'nikhil' , pass: '1234'}

app.post('/login',(req,res)=>{  
    
    //  console.log(req.body)
    if( data.user === req.body.name && data.pass === req.body.password){
        // res.render('home',{myName : req.body.name})
        req.session.isAuth = true;
        res.redirect('/') 
    }else{
        req.session.error = "Invalid Credentials"
        res.redirect('/login')
    }
})

app.get('/home',(req,res)=>{
    if(req.session.isAuth){
        res.render('home')
    }else{
        res.redirect('/')
    }
})
app.get('/logout',(req,res)=>{
     req.session.destroy()
    //  console.log(data.user);
     res.redirect('/')
})
