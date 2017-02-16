var express = require('express');
var multiparty = require('multiparty');
var AWS = require('aws-sdk');

var s3 = require('../config/aws').s3;
var router = express.Router({mergeParams: true});

//Get Standard Base Images
router.get('/base', function(req, res) {
    var urls = [];
    
    var params = {Bucket:s3['bucketName'],Prefix:"std_library/base/"}
    
    s3.listObjects(params, function(err,data){
        if(err){
            console.log("Error Getting list of objects from s3");
           res.json({ success: false, urls: urls}); 
        }else{
            for(var i = 1; i< data.Contents.length;i++){
                var params = {Bucket:s3['bucketName'],Key:data.Contents[i].Key,Expires:7200};
                var url = s3.getSignedUrl('getObject', params);
                urls.push(url);
                 
            }            
            res.json({ success: true, images: urls}); 
        }
    });        
});

router.get('/interior', function(req, res) {
   var urls = [];
    
    var params = {Bucket:s3['bucketName'],Prefix:"std_library/interior/"}
    
    s3.listObjects(params, function(err,data){
        if(err){
            console.log("Error Getting list of objects from s3");
           res.json({ success: false, urls: urls}); 
        }else{
            for(var i = 1; i< data.Contents.length;i++){
                var params = {Bucket:s3['bucketName'],Key:data.Contents[i].Key,Expires:7200};
                var url = s3.getSignedUrl('getObject', params);
                urls.push(url);
                 
            }            
            res.json({ success: true, images: urls}); 
        }
    });    
});

module.exports = router;