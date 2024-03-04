const express=require("express")
const mysql = require('mysql2');
const cors=require("cors")

const app=express()
app.use(cors());

app.use(express.json())
//create the connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'lms',
  password:"Sidharth@123"
});

//to add question
app.post('/lms/admin/saq/add',(req,res)=>{
    const title=req.body.title;
    const description=req.body.description;
    const topicid=parseInt(req.body.topicid);
    const complexityid=parseInt(req.body.complexityid);
    const active=req.body.active;
    console.log(title)
    console.log(description)
    console.log(topicid)
    console.log(complexityid)
    console.log(active)
    connection.query("INSERT INTO testquestion (type,description,title,topicid,complexityid,active,parentqnid,impressioncount,successcount,createdby,modifiedby) VALUES (3,?,?,?,?,?,null,null,null,'sidharth','sid')",[description,title,topicid,complexityid,active],(err,rows,fields)=>{
        console.log("question got successfully added");
        res.send(rows)
    })
    //will get topic, complexity and question desc.
})

//get a particular question
app.get("/lms/admin/saq/get/:qid",(req,res)=>{
    connection.query("select * from testquestion where id=?",[req.params.qid],(err,rows,fields)=>{
        res.send(rows)
        
    })
})


//get all question
app.get("/lms/admin/saq/get",(req,res)=>{
    connection.query("select * from testquestion where softdel<>1 and active<>0",(err,rows,fields)=>{
        var finalArr=[];
        for(var i=0;i<rows.length;i++){
            if(rows[i].complexityid==1){
                rows[i].complexity="Easy"
            }else if(rows[i].complexityid==2){
                rows[i].complexity="Medium"
            }else{
                rows[i].complexity="Hard"
            }

            connection.query("select * from topic where id=?",[rows[i].topicid],(err,temprows,fields)=>{
                finalArr.push(temprows[0].name);
            })
        }
        setTimeout(()=>{
            for(var i=0;i<finalArr.length;i++){
                rows[i].topicName=finalArr[i];
            }
            res.send(rows)
        },2000)
        
        // res.send(rows)
    })
})

//update a question
app.put("/lms/admin/saq/update/:qid",(req,res)=>{
    if(req.body.del){           //we need to delete the question
        var id=req.params.qid;
        connection.query("update testquestion set softdel=1,active=0 where id=?",[id],(err,rows,fields)=>{
            res.send(rows)
        })
    }else{          //when updating a question
        //first disable the old question i.e. active=0
        var id=req.params.qid;
        const title=req.body.title;
        const description=req.body.description;
        const topicid=parseInt(req.body.topicid);
        const complexityid=parseInt(req.body.complexityid);
        const active=req.body.active;
        connection.query("update testquestion set active=0 where id=?",[id],(err,rows,fields)=>{
            if(err){
                console.log(err)
            }else{
                connection.query("INSERT INTO testquestion (type,description,title,topicid,complexityid,active,parentqnid,impressioncount,successcount,createdby,modifiedby) VALUES (3,?,?,?,?,?,?,null,null,'sidharth','sid')",[description,title,topicid,complexityid,active,id],(err,rows,fields)=>{
                    console.log("question got successfully added");
                    res.send(rows)
                })
            }
        })
    }
})

//get all the topics
app.get('/lms/topics',(req,res)=>{
    // var x="Html Lists"
    // connection.query("SELECT * FROM topic WHERE name=?",[x],(err,rows,fields)=>{
    //     res.send(rows)
    // })
    
    connection.query("select * from topic",(err,rows,fields)=>{
        res.send(rows)
    })
    // res.send("getting topics list")
})

//create a topic
app.post("/lms/topics",(req,res)=>{
    var topicName=req.body.topic;
    console.log(topicName)
    connection.query("INSERT INTO topic (name) VALUES (?)",[topicName],(err,rows,fields)=>{
        res.send(rows);
    })
    //res.send("adding to topics")
})

app.listen(8080,()=>{
    console.log("Server is running on port 8080")
})