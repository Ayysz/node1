// belajar npm module (thrid party app)

const validator = require('validator');
const chalk = require('chalk');


console.log(validator.isNumeric('80123617312')); //menghasilkan true 


// package chalk modifikasi yg tampil di command line
console.log(chalk.bgBlue.italic('Ini warna biru coi\n'));

// bisa make template literal juga anjas
const teks = chalk`hello {bgRed.italic.black mamat}, Welcome to new world of {bgYellow.black pokemon}`;

console.log(teks);

// note untuk  install spesifik versi package bisa dengan 'npm i {nama_package}@{versi}'