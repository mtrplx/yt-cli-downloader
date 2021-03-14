module.exports = {
    getPath : (config) => {
       return config.get('savePath')
    },
    savePath : (config,path) => {
        return config.set("savePath", path)
    }
}