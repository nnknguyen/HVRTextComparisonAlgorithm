'use strict';
let https = require ('https');

let host = 'api.cognitive.microsoft.com';
let path = '/bing/v7.0/spellcheck';
let key1 = 'a66ad63fee2e421691f0d1e04972f6a8';
//let key2 = 'fe49b63184d745be85fefe53a95c1668';

let key = key1;

let mkt = "en-US";
let mode = "proof";
let query_string = "?mkt=" + mkt + "&mode=" + mode;

var results = '';

function getParams(text) {
    return {
        method : 'POST',
        hostname : host,
        path : path + query_string,
        headers : {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Content-Length' : text.length + 5,
           'Ocp-Apim-Subscription-Key' : key,
        }
     };
}

function replaceText(text, check) {
    let tokens = check.flaggedTokens;
    tokens.forEach((item) => {
        let offset = item.offset;
        let wrong = item.token;
        let best = item.suggestions.reduce((c, m) => { return m.score > c.score ? m : c;});
        text = text.replace(wrong, best.suggestion);
    });
    return text;
}

module.exports = function getCorrectSpelling(text) {

    return new Promise((resolve, reject) => {
        let req = https.request(getParams(text), (response) => {
            let body = '';
            response.on('data', function (d) {
                body += d;
            });
            response.on('end', function () {
                let body_ = JSON.parse(body);
                resolve({correct: replaceText(text, body_), json: JSON.stringify(body_, null, 2)});
            });
            response.on('error', function (e) {
                reject('Error: ' + e.message);
            });
        });
        req.write("text=" + text);
        req.end();
    });
}