const ytDownloader = require('ytdl-core')
const fs = require('fs')
const { resolve } = require('path')
const urlLib = require('url');
const https = require('https');
const cliprogress = require('cli-progress')
const config = require('./config')
const ffmpeg = require('fluent-ffmpeg');
const readline = require('readline');

module.exports = {
    OpenURLStream : (URL, name, author, path) => {
        return new Promise( resolve => {
                let stream = ytDownloader(URL , {
                    quality: 'highestaudio',
                  })
                ffmpeg(stream)
                    .audioBitrate(128)
                    .save(path+"/"+name+' - ' +author+'.mp3')
                    .on('progress', p => {
                        readline.cursorTo(process.stdout, 0);
                        process.stdout.write(`${p.targetSize}kb downloaded`);
                    })
                    .on('end', () => {
                        console.log(`\nFile downloaded on ${path}`);
                    });
        })
    },
    retrieveURLinfo : (URL) => {
        return new Promise( resolve => {
             resolve(ytDownloader.getBasicInfo(URL, {
                 format : 'mp3'
             }))
        }) 
    }
}