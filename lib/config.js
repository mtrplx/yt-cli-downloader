const packageJSON = require('../package.json')
const configStore = require('configstore')


module.exports = {
    getPath : (config) => {
       return config.get('savePath')
    },
    savePath : (config,path) => {
        return config.set("savePath", path)
    }
}