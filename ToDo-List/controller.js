const { readFile } = require("fs/promises");
const { writeFile } = require("fs");

module.exports.controller = {
  /**
   * 
   * @param {String} path filepath 
   * @returns file content as Object
   */
  read: async (path) => {
    let object = {
      error: "",
    };
    try {
      let content = await readFile(path, "utf-8");

      let object = JSON.parse(content);
      object.error = "";
      if (object.list.length < 1) {
        object.counter = 1;
      }
      return object;
    } catch (error) {
      console.log("error bei controller.js function read: ", error);
      object.error = "beim laden der Daten ist leider ein fehler aufgetretten";
      return object;
    }
  },
  /**
   * 
   * @param {String} path filepath 
   * @param {*} todolist the Object you want to add 
   * @returns file content as Object 
   */
  readToSave: async (path, todolist) => {
    let object = {
      error: "",
    };
    try {
      let content = await readFile(path, "utf-8");
      const object = await JSON.parse(content);
      object.error = "";
      object.counter = todolist.counter
      let check = false;

      if(object.list.length === 0){
        check = true
    }else{
        object.list.forEach((item) => {
            if(item.name === todolist.list.name) {
                object.error = "dieses Element ist schon vorhanden";
                return;
            } else {
            check = true;
            }
        });}
    
      if(check) object.list.unshift(todolist.list);

      writeFile(path, JSON.stringify(object), (error) => {
        if (error)
          console.log("etwas ist beim beschreiben der Datei schief gegangen: ",error);
      });
      object.counter++
      return object;

    } catch (error) {
        object.error ="beim lesen/schreiben der Daten ist leider ein Fehler aufgetreten";
        return object;
    }
  },
  /**
   * 
@param {String} path filepath 
   * @param {*} todolist the Object you want to delete
   * @returns file content as Object 
   */
  readToDelete: async (path,todolist)=>{
    try {
        let content = await readFile(path, "utf-8");
        const object = await JSON.parse(content);
        object.error = "";
        
        if(object.list.length !== 0){
          
          object.list.forEach((item,index) => {
            
            if(item.name === todolist.list.name) {
                object.list.splice(index,1)
                return;
            } 
          })
        }
      
        writeFile(path, JSON.stringify(object), (error) => {
          if (error)
            console.log("etwas ist beim beschreiben der Datei schief gegangen: ",error);
        });
        return object;
  
      } catch (error) {
          object.error ="beim lesen/schreiben der Daten ist leider ein Fehler aufgetreten";
          return object;
      }
  },
};
