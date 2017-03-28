var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');

var s3Config = { "accessKeyId": "AKIAIV2MK57QBCDG2PIQ",
    "secretAccessKey": "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",
    "region": "us-west-2" };
AWS.config.update(s3Config);
var s3 = new AWS.S3();
var myBucket = 'cs319-tetrad-development-bucket';

/* GET home page. */
router.post('/finalPin',function(req,res){
    try{
        buf = new Buffer(req.body.image.replace(/^data:image\/\w+;base64,/, ""),'base64');

        params = {Bucket:myBucket, Key:req.body.title, Body:buf, ContentEncoding: 'base64',
            ContentType:'image/png'};
        s3.putObject(params,function(err, data){
            if (err){
                console.log("Error Sending to S3");
            }else{
                console.log("Successfully uploaded data to S3");
            }
        });
    }
    catch(err){
        console.log(err);
    }
    res.header("Access-Control-Allow-Origin", "*").send();
});


module.exports = router;
