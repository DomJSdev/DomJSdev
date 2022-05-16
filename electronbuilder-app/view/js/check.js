export const check = inputsElements=>{
    let valueCheck = {
        valueLength: true, 
        symbol: true
    }
    inputsElements.forEach(element => {

        if(element.value.length === 0 ) {
            valueCheck.valueLength = false
        }
        if(element.value.indexOf('<')>-1 || element.value.indexOf('>')>-1 || element.value.indexOf('"')>-1 || element.value.indexOf("'")>-1 ){
            valueCheck.symbol = false
        }  
    });
    return valueCheck
}
export const boxChecked = (boxArray)=>{
    let check = false
    for( let i = 0; i < boxArray.length ; i++ ){
        if(boxArray[i]) check=true
    }
    return check
} 