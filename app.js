let express              = require('express');
let bodyParser           = require('body-parser');
let mysqlConnect         = require('./connection/mysql');
let mongoConnect         = require('./connection/mongo');

let tweetValiador        = require('./validator/twitterValidator');
let tweetController      = require('./controller/twitterController');
let userController       = require('./controller/userController');
let userValidator        = require('./validator/userValidator');

let app = express();
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

app.post('/user_signup',   userValidator.userSignup,    userController.userSignup);
app.post('/user_login',   userValidator.userLogin,    userController.userLogin);
app.post('/retrieve_tweet',   tweetValiador.retriveTweet,   tweetController.retrivePost);
app.post('/search_tweet', tweetValiador.searchTweet,   tweetController.searchTweet);
app.post('/get_favorite_tweet', tweetValiador.getFavoritesTweets,   tweetController.getFavoritesTweets);

let server = require('http').createServer(app);
let PORT = 3000 || process.env.PORT

server.listen(PORT,()=>{
    mysqlConnect.connect();
    mongoConnect.start_con();
    console.log("the server is listening on .......",PORT);
})