

const {readFile,writeFile} = require('fs/promises')
const {existsSync} = require('fs');
const spawn = require("child_process").spawn;

const child = spawn("powershell.exe", ["-Command", "-"])


module.exports={
    exsist:(path)=>{
      try {
        if (existsSync(path)) {
          return true
        }else{
          return false
        }
      } catch(err) {
        console.error(err)
      }
    },
    read : async( path ) =>{

        content = await readFile( path )
        let object = JSON.parse( content )
        return object
    },
    write: (path,content)=>{
        writeFile(path,JSON.stringify(content),error=>{
            if(error) console.log('konnte nicht gespeichert werden')
        })
        
    },
    command: (commandCodes)=>{
        commandCodes.forEach(code=>{
            child.stdin.write(code+ '\n')
        })
    },
    system: (args, content)=>{
        if(args.win){
            content.scripts.distwin = "electron-builder --win"
            content.build.win = {
              "target": "nsis"
            }
            content.build.nsis = {
              "allowToChangeInstallationDirectory": true,
              "oneClick": false
            }
        }
        if(args.lin){
            content.scripts.distlinux = "electron-builder --linux"
            content.build.linux = {
              "target": "AppImage"
            }
          }
          if(args.mac){
            content.scripts.distmac = "electron-builder --mac"
            content.build.mac = {
              "category": "public.app-category.news",
              "target": "dmg"
            },
            content.build.dmg =  {
                "backgroundColor": "#0000cc"
            }
          }
          return content
    }
}










