
const fs = require('fs');

function readDir(path) {
    const maps = {};
    

}

function readDir (dir, cb) {
    if (dir.length) {
        for (let i = 0; i < dir.length; i ++) {
            readDir (dir[i]);
        }
    } else {
        
    }
}

async function print(path) {
    const dir = await fs.readdir(path, (err, data) => {
        // console.log(data);
        for (let i = 0; i < data.length; i ++) {
            readDir(data[i]);
        }
        readDir()
    });
    // console.log(dir);
    // for await (const dirent of dir) {
    //     console.log(dirent.name);
    // }
}
print('./pages').catch(console.error);