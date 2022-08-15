// Core modules

// module file system
const fs = require('fs');

// // menuliskan string ke file  (secara synchronous)
// try {
//     fs.writeFileSync('data/test1.txt', 'Menulis teks di file secara synchronous');
// } catch (e) {
//     console.log(e);
// }

// menuliskan string ke file (secara asynchronous)
// fs.writeFile('data/test2.txt', 'Menulis teks di file secara asynchronous', (e) => {
//     console.log(e);
// });

// membaca isi file (synchronous)
// const data1 = fs.readFileSync('data/test1.txt', 'utf-8');
// console.log(data1);

// membaca isi file (asynchronous)
// fs.readFile('data/test2.txt', 'utf-8', (err, data) => {
//     if(err) throw err;
//     console.log(data);
// });

// Readline (input dan output)
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
});

rl.question('Masukan nama anda : ', (nama) => {
    rl.question('Masukan jenis kelamin anda : ', (sex) => {
        console.log(`Hello ${nama}!! \nwelcome to new wolrd of pokemon`);
        console.log(`Gender kamu adalah : ${sex}`);
        rl.close();
    });
});

