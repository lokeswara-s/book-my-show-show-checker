"use strict";
var player = require('play-sound')({player: "C:/Program Files (x86)/VideoLAN/VLC/vlc.exe"})

var shell = require('shelljs');
var count = 0;
setInterval(function(){
var version = shell.exec('curl https://in.bookmyshow.com/buytickets/avengers-endgame-hyderabad/movie-hyd-ET00100559-MT/20190426', {silent:true}).stdout;

var _nodeHtmlParser = require("node-html-parser");
var root = _nodeHtmlParser.parse(version);

var venueList = root.querySelectorAll('.list');

let rawTheaterList  = [];

venueList.map(function(venue){
  var rawArray = venue.rawAttrs.split("\n");
  rawArray.map(function(raw){
    if(raw.length > 1){
      var theater = "";
      if(raw.indexOf("data-name") >=0){
        var splitName = raw.split("=")
        theater = splitName[1]
        rawTheaterList.push(theater)
      }
    }
  })
})
if(rawTheaterList.length > count){
  player.play('./bgm.mp3', { timeout: 300 }, function(err){
  if (err) throw err
})
  count = rawTheaterList.length;
}else{
  console.log(rawTheaterList, new Date(),"Next update in 10Sec")
}
},5000)
