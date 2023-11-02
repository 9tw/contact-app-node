const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// const tulisPertanyaan = (pertanyaan) => {
//     return new Promise((resolve, reject) => {
//         rl.question(pertanyaan, (nama) => {
//             resolve(nama);
//         });
//     });
// };

const loadContact = () => {
    const file =  fs.readFileSync('./data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}

const simpanContact = (nama, email, noHP) => {
    const contact = { nama, email, noHP };
    const contacts = loadContact();

    // cek duplikat nama
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if (duplikat) {
        console.log(
            chalk.red.inverse.bold(`Nama sudah terdaftar.`)
        );
        return false;
    }

    // cek email
    if (email) {
        if (!validator.isEmail(email)) {
            console.log(
                chalk.red.inverse.bold(`Isi Email dengan benar.`)
            );
            return false;
        }
    }

    // cek no HP
    if (!validator.isMobilePhone(noHP, 'id-ID')) {
        console.log(
            chalk.red.inverse.bold(`No HP tidak diketahui.`)
        );
        return false;
    }

    contacts.push(contact);
    fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts));
    console.log(
        chalk.green.inverse.bold('Terima kasih sudah memasukan data.')
    );
};

const listContact = () => {
    const contacts = loadContact();
    console.log(
        chalk.blue.inverse.bold('Daftar Contact:')
    );
    contacts.forEach((contact, i) => {
        console.log(`${i+1}. ${contact.nama} - ${contact.noHP}`);
    });
};

module.exports = {simpanContact, listContact};