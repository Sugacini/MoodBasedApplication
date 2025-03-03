const express = require("express");
const app = express();
let path = require("path");
const mysql = require("mysql2");
const cors=require("cors");
// const stream = require("/emotion.js")
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "your_password1",
    database: "Emotions",
});

var allEmotion={
    happy: [109815423, 889114311, 109817676, 811267800, 76182059, 1219741136, 1139646951, 3573131, 1219737630],
    sad: [804092154, 841396707, 901722501, 154637590, 1080860547, 61387835, 1219740946, 811267576, 782470134],
    surprised: [1026391929, 1219737282, 889114311, 1133105280, 901723301, 742996492, 232420590, 898714584, 76293059],
    angry: [901722501, 789168950, 2721785, 516290971, 31211088, 81077086, 790274287, 80577755, 792884617],
    neutral: [810778, 1215078716, 897292996, 80802063, 83735561, 67691546, 799958976, 80203835, 838067360],
    disgust: [154338787, 109118539, 1098155077, 83409616, 215424181, 792556286, 221835210, 837803163, 767974807],
    fear: [4770633, 858957013, 79752572, 85233911, 793219647, 47119659, 696047329, 84621025, 79785694 ],
}

// var foodId = [52767, 52792, 52803, 52807, 52812, 52824, 52826, 52834, 52842, 52848, 52855, 52873, 52874, 52878, 52891, 52894, 52904, 52913, 52914, 52928, 52940, 52952, 52959, 52961, 52965, 52979, 52995, 52997, 53013, 53018, 53036, 53053, 53060, 53068, 53069, 53070, 53071, 53076, 53078, 53080]
var foodId = [[52770, 52771, 52784, 52793, 52797, 52817, 52823, 52833, 52836, 52849, 52866, 52872], [52881, 52883, 52886, 52889, 52911, 52925, 53016, 52928, 52940, 52952, 52850, 53011], [52931, 52935, 52936, 52949, 52953, 52960, 52962, 52963, 52964, 52980, 52981, 52982], [52994, 53005, 53008, 53023,53028, 53040, 53076, 52807, 52795, 52785, 52826, 52868], [52805, 53054, 52808, 52865, 52851,53065,53067, 52809, 52964, 52806, 53082, 52903]]

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');



const pubDir = path.join(__dirname, "/public");
app.use(express.static(pubDir));


app.use(cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
}));


// connection.connect((err) =>{
//     if(err){
//         console.log("Error",err);
//     }
//     else{
//         console.log("connected Mysql");
//     }
// })

connection.connect((err) =>{
    if(err){
        console.log("Error",err);
    }
    else{
        console.log("connected Mysql");
        connection.query('create database if not exists UnarvAI;');
        connection.query('use UnarvAI;');
        connection.query('create table if not exists UnarvAIUsers(IdNumber int primary key auto_increment,userId varchar(100) , userName varchar(100), password varchar(100));');
    }
})

app.get("/",(req,res)=>{
    res.send("success")
})

app.post("/userIdCheck",(req,res)=>{
    var userId = req.body.userId
    console.log(userId);
    
    connection.query('select count(*) as total from UnarvAIUsers where userId = ?',[userId], (err,result) => {
        console.log('yes');
        if(!err){
            res.status = 200;
            console.log(result);
            
            console.log(result[0].total);
            
            console.log(result[0].total==0);
            
            res.send(result[0].total==0);
        }
        else{
            console.log("Throw error", err);
        }
    })
})

app.post("/addAccount",(req,res)=>{
    var userId = req.body.userId;
    var password = req.body.password;
    var userName = req.body.userName;
    console.log(password);
    
    connection.query('insert into UnarvAIUsers (userId, userName, password) values (?,?,?)',[userId, userName, password], (err,result) => {
        if(!err){
            res.status = 200;
            res.send("added succesfully");
        }
        else{
            console.log("Throw error", err);
        }
    })
})

app.post('/isValidUser',(req,res)=>{
    var userId = req.body.userId;
    var password = req.body.password;
    connection.query('select count(*) as total from UnarvAIUsers where userId = ? and password = ? ;',[userId, password], (err,result) => {
        if(!err){
            res.status = 200;
            res.send(result[0].total==1);
        }
        else{
            console.log("Throw error", err);
        }
    })
})

app.get("/video", (req, res) => {
    // let videoAns = stream.getLocalStream();
    console.log(videoAns);
    res.send(videoAns);
})

app.get("/addUser",(req,res)=>{
    connection.query("select userUniqueId,password from users", (err,result) => {
        console.log('yes');
        
        if(!err){
            res.status = 200;
            console.log(result);
            res.send(result);
        }
        else{
            console.log("Throw error", err);
        }
    })
})

app.post("/newUser", (req, res) => {
    console.log(req.body);
    let {userName, userPass, userEmail} = req.body;
    console.log("Data", userName)
    try{
        connection.query("insert into users(userName, password, userUniqueId) values(?,?,?)", [userName, userPass, userEmail], (err, result) => {
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        })
    }
    catch(err){
        console.log("Error", err);
    }
})

app.post('/emotions',async (req,res)=>{
    // console.log(req.body);
    
    var emotion=req.body.emotion;
    var albumIds=allEmotion[emotion];
    var response;
    var responseData;

    try {
        var responses=await Promise.all(
            albumIds.map(async (albumId) => {
                try {
                    response = await fetch('https://saavn.dev/api/playlists?id='+albumId);
                    responseData= await response.json();
                    return responseData;
                } catch (error) {
                    console.log(error);
                    return null
                }
            })
        )

        responses=responses.filter((res)=>res!=null)
        // console.log(responses);
        
        res.send(responses);    

    } catch (error) {
        console.log(error);   
    }

})

app.put("/updateJournal",(req,res)=>{
    let {userId, date, time, content,id} = req.body;
    connection.query("update Journals set content = ? where journalId = ?", [content, id], (error, results) => {
        if(error){
            console.log(error);
        }
        else{
            res.status = 200;

            res.send('added');
        }
    })  
})

app.get("/deleteJournal",(req,res)=>{
    var {id} = req.query;
    console.log(req.query);
    
    connection.query("delete from Journals where journalId = ?", [id], (error, results) => {
        if(error){
            console.log(error);
        }
        else{
            console.log('deleted');
            
            res.status = 200;

            res.send('deleted');
        }
    })  
})

app.put("/addJournal", (req, res) => {
    console.log(req.body);
    let {userId, date, time, content} = req.body;
    var userNum;
    console.log("userId : ", content)
    try{
        connection.query("select IdNumber from UnarvAIUsers where userId = ?", [userId], (err, result) => {
            if(err){
                console.log(err);
            }
            else{
                connection.query("create table if not exists Journals (journalId int primary key auto_increment, userIdNum int, content text, date DATE, time varchar(8), foreign key (userIdNum) references UnarvAIUsers(IdNumber) on delete cascade)", (error, response) => {
                    if(error){
                        console.log(error);
                    }
                    else{
                        userNum = result[0].IdNumber;
                        // console.log(userNum);
                        connection.query("insert into Journals (userIdNum, content, date, time) values (?,?,?,?)", [userNum, content, date, time.trim()], (error, results) => {
                            if(error){
                                console.log(error);
                            }
                            else{
                                res.status = 200;

                                res.send('added');
                                // console.log(results);                                        
                            }
                        })                            
                    }
                })   
                          
            }
        })
    }
    catch(err){
        console.log("Error", err);
    }
})

app.get("/prevJournals",(req,res)=>{
    var {userId}=req.query
    console.log("userId : ",userId);
    connection.query("select IdNumber from UnarvAIUsers where userId = ?", [userId], (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(result[0].IdNumber);
            var userNum=result[0].IdNumber;
            connection.query("select * from Journals where userIdNum = ?", [userNum], (err, response) => {
                if(err){
                    console.log(err);
                }
                else{
                    res.send(response);   
                }
            })
        }
    })
    
})

app.get("/food", async (req, res) => {
    let res1;
    let result;
    let randomNum = Math.floor(Math.random() * 5);
    console.log(randomNum);
    let foodIdArr = foodId[randomNum]
    // console.log(res);
    try{
        var resData = await Promise.all(
            foodIdArr.map( async (foodIds) => {
                console.log(foodIds);
            try{
                result = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i="+foodIds);
                res1 = await result.json();
                // console.log(res1);
                // res.send(res1);
                return res1;
            }
            catch(err){
                console.log(err);
            }
        })
        )
        resData = resData.filter((res2) => res2!=null)
        console.log(resData);
        res.send(resData);
    }catch(err){
        console.log(err);
    }
    
})

app.post("/singleFoodDetail", async (req, res) => {
    console.log(req.body);
    try{
        let result1 = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i="+req.body.id);
        let res2 = await result1.json();
        res.send(res2);
        return res2;
    }
    catch(err){
        console.log(err);
    }
})

app.post("/getBooks", async(req, res) => {
    console.log(req.body);
    try{
        let res1 = await fetch("https://www.googleapis.com/books/v1/volumes?q="+req.body.emo);
        let response1 = await fetch("https://www.googleapis.com/books/v1/volumes?q=happy");
        let res2 = await res1.json();
        let response2 = await response1.json();
        let resArr = [...res2.items, ...response2.items]
        console.log(res2.items);
        res.send(resArr);
    }
    catch(err){
        console.error(err);
    }
})

app.post("/getBookById", async (req, res) => {
    console.log(req.body);
    try{
        let response = await fetch("https://www.googleapis.com/books/v1/volumes/"+req.body.bookId);
        let response1 = await response.json();
        console.log(response1);
        res.send(response1)
    }
    catch(err){
        console.error(err);
    }
})

app.put("/userEntry",(req,res)=>{
    console.log(req.body);
    let {userId, date, time, mood} = req.body;
    var userNum;
    console.log("userId : ", userId)
    try{
        connection.query("select IdNumber from UnarvAIUsers where userId = ?", [userId], (err, result) => {
            if(err){
                console.log(err);
            }
            else{
                connection.query("create table if not exists UserLogs (entryId int primary key auto_increment, userNumId int, mood varchar(15), date DATE, time varchar(8), foreign key (userNumId) references UnarvAIUsers(IdNumber) on delete cascade)", (error, response) => {
                    if(error){
                        console.log(error);
                    }
                    else{
                        userNum = result[0].IdNumber;
                        connection.query("insert into UserLogs (userNumId, mood, date, time) values (?,?,?,?)", [userNum, mood, date, time], (error, results) => {
                            if(error){
                                console.log(error);
                            }
                            else{
                                res.status = 200;

                                res.send('added');
                            }
                        })                            
                    }
                })   
                          
            }
        })
    }
    catch(err){
        console.log("Error", err);
    }
})

app.get("/todaysLog",(req,res)=>{
    var  { userId, date } = req.query()
    connection.query("select * from UserLogs where userId = ? and data = ?", [userId, todaysDate], (error, results) => {
        if(error){
            console.log(error);
        }
        else{
            res.status = 200;
            res.send(results);
        }
    })
})

app.get("/lastSevenDays",(req,res)=>{
    var  { userId } = req.query()
    connection.query("select * from UserLogs where userId = ?", [userId], (error, results) => {
        if(error){
            console.log(error);
        }
        else{
            res.status = 200;
            res.send(results);
        }
    })
})

app.listen(3000, () => {
    console.log("Server Connected port 3000");
})




























































// app.post("/user", async (req, res) => {
// //     try{
// //     const { userName, email, pass } = req.body;
// //     console.log(req.body);
// //     connection.query("insert into users(userName, password, email) values(?,?,?)", [userName, pass, email], (err, result) => {
// //         if(err){
// //             console.log("Error", err);
// //         }
// //         else{
// //             res.send(result);
// //         }
// //     })
// //     }
// //     catch(err){
// //         console.error(err);
// //     }
// // })


// app.post('/user', async (req, res) => {
//     try {
//     //   const { username, email, password } = req.body;
//       console.log(req.body);
  
//       // Check if user already exists
//     //   const [existingUsers] = await promisePool.query(
//     //     'SELECT * FROM users WHERE email = ? OR username = ?',
//     //     [email, username]
//     //   );
  
//     //   if (existingUsers.length > 0) {
//     //     return res.status(400).json({
//     //       message: 'User already exists'
//     //     });
//     //   }
  
//     //   // Hash password
//     //   const hashedPassword = await bcrypt.hash(password, 10);
  
//     //   // Insert new user
//     //   const [result] = await promisePool.query(
//     //     'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
//     //     [username, email, hashedPassword]
//     //   );
  
//     //   // Return user data (excluding password)
//     //   const userData = {
//     //     id: result.insertId,
//     //     username,
//     //     email
//     //   };
  
//     //   res.status(201).json({
//     //     message: 'User created successfully',
//     //     user: userData
//     //   });
//     } catch (error) {
//       console.error('Signup error:', error);
//       res.status(500).json({
//         message: 'Error creating user'
//       });
//     }
//   });