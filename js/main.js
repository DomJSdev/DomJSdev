'use strict'

const MAX_USER = 2000;

  ///////////////////////////////////////////////////////
 // erzeugen meiner Objekte für die befüllung in Html //
///////////////////////////////////////////////////////

let occupiedObject = { 
  yes:[], 
  no:[] 
};

let ageObject = { 
  age01_18:[],
  age18_29:[], 
  age29_39:[], 
  age39_110:[] 
};

let yearObject={
  year2010:[], 
  year2011:[], 
  year2012:[], 
  year2013:[], 
  year2014:[],
  year2015:[],
  year2016:[], 
  year2017:[], 
  year2018:[], 
  year2019:[], 
  year2020:[],
}

  //////////////////////////////////////////////////
 // erzeugen des Doughtut Diagramms für occupied //
//////////////////////////////////////////////////

/**
 * 
 * @param {Array} array 
 */
const showOccupiedChart = array => {

  array.forEach( user => { 

    if( user.occupied )  occupiedObject.yes.push(user);
    else               occupiedObject.no.push(user);
    
  });

  console.log( 'occupiedObject: ', occupiedObject )
  
  new Chart(
    document.getElementById( 'canvasoccupied' ),
    {
      type: 'pie',
      data: {
        labels: [ 'Employed', 'Unemployed' ],
        datasets: [{
          label: 'Occupied',
          backgroundColor: [ 'red', 'blue' ],
          borderColor: 'black',
          data: [ occupiedObject.yes.length, occupiedObject.no.length ],
        }]
      },
      options: {
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: 'rgb(0, 0, 0)'
                }
            }
        }
    }
    }
  );
}

  /////////////////////////////////////////////
 // erzeugen des Balken Diagramms für Alter //
/////////////////////////////////////////////

/**
 * 
 * @param {Array} array 
 */
const showAgeChart = array => {
  
  array.forEach( user => {
    if( user.age > 1 && user.age <= 18 ){
      ageObject.age01_18.push(user);

    }else if( user.age > 18 && user.age < 29 ){
      ageObject.age18_29.push(user);

    }else if( user.age > 29 && user.age < 39 ){
      ageObject.age29_39.push(user);

    }else if( user.age > 39 && user.age < 110 ){
      ageObject.age39_110.push(user);
    }
   });
  console.log( 'ageObject: ',ageObject )
  
  new Chart(
    document.getElementById( 'canvasage' ),
    {
      type: 'bar',
      data: {
        labels: ['18-29', '18-29','29-39','39-110'],
        datasets: [{
          label: 'Age',
          backgroundColor: [
            'red',
            'blue',
            'green',
            'blueviolet' ],
          borderColor: 'red',
          data: [ageObject.age01_18.length, ageObject.age18_29.length, 
                ageObject.age29_39.length, ageObject.age39_110.length],
        }]
      },
      options: {
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: 'rgb(0, 0, 0)'
                }
            }
        }
    }
    }
  );
}

  ////////////////////////////////////////////////////////////
 // erzeugen des linien Diagramms für Registriert per Jahr //
////////////////////////////////////////////////////////////

/**
 * gibt die Werte in den Objekt keys Array nach Jahr aufsteigend
 * 
 * @param {Array} array 
 * @param {Object} object 
 * @param {Number} count z.b 2010
 */
function getDataYears ( array, object, count ){

  for( let key in object ){

    for( let i=0; i < array.length; i++ ){

      if( array[i].registered.getFullYear() === count ){
        object[key].push( array[i] )
      }
    }
    count++
  }
}

/**
 * 
 * @param {Array} array 
 */
const showNewRegisteredChart = array => {
  
  getDataYears( array, yearObject, 2010 )

  console.log( 'yearObject: ',yearObject )
  
  
 new Chart(
    document.getElementById('canvasregistered'),
    {
      type: 'line',
      data: {
        labels: [
          '2010','2011','2012','2013','2014','2015',
          '2016','2017','2018','2019','2020'],
        datasets: [{
          label: 'Registered',
          borderColor: 'red',
          backgroundColor: ['red'],
          data: [
            yearObject.year2010.length, yearObject.year2011.length, 
            yearObject.year2012.length, yearObject.year2013.length, 
            yearObject.year2014.length, yearObject.year2015.length, 
            yearObject.year2016.length, yearObject.year2017.length,
            yearObject.year2018.length, yearObject.year2019.length, 
            yearObject.year2020.length
                ],
        }]
      },
      options: {
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: 'rgb(0, 0, 0)'
                }
            }
        }
    }
    }
  );
}

  /////////////////////////////////////////////////////
 // erstellen der Klasse um 2000 User zu erstellen  // 
/////////////////////////////////////////////////////

class User{
  constructor( prename, lastname, age, occupied, registered ){
    this.prename = prename;
    this.lastname = lastname;
    this.age = age;
    this.occupied = occupied;
    this.registered = registered; 
  }
}

  ///////////////////////////////////////
 // hier initzialisere ich alle Daten //
///////////////////////////////////////

/**
 * 
 * @param {Array} USERS_ARRAY 
 */
const init = USERS_ARRAY =>{

  showOccupiedChart(USERS_ARRAY);
  showAgeChart(USERS_ARRAY);
  showNewRegisteredChart(USERS_ARRAY);

  fillSelectHtml(occupiedObject,'occupied_data',0);
  fillSelectHtml(ageObject,'age_data',3);
  fillSelectHtml(yearObject,'registered_data',4);
}

  ///////////////////////////////////
 // hier generiere ich die User´s //
///////////////////////////////////

window.onload = ()=>{
  
  faker.locale = "de";

  const USERS_ARRAY = [];

  for( let user=1; user <= MAX_USER; user++ ){

    const USERS = new User(
      faker.name.firstName(),
      faker.name.lastName(),
      faker.datatype.number( {min: 18, max: 110} ),
      faker.datatype.boolean(),
      faker.date.between( new Date('2010-01-01'), new Date('2020-12-31') )  
      );

    USERS_ARRAY.push( USERS );   
}
init( USERS_ARRAY );

console.log( 'USERS_ARRAY: ',USERS_ARRAY );

  ///////////////////////////////////////////////////////////
 // ausgabe lister wenn der Select button sich verändert  //
///////////////////////////////////////////////////////////

window.onchange = event => {
  
  const NODE_ARRAY = document.querySelectorAll( "table" );                     
  
  NODE_ARRAY.forEach(( nodes, index, array ) => array[index].remove()); 
  
  const EVENT_VALUE = event.target.value;

  if( EVENT_VALUE === '' ){
    return;

  }else{

      ///////////////////////////////////////////
     // aufrufen der funktionen in getdata.js //
    ///////////////////////////////////////////

    if( event.target.id.includes( 'age' ) ){
      creatTable( ageObject, EVENT_VALUE, 'age' );

    }else if( event.target.id.includes( 'registered' ) ){
      creatTable( yearObject, EVENT_VALUE, 'registered' );

    }else{
      creatTable( occupiedObject, EVENT_VALUE, 'occupied' );
    }
  }
}
}
