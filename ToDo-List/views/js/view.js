export const view = {
    /**
     * 
     * @param {Array} todos 
     * @returns a section with div´s for every Array index 
     */
    createOutput:(todos)=>{
        let counter = 1 

        let section = document.createElement('section')
        
        for( let i=0; i < todos.length ; i++ ){
            
            let div = document.createElement( 'div' )
            div.id = `element${counter}`

            let button = document.createElement('button')
            button.innerText = 'delete'
            button.type = 'button'
            button.id = `button${counter}`
            button.setAttribute( 'onclick', '()=>{deleteElement()}')
            
            if(todos[i].prioritat === 'Classic')        div.style.background = 'linear-gradient(darkgreen,green)'
            else if(todos[i].prioritat === 'Important') div.style.background = 'linear-gradient(darkorange,rgb(227, 174, 99))'
            else                                        div.style.background = 'linear-gradient(darkred,red)'
            
            for(let item in todos[i]){ 
                if(item === 'id'){

                }else{
                let p = document.createElement('p')
                p.innerHTML = `${item}: <b>${todos[i][item]}</b>`
                div.appendChild(p)}
            }
            div.appendChild(button)
            section.appendChild(div)
            counter++
        }
        return section
    },
    /**
     * 
     * @param {String} value 
     * @param {String} option 
     * @param {Html Element} parent 
     */
    setHidden:( value, option, parent )=>{
        if(value === option) parent.toggleAttribute('hidden')
        else                 parent.setAttribute('hidden','true')

    },
    /**
     * 
     * @param {Array} list 
     * @param {Html Element} parent 
     */
    fillFilterSelect:(list,parent)=>{
        for(let i=0 ; i < list.length ; i++){
            let optionsElement = document.createElement('option')
            optionsElement.value = list[i]
            optionsElement.innerText = list[i]
            parent.appendChild(optionsElement)
        }

    },
    getDeleteName:(id,)=>{
        
        let index = id.slice(6,id.length)
        let elementToDelete = document.querySelector(`#element${index}`)
        let children = elementToDelete.firstChild.innerText
        let deleteName = children.slice(6,children.length)
        elementToDelete.remove()
        return deleteName
    }
    
}
