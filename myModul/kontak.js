const chalk = require('chalk');
const validator = require('validator');
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

// load data.json
const loadContact = () => {
    // membaca file json (./data/data.json)
    const fileBuffer = fs.readFileSync(pathJson, 'utf-8');
    return contacts = JSON.parse(fileBuffer);
};

// Menyimpan Data
exports.saveData = (nama,email,hp) => {
    let json = {nama, hp, email};

        loadContact();

        // cek duplikat nama
        const duplicates = contacts.find(contact => contact.nama === nama);
        if(duplicates){
            console.log(chalk.bold.italic.bgRedBright(`Nama ${nama} sudah terdaftar silahkan gunakan nama lain!!`));
            rl.close();
            return false;
        };
        
        // cek email dan noTelepon
        if(validator.isInt(hp)){
            if(!validator.isMobilePhone(hp, 'id-ID')){
                console.log(chalk.bold.italic.bgRedBright(`input yang dimasukan bukan nomor handphone indonesia`));
                rl.close();
                return false;
            }
        }else{
            console.log(chalk.bold.italic.bgRedBright(`input yang dimasukan bukan nomor telepon`));
            rl.close();
            return false;     
        }
        
        if(email){
            if(!validator.isEmail(email)){
                console.log(chalk.bold.italic.bgRedBright(`input yang dimasukan bukan email!!`));
                rl.close();
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
        rl.close();
}

// menampilkan semua data
exports.showData = () => {
    console.log(chalk.inverse.italic.bold.blueBright('Daftar kontak'));
    // console.table(loadContact());
    let dataContact = loadContact();
    dataContact.forEach((contact, i) => {
        console.log(`${i+1}. ${contact.nama} - ${contact.hp}`);
    })
    rl.close();
}

// melihat detail data
exports.detailData = (name) => {
    const data = loadContact();
    const search = data.find((contact) => contact.nama.toLowerCase() === name.toLowerCase());
    
    if(!search){
        console.log(chalk.inverse.bold.redBright(`Data ${name} tidak ditemukan`));
        return false;
    }
    console.log(chalk.inverse.bold.greenBright(`Menampilkan data ${name}`));
    const json = {
        nama: search.nama,
        hp: search.hp,
        email: search.email
    };
    console.table(json);
    rl.close();
};

// menghapus data
exports.deleteData = (nama) => {
    const data = loadContact();
    const newData = data.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

    // cek jika kedua array memilki panjang yg sama
    if(data.length === newData.length){
        console.log(chalk.inverse.bold.redBright(`Data ${nama} tidak ditemukan`));
        return false;
    }
    
    // console.table(newData);
    rl.question('Yakin ingin menghapus data (y/n)? \n>_', (answ) => {
        answ = answ.toLowerCase();
        console.log(answ);
        switch(answ){
            case 'y':
                fs.writeFile(pathJson, JSON.stringify(newData, null, 2), (err) => {
                    if(err) throw err;
                    console.log(chalk.bold.italic.inverse.green('===> data baru telah tersipman <==='));
                    rl.close();
                });
                break;
            case 'n':
                console.log(chalk.inverse.bold.redBright(`program aborted!!`));
                rl.close()
                return false;
            default:
                console.log(chalk.inverse.bold.redBright(`input yang dimasukan salah`));
                console.log(chalk.inverse.bold.redBright(`program aborted!!`));
                rl.close();
        }
    });


};

// rl.close();