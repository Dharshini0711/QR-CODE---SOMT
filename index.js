// Require the package

const QRCode = require('qrcode')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("rfid");
  //Find the first document in the customers collection:

  

  dbo.collection('SOMT').aggregate([
    { $lookup:
       {
         from: 'Customer',
         localField: 'ID',
         foreignField: 'id',
         as:'User'

 
       }
     },{$unset:["User._id"]}
    ]).toArray(function(err,result){

    if (err) throw err;


 
    
    let DateTime = result.map(id=>id.DateTime);
    let CustomerName = result.map(id=>id.User);
    let data={User:CustomerName,Date:DateTime}
    
    


    console.log(data);
// Converting the data into String format
let stringdata = JSON.stringify(data)
 
// Print the QR code to terminal

QRCode.toString(stringdata,{type:'terminal'},

                    function (err, QRcode) {
 

    if(err) return console.log("error occurred")
 

    // Printing the generated code

    console.log(QRcode)
})

  
// Converting the data into base64 

QRCode.toDataURL(stringdata, function (err, code) {

    if(err) return console.log("error occurred")
 

    // Printing the code

    console.log(code)
})
})



}


);


  
    

   
 


