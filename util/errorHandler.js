const config = require("../config.json")
const db = require("quick.db");
const { valueOf } = require("ffmpeg-static");



module.exports = {

handle(message, err) {

if(!message) return new Error("No message provided !");
if(!err) err = "error not provided !";

function chart(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 

 let errid = chart(20)


 let constructor = {
     "id": errid,
     "err": err.message||null,
     "nameerr": err.name||null,
     "date": Date.now(),
     "user": message.author.id||null,
     "guild": message.guild ? message.guild.id||null : null
 }

db.errors.set(errid, constructor)

return errid;

},

fetch(errid) {
    let err = db.errors.get(errid)
    return err;
}



    
}
