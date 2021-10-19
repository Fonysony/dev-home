// Import the franc npm to start detecting language to return the code number
// Destructing for only franc - supports 187 languages, and francAll - supports all
import {franc, francAll} from 'franc'
// Import langs to output an object of a langauge
import langs from 'langs';



// Grab the process.argv third argument
const input = process.argv.splice(2);

// try {
// // Grab the code name for a detected language
// const langCode = francAll(input[0]);
// const langObject = langs.where('3', langCode);
// console.log(langObject.name);

// } catch(err) {
//     console.log('Could not match a language. Please try again with a larger sample');
// }

const langCode = francAll(input[0]);
try {
    let winLang;
    let max = 0;
    for (const lang of langCode) {
        if (lang[1] > max) {
            winLang = lang;
            max = lang[1];
        }
    }
    console.log(winLang);
    console.log(langs.where('3', winLang[0]));

} catch {
    console.log('Could not match a language. Please try again with a larger sample');
}


