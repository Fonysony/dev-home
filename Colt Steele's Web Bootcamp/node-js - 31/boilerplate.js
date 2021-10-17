const fs = require('fs');
const folderName = process.argv[2] || 'project'; // Will grab the third argument that we passed it. Also checks to if it's not undefined or null
const src = `${folderName}/src`;                 // and will deafult to project if so.

// fs.mkdir('Dogs', { recursive: true }, (err) => {
//     console.log('IN THE CALLBACK!!');
//     if (err) throw err;
// });

fs.mkdirSync(folderName);
fs.mkdirSync(src);
fs.writeFileSync(`${src}/index.html`, '');
fs.writeFileSync(`${src}/style.css`, '');
fs.writeFileSync(`${src}/app.js`, '');



console.log('I COME AFTER MKDIR IN THE FILE!!!');