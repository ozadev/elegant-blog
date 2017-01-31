/**
 * Module dependencies.
 */

var Promise = require("bluebird");
var http = require('http');
var path = require('path');
var fs = Promise.promisifyAll(require("fs"));
// var fs = require('fs');
var express = require('express');

var api = express();

var dbConnection = require('./js/dbConnection');

api.get('/posts', function (req, res) {

    // Test
    Promise.using(dbConnection(), function(connection) {
        return connection.query('SELECT * FROM `items`')
            .then(function(row) {
                // console.log(row);
                return row;
            }).catch(function(error) {
                console.log(error);
            });
    });

    fs.readFileAsync('./public/assets/data/posts.json', 'utf8')
        .then((data) => {
            var posts = JSON.parse(data);
            res.send(posts);

            return posts;
        }).catch((err) => {
            console.error(err);
        });
});

api.get('/posts/:id', function (req, res) {

    fs.readFileAsync('./public/assets/data/posts.json', 'utf8')
        .then((data) => {
            var posts = JSON.parse(data);
            res.send(posts[req.params.id]);

            return posts;
        }).catch((err) => {
        console.error(err);
    });
});

api.get('/categories/:category', function (req, res) {

    fs.readFileAsync('./public/assets/data/posts.json', 'utf8')
        .then((data) => {
            var posts = JSON.parse(data);
            var requiredPosts = posts.filter((item) => {
                return item.category === req.params.category;
            });
            res.send(requiredPosts);

            return posts;
        }).catch((err) => {
        console.error(err);
    });

});

api.get('/tags/:tag', function (req, res) {

    fs.readFileAsync('./public/assets/data/posts.json', 'utf8')
        .then((data) => {
            var posts = JSON.parse(data);
            var requiredPosts = posts.filter((item) => {
                return item.tags.some((tag) => {
                    return tag === req.params.tag;
                });
            });
            res.send(requiredPosts);

            return posts;
        }).catch((err) => {
        console.error(err);
    });

});

api.get('/global-data', function (req, res) {

    Promise.all([
        fs.readFileAsync('./public/assets/data/categories.json', 'utf8'),
        fs.readFileAsync('./public/assets/data/tags.json', 'utf8'),
        fs.readFileAsync('./public/assets/data/popularPosts.json', 'utf8')
    ]).then((data) => {
        var globalData = {
            categories: JSON.parse(data[0]),
            tags: JSON.parse(data[1]),
            popularPostsList: JSON.parse(data[2])
        };
        res.send(globalData);

        return globalData;
    }).catch((err) => {
        console.error(err);
    });
});

module.exports = api;

