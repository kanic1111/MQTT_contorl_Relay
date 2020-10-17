var MongoClient=require('mongodb').MongoClient;
 
MongoClient.connect("mongodb://127.0.0.1:27017/test",function(err,client){
    var db_client = client.db('test')
    var db_table = db_client.collection('test')
    db_client.collection("test",function(err,collection){
        collection.find({name:"test"}).toArray(function(err,items){
            if(err) throw err;
            console.log(items);
            console.log("We found "+items.length+" results!");
        });
        db_table.find({}).toArray(function(err, result){
            if (err) throw err;
            console.log (result)
            client.close;
        });
    });
    client.close(); //關閉連線
})