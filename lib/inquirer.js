const inquirer = require('inquirer')
const { validateURL } = require('ytdl-core')
const fs = require('fs')
const config = require('./config')

module.exports = {
    askForYoutubeURL : () => {
        const question = [
            {
                name:'URL',
                type:'input',
                message:"Enter a valid Youtube URL(One or more separated by ,):",
                validate: (URL) => {
                    let URLS
                    if(URL.split(",")){
                        URLS = URL.split(",")
                    }                    
                    if(!validateURL(URL)){
                        return 'Wrong URL, enter a valid one '
                    }
                    let response = true;
                    let wrongurl
                    let wrongindex
                    if(URLS.length > 1){
                        URLS.forEach( (URL,index) => {
                            if(!validateURL(URL)){
                                wrongurl = URL
                                wrongindex = index
                                response = false
                            }
                        });
                    }
                    if(!response){
                        return "URL: "+wrongurl+" in position: "+(wrongindex+1)+" is wrong, please, enter a valid one"
                    }
                    return true
                }
            }
        ]
        return inquirer.prompt(question)
    },
    AskForPath : ( PckConfig ) => {
        const question = [
            {
                name:'Path',
                type:'input',
                message:'Enter the path where files will be saved',
                validate: (Path) => {
                    if (!fs.existsSync(Path)) {
                        config.savePath( PckConfig,Path )
                        return true
                    }
                    return 'Wrong PATH, enter a valid one'
                }
            }
        ]
        return inquirer.prompt(question)
    }
}