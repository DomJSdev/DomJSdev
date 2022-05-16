'use strict'

const { app, BrowserWindow, Menu ,ipcMain } = require( 'electron' )
const { read, write, command, system, exsist } = require( './config.js')

const test = false

let filepath = ""

const initApp = ()=>{

    let win = new BrowserWindow({
        width: test? 1200 : 400,
        height: test? 800 : 502,
        resizable: test? true : false,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    const menu = Menu.buildFromTemplate([])
    Menu.setApplicationMenu(menu)

    win.loadFile( './view/index.html')
    if(test) win.webContents.openDevTools()
}


app.on( 'ready', initApp )

ipcMain.on( 'config', ( evt, args )=>{
  evt.sender.send('info', 'wird erstellt')

  let pathToCheck =args.path+'/package.json'
  
  let checkPath = exsist(pathToCheck)
  if( !test ){
  let path = args.path
  
  let pathArray = path.split('/')

  if(pathArray[pathArray.length -1].indexOf('.') > -1) {

    pathArray.pop( )
    let path = pathArray.join( '/' )
    
    command([`cd ${path} `,'npm i --save-dev electron-builder'])
  }else{
    command([`cd ${path} `,'npm i --save-dev electron-builder'])
  }
  evt.sender.send('info','/package.json wird eingelesen und neu beschrieben')  
  setTimeout(async()=>{
  
  filepath = path + '/package.json'
  let content = await read(filepath)
  
  content.version = args.version
  content.author = args.author
  content.description = args.description
  content.scripts.start = 'electron .'
  content.scripts.dist = 'electron-builder'

  content.build = {
      "appId": args.appId,
      "productName": args.productName.length< 0? args.appId: args.productName,
      "copyright": args.copyright,
  }
  content = system(args,content)

  evt.sender.send('info', 'electron wird installiert')

  write(filepath, content)
  },5000)

  setTimeout(()=>{
    command(['npm i electron'])
  },20000)

  setTimeout(async()=>{
    let content = await read(filepath).catch(err=>{console.log('es ist etwas schiefgegangen',err)})
  
    if(content.dependencies !== undefined) delete content.dependencies
    
    write(filepath,content)
    command(['npm run dist'])
    evt.sender.send('info', 'der dist Ordner wird erstellt\ndas erzeugen aller Dateien kann 1-2 min dauern')
  },40000)
  
}else{
  setTimeout(()=>{
    evt.sender.send('info','/package.json wird eingelesen und neu beschrieben')  
  },10000)
  setTimeout(()=>{
    evt.sender.send('info', 'electron wird installiert')
  },20000)
  setTimeout(()=>{
    evt.sender.send('info', 'dist Ordner wird erstellt das erzeugen aller Dateien kann 1-2 min dauern')
  },30000)
}  
})
