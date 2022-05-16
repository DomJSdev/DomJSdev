
export const controller = {
    todoList:[],
    /**
     * 
     * @param {String} text 
     * @returns a Object 
     * 
     * if the text ist not okay read the error Atribute
     */
    checkInput: ( text )=>{
        let check={
            okay: false,
            error:''
        }

        if( text.length === 0 ) {
            check.okay = false
            check.error = 'bitte einen text eingeben'
            return check
        }
        if( 
            text.indexOf('<') >-1 || 
            text.indexOf('>') >-1 || 
            text.indexOf('"') >-1 || 
            text.indexOf("'") >-1   
        ) {
            check.error ='diese Zeichen [< > " \' ] sind nicht erlaubt'
            return check
        }else{    
            check.okay=true                      
            return check
        }
    },
    /**
     * 
     * @param {Object} objects
     * make a backup from the Object  
     */
    saveList:(objects)=>{ 
        controller.todoList =[]
        objects.forEach( element => controller.todoList.push( element ) ) 
        
    },
    /**
     * 
     * @param {Array} list 
     * @param {String} value 
     * @returns a Array only with the choice
     */
    filter:(list,value)=>{

        if(value==='Alles'){
            return controller.todoList
        }
        else{
        
        let TodoListFiltered = controller.todoList.filter(element =>  element.prioritat === value  )
        return TodoListFiltered
    }
    },
}
