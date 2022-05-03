const mongoose = require('mongoose'),
    express = require('express'),
    app = express(), 
    path = require('path'),
    fs = require('fs');
    config = require('./config/config.js'),
    session = require('express-session'),
    dotenv = require('dotenv').config(),
    
    monconnect = mongoose.connect(process.env.MONGO_URI);
    var cookieParser = require('cookie-parser');
    // const bodyParser = require('body-parser');
    
    
    
    
    app.set('view engine', 'ejs');
    app.use(express.static(path.join(__dirname,'/public'))); // define root foldder ./public
    app.use(cookieParser());
    app.use(express.urlencoded({extended: true}));
    app.use(express.json())
    // app.use(bodyParser.json());
    app.use(session({
        
        secret:"jsfjkgvnjsdfngbiafjgvkjagbuoh*(&*(&*(&*(",
        resave:true,
        saveUninitialized:true,
        cookie: { maxAge: Number(process.env.SESS_EXPIRY || 60*60*1000)}

    }))
  
    

var JWT_SECRET = process.env.JWT_SECRET || "sdvjknvjk847238947*()*()*nvjkdfnvkjdf";
require('./backend/registerBid.js')(app);
require('./backend/forgetPw.js')(app);
require('./backend/contactInfo.js')(app);
require('./backend/resetPw.js')(app);
require('./backend/login.js')(app);
require('./backend/register.js')(app);
require('./backend/bid.js')(app);
require('./backend/checkSchedule.js')();
require('./backend/newQuestion.js')(app)
require('./backend/newAnswer.js')(app)
const requireAuth = require('./middleware/authMiddleware')
const noAuth = require('./middleware/noAuthMiddleware')
const regBuy = require('./middleware/regBuyMiddleware')


var registerCar = require('./routes/registerCar.js');
var auth = require('./routes/auth.js');
var router = require('./routes/routes.js');
var user = require('./routes/user');
var pindex = require('./routes/register');
var auction = require('./routes/auction');


app.use('/auction', auction);
app.use('/register-car',requireAuth, registerCar);
app.use('/auth', noAuth, auth);
app.use('/register-bid', regBuy, pindex);
app.use('/user', requireAuth, user);
app.use('/',router);


    
const sslOption = {
    key:fs.readFileSync('./cert/key.pem'),
    cert : fs.readFileSync('./cert/cert.pem')
}

app.set('port',9000);
const http = require('http');

const server = http.createServer(app);
const io = require('socket.io')(server);
require('./socket/socket.js')(io);

server.listen(app.get('port'), function() {
    console.log('Biddee is working on port'+app.get('port'));
})