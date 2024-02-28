// POWERED BY DARWIN SIGIT
const fs = require('fs')
const chalk=require('chalk')
const axios = require('axios');
// LIB
global.version = require('@whiskeysockets/baileys/package.json').version
global.baileys = require('@whiskeysockets/baileys') 

// SETTING SYSTEM
global.owner = '6282143965793@s.whatsapp.net' // akses owner
global.owner2 = '6282143965793' // nomor owner
global.namabotnya = 'Alice Bot Whatsapp' // nama bot
global.idgcs = "120363211634431387@g.us" // opsional ID group
global.idsal = "120363211634431387@g.us" // opsional ID saluran
global.namaownernya = 'NICKY' // owner name
global.packname = '©Powered By Alice' // watermark
global.author = 'Null' // your name
global.sessionName = '.auth_state' // dont change

// SETTING PAIRING KODE BY DARWIN
global.usePairingCode = true
global.pairingNumber = '6285649689058'

// SET OWNER
global.fake = 'ᴘᴏᴡᴇʀᴇᴅ ʙʏ NICKY'
global.email = 'nickywanlin198@gmail.com'
global.group = 'chat.whatsapp.com/CUCSSvTRdCIBbS2xQDj7am'
global.saluran = 'https://chat.whatsapp.com/CUCSSvTRdCIBbS2xQDj7am'
global.youtube = 'https://youtube.com/@NESF_NICKY'
global.instagram = 'https://instagram.com//'
global.github = 'https://github.com/Nickywanlin12'
global.wame = 'https://wa.me/6282143965793'
global.region = 'I`m From Indonesia'

// SETTING BOT
global.prefix = ['.']
global.self = false //true untuk public
global.autoreadsw = true
global.autoread = true
global.chatgpt = false
global.welcome = true
global.game = true
global.autoreject = true
global.autodelete = false
global.antilink = true
global.antiSpam = true
global.antibot = true
global.autodonlod = true
global.autoTyping = true
global.pengingat = false
global.tekspushkonv2 = ''
global.select = 1

// RESPON AKSES
global.mess = {
sukses: '*[ Loaded Success ]*',
admin: '*[ System Notice ]* for *admin!* not *npc*',
botAdmin: '*[ System Notice ]* please add bot *admin*',
owner: '*[ System Access Failed ]* Access Denied',
group: '*[ System Notice ]* Use this in group chat!',
private: '*[ System Notice ]* Use this in private chat!',
bot: '*[ System Notice ]* Only Bot user',
error: '*[ System Failed ]* Error, please contact the owner',
wait: '*[ Loading ]* Please Wait',
prem: '*[ System Notice ]* this only premium user'
}

// THUMBNAIL PP BOT
global.ppkosong = 'https://telegra.ph/file/98aa5b8b01f53877824c3.jpg'
global.trash = fs.readFileSync('./Procfile')
global.thumb = {url: "https://telegra.ph/file/ebdb48d70f4d2c1944b69.jpg"}

// FAKE TROLI REPLY
global.f1 = (a, b) => {
let fake = {key: {remoteJid: 'status@broadcast', participant: '42424242435@s.whatsapp.net'}, message: {orderMessage: {itemCount: 1, status: 1, surface: 1, message: a, orderTitle: '', thumbnail: b, sellerJid: '4242242354@s.whatsapp.net'}}};
return fake
}

// DDOS
global.ddos = 'https://privatedodeeenzxoffc.deenzxofficial.xyz'


// PANEL SETTING
global.domain = 'https://' // isi domain panel anda
global.apicred = 'ptla_oAfITaP0pP2ZpzVCq6NHMRA7lSbhOJ8uIdTO'
global.apiuser = 'ptlc_JJVEJxCP32kMjMdHOJOOQhXHFex15R9WB'
global.eggsnya = '15' // id eggs yang dipakai
global.location = '1' // id location




// SETTING APIKEY OPENAI & FILESTACK
global.keyopenai = `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` //opsional
global.fileStackApi = `AK5imWKw4QMeyD0g2ij2oz` //opsional - daftar di filestack

// APIKEY
global.rosekey = `Rk-1924d676ee0cd900132ed194_free_tier` //NO LIMIT
global.skyzo = `refan`
global.lolkey = 'haikalgans'
global.zeeone = `QIO8xicLNkEV43Y`

// SETTING GAME
global.gamewaktu = 60 // Game waktu
global.bmin = 1000 // Balance minimal 
global.bmax = 3000 // Balance maksimal
global.limit = 15 // Limit user

// DATABASE GAME
global.suit = {};
global.tictactoe = {};
global.petakbom = {};
global.kuis = {};
global.siapakahaku = {};
global.asahotak = {};
global.susunkata = {};
global.caklontong = {};
global.family100 = {};
global.tebaklirik = {};
global.tebaklagu = {};
global.tebakgambar = {};
global.tebakkimia = {};
global.tebakkata = {};
global.tebakkalimat = {};
global.tebakbendera = {};
global.tebakanime = {};
global.kuismath = {};

// GLOBAL MIMETYPE
global.doc1 = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
global.doc2 = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
global.doc3 = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
global.doc4 = 'application/zip'
global.doc5 = 'application/pdf'
global.doc6 = 'application/vnd.android.package-archive'

// RELOAD FILE UPDATE
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})