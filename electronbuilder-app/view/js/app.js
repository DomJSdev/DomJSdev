const { ipcRenderer } = require( 'electron' )
import {check,boxChecked} from './check.js' 

let configObject ={
    version: "",
    path: "",
    icon: "",
    appId: "",
    productName:"",
    copyright:"",
    description: "",
    author: ""
}

const fillConfigObject = inputsArray=>{
    let counter = 0
    for( let item in configObject ){
        configObject[ item ] = inputsArray[ counter ].value.length === 0 ? false : inputsArray[counter].value //inputsArray[counter].value
        counter++
    }
}

window.onload = ()=>{

    document.querySelector( 'button' ).onclick = ()=>{
        let output = document.querySelector('#output')
        output.style.color = 'red'
        output.innerText = ''
        let inputs = document.querySelectorAll( 'table [type="text"]' )
        let checkBoxWindows = document.getElementById( 'win' ).checked
        let checkBoxMac = document.getElementById( 'mac' ).checked
        let checkBoxLinux = document.getElementById( 'linux' ).checked
        
        //eine Valetierung muss ich noch erstellen mit RegEx
        let okay = check(inputs)
        
        let checked = boxChecked([checkBoxWindows,checkBoxLinux,checkBoxMac])
        if(!checked){
            output.innerText = 'you must choose min one checkbox '
        }else{

        if(okay.valueLength && okay.symbol){
        
            fillConfigObject( inputs )
        
            configObject.win = checkBoxWindows
            configObject.mac = checkBoxMac
            configObject.lin = checkBoxLinux
            
            ipcRenderer.send( 'config', configObject )
        }else{
            if( !okay.symbol ) output.innerText = 'this symbols [ < , > , " , \' ] are not allowed'
            else              output.innerText = 'one field is emty'
        }
    }
}
}
ipcRenderer.on('info' ,(evt,args)=>{
    let output = document.querySelector('#output')
    output.innerText = args
})