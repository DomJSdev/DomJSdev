"use strict"; 

let calc = null;
let output = document.getElementById("output");

/** //////////////////////////////////////////////////////////
*  // entgegenname des inputs und ausgabe in HTML Element  //
* //////////////////////////////////////////////////////////
*
* @param {String} input  die taste die der User drückt  
* @returns 
*/
function appendinput( input ){ 
  document.getElementById("output").innerHTML += input; 
}

/**   //////////////////////////////////////////////////////
 *   //    diese Funktion führt die Berrechnung durch    // 
 *  //     je nachdem welcher Operator gefunden wurde   //
 * //////////////////////////////////////////////////////
 * 
 * @param {Array} array         die Rechnung in einem Array gespeichert
 * @param {String} operator     welcher Operator gefunden wurde
 * @param {Number} index        wo der Operator gefunden wurde 
 * @returns                     das neue Array mit dem Ergebniss 
 */
function calculate ( array, operator, index ){
  console.log( `Rechenaufgabe: [ ${array} ] \nwelcher Operator endeckt wurde: ${operator} \nan welchen index er gefunden wurde: ${index}` );
  
  let result = null;
  let number1 = Number( array[index-1] );
  let number2 = Number( array[index+1] );

  if( operator === '*' ) result = Math.floor( number1 * number2 );

  if( operator === '/' ) result = Math.floor( number1 / number2 );
    
  if( operator === '+' ) result = Math.floor( number1 + number2 );
    
  if( operator === '-' ) result = Math.floor( number1 - number2 );

  array.splice( index-1, 3, result );

  return array;
}

/**
 *      /////////////////////////////////////////////////////////////////
 *     //      entgegenname u. bearbeitung der Rechnungsaufgabe       //
 *    //           und check ob richtig eingegeben wurde             //
 *   /////////////////////////////////////////////////////////////////
 * 
 * @returns 
 * wenn der User richtig eingegeben hat das Ergebnis 
 * wenn nicht ausgabe error
 */
function getResult() {

  const OPERATOREN = [ '*', '/', '-', '+' ]
  let calc = document.querySelector( '#output' ).innerText;

  const CHECK = calc.includes( '*' ) || calc.includes( '/' ) || calc.includes( '-' ) || calc.includes( '+' );   

  if( CHECK ){

  calc = calc.split( ' ' );

  console.log( 'Rechenaufgabe: ', calc );

  let count = 0;

  while( calc.length !== 1 ){
    
    if( calc.indexOf( OPERATOREN[count]) > 0 ){
      let index = calc.indexOf( OPERATOREN[count] )
      calc = calculate( calc, OPERATOREN[count], index )

    }else{
      count++
    }
  }
  console.log( 'Ergebniss: ', calc )

  return calc
}
else{ return calc = 'error' }
}

  ///////////////////////////////////
 // reagieren auf das Click event //
///////////////////////////////////

const MAP = document.querySelector( 'map' );
MAP.onclick = ( event )=>{

  const BUTTON_VALUE = event.target.title;

  if( BUTTON_VALUE === '=' ) {
    calc = getResult()
    output.innerText = calc
    return
  }

  BUTTON_VALUE !== 'delete' ? appendinput( BUTTON_VALUE ) : output.innerText = null
}
