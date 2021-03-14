const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('./lib/inquirer')
const config = require('./lib/config')
const configStore = require('configstore')
const packageJSON = require('./package.json')
const PckConfig = new configStore( packageJSON, {savePath: ''})
const downloader = require('./lib/downloader')

clear();

console.log(
    chalk.red(
        figlet.textSync('yt-to-mp3',{horizontalLayout : 'full'})
))

const checkForPath = async () => {
    if(config.getPath(PckConfig) == ""){
        await inquirer.AskForPath(PckConfig)
    }
}

const getInfo = (URL) => {
    return new Promise ( async resolve => {
        resolve(await downloader.retrieveURLinfo(URL))
    })
}

const getResponse = async (response) => {
    let URLS;
    let URL;
    if(response.URL.split(",")){
        URLS = response.URL.split(",")
        return URLS
    }else{
        URL = response.URL
        return URL
    }
}

const run = async () => {
    await checkForPath()
    const response = await inquirer.askForYoutubeURL()
    let data = await getResponse( response )

        data.forEach( async URL => {
            await getInfo(URL).then( async result => {
                console.log('Dowloading '+ result.videoDetails.title+ ' by '+ result.videoDetails.author.name + '...')
                  await downloader.OpenURLStream( URL , 
                                    result.videoDetails.title,
                                    result.videoDetails.author.name,
                                    config.getPath(PckConfig))
            })
        });
    }   

run() 