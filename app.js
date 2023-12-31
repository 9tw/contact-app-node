const contacts = require('./contacts');
const yargs = require("yargs");

// const main = async () => {
//     const nama = await contacts.tulisPertanyaan('Masukan nama anda : ');
//     const email = await contacts.tulisPertanyaan('Masukan email anda : ');
//     const noHP = await contacts.tulisPertanyaan('Masukan no HP anda : ');

//     contacts.simpanContact(nama, email, noHP);
// }

// main();

// perintah menambahkan kontak
yargs.command({
    command: 'add',
    describe: 'Menambahkan contact baru',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'Alamat email',
            demandOption: false,
            type: 'string',
        },
        noHP: {
            describe: 'Nomor handphone',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        contacts.simpanContact(argv.nama, argv.email, argv.noHP);
    },
})
.demandCommand();

// perintah melihat kontak
yargs.command({
    command: 'list',
    describe: 'Menampilkan semua contact',
    handler() {
        contacts.listContact();
    },
});

// perintah melihat detail kontak
yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail contact',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        contacts.detailContact(argv.nama);
    },
});

// perintah hapus kontak
yargs.command({
    command: 'delete',
    describe: 'Menghapus contact',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        contacts.deleteContact(argv.nama);
    },
});

yargs.parse();