const {google} = require("googleapis");
const https = require('https');
const querystring = require('querystring');

exports.handler = async function(event, context){
    
    const oAuth2Client = new google.auth.OAuth2(
        'secret_id'
        , 'secret_key'
        , '');
        
    oAuth2Client.setCredentials({
        refresh_token: 'refresh_token'
    });
    
    const sheets = google.sheets({version: "v4"});
    const param = {
        spreadsheetId: 'sheet_id',
        range: "シート1",
        auth : oAuth2Client
    };

    let response = await sheets.spreadsheets.values.get(param);
    let data = response.data;

    console.log(JSON.stringify(data));
    
    var postMessage = '[To:1983150]\n情報セキュリティ1番を貼り付けてください。'
    var post_data = querystring.stringify({body:postMessage});
    let options = {
        host: 'api.chatwork.com',
        path: 'cw/path',
        port: 443,
        headers: {
            'X-ChatWorkToken': 'cwtoken',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
    };
    var post_req = https.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
          context.succeed();
        });
        res.on('error', function (e) {
          console.log("Got error: " + e.message);
          context.done(null, 'FAILURE');
        });
     });
    post_req.write(post_data);
    post_req.end();
};
