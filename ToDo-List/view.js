
const test = false

module.exports.view = {
    
    window:{
        width: test? 800 : 500,
        height: test? 800 : 500,
        resizable: test? true: false,
        webPreferences:{
            //sandbox: true,
            nodeIntegration: true,
            contextIsolation: false
        }
    }
}