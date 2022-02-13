
'use strict' 

const API_URL = 'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:FUNDPUNKTEOGD&srsName=EPSG:4326&outputFormat=csv';

 
  /////////////////////////////////////////////////////////
 // Response string Daten mittels Papa lib conventieren //
/////////////////////////////////////////////////////////
      
const ILovePapa = csvString =>{

   console.log( csvString );
   
   const DATA_OBJECT = Papa.parse( csvString ,{
      delimiter: ",",
      header: true,
      dyamicTyping: true,
      transformHeader: function( text ){
         return text.trim();
      } 
   })
   
   DATA_OBJECT.data.splice( DATA_OBJECT.data.length -1 , 1 ); 

   console.log( 'xhr Response nach Papa.prase ', DATA_OBJECT );

   return DATA_OBJECT;
}

  /////////////////////////////////////////////////
 // mittels map nur die Relevanten Daten holen  //
/////////////////////////////////////////////////

const sortByKey = ( array, key ) => array.sort(( item1, item2 ) => item1[key] - item2[key] );


const cordinaten = ( cordinaten, index )=>{
   
   cordinaten = cordinaten.replace( 'POINT (', '' );
   cordinaten = cordinaten.replace( ')', '' );
   
   cordinaten = cordinaten.split( ' ' );
   
   return cordinaten[index];
}

const mapData = dataArry =>{
   
   let mapVip = dataArry.map( item =>{
      
      return{
         
         adresse:item.STRNAM,
         bezirk:item.BEZ,
         kategorie: item.FUNDKATEGORIE,
         art: item.FUNDE,
         cordinaten:{ 
          
            lat: cordinaten( item.SHAPE, 0 ),
            lng: cordinaten( item.SHAPE, 1 )
         },
      }})   
      
      sortByKey( mapVip, 'bezirk' ); 
      console.log( 'ziehen der relevanten Daten der geprasten Response Daten', mapVip );
      
      return mapVip;
}


  ///////////////////////////////////////////////////////////////
 // in den Select Element einfügen damit der User wählen kann //
///////////////////////////////////////////////////////////////

const fillSelectElement = object =>{

   const BEZIRK_ARRAY = [];
   object.forEach( item => {
      if (! BEZIRK_ARRAY.includes( item.bezirk ) && item.bezirk.length > 0) BEZIRK_ARRAY.push( item.bezirk )
   });

   BEZIRK_ARRAY.forEach(item => {
      
      const OPTION = document.createElement('OPTION');
      OPTION.innerText = `Bezirk-${item}`;
      OPTION.value = item;
      document.querySelector('select').appendChild( OPTION );
   })
}

  ///////////////////////////////////////////////////////
 // die von User gewünschten Daten ins HTML ausgeben  //
///////////////////////////////////////////////////////

const filterData = ( object, num ) => object.filter( item => item.bezirk == num );


const createOutput=( object, bezirk ) => {
   document.querySelector( 'h3' ).innerText = 'klicken Sie auf den gewünschten Datensatz um Google Maps zu öffnen';

   const DATA = filterData( object, bezirk );

   let outPut = document.querySelector( '#data-output' );
   let section = document.createElement( 'section' );

   for( let i=0 ;i < DATA.length ; i++ ){
      const P = document.createElement( 'p' );

      P.innerHTML = `<hr>
                     <b>Adresse:</b>   ${DATA[i].adresse}   <br>
                     <br> 
                     <b>Bezirk:</b>    ${DATA[i].bezirk}    <br> 
                     <br>
                     <b>Art:</b>       ${DATA[i].art}       <br> 
                     <br>
                     <b>Kategorie:</b> ${DATA[i].kategorie} <br>
                     <hr>`;
                      

      P.setAttribute( 'name', `${DATA[i].cordinaten.lng} , ${DATA[i].cordinaten.lat}` );
      P.setAttribute( 'onclick', `getGoogleMapWindow(${DATA[i].cordinaten.lng} , ${DATA[i].cordinaten.lat})` );
      section.appendChild( P );

   }
   outPut.appendChild( section );
}

  ///////////////////////////////////////////////////////
 // die von User gewünschten Daten ins HTML ausgeben  //
///////////////////////////////////////////////////////


function getGoogleMapWindow( cord1, cord2 ){

   window.open( `https://maps.google.com/?q=${cord1},${cord2}`,'google Map','popup resizable' );
   
}

window.onload = ()=>{

   const XHR = new XMLHttpRequest();
   XHR.open( 'GET', API_URL );
   XHR.send();

   XHR.onload = () =>{
   
   const CSV_TEXT = XHR.response;

   const DATA_ARRAY = ILovePapa( CSV_TEXT );
   const DATA_OBJECT = mapData( DATA_ARRAY.data );
   fillSelectElement( DATA_OBJECT );


   document.querySelector( 'select' ).onchange = ( event )=>{

      document.querySelector( 'h3' ).innerText = '';
      let nodeArray = document.querySelectorAll( "p" );

      nodeArray.forEach(( nodes, index, array ) => { array[index].remove() });
      
      createOutput( DATA_OBJECT, event.target.value );
   }
} 
   XHR.onerror = () => console.error( 'HTTP Fehler', XHR.status, XHR.statusText );

   }
