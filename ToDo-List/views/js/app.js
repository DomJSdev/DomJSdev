const { ipcRenderer } = require( 'electron' )
import { controller } from './controller.js'
import { view } from './view.js'

let counter=1
let checked = false
let time =''

let options ={
    prioritat:['Alles'],
} 

window.onload = ()=>{
    ipcRenderer.send('init','gib mir daten')
    
    let inputTimeElement = document.querySelector('#time')
    let input = document.querySelector('input')
    let buttonSave = document.querySelector('#save')
    let select = document.querySelector('#eintrag select')
    let output = document.querySelector('#output')
    
    let filterSelect = document.querySelector('#filter')

    let optionsElement = document.querySelectorAll('#eintrag option')

    optionsElement.forEach( element => options.prioritat.push( element.innerText ) )
    time = options.prioritat[ options.prioritat.length -1 ]
    
    
    view.fillFilterSelect( options.prioritat, filterSelect )   
    //-------------------------------------------------------------------
    
    
      ////////////////
     // Listeners  //
    ////////////////

    input.onchange = () => checked = controller.checkInput( input.value )

      //---------//
     //  Save   //
    //---------//

    buttonSave.onclick = ()=>{
        
        checked = controller.checkInput( input.value )

        if(checked.okay){
            counter++
            let todo ={
                list:{
                id: counter,
                name: input.value,
                prioritat: select.value
                },
                counter: counter
            }    
            if(select.value === time ) todo.list.time = document.querySelector('#time').value
            ipcRenderer.send( 'save', todo )
    }else{
        document.querySelector('#error').innerText = checked.error
    }
    }
      //------------//
     //   delete   //
    //------------//

    output.onclick = (evt)=>{

        if(evt.target.localName === "button"){
            let deleteName = view.getDeleteName( evt.target.id )

            let todo ={
                list:{
                name: deleteName,
                },
            }    
            ipcRenderer.send( 'delete', todo )
    }
    }
    select.onchange = evt=>{

        view.setHidden(
            evt.target.value,
            options.prioritat[ options.prioritat.length -1 ], 
            inputTimeElement
        )
    }
    filterSelect.onchange = evt=>{

        let TodoListFiltered = controller.filter( options.prioritat, evt.target.value )
        output.innerHTML = ''
        let todosDivs = view.createOutput( TodoListFiltered )
        output.append( todosDivs )
    }

      ///////////////////////
     // IPC communikation //
    ///////////////////////

    ipcRenderer.on('todos',async( evt, args)=>{
        controller.saveList( args.list )
        let todosDivs = view.createOutput( args.list )
        output.innerHTML='' 
        output.append( todosDivs )
    })
    ipcRenderer.on('error',async( evt, args )=>{
        document.querySelector('#error').innerText = args.error
    })
    ipcRenderer.on('load',async( evt, args )=>{
        controller.saveList( args.list ) 
        
        if(args.list !== 0){
        counter = args.counter
    
        output.innerHTML = ''
        let todosDivs = view.createOutput( args.list )
        output.append( todosDivs )
        }
    })
    ipcRenderer.on('load',async( evt, args )=>{
        
        if(args.list !== 0){
        counter = args.counter
    
        output.innerHTML = ''
        let todosDivs = view.createOutput( args.list )
        output.append( todosDivs )
        }
    })

}