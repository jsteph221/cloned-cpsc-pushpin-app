var AWS = require('aws-sdk');

var s3Config = { "accessKeyId": "AKIAIV2MK57QBCDG2PIQ", 
                 "secretAccessKey": "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", 
                 "region": "us-west-2" };

AWS.config.update(s3Config);
var s3 = new AWS.S3();
s3['bucketName'] = 'cs319-tetrad-development-bucket';

exports.s3 = s3;