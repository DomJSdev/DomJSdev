'use strict'

const TABLE_OUTPUT = [ 'prename', 'lastname', 'age', 'occupied', 'registered' ];

  //////////////////////////////////////////////////////////
 // füllt die Select Objekte in Html mit OPTION Objekten //
//////////////////////////////////////////////////////////

/**
 * 
 * @param {Object} object 
 * @param {String} id 
 * @param {Number} cut 
 */
function fillSelectHtml( object, id, cut ){

  for( let key in object ){

    // bereinigen der key die keinen inhalt haben
    if( object[key].length === 0 ){
      delete object[key];
      
    }else{
      let optionText = key 
      const OPTION = document.createElement( "OPTION" );
      
      if( key.includes('_') ) optionText = key.replace( '_', ' - ' )  
    
      OPTION.innerText = optionText.substring( cut );

      OPTION.setAttribute( 'value', key )

      document.getElementById( id ).appendChild( OPTION );
    }
  }  
}

//////////////////////////////////////
// erstellen einer TABLEle in Html //
////////////////////////////////////

/**
 * 
 * @param {Objekt} objekt  
 * @param {String} key
 * @param {String} marked  
 */
function creatTable( objekt, key, marked ){

  // ansprechen des Html Element wo es ausgegeben werden soll
  const DIV = document.getElementById( 'tablecontainer' );

  const TABLE = document.createElement( 'table' );
  const T_HEAD = document.createElement( 'thead' );
  const TR = document.createElement( 'tr' );

  // erstellen der Tableheader
  for( let i=0; i < TABLE_OUTPUT.length; i++ ){
    const TD = document.createElement( 'th' );
    TD.innerText = TABLE_OUTPUT[i].toUpperCase();
    TR.appendChild( TD );
    
  }
  T_HEAD.appendChild( TR );
  TABLE.appendChild( T_HEAD );

  //erstelllen des Tablebodys
  let tbody = document.createElement( 'tbody' );
  
  for( let c=0; c < objekt[key].length; c++ ){
  
    for( let i=0; i < 1; i++ ){
      const TR = document.createElement( 'tr' );
  
      for( let i=0; i < TABLE_OUTPUT.length; i++ ){
        const TD = document.createElement( 'td' );
        
        if( TABLE_OUTPUT[i] === marked ){
          TD.className = 'marked';
        }
        if( TABLE_OUTPUT[i] === 'registered' ){
          let userRegistered = objekt[key][c][TABLE_OUTPUT[i]]
          
          let textString = userRegistered.toString();
          textString = textString.substr( 0, 15 );

          TD.innerText = textString; 

        }else{
        
          TD.innerText = objekt[key][c][TABLE_OUTPUT[i]];    // z.b. ageObjekt[age18_29][0][prename]
       } 
       TR.appendChild( TD );
    }
    tbody.appendChild( TR );
  }
    }
    TABLE.appendChild( tbody );
    DIV.appendChild( TABLE );
}
