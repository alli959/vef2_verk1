
/* útfæra greina virkni */


const fs = require('fs');
const MarkdownIt = require('markdown-it');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


const encoding = 'utf8';
const input = 'articles/batman-ipsum.md'
const output = 'test.html';

async function read(file){
   return readFileAsync(file)
    .then(data => data.toString(encoding));
}

async function write(filepath, content, callback){
    const md = new MarkdownIt();
    const result = md.render(content);
    
    return writeFileAsync(filepath, result, {encoding});

}

async function main(){
    const data = await read(input);
    await write(output, data);
    console.log(`Done writing ${output}`);
}

main();

/*read(input)
    .then(data => write(output, data))
    .then(data => console.log(`Done writing ${output}`));*/


/*
read(input, (data) =>{

    write(output, data, ()=>{
        console.info('Done writing ${input}')
    });

});*/
