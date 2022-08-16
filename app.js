const { command, describe } = require("yargs");
const yargs = require("yargs");
const { saveData, showData, detailData, deleteData } = require("./myModul/kontak"); 
//menggunkana { } untun memanggil hanya satu modul secara spesifik
// contoh diatas memanggil hanya fungsi saveData pada module quest.js

// Command untuk menambahkan data
yargs.command({
    command: 'add',
    describe:   'menambah kontak baru',
    builder: {
        name: {
            describe: 'nama kontak',
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'email kontak',
            demandOption: false,
            type: 'string',
        },
        noHp: {
            describe: 'nomor telpon',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv){
        saveData(argv.name, argv.email, argv.noHp);
    },
}).demandCommand();

// Command untuk menampilkan data
yargs.command({
    command: 'list',
    describe: 'menampilkan data kontak',
    handler() {
        showData();
    }, 
});

// command untuk menampilkan detail data kontak
yargs.command({
    command: 'detail',
    describe:'menampilkan detail data kontak berdasarkan nama',
    builder: {
        nama: {
            describe: 'nama kontak',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        detailData(argv.nama);
    }, 
});

// command untuk menghapus data kontak
yargs.command({
    command: 'delete',
    describe: 'menghapus data kontak berdasarkan nama',
    builder: {
        nama: {
            describe: 'nama kontak',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv){
        deleteData(argv.nama);
    }
})


yargs.parse();