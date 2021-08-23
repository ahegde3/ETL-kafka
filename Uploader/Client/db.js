const mysql = require('mysql');


var pool= mysql.createPool({
    connectionLimit : "10",
    host:  "localhost:3306",
    user: "user",
    password: "password",
    database: "experiment"
    
  });    
  
  
  async function uploadToDB(payload){
     
    
    pool.getConnection(function(err,connection){
      if (err) {
        console.log(err);
      }   
      connection.query('INSERT IGNORE INTO product SET ?',payload,function(err,rows){ 
          if(err) {
             console.log("DB error:"+err)
              
                   }
          else {
              //console.log(results)
          console.log("record inserted "+ rows.insertId)
          insertid=rows.insertId;
          }    
          connection.release();          
      });
      connection.on('error', function(err) {      
        if(err.code === 'PROTOCOL_CONNECTION_LOST')
           console.log(err);
        else throw err   
               
      });
  });
  }
  
  
  module.exports = {uploadToDB};