var express = require('express');
var multiparty = require('multiparty');
var AWS = require('aws-sdk');

var s3 = require('../config/aws').s3;
var router = express.Router({mergeParams: true});

//Get Standard Base Images
router.get('/base', function(req, res) {
    if (req.query.key == null){
            var keys = [];
    
        var params = {Bucket:s3['bucketName'],Prefix:"std_library/base/"}
    
        s3.listObjects(params, function(err,data){
            if(err){
                console.log("Error Getting list of objects from s3");
                res.json({ success: false, urls: urls}); 
            }else{
                for(var i = 1; i< data.Contents.length;i++){
                    keys.push(data.Contents[i].Key);                 
                }            
                res.json({ success: true, keys: keys}); 
            }
        }); 
    }else{
        var params = {Bucket:s3['bucketName'],Key:req.query.key};
        s3.getObject(params,function(err,data){
        if (err){
            res.json({ success: false, message: 'no std image with given key'});
        }
        else{
            var stream = AWS.util.buffer.toStream(data.Body);
            stream.pipe(res);
        }
    }); 
    }
        
});


router.get('/interior', function(req, res) {
    if (req.query.key == null){
            var keys = [];
    
        var params = {Bucket:s3['bucketName'],Prefix:"std_library/interior/"}
    
        s3.listObjects(params, function(err,data){
            if(err){
                console.log("Error Getting list of objects from s3");
                res.json({ success: false, urls: urls}); 
            }else{
                for(var i = 1; i< data.Contents.length;i++){
                    keys.push(data.Contents[i].Key);                 
                }            
                res.json({ success: true, keys: keys}); 
            }
        }); 
    }else{
        var params = {Bucket:s3['bucketName'],Key:req.query.key};
        s3.getObject(params,function(err,data){
        if (err){
            res.json({ success: false, message: 'no std image with given key'});
        }
        else{
            var stream = AWS.util.buffer.toStream(data.Body);
            stream.pipe(res);
        }
    }); 
    }
        
});
module.exports = router;