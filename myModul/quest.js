const chalk = require('chalk');
const validator = require('validator');
const fs = require('fs');

var env = require('dotenv').config();
    env = process.env;

// const readline = require('readline');
//     const rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout,
//     });
    

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

        // cek duplikat nama
        const duplicates = contacts.find(contact => contact.nama === nama);
        if(duplicates){
            console.log(chalk.bold.italic.bgRedBright(`Nama ${nama} sudah terdaftar silahkan gunakan nama lain!!`));
            return false;
        };
        
        // cek email dan noTelepon
        if(validator.isInt(hp)){
            if(!validator.isMobilePhone(hp, 'id-ID')){
                console.log(chalk.bold.italic.bgRedBright(`input yang dimasukan bukan nomor handphone indonesia`));
                return false;
            }
        }else{
            console.log(chalk.bold.italic.bgRedBright(`input yang dimasukan bukan nomor telepon`));
            return false;     
        }
        
        if(email){
            if(!validator.isEmail(email)){
                console.log(chalk.bold.italic.bgRedBright(`input yang dimasukan bukan email!!`));
                return false;
            }
        }
        

        // menambah data yang pada variable json
        contacts.push(json);

        // menuliskan ke data.json
        fs.writeFile(pathJson, JSON.stringify(contacts, null, 2), (err) => {
            if(err) throw err;
            console.log(chalk.bold.italic.inverse.green('\n===> data telah tersipman <==='));
            console.table(json);
        });
        
        // readline ditutup / berakhir
        // rl.close();
}
