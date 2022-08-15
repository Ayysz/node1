const fs = require('fs');

var env = require('dotenv').config();
    env = process.env;

const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    

// mengambil variable dari .env
const directPath = env.data_path;
const pathJson = directPath+'/data.json';


// cek folder jika ada dibuat jika tidak lanjut
if(!fs.existsSync(directPath)){
    fs.mkdirSync(directPath);
} 

if(!fs.existsSync(pathJson)) {
    fs.writeFileSync(pathJson, '[]', 'utf-8');
}

// promise pertanyaan
exports.question = (question) => {
    return new Promise((resolve, reject) => {
        rl.question(`${question} \n>_`, data => resolve(data));
    });
};

// Menyimpan Data
exports.saveData = (nama,email,hp) => {
    let json = {nama, hp, email};

        // membaca file json (./data/data.json)
        const fileBuffer = fs.readFileSync(pathJson, 'utf-8');
        const contacts = JSON.parse(fileBuffer);

        // menambah data yang pada variable json
        contacts.push(json);

        // menuliskan ke data.json
        fs.writeFile(pathJson, JSON.stringify(contacts, null, 2), (err) => {
            if(err) throw err;
            console.log('\n===> data telah tersipman <===');
            console.table(json);
        });
        
        // readline ditutup / berakhir
        rl.close();
}
