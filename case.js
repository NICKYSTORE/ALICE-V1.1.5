
// GLOBAL
require('./settings');
require('./lib/funclist');
require('./system/functions');
// MODULE
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType, downloadContentFromMessage } = global.baileys
const fs = require('fs')
const toMs = require('ms')
const util = require('util')
const FormData = require('form-data')
const cheerio = require('cheerio')
const bochil = require('@bochilteam/scraper')
const client = require('filestack-js').init(fileStackApi)
const chalk = require('chalk')
const crypto = require('crypto')
const { exec, spawn, execSync } = require('child_process')
const axios = require('axios')
const path = require('path')
const os = require('os')
const speed = require('performance-now')
const moment = require('moment-timezone')
const cron = require('node-cron')
const ms = require('parse-ms')
const rimraf = require('rimraf')
const jimp = require('jimp')
const fetch = require('node-fetch')
const { sizeFormatter } = require('human-readable')
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const { Primbon } = require('scrape-primbon')
const primbon = new Primbon()
const { FajarNews, BBCNews, metroNews, CNNNews, iNews, KumparanNews, TribunNews, DailyNews, DetikNews, OkezoneNews, CNBCNews, KompasNews, SindoNews, TempoNews, IndozoneNews, AntaraNews, RepublikaNews, VivaNews, KontanNews, MerdekaNews, KomikuSearch, AniPlanetSearch, KomikFoxSearch, KomikStationSearch, MangakuSearch, KiryuuSearch, KissMangaSearch, KlikMangaSearch, PalingMurah, LayarKaca21, AminoApps, Mangatoon, WAModsSearch, Emojis, CoronaInfo, JalanTikusMeme,Cerpen, Quotes, Couples, Darkjokes } = require('dhn-api')

// LIBRARY - LIB
const { color, bgcolor, mycolor } = require('./lib/color')
const { pinterest } = require("./lib/pinterest")
const anon = require('./lib/menfess')
const { userXp, userLeveling, } = require("./lib/user");
const photooxy = require('./lib/photooxy');
const { TelegraPh } = require('./lib/uploader')
const _sewa = require("./lib/sewa");
const { mediafireDl } = require('./lib/mediafire.js')
const { UploadFileUgu, webp2mp4File, floNime } = require('./lib/uploader')
const { savefromV2, ChatGpt, searchfilm,getSurah, tafsir, instagram4, capcutdl, mediafiredll, instagram2, instagram3, cekkuota, tele, ytPlayMp4, ytPlayMp3, textpro,igdl, kodepos, mediafire, ffstalk, mlstalk, Tiktok, surah, listsurah, ephoto, emoji} = require('./lib/scraper') 
const {toFirstCase,isNumber,formatp,parseMention, resize, getRandom,generateProfilePicture, getCase, runtime, FileSize, h2k, makeid, kyun, randomNomor, jsonformat, isUrl, fetchJson, sleep, getBuffer,} = require("./lib/myfunc");


// CLONE BOT UTAMA
const { AliceClone, conns } = require('./cloneBot/clonebot')



// DATABASE GLOBAL USER
const users = global.db.users
const listall = global.db.listall
const stickercmd = global.db.stickercmd
const AntiSpam = global.db.antispam
const spammer = []



// FUNCTION SALDO & DATA
const { addSaldo, minSaldo, cekSaldo, cekKoinPerak } = require("./database/deposit")
let db_saldo = JSON.parse(fs.readFileSync("./database/saldo.json"));
function toRupiah(angka) {
var saldo = '';
var angkarev = angka.toString().split('').reverse().join('');
for (var i = 0; i < angkarev.length; i++)
if (i % 3 == 0) saldo += angkarev.substr(i, 3) + '.';
return '' + saldo.split('', saldo.length - 1).reverse().join('');
}
// BATAS SALDO

// EXPORT MODULE/HOOK FUNCTION
module.exports = async(alice, m, update, store, jid, setting) => {
const { limitCount } = global.limit
const { pushname, botNumber, content, senderNumber, from, fromMe, isGc, sender, isBaileys, type } = m
if (m.key && m.key.remoteJid === 'status@broadcast') return
if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) return
try {
if (m.key && m.key.remoteJid === 'status@broadcast') return;

// SYSTEM HOOK
const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'stickerMessage' && stickercmd[m.message.stickerMessage.fileSha256.toString('base64')] !== undefined) ? stickercmd[m.message.stickerMessage.fileSha256.toString('base64')].text : '.'
const budy = (typeof m.text == 'string' ? m.text : '')
const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '' // di string '' kasih '.' sebelumnya, guna untuk hanya owner yang tidak mengenakan prefix dan pengguna lain menggunakan prefix titik
const isCmd = body.startsWith(prefix)
const from = m.key.remoteJid
const args = body.trim().split(/ +/).slice(1)
const isGroup = m.key.remoteJid.endsWith('@g.us')
const pushname = m.pushName || 'No Name'
const botNumber = alice.user.id.split(':')[0]+'@s.whatsapp.net'
const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
const isCreator = global.owner.includes(m.sender)
const isOwner = global.owner.includes(m.sender) || (users[m.sender] !== undefined ? users[m.sender].owner : false)

const command = isOwner ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : isCmd ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : '';
const comand = prefix + command;
const text = args.join(' '), q = args.join(' ');
const quoted = m.quoted ? m.quoted : m;
const froms = m.quoted ? m.quoted.sender : text ? (text.replace(/[^0-9]/g, '') ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false) : false;
const qm = (m.quoted || m)
const _quoted = (qm.type == 'buttonsMessage') ? qm[Object.keys(qm)[1]] : (qm.type == 'templateMessage') ? qm.hydratedTemplate[Object.keys(qm.hydratedTemplate)[1]] : (qm.type == 'product') ? qm[Object.keys(qm)[0]] : m.quoted ? m.quoted : m
const qmsg = (_quoted.msg || _quoted)



// DATABASE RPG GAMES
let _limit = JSON.parse(fs.readFileSync('./database/rpg/limit.json'));
let sewa = JSON.parse(fs.readFileSync('./database/sewa.json'));
let _buruan = JSON.parse(fs.readFileSync('./database/rpg/hasil_buruan.json'));
let _darahOrg = JSON.parse(fs.readFileSync('./database/rpg/darah.json'))
let balance = JSON.parse(fs.readFileSync('./database/balance.json'));
let _petualang = JSON.parse(fs.readFileSync('./database/rpg/inventory.json'))
const { addInventoriDarah, cekDuluJoinAdaApaKagaDiJson, addDarah, kurangDarah, getDarah } = require('./database/rpg/darah.js')
const { cekInventoryAdaAtauGak } = require('./database/rpg/alat_tukar.js')
const { addInventoriMonay, cekDuluJoinAdaApaKagaMonaynyaDiJson, addMonay, kurangMonay, getMonay } = require('./database/rpg/monay.js')
const { addInventoriLimit, cekDuluJoinAdaApaKagaLimitnyaDiJson, addLimit, kurangLimit } = require('./database/rpg/limit.js')
const { cekDuluHasilBuruanNya, addInventoriBuruan, addAyam, addKelinci, addDomba, addSapi, addGajah, kurangIkan, kurangAyam, kurangKelinci, kurangDomba, kurangSapi,kurangGajah, getIkan, getAyam, getKelinci, getDomba,getSapi,getGajah} = require('./database/rpg/buruan.js')
const { getLevelingXp,getLevelingLevel,getLevelingId,addLevelingXp,addLevelingLevel,addLevelingId,addATM,addKoinUser,checkATMuser,addIkan,getMancingIkan,getMancingId,addMancingId,jualIkan,addPlanet,getBertualangPlanet,getPlaneId,addPlaneId,jualbahankimia,addCoal,getMiningcoal,getMiningId,addMiningId,jualcoal,addStone,getMiningstone,getBatuId,addBatuId,jualstone,addOre,getMiningore,getOreId,addOreId,jualore,addIngot,getMiningingot,getIngotId,addIngotId,jualingot,addKayu,getNebangKayu,getNebangId,addNebangId,jualKayu, checkPetualangUser, addInventori, sellBesi, addDm, sellDm, getDm, sellEmas, addFish, sellFish, getFish, addBesi, addEmas, addEmerald, addUmpan, addPotion, kurangBesi, kurangEmas, kurangEmerald, kurangUmpan, kurangPotion,getBesi, getEmas, getEmerald,getUmpan,getPotion} = require('./database/rpg/rpg.js')
const { getLimit, isLimit, limitAdd, giveLimit, addBalance, kurangBalance, getBalance, isGame, gameAdd, givegame, cekGLimit } = require("./lib/limit");
const isDarah = cekDuluJoinAdaApaKagaDiJson(m.senpder)
const isCekDarah = getDarah(m.sender)
const isUmpan = getUmpan(m.sender)
const isSewa = _sewa.checkSewaGroup(from, sewa)
const isPotion = getPotion(m.sender)
const isIkan = getIkan(m.sender)
const isAyam = getAyam(m.sender)
const isKelinci = getKelinci(m.sender)
const isDomba = getDomba(m.sender)
const isSapi = getSapi(m.sender)
const isGajah = getGajah(m.sender)
const isMonay = getMonay(m.sender)
const isBesi = getBesi(m.sender)
const isEmas = getEmas(m.sender)
const isEmerald = getEmerald(m.sender)
const isInventory = cekInventoryAdaAtauGak(m.sender)
const isInventoriBuruan = cekDuluHasilBuruanNya(m.sender)
const isInventoryLimit = cekDuluJoinAdaApaKagaLimitnyaDiJson(m.sender)
const isInventoryMonay = cekDuluJoinAdaApaKagaMonaynyaDiJson(m.sender)
const isPetualang = checkPetualangUser(m.sender)
// SETTING USER RPG
let DarahAwal = 100;
const ikan = ['🐟','🐠','🐡']
const enter = '\n'
// BATAS RPG



// FUNCTION WAKTU
let d = new Date
let gmt = new Date(0).getTime() - new Date('1 Januari 2023').getTime()
const weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
const week = d.toLocaleDateString('id', { weekday: 'long' })
const calender = d.toLocaleDateString('id', { day: 'numeric', month: 'long', year: 'numeric' })
const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")
const timestampp = speed();
const latensi = speed() - timestampp
let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const salam = 'Selamat '+dt.charAt(0).toUpperCase() + dt.slice(1)
    
    
// GROUP METADATA
const groupMetadata = m.isGroup ? await alice.groupMetadata(m.chat) : {} || {};
const groupName = m.isGroup ? groupMetadata?.subject : '' || '';
const participants = m.isGroup ? groupMetadata?.participants : [] || [];
const groupAdmins = m.isGroup ? await participants.filter((v) => v.admin !== null).map((i) => i.id) : [] || [];
const groupOwner = m.isGroup ? groupMetadata?.owner : false;
const groups = global.db.groups[m.chat] !== undefined ? global.db.groups[m.chat] : false;
const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;

// FANGSIEN RPG
if (m.isGroup) {
const Fisha = await getMancingIkan(m.sender)
const FishId = await getMancingId(m.sender)
if (Fisha === undefined && FishId === undefined) await addMancingId(m.sender)}

// REGISTER BOT
const { getRegisteredRandomId, addRegisteredUser, createSerial, checkRegisteredUser } = require('./database/register.js')
const isRegistered = checkRegisteredUser(m.sender)

// AMBIL PP USER
try {
var ppuser = await alice.profilePictureUrl(m.sender, 'image')} catch (err) {
let ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'}
let ppnyauser = await getBuffer(ppuser)


// AUTO SAVE DATABASE
const isBanned = db.users[sender] !== undefined ? db.users[sender].banned : false
const isPremium = db.users[sender] !== undefined ? db.users[sender].premium : false
const isNumber = x => typeof x === 'number' && !isNaN(x)
try {
let user = db.users[sender]
if (user) {
if (typeof user !== 'object') db.users[sender] = {}
if (!('jid' in user)) user.jid = sender
if (!('name' in user)) user.name = pushname
if (!('date' in user)) user.date = calender
if (!isNumber(user.limit)) user.limit = 15
if (!isNumber(user.balance)) user.balance = 10000
if (!('banned' in user)) user.banned = false
if (!('premium' in user)) user.premium = false
if (!isNumber(user.expired)) user.expired = Date.now() + toMs('7d')
} else db.users[sender] = {
jid: sender,
name: pushname,
date: calender,
limit: 15,
balance: 10000,
banned: false,
premium: false,
expired: Date.now() + toMs('7d')
}
} catch (err) {
console.error(err)
}


// FANGSIEN MENTION
const ments = (teks) => {return teks.match('@') ? [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net') : [sender]}
const numberQuery = text.replace(new RegExp("[()+-/ +/]", "gi"), "") + "@s.whatsapp.net"
const mentionByTag = m.mtype == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : []
const Input = mentionByTag[0] ? mentionByTag[0] : q ? numberQuery : false
const tag = `@${m.sender.split('@')[0]}`





// FUNCTION SELF
const Cuekin = !0;

// FUNCTION REACT BY DARWIN
let reactionMessage = baileys.proto.Message.ReactionMessage.create({ key: m.key, text: "" })


// READ MORE/BACA SELENGKAPNYA
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

// GET QUOTES ANIME
const resis = await Quotes()

// FUNCTION NOMOR USER
const nomore = m.sender.replace(/[^0-9]/g, '')

// FUNCTION PASSWORD
const pw = crypto.randomBytes(5).toString('hex')


// REPLY CUSTOM TEXT
const menfes ={key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? {remoteJid: "status@broadcast"} : {})}, message: {extendedTextMessage: {text: `${resis.quotes}`}}}
// REPLY WITH TROLI
const ftroli ={key: {fromMe: false,"participant":"0@s.whatsapp.net", "remoteJid": "status@broadcast"}, "message": {orderMessage: {itemCount: 2022,status: 200, thumbnail: ppnyauser, surface: 200, message: 'Alice Bot', orderTitle: 'By Alicezation', sellerJid: '0@s.whatsapp.net'}}, contextInfo: {"forwardingScore":999,"isForwarded":true},sendEphemeral: true}
// REPLY WITH DOCUMENT
const fdoc = {key : {participant : '0@s.whatsapp.net', ...(m.chat ? { remoteJid: `status@broadcast` } : {}) },message: {documentMessage: {title: 'Project Alice',jpegThumbnail: ppnyauser}}}
//REPLY WITH VN
const fvn = {key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "status@broadcast" } : {})},message: { "audioMessage": {"mimetype":"audio/ogg; codecs=opus","seconds":359996400,"ptt": "true"}} } 
// REPLY WITH GIFT
const fgif = {key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "status@broadcast" } : {})},message: {"videoMessage": { "title": 'Alice Project', "h": 'Alice','seconds': '359996400', 'gifPlayback': 'true', 'caption': 'Alice Zuberg', 'jpegThumbnail': ppnyauser}}}
// REPLY WITH GROUP LINK
const fgclink = {key: {participant: "0@s.whatsapp.net","remoteJid": "0@s.whatsapp.net"},"message": {"groupInviteMessage": {"groupJid": "6288213840883-1616169743@g.us","inviteCode": "m","groupName": "Project Alice", "caption": `${pushname}`, 'jpegThumbnail': ppnyauser}}}
// REPLY WITH VIDEO
const fvideo = {key: { fromMe: false,participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "status@broadcast" } : {}) },message: { "videoMessage": { "title": 'Project Alice', "h": 'Alice Bot','seconds': '359996400', 'caption': `${pushname}`, 'jpegThumbnail': "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhISExMVFRUWFRcVFhUVFRUVFRUVFxUWFhYVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGi0dHyUtLSstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKgBLAMBEQACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAEAQIDBQYAB//EAD8QAAEDAQQGCAMHBAICAwAAAAEAAhEDBBIhMQVBUWFxgQYTIjKRobHBUtHwB0JygpLh8RRiorIjMyTCFWNz/8QAGwEAAgMBAQEAAAAAAAAAAAAAAQIAAwQFBgf/xAA1EQACAQMDAwIEBAYCAwEAAAAAAQIDBBESITEFE0FRYSIycbEGgZGhFBUjQsHhM9E0UvEk/9oADAMBAAIRAxEAPwDYHo0Su8r5HJ/hmV2kNCvp46lopXUamxTOi4latJSK0KEFhAgoQAKECCwoEWFCCqEFUAdCBBVAHKEOQIciQRQhygMiQoEsdF6HfWx7rPiPsNa5l91OnbrSvil6f7NltZzrb8I1Nh0TSpxdbJ+J2J/bkvK3V/XuPme3ouDuUbanS+Vfn5Drqw6TRkddR0kyNclkkQCNsbsKyuoi9U2SNeDkUeRWscgds0ZSqd5gnaMD4hbbfqFxbfJJ/TwUVbalV+ZGc0l0bc3tUzfGz7w+a9PY/iKFT4ay0v18HHuOlyjvTeV+5QlkZr0kZallHKaaeGPe9sIYeQGJq1LznO2knxMpEzpRWFgioP7R3pYvcZiVhii+QDnpiAVSqWPa9pgj6hZLujGrBxl5LqFR05KS8HoWhK8sY/4m3o4xh5wvnNeg5Ve1HnOD08qq7et8YyXERnnr4r3dpQVGjGC8HjLmt3ajm/IwuWrBRk9NLAuJlnbwiu03QLqZAGK0W09MtyivHMTP2XQN4SQuhO7w9jHGhkPs/R9gzVEryTLVboZaej1OCUYXss4BK3ikZS0UrriF1YS1I58lhkaYGRQgQVQmRUACqEOUAcoQVQhyBDrqhBwpoZIPp2Yk4BBzSDgt9FaEvOl/dGrbuXF6l1XtLRT+Z/sdOzsXP4p8fc1NOmAAAIAwwXlW3Jts7eElhDypgJwChDigyEVane7MkcPRXULVVk9XAsqjhxyT0tHUh90Hjj6rbC0pQ4ihJVpvljn2eO41kbC33HyVjgl8qQmc8i0qE94N4ADDnrUjDK+JImfQSpYmHIRww8slXO1pT5Q0akl5KHTHR5r+0f1NEGP7h7+iahcXNkn23rj6PwV1aFK4+ZYfqVFTonSc1zesfiCJF2RI4KP8S3D20oWPSaSaeWZvSv2clrHOo1i4gEhj2gF0DIOBz5LRQ/EbnLTUjj3THnY4WYs86pP7Q4r0UJJ4Zz2giuVokKc4pgAFsOW1Z67SjkeCy8HouhafZZsY2OJwA9CfBeS6Vbd24nXktk9jqdWuO3SjSXL+xZkyvUnmRLqIT04VFxMHa1DajpRSBJoY1wCLWRFLBxcokHUQ2ineaQnhLDEksozdTQMkldKN3sYpW+5U26xFhWqnV1oz1IaQRWlQoUIKEAjggQSFACqAOUCcoAUFRhFLyhhAbDdGlznhoXP6lcRt6Ln58fU2WVB1qqj48/Q2dnpXQAvENuUnJ8s9LhJYXBME6AcgE4lR7EGEpEnJ4JwPs+JXchBU4KJkzqeQwI5CKTCgRrHg5EHhigmnwRrA5Eg0okM5pexNa4uZ2Tm5uWB+83wMhca/tY/PDnlm23r/ANsiWz1LzA7diubF5WS2Swzxr7RtEf09rLmiGVv+RuwOntt8cfzL2vRrru0UnzHb/o491T0T28lFWOC9EzGjnFHwAfoeyiraqDCJbeLncGi97RzWeusrDJKeiOpcnpVOg1outAAVEIRprTFYRjnUlUeqTyxTCfcrbEkbUCakb1loXNcDpRqCurBRRI5CdYppBk4VVNJNZ3XKaSaxDVGtFReSaii0w5hnat1upIzVmjPELfkxkgpyg5BwStsbiJSOokFRZE9haCTgAJJ2AZqOpFLLIotvCKdunmTF10bcPGFz/wCa0s4aZ0/5TV05ys+hZ0KzXi80yF0KdWFSOqLyc2rSnTeJLDJE5Xk5QGTlCZOhQhpejdkgXzrx+S8R1m671xoXEfueo6fQ7VHL5kaFq56NTOKbIByBBpCDCiGu+Ar7SK163whKr2G0nHEyROUYI3l5LXpg9gUqaS3FLAue6s3y2X4Rz3YQSY3nBNKvUlHTkGiK3JLE4h2AMHMwY3GfrNbLBVItprYrraXwWC6xQNc4ROrbqQzjkgO+mx4khrtUwDyQxGW/JG2tiooULhez7sy3gdXKPNcO9tu1PK4ZspVNcd+TNfaRorr7G54Hao/8o4Adsfpk/lC0dIuO1cJPiWwl1T1U/oeQOOC+gZyjinPKs8ALfonTIqPq/C24PzEE/wCo8UujU9zLdTxFRNnTtQjFVSpPOxlUwG02ok4K2FPHIjeQc13bU+hAyenOcuIkdNkfWptIuRW1ChgmRrqhRUURyBLRbXNyCuhSTK3UaIH2io8QME6hCLBrk0QHRzzmVZ3orgV0mQVLCWYlOqqlshHTceQYuxwVmCpsKp24gQqnSy8liqYWCl6R6QPV9WM3nH8I1czHgVzOqVe3BQXLOp0mi6k9b4Rn6dFeccz0qQTZ7zDeaYPkeKuoXk6MtUWVV7SFeOmSL+yWkPGwjMfWpeqtLyFxHK58o8jeWU7aWHw/JPC1mIWESD6FO84DaVlvK/ZoSqeiNFrS7tWMPVm2sNO60BfO1Jyep+T2DwtkEhytTEaHI5AKCimRnFBkBq5A7R1ZcVVKtKMXHwMoZeTmA5nPUNm5VJeWM/YeEQD7OJeN0nyI91tsIt1M+CutjA236RdScAWS05OvZ7dWBXaSMrbRJbWufSPVmS4AjIS05gbMFEFi/wBPNNrHHtNaMdUgR9cVVWpqpFxGjLS8gtnrXCQZzGyAcc/Jc+zqKg3Sns87F1WLn8URtpwefr6yV/Uo5pJ+jEtn8TQPUALS0iQRdI2g4H1XDUnF5RtxnY8C0rYjQq1aJ+49zeIB7J5iDzX0y0qqrQjP1RwKsNM2gN5WoQ1HRejFG98TieQhvsU0Tm3UszLVyYzZIyFCDIUIejdYuPg6Ooc1yGCJkwCQfBG9oTJitYI4GtNuLsOawakG35GWPBI1yRjJgtsZOCupvBXPcq6lhhaVVyZ3TIaVnkwnlNJZYkYZeEZO2VesqOcMphv4Rl45815C+ue9UbPZWFuqNJL8yWlSXOlM3YJ20lXrGSHMaWmRn9YLRbXc6FRTiU3NtCvTcJf/AAtqFUOEjmNh2L3FtXjXpqcTw1zbyoVHCRJCuM4foijLx9fWC85+Iq+mjGmv7n+yO50Wlmcqj8L92al1SIAzOS8pq8I72M7sIptgK5bIrYoKmSCtRTAc4oNhA6DbxvHIHsj3WVZk9TLZNJYRK8ymYqGOfGGs5BDOApDrxBkGDu+sU9OvOm8xYHFS5DbLVvCDBI+gfreu7a11Whnz5Mk46WLVtTWEBzhLjDRrMmBhzzWjkQHttme8hzKhZGqJB3xKJGQ2vF28CHHUTuHj47lxeozi5pLlGqgnjfgFc43mg7MDu/aU7r921cXysAUNFRNcCOHr7grlNbGo8l+1CyXLZfGVSm135m9g+Qavcfh6trttL8M5N7HFTPqYyo5d9mI3+jrPcpU27GieMSfOU64ONVnqk2SuaiII2kTkg5YClkR9AgoayYNuuYbcihygSUVkukbUNc8lHAGxGqARK1I2Oh0qckEOKO4NhKlMEQpFtMjwZ3pAeppuIPaf2G88zyE+SqvbrRRa8s0dPte5XXotzLWemvKTkeuSLCixZ5MbAUymq9RBxoqaghmiqN4up6zize4DFvMebRtXW6Z1B288P5Xycnqtkq8NS5QY2wuOpewVeLWUzyXZlww/RDbhJOqfkF4zr9fXcpeiPUdJo6bfPlst7DLiXngFyKe+5vqbbINnYCVsjRqSWUijKGvd2TwVDbQVySSnTAI84JJMJGcBAS42yEjq1A0egVTlgdLIym2O0cz5bkF7hl6Iepy8IBzHFrpH8jYVppVZW9T7iyipojtlDratJ47oHbOV26ZAPGfCV6CnVjOOqLMMotPDCa9rJMNMDbrPjqXLub9qWmn+ppp0MrMiD9yeeK585uctT5L0sLCGuE8j9eqVPATnBB8EPPPtds007PV+F7mcntn/ANPNej/DdXFScPVZMV9H4UzzfRtDrK1NkTeeJ4DF3kCvYN7nIqvEGz0ZzVYcMa2kSYCjlgaKyWFis1w9pZas9XBopxw9x9oNO9gkip4Hk4ZLlj5VTWB8jyECCIkEvKYBkUOUwHUI6sACXEgCBhEknV4YrgdV6hUozVKlzydfp9nGsnOfHgU1BF5rpb6cVlsOtTdVUrjG/DLrvpiUHOl48DhUXo6lSEI6pPCOLCMpy0xW4++fhPl6SuX/ADqzzjV+xu/ltfGcGD09bzWrHAtazstaRBG0kaiT6BYby6VaWY8HbsLXsw35fIygxcyTOgWFFipbCF02JGwElxLkJzJaQ4YEEEcRimUhZLKway0OmmKrRg4A8Cf3816PpV2m+1N/Q83f0GvjX5lVSJJ4rz3UJ67qb9zuWkdNCP0NFTZADRw/f1KehDVJRKZvO4H/AFrusF3u90DdlJ3612ptRi/oBU9shlY9nw9VwpPYKW5PKfIox5S41PCCNq4YZ8Nvura6xilHkkd9yE08Zdns1AfPaldu01Hlv9hlLb2H1BBhLcU1Tagt2SO+5KynAvHwW63tlSjrnzyJKWXhA5cuVOblJyLksEtGnMkrp2NNqDk/JVUayDk4t4+xXLfJcPTijGn1HoEEEcUwDI/abQvWGofgcx3+YafJxXT6JPTeR98lF2s0mYj7MNGiraalR2VKmf1P7I/xD17S4qaUkjiTSaaNpabAb5gYK6FZadzlSovVsS0bEW4quVVS2LI0XHdgNvfOtW00U1JblbeV2EU5LqnbDMFVOlsadYfQtgVEqTGVQkfbW5JVSY3cQBUqOJwK0KK8lTkySjXdsSyhEKbB7faCbo3uJ4zA8gvA3lTXdVJe+P0PcWFPRbx+n3F0Zae1dOTvXV8vBc+6hmOpeDZg1dkYx7QS0EjAmBMjX4eqkbipOGlyePQ58qMYTylhk7rG0jAXTtHuNaRwUkFTaZkuk2iL0vAio0Yx99vudnhwFKq6UtEuGa4NSWUZ6gFsbHD6QVLZAumEjYCYBLkgjmqZIaLo3VvU3UzjdOX9rtXjK0U5tbrlGK4hv9RlawGk7rB2mAyR94D3hU1I5lqLIVMx0cFlYa7XlrmmRifKIPit/T/iqN+xRVi4rDAXVQ6sIwEnLCQNZ2yt908U2PCPwhtpOA4hcOT2JHknlPkUWiO15rVZLNTLFnwV9TpBY6dU0XWiiKxJF01Ggh3wnY7HI4nUulTt9LcuX6lTn4LanTGeZOZ+tSaFJRy+W+SaslZaHOpQ4M7IzGEAHfq8IWSFs4y7j3fp/wBe5dlNYJDbg9uEjaCIVN9cZhoXLDThuIymSY+gsdK2lKppY7mkshzhAPBd1xUY4RnW7Kp7+0wcT5fuvNPk2Y2JgUyYjQwOxPH2Cie4cDpTZFKLprTvWG1D/wCl55tF4eYWnp09N1B+4ldZpS+hQ/ZjY+rsZqHOs8u/K3sNHDBx/MvdVnqkecnPc0le1NaljTkyl1Uipt2kCRAWqnQS5MtWu3wVD5Woy5GdUdimUHDCyiixg50jSDrnWNDsovCZ2IPA6hJrOAxQrJKdQhLJZCm0F0rSIVMoMsUyltNox5L55WT70/q/ufQrdf0Y/RfYZTraxnmOKRrKwWG30LagSNj2zzGr18FzaPwycGZ7iOykXYWpMyAWlrNeZeHebjxGsfWxJVhrj7llGpol7GDtlANeYyOI9wjRqao78m9ofSTsUKpqtkJggA5DICy6P1btYDU4Ec8x6eatpMprrMTTOTSMhRUqXUVy4dw4kD4Tu3HyUta/ZrrPD2NMn3ae/KC/6UtrT90y4HVjq811r2X9PHqyuEsxwS2s4DiuPPgaPIRKYQfZu9y+S29P+d/QSpwD09AUC2u2pTp1BWqOqPD2hwcSA0SCPhaAu2nsY5Lc856S1a2j7UGWCo+nShgdTql1Wzh7jgADLqbbsHsnbsWqnb9yOSmVdwZfaD6X1Kz6dC1Wd1B1Zk03Xg+jWkH/AK35tdAJuGTgcMJWapTcXhmmnV1bmrstiDRBxGoGMt+pc+Ntqm6k+fC9DTKpnZBNGldHqr6dNQ38sRvJFbKhDcIx2mPDDEpa7xTbDDkrOsBcBGLQTm0yDEYAyMta4tajopxyt9zSnnJMCqai0yaDyC2OveJ5nlMD0VUZZHnHCJqb8+JHmmTEaAtMUr9Gsz4qT2/qa4Ky3lprQfuhZ/I/oyt0cxtKjSog4MY1nGABK+jaXyePnUTY99IZlFSYmEwG0MGpXQkymaXgbSpNGYlCUpMkIxQW12xnks7x6mpZxweUN0rVDSwVH3Tqn3zAW7WjT2o5zgHDwipIbBdWTpFXptDRdcBgC4EnmQRKLjkodCLeSwpdLTPbpDeWH2PzR0tFUrVeGW9n6SWMiXPezc5jj/rIVUtfoL/DPJQWzS9MuJa7CTEggxJjDhC8fW6ZX70vh5ef1PYW95TjRim+F9hbLpJp1hZa9jVp/NFo0wuac+JI2fRy3Szex0jgcfW8uDdR7dZS9S5pTi0bpjpTqRzcDpRciGN0/ZLpdGo3h+E5jlj+lUxeir7M6FKWqHuiqplaWME0ykYCYFKyDpSgJLPVuva7Y4HwKeLwxZrMWbUq6Rz0BaQZgDsMcj+8LNU4LqbwxtmdIA2euU84laFWlOCi3wTThnW3ujj80s+BockwKbIpJZT2uXyWzp7xUf0K6nAaCu0Z8FTpPRHWFxhjr0S2oJEtwBGzM+J2rTTuNKw0Z6lDU8odorRDKNIUu9jeJIzcTJgahu+ZVdWp3JZLadPQixAVRcNecNvBQDMbpnpY2haOoqUrUXOEtDKdKqHNk4hlN5fqOqUZ0JTh7A78U8BGiuktltTnmm83qIiq19N9NzROEseJzBHFYbulmUW+FyX0p6k8E+kLXFORgX5DXBxPkVwq89U20a6UNyDQx7x4D1VUB63gJsb5BP8AcUUyuSGVqkl7f7PmrrZ/1o/VFdZf0pfRlQ2zvGpfTtccHg+3LIfZ9Gvd3slmnXjHg107aUt2WH/x7AMlm70mbexBIjNkZMwg6ksBVKKOJal+JjZSPBnshdtxEyRuSMI+lV1HJPGQGghqtTFOLU2AETwlYxNQbI+vBRxU1hiZ0s0PQitctBpk4PYY4txHleXj/wAT2kXbKrFbxe/0Oz0uu+44t8o9a0ZWmm3d2fDLyheMjLZHQqwxNoLL0+SvSVGm6YIB4tPA/wAeaqqcZRqt3h4MkMCRsMeC2J5WS5onpuSsUnaUrIPBSgOUIbOw1L1KmdrR4wrmznPZtHWsSx3AnmMQqpDRe6BbNkT9ZIUX8JfPkdaz2eYVs38IIcj6ZwHBRPYV8klndDh4LVZSxVXuLNbFgu8ZTkSCKBEKhCBtpaSWgiRhCmQuLaMfp/ow+vaW1myxweCaocMGN7twTIfgBqGZ3roU7mnCGHuYZUJSmJpCixj3MaMSWmo4mXOIaGtaXHEhrQOJJOa8v1S6bfbX5nbs6GlamMtVa+Z1DADYFxW9zXFYD7D2aLnbZj09U8dkVVN54JLF3eaCEnyCttADqz8w1pPIfwnpS0zT9xpwzDBd2J9OoxtRvdcA4cCMjvXu41HOKaPMuioScZeCWpWAwCKi2TKQDXrqyMSqUgZ9Up1Erc2D302BMnjIXYwXEFRkKuURkRFIEfSrRwTRlgDQW18q5SEaIqr4QcsBQ6xVgHZ4HDmpGSyCSLqyv6urTqfC4O5DvDwnzWPqdv3racPVfv4LLWpoqRfoeraLq94cCPQ+y+SR2yj1dZZaZYdYnyU4B7b2muG6RxGIUbyGOzTMlbhD5+IA+3sFdbvMMGqSG03K1ihDSkYCQFAg5AGDWaDfNBn5h4OIVmTDUXxsKq5FIwIqbTUutazWRjyzS5SWEaorLyFVDLOU+6t5Qi5Fs57IUjwBrceNo1K2lF/OvGGK/QsmOkL0UZZWTK0OTAEJRINUCVGkbKTUaWZnE7BEY/WxKy2Ettwq3Wjq6bnHUPE5AeMJKtRU4OTBBapYMc3EknEnEnadZXlKknN6n5OrjSsIeQkIWlZsUmt3A85/lWv5TOnmeRrHXac7j64Jc7BxmRXUxNOtvYR4ghBPceXIL0Q0gRSdTP3DI/C7GPG94r2fR5qpT0eU/wBjhdYj26in4a/ct6ls3rtKkcR1yEWoHMoumxO8mNqWkbUNDI6iK2rWdOGSvUVgrdQ8vaVvN452KjQcglRsKmURkyIpAj6dWEYywBolfUEbirG1gCBKzSFRNNbodFpZLeXMEnEeMjWr4TU4YZVKOJHqfRq3X6VF+1t13Edk/wCQXyXqNB0LypT93j7nrKM+7bxl7F/1qyJgwI6opkhm9KiI/tcRyOXoFdQeJNepqTzFMEpuWlihLCq2KStKDIPSkNR0ed/wj8TvWU+dkYavzsLru1bUjYYopLZMyfjI8Lw9lQs62a4vZFjZzLBwj2WqL2KZbM6yHs8CjHgkuQuzZkbvkuj09JykvYpqcIIoYS06sRvC6VBOC0Pxx9CmW+5NKvFEUIISoQjO1RkRmeltpqTSp04IvXquOIZdcGwNYvxOyFhvqtNUnCXLW31NNvGWtNFVTK84dFk9Bl5zRtP8qJbiN4RZ253Z5hPJlEOQO3VIY0bRKVlkFu2V9lq/8VXiAOeKMlhoj3ZXWDsVDGu8OXeHkPNd/oFbFy4Pyvsc7rkNVqprwywe6V7jB4nJC5QArCEryPFkoqNSYZbqR4vStDhr8cVYqkl5Os0F07YDnh6K+NZeRHEmJBG5PygAtRsKmSwMiIlV8DCip4IqWAYGudG8INtBSOs9WHYa8x7hGnJJ7Bkso9G6BWu9SqU9bHXhwcPm0+K8N+KrfRcwqryvt/o7nSp6qLh6P7m2ZWkA7cV5jya8CmomFwUPSB8Sdonm0j9lfRjlpl9N/C0BUXyAduK0yWAsLplVsUnaUjASAoAyXOgLdB6o6zLTvjEHwTeCirDyXTs5SMqRTW3I/wD6H1d80nk1Q8BVgfLBu/lXR4EnyS0M3DeD4plyB8If/VtpkF2RwnZ9Quh05/G/oVTi2tiyBBgjkV2cGcUlEA2TtRIIXIBKXpD0koWVs1HS8js0xF93LUN5Vc5qK3LKdNy4MZozSNe0mpVewtzN6CGRGDROeEDBcW8rRlszdGChjAewrmM0NFho3vTtkDwkn08U0fUpqcBVvOAG/wCvVRlcOSq0nVkkbMPBRFsdokAwpRteT4AD3RluxQBju3+Zvngul0qWm8pv3/xgz9Qjqs5r2/2WDl9CPAkbk2QEZUCNIUIeMteqUzv4Hh6OQYHsrEZFMptcAwEMtIOB/ZXKonsxdLGVBHBJJYIiIuVYTr6mQ4I3FKx0av7PNIRaLhPfYW8Y7Q9CuD+JKfcs9fmL/Z7G/pktNfT4a/c9LpVYEbMPl5LwyWcHYmtyKppFuTe0d3zVqpN87C6fUqdOOe6mXHCMY5GVpoqKlgdbFfoivLY1t9Dl7jkr60cPIUW1MrMwBLCkYCSUAD6Na65rtjgfAyohZLKZsHOVbMxTWsyHD+53k4n2SZzI0w2SJdGvwI5q+AKq3C2ntcR6H9065K/AFpt8MBkDtCJMSTOC3dOWqtpK51NCyD6N0yafZdN3YdX4T7LuOLRXqhU3XJpaFpa9oc0gg5EIFewHpPTVGgJqVADqbm48GjFJOoo8jwpuXBlq3Sk2kljGXKY1uPaedQgYAYE5nJcnqF29GmG2TdRt9LzIno6JJh92nJAM/ey1m6uM3L/2Y7rxXESurWuo6ubO1zboBvuAxgNlwEn8qujRjGGuQW8rI5hSMuLLReLidgjxP8qIoq8EukamSLFpop6pkqIeb8DLTVgNbsaD+ok+kJtPkQorTai20U2fEac/rIXX6ZSTrQl7me9ni2mvY0hXuzweBhRJgYQoTAwqZJgy9o6AUD3KlRu43XD0B80ulG+N7LyiqtXQGuP+upTfuMsPuEuktjdw87FRaOjNtZnQeRtYWv8A9SShuXKtTfDKuu1zDDwWHY4Fp8CpuWLfg5tYoqbRNJ3WIaiYOvqZJgQuUbCF6FtfVWijU+F7SeBMO8iVhv6Xdt5w9v8AZot5aail7o9XtTQ58ueQ2AbswCdp8l8/o5UcJbnpKnOxxtzWiGD5furO238xXpzyDVa5dn+ysUccDYRUUz1VTd6tPy9lqfxxE4ZfUXzB1FY5LAWFMeq2AcaiGAEd4kwMSjxuyNbGktdpcSHNcYiRE4nftM6lmk9yqEVjchsVW+4DbeJ5tPuUkfnZfUWmCH6NdDiNxWiPItRbFi44t4x4j+FZkoMz9pdkfVsFRrG3nX6bgBE4VGzE7pXQ6ZXhRuFKbwtyqrTlOGIrJjOhVutQqGlaS7qgwx1oxvSAAHnPCcDK9LK5t5rMZI57oVY8plrpjplSsrgwGqXObeimQAGkm7JkYwE8aXc3ETlEqq9q6xxeRF6DBMkYazrK87c1Nc2z0FvT7dNI2PRHRzerLnNBkTjvMjyaPErk1p5kwV5YwkXmlbYKVJ9TYMN7jgB4quENUsGeCy8HlNl6SOpWoyLzHdh8jtSTN8HaCQd/gvUx6Mq1nrziXK+hVVvNNfSuEbamvKtYZ1Gy30W2Gk7T6fRRRnqvfAPpKp2juwQHprYr0RHyD1XS5x4KxcJEXJn3G/baY2Ob/iC9d/pK+OP1MPUXi3ma4hevPGYGEI5BgaQpkmBIUyTBLCmRsCwpkmBwUyE5zAcCARsIlAiyuAOroKyvxdZ6J402fJDBYqs15Zg/tCslmpOpUqNJjHEF7y0R2e60RvN48glaNttKck3JmR6tTSaMiOaQg0FNMjcUr4GRu6OkzVp0XE43QDx7p8wvF1bbtVZRx5PTUauuEWWNCos8kWsMYVUxSO2We+MMCMj7FPCel7isDsdvdSJY8GNmtvDaFbUpqayhC9o2gOEtMhY5RaeGHkbXtAaCSYAEkpqdJzkox5YG1FZY3ozpZr6j2uEE4s2kCMDvGfPct/WOkTtqMZp58P2ZTbV1Vk4/oH1dOdurZ2nDBxOvHvNnwJ/EuX/C1I28azWzykaIqEqrS8It9A2dwHWuwEQ0ay3WfIQs6SWwlxUTeETE3ax4zyd/KaIeYFkSrSgqOmM/0lWCQeyZGH32rpdJhCd3CM1lPwV1m1BtHmIrvGT3fqPuvcS6VaSW9NGFXNVf3MZVrF3fax/42NKzS6JQX/G5R+jH/jZv5kn+QVSttHJ9N7d9N0/4uXHr9BuI70pqX1Rth1GD+ZY+htdB9JaEBgOZGIwgmGiWnEDITivOV7KvQeKkWvt+pbJxq/FB5AOnOkyXtoN+7DncSMPAEfqRtqe2pjUo4WTM9LbGKjaNtYAMWsrAanAgNd7c2rv9GvNKnbTfhuP+V/kw3tDElNfmbGmV5efzM65fWRsMbwnxxSmSe8iqquvOJ4lQv4iDPRKsgL3d47/QAeyuS4Cin0C2/bHO+G+fAdWPVem6TD40/RHK6vPFDT6s15C9Jk8rgQtUyTAwtUyTAl1TJMB9RrMphVKTNThHwM6jem1lfbwc+jCOsDpsaGKa0TQzgQmTFcWeNadtv9TaatUYtJhuwMbg08wJ5p4wbOhFaIqIGGJtIciFijRMkNSjKSUB4zwF6JtJYbju644HYfaVx+o2jku5HlfY6VncqL0yNXYq+rWPPevNVIYO5GWSzp1FQ0Fona9I0KJaKDXiHDgdY4FGMnHgVoAFB9Iy0yNo/wDZv1yV+qM1hgxgnqWapaKRLS0Qcse3G/Vjxx4K6yvKVlcJzjn/AAV1qEqsMRYmgNGVW1mve26GzrBMkEDAcV0ut9Zt69u6VLdvHjBTZ2dSFRSksJE2jgGaSaKjezUe4CcjeBu8e1Ajeq3KnX6NFQeZQSyvfyV1FKncNvZM9OBXkUOU2kKoNQEbM+Zy8lbFbZNVNfCWTHSAdoVhU1uVnSk/+JW/CPJwXS6Q/wD9kPqU1vkZ5XiSAMztIHmcAvotWqqUdcuDlxg5PCGVS5l680jDMjeMRtwBxWJ3VOs4duXnP6ew/blHOUQOqhb9SfkqYNYbSTW7OoE8wQZ8lwetPVSXszXZv439D2K3aPBr068Agg06gOIIcCGmOJA5heCVT4XA6MZYWCutOh2t6yif+qs0x/a4Y4b9YP8AaNisp3Ek1Ncos2nHDEoCSBtMKtvLyaHsi9tVSGHhAQMsVmRUsODjyQ8ounwC1akA7lYlllRV2qvcYXHUC48c/VaIR1SwMuDugllltWodZDPAXnf7DwXremx0xb/I8/1d6pRj6GpNJdTWcZ02M6sqakDQzupKmsnbYnUIaw9sqtLlwcCEKbyjXKKCKFr7pQZNKZZ1awdACp3LHGI8R3UuXkOEjJ9LLU6jSqQ6C8XBtl2ZHASVvoLXsUSik8nnZaAIC3ySSwiZy9yOIVeBhIQwEQtS4JkjcxK4hTDrDbSIBOIyPsV5+/sNPxwW3leh2bK8ziMnv4fqHO041vefyaPr1XOh06c91H9TbO7hHmX6B+jtOUnm7fLXag8CDwO3mlr9NqU1lr9AU7yE3hMuKdfVr+slzJwaNaeTqtcASTHFKot8BKPSOm+rkNJM90YjHX5481vtrB1pJYM9a4VKJDoPTdZ9WHOERMARGI+a1dR6bSpUvhRRaXU6k2pehptF6R6+q1gbD7wLNevvbozXOu+l1bKCqN5T59vY0Ru6dVSWN0ei2ruO4T4Yrhx5KVyZyrWp9e8CRUht4EmC2MC3xgrYqVX+HU38uXv7+hog46mvJe2KpLBuwVXgSawwDpS7/wASv+Ef7BdPo/8A5tP6lFf/AI2eVvC+lHIZEajmtN1xALhgDGME/Jcytb0qlylKPj7l8ak408p+Sv0hanHAuJMRJMwNnmVdGjTopqmtJTOpKXLyR6FqAVm3jAILeZyXN6lBzovHgvtGlUWT3XRNvbWpBzeDhra7WCvntem6c2mdFrDHW0S07sRxH1HNJB7lkeSk0aJe3x8Ar2aajxEO0pVyHP5IFdJeQW19ljRuBPOSit5EbyU1rratvpr+XNXxj5FwZ/TdsvEU2444xrOpv1uXQtaEm843YJzjBZfBcaIt5oUmsw2ux+8cT8uS9XRpduCieZrz7lRyDKvSS8MBiE2GV4QFZulDw6CE2BdJeHTlJzR2oKr3QziiVmlqUDtBBtk0ozDukl4Q4K2OxGhaelQRgE2pAwSN0wQcCkksjIlbpN7jMoaSGa6SW91SoGk4NHmf2jxXSsoYjkrmyjcZK0PdgXBG5I+RhJQIIpghxCDRBjmpXHIciU7PfDmjOLzeWrnK515U7MoS8cG+1p92MornlFeVflSRThpmk0XpRxYCTLmYSdY38l5q+tVCq/R7nbtKznDflDLdpiCZ7TtmofJC2sZVPZErXUYe7Kevbn1CJiBOAGS7NC2p0N1yc2rWnV5NT0T0NUdTq1rubC2mNbiMZjZIAHNYeoXEHUhB8J7mi1g0nL2Nd9nejDeNocOzDmM/F2bzhydHMpfxPWaoRhH1K7X5sm+cMIXh1szcYi3i7a6Tj9+mWHi0kn1C7tpLX0+rTf8Aa8/qO9q0X6o0ejKmY5rlItqIG6WO/wDFrcAP8mrqdFWb2Bmr/wDEzzBxX0k5AFWJAJIGWpI9t8AyVLnScVlbARPCSSCng1PRbpDWpG/nENMnCoNh37/3Xlup2dPU4rz+x17eTnDc9Vo2ttSm2o3J7Q4cwvKSholpfg0xK/Q47ROwfJXsvq8Dqpv1I2mOSCFXwxBekFoh0eXIKyjHO4i4MppG3XZAPaOv4Qt9Knqafgj2WACxtA7R7xy3D5r09nbKmtUuThXly6j0x4FrudOa3GE6jaowCBCLG9KBBromUCEl46lCH//Z"}}}
// REPLY WITH LOCATION
const floc = {key : {participant : '0@s.whatsapp.net', ...(from ? { remoteJid: `status@broadcast` } : {}) },message: {locationMessage: {name: `   NICKY_STORE `, jpegThumbnail: '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'}}}
// REPLY WITH STATUS
const fakestatus = {key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "status@broadcast" } : {})},message: { "imageMessage": {"url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc","mimetype": "image/jpeg","caption": 'Alice Bot',"fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=","fileLength": "28777","height": 1080,"width": 1079,"mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=","fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=","directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69","mediaKeyTimestamp": "1610993486","jpegThumbnail": ppnyauser,"scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="}}}
// REPLY WITH CONTACT
const fkontak2 = {key: {fromMe: false, participant: `${m.sender.split('@')[0]}@s.whatsapp.net`, ...(m.chat ? { remoteJid: '0@s.whatsapp.net' } : {}) }, message: {contactMessage: {displayName: `${pushname}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${pushname}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
// REPLY WITH PAYMENT & AMOUNT
const repPy = { key: { remoteJid: '0@s.whatsapp.net', fromMe: false, id: `ALICE PROJECT SOLO`, participant: '0@s.whatsapp.net' }, message: { requestPaymentMessage: { currencyCodeIso4217: "USD", amount1000: 1, requestFrom: '0@s.whatsapp.net', noteMessage: { extendedTextMessage: { text: `PROJECT ALICEZATION` }}, expiryTimestamp: 999999999, amount: { value: 91929291929, offset: 1000, currencyCode: "USD" }}}}
const Pareploy = (teks) => { alice.sendMessage(m.chat, { text: teks, contextInfo:{ forwardingScore: 2000000000, isForwarded: false }}, { quoted : repPy })}
// REPLY WITH AUDIO
const dalwin = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, "message": { "audioMessage": { "url": "https://mmg.whatsapp.net/v/t62.7114-24/56189035_1525713724502608_8940049807532382549_n.enc?ccb=11-4&oh=01_AdR7-4b88Hf2fQrEhEBY89KZL17TYONZdz95n87cdnDuPQ&oe=6489D172&mms3=true", "mimetype": "audio/mp4", "fileSha256": "oZeGy+La3ZfKAnQ1epm3rbm1IXH8UQy7NrKUK3aQfyo=", "fileLength": "1067401", "seconds": 60, "ptt": true, "mediaKey": "PeyVe3/+2nyDoHIsAfeWPGJlgRt34z1uLcV3Mh7Bmfg=", "fileEncSha256": "TLOKOAvB22qIfTNXnTdcmZppZiNY9pcw+BZtExSBkIE=", "directPath": "/v/t62.7114-24/56189035_1525713724502608_8940049807532382549_n.enc?ccb=11-4&oh=01_AdR7-4b88Hf2fQrEhEBY89KZL17TYONZdz95n87cdnDuPQ&oe=6489D172", "mediaKeyTimestamp": "1684161893" }}}
// REPLY WITH KATALOG 2
const dallwinn = { key: {fromMe: [], participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "0@s.whatsapp.net" } : {})}, 'message': { "interactiveMessage": { "header": { "hasMediaAttachment": [], "jpegThumbnail": ppnyauser, }, "nativeFlowMessage": { "buttons": [ {"name": "review_and_pay","buttonParamsJson": "{\"currency\":\"IDR\",\"external_payment_configurations\":[{\"uri\":\"\",\"type\":\"payment_instruction\",\"payment_instruction\":\"hey ini test\"}],\"payment_configuration\":\"\",\"payment_type\":\"\",\"total_amount\":{\"value\":2500000,\"offset\":100},\"reference_id\":\"4MX98934S0D\",\"type\":\"physical-goods\",\"order\":{\"status\":\"pending\",\"description\":\"\",\"subtotal\":{\"value\":2500000,\"offset\":100},\"items\":[{\"retailer_id\":\"6348642505244872\",\"product_id\":\"6348642505244872\",\"name\":\"Winnn\",\"amount\":{\"value\":2500000,\"offset\":100},\"quantity\":1}]}}"}]}}}}
// REPLY WITH PAYMENT
const fpayment2 = {key: { remoteJid: '0@s.whatsapp.net', fromMe: false, id: `NICKY 👨🏾‍🦽`, participant: '0@s.whatsapp.net' }, message: { requestPaymentMessage: { currencyCodeIso4217: "USD", amount1000: 1, requestFrom: '0@s.whatsapp.net', noteMessage: {extendedTextMessage: {text: `NICKY_STORE`}}, expiryTimestamp: 999999999, amount: { value: 91929291929, offset: 1000, currencyCode: "USD"}}}}
// SEND TEXT WITH REPLY
const repteks = (teks) => { alice.sendMessage(m.chat, { text: teks, contextInfo:{ forwardingScore: 9999999, isForwarded: false }}, { quoted : m })}
// SEND TEXT NO REPLY
const reply = async(teks) => {alice.sendMessage(from, {text: teks, mentions: await ments(teks)})}
const replys = async(id, teks, quoted) => alice.sendMessage(id, {text: teks, mentions: await ments(teks), contextInfo: {mentionedJid: await ments(teks), externalAdReply: {showAdAttribution: true, title: `${salam} ${pushname}`, body: fake, previewType: 'PHOTO', thumbnail: ppnyauser, sourceUrl: 'https://wa.me/'+global.owner.split('@')[0] }}}, {quoted})
const replyf = async(id, teks) => alice.sendMessage(id, {text: teks, mentions: await ments(teks), contextInfo: {mentionedJid: await ments(teks), externalAdReply: {showAdAttribution: false, title: `${salam} ${pushname}`, body: fake, mediaType: 1, previewType: 'PHOTO', thumbnail: ppnyauser, sourceUrl: global.gcs }}}, {quoted: global.f1('[ System Notice ]', ppnyauser)})

// REPLY NEWSLETTER


// SEND MESSAGE DOCUMENT
const sendres = (huhu, teks) => {
alice.sendMessage(huhu, {
document: trash,
fileName: 'Alice Auto Assistant',
mimetype: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", 
fileLength: 999999999, pageCount: '2024',
caption: teks, 
contextInfo: {
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterName: `NICKY_STORE`,
newsletterJid: "120363196693847189@newsletter"},
externalAdReply: { 
title: `ALICE ZUBERG`, 
body: 'alice project [version 1.5]',
thumbnailUrl: "https://telegra.ph/file/9311b3f8c35f127dd1537.jpg",
sourceUrl: `${global.saluran}`,
mediaType: 1,
renderLargerThumbnail: true }}},
{quoted:floc})}


// REPLY WITH URL
const reply795 = async(teks) => {
try {
ppuser = await alice.profilePictureUrl(m.sender, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
var userpp = await getBuffer(ppuser)
alice.sendMessage(from, {text: teks, contextInfo:{ 
"mentionedJid": alice.ments(`${teks}`),
"isForwarded": false, 
"externalAdReply" : { 
"title": `Hallo ${pushname}`, 
"body": `${salam}`,
"mediaType": 1,
"previewType": "PHOTO",
"thumbnailUrl": '', 
"thumbnail": userpp,
"renderLargerThumbnail": true,
"sourceUrl": `${global.saluran}`}}},)
}


// FUNCTION SELF & BATAS COMMAND
if (global.self && !isCreator && !isOwner && !['jadibot', 'stopjadibot', 'listjadibot', 'play', 'ai', 'owner', 'sc'].includes(command)) return !0;


// FUNCTION BANNED
if (isCmd && isBanned) return
if (isBanned) return reply('lu di ban tolol')



// FUNCTION MONO SPACE FONT
function monospace(string) {
return '```' + string + '```'
}


// FUNCTION LOADING BY DARWIN
async function loading () {
var arr = [
"🕛",
"🕐",
"🕑",
"🕒",
"🕓",
"🕔",
"🕕",
"🕖",
"🕗",
"🕘",
"🕙",
"🕚",
"🕛"
]
let load = await alice.sendMessage(from, {text: '🕛'},{quoted:m})
for (let i = 0; i < arr.length; i++) {
await delay(100)
await alice.sendMessage(from, {text: arr[i], edit: load.key },{quoted:m});
}
}


/*const loadingMsg0 = {
}
const loadingMsg = {

*/



// DETEKSI MEDIA
const isImage = (type === 'imageMessage')
const isVideo = (type === 'videoMessage')
const isSticker = (type == 'stickerMessage')
const isAudio = (type == 'audioMessage')
const isViewOnce = (type == 'viewOnceMessage')
const isText = (type === 'conversation' || type === 'extendedTextMessage')
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
const isQuotedViewOnce = m.message.extendedTextMessage?.contextInfo?.quotedMessage?.viewOnceMessageV2 ? true : false;
const mime = (quoted.msg || quoted).mimetype || quoted.mediaType || "";
const isMedia = /image|video|sticker|audio/.test(mime)


// FUNCTION MESSAGE
const onlyOwner = async() => {reply(global.mess.owner)};
const onlyAdmin = async() => {reply(global.mess.admin)};
const onlyGc = async() => {reply(global.mess.group)};
const botAdmin = async() => {reply(global.mess.botAdmin)};
const onlyWait = async() => {reply(global.mess.wait)};
const onlyGroup = async() => {
let joinbang = `Hallo ${tag}, untuk menggunakan semua fitur bot, harap bergabung terlebih dahulu kedalam group Whatsapp Bot agar anda dapat akses lebih di dalam group *Bot Alice*, tap tautan dibawah
${global.group}

[ ketik *buatbot* untuk membuat bot anda sendiri ]`
reply795(joinbang)}
const sendMessageModify = (jid, teks = '', quoted = '', opts = {}) => {return alice.sendMessage(jid, {text: teks, contextInfo: {mentionedJid: ments(teks), externalAdReply: {showAdAttribution: opts.ads, title: opts.title ?? packname, body: opts.body, mediaType: 1, previewType: 'PHOTO', thumbnailUrl: opts.thumbUrl, thumbnail: opts.thumbnail, sourceUrl: opts.url, renderLargerThumbnail: opts.largeThumb }}}, {quoted: quoted})}







// FUNCTION SAVE KONTAK
const contacts = JSON.parse(fs.readFileSync("./database/contact/contacts.json"))
const isContacts = contacts.includes(sender)



// FUNCTION TIME AUTO CLOSE MAGHRIB
cron.schedule('0 0 18 * * *', async () => {
const getGroups = await alice.groupFetchAllParticipating()
const groups = Object.keys(getGroups)
let text = '*[ System Notice ]* Group Di Tutup Secara Otomatis'
alice.sendMessage(from, {text: '*[ System Notice ]* Segeralah Beribadah...'});
if (groups.some(v => v === from) && !(await alice.groupMetadata(from)).announce) {
alice.groupSettingUpdate(from, 'announcement').then(() => alice.sendMessage(from, {text: text}, {ephemeralExpiration: m.expiration}));
}
}, { scheduled: true, timezone: 'Asia/Jakarta' })
cron.schedule('0 0 19 * * *', async () => {
const getGroups = await alice.groupFetchAllParticipating()
const groups = Object.keys(getGroups)
let text = '*[ System Notice ]* Waktu maghrib usai, group dibuka kembali.'
if (groups.some(v => v === from) && (await alice.groupMetadata(from)).announce) {
alice.groupSettingUpdate(from, 'not_announcement');
alice.sendMessage(from, {text: text, mentions: Object.values(global.db.groups[from].member).map(v => v.id)}, {ephemeralExpiration: m.expiration});
alice.groupRequestParticipantsList(from).then(async (data) => {
if (data.length === 0) return
for (let i of data) {
await alice.groupRequestParticipantsUpdate(from, [i.jid], 'approve')
await delay(1000)
}
})
}
}, { scheduled: true, timezone: 'Asia/Jakarta' })


// FUNCTION ANTILINK
if (global.antilink && !m.key.fromMe && !isCreator && !isAdmins && isBotAdmins)
if (body.match(`chat.whatsapp.com`)) {
await alice.sendMessage(from, {delete: {remoteJid: m.chat, id: m.id, participant: m.sender }})
reply(`hem hem izin dulu atmin (っ˘̩╭╮˘̩)っ`)
}
if (global.antilink && !isCreator && !isAdmins && isBotAdmins)
if (body.match(`https`)) {
await alice.sendMessage(from, {delete: {remoteJid: m.chat, id: m.id, participant: m.sender }})
reply(`upps tidak ada link ಠ︵ಠ`)
}




/* FUNCTION MORNING TIME */
cron.schedule("0 0 5 * * *", () => {
alice.sendMessage(m.chat, { text : '*[ System Notice ]* Bangunnnn!! udah shubuhh (─.─||）', mentions: participants.map(a => a.id)})
}, {scheduled: true, timezone: "Asia/Jakarta"});

cron.schedule('0 0 22 * * *', async () => {
const getGroups = await alice.groupFetchAllParticipating()
const groups = Object.keys(getGroups)
let text = '*[ System Notice ]* Group Di Tutup Secara Otomatis'
alice.sendMessage(from, {text: '*[ System Notice ]* Tidur manis (ー_ー゛)'});
if (groups.some(v => v === from) && !(await alice.groupMetadata(from)).announce) {
alice.groupSettingUpdate(from, 'announcement').then(() => alice.sendMessage(from, {text: text}, {ephemeralExpiration: m.expiration}));
}
}, { scheduled: true, timezone: 'Asia/Jakarta' })

cron.schedule('0 0 6 * * *', async () => {
const getGroups = await alice.groupFetchAllParticipating()
const groups = Object.keys(getGroups)
let text = '*[ System Notice ]* Sistem secara otomatis membuka grup ini karena pagi hari.'
if (groups.some(v => v === from) && (await alice.groupMetadata(from)).announce) {
alice.groupSettingUpdate(from, 'not_announcement');
alice.sendMessage(from, {text: text, mentions: Object.values(global.db.groups[from].member).map(v => v.id)}, {ephemeralExpiration: m.expiration});
alice.groupRequestParticipantsList(from).then(async (data) => {
if (data.length === 0) return
for (let i of data) {
await alice.groupRequestParticipantsUpdate(from, [i.jid], 'approve')
await delay(1000)
}
})
}
}, { scheduled: true, timezone: 'Asia/Jakarta' })








  


//AUTO REACT
let regex =[ "alice","menu","rpg","download","game","nsfw","search","tools","deposit","topup","jadibot","fun","shop","bot","play","start","afk"]
for (let i of regex){
if (isGroup && budy.toLowerCase().includes(i)){
let emot = await pickRandom(["👶🏿", "👍", "🙄", "🌚", "😏", "💩", "👻", "🔥", "🤣","🤬", "😎", "😂", "😘", "😑", "😱", "❤️", "👩‍⚕️", "😳","😍","🤩","🥳","🤔","🤗","🤤","👎","👊","🙈","🤡"])
alice.sendMessage(from, { react: { text: emot, key: m.key } })
}
}




// FUNCTION DOWNLOAD MP3 YTB
async function downloadMp3(url) {
try {
// jalur sampah
let mp3File = './.npm/'+getRandom('.mp3')
ytdl(url, {filter: 'audioonly'}).pipe(fs.createWriteStream(mp3File)).on('finish', async() => {
await alice.sendMessage(from, {audio: fs.readFileSync(mp3File), mimetype: 'audio/mpeg'}, {quoted:m})
fs.unlinkSync(mp3File)
})
} catch(e) {
console.log(e)
return alice.sendteks(from, util.format(e), m)
}
}


// FUNCTION DOWNLOAD HENTAI SFM
async function hentaivid() {
return new Promise((resolve, reject) => {
const page = Math.floor(Math.random() * 1153)
axios.get('https://sfmcompile.club/page/'+page)
.then((data) => {
const $ = cheerio.load(data.data)
const hasil2 = []
$('#primary > div > div > ul > li > article').each(function (a, b) {
hasil2.push({
title: $(b).find('header > h2').text(),
link: $(b).find('header > h2 > a').attr('href'),
category: $(b).find('header > div.entry-before-title > span > span').text().replace('in ', ''),
share_count: $(b).find('header > div.entry-after-title > p > span.entry-shares').text(),
views_count: $(b).find('header > div.entry-after-title > p > span.entry-views').text(),
type: $(b).find('source').attr('type') || 'image/jpeg',
video_1: $(b).find('source').attr('src') || $(b).find('img').attr('data-src'),
video_2: $(b).find('video > a').attr('href') || ''
})
})
resolve(hasil2)
})
})
}





// AUTO DOWNLOAD YOUTUBE SCRAPER
if (global.autodonlod && !m.key.fromMe)
if (budy.match(`youtube.com|youtu.be`)) {
let lodingdonlod = `*[ Loaded ]* downloaded from the link`
const alicevido = require('./lib/ytdl2')
const vido=await alicevido.mp4(budy)
downloadMp3(budy)
const autod=`*Tittle:* ${vido.title}\n*Date:* ${vido.date}\n*Duration:* ${vido.duration}\n*Quality:* ${vido.quality}`
await alice.sendMessage(m.chat,{ video: {url:vido.videoUrl}, caption: autod },{quoted:m})
}
// AUTO DOWNLOAD TIKTOK SCRAPER
if (global.autodonlod && !m.key.fromMe)
if (budy.match(`tiktok.com`)){
reply('memuat..')
await TikTok(budy).then(async resi => {
let taev = `Title : ${resi.title}
Author : ${resi.author}`
await alice.sendMessage(from, {audio: {url: resi.audio}, mimetype: 'audio/mpeg', ptt: false})
await alice.sendMessage(from, {video: {url: resi.nowm}, caption: taev})
}).catch((err) => reply('Maaf erjadi Kesalahan!')) // pengalih isu
}

























































// FUNCTION OBFUSCATOR DARWIN
async function obfus(query) {
return new Promise((resolve, reject) => {
try {
const obfuscationResult = jsobfus.obfuscate(query,
{
compact: false,
controlFlowFlattening: true,
controlFlowFlatteningThreshold: 1,
numbersToExpressions: true,
simplify: true, 
stringArrayShuffle: true,
splitStrings: true,
stringArrayThreshold: 1
}
);
const result = {
status: 200,
author: `Me`,
result: obfuscationResult.getObfuscatedCode()
}
resolve(result)
} catch (e) {
reject(e)
}
})
}
    
    
    
// FUNCTION AFK BY DARWIN
let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
for (let jid of mentionUser) {
let user = global.db.users[jid]
if (!user) continue
let afkTime = user.afkTime
if (!afkTime || afkTime < 0) continue
let reason = user.afkReason || ''
reply(`${tag} sedang *Afk* ${reason ? 'karena ' + reason : 'tanpa alasan'} selama *${clockString(new Date - afkTime)}*
`.trim())
}
if (global.db.users[m.sender].afkTime > -1) {
let user = global.db.users[m.sender]
reply(`${tag} telah kembali dari *Afk* ${user.afkReason ? 'setelah ' + user.afkReason : ''}\nselama *${clockString(new Date - user.afkTime)}*`.trim())
user.afkTime = -1
user.afkReason = ''
}
    
    
    
// FUNCTION TICTACTOE BY SURYA
const isTicTacToe = (from, _dir) => {
let status = false
Object.keys(_dir).forEach((i) => {
if (_dir[i].id === from) {
status = true
}clera

})
return status
}

const getPosTic = (from, _dir) => {
let position = null
Object.keys(_dir).forEach((i) => {
if (_dir[i].id === from) {
position = i
}
})
if (position !== null) {
return position
}
}

const KeisiSemua = (tic) => {
let status = true
for (let i of tic){
if (i !== '❌' && i !== '⭕'){
status = false
}
}
return status
}

const cekIsi = (nomor, tic) => {
let status = false
if (tic[nomor] === '❌' || tic[nomor] === '⭕'){
status = true
}
return status
}

const cekTicTac = (tic) => {
let status = false
if (tic[0] === '❌' && tic[1] === '❌' && tic[2] === '❌' || tic[0] === '⭕' && tic[1]=== '⭕' && tic[2] === '⭕'){
status = true
} else if (tic[3] === '❌' && tic[4] === '❌' && tic[5] === '❌' || tic[3] === '⭕' && tic[4] === '⭕' && tic[5] === '⭕'){
status = true
} else if (tic[6] === '❌' && tic[7] === '❌' && tic[8] === '❌' || tic[6] === '⭕' && tic[7] === '⭕' && tic[8] === '⭕'){
status = true
} else if (tic[0] === '❌' && tic[3] === '❌' && tic[6] === '❌' || tic[0] === '⭕' && tic[3] === '⭕' && tic[6] === '⭕'){
status = true
} else if (tic[1] === '❌' && tic[4] === '❌' && tic[7] === '❌' || tic[1] === '⭕' && tic[4] === '⭕' && tic[7] === '⭕'){
status = true
} else if (tic[2] === '❌' && tic[5] === '❌' && tic[8] === '❌' || tic[2] === '⭕' && tic[5] === '⭕' && tic[8] === '⭕'){
status = true
} else if (tic[0] === '❌' && tic[4] === '❌' && tic[8] === '❌' || tic[0] === '⭕' && tic[4] === '⭕' && tic[8] === '⭕'){
status = true
} else if (tic[2] === '❌' && tic[4] === '❌' && tic[6] === '❌' || tic[2] === '⭕' && tic[4] === '⭕' && tic[6] === '⭕'){
status = true
}
return status 
}

if (isTicTacToe(from, tictactoe)) {
try {
// TicTacToe
if (isTicTacToe(from, tictactoe)){
let nomor = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let posi = tictactoe[from]
let anu = posi.TicTacToe
if (posi.status === null){
if (sender === posi.ditantang){
if (body.toLowerCase() === 'y'){
the = `@${posi.ditantang.split('@')[0]} menerima tantangan

@${posi.penantang.split('@')[0]} = ❌
@${posi.ditantang.split('@')[0]} = ⭕

${anu[0]}${anu[1]}${anu[2]}
${anu[3]}${anu[4]}${anu[5]}
${anu[6]}${anu[7]}${anu[8]}

Giliran @${posi.penantang.split('@')[0]}`
alice.sendteks(from, the, m)

tictactoe[from].status = true
} else if (body.toLowerCase() === 'n'){
users[m.sender].balance -= 1000
the1 = `@${posi.ditantang.split('@')[0]} menolak, game dibatalkan\nDan Player dikenakan sanksi -1000 balance karna menolak ajakan pemain`
alice.sendteks(from, the1, m)
delete tictactoe[from];
}
}
} else if (posi.status === true){
if (sender === posi.penantang){
for (let i of nomor){
if (Number(body) === i){
if (cekIsi(Number(body) - 1, anu)) return m.reply(`Nomor tersebut sudah terisi`)
tictactoe[from].TicTacToe[Number(body) - 1] = '❌'
if (cekTicTac(tictactoe[from].TicTacToe)){
the2 = `@${posi.penantang.split('@')[0]} Menang

@${posi.penantang.split('@')[0]} = ❌
@${posi.ditantang.split('@')[0]} = ⭕

${anu[0]}${anu[1]}${anu[2]}
${anu[3]}${anu[4]}${anu[5]}
${anu[6]}${anu[7]}${anu[8]}

Hadiah : ${posi.hadiah} balance
Ingin bermain lagi? ${prefix}tictactoe`
alice.sendteks(from, the2, m)
users[posi.penantang].balance += posi.hadiah
users[posi.ditantang].balance -= posi.hadiah
delete tictactoe[from];
} else if (KeisiSemua(anu)) {
the3 = `*HASIL SERI*

@${posi.penantang.split('@')[0]} = ❌
@${posi.ditantang.split('@')[0]} = ⭕

${anu[0]}${anu[1]}${anu[2]}
${anu[3]}${anu[4]}${anu[5]}
${anu[6]}${anu[7]}${anu[8]}

Ingin bermain lagi? ${prefix}tictactoe`
alice.sendteks(from, the3, m)

delete tictactoe[from];
} else {
the4 = `@${posi.penantang.split('@')[0]} telah mengisi

@${posi.penantang.split('@')[0]} = ❌
@${posi.ditantang.split('@')[0]} = ⭕

${anu[0]}${anu[1]}${anu[2]}
${anu[3]}${anu[4]}${anu[5]}
${anu[6]}${anu[7]}${anu[8]}

Giliran @${posi.ditantang.split('@')[0]}`
alice.sendteks(from, the4, m)

tictactoe[from].status = false
}
}
}
}
} else if (posi.status === false){
if (sender === posi.ditantang){
for (let i of nomor){
if (Number(body) === i){
if (cekIsi(Number(body) - 1, anu)) return m.reply(`Nomor tersebut sudah terisi`)
tictactoe[from].TicTacToe[Number(body) - 1] = '⭕' 
if (cekTicTac(anu)){
the5 = `@${posi.ditantang.split('@')[0]} Menang

@${posi.penantang.split('@')[0]} = ❌
@${posi.ditantang.split('@')[0]} = ⭕

${anu[0]}${anu[1]}${anu[2]}
${anu[3]}${anu[4]}${anu[5]}
${anu[6]}${anu[7]}${anu[8]}

Hadiah : ${posi.hadiah} balance
Ingin bermain lagi? ${prefix}tictactoe`
alice.sendteks(from, the5, m)
users[posi.ditantang].balance += posi.hadiah
users[posi.penantang].balance -= posi.hadiah
delete tictactoe[from];
} else if (KeisiSemua(anu)) {
the6 = `Hasil Seri

@${posi.penantang.split('@')[0]} = ❌
@${posi.ditantang.split('@')[0]} = ⭕

${anu[0]}${anu[1]}${anu[2]}
${anu[3]}${anu[4]}${anu[5]}
${anu[6]}${anu[7]}${anu[8]}

Ingin bermain lagi? ${prefix}tictactoe`
alice.sendteks(from, the6, m)

delete tictactoe[from];
} else {
the7 = `@${posi.ditantang.split('@')[0]} telah mengisi

@${posi.penantang.split('@')[0]} = ❌
@${posi.ditantang.split('@')[0]} = ⭕

${anu[0]}${anu[1]}${anu[2]}
${anu[3]}${anu[4]}${anu[5]}
${anu[6]}${anu[7]}${anu[8]}

Giliran @${posi.penantang.split('@')[0]}`
alice.sendteks(from, the7, m)

tictactoe[from].status = true
}
}
}
}
}
}
} catch (err){
console.log(chalk.redBright('[ ERROR TICTACTOE ]'), err)
}
}

// FUNCTION SUIT PVP POLLING BY DARWIN
let roof = Object.values(suit).find(roof => roof.id && roof.status && [roof.p, roof.p2].includes(sender))
if (roof) {
let win = ''
let tie = false
if (sender == roof.p2 && /^(acc(ept)?|y|gas|oke?|tolak|gamau|nanti|ga(k.)?bisa|y)/i.test(body) && m.isGroup && roof.status == 'wait') {
if (/^(gamau|nanti|ga(k.)?bisa)/i.test(body)) {
users[m.sender].balance -= 1000
pokl = `@${roof.p2.split('@')[0]} menolak suit, suit dibatalkan\nDan player dikenakan sanksi -1000 balance karna menolak ajakan pemain`
await alice.sendteks(from, pokl, m)
delete suit[roof.id]
return !0
}
roof.status = 'play'
roof.asal = from
clearTimeout(roof.waktu)

teksbbb = `AYO PILIH SUIT MU`
ggy = `Suit telah dikirimkan ke chat

@${roof.p.split('@')[0]} dan @${roof.p2.split('@')[0]}

Silahkan pilih suit di chat masing"
klik wa.me/${botNumber.split('@')[0]}`
await alice.sendteks(from, ggy, fkontak2)
if (!roof.pilih) await alice.sendPoll(roof.p, teksbbb, [`batu`,`kertas`,`gunting`, ])
if (!roof.pilih2) await alice.sendPoll(roof.p2, teksbbb, [`batu`,`kertas`,`gunting`, ])
roof.waktu_milih = setTimeout(async() => {
if (!roof.pilih && !roof.pilih2) await alice.sendMessage(from, {text: `Kedua pemain tidak niat main,\nSuit dibatalkan`})
else if (!roof.pilih || !roof.pilih2) {
win = !roof.pilih ? roof.p2 : roof.p
users[m.sender].balance -= 1000
sffp = `@${(roof.pilih ? roof.p2 : roof.p).split('@')[0]} tidak memilih suit, game berakhir\nDan Player dikenakan sanksi -1000 balance karna menolak ajakan pemain`
await alice.sendteks(from, sffp, fkontak2)
}
delete suit[roof.id]
return !0
}, roof.timeout)
}
let jwb = sender == roof.p
let jwb2 = sender == roof.p2
let g = /.gunting/i
let b = /.batu/i
let k = /.kertas/i
let reg = /^(.gunting|.batu|.kertas)/i
if (jwb && reg.test(body) && !roof.pilih && !m.isGroup) {
roof.pilih = reg.exec(body.toLowerCase())[0]
roof.text = body
await alice.sendMessage(from, {text: `Kamu telah memilih ${body} ${!roof.pilih2 ? `\n\nMenunggu lawan memilih` : ''}`}, {quoted:fkontak2})
if (!roof.pilih2) await alice.sendMessage(roof.p2, {text: '_Lawan sudah memilih_\nSekarang giliran kamu'})
}
if (jwb2 && reg.test(body) && !roof.pilih2 && !m.isGroup) {
roof.pilih2 = reg.exec(body.toLowerCase())[0]
roof.text2 = body

tyu = `Kamu telah memilih ${body} ${!roof.pilih ? `\n\nMenunggu lawan memilih` : ''}`
await alice.sendMessage(from, {text: tyu}, {quoted:m})

if (!roof.pilih) await alice.sendMessage(roof.p, {text: '_Lawan sudah memilih_\nSekarang giliran kamu'})
}
let stage = roof.pilih
let stage2 = roof.pilih2
if (roof.pilih && roof.pilih2) {
clearTimeout(roof.waktu_milih)
if (b.test(stage) && g.test(stage2)) win = roof.p
else if (b.test(stage) && k.test(stage2)) win = roof.p2
else if (g.test(stage) && k.test(stage2)) win = roof.p
else if (g.test(stage) && b.test(stage2)) win = roof.p2
else if (k.test(stage) && b.test(stage2)) win = roof.p
else if (k.test(stage) && g.test(stage2)) win = roof.p2
else if (stage == stage2) tie = true
await alice.sendteks(roof.asal, `${tie ? '*HASIL SERI*\n\n' : ''}@${roof.p.split('@')[0]} (${roof.text}) ${tie ? '' : roof.p == win ? ' Menang' : ' Kalah'}\n@${roof.p2.split('@')[0]} (${roof.text2}) ${tie ? '' : roof.p2 == win ? ' Menang' : ' Kalah'}${tie ? '' : '\n\nHadiah : '+roof.hadiah+' balance'}`, f1('HASIL SUIT PVP', null))
if (roof.p == win) {
roof.p == win ? users[roof.p].balance += roof.hadiah : users[roof.p].balance -= roof.hadiah
} else if (roof.p2 == win) {
roof.p2 == win ? users[roof.p2].balance += roof.hadiah : users[roof.p2].balance -= roof.hadiah
}
delete suit[roof.id]
}
}

// FUNCTION PETAK BOMB BY SURYA
let pilih = "🌀", bomb = "💣";
if (sender in petakbom) {
if (!/^[1-9]|10$/i.test(body) && !isCmd) return !0;
if (petakbom[sender].petak[parseInt(body) - 1] === 1) return !0;
if (petakbom[sender].petak[parseInt(body) - 1] === 2) {
petakbom[sender].board[parseInt(body) - 1] = bomb;
petakbom[sender].pick++;
petakbom[sender].bomb--;
petakbom[sender].nyawa.pop();
let brd = petakbom[sender].board;
if (petakbom[sender].nyawa.length < 1) {
await m.reply(`GAME TELAH BERAKHIR\nKamu terkena bomb\n\n ${brd.join("")}\n\nTerpilih: ${petakbom[sender].pick}\nNyawamu habis... balance -${petakbom[sender].hadiah}`);
users[sender].balance -= petakbom[sender].hadiah
delete petakbom[sender];
} else await m.reply(`PETAK BOM\n\nKamu terkena bomb\n ${brd.join("")}\n\nTerpilih: ${petakbom[sender].pick}\nSisa nyawa: ${petakbom[sender].nyawa}`);
return !0;
}
if (petakbom[sender].petak[parseInt(body) - 1] === 0) {
petakbom[sender].petak[parseInt(body) - 1] = 1;
petakbom[sender].board[parseInt(body) - 1] = pilih;
petakbom[sender].pick++;
petakbom[sender].lolos--;
let brd = petakbom[sender].board;
if (petakbom[sender].lolos < 1) {
await m.reply(`Kamu berhasil menebak semuanya🥳\n${brd.join("")}\n\nTerpilih: ${petakbom[sender].pick}\nSisa nyawa: ${petakbom[sender].nyawa}\nBomb: ${petakbom[sender].bomb}\nHadiah: $${petakbom[sender].hadiah} balance`);
users[sender].balance += petakbom[sender].hadiah
delete petakbom[sender];
} else await m.reply(`PETAK BOM\n\n${brd.join("")}\n\nTerpilih: ${petakbom[sender].pick}\nSisa nyawa: ${petakbom[sender].nyawa}\nBomb: ${petakbom[sender].bomb}`);
}
}

// GAME TEBAK GAMBAR BY SURYA
if ((from in tebakgambar)) {
let { soal, jawaban, hadiah, waktu } = tebakgambar[from]
if (body.toLowerCase().includes(jawaban)) {
await m.reply(`Selamat Jawaban Kamu Benar🥳\n\nJawaban: ${jawaban}\nHadiah: $${hadiah} balance`);
users[sender].balance += hadiah
clearTimeout(waktu);
delete tebakgambar[from];
}
}

// GAME TEBAK ANIME BY SURYA
if ((from in tebakanime)) {
let { soal, jawaban, hadiah, waktu } = tebakanime[from]
if (body.toLowerCase().includes(jawaban)) {
await m.reply(`Selamat Jawaban Kamu Benar🥳\n\nJawaban: ${jawaban}\nHadiah: $${hadiah} balance`);
users[sender].balance += hadiah
clearTimeout(waktu);
delete tebakanime[from];
}
}

// GAME TEBAK LAGU BY SURYA
if ((from in tebaklagu)) {
let { soal, jawaban, hadiah, waktu } = tebaklagu[from]
if (body.toLowerCase().includes(jawaban)) {
await m.reply(`Selamat Jawaban Kamu Benar🥳\n\nJawaban: ${jawaban}\nHadiah: $${hadiah} balance`);
users[sender].balance += hadiah
clearTimeout(waktu);
delete tebaklagu[from];
}
}

// GAME KUIS BY SURYA
if ((from in kuis)) {
let { soal, jawaban, hadiah, waktu } = kuis[from]
if (body.toLowerCase().includes(jawaban)) {
await m.reply(`Selamat Jawaban Kamu Benar🥳\n\nSoalan:\n${monospace(soal)}\nJawaban: ${jawaban}\nHadiah: $${hadiah} balance`);
users[sender].balance += hadiah
clearTimeout(waktu);
delete kuis[from];
}
}

// GAME SIAPAKAH AKU BY SURYA
if ((from in siapakahaku)) {
let { soal, jawaban, hadiah, waktu } = siapakahaku[from]
if (body.toLowerCase().includes(jawaban)) {
await m.reply(`Selamat Jawaban Kamu Benar🥳\n\nSoalan:\n${monospace(soal)}\nJawaban: ${jawaban}\nHadiah: $${hadiah} balance`);
users[sender].balance += hadiah
clearTimeout(waktu);
delete siapakahaku[from];
}
}

// GAME TEBAK KALIMAT BY SURYA
if ((from in tebakkalimat)) {
let { soal, jawaban, hadiah, waktu } = tebakkalimat[from]
if (body.toLowerCase().includes(jawaban)) {
await m.reply(`Selamat Jawaban Kamu Benar🥳\n\nSoalan:\n${monospace(soal)}\nJawaban: ${jawaban}\nHadiah: $${hadiah} balance`);
users[sender].balance += hadiah
clearTimeout(waktu);
delete tebakkalimat[from];
}
}

// GAME TEBAK KATA BY SURYA
if ((from in tebakkata)) {
let { soal, jawaban, hadiah, waktu } = tebakkata[from]
if (body.toLowerCase().includes(jawaban)) {
await m.reply(`Selamat Jawaban Kamu Benar🥳\n\nSoalan:\n${monospace(soal)}\nJawaban: ${jawaban}\nHadiah: $${hadiah} balance`);
users[sender].balance += hadiah
clearTimeout(waktu);
delete tebakkata[from];
}
}

// GAME TEBAK LIRIK BY SURYA
if ((from in tebaklirik)) {
let { soal, jawaban, hadiah, waktu } = tebaklirik[from]
if (body.toLowerCase().includes(jawaban)) {
await m.reply(`Selamat Jawaban Kamu Benar🥳\n\nSoalan:\n${monospace(soal)}\nJawaban: ${jawaban}\nHadiah: $${hadiah} balance`);
users[sender].balance += hadiah
clearTimeout(waktu);
delete tebaklirik[from];
}
}

// GAME TEBAK KIMIA BY SURYA
if ((from in tebakkimia)) {
let { soal, jawaban, hadiah, waktu } = tebakkimia[from]
if (body.toLowerCase().includes(jawaban)) {
await m.reply(`Selamat Jawaban Kamu Benar🥳\n\nSoalan:\n${monospace(soal)}\nJawaban: ${jawaban}\nHadiah: $${hadiah} balance`);
users[sender].balance += hadiah
clearTimeout(waktu);
delete tebakkimia[from];
}
}

// GAME TEBAK BENDERA BY SURYA
if ((from in tebakbendera)) {
let { soal, jawaban, hadiah, waktu } = tebakbendera[from]
if (body.toLowerCase().includes(jawaban)) {
await m.reply(`Selamat Jawaban Kamu Benar🥳\n\nSoalan: ${monospace(soal)}\nJawaban: ${jawaban}\nHadiah: $${hadiah} balance`);
users[sender].balance += hadiah
clearTimeout(waktu);
delete tebakbendera[from];
}
}

// GAME ASAH OTAK BY SURYA
if ((from in asahotak)) {
let { soal, jawaban, hadiah, waktu } = asahotak[from]
if (body.toLowerCase().includes(jawaban)) {
await m.reply(`Selamat Jawaban Kamu Benar🥳\n\nSoalan:\n${monospace(soal)}\nJawaban: ${jawaban}\nHadiah: $${hadiah} balance`);
users[sender].balance += hadiah
clearTimeout(waktu);
delete asahotak[from];
}
}

// GAME SUSUN KATA BY SURYA
if ((from in susunkata)) {
let { soal, jawaban, hadiah, waktu } = susunkata[from]
if (body.toLowerCase().includes(jawaban)) {
await m.reply(`Selamat Jawaban Kamu Benar🥳\n\nSoalan:\n${monospace(soal)}\nJawaban: ${jawaban}\nHadiah: $${hadiah} balance`);
users[sender].balance += hadiah
clearTimeout(waktu);
delete susunkata[from];
}
}

// GAME CAK LONTONG BY SURYA
if ((from in caklontong)) {
let { soal, jawaban, hadiah, waktu } = caklontong[from]
if (body.toLowerCase().includes(jawaban)) {
await m.reply(`Selamat Jawaban Kamu Benar🥳\n\nSoalan:\n${monospace(soal)}\nJawaban: ${jawaban}\nHadiah: $${hadiah} balance`);
users[sender].balance += hadiah
clearTimeout(waktu);
delete caklontong[from];
}
}

// GAME KUIS MATH BY SURYA
if ((from in kuismath)) {
let { soal, jawaban, hadiah, waktu } = kuismath[from]
if (body.includes(jawaban)) {
m.reply(`Selamat Jawaban Kamu Benar🥳\n\nSoalan: ${soal}\nJawaban: ${jawaban}\nHadiah: $${hadiah} balance`);
users[sender].balance += hadiah
clearTimeout(waktu);
delete kuismath[from];
}
}

// GAME FAMILY 100 BY SURYA
if ((from in family100)) {
let { soal, jawaban, hadiah, waktu } = family100[from]
for (let i of jawaban){
if (body.toLowerCase().includes(i)) {
let anu = jawaban.indexOf(i)
jawaban.splice(anu, 1)
await m.reply(`*GAME FAMILY 100*\n\nJawaban kamu benar!\nJawaban: ${i}\nHadiah: $${hadiah}\n\n${jawaban.length < 1 ? 'Selamat semua jawaban sudah tertebak!\ningin bermain lagi? kirim '+prefix+'family100' : 'Jawaban yang belum tertebak: '+jawaban.length}`)
users[sender].balance += hadiah
}
}
if (jawaban.length < 1){
clearTimeout(waktu);
delete family100[from];
}
}

// FUNCTION BY DARWIN
function randomNomor(min, max = null){
if (max !== null) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min + 1)) + min;
} else {
return Math.floor(Math.random() * min) + 1
}
}
    
// FITUR MENGETIK
if (global.autoTyping) {
if (command) { alice.sendPresenceUpdate('composing', from)}}
// AUTO READ MESSAGE
if (global.autoTyping) {
if (command) { alice.readMessages([m.key])}}























// PENGALIH
switch (command) {

// FITUR USER
case 'daftar':
if (isRegistered) return reply('Kamu sudah terdaftar')
if (!q.includes('.')) return reply('*Format salah! Gunakan Dengan*\n\n    *Contoh :* .daftar NICKY.17')
const namaUser = q.substring(0, q.indexOf('.') - 0)
const umurUser = q.substring(q.lastIndexOf('.') + 1)
const serialUser = createSerial(20)
if(isNaN(umurUser)) return reply('Umur harus berupa angka!!')
if (namaUser.length >= 30) return reply(`why is your name so long it's a name or a train`)
if (umurUser > 40) return reply(`your age is too  old maximum 40 years`)
if (umurUser < 12) return reply(`your age is too young minimum 12 years`)
let mzd = `*DAFTAR BERHASIL*\n\n⎋ Nama : ${namaUser}\n⎋ Umur : ${umurUser}\n⎋ Nomor : @${m.sender.split("@")[0]}\n⎋ Premium : ${isPremium}\n⎋ Limit : ${limit}\n⎋ Register : ${calender}`
let veri = m.sender
if (!m.isGroup) {
addRegisteredUser(m.sender, namaUser, umurUser, serialUser)
alice.sendMessage(from, {image: ppnyauser, caption: mzd, fileLength: 9999778866, contextInfo: {
externalAdReply: {
showAdAttribution: true, 
mediaType: 1, 
previewType: 'PHOTO',
renderLargerThumbnail: false, 
title: `${namaUser} Terdaftar ✅`, 
body: `powered by winn`, 
description: 'no text',
mediaType: 1,
thumbnail: ppnyauser,
sourceUrl: `${global.saluran}`,
}}
})
} else {
addRegisteredUser(m.sender, namaUser, umurUser, serialUser)
alice.sendMessage(from, {image: ppnyauser, caption: mzd, fileLength: 9999778866, contextInfo: {
externalAdReply: {
showAdAttribution: true, 
mediaType: 1, 
previewType: 'PHOTO',
renderLargerThumbnail: false, 
title: `${namaUser} Terdaftar ✅`, 
body: `powered by winn`, 
description: 'no text',
mediaType: 1,
thumbnail: ppnyauser,
sourceUrl: `${global.saluran}`,
}}
})
}
break
case 'totalfitur':
const totalFitur = () =>{
            var mytext = fs.readFileSync("./case.js").toString()
            var numUpper = (mytext.match(/case '/g) || []).length;
            return numUpper
        }
reply(`Command Alice Tersedia Sebanyak ${totalFitur()}`)
break
case 'listban': 
var data = Object.values(db.users).filter(v => v.banned)
if (data.length == 0) return reply('*Data kosong.*')
var teks = '乂  *L I S T  B A N N E D*\n'
teks += data.map((v, i) => `\n${i + 1}. @${v.jid.split('@')[0]}`).join('\n')
sendMessageModify(m.chat, teks, m, {
thumbUrl: 'https://telegra.ph/file/ae4413e295ec14491d23b.png',
largeThumb: true
})
break //Powered By alice & Darwin
case 'listprem': 
var data = Object.values(db.users).filter(v => v.premium)
if (data.length == 0) return reply('*Data kosong.*')
var teks = '乂  *L I S T  P R E M I U M*\n'
teks += data.map((v, i) => `\n${i + 1}. @${v.jid.split('@')[0]}`).join('\n')
sendMessageModify(m.chat, teks, m, {
thumbUrl: 'https://telegra.ph/file/ae4413e295ec14491d23b.png',
largeThumb: true
})
break //Powered By alice & Darwin
case 'carajadibot':
case 'cara-pasang':
let tutor1 = '*Step 1* ketik *start* untuk mendapat kode koneksi bot anda dari *Alice*'
let tutor2 = '*Step 2* kembali ke home WhatsApp lalu klik *titik tiga* di samping pojok kanan atas, lalu klik *Perangkat tertaut*'
let tutor3 = '*Step 3* klik *Tautkan perangkat*'
let tutor4 = '*Step 4* untuk cara memasukan kode klik *Tautkan dengan nomor telepon saja*'
let tutor5 = '*Step 5* masukan kode anda'
let imej1 = "https://telegra.ph/file/37a9b2865634333b25168.jpg"
let imej2 = "https://telegra.ph/file/cba5cd9154a4ffc4b2ae4.jpg"
let imej3 = "https://telegra.ph/file/cb39c8ab221045fb4a6e7.jpg"
let imej4 = "https://telegra.ph/file/a11753d255c49c0decac2.jpg"
let imej5 = "https://telegra.ph/file/e97424c82f58caa3109a8.jpg"
reply('untuk cara penggunaan, ikuti panduan berikut')
await delay(3000)
reply('pertama, sebelum menggunakan bot')
await delay(3000)
reply('pastikan anda sudah tahu cara pemasangan untuk mengkoneksikan bot anda dengan *Alice*')
await delay(3000)
reply('berikut adalah caranya')
await delay(3000)
alice.sendMessage(from, {image: {url: imej1}, caption: tutor1})
await delay(3000)
alice.sendMessage(from, {image: {url: imej2}, caption: tutor2})
await delay(3000)
alice.sendMessage(from, {image: {url: imej3}, caption: tutor3})
await delay(3000)
alice.sendMessage(from, {image: {url: imej4}, caption: tutor4})
await delay(3000)
alice.sendMessage(from, {image: {url: imej5}, caption: tutor5})
break
case 'jdb': case 'start': case 'jadibot': case 'buatbot':
if (args[0] == 'alice'){
AliceClone(alice, m, from)
} else if (args[0] == 'aruna'){
reply('This beta! please use Alice')
} else reply795(`*MAU JADI BOT MANA?*\n\n*1.* alice\n*2.* aruna\n\ncontoh : ${command} alice`)
break //Powered By alice & Darwin
case 'stop': case 'stopjadibot':
if (args[0] == 'alice'){
rimraf.sync(`./userclone/${m.sender}`)
} else if (args[0] == 'aruna'){
rimraf.sync(`./userclone/${m.sender}`)
} else reply795(`*PILIH KONEKSI BOT ANDA*\n\n*1.* alice\n*2.* aruna\n\ncontoh : ${command} alice`)
break
































// FITUR GAMES BY DARWIN
case 'suit':
if(!isGroup) return onlyGroup()
if (Object.values(suit).find(roof => roof.id.startsWith('suit') && [roof.p, roof.p2].includes(sender))) return reply795(`Selesaikan suit mu yang sebelumnya`)
mark = `0@s.whatsapp.net`
if (!froms) return reply795(`Siapa yang ingin kamu tantang?\nTag orangnya!\n\nContoh: *${command}* @${mark.split('@')[0]}`)
if (froms === botNumber) return reply795(`Tidak bisa bermain dengan bot!`)
if (froms === sender) return reply795(`Sad amat main ama diri sendiri`)
if (Object.values(suit).find(roof => roof.id.startsWith('suit') && [roof.p, roof.p2].includes(froms))) return reply795(`Orang yang kamu tantang sedang bermain suit bersama orang lain :)`)
if (!global.game) return reply795(`Aktifkan botsetting terlebih dahulu dengan cara masukkan perintah *.botsetting* lalu vote on`) 
var hadiah = randomNomor(10, 20)
let poin = 10
let poin_lose = 10
let timeout = 60000
let id = 'suit_' + new Date() * 1
suit[id] = {
chat: await alice.sendteks(from, `@${sender.split('@')[0]} menantang @${froms.split('@')[0]} untuk bermain suit\n\n*Kirim (gas/gamau)* untuk bermain\n\nHadiah : ${hadiah} balance`, m),
id: id,
p: sender,
p2: froms,
status: 'wait',
hadiah: hadiah,
waktu: setTimeout(() => {
if (suit[id]) alice.sendMessage(from, {text: `_Waktu suit habis!_` })
delete suit[id]
}, 60000), poin, poin_lose, timeout
}
break
case 'tictactoe': case 'ttt': case 'ttc': case 'xox':
if (!m.isGroup) return onlyGroup()
if (from in tictactoe) return reply795(`Masih ada game yang blum selesai`)
if (!froms) return reply795(`Kirim perintah *${command}* @tag atau reply pesan orangnya!`)
if (froms === botNumber) return reply795(`Tidak bisa bermain dengan bot!`)
if (froms === sender) return reply795(`Sad amat main ama diri sendiri`)
if (!global.game) return reply795(`Aktifkan botsetting terlebih dahulu dengan cara masukkan perintah *.botsetting* lalu vote on`) 
var hadiah = randomNomor(10, 20)
await reply795(`@${sender.split('@')[0]} menantang @${froms.split('@')[0]} untuk bermain TicTacToe\n\n*Kirim (Y/N)* untuk bermain\n\nHadiah : ${hadiah} balance`)
tictactoe[from] = {
id: from,
status: null,
hadiah: hadiah,
penantang: sender,
ditantang: froms,
TicTacToe: ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣']
}
break
case 'delttt': case 'delttc':
if (!global.game) return reply795(`Aktifkan botsetting terlebih dahulu dengan cara masukkan perintah *.botsetting* lalu vote on`)
if (!m.isGroup) return onlyGroup()
if (!(from in tictactoe)) return reply795(`Tidak ada sesi game tictactoe di grup ini`)
if (isAdmins || isOwner) {
delete tictactoe[from];
reply(`Berhasil menghapus sesi tictactoe di grup ini\n\n-$500`)
} else if (tictactoe[from].penantang.includes(sender)) {
delete tictactoe[from];
reply(`Berhasil menghapus sesi tictactoe di grup ini\n\n-$500`)
} else if (tictactoe[from].ditantang.includes(sender)) {
delete tictactoe[from];
reply(`Berhasil menghapus sesi tictactoe di grup ini\n\n-$500`)
} else {
reply(`Anda tidak bisa menghapus sesi tictactoe karena bukan pemain!`)
}
break
case 'petakbom':
if (!global.game) return reply795(`Aktifkan botsetting terlebih dahulu dengan cara masukkan perintah *.botsetting* lalu vote on`) 
if (sender in petakbom) return reply795(`Game mu masih belum terselesaikan, lanjutkan yukk\n\n${petakbom[sender].board.join("")}\n\nKirim ${prefix}delpetakbom untuk menghapus game petak bom`);
function shuffle(array) {
return array.sort(() => Math.random() - 0.5);
}
petakbom[sender] = {
petak: shuffle([0, 0, 0, 2, 0, 2, 0, 2, 0, 0]),
board: ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"],
bomb: 3,
lolos: 7,
pick: 0,
hadiah: randomNomor(5000, 10000),
nyawa: ["❤️", "❤️", "❤️"]
};
await reply795(`PETAK BOM

${petakbom[sender].board.join("")}

Pilih lah nomor tersebut! dan jangan sampai terkena Bom!
Bomb: ${petakbom[sender].bomb}
Nyawa: ${petakbom[sender].nyawa.join("")}`);
break
case 'delpetakbom':
if(!isGroup) return onlyGroup()
if (!global.game) return reply795(`Aktifkan botsetting terlebih dahulu dengan cara masukkan perintah *.botsetting* lalu vote on`) 
if (!(sender in petakbom)) return reply795(`kamu sedang tidak bermain petakbom!`)
delete petakbom[sender];
reply(`Berhasil menghapus game petak bomb\n\n-$500`)
break
case 'tebakgambar':
if (!global.game) return reply795(`Aktifkan botsetting terlebih dahulu dengan cara masukkan perintah *.botsetting* lalu vote on`) 
if(!isGroup) return onlyGroup()
if (from in tebakgambar) return reply795('Masih ada game yang belum diselesaikan');
var { img, jawaban, deskripsi } = pickRandom(JSON.parse(fs.readFileSync('./assets/game/tebakgambar.json')));
console.log('Jawaban : '+jawaban)
var teks1 = `*GAME TEBAK GAMBAR*\n\nPetunjuk: ${monospace(jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '-'))}\nDeskripsi: ${deskripsi}\nWaktu: ${gamewaktu} detik`
await alice.sendMessage(from, {image: {url: img}, caption: teks1}, {quoted: m})
tebakgambar[from] = {
soal: img,
jawaban: jawaban.toLowerCase(),
hadiah: randomNomor(10, 20),
waktu: setTimeout(function () {
if (tebakgambar[from]) reply795(`Waktu habis!\nJawabannya adalah: ${tebakgambar[from].jawaban}`);
delete tebakgambar[from];
}, gamewaktu * 1000)
}
break
case 'tebakanime':
if(!isGroup) return onlyGroup()
if (from in tebakanime) return reply795('Masih ada game yang belum diselesaikan');
var { image, jawaban } = pickRandom(JSON.parse(fs.readFileSync('./assets/game/tebakanime.json')));
console.log('Jawaban : '+jawaban)
var teks1 = `*GAME TEBAK ANIME*\n\nPetunjuk: ${monospace(jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '-'))}\nWaktu: ${gamewaktu} detik`
await alice.sendMessage(from, {image: {url: image}, caption: teks1}, {quoted: m})
tebakanime[from] = {
soal: image,
jawaban: jawaban.toLowerCase(),
hadiah: randomNomor(10, 20),
waktu: setTimeout(function () {
if (tebakanime[from]) reply795(`Waktu habis!\nJawabannya adalah: ${tebakanime[from].jawaban}`);
delete tebakanime[from];
}, gamewaktu * 1000)
}
break
case 'tebaklagu':
if(!isGroup) return onlyGroup()
if (!global.game) return reply795(`Aktifkan botsetting terlebih dahulu dengan cara masukkan perintah *.botsetting* lalu vote on`) 
if (from in tebaklagu) return reply795('Masih ada game yang belum diselesaikan');
var { soal, artis, jawaban } = pickRandom(JSON.parse(fs.readFileSync('./assets/game/tebaklagu.json')));
console.log('Jawaban : '+jawaban)
if (jawaban.toLowerCase() == 'audio tidak ditemukan, silahkan request ulang!') return reply795('Maaf terjadi kesalahan!')
var teks1 = `*GAME TEBAK LAGU*\n\nPetunjuk: ${monospace(jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '-'))}\nArtist: ${artis}\nWaktu: ${gamewaktu} detik`
await alice.sendMessage(from, {audio: {url: soal}, mimetype: 'audio/mpeg', ptt: true}, {quoted: m}).then(res => {alice.sendteks(from, teks1, res)})
tebaklagu[from] = {
soal: soal,
jawaban: jawaban.toLowerCase(),
hadiah: randomNomor(10, 20),
waktu: setTimeout(function () {
if (tebaklagu[from]) reply795(`Waktu habis\nJawabannya adalah: ${tebaklagu[from].jawaban}`);
delete tebaklagu[from];
}, gamewaktu * 1000)
}
break
case 'kuis':
if(!isGroup) return onlyGroup()
if (!global.game) return reply795(`Aktifkan botsetting terlebih dahulu dengan cara masukkan perintah *.botsetting* lalu vote on`) 
if (from in kuis) return reply795('Masih ada game yang belum diselesaikan');
var { soal, jawaban } = pickRandom(JSON.parse(fs.readFileSync('./assets/game/kuis.json')));
console.log('Jawaban : '+jawaban)
await reply795(`*GAME KUIS*\n\nSoal: ${soal}\nPetunjuk: ${monospace(jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '-'))}\nWaktu: ${gamewaktu} detik`)
kuis[from] = {
soal: soal,
jawaban: jawaban.toLowerCase(),
hadiah: randomNomor(10, 20),
waktu: setTimeout(function () {
if (kuis[from]) reply795(`Waktu habis!\n\nJawaban dari soal:\n${monospace(soal)}\n\nAdalah: ${monospace(jawaban)}`);
delete kuis[from];
}, gamewaktu * 1000)
}
break
case 'tebakkalimat':
if(!isGroup) return onlyGroup()
if (!global.game) return reply795(`Aktifkan botsetting terlebih dahulu dengan cara masukkan perintah *.botsetting* lalu vote on`) 
if (from in tebakkalimat) return reply795('Masih ada game yang belum diselesaikan');
var { soal, jawaban } = pickRandom(JSON.parse(fs.readFileSync('./assets/game/tebakkalimat.json')));
console.log('Jawaban : '+jawaban)
await reply795(`*GAME TEBAK KALIMAT*\n\nSoal: ${soal}\nPetunjuk: ${monospace(jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '-'))}\nWaktu: ${gamewaktu} detik`)
tebakkalimat[from] = {
soal: soal,
jawaban: jawaban.toLowerCase(),
hadiah: randomNomor(10, 20),
waktu: setTimeout(function () {
if (tebakkalimat[from]) reply795(`Waktu habis!\n\nJawaban dari soal:\n${monospace(soal)}\n\nAdalah: ${monospace(jawaban)}`);
delete tebakkalimat[from];
}, gamewaktu * 1000)
}
break
case 'tebakkata':
if(!isGroup) return onlyGroup()
if (!global.game) return reply795(`Aktifkan botsetting terlebih dahulu dengan cara masukkan perintah *.botsetting* lalu vote on`)
if (from in tebakkata) return reply795('Masih ada game yang belum diselesaikan');
var { soal, jawaban } = pickRandom(JSON.parse(fs.readFileSync('./assets/game/tebakkata.json')));
console.log('Jawaban : '+jawaban)
await reply795(`*GAME TEBAK KATA*\n\nSoal: ${soal}\nPetunjuk: ${monospace(jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '-'))}\nWaktu: ${gamewaktu} detik`)
tebakkata[from] = {
soal: soal,
jawaban: jawaban.toLowerCase(),
hadiah: randomNomor(10, 20),
waktu: setTimeout(function () {
if (tebakkata[from]) reply795(`Waktu habis!\n\nJawaban dari soal:\n${monospace(soal)}\n\nAdalah: ${monospace(jawaban)}`);
delete tebakkata[from];
}, gamewaktu * 1000)
}
break
case 'tebaklirik':
if(!isGroup) return onlyGroup()
if (!global.game) return reply795(`Aktifkan botsetting terlebih dahulu dengan cara masukkan perintah *.botsetting* lalu vote on`) 
if (from in tebaklirik) return reply795('Masih ada game yang belum diselesaikan');
var { soal, jawaban } = pickRandom(JSON.parse(fs.readFileSync('./assets/game/tebaklirik.json')));
console.log('Jawaban : '+jawaban)
await reply795(`*GAME TEBAK LIRIK*\n\nSoal: ${soal}\nPetunjuk: ${monospace(jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '-'))}\nWaktu: ${gamewaktu} detik`)
tebaklirik[from] = {
soal: soal,
jawaban: jawaban.toLowerCase(),
hadiah: randomNomor(10, 20),
waktu: setTimeout(function () {
if (tebaklirik[from]) reply795(`Waktu habis!\n\nJawaban dari soal:\n${monospace(soal)}\n\nAdalah: ${monospace(jawaban)}`);
delete tebaklirik[from];
}, gamewaktu * 1000)
}
break
case 'tebakkimia':
if(!isGroup) return onlyGroup()
if (from in tebakkimia) return reply795('Masih ada game yang belum diselesaikan');
var { soal, jawaban } = pickRandom(JSON.parse(fs.readFileSync('./assets/game/tebakkimia.json')));
console.log('Jawaban : '+jawaban)
await reply795(`*GAME TEBAK KIMIA*\n\nSoal: ${soal}\nWaktu: ${gamewaktu} detik`)
tebakkimia[from] = {
soal: soal,
jawaban: jawaban.toLowerCase(),
hadiah: randomNomor(10, 20),
waktu: setTimeout(function () {
if (tebakkimia[from]) reply795(`Waktu berakhir :(\nNama unsur dari lambang ${soal}\n\nAdalah: ${monospace(jawaban)}`)
delete tebakkimia[from];
}, gamewaktu * 1000)
}
break
case 'tebakbendera':
if(!isGroup) return onlyGroup()
if (!global.game) return reply795(`Aktifkan botsetting terlebih dahulu dengan cara masukkan perintah *.botsetting* lalu vote on`) 
if (from in tebakbendera) return reply795('Masih ada game yang belum diselesaikan');
var { soal, jawaban } = pickRandom(JSON.parse(fs.readFileSync('./assets/game/tebakbendera.json')));
console.log('Jawaban : '+jawaban)
await reply795(`*GAME TEBAK BENDERA*\n\nSoal: ${soal}\nPetunjuk: ${monospace(jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '-'))}\nWaktu: ${gamewaktu} detik`)
tebakbendera[from] = {
soal: soal,
jawaban: jawaban.toLowerCase(),
hadiah: randomNomor(10, 20),
waktu: setTimeout(function () {
if (tebakbendera[from]) reply795(`Waktu habis!\n\nJawaban dari soal:\n${monospace(soal)}\n\nAdalah: ${monospace(jawaban)}`);
delete tebakbendera[from];
}, gamewaktu * 1000)
}
break
case 'susunkata':
if(!isGroup) return onlyGroup()
if (!global.game) return reply795(`Aktifkan botsetting terlebih dahulu dengan cara masukkan perintah *.botsetting* lalu vote on`) 
if (from in susunkata) return reply795('Masih ada game yang belum diselesaikan');
var { soal, jawaban } = pickRandom(JSON.parse(fs.readFileSync('./assets/game/susunkata.json')));
console.log('Jawaban : '+jawaban)
await reply795(`*GAME SUSUN KATA*\n\nSoal: ${soal}\nPetunjuk: ${monospace(jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '-'))}\nWaktu: ${gamewaktu} detik`)
susunkata[from] = {
soal: soal,
jawaban: jawaban.toLowerCase(),
hadiah: randomNomor(10, 20),
waktu: setTimeout(function () {
if (susunkata[from]) reply795(`Waktu habis!\n\nJawaban dari soal:\n${monospace(soal)}\n\nAdalah: ${monospace(jawaban)}`);
delete susunkata[from];
}, gamewaktu * 1000)
}
break
case 'asahotak':
if(!isGroup) return onlyGroup()
if (!global.game) return reply795(`Aktifkan botsetting terlebih dahulu dengan cara masukkan perintah *.botsetting* lalu vote on`) 
if (from in asahotak) return reply795('Masih ada game yang belum diselesaikan');
var { soal, jawaban } = pickRandom(JSON.parse(fs.readFileSync('./assets/game/asahotak.json')));
console.log('Jawaban : '+jawaban)
await reply795(`*GAME ASAH OTAK*\n\nSoal: ${soal}\nPetunjuk: ${monospace(jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '-'))}\nWaktu: ${gamewaktu} detik`)
asahotak[from] = {
soal: soal,
jawaban: jawaban.toLowerCase(),
hadiah: randomNomor(10, 20),
waktu: setTimeout(function () {
if (asahotak[from]) reply795(`Waktu habis!\n\nJawaban dari soal:\n${monospace(soal)}\n\nAdalah: ${monospace(jawaban)}`);
delete asahotak[from];
}, gamewaktu * 1000)
}
break
case 'siapakahaku': case 'sa':
if(!isGroup) return onlyGroup()
if (!global.game) return reply795(`Aktifkan botsetting terlebih dahulu dengan cara masukkan perintah *.botsetting* lalu vote on`) 
if (from in siapakahaku) return reply795('Masih ada game yang belum diselesaikan');
var { soal, jawaban } = pickRandom(JSON.parse(fs.readFileSync('./assets/game/siapakahaku.json')));
console.log('Jawaban : '+jawaban)
await reply795(`*GAME SIAPAKAH AKU*\n\nSoal: ${soal}\nPetunjuk: ${monospace(jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '-'))}\nWaktu: ${gamewaktu} detik`)
siapakahaku[from] = {
soal: soal,
jawaban: jawaban.toLowerCase(),
hadiah: randomNomor(10, 20),
waktu: setTimeout(function () {
if (siapakahaku[from]) reply795(`Waktu habis!\n\nJawaban dari soal:\n${monospace(soal)}\n\nAdalah: ${monospace(jawaban)}`);
delete siapakahaku[from];
}, gamewaktu * 1000)
}
break
case 'caklontong':
if(!isGroup) return onlyGroup()
if (!global.game) return reply795(`Aktifkan botsetting terlebih dahulu dengan cara masukkan perintah *.botsetting* lalu vote on`) 
if (from in caklontong) return reply795('Masih ada game yang belum diselesaikan');
var { soal, jawaban, deskripsi } = pickRandom(JSON.parse(fs.readFileSync('./assets/game/caklontong.json')));
console.log(`Jawaban : ${jawaban}\n${deskripsi}`)
await reply795(`*GAME CAK LONTONG*\n\nSoal: ${soal}\nPetunjuk: ${monospace(jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '-'))}\nWaktu: ${gamewaktu} detik`)
caklontong[from] = {
soal: soal,
jawaban: jawaban.toLowerCase(),
hadiah: randomNomor(10, 20),
waktu: setTimeout(function () {
if (caklontong[from]) reply795(`Waktu habis!\nJawabannya adalah: ${jawaban}\n${deskripsi}`)
delete caklontong[from];
}, gamewaktu * 1000)
}
break
case 'math': case 'kuismath':
if(!isGroup) return onlyGroup()
if (!global.game) return reply795(`Aktifkan botsetting terlebih dahulu dengan cara masukkan perintah *.botsetting* lalu vote on`) 
if (from in kuismath) return reply795('Masih ada game yang belum diselesaikan!');
let { genMath, modes } = require('./assets/game/math')
if (!q) return reply( `┌─〔 Mode 〕\n├ ${Object.keys(modes).join('\n├ ')}\n└────\ncontoh:\n${prefix}math hard`)
if (!(Object.keys(modes)).includes(args[0])) return reply795('Pilih mode yang bener GOBLOK!')
var { soal, jawaban, waktu, hadiah } = await genMath(q.toLowerCase()).catch((err) => m.reply('```Tolong pilih modenya yang benar contoh .math easy```'))
console.log('Jawaban : '+jawaban)
await reply795(`*GAME KUIS MATH*\n\nSoal: Berapa hasil dari ${soal.toLowerCase()}\nWaktu: ${waktu / 1000} detik`)
kuismath[from] = {
soal: soal,
jawaban: jawaban,
hadiah: randomNomor(2000, hadiah),
waktu: setTimeout(function () {
if (kuismath[from]) reply795(`Waktu habis!\nJawabannya adalah: ${jawaban}`)
delete kuismath[from];
}, waktu)
}
break
case 'family100': case 'f100':
if(!isGroup) return onlyGroup()
if (!global.game) return reply795(`Aktifkan botsetting terlebih dahulu dengan cara masukkan perintah *.botsetting* lalu vote on`) 
if (from in family100) return reply795(`Masih ada soal yang belum di selesaikan`)
let res = pickRandom(JSON.parse(fs.readFileSync('./assets/game/family100.json')));
var { soal, jawaban } = res.result

let famil = []
for (let i of jawaban){
let fefsh = i.split('/') ? i.split('/')[0] : i
let iuhbs = fefsh.startsWith(' ') ? fefsh.replace(' ','') : fefsh
let axsfh = iuhbs.endsWith(' ') ? iuhbs.replace(iuhbs.slice(-1), '') : iuhbs
famil.push(axsfh.toLowerCase())
}
await reply795(`*GAME FAMILY 100*\n\nSoal: ${soal}\nTotal Jawaban: ${jawaban.length}\n\nWaktu: ${gamewaktu} detik`)
family100[from] = {
soal: soal,
jawaban: famil,
hadiah: randomNomor(10, 20),
waktu: setTimeout(async function () {
if (from in family100) {
let teks = `Waktu habis!\nJawaban yang belum terjawab :`
let jwb = family100[from].jawaban
for (let i of jwb){teks += `\n${i}`}
reply(teks)
delete family100[from];
};
}, gamewaktu * 1000)
}
break

































//FITUR RPG GAMES
case 'joinrpg':{
if (!m.isGroup) return onlyGroup()
if (isPetualang) return reply('Kamu Telah join sebelumnya')
reqXp = 5000 * (Math.pow(2, getLevelingLevel(m.sender)) - 1)
_petualang.push(m.sender)
addInventoriDarah(m.sender, DarahAwal)
addInventori(m.sender)
addInventoriBuruan(m.sender)
fs.writeFileSync('./database/rpg/inventory.json', JSON.stringify(_petualang))
addLevelingId(m.sender) 
let itu = 'https://telegra.ph/file/a4ec01498e764ae42c8c4.jpg'
alice.sendMessage(m.chat, {image:{url: itu}, caption: 'Sukses join Rpg games' }, {quoted:m})
}
break
case 'mancing':{
if (!m.isGroup) return reply('[ System Notice ] Only for group')
if (!isPetualang) return reply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
setTimeout( () => {
const fishing = Math.ceil(Math.random() * 10)
addIkan(m.sender, fishing)
reply(`*FISH FISHED* kamu mendapatkan *${fishing}* Ikan selama 1 menit`)
}, 60000); //2 minute
setTimeout( () => {
reply('Ikannya Terpancing!..' )
}, 20000) // 1000 = 1s,
setTimeout( () => {
reply('🎣 Menarik Kail. . .' )
}, 7000) // 1000 = 1s,
setTimeout( () => {
let mancingnya = 'https://telegra.ph/file/4cc0b6bd2827a9b23a189.mp4'
alice.sendMessage(from, {video: {url:mancingnya}, caption: 'mulai memancing', gifPlayback: true},{quoted:m})
}, 0) // 1000 = 1s,
}
break
case 'inv': case 'me': case 'inventori': case 'inventory': case 'profile':{
if(!isGroup) return onlyGroup()
if (!isPetualang) return reply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
let teksehmazeh = `*INFO USER*\n\n`
 teksehmazeh += `*📝 Name* : ${pushname}\n`
 teksehmazeh += `*📱 Number* : ${nomore}\n`
 teksehmazeh += `*👩‍⚕️ Premium* : ${isPremium ? 'Premium':'Free'}\n`
 teksehmazeh += `*🎟️ Limit* : ${limit}\n`
 teksehmazeh += `*🕺🏻 Petualang* : ${isPetualang ? 'Petualang':'Bukan Petualang'}\n\n`
 teksehmazeh += `*RPG USER*\n\n`
 teksehmazeh += `*❤️ Blood* : ${getDarah(m.sender) ? getDarah(m.sender) : 0}\n`
 teksehmazeh += `*◻️️ Iron* : ${getBesi(m.sender) ? getBesi(m.sender) : 0}\n`
 teksehmazeh += `*🌟 Gold* : ${getEmas(m.sender) ? getEmas(m.sender) : 0}\n`
 teksehmazeh += `*🐲 Emerald* : ${getEmerald(m.sender) ? getEmerald(m.sender) : 0}\n`
 teksehmazeh += `*💎 Diamond* : ${getDm(m.sender) ? getDm(m.sender) : 0}\n`
 teksehmazeh += `*⏺️ Limit* : ${isCreator ? 'Unlimited' : isPremium ? 'Unlimited' : getLimit(m.sender, limitCount, limit)}\n`
 teksehmazeh += `*💵 Saldo* :  Rp. ${toRupiah(cekSaldo(m.sender, db_saldo))}\n`
 teksehmazeh += `*🧪 Potion* : ${getPotion(m.sender) ? getPotion(m.sender) : 0}\n\n`
 teksehmazeh += `*HUNT RESULT*\n`
 teksehmazeh += `*🐟 Fish* :` + util.format(getIkan(m.sender) ? getIkan(m.sender) : 0 + getMancingIkan(m.sender) ? getMancingIkan(m.sender) :0) + `\n`
 teksehmazeh += `*🐔 Chicken* : ${getAyam(m.sender) ? getAyam(m.sender) : 0}\n`
 teksehmazeh += `*🐇 Rabbit* : ${getKelinci(m.sender) ? getKelinci(m.sender) : 0}\n`
 teksehmazeh += `*🐑 Sheep* : ${getDomba(m.sender) ? getDomba(m.sender) : 0}\n`
 teksehmazeh += `*🐄 Cow* : ${getSapi(m.sender) ? getSapi(m.sender) : 0}\n`
 teksehmazeh += `*🐘 Elephant* : ${getGajah(m.sender) ? getGajah(m.sender) : 0}\n`
 teksehmazeh += `🎢 *Coal* : ${getMiningcoal(m.sender) ? getMiningcoal(m.sender) : 0}\n`
 teksehmazeh += `🛑 *Stone* : ${getMiningstone(m.sender) ? getMiningstone(m.sender) : 0}\n`
 teksehmazeh += `❄️ *Copper Ore* : ${getMiningore(m.sender) ? getMiningore(m.sender) : 0}\n`
 teksehmazeh += `🛠️ *Ingot Ore* : ${getMiningingot(m.sender) ? getMiningingot(m.sender) : 0}\n`
 teksehmazeh += `🪵 *Wood* : ${getNebangKayu(m.sender) ? getNebangKayu(m.sender) : 0}\n`
await alice.sendMessage(m.chat, {
text: teksehmazeh,
contextInfo: {
externalAdReply: {  
title: `${pushname} PROFILE & BAG`, 
body: 'Play RPG Games With Your Friends',
thumbnailUrl: ppnyauser,
sourceUrl: `${global.saluran}`,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
}
break
case 'mining': case 'mine':{
if (!m.isGroup) return onlyGroup()
if (!isPetualang) return reply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
if (isCekDarah < 1) return reply(`Kamu Lelah!, Coba Sembuhkan Menggunakan Ramuan`) 
let besi = [1,2,5,0,3,0,1,1,4,1,5,0,0]
let emas = [0,1,2,3,0,0,0,1,1,0,0,2]
let emerald = [0,0,1,0,0,1,0,2,1,0,0,1]
var besinya = besi[Math.floor(Math.random() * besi.length)]
var emasnya = emas[Math.floor(Math.random() * emas.length)]
var emeraldnya = emerald[Math.floor(Math.random() * emerald.length)]
setTimeout( async () => {
let caption = `_MINING RESULT_\n\n*Iron* : ${besinya}\n*Gold* : ${emasnya}\n*Emerald* : ${emeraldnya}`
await alice.sendMessage(m.chat, {image:{ url : 'https://telegra.ph/file/d17479f0a56cc52826101.jpg'}, caption: caption}, {quoted: m})
}, 7000)
setTimeout( async () => {
await alice.sendTextWithMentions(m.chat, `@${m.sender.split("@")[0]} Otw Mining`, m) 
}, 1500)
kurangDarah(m.sender, 10)
addBesi(m.sender, besinya)
addEmas(m.sender, emasnya)
addEmerald(m.sender, emeraldnya) 
}
break
case 'buy':{
if (!m.isGroup) return onlyGroup()
if (!isPetualang) return reply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
if (!text) return reply(`Mau buy apa lu?\n\n1.potion\n2.baitfood\n3.limit\n\nExample: ${prefix + command} baitfood`)
var anu = args[1]
if (args[0] === 'potion'){
let noh = 100000 * anu
 if (!args[1]) return reply(`Example : ${prefix + command} potion 2\n 1 Potion = 100000 Money`)
 if (isMonay < noh) return reply('Sisa Uang Anda Tidak Cukup Untuk Pembelian Ini')
 kurangMonay(m.sender, noh)
 var apalu = anu * 1
 addPotion(m.sender, apalu)
setTimeout( async () => {
reply(`Transaksi Berhasil ✅\n*Sisa uang* : ${getMonay(m.sender)}\n*Potion* : ${getPotion(m.sender)}`)
}, 2000) 
 } else 
 if (args[0] === 'baitfood'){
let noh = 5000 * anu
 if (!args[1]) return reply(`Example : ${prefix + command} baitfood 2\n 1 Bait Food = 2500 Money`)
 if (isMonay < noh) return reply('Sisa Uang Anda Tidak Cukup Untuk Pembelian Ini')
 kurangMonay(m.sender, noh)
 var apalu = anu * 1
 addUmpan(m.sender, apalu)
setTimeout( async () => {
reply(`Transaksi Berhasil ✅\n*Sisa uang* : ${getMonay(m.sender)}\n*Bait Food* : ${getUmpan(m.sender)}`)
}, 2000) 
} else 
if (args[0] === 'limit'){
let noh = 35000 * anu
 if (!args[1]) return reply(`Example : ${prefix + command} limit 2\n 1 Limit = 35000 Money`)
 if (isMonay < noh) return reply('Sisa Uang Anda Tidak Cukup Untuk Pembelian Ini')
 kurangMonay(m.sender, noh)
 var apalu = anu * 1
 addLimit(m.sender, apalu)
setTimeout( async() => {
reply(`Transaksi Berhasil ✅\n*Sisa uang* : ${getMonay(m.sender)}\n*Limit* : ${getLimit(m.sender)}`)
}, 2000) 
} else { 
 reply(`Mau buy apa lu?\n\n1.potion\n2.baitfood\n3.limit\n\nExample: ${prefix + command} baitfood`)}
 }
 break
case 'sell': case 'sel': case 'jual':{
 if(!isGroup) return onlyGroup()
if (!isPetualang) return reply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
 if (!text) return reply(`Mau jual apa?\n- fish\n- chicken\n- rabbit\n- sheep\n- cow\n- elephant\n- iron\n- gold\n- emerald\n\nExample : ${prefix + command} fish 2`)
var anu = args[1]
 if (args[0] === 'fish'){
 if (isIkan < anu) return reply(`Anda Tidak Memiliki Cukup Ikan Untuk Transaksi Ini`)
 if (!args[1]) return reply(`Example : ${prefix + command} fish 2\n 1 Fish = 1500 Money`)
 kurangIkan(m.sender, anu)
let monaynya = 1500 * anu
 addMonay(m.sender, monaynya)
setTimeout( async () => {
reply(`Transaksi Berhasil ✅\n*Sisa uang* : ${getMonay(m.sender)}\n*Sisa Ikan Fish : ${getIkan(m.sender)}`)
}, 2000) 
 } else
 if (args[0] === 'chicken'){
 if (isAyam < anu) return reply(`Anda Tidak Memiliki Cukup Ayam Untuk Transaksi Ini`)
 if (!args[1]) return reply(`Example : ${prefix + command} chicken 2\n 1 Chicken = 2500 Money`)
 kurangAyam(m.sender, anu)
let monaynya = 2500 * anu
 addMonay(m.sender, monaynya)
setTimeout( async () => {
 reply(`Transaksi Berhasil ✅\n*Sisa uang* : ${getMonay(m.sender)}\n*Sisa Ayam* : ${getAyam(m.sender)}`)
}, 2000) 
 } else
 if (args[0] === 'rabbit'){
 if (isKelinci < anu) return reply(`Anda Tidak Memiliki Cukup Kelinci Untuk Transaksi Ini`)
 if (!args[1]) return reply(`Example : ${prefix + command} rabbit 2\n 1 Rabbit = 3000 Money`)
 kurangKelinci(m.sender, anu)
let monaynya = 3000 * anu
 addMonay(m.sender, monaynya)
setTimeout( async () => {
reply(`Transaksi Berhasil ✅\n*Sisa uang* : ${getMonay(m.sender)}\n*Sisa kelinci* : ${getKelinci(m.sender)}`)
}, 2000) 
 } else
 if (args[0] === 'sheep'){
 if (isDomba < anu) return reply(`Anda Tidak Memiliki Cukup Domba Untuk Transaksi Ini`)
 if (!args[1]) return reply(`Example : ${prefix + command} domba 2\n 1 Sheep = 5000 money`)
 kurangDomba(m.sender, anu)
let monaynya = 5000 * anu
 addMonay(m.sender, monaynya)
setTimeout( async () => {
reply(`Transaksi Berhasil ✅\n*Sisa uang* : ${getMonay(m.sender)}\n*Sisa domba* : ${getDomba(m.sender)}`)
}, 2000) 
 } else
 if (args[0] === 'cow'){
 if (isSapi < anu) return reply(`Anda Tidak Memiliki Cukup Sapi Untuk Transaksi Ini`)
 if (!args[1]) return reply(`Example : ${prefix + command} cow 2\n 1 Cow = 10000 Money`)
 kurangSapi(m.sender, anu)
let monaynya = 10000 * anu
 addMonay(m.sender, monaynya)
setTimeout( async () => {
reply(`Transaksi Berhasil ✅\n*Sisa uang* : ${getMonay(m.sender)}\n*Sisa sapi* : ${getSapi(m.sender)}`)
}, 2000) 
 } else
 if (args[0] === 'elephant'){
 if (isGajah < anu) return reply(`Anda Tidak Memiliki Cukup Gajah Untuk Transaksi Ini`)
 if (!args[1]) return reply(`Example : ${prefix + command} elephant 2\n 1 Elephant = 15000 Money`)
 kurangGajah(m.sender, anu)
let monaynya = 15000 * anu
 addMonay(m.sender, monaynya)
setTimeout( async () => {
reply(`Transaksi Berhasil ✅\n*Sisa uang* : ${getMonay(m.sender)}\n*Sisa gajah* : ${getGajah(m.sender)}`)
}, 2000) 
 } else
 if (args[0] === 'iron'){
 if (isBesi < anu) return reply(`Anda Tidak Memiliki Cukup Besi Untuk Transaksi Ini`)
 if (!args[1]) return reply(`Example : ${prefix + command} iron 2\n 1 Iron = 15000 Money`)
 kurangBesi(m.sender, anu)
let monaynya = 16000 * anu
 addMonay(m.sender, monaynya)
setTimeout( async () => {
reply(`Transaksi berhasil ✅\n*Sisa uang* : ${getMonay(m.sender)}\n*Sisa besi* : ${getBesi(m.sender)}`)
}, 2000) 
 } else
 if (args[0] === 'gold'){
 if (isEmas < anu) return reply(`Anda Tidak Memiliki Cukup Emas Untuk Transaksi Ini`)
 if (!args[1]) return reply(`Example : ${prefix + command} gold 2\n 1 Gold = 50000 Money`)
 kurangEmas(m.sender, anu)
let monaynya = 50000 * anu
 addMonay(m.sender, monaynya)
setTimeout( async () => {
reply(`Transaksi berhasil ✅\n*Sisa uang* : ${getMonay(m.sender)}\n*Sisa emas* : ${getEmas(m.sender)}`)
}, 2000) 
 } else
 if (args[0] === 'emerald'){
 if (isEmerald < anu) return reply(`Anda Tidak Memiliki Cukup Zamrud Untuk Transaksi Ini`)
 if (!args[1]) return reply(`Example : ${prefix + command} emerald 2\n 1 Emerald = 100000 Money`)
 kurangEmerald(m.sender, anu)
let monaynya = 100000 * anu
 addMonay(m.sender, monaynya)
setTimeout( async () => {
reply(`Transaksi berhasil ✅\n*Sisa uang* : ${getMonay(m.sender)}\n*Sisa zamrud* : ${getEmerald(m.sender)}`)
}, 2000) 
 } else { 
reply(`Mau jual apa?\n- fish\n- chicken\n- rabbit\n- sheep\n- cow\n- elephant\n- iron\n- gold\n- emerald\n\nExample : ${prefix + command} fish 2`)
 }

 }
 break
case 'heal':{
 
if (!m.isGroup) return onlyGroup()
if (!isPetualang) return reply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
if (!isCekDarah < 1) return reply('Anda Hanya Dapat Menyembuhkan Saat Darah Anda 0')
if (isCekDarah > 100) return reply('Darahmu Penuh')
if (isPotion < 1) return reply(`Anda Tidak Punya Ramuan, Coba Beli Dengan Cara #buypotion _amount_`) 
 addDarah(m.sender, 100)
 kurangPotion(m.sender, 1)
 reply('Done! Darah mu dah full')
 }
 break
case 'hunt': case 'hunting': {
if(!isGroup) return onlyGroup()
if (!isPetualang) return reply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
if (isCekDarah < 1) return reply('Darahmu Habis, Coba Sembuhkan Menggunakan Ramuan') 
let luka = ["Pierced by a thorn while hunting","Slipped into the abyss while hunting","Scratched by a wild animal","Not careful","Entangled in roots","Fall while hunting"]
let location = ["Jungle","Amazon forest","Tropical forest","Meadow","African forest","Mountains"]
var ikanmu = Math.ceil(Math.random() * 10)
var ayam = Math.ceil(Math.random() * 8)
var kelinci = Math.ceil(Math.random() * 7)
var dombanya = [3,0,4,0,5,4,6,0,1,0,2,3,0,3,0,1]
var sapinya = [2,0,3,0,4,0,5,0,1,0,2,0,3,0,1]
var gajahnya = [1,0,4,0,2,0,1,0,2,1,3,0,1]
var domba = dombanya[Math.floor(Math.random() * dombanya.length)] 
var sapi = sapinya[Math.floor(Math.random() * sapinya.length)] 
var gajah = gajahnya[Math.floor(Math.random() * gajahnya.length)]
var lukanya = luka[Math.floor(Math.random() * luka.length)]
var lokasinya = location[Math.floor(Math.random() * location.length)]
if (lokasinya === 'Jungle') {
var image = 'https://telegra.ph/file/92967f55b1f437fdd55fe.jpg'
} else
if (lokasinya === 'Amazon forest') {
var image = 'https://telegra.ph/file/2b9b53837d9f109862224.jpg'
} else
if (lokasinya === 'Tropical forest') {
var image = 'https://telegra.ph/file/bd662563855328a1832e6.jpg'
} else
if (lokasinya === 'Meadow') {
var image = 'https://telegra.ph/file/66435cf783e308b19927e.jpg'
} else
if (lokasinya === 'African forest') {
var image = 'https://telegra.ph/file/c5996d581846f70ed1514.jpg'
} else
if (lokasinya === 'Mountains') {
var image = 'https://telegra.ph/file/ca8f84d91ca3e1d5efa59.jpg'
}
 setTimeout( async () => {
let teksehmazeh = `_HUNT RESULT_\n\n`
 teksehmazeh += `*🐟Fish* : ${ikanmu}\n`
 teksehmazeh += `*🐔Chicken* : ${ayam}\n`
 teksehmazeh += `*🐇Rabbit* : ${kelinci}\n`
 teksehmazeh += `*🐑Sheep* : ${domba}\n`
 teksehmazeh += `*🐄Cow* : ${sapi}\n`
 teksehmazeh += `*🐘Elephant* : ${gajah}\n\n`
 teksehmazeh += `_INFO_\n`
 teksehmazeh += `*Location* : ${lokasinya}\n`
 teksehmazeh += `*Wounded* : ${lukanya}, blood - 10\n`
 teksehmazeh += `*Remaining blood* : ${getDarah(m.sender)}\n`
await alice.sendMessage(m.chat, {image:{ url: image }, caption: teksehmazeh}, {quoted: m})
}, 5000)
 setTimeout( () => {
alice.sendTextWithMentions(m.chat, `@${m.sender.split("@")[0]} Started Hunting In ${lokasinya}`, m) 
}, 1000) 
 addIkan(m.sender, ikanmu) 
addAyam(m.sender, ayam) 
addKelinci(m.sender, kelinci)
addDomba(m.sender, domba)
addSapi(m.sender, sapi)
addGajah(m.sender, gajah)
 kurangDarah(m.sender, 10)
 }
 break
case 'adventure':{
if (!m.isGroup) return onlyGroup()
if (!isPetualang) return reply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
ngab = ['Avalanche','Volcanic Eruption','Tsunami','Earthquake','Meteor','Demon']
var sesuatu = ngab[Math.floor(Math.random() * ngab.length)]
var dungeon =['Whetstone','Willow Field','Rodeo','Verdant Blufs','Bull Holland','Fallen Tree','Dellnort','Verona Lush','Leafy Hollow','Chilliad Dome','Garcia','Pine Valley','Santa Florals','Guvero East','Cranbarry','Junever','Aldea Malvada','Green Palms','Green Oasis','Fort Carson','Prickel Pine','Pilson Meadow','Boca Roca','Rocksore East','Camel Toe','Hanky Panky','Fern Ridge','Montgomerry','Flint Yankton','Vespucci','fortress city', 'ravines valley', 'horizon valley', 'cyber city', 'end city', 'templar city', 'pochinki', 'peak','Vertical Zone','Sentainel Country','Night City','Flush City','Royals Canyon','Blackburn','Peterborough','Tarnstead','Jarren’s','Outpost','Landow','Nearon','Kincardine','Aysgarth','Veritas','Openshaw','Bredwardine','Berkton','Wolford','Norwich','Kald','Solaris','Kilead','Pitmerden','Acomb','Eldham','Warcester','Lingmell','Kilead','Cromerth','Wingston','Garmsby','Kingcardine','Perthlochry','Frostford','Hillford','Hardersfield','Tarrin','Holmfirth','Caerleon','Elisyum','Ballaeter','Penshaw','Bradford','Wigston','Accreton','Kameeraska','Ferncombe','Kilerth','Erostey','Carran','Jongvale','Larnwick','Queenstown','Whaelrdrake','Baerney','Wingston','Arkney','Strongfair','Lowestoft','Beggar’s Hole','Shepshed','Perthlochry','Ironforge','Tywardreath','Pontheugh','Foolshope','Hull','Dalmerlington','Aucteraden','Woodpine','Millstone','Windermere','Lancaster','Kirkwall','Rotherhithe','Astrakhan','Watford','Ritherhithe','Krosstoen','Pella’s','Wish','Grimsby','Ayrith','Ampleforth','Skystead','Eanverness','Penshaw','Peatsland','Astrakane','Pontybridge','Caershire','Snowbush','Sutton','Northwich','Hogsfeet','Claethorpes','Sudbury','Cherrytown','Blue Field','Orrinshire','Aempleforth','Garrigill','Jedburgh','Eastbourne','Taedmorden','Venzor','Grasmere','Ubbin','Falls','Violl’s Garden','Glanchester','Bailymena','Arkkukari','Skargness','Cardend','Llanybydder','Faversham','Yellowseed','Carlisle','Cirencester','Aramoor','Furness','Kincardine','Rotherham','Emelle','Boroughton','Carran','Ffestiniog','Mansfield','Huthwaite','Marclesfield','Pavv','Squall’s End','Glenarm','Dragontail','Moressley','Hardersfield','Gilramore','Aria','Ecrin','Clare View Point','Blackburn','Oakheart','Doonatel','Broughton','Carlisle','Murlayfield','Nuxvar']
var sesuatuu = dungeon[Math.floor(Math.random() * dungeon.length)]
hasm = "https://telegra.ph/file/ff94536d69e0f4f3e7b54.jpg"
var adven = Math.ceil(Math.random() * 1000)
var money = Math.ceil(Math.random() * 300)
setTimeout( () => {
var hg = `「 DEATH 」\n\n *┊ Place* ${sesuatuu}\n ┊ *MONEY :* $${money}\n ┊ *EXP :* ${adven}Xp`
alice.sendMessage(m.chat, {image:{url:hasm}, caption: hg},{quoted:m})
}, 7000)
setTimeout( () => {
reply(`Awass`)
}, 5000) // 1000 = 1s,
setTimeout( () => {
reply(`Tiba-tiba Ada ${sesuatu}`)
}, 3000) // 1000 = 1s,
setTimeout( () => {
reply(`${pushname} On an Adventure`)
}, 0) // 1000 = 1s,
addLevelingXp(m.sender, adven)
addBalance(m.sender, money, balance)
}
break
case 'ojek': case 'ngojek':{
if (!m.isGroup) return onlyGroup()
if (!isPetualang) return reply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
var adven = Math.ceil(Math.random() * 1000)
var money = Math.ceil(Math.random() * 300)
setTimeout( () => {
var hg = `
*—[ Hasil Ngojek ${pushname} ]—*
 ➕ 💹 Uang = [ ${money} ]
 ➕ ✨ Exp = [ ${adven} ]	 
 ➕ 😍 Order Selesai = +1
`
reply(hg)
}, 10000)
setTimeout( () => {
reply(`
➕ 💹Menerima gaji....
`)
}, 9000)
setTimeout( () => {
reply(`
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
⬛⬜⬜⬛⬛⬜⬜⬜⬛⬛
⬛⬛⬛⬛⬛⬛⬛🛵⬛⬛
🏘️🏘️🏘️🏘️🌳  🌳 🏘️       


➕ Sampai di tujuan...
`)
}, 7000)
setTimeout( () => {
reply(`
🚶🛵⬛⬛⬛⬛⬛⬛⬛⬛
⬛⬜⬜⬜⬛⬜⬜⬜⬛⬛
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
🏘️🏘️🏘️🏘️🌳  🌳 🏘️       


➕ Mengantar ke tujuan....
`)
}, 5000) // 1000 = 1s,
setTimeout( () => {
reply(`
Mendapatkan Orderan...
`)
}, 3000) // 1000 = 1s,
setTimeout( () => {
reply(`Mencari Pelanggan...`)
}, 0) // 1000 = 1s,
addLevelingXp(m.sender, adven)
addBalance(m.sender, money, balance)
}
break
case 'luckyday':
case 'luckytime':{
if (!m.isGroup) return onlyGroup()
if (!isPetualang) return reply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
ez = Math.ceil(Math.random() * 450)
a = randomNomor(99)
b = randomNomor(500)
c = randomNomor(150)
addBalance(m.sender, b, balance)
addLevelingXp(m.sender, ez)
addEmas(m.sender, a)
addBesi(m.sender, c)
reply(`🎰 *Lucky*\n┊ *Money:* $${b}\n┊ *Gold :* ${a}\n┊ *Iron :* ${c}\n┊ *XP :* ${ez}`)
}
break
case 'slime':
case 'killslime':{
if (!m.isGroup) return onlyGroup()
if (!isPetualang) return reply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
ez = Math.ceil(Math.random() * 400)
addLevelingXp(m.sender, ez)
a = randomNomor(55)
b = randomNomor(400)
c = randomNomor(80)
d = randomNomor(3)
addLevelingXp(m.sender, ez)
addBalance(m.sender, b, balance)
addEmas(m.sender, a)
addBesi(m.sender, c)
addDm(m.sender, d)
bufutI = "https://telegra.ph/file/c34a444fa8824d8bb6e18.jpg"
var hg = `*Misi kill Slime*\n\n🎁 *Hadiah untuk killing Slime*\n ┊ *Money:* $${b}\n ┊ *Iron:* ${c}\n ┊ *Gold:* ${a}\n ┊ *Diamond:* ${d}\n\n*Terima kasih telah menjalankan misi ini*`
alice.sendMessage(m.chat, {image:{url:bufutI},caption: hg} , {quoted:m}) 
}
break
case 'goblin':
case 'killgoblin':{
 
if (!m.isGroup) return onlyGroup()
if (!isPetualang) return reply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
ez = Math.ceil(Math.random() * 500)
addLevelingXp(m.sender, ez)
a = randomNomor(65)
b = randomNomor(500)
c = randomNomor(90)
d = randomNomor(5)
addLevelingXp(m.sender, ez)
addBalance(m.sender, b, balance)
addEmas(m.sender, a)
addBesi(m.sender, c)
addDm(m.sender, d)
bufo = "https://telegra.ph/file/19bdc38aaafda29f7afe1.jpg"
var hg = `*Misi kill Goblin*\n\n🎁 *Hadiah untuk killing Goblin*\n ┊ *Money:* $${b}\n ┊ *Iron:* ${c}\n ┊ *Gold:* ${a}\n ┊ *Diamond:* ${d}\n\n*Terima kasih telah menjalankan misi ini*`
alice.sendMessage(m.chat, {image:{url:bufo}, caption: hg }, {quoted:m})
}
break
case 'devil':
case 'killdevil':{
if (!m.isGroup) return onlyGroup()
if (!isPetualang) return reply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
ez = Math.ceil(Math.random() * 600)
addLevelingXp(m.sender, ez)
a = randomNomor(70)
b = randomNomor(600)
c = randomNomor(95)
d = randomNomor(6)
addLevelingXp(m.sender, ez)
addBalance(m.sender, b, balance)
addEmas(m.sender, a)
addBesi(m.sender, c)
addDm(m.sender, d)
bufas = "https://telegra.ph/file/dbecd2f871988f52bf555.jpg"
var hg = `*Misi kill Devil*\n\n🎁 *Hadiah untuk killing Devil*\n ┊ *Money:* $${b}\n ┊ *Iron:* ${c}\n ┊ *Gold:* ${a}\n ┊ *Diamond:* ${d}\n\n*Terima kasih telah menjalankan misi ini*`
alice.sendMessage(m.chat, {image:{url: bufas}, caption: hg }, {quoted:m})
}
break
case 'behemoth':
case 'killbehemoth':{
 
if (!m.isGroup) return onlyGroup()
if (!isPetualang) return reply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
ez = Math.ceil(Math.random() * 700)
addLevelingXp(m.sender, ez)
a = randomNomor(75)
b = randomNomor(600)
c = randomNomor(100)
d = randomNomor(7)
addLevelingXp(m.sender, ez)
addBalance(m.sender, b, balance)
addEmas(m.sender, a)
addBesi(m.sender, c)
addDm(m.sender, d)
batai = "https://telegra.ph/file/43259a7d8accff8b627c0.jpg"
var hg = `*Misi kill Behemoth*\n\n🎁 *Hadiah untuk kiling Behemoth*\n ┊ *Money:* $${b}\n ┊ *Iron:* ${c}\n ┊ *Gold:* ${a}\n ┊ *Diamond:* ${d}\n\n*Terima kasih telah menjalankan misi ini*`
alice.sendMessage(m.chat, {image:{url: batai}, caption: hg }, {quoted:m})
}
break
case 'demon':
case 'killdemon':{
 
if (!m.isGroup) return onlyGroup()
if (!isPetualang) return reply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
ez = Math.ceil(Math.random() * 850)
addLevelingXp(m.sender, ez)
a = randomNomor(90)
b = randomNomor(900)
c = randomNomor(120)
d = randomNomor(10)
addLevelingXp(m.sender, ez)
addBalance(m.sender, b, balance)
addEmas(m.sender, a)
addBesi(m.sender, c)
addDm(m.sender, d)
bhuu = "https://telegra.ph/file/4a264a10ea2e5f18314f1.jpg"
var hg = `*Misi kill Demon*\n🎁 *Demon Kill Reward*\n ┊ *Money:* $${b}\n ┊ *Iron:* ${c}\n ┊ *Gold*: ${a}\n ┊ *Diamond:* ${d}\n\n*Terima Kasih Telah Melaksanakan Misi Ini*`
alice.sendMessage(m.chat, {image: {url: bhuu}, caption: hg }, {quoted:m})
}
break
case 'demonking':
case 'killdemonking':{
if (!m.isGroup) return onlyGroup()
if (!isPetualang) return reply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
ez = Math.ceil(Math.random() * 1000)
addLevelingXp(m.sender, ez)
addBalance(m.sender, 1999, balance)
addEmas(m.sender, 99)
addBesi(m.sender, 99)
addDm(m.sender, 99)
bhuud = "https://telegra.ph/file/cdf482a8de192189057d8.jpg"
var hg = `*Misi kill DemonKing*\n\n🎁 *DemonKing Kill Reward*\n ┊ *Money* : $${b}\n ┊ *Iron :* ${c}\n ┊ *Gold :* ${a}\n ┊ *Diamond :* ${d}\n\n*Terima Kasih Telah Melaksanakan Misi Ini*`
alice.sendMessage(m.chat, {image:{url: bhuud}, caption: hg }, {quoted:m})
}
break
case 'sellikan':{
if (!m.isGroup) return onlyGroup()
if (!isPetualang) return reply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
if (args.length < 1) return reply(`Kirim perintah *${prefix + command}* jumlah untuk dijual\n\nContoh *${prefix + command}* 10`)
jmlh = text
rp = 5 * jmlh
if (getFish(m.sender) < jmlh) return reply(`*Ikan Anda Tidak Cukup*`)
sellFish(m.sender, jmlh, balance)
addBalance(m.sender, rp, balance) 
reply(`🛍️ *MARKET*\n ┊ Seller : ${pushname}\n ┊ Buyer : Admin\n ┊ Price/Fish : 5\n ┊ Status : Success\n ┊ Left FishPrice/Fish : ${await getFish(m.sender)}\n ┊ Sales Results : $${rp}`)
}
break
case 'sellbesi':{
if (!m.isGroup) return onlyGroup()
if (!isPetualang) return reply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
if (args.length < 1) return reply(`Kirim perintah *${prefix + command}* jumlah untuk dijual\n\nContoh *${prefix + command}* 10`)
jmlh = text
rp = 10 * jmlh
if (getBesi(m.sender) < jmlh) return reply(`Besi Tidak Cukup`)
sellBesi(m.sender, jmlh, balance)
addBalance(m.sender, rp, balance) 
reply(`🛍️ MARKET\n ┊ Seller : ${pushname}\n ┊ Buyer : Admin\n ┊ Harga/Besi : 10\n ┊ Status : Sukses\n ┊ Sisa Besi : ${await getBesi(m.sender)}\n ┊ Sales Results : $${rp}`)
}
break
case 'sellemas':{
if (!m.isGroup) return onlyGroup()
if (!isPetualang) return reply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
if (args.length < 1) return reply(`Kirim perintah *${prefix + command}* jumlah untuk dijual\n\nContoh *${prefix + command}* 10`)
jmlh = text
rp = 25 * jmlh
if (getEmas(m.sender) < jmlh) return reply(`Emas Anda Tidak Cukup`)
sellEmas(m.sender, jmlh, balance)
addBalance(m.sender, rp, balance) 
reply(`🛍️ MARKET\n ┊ Seller : ${pushname}\n ┊ Buyer : Admin\n ┊ Harga/Emas : 25\n ┊ Status : Sukses\n ┊ Sisa Emas : ${getEmas(m.sender)}\n ┊ Sales Results : $${rp}`)
}
break 
case 'jelajah': {
var tempsa = args.join(" ")
if (tempsa == 'corbiens river') {
var asu = `https://telegra.ph/file/00018dab77a6cea81523e.jpg`
setTimeout( async () => {
const vio = Math.ceil(Math.random() * 70) 
const pikan = Math.ceil(Math.random() * 15)
addStone(m.sender, vio)
addIkan(m.sender, pikan)
alice.sendMessage(m.chat, {image:{url: asu}, caption: `*Congratulation 🎊*${enter}${enter}Kamu mendapatkan *${vio}* batu dan *${pikan}* ikan${enter}${enter}Cek inventory anda dengan cara ketik ${prefix}inventory`}, {quoted:m})
}, 2000); //2 minute
setTimeout( () => {
reply('Sedang berpetualang, silahkan tunggu...')
}, 0) 
} else if (tempsa === 'chiltawa woods') {
let gos = `https://telegra.ph/file/77c3badc9f97d6589a30f.jpg`
setTimeout( async () => {
const tesaaq = Math.ceil(Math.random() * 110) // batu
const ise = Math.ceil(Math.random() * 20)
addStone(m.sender, tesaaq)
addKayu(m.sender, ise)
alice.sendMessage(m.chat, {image:{url:gos},caption: `*Congratulation 🎊*${enter}${enter}Kamu mendapatkan *${tesaaq}* batu dan *${ise}* kayu${enter}${enter}Cek inventory anda dengan cara ketik ${prefix}inventory`}, {quoted:m})
}, 2000); //2 minute
setTimeout( () => {
reply('Sedang berpetualang, silahkan tunggu...')
}, 0) //1sec
} else if (tempsa === 'cochher sea') { 
let seae = `https://telegra.ph/file/eabfc907cfc447386b0c0.jpg`
setTimeout( async () => {
const feds = Math.ceil(Math.random() * 65)
addIkan(m.sender, feds)
alice.sendMessage(m.chat, {image:{url: seae},caption: `*Congratulation 🎊*${enter}${enter}Kamu mendapatkan *${feds}* ikan${enter}${enter}Cek inventory anda dengan cara ketik ${prefix}inventory`}, {quoted:m})
}, 2000); //2 minute
setTimeout( () => {
reply('Sedang berpetualang, silahkan tunggu...')
}, 0) //1sec
} else if (tempsa === 'limingstall mountains') {
let seoe = `https://telegra.ph/file/19a10ff95c31af10267e4.jpg`
setTimeout(() => {
const fads = Math.ceil(Math.random() * 50)
const fids = Math.ceil(Math.random() * 80)
addOre(m.sender, fads)
addStone(m.sender, fids)
alice.sendMessage(m.chat, {image:{url:seoe}, caption: `*Congratulation 🎊*${enter}${enter}Kamu mendapatkan *${fads}* copper ore dan ${fids} batu${enter}${enter}Cek inventory anda dengan cara ketik ${prefix}inventory`},{quoted:m})
}, 2000); //2 minute
setTimeout( () => {
reply('Sedang berpetualang, silahkan tunggu...')
}, 0) //1sec

} else if (tempsa === 'chade mountain') {
let seye = `https://telegra.ph/file/efdcd7d07dd22294695a8.jpg`
setTimeout( () => {
const pore = Math.ceil(Math.random() * 40)
const pone = Math.ceil(Math.random() * 60)
addOre(m.sender, pore)
addStone(m.sender, pone)
alice.sendMessage(m.chat, {image:{url:seye}, caption: `*Congratulation 🎊*${enter}${enter}Kamu mendapatkan *${pore}* copper ore dan ${pone} batu${enter}${enter}Cek inventory anda dengan cara ketik ${prefix}inventory`},{quoted:m})
}, 3000); //2 minute
setTimeout( () => {
reply('Sedang berpetualang, silahkan tunggu...')
}, 0) //1sec

} else if (tempsa === 'gerbil woods') {
let siae = `https://telegra.ph/file/44fc684be9865c0fcb5fa.jpg`
setTimeout( async () => {
const tzys = Math.ceil(Math.random() * 90) // batu
const isue = Math.ceil(Math.random() * 45)
addStone(m.sender, tzys)
addKayu(m.sender, isue)
alice.sendMessage(m.chat, {image:{url:siae}, caption: `*Congratulation 🎊*${enter}${enter}Kamu mendapatkan *${tzys}* batu dan *${isue}* kayu${enter}${enter}Cek inventory anda dengan cara ketik ${prefix}inventory`},{quoted:m})
}, 2000); //2 minute
setTimeout( () => {
reply('Sedang berpetualang, silahkan tunggu...')
}, 0) //1sec

} else if (tempsa === 'moobiens grassland') {
let bbbb = `https://telegra.ph/file/0c3fa86f57a4f6d9c4c0e.jpg`
setTimeout( () => {
const awqu = Math.ceil(Math.random() * 200) // batu
const usui = Math.ceil(Math.random() * 20)
addStone(m.sender, awqu)
addKayu(m.sender, usui)
alice.sendMessage(m.chat, {image:{url:bbbb}, caption: `*Congratulation 🎊*${enter}${enter}Kamu mendapatkan *${awqu}* batu dan ${usui} kayu${enter}${enter}Cek inventory anda dengan cara ketik ${prefix}inventory`} ,{quoted:m})
}, 2000); //2 minute
setTimeout( () => {
reply('Sedang berpetualang, silahkan tunggu...')
}, 0) //1sec
} else {
let seae = await getBuffer(`https://telegra.ph/file/16857796fab2ccb6cffc2.jpg`)
tesk = `*PILIH WILAYAH YANG INGIN KAMU JELAJAHI*


⚪ Corbiens River
🔵 Cochher Sea
⚫ Moobiens Grassland
🟣 Gerbil Woods
🟢 Chiltawa Woods
🟠 Limingstall Mountains
🔴 Chade Mountain

Example :
- ${prefix}jelajah corbiens river
`
alice.sendMessage(m.chat, { image: seae, caption: tesk}, {quoted: m}) 
}
}
break
case 'jualikan':{
if (!m.isGroup) return onlyGroup()
if (!isPetualang) return reply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
if(!text) return reply(`Kirim perintah ${prefix + command} jumlah yg ingin di jual\n\nContoh ${prefix + command} 10`)
bayar = args.join(' ')
const hargaIkan = 10000
const hasil1 = bayar * hargaIkan
if ( getMancingIkan(m.sender) <= 1 ) return reply(`Maaf ${pushname} ikan kamu belum cukup, minimal 2 ikan`)
if ( getMancingIkan(m.sender) >= 1 ) {
jualIkan(m.sender, bayar)
addKoinUser(m.sender, hasil1)
await reply(`*「 PENJUALAN BERHASIL 」*${enter}${enter}*Jumlah ikan dijual:* ${bayar}${enter}*Uang didapat:* ${hasil1}${enter}${enter}*Sisa ikan:* ${getMancingIkan(m.sender)}${enter}*Sisa uang:* ${checkATMuser(m.sender)}`)
}
}
break
case 'jualcoal':{
if (!m.isGroup) return onlyGroup()
if (!isPetualang) return reply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
if(!text) return reply(`Kirim perintah ${prefix + command} jumlah yg ingin di jual\n\nContoh ${prefix + command} 10`)
bayar = args.join(' ')
const hargaCoal = 15000
const hasil2 = bayar * hargaCoal
if ( getMiningcoal(m.sender) <= 1 ) return reply(`Maaf ${pushname} kamu tidak punya coal`)
if ( getMiningcoal(m.sender) >= 1 ) {
jualcoal(m.sender, bayar)
addKoinUser(m.sender, hasil2)
await reply(`*「 PENJUALAN BERHASIL 」*${enter}${enter}*Jumlah Coal dijual:* ${bayar}${enter}*Uang didapat:* ${hasil2}${enter}${enter}*Sisa coal:* ${getMiningcoal(m.sender)}${enter}*Sisa uang:* ${checkATMuser(m.sender)}`)
}
}
break
case 'lebur':{
if (!m.isGroup) return onlyGroup()
if (!isPetualang) return reply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
if(!text) return reply(`Kirim perintah ${prefix + command} jumlah yg ingin di jual\n\nContoh ${prefix + command} 10`)
bayar = args.join(' ')
const hargaOre = 2
const hasil3 = bayar * hargaOre
if ( getMiningore(m.sender) <= 1 ) return reply(`Maaf ${pushname} ore kamu belum cukup, minimal 2 ore`)
if ( getMiningore(m.sender) >= 1 ) {
jualore(m.sender, bayar)
addIngot(m.sender, hasil3)
await reply(`*「 LEBUR BERHASIL 」*\n\n*Jumlah Ore dilebur :* ${bayar}\n*Ingot didapat:* ${hasil3}\n\n*Sisa Ore:* ${getMiningore(m.sender)}`)
}
}
break
case 'jualstone':{
if (!m.isGroup) return onlyGroup()
if (!isPetualang) return reply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
if(!text) return reply(`Kirim perintah ${prefix + command} jumlah yg ingin di jual\n\nContoh ${prefix + command} 10`)
bayar = args.join(' ')
const hargaStone = 900
const hasil4 = bayar * hargaStone
if ( getMiningstone(m.sender) <= 1 ) return reply(`Maaf ${pushname} stone kamu belum cukup, minimal 2 stone`)
if ( getMiningstone(m.sender) >= 1 ) {
jualstone(m.sender, bayar)
addKoinUser(m.sender, hasil4)
await reply(`*「 PENJUALAN BERHASIL 」*${enter}${enter}*Jumlah Batu dijual:* ${bayar}${enter}*Uang didapat:* ${hasil4}${enter}${enter}*Sisa Batu:* ${getMiningstone(m.sender)}${enter}*Sisa uang:* ${checkATMuser(m.sender)}`)
}
}
break
case 'jualingot':{
if (!m.isGroup) return onlyGroup()
if (!isPetualang) return reply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
if(!text) return reply(`Kirim perintah ${prefix + command} jumlah yg ingin di jual\n\nContoh ${prefix + command} 10`)
bayar = args.join(' ')
const hargaIngot = 35000
const hasil5 = bayar * hargaIngot
if ( getMiningingot(m.sender) <= 1 ) return reply(`Maaf ${pushname} ingot kamu belum cukup, minimal 2 ingot`)
if ( getMiningingot(m.sender) >= 1 ) {
jualingot(m.sender, bayar)
addKoinUser(m.sender, hasil5)
await reply(`*「 PENJUALAN BERHASIL 」*${enter}${enter}*Jumlah Ingot dijual:* ${bayar}${enter}*Uang didapat:* ${hasil5}${enter}${enter}*Sisa Ingot:* ${getMiningingot(m.sender)}${enter}*Sisa uang:* ${checkATMuser(m.sender)}`)
}
}
break
case 'jualkayu':{
if (!m.isGroup) return onlyGroup()
if (!isPetualang) return reply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
if(!text) return reply(`Kirim perintah ${prefix + command} jumlah yg ingin di jual\n\nContoh ${prefix + command} 10`)
bayar = args.join(' ')
const hargaKayu = 18000
const hasil6 = bayar * hargaKayu
if ( getNebangKayu(m.sender) <= 1 ) return reply(`Maaf ${pushname} kayu kamu belum cukup, minimal 2 kayu`)
if ( getNebangKayu(m.sender) >= 1 ) {
jualkayu(m.sender, bayar)
addKoinUser(m.sender, hasil6)
await reply(`*「 PENJUALAN BERHASIL 」*${enter}${enter}*Jumlah Kayu dijual:* ${bayar}${enter}*Uang didapat:* ${hasil6}${enter}${enter}*Sisa Kayu :* ${await getNebangKayu(m.sender)}${enter}*Sisa uang:* ${await checkATMuser(m.sender)}`)
}
}
break
case 'nebang':{
setTimeout( () => {
const oreo = Math.ceil(Math.random() * 20)
addKayu(m.sender, oreo)
reply(`*Congratulation 🎊*${enter}${enter}kamu mendapatkan *${oreo}*kayu selama 2 menit`)
}, 2000); //2 minute
setTimeout( () => {
reply('Sedang menebang, silahkan tunggu...')
}, 0) //1sec
}
break
case 'goplanet':{
setTimeout( () => {
const bertualang = Math.ceil(Math.random() * 100)
const goplanet =['merkurius','venus','mars','jupiter','saturnus','neptunus','uranus']
const planetari = goplanet[Math.floor(Math.random() * goplanet.length)]
addPlanet(m.sender, bertualang)
reply(`*Congratulation 🎊*${enter}${enter}kamu mendapatkan *${bertualang} bahan kimia dari ${planetari}* selama 2 tahun`)
}, 2000); //2 minute
setTimeout( () => {
reply('Sedang meroket 😱, silahkan tunggu... 2 tahun')
}, 0) //1sec
}
break
case 'jualbahankimia':{
if (!m.isGroup) return onlyGroup()
if (!isPetualang) return reply('Kamu belum terdaftar dalam database rpg silahkan ketik .joinrpg')
if(!text) return reply(`Kirim perintah ${prefix + command} jumlah yg ingin di jual\n\nContoh ${prefix + command} 10`)
buayar= args.join(" ")
const hargakimia = 1000
const dapetin = buayar * hargakimia
if ( getBertualangPlanet(m.sender) <= 1 ) return reply(`maaf ${pushname} kamu tidak punya bahankimia`)
if ( getBertualangPlanet(m.sender) >= 1 ) {
jualbahankimia(m.sender, buayar)
addKoinUser(m.sender, dapetin)
await reply(`*「 PENJUALAN BERHASIL 」*${enter}${enter}*Jumlah bahankimia dijual:* ${buayar}${enter}*Uang didapat:* ${dapetin}${enter}${enter}*Sisa bahankimia:* ${getBertualangPlanet(m.sender)}${enter}*Sisa uang:* ${checkATMuser(m.sender)}${enter}${enter}`)
}
}
break




















//FITUR AI
case 'nobara': {
if (!text) return reply(`Example : ${command} hallo aku cinta kamu`)
let data = await fetchJson(`https://kiicodeofficial.my.id/api/others/cai?q=${text}&text=nobara&apikey=Ceri`);
if (data.data && data.data.output) {
const caimsg = data.data.output;
alice.sendMessage(from, {
document: trash,
fileName: 'Powered By Darwin',
mimetype: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
fileLength: 999999999,
pageCount: '2024',
caption: `${caimsg}`,
contextInfo: {
externalAdReply: {  
title: `NOBARA AUTO AI`, 
body: 'alice project [beta]',
thumbnailUrl: "https://telegra.ph/file/b53b3b907d13a1924fbf2.jpg", 
sourceUrl: `${global.saluran}`,
mediaType: 1,
renderLargerThumbnail: true
}}})
}
}
break
case 'elaina': {
if (!text) return reply(`Example : ${command} hallo aku cinta kamu`)
  let ouh = await fetch(`https://api.yanzbotz.my.id/api/ai/characterai?text=${text}&name=Elaina`)
  let gyh = await ouh.json() 
alice.sendMessage(from, {
document: trash,
fileName: 'Powered By Darwin',
mimetype: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
fileLength: 999999999,
pageCount: '2024',
caption: `${gyh.result}`,
contextInfo: {
externalAdReply: {  
title: `ELAINA AUTO AI`, 
body: 'alice project [beta]',
thumbnailUrl: "https://telegra.ph/file/d343889c1b2ab1de43031.jpg", 
sourceUrl: `${global.saluran}`,
mediaType: 1,
renderLargerThumbnail: true
}}})
}
break
case 'hutao': {
if (!text) return reply(`Example : ${command} siapakah elon musk`)
let data = await fetchJson(`https://kiicodeofficial.my.id/api/others/cai?q=${text}&text=hutao&apikey=Ceri`);
if (data.data && data.data.output) {
const caimsg = data.data.output;
alice.sendMessage(from, {
document: trash,
fileName: 'Keteck Wangi Hutao',
mimetype: "docx",
fileLength: 999999999,
caption: `${caimsg}`,
contextInfo: {
externalAdReply: {  
title: `HUTAO AUTO AI`, 
body: 'alice project [beta]',
thumbnailUrl: "https://telegra.ph/file/9c457ae5e319593da5ddc.jpg", 
sourceUrl: `${global.saluran}`,
mediaType: 1,
renderLargerThumbnail: true
}}})
}
}
break
          case 'miku':{
  if (!text) return reply('Apa yang bisa saya bantu?')
  let ouh = await fetch(`https://api.yanzbotz.my.id/api/ai/characterai?text=${text}&name=miku`)
 //let ouh = await fetch(`https://api.betabotz.org/api/search/c-ai?prompt=hai%20ai%20siapa%20namamu?&char=HuTao&apikey=8cZTmd8U`)
  let gyh = ouh.json() 
  await alice.sendMessage(m.chat, {
  text: `${gyh.result}`,
      contextInfo: {
      externalAdReply: {
        title: 'Hatsume Miku - C.ai',
        body: 'meg',
        thumbnailUrl: 'https://telegra.ph/file/839a326d43474bf0242ec.jpg',
        sourceUrl: global.group,
        mediaType: 1,
        renderLargerThumbnail: true
      }}
  })}
break
 case 'elaina':{
  if (!text) return reply('Apa yang bisa saya bantu?')
  await alice.sendMessage(m.chat, {
  text: `${gyh.result}`,
      contextInfo: {
      externalAdReply: {
        title: 'Elaina - C.ai',
        body: 'meg',
        thumbnailUrl: 'https://telegra.ph/file/d343889c1b2ab1de43031.jpg',
        sourceUrl: global.group,
        mediaType: 1,
        renderLargerThumbnail: true
      }}
  })}
break  
case 'nezuko':{
  if (!text) return reply('Apa yang bisa saya bantu?')
  let ouh = await fetch(`https://api.yanzbotz.my.id/api/ai/characterai?text=${text}&name=nezuko`)
  let gyh = await ouh.json() 
  await alice.sendMessage(m.chat, {
  text: `${gyh.result}`,
      contextInfo: {
      externalAdReply: {
        title: 'Nezuko - C.ai',
        body: '',
        thumbnailUrl: 'https://telegra.ph/file/fd03a32e284f69a67114c.jpg',
        sourceUrl: global.group,
        mediaType: 1,
        renderLargerThumbnail: true
      }}
  })}
break







































// FITUR ASUPAN
case 'tiktokgirl':
reply('Wet ngabs')
var asupan = JSON.parse(fs.readFileSync('./AliceProject/tiktokvids/tiktokgirl.json'))
var ii = pickRandom(asupan)
alice.sendMessage(m.chat, { caption: 'don banh', video: { url: ii.url }}, { quoted: m })
break
case 'tiktokghea':
reply('Wet ngabs')
var gheayubi = JSON.parse(fs.readFileSync('./AliceProject/tiktokvids/gheayubi.json'))
var iii = pickRandom(gheayubi)
alice.sendMessage(m.chat, { caption: 'don banh', video: { url: iii.url }}, { quoted: m })
break
case 'tiktokbocil':
reply('Wet ngabs')
var bocil = JSON.parse(fs.readFileSync('./AliceProject/tiktokvids/bocil.json'))
var iiii = pickRandom(bocil)
alice.sendMessage(m.chat, { caption: 'don banh', video: { url: iiii.url }}, { quoted: m })
break
case 'tiktoknukhty':
reply('Wet ngabs')
var ukhty = JSON.parse(fs.readFileSync('./AliceProject/tiktokvids/ukhty.json'))
var iiiii = pickRandom(ukhty)
alice.sendMessage(m.chat, { caption: 'don banh', video: { url: iiiii.url }}, { quoted: m })
break
case 'tiktoksantuy':
reply('Wet ngabs')
var santuy = JSON.parse(fs.readFileSync('./AliceProject/tiktokvids/santuy.json'))
var iiiiii = pickRandom(santuy)
alice.sendMessage(m.chat, { caption: 'don banh', video: { url: iiiiii.url }}, { quoted: m })
break
case 'tiktokkayes':
reply('Wet ngabs')
var kayes = JSON.parse(fs.readFileSync('./AliceProject/tiktokvids/kayes.json'))
var iiiiiii = pickRandom(kayes)
alice.sendMessage(m.chat, { caption: 'don banh', video: { url: iiiiiii.url }}, { quoted: m })
break
case 'tiktokpanrika':
reply('Wet ngabs')
var rikagusriani = JSON.parse(fs.readFileSync('./AliceProject/tiktokvids/panrika.json'))
var iiiiiiii = pickRandom(rikagusriani)
alice.sendMessage(m.chat, { caption: 'don banh', video: { url: iiiiiiii.url }}, { quoted: m })
break
case 'tiktoknotnot':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/tiktokvids/notnot.json'))
var iiiiiiiii = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', video: { url: iiiiiiiii.url }}, { quoted: m })
break
case 'chinese':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/tiktokpics/china.json'))
var iiiiiiiiii = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: iiiiiiiiii.url } }, { quoted: m })
break
case 'hijab':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/tiktokpics/hijab.json'))
var iiiiiiiiiii = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: iiiiiiiiiii.url } }, { quoted: m })
break

case 'indo':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/tiktokpics/indonesia.json'))
var iiiiiiiiiiii = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: iiiiiiiiiiii.url } }, { quoted: m })
break
case 'japanese':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/tiktokpics/japan.json'))
var iiiiiiiiiiiii = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: iiiiiiiiiiiii.url } }, { quoted: m })
break
case 'korean':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/tiktokpics/korea.json'))
var iiiiiiiiiiiiii = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: iiiiiiiiiiiiii.url } }, { quoted: m })
break
case 'malay':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/tiktokpics/malaysia.json'))
var iiiiiiiiiiiiiii = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: iiiiiiiiiiiiiii.url } }, { quoted: m })
break
case 'randomgirl':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/tiktokpics/random.json'))
var iiiiiiiiiiiiiiii = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: iiiiiiiiiiiiiiii.url } }, { quoted: m })
break
case 'randomboy':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/tiktokpics/random2.json'))
var iiiiiiiiiiiiiiiii = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: iiiiiiiiiiiiiiiii.url } }, { quoted: m })
break
case 'thai':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/tiktokpics/thailand.json'))
var iiiiiiiiiiiiiiiiii = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: iiiiiiiiiiiiiiiiii.url } }, { quoted: m })
break
case 'vietnamese':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/tiktokpics/vietnam.json'))
var iiiiiiiiiiiiiiiiiii = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: iiiiiiiiiiiiiiiiiii.url } }, { quoted: m })
break
case 'aesthetic':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/randompics/aesthetic.json'))
var iiiiiiiiiiiiiiiiiiii = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: iiiiiiiiiiiiiiiiiiii.url } }, { quoted: m })
break
case 'antiwork':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/randompics/antiwork.json'))
var iiiiiiiiiiiiiiiiiiiii = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: iiiiiiiiiiiiiiiiiiiii.url } }, { quoted: m })
break
case 'blackpink2':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/randompics/blackpink.json'))
var iiiiiiiiiiiiiiiiiiiiii = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: iiiiiiiiiiiiiiiiiiiiii.url } }, { quoted: m })
break
case 'bike':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/randompics/bike.json'))
var iiiiiiiiiiiiiiiiiiiiiii = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: iiiiiiiiiiiiiiiiiiiiiii.url } }, { quoted: m })
break
case 'boneka':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/randompics/boneka.json'))
var iiiiiiiiiiiiiiiiiiiiiiii = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: iiiiiiiiiiiiiiiiiiiiiiii.url } }, { quoted: m })
break
case 'cosplay':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/randompics/cosplay.json'))
var iiiiiiiiiiiiiiiiiiiiiiiii = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: iiiiiiiiiiiiiiiiiiiiiiiii.url } }, { quoted: m })
break
case 'cat':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/randompics/cat.json'))
var iiiiiiiiiiiiiiiiiiiiiiiiii = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: iiiiiiiiiiiiiiiiiiiiiiiiii.url } }, { quoted: m })
break
case 'doggo':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/randompics/doggo.json'))
var iiiiiiiiiiiiiiiiiiiiiiiiiil = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: iiiiiiiiiiiiiiiiiiiiiiiiiil.url } }, { quoted: m })
break
case 'justina':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/randompics/justina.json'))
var iiiiiiiiiiiiiiiiiiiiiiiiiill = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: iiiiiiiiiiiiiiiiiiiiiiiiiill.url } }, { quoted: m })
break

case 'kayes':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/randompics/kayes.json'))
var iiiiiiiiiiiiiiiiiiiiiiiiiilll = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: iiiiiiiiiiiiiiiiiiiiiiiiiilll.url } }, { quoted: m })
break
case 'kpop':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/randompics/kpop.json'))
var ll = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: ll.url } }, { quoted: m })
break
case 'notnot':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/randompics/notnot.json'))
var lll = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: lll.url } }, { quoted: m })
break
case 'car':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/randompics/car.json'))
var llll = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: llll.url } }, { quoted: m })
break
case 'couplepic':case 'couplepicture':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/randompics/ppcouple.json'))
var lllll = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: lllll.url } }, { quoted: m })
break
case 'profilepic':  case 'profilepicture':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/randompics/profile.json'))
var llllll = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: llllll.url } }, { quoted: m })
break
case 'pubg':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/randompics/pubg.json'))
var lllllll = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: lllllll.url } }, { quoted: m })
break
case 'rose':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/randompics/rose.json'))
var llllllll = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: llllllll.url } }, { quoted: m })
break
case 'ryujin':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/randompics/ryujin.json'))
var lllllllll = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: lllllllll.url } }, { quoted: m })
break
case 'ulzzangboy':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/randompics/ulzzangboy.json'))
var llllllllll = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: llllllllll.url } }, { quoted: m })
break
case 'ulzzanggirl':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/randompics/ulzzanggirl.json'))
var lllllllllll = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: lllllllllll.url } }, { quoted: m })
break
case 'wallml': case 'wallpaperml':case 'mobilelegend':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/randompics/wallml.json'))
var llllllllllll = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: llllllllllll.url } }, { quoted: m })
break
case 'wallpaperphone': case 'wallphone':
reply('Wet ngabs')
var notnot = JSON.parse(fs.readFileSync('./AliceProject/randompics/wallhp.json'))
var lllllllllllll = pickRandom(notnot)
alice.sendMessage(m.chat, { caption: 'don banh', image: { url: lllllllllllll.url } }, { quoted: m })
break
case 'hentai-neko' :
case 'hneko' :
   let waifudd2 = await axios.get(`https://waifu.pics/api/nsfw/neko`)
alice.sendMessage(m.chat, { caption: "don banj, follow saluran Alice", image: { url:waifudd2.data.url } }, { quoted: m })
break
case 'hentai-waifu' :
case 'nwaifu' :

reply('matte kudasai (눈‸눈)')
  let waifudd3 = await axios.get(`https://waifu.pics/api/nsfw/waifu`)         
alice.sendMessage(m.chat, { caption: "don banj, follow saluran Alice", image: { url:waifudd3.data.url } }, { quoted: m })
break
case 'gasm':
reply('matte kudasai (눈‸눈)')						
 let waifudd4 = await axios.get(`https://nekos.life/api/v2/img/${command}`)
alice.sendMessage(m.chat, { caption: "don banj, follow saluran Alice", image: { url:waifudd4.data.url } }, { quoted: m })
break  
case 'milf':
reply('matte kudasai (눈‸눈)')
var ahegaonsfw = JSON.parse(fs.readFileSync('./AliceProject/nsfw/milf.json'))
var aliceyresult = pickRandom(ahegaonsfw)
alice.sendMessage(m.chat, { caption: "don banj, follow saluran Alice", image: { url: aliceyresult.url } }, { quoted: m })
break 
case 'animespank':						
 let waifudd5 = await await axios.get(`https://nekos.life/api/v2/img/spank`)     
             alice.sendMessage(m.chat, { caption:  `Here you go!`, image: {url:waifudd5.data.url} },{ quoted:m }).catch(err => {
                    return('Error!')
                })
break
case 'ahegao':
reply('matte kudasai (눈‸눈)')
var ahegaonsfw = JSON.parse(fs.readFileSync('./AliceProject/nsfw/ahegao.json'))
var aliceyresult = pickRandom(ahegaonsfw)
alice.sendMessage(m.chat, { caption: "don banj, follow saluran Alice", image: { url: aliceyresult.url } }, { quoted: m })
break
case 'ass':
reply('matte kudasai (눈‸눈)')
var ahegaonsfw = JSON.parse(fs.readFileSync('./AliceProject/nsfw/ass.json'))
var aliceyresult = pickRandom(ahegaonsfw)
alice.sendMessage(m.chat, { caption: "don banj, follow saluran Alice", image: { url: aliceyresult.url } }, { quoted: m })
break
case 'bdsm':
reply('matte kudasai (눈‸눈)')
var ahegaonsfw = JSON.parse(fs.readFileSync('./AliceProject/nsfw/bdsm.json'))
var aliceyresult = pickRandom(ahegaonsfw)
alice.sendMessage(m.chat, { caption: "don banj, follow saluran Alice", image: { url: aliceyresult.url } }, { quoted: m })
break
case 'blowjob':
reply('matte kudasai (눈‸눈)')
var ahegaonsfw = JSON.parse(fs.readFileSync('./AliceProject/nsfw/blowjob.json'))
var aliceyresult = pickRandom(ahegaonsfw)
alice.sendMessage(m.chat, { caption: "don banj, follow saluran Alice", image: { url: aliceyresult.url } }, { quoted: m })
break
case 'cuckold':
reply('matte kudasai (눈‸눈)')
var ahegaonsfw = JSON.parse(fs.readFileSync('./AliceProject/nsfw/cuckold.json'))
var aliceyresult = pickRandom(ahegaonsfw)
alice.sendMessage(m.chat, { caption: "don banj, follow saluran Alice", image: { url: aliceyresult.url } }, { quoted: m })
break
case 'cum':
reply('matte kudasai (눈‸눈)')
var ahegaonsfw = JSON.parse(fs.readFileSync('./AliceProject/nsfw/cum.json'))
var aliceyresult = pickRandom(ahegaonsfw)
alice.sendMessage(m.chat, { caption: "don banj, follow saluran Alice", image: { url: aliceyresult.url } }, { quoted: m })
break
case 'eba':
reply('matte kudasai (눈‸눈)')
var ahegaonsfw = JSON.parse(fs.readFileSync('./AliceProject/nsfw/eba.json'))
var aliceyresult = pickRandom(ahegaonsfw)
alice.sendMessage(m.chat, { caption: "don banj, follow saluran Alice", image: { url: aliceyresult.url } }, { quoted: m })
break
case 'ero':
reply('matte kudasai (눈‸눈)')
var ahegaonsfw = JSON.parse(fs.readFileSync('./AliceProject/nsfw/ero.json'))
var aliceyresult = pickRandom(ahegaonsfw)
alice.sendMessage(m.chat, { caption: "don banj, follow saluran Alice", image: { url: aliceyresult.url } }, { quoted: m })
break
case 'femdom':
reply('matte kudasai (눈‸눈)')
var ahegaonsfw = JSON.parse(fs.readFileSync('./AliceProject/nsfw/femdom.json'))
var aliceyresult = pickRandom(ahegaonsfw)
alice.sendMessage(m.chat, { caption: "don banj, follow saluran Alice", image: { url: aliceyresult.url } }, { quoted: m })
break
case 'foot':
reply('matte kudasai (눈‸눈)')
var ahegaonsfw = JSON.parse(fs.readFileSync('./AliceProject/nsfw/foot.json'))
var aliceyresult = pickRandom(ahegaonsfw)
alice.sendMessage(m.chat, { caption: "don banj, follow saluran Alice", image: { url: aliceyresult.url } }, { quoted: m })
break
case 'gangbang':
reply('matte kudasai (눈‸눈)')
var ahegaonsfw = JSON.parse(fs.readFileSync('./AliceProject/nsfw/gangbang.json'))
var aliceyresult = pickRandom(ahegaonsfw)
alice.sendMessage(m.chat, { caption: "don banj, follow saluran Alice", image: { url: aliceyresult.url } }, { quoted: m })
break
case 'glasses':
reply('matte kudasai (눈‸눈)')
var ahegaonsfw = JSON.parse(fs.readFileSync('./AliceProject/nsfw/glasses.json'))
var aliceyresult = pickRandom(ahegaonsfw)
alice.sendMessage(m.chat, { caption: "don banj, follow saluran Alice", image: { url: aliceyresult.url } }, { quoted: m })
break
case 'hentai':
reply('matte kudasai (눈‸눈)')
var ahegaonsfw = JSON.parse(fs.readFileSync('./AliceProject/nsfw/hentai.json'))
var aliceyresult = pickRandom(ahegaonsfw)
alice.sendMessage(m.chat, { caption: "don banj, follow saluran Alice", image: { url: aliceyresult.url } }, { quoted: m })
break
case 'jahy':
reply('matte kudasai (눈‸눈)')
var ahegaonsfw = JSON.parse(fs.readFileSync('./AliceProject/nsfw/jahy.json'))
var aliceyresult = pickRandom(ahegaonsfw)
alice.sendMessage(m.chat, { caption: "don banj, follow saluran Alice", image: { url: aliceyresult.url } }, { quoted: m })
break
case 'manga':
reply('matte kudasai (눈‸눈)')
var ahegaonsfw = JSON.parse(fs.readFileSync('./AliceProject/nsfw/manga.json'))
var aliceyresult = pickRandom(ahegaonsfw)
alice.sendMessage(m.chat, { caption: "don banj, follow saluran Alice", image: { url: aliceyresult.url } }, { quoted: m })
break
case 'masturbation':
reply('matte kudasai (눈‸눈)')
var ahegaonsfw = JSON.parse(fs.readFileSync('./AliceProject/nsfw/masturbation.json'))
var aliceyresult = pickRandom(ahegaonsfw)
alice.sendMessage(m.chat, { caption: "don banj, follow saluran Alice", image: { url: aliceyresult.url } }, { quoted: m })
break
case 'neko-hentai':
reply('matte kudasai (눈‸눈)')
var ahegaonsfw = JSON.parse(fs.readFileSync('./AliceProject/nsfw/neko.json'))
var aliceyresult = pickRandom(ahegaonsfw)
alice.sendMessage(m.chat, { caption: "don banj, follow saluran Alice", image: { url: aliceyresult.url } }, { quoted: m })
break
case 'neko-hentai2':
reply('matte kudasai (눈‸눈)')
var ahegaonsfw = JSON.parse(fs.readFileSync('./AliceProject/nsfw/neko2.json'))
var aliceyresult = pickRandom(ahegaonsfw)
alice.sendMessage(m.chat, { caption: "don banj, follow saluran Alice", image: { url: aliceyresult.url } }, { quoted: m })
break
case 'nsfwloli':
reply('matte kudasai (눈‸눈)')
var ahegaonsfw = JSON.parse(fs.readFileSync('./AliceProject/nsfw/nsfwloli.json'))
var aliceyresult = pickRandom(ahegaonsfw)
alice.sendMessage(m.chat, { caption: "don banj, follow saluran Alice", image: { url: aliceyresult.url } }, { quoted: m })
break
case 'orgy':
reply('matte kudasai (눈‸눈)')
var ahegaonsfw = JSON.parse(fs.readFileSync('./AliceProject/nsfw/orgy.json'))
var aliceyresult = pickRandom(ahegaonsfw)
alice.sendMessage(m.chat, { caption: "don banj, follow saluran Alice", image: { url: aliceyresult.url } }, { quoted: m })
break
case 'panties':
reply('matte kudasai (눈‸눈)')
var ahegaonsfw = JSON.parse(fs.readFileSync('./AliceProject/nsfw/panties.json'))
var aliceyresult = pickRandom(ahegaonsfw)
alice.sendMessage(m.chat, { caption: "don banj, follow saluran Alice", image: { url: aliceyresult.url } }, { quoted: m })
break
case 'pussy':
reply('matte kudasai (눈‸눈)')
var ahegaonsfw = JSON.parse(fs.readFileSync('./AliceProject/nsfw/pussy.json'))
var aliceyresult = pickRandom(ahegaonsfw)
alice.sendMessage(m.chat, { caption: "don banj, follow saluran Alice", image: { url: aliceyresult.url } }, { quoted: m })
break
case 'tentacles':
reply('matte kudasai (눈‸눈)')
var ahegaonsfw = JSON.parse(fs.readFileSync('./AliceProject/nsfw/tentacles.json'))
var aliceyresult = pickRandom(ahegaonsfw)
alice.sendMessage(m.chat, { caption: "don banj, follow saluran Alice", image: { url: aliceyresult.url } }, { quoted: m })
break
case 'thights':
reply('matte kudasai (눈‸눈)')
var ahegaonsfw = JSON.parse(fs.readFileSync('./AliceProject/nsfw/thights.json'))
var aliceyresult = pickRandom(ahegaonsfw)
alice.sendMessage(m.chat, { caption: "don banj, follow saluran Alice", image: { url: aliceyresult.url } }, { quoted: m })
break
case 'yuri':
reply('matte kudasai (눈‸눈)')
var ahegaonsfw = JSON.parse(fs.readFileSync('./AliceProject/nsfw/yuri.json'))
var aliceyresult = pickRandom(ahegaonsfw)
alice.sendMessage(m.chat, { caption: "don banj, follow saluran Alice", image: { url: aliceyresult.url } }, { quoted: m })
break
case 'zettai':
reply('matte kudasai (눈‸눈)')
var ahegaonsfw = JSON.parse(fs.readFileSync('./AliceProject/nsfw/zettai.json'))
var aliceyresult = pickRandom(ahegaonsfw)
alice.sendMessage(m.chat, { caption: "don banj, follow saluran Alice", image: { url: aliceyresult.url } }, { quoted: m })
break
case 'gifblowjob':
reply('matte kudasai (눈‸눈)')
  let assss =  await axios.get ("https://api.waifu.pics/nsfw/blowjob")
    var bobuff =  fetchBuffer(assss.data.url)
    var bogif =  buffergif(bobuff)
     alice.sendMessage(m.chat,{video:bogif, gifPlayback:true },{quoted:m}).catch(err => {
    })
    break
case 'gifhentai':
reply('matte kudasai (눈‸눈)')
var ahegaonsfw = JSON.parse(fs.readFileSync('./AliceProject/nsfw/gifs.json'))
var aliceyresultx = pickRandom(ahegaonsfw)
     alice.sendMessage(m.chat,{video:aliceyresultx, gifPlayback:true },{quoted:m}).catch(err => {
    })
    break
    case 'gifs': case 'foot': {
reply('matte kudasai (눈‸눈)')
let heyy
    let yeha = heyy[Math.floor(Math.random() * heyy.length)];
    if (/gifs/.test(command)) heyy =  fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/gifs.json')
    if (/foot/.test(command)) heyy =  fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/foot.json')
alice.sendMessage(m.chat, { image: { url: yeha }, caption : "don banj, follow saluran Alice" }, { quoted: m })
}
break

































// FITUR DOWNLOAD
case 'mediafire': {
	if (args.length == 0) return reply(`*Gunakan Dengan*\n  Example : .mediafire https://mediafire.com`)
	if (!isUrl(args[0]) && !args[0].includes('mediafire.com')) return reply(`Link Mungkin Expired!`)
	const { mediafireDl } = require('../lib/mediafire.js')
	const baby1 = await mediafireDl(text)
	if (baby1[0].size.split('MB')[0] >= 1000) return reply('Oops, Alice Tidak Mampu Mendownloadnya :^(')
	const result4 = `*DOWNLOADER MEDIAFIRE*

*Name* : ${baby1[0].nama}
*Size* : ${baby1[0].size}
*Mime* : ${baby1[0].mime}
*Link* : ${baby1[0].link}`
reply(`${result4}`)
alice.sendMessage(m.chat, { document : { url : baby1[0].link}, fileName : baby1[0].nama, mimetype: baby1[0].mime }, { quoted : m })
}
break
case 'spotifydl':{
if (!text) return reply(`Gunakan dengan cara ${prefix+command} *url*\n\n_Contoh_\n\n${prefix+command} https://open.spotify.com/track/6cHCixTkEFATjcu5ig8a7I`)
reply(mess.wait)
let anu = await fetchJson(`https://api.nomisec07.site/api/spotify?url=${text}`)
const aud = anu.data.url
alice.sendMessage(m.chat, {
audio: {
url: aud
},
mimetype: 'audio/mpeg',
contextInfo: {
externalAdReply: {
title: anu.data.title,
body: "",
thumbnailUrl: anu.data.thumbnail,
sourceUrl: audioUrl,
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: true
}
}
}, {
quoted: floc
});
}
break
case 'play':{
if (!text) return reply(`Example : ${prefix + command} Lagu sad`)
let wait = await alice.sendMessage(m.chat, {text: `_Searching.. [ ${text} ] 🔍_`}, {quoted: m, ephemeralExpiration: m.expiration})
let search = await yts(`${text}`)

let data = await search.all.filter((v) => v.type == 'video')
try {
var res12 = data[0]
} catch {
var res12 = data[1]
}
let ply = search.videos[0].url
const ytdl = require('ytdl-core')
let mp3file = `./.npm/${search.all[0].views}.mp3`
  let nana = ytdl(ply, { filter: 'audioonly' })
  .pipe(fs.createWriteStream(mp3file))
  .on('finish', async () => {
await alice.sendMessage(m.chat, {text: `_Mengirim.. [ ${text} ] 🔍_`, edit: wait.key }, {quoted: m, ephemeralExpiration: m.expiration});
alice.sendMessage(m.chat, {audio: fs.readFileSync(mp3file), mimetype: 'audio/mpeg', contextInfo: {externalAdReply: {title: `${search.all[0].title}`, body: `Views : ${search.all[0].views}`, thumbnailUrl: res12?.thumbnail, mediaType: 2, mediaUrl: `${search.videos[0].url}`, sourceUrl: `${search.videos[0].url}`, renderLargerThumbnail: true }}},)
   })
const alicevidoh = require('./lib/ytdl2')
const vid=await alicevidoh.mp4(`${search.videos[0].url}`)
const ytc=`
*Tittle:* ${vid.title}
*Date:* ${vid.date}
*Duration:* ${vid.duration}
*Quality:* ${vid.quality}`
await alice.sendMessage(m.chat,{
    video: {url:vid.videoUrl},
    caption: ytc
},)
}
alice.sendMessage(m.chat, {react: {text: '🎧', key: m.key}})
break //Powered By alice & Darwin // Powered By Winn
case 'ytplay': case 'ytdl': {
if (!text) return reply(`Example : ${prefix + command} Lagu sad`)
let search = await yts(`${text}`)
let caption = `*SUBSCRIBE YT WIN*

⎙ ID : ${search.all[0].videoId}
♽ Title : ${search.all[0].title}
♽ Views : ${search.all[0].views}
♽ Duration : ${search.all[0].timestamp}
♽ Channel : ${search.all[0].author.name}
♽ Upload : ${search.all[0].ago}
♽ URL Video : ${search.videos[0].url}`
let todd2 = await getBuffer(search.all[0].image)
alice.sendMessage(m.chat, {image: todd2, caption: caption}, {quoted:m})
let ply = search.videos[0].url
const ytdl = require('ytdl-core')
let mp3file = `./.npm/${search.all[0].title}.mp3`
let nana = ytdl(ply, { filter: 'audioonly' })
.pipe(fs.createWriteStream(mp3file))
.on('finish', async () => {
alice.sendMessage(m.chat, {audio: fs.readFileSync(mp3file), mimetype:'audio/mpeg', ptt: true }, m)
})
}
break //Powered By alice & Darwin
case'ytdok': {
if (!text) throw `Example: ${prefix + command} https://youtu.be/B6pn7E8ecxg?si=okL1ZNjdititvtvf`
let anu = await bochil.youtubedl(text)
let data = await anu.audio['128kbps'].download()
if (anu.audio['128kbps'].fileSize > 10000) return reply(`Ukuran melebihi batas maksimal 10 MB\n\n*link download*\n${data}`)
alice.sendMessage(m.chat, anu.thumbnail, `⭔ title : ${anu.title}\n⭔ quality : ${anu.audio['128kbps'].quality}\n⭔ file size hd : ${anu.audio['128kbps'].fileSizeH}\n⭔ file size : ${anu.audio['128kbps'].fileSize}\n⭔ source url : ${q}`,)
alice.sendMessage(m.chat, { document: { url: data }, mimetype: 'audio/mp4', fileName: `${anu.title}.mp3`}, )
}
break //Powered By alice & Darwin
case'ytvn': {
if (!text) throw `Example: ${prefix + command} https://youtu.be/B6pn7E8ecxg?si=okL1ZNjdititvtvf`
let anu = await bochil.youtubedl(text)
let data = await anu.audio['128kbps'].download()
if (anu.audio['128kbps'].fileSize > 10000) return reply(`Ukuran melebihi batas maksimal 10 MB\n\n*link download*\n${data}`)
alice.sendMessage(from, anu.thumbnail, `⭔ title : ${anu.title}\n⭔ quality : ${anu.audio['128kbps'].quality}\n⭔ file size hd : ${anu.audio['128kbps'].fileSizeH}\n⭔ file size : ${anu.audio['128kbps'].fileSize}\n⭔ source url : ${q}`,)
alice.sendMessage(m.chat, { audio: { url: data }, mimetype: 'audio/mp4', ptt: true, fileName: `${anu.title}.mp3`}, )
}
break //Powered By alice & Darwin
case 'ytvideo':
if (!text) return reply(`Example : ${prefix + command} Lagu sad`)
let wait = await alice.sendMessage(m.chat, {text: `_Searching.. [ ${text} ] 🔍_`}, {quoted: m, ephemeralExpiration: m.expiration})
let search = await yts(`${text}`)
const alicevidoh = require('./lib/ytdl2')
const vid=await alicevidoh.mp4(`${search.videos[0].url}`)
const ytc=`
*Tittle:* ${vid.title}
*Date:* ${vid.date}
*Duration:* ${vid.duration}
*Quality:* ${vid.quality}`
var ppt = await prepareWAMessageMedia({ video: {url:vid.videoUrl}}, { upload: alice.waUploadToServer })
var ptv = generateWAMessageFromContent(from, proto.Message.fromObject({"ptvMessage": ppt.videoMessage, caption: `done banh`, fileLength: 9999999999 }), { userJid: from})
alice.relayMessage(from, ptv.message, { messageId: ptv.key.id })
await alice.sendMessage(m.chat,{
    text: ytc
})

await alice.sendMessage(m.chat, {text: `_Mengirim.. [ ${text} ] 🔍_`, edit: wait.key }, {quoted: m, ephemeralExpiration: m.expiration});
break
case 'ytmp4': {
if (!isGroup) return onlyGroup()
const alicevidoh = require('./lib/ytdl2')
if (args.length < 1 || !isUrl(text) || !alicevidoh.isYTUrl(text)) reply(`Where is the link??\n\nExample : ${prefix + command} https://youtube.com/watch?v=PtFMh6Tccag%27 128kbps`)
const vid=await alicevidoh.mp4(text)
const ytc=`
*Tittle:* ${vid.title}
*Date:* ${vid.date}
*Duration:* ${vid.duration}
*Quality:* ${vid.quality}`
await alice.sendMessage(m.chat,{
    video: {url:vid.videoUrl},
    caption: ytc
},{quoted:m})
}
break
case 'ytmp3': case 'youtubemp3': {
if (!text) throw `Example : ${prefix + command} https://youtube.com/watch?v=PtFMh6Tccag%27 128kbps`
reply('memuat...')
downloadMp3(text)
}
break
case 'tiktok': case 'ttdl':
if (!q) return reply('Masukkan linknya!')
if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) return reply("Masukkan link tiktok dengan benar!")
onlyWait()
await TikTok(args[0]).then(async res => {
let tav = `Title : ${res.title}
Author : ${res.author}`
await alice.sendMessage(from, {audio: {url: res.audio}, mimetype: 'audio/mpeg', ptt: false})
await alice.sendMessage(from, {video: {url: res.nowm}, caption: tav})
}).catch((err) => reply('Maaf erjadi Kesalahan!'))
break //Powered By alice & Darwin
case'xnxxdl':
{
if (!text) return reply(`*Gunakan Dengan*\n\nexample : ${prefix+command} linknya`)
let anu = await fetchJson(`https://skizo.tech/api/xnxxdl?urlxnxx=${text}&apikey=${global.skizo}`)
const cpt = anu.title
const nick = anu.quality
alice.sendMessage(m.chat, { video: { url: anu.url}, caption: `*TITLE* : ${cpt}\n*QUALITY* : ${nick}`}, )
}
break






































// FITUR BARU






























// FITUR AUDIO
case 'bass': case 'blown': case 'deep': case 'earrape': case 'fast': case 'fat': case 'nightcore': case 'reverse': case 'robot': case 'slow': case 'smooth': case 'squirrel':
try {
let set
if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20'
if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log'
if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3'
if (/earrape/.test(command)) set = '-af volume=12'
if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"'
if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"'
if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25'
if (/reverse/.test(command)) set = '-filter_complex "areverse"'
if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"'
if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'
if (/squirrel/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"'
if (/audio/.test(mime)) {
reply('tunggu sebentar')
let media = await alice.downloadAndSaveMediaMessage(quoted)
let ran = getRandom('.mp3')
exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
fs.unlinkSync(media)
if (err) return reply(err)
let buff = fs.readFileSync(ran)
alice.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : m })
fs.unlinkSync(ran)
})
} else reply(`Reply to the audio you want to change with a caption *${prefix + command}*`)
} catch (e) {
reply(e)
}
break














































// FITUR NSFW
case 'bokep': case 'hentaivid2': {
if (!isCreator && !isOwner && !isPremium) return reply(mess.owner)
reply(mess.wait)
let sbe = await hentaivid()
let cejd = sbe[Math.floor(Math.random(), sbe.length)]
alice.sendMessage(m.chat, { video: { url: cejd.video_1 }, 
caption: `⭔ Title : ${cejd.title}
⭔ Category : ${cejd.category}
⭔ Mimetype : ${cejd.type}
⭔ Views : ${cejd.views_count}
⭔ Shares : ${cejd.share_count}
⭔ Source : ${cejd.link}
⭔ Media Url : ${cejd.video_1}` }, { quoted: m })
}
break
case 'hentaivid': case 'hentaivideo': {
if (!isCreator && !isOwner && !isPremium) return reply(mess.owner)
reply('cotto matte kudasaii')
const { hentai } = require('./lib/scraper2.js')
let anu = await hentai()
let result912 = anu[Math.floor(Math.random(), anu.length)]
alice.sendMessage(m.chat, { video: { url: result912.video_1 }, caption: `Title : ${result912.title}\nCategory : ${result912.category}\nMimetype : ${result912.type}\nViews : ${result912.views_count}\nShares : ${result912.share_count}\nSource : ${result912.link}\nMedia Url : ${result912.video_1}` }, { quoted: m })
}
break
case 'shinobu':
if (!isGroup) return onlyGroup()
alice.sendMessage(from, { image: { url: `https://skizo.tech/api/sfw?search=shinobu&apikey=${global.skyzo}` } })
break
case 'megumin':
if (!isGroup) return onlyGroup()
alice.sendMessage(from, { image: { url: `https://skizo.tech/api/sfw?search=megumin&apikey=${global.skyzo}` } })
break
case 'neko':
if (!isGroup) return onlyGroup()
alice.sendMessage(from, { image: { url: `https://skizo.tech/api/sfw?search=neko&apikey=${global.skyzo}` } })
break
case 'waifu':
if (!isGroup) return onlyGroup()
alice.sendMessage(from, { image: { url: `https://skizo.tech/api/sfw?search=waifu&apikey=${global.skyzo}` } })
break
case 'loli':
if (!isGroup) return onlyGroup()
alice.sendMessage(from, { image: { url: `https://skizo.tech/api/loli?apikey=${global.skyzo}` } })
break //Powered By alice & Darwin
case 'bokep1':
let ntahlah1 = await getBuffer(`https://sfmcompile.club/wp-content/uploads/2022/08/Brigitte-fucked-at-the-gym.mp4`)
alice.sendMessage(from, { video: ntahlah1, mimetype: 'video/mp4', caption : `Sange Gak Sih 😋`})
.catch(console.error)
break
case 'bokep2':
let ntahlah2 = await getBuffer(`https://sfmcompile.club/wp-content/uploads/2023/02/Black-Widow-handcuffed-bondage-play.mp4`)
alice.sendMessage(from, { video: ntahlah2, mimetype: 'video/mp4', caption : `Sange Gak Sih 😋`})
.catch(console.error)
break
case 'bokep3':
let ntahlah3 = await getBuffer(`https://sfmcompile.club/wp-content/uploads/2023/02/Black-Widow-handcuffed-bondage-play.mp4`)
alice.sendMessage(from, { video: ntahlah3, mimetype: 'video/mp4', caption : `Sange Gak Sih 😋`})
.catch(console.error)
break
case 'bokep4':
let ntahlah4 = await getBuffer(`https://sfmcompile.club/wp-content/uploads/2023/02/2B-outdoor-reverse-cowgirl-Sound-update.mp4`)
alice.sendMessage(from, { video: ntahlah4, mimetype: 'video/mp4', caption : `Sange Gak Sih 😋`})
.catch(console.error)
break
case 'bokep5':
let ntahlah5 = await getBuffer(`https://sfmcompile.club/wp-content/uploads/2023/02/Nyotengu-riding-with-help.mp4`)
alice.sendMessage(from, { video: ntahlah5, mimetype: 'video/mp4', caption : `Sange Gak Sih 😋`})
.catch(console.error)
break
case 'bokep6':
let ntahlah6 = await getBuffer(`https://media.discordapp.net/attachments/632434742427516948/1055565623914147910/GrandLiveDinosaur.mp4`)
alice.sendMessage(from, { video: ntahlah6, mimetype: 'video/mp4', caption : `Sange Gak Sih 😋`})
.catch(console.error)
break
case 'bokep7':
let ntahlah7 = await getBuffer(`https://sfmcompile.club/wp-content/uploads/2023/02/Siona-taking-it-deep.mp4`)
alice.sendMessage(from, { video: ntahlah7, mimetype: 'video/mp4', caption : `Sange Gak Sih 😋`})
.catch(console.error)
break
case 'bokep8':
let ntahlah8 = await getBuffer(`https://sfmcompile.club/wp-content/uploads/2023/02/Callie-working-in-Hooters.mp4`)
alice.sendMessage(from, { video: ntahlah8, mimetype: 'video/mp4', caption : `Sange Gak Sih 😋`})
.catch(console.error)
break
case 'bokep9':
let ntahlah9 = await getBuffer(`https://sfmcompile.club/wp-content/uploads/2023/02/Harley-Quinn-in-GCPD-cell.mp4`)
alice.sendMessage(from, { video: ntahlah9, mimetype: 'video/mp4', caption : `Sange Gak Sih 😋`})
.catch(console.error)
break
case 'bokep10':
let ntahlah10 = await getBuffer(`https://www.pornhub.com/view_video.php?viewkey=ph62dacb17ee77a`)
alice.sendMessage(from, { video: ntahlah10, mimetype: 'video/mp4', caption : `Sange Gak Sih 😋`})
.catch(console.error)
break
case 'bokep11':
let ntahlah11 = await getBuffer(`https://sfmcompile.club/wp-content/uploads/2023/02/Harley-Quinn-in-GCPD-cell-With-makeup.mp4`)
alice.sendMessage(from, { video: ntahlah11, mimetype: 'video/mp4', caption : `Sange Gak Sih 😋`})
.catch(console.error)
break
case 'bokep12':
let ntahlah12 = await getBuffer(`https://sfmcompile.club/wp-content/uploads/2023/02/Harley-Quinn-in-GCPD-cell-With-makeup.mp4`)
alice.sendMessage(from, { video: ntahlah12, mimetype: 'video/mp4', caption : `Sange Gak Sih 😋`})
.catch(console.error)
break
case 'bokep13':
let ntahlah13 = await getBuffer(`https://sfmcompile.club/wp-content/uploads/2023/02/Harley-Quinn-in-GCPD-cell.mp4`)
alice.sendMessage(from, { video: ntahlah13, mimetype: 'video/mp4', caption : `Sange Gak Sih 😋`})
.catch(console.error)
break
case 'bokep14':
if (!isGroup) return onlyGroup()
let ntahlah14 = await getBuffer(`https://sfmcompile.club/wp-content/uploads/2023/02/Callie-working-in-Hooters.mp4`)
alice.sendMessage(from, { video: ntahlah14, mimetype: 'video/mp4', caption : `Sange Gak Sih 😋`})
.catch(console.error)
break
case 'bokep15':
if (!isGroup) return onlyGroup()
let ntahlah15 = await getBuffer(`https://sfmcompile.club/wp-content/uploads/2023/02/Siona-taking-it-deep.mp4`)
alice.sendMessage(from, { video: ntahlah15, mimetype: 'video/mp4', caption : `Sange Gak Sih 😋`})
.catch(console.error)
break
case 'bokep16':
if (!isGroup) return onlyGroup()
let ntahlah16 = await getBuffer(`https://sfmcompile.club/wp-content/uploads/2023/02/Ballerina-bot-facial.mp4`)
alice.sendMessage(from, { video: ntahlah16, mimetype: 'video/mp4', caption : `Sange Gak Sih 😋`})
.catch(console.error)
break
case 'bokep17':
if (!isGroup) return onlyGroup()
let ntahlah17 = await getBuffer(`https://sfmcompile.club/wp-content/uploads/2023/02/Nyotengu-riding-with-help.mp4`)
alice.sendMessage(from, { video: ntahlah17, mimetype: 'video/mp4', caption : `Sange Gak Sih 😋`})
.catch(console.error)
break
case 'bokep18':
if (!isGroup) return onlyGroup()
let ntahlah18 = await getBuffer(`https://sfmcompile.club/wp-content/uploads/2023/02/2B-outdoor-reverse-cowgirl-Sound-update.mp4`)
alice.sendMessage(from, { video: ntahlah18, mimetype: 'video/mp4', caption : `Sange Gak Sih 😋`})
.catch(console.error)
break
case'xnxxs':
{
if (!text) return reply(`*Gunakan Dengan*\n\nexample : ${prefix+command} bokep nenek`)
let anu = await fetchJson(`https://skizo.tech/api/xnxxsearch?title=${text}&apikey=${global.skizo}`)
let teks = ``
for (let v of anu) {
teks += `*Title* : ${v.title}\n`
teks += `*Duration* : ${v.duration}\n`
teks += `*Link* : ${v.link}\n\n───────────────\n\n`
}
reply(teks) 
}
break

case "boton":{
if (!isCreator&&!isPremium) return reply(mess.OnlyPrem)
let ntahlahh9 = `./assets/audio/IMLEK.mp3`
let getGroups = await alice.groupFetchAllParticipating()
let groupss = Object.entries(getGroups).slice(0).map((entry) => entry[1])
let data = groupss.map((v) => v.id)

let teks22 = `*[!] ANNOUNCEMENT*📢\n\n_BOT telah online, sekarang anda bisa menjadi bot clone dengan cara, *ketik .jadibot* dan *ketik .menu* untuk melihat daftar list yang disediakan oleh BOT_`
const buf = await getBuffer(`https://img.moehu.org/pic.php?id=mrfz`)
for (let x of data) {
await alice.sendMessage(x, {audio: fs.readFileSync(ntahlahh9), mimetype:'audio/mpeg', ptt: true }, m)
await alice.sendMessage(x, { contextInfo: { forwardingScore: 10, isForwarded: false }, image: buf, caption: teks22 })
await delay(100)
}
reply(`Success send broadcast message to ${data.length} groups chats`)
}
break
case 'gcbot': {
if (!isGroup) return onlyGroup()
var groupInvite = generateWAMessageFromContent(from, proto.Message.fromObject({
"groupInviteMessage": {
"groupJid": "120363156560553267@g.us",
"inviteCode": "sfeVFOlWvlo5Hd9x",
"inviteExpiration": "166659839399999",
	"groupName": "PROJECT ALICEA",
	"jpegThumbnail": "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",
	"caption": "no cap, no pretending, no need a mentions"
}
}), { userJid: m.chat, quoted: m })
alice.relayMessage(from, groupInvite.message, { messageId: groupInvite.key.id })
}
break































// FITUR PHOTOOXY
case 'shadow':
case 'write':
case 'romantic':
case 'burnpaper':
case 'smoke':
case 'narutobanner':
case 'love':
case 'undergrass':
case 'doublelove':
case 'coffecup':
case 'underwaterocean':
case 'smokyneon':
case 'starstext':
case 'rainboweffect':
case 'balloontext':
case 'metalliceffect':
case 'embroiderytext':
case 'flamingtext':
case 'stonetext':
case 'writeart':
case 'summertext':
case 'wolfmetaltext':
case 'nature3dtext':
case 'rosestext':
case 'naturetypography':
case 'quotesunder':
case 'shinetext':
{
reply(mess.wait)
//  if (!isPrem) return replyprem(mess.premium);
if (!q) return reply(`Example : ${prefix + command} Kayla`);
let link;
if (/stonetext/.test(command))
link =
  'https://photooxy.com/online-3d-white-stone-text-effect-utility-411.html';
if (/writeart/.test(command))
link =
  'https://photooxy.com/logo-and-text-effects/write-art-quote-on-wood-heart-370.html';
if (/summertext/.test(command))
link =
  'https://photooxy.com/logo-and-text-effects/3d-summer-text-effect-367.html';
if (/wolfmetaltext/.test(command))
link =
  'https://photooxy.com/logo-and-text-effects/create-a-wolf-metal-text-effect-365.html';
if (/nature3dtext/.test(command))
link =
  'https://photooxy.com/logo-and-text-effects/make-nature-3d-text-effects-364.html';
if (/rosestext/.test(command))
link =
  'https://photooxy.com/logo-and-text-effects/yellow-roses-text-360.html';
if (/naturetypography/.test(command))
link =
  'https://photooxy.com/logo-and-text-effects/create-vector-nature-typography-355.html';
if (/quotesunder/.test(command))
link =
  'https://photooxy.com/logo-and-text-effects/quotes-under-fall-leaves-347.html';
if (/shinetext/.test(command))
link =
  'https://photooxy.com/logo-and-text-effects/rainbow-shine-text-223.html';
if (/shadow/.test(command))
link =
  'https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html';
if (/write/.test(command))
link =
  'https://photooxy.com/logo-and-text-effects/write-text-on-the-cup-392.html';
if (/romantic/.test(command))
link =
  'https://photooxy.com/logo-and-text-effects/romantic-messages-for-your-loved-one-391.html';
if (/burnpaper/.test(command))
link =
  'https://photooxy.com/logo-and-text-effects/write-text-on-burn-paper-388.html';
if (/smoke/.test(command))
link =
  'https://photooxy.com/other-design/create-an-easy-smoke-type-effect-390.html';
if (/narutobanner/.test(command))
link =
  'https://photooxy.com/manga-and-anime/make-naruto-banner-online-free-378.html';
if (/love/.test(command))
link =
  'https://photooxy.com/logo-and-text-effects/create-a-picture-of-love-message-377.html';
if (/undergrass/.test(command))
link =
  'https://photooxy.com/logo-and-text-effects/make-quotes-under-grass-376.html';
if (/doublelove/.test(command))
link =
  'https://photooxy.com/logo-and-text-effects/love-text-effect-372.html';
if (/coffecup/.test(command))
link =
  'https://photooxy.com/logo-and-text-effects/put-any-text-in-to-coffee-cup-371.html';
if (/underwaterocean/.test(command))
link =
  'https://photooxy.com/logo-and-text-effects/creating-an-underwater-ocean-363.html';
if (/smokyneon/.test(command))
link =
  'https://photooxy.com/logo-and-text-effects/make-smoky-neon-glow-effect-343.html';
if (/starstext/.test(command))
link =
  'https://photooxy.com/logo-and-text-effects/write-stars-text-on-the-night-sky-200.html';
if (/rainboweffect/.test(command))
link =
  'https://photooxy.com/logo-and-text-effects/glow-rainbow-effect-generator-201.html';
if (/balloontext/.test(command))
link =
  'https://photooxy.com/logo-and-text-effects/royal-look-text-balloon-effect-173.html';
if (/metalliceffect/.test(command))
link =
  'https://photooxy.com/logo-and-text-effects/illuminated-metallic-effect-177.html';
if (/embroiderytext/.test(command))
link =
  'https://photooxy.com/logo-and-text-effects/create-embroidery-text-online-191.html';
if (/flamingtext/.test(command))
link =
  'https://photooxy.com/logo-and-text-effects/realistic-flaming-text-effect-online-197.html';
let dehe = await photooxy.photoOxy(link, q);
alice.sendMessage(
m.chat,
{ image: { url: dehe }, caption: `Powered By Alice`},
{ quoted: m }
);
}
break;



































































// FITUR PANEL
case 'listusr': {
let page = args[0] ? args[0] : '1'
let f = await fetch(global.domain + "/api/application/users?page=" + page, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + global.apiuser
}
})
let res = await f.json();
let users = res.data
let sections = "*DATA USER PANEL*"
for (let user of users) {
let u = user.attributes
sections += `\n\n*${u.id}. ${u.username}*\n *User :* ${u.first_name} ${u.last_name}\n *Admin :* ${u.root_admin}\n *Bahasa :* ${u.language}`
}
alice.sendMessage(from, {
document: trash,
fileName: 'Panel Pterodactyl',
mimetype: doc3,
fileLength: 999999999,
pageCount: '2024',
caption: sections.trim(),
contextInfo: {
externalAdReply: {  
title: `L I S T   U S E R`, 
body: 'alice project [v.1.5]',
thumbnailUrl: "https://telegra.ph/file/fa753d99143e66c7fcf99.png", 
sourceUrl: `${global.saluran}`,
mediaType: 1,
renderLargerThumbnail: true
}}},{quoted:fkontak2})
}
break
case "listsrv": {
let page = args[0] ? args[0] : '1'
let f = await fetch(global.domain + "/api/application/servers?page=" + page, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + global.apiuser
}
})
let res = await f.json();
let servers = res.data
let sections = "*DATA SERVER PANEL*"
for (let server of servers) {
let s = server.attributes
let f3 = await fetch(global.domain + "/api/client/servers/" + s.uuid.split`-`[0] + "/resources", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + global.apicred
}
})
let data = await f3.json();

sections += `\n\n*${s.id}.* Server : ${s.name}`
}
alice.sendMessage(from, {
document: trash,
fileName: 'Panel Pterodactyl',
mimetype: doc3,
fileLength: 999999999,
pageCount: '2024',
caption: sections.trim(),
contextInfo: {
externalAdReply: {  
title: `L I S T   S E R V E R`, 
body: 'alice project [v.1.5]',
thumbnailUrl: "https://telegra.ph/file/fa753d99143e66c7fcf99.png", 
sourceUrl: `${global.saluran}`,
mediaType: 1,
renderLargerThumbnail: true
}}},{quoted:fkontak2})
}
break
case 'addusr': {
if (cekSaldo(sender,db_saldo) < 3000) return reply795(`Maaf @${sender.split('@')[0]}, saldo anda tidak cukup untuk *${command}*, dibutuhkan *Rp.* 3,000 untuk melalukan pembelian, silahkan topup dengan ketik *topup* dan lihat kembali saldo anda`)
    
let t = q.split(',');
if (t.length < 3) return reply795(`${prefix + command} email,username,name,number/tag`);
let email = t[0];
let username = t[1];
let name = t[2];
//let password
let u = m.quoted ? m.quoted.sender : t[3] ? t[3].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
if (!u) return reply795(`*PENGGUNAAN SALAH [!]*

Isi Data Anda Disini
${prefix + command} name@gmail.com,name,number\n\ncontoh : addusr darwin@gmail.com,darwin,${nomore}`);
let d = (await alice.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + global.apiuser
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": name,
"last_name": "Member",
"root_admin": false,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes

let p = await alice.sendMessage(m.chat, { text: `
*USER SUKSES DIBUAT*

id: ${user.id}
username: ${user.username}
email: ${user.email}
name: ${user.first_name} ${user.last_name}
bahasa: ${user.language}
admin: ${user.root_admin}
created at: ${user.created_at}

detail user @${u.split`@`[0]} dikirim\ndi private chat, harap lihat!`, mentions:[u],
}, {quoted: m})
alice.sendMessage(u, { text: `*THIS YOUR ACCOUNT*

email: ${email}
username: ${username}
password: ${password.toString()}
login: ${global.domain}

ketik *buyserver* untuk membeli server!`,
}).catch((err) => reply795(`*DETAIL ACCOUNT*

email : ${email}
username : ${username}
password : ${password.toString()}
login : ${global.domain}`))
}
await delay(4000)
reply(`*[ Pay Success ]* sukses bayar saldo *Rp.* 3,000`)
minSaldo(sender, 3000, db_saldo)
break
case 'addsrv': {
if (cekSaldo(sender,db_saldo) < 10000) return reply795(`Maaf @${sender.split('@')[0]}, saldo anda tidak cukup untuk *${command}*, dibutuhkan *Rp.* 10,000 untuk melalukan pembelian, silahkan topup dengan ketik *topup* dan lihat kembali saldo anda`)
let s = q.split(',');
if (s.length < 7) return reply795(`Format salah! silahkan isi data di bawah\nname,desc,userId,egg,locId,memory/disk,cpu`)
let name = s[0];
let desc = s[1] || ''
let usr_id = s[2];
let egg = s[3];
let loc = s[4];
let memo_disk = s[5].split`/`;
let cpu = s[6];

let f1 = await fetch(global.domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + global.apiuser
}
})
let data = await f1.json();
//console.log(data.attributes.startup)
let startup_cmd = data.attributes.startup

let f = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + global.apiuser,
},
"body": JSON.stringify({
"name": name,
"description": desc,
"user": usr_id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18", // Docker sesuaikan kaya yang ada di panel create srv manual dulu lihat dockernya apa taruh disini contoh: jika terdapat "Java 17 (ghcr.io/pterodactyl/yolks:java_17)" maka salin aja dan tempel "ghcr.io/pterodactyl/yolks:java_17"
"startup": startup_cmd,
"environment": {
/*"INST": "npm install",*/ //Buka ini jika di panel ada Startup Install nya Jika tidak ada maka sembunyikan kaya gini aja
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo_disk[0],
"swap": 0,
"disk": memo_disk[1],
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
// "allocation": {
// "default": 36
// }
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
reply795(`*SUCCESS CREATE SERVER*

*ID : ${server.id}*
UUID : ${server.uuid}
NAME : ${server.name}
DESC : ${server.description}
DISK : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
CPU : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%
DATE : ${server.created_at}`)
}
break
case 'delsrv': {
if (!isCreator) return reply('cannot access')
let srv = args[0]
if (!srv) return reply795('Input *ID* Server')
let f = await fetch(global.domain + "/api/application/servers/" + srv, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + global.apiuser,
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return reply795('*NOT FOUND [!]*')
reply('*SERVER DI HAPUS [!]*')
}
break
case 'delusr': {
if (!isCreator) return reply('this for creator')
let usr = args[0]
if (!usr) return reply795('Input User *ID*')
let f = await fetch(global.domain + "/api/application/users/" + usr, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + global.apiuser
}
})
//let res = await f.json()
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return reply795('*NOT FOUND*')
reply(`*${usr} DELETED*`)
}
break
case 'buyserver':
let hargasrv = 
`╾───────────────╼
   *PRABAYAR OTOMATIS*
╾───────────────╼
1GB • Rp. 1,500
2GB • Rp. 2,500
3GB • Rp. 3,000
4GB • Rp. 4,000

╾───────────────╼
*PAKET MEDIUM*
╾───────────────╼

5GB • Rp. 5,000
6GB • Rp. 6,000
7GB • Rp. 7,000
8GB • Rp. 8,500
9GB • Rp. 10,000

╾───────────────╼
*PAKET PREMIUM*
╾───────────────╼
0GB • Rp.15,000 < unlimited

Untuk cara pembelian server cukup ketik pilihan paket di atas seperti *contoh* 1GB maka transaksi akan dilakukan secara otomatis`
alice.sendMessage(from, {
document: trash,
fileName: 'Shop & Pay Pay',
mimetype: doc2,
fileLength: 999999999,
pageCount: '2024',
caption: hargasrv,
contextInfo: {
externalAdReply: {  
title: `PRICES FROM SERVERS`, 
body: 'alice project [v.1.5]',
thumbnailUrl: "https://telegra.ph/file/939e4ab598aacf0a7c506.jpg", 
sourceUrl: `${global.saluran}`,
mediaType: 1,
renderLargerThumbnail: true
}}},{quoted: fpayment2})
break
case "1gb": {
if (cekSaldo(sender,db_saldo) < 1500) return reply795(`Maaf @${sender.split('@')[0]}, saldo anda tidak cukup untuk *${command}*, dibutuhkan *Rp.* 1,500 untuk melalukan pembelian, silahkan topup dengan ketik *topup* dan lihat kembali saldo anda`)
let t = text.split(',');
if (t.length < 2) return m.reply(`*Buat Dengan Cara!*
isi nama 👇🏾   nomor mu 👇🏾
${prefix + command} namamu,${nomore}`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + " 1gb"
let egg = global.eggsnya
let loc = global.location
let memo = "1200"
let cpu = "30"
let disk = "1200"
let email = username + "1gb@gmail.com"
akunlo = "https://telegra.ph/file/eba6ee77a4acb477a04d3.jpg" 
if (!u) return
let d = (await alice.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + global.apiuser
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
let user = data.attributes
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let f2 = await fetch(global.domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + global.apiuser
}
})
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(global.domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + global.apiuser,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let ctf = await reply795(`*SUCCESS PAID*

 • Name : ${pushname}
 • Nomor : @${m.sender.split("@")[0]}
 • Saldo : Rp${toRupiah(cekSaldo(m.sender, db_saldo))}

*YOUR PANEL*

 • ID : ${user.id}
 • Username : ${user.username}
 • Email : ${user.email}
 • Name : ${user.first_name} ${user.last_name}
 • Bahasa : ${user.language}
 • Admin : ${user.root_admin}

Password telah dikirim di private chat @${u.split`@`[0]}`)

alice.sendMessage(u, { text: `*SUCCESS PAID*

 • Name : ${pushname}
 • Nomor : @${m.sender.split("@")[0]}
 • Saldo : Rp${toRupiah(cekSaldo(m.sender, db_saldo))}
 
*YOUR PANEL*

 • email: ${email}
 • username: ${username}
 • password: ${password.toString()}
 • login: ${global.domain}`,
}).catch((err) => reply795(`*SUCCESS PAID*

email: ${email}
username: ${username}
password: ${password.toString()}
login: ${global.domain}`))
}
await delay(4000)
reply(`*[ Pay Success ]* sukses bayar saldo *Rp.* 1,500`)
minSaldo(sender, 1500, db_saldo)
break
case "2gb": {
if (cekSaldo(sender,db_saldo) < 2500) return reply795(`Maaf @${sender.split('@')[0]}, saldo anda tidak cukup untuk *${command}*, dibutuhkan *Rp.* 2,500 untuk melalukan pembelian, silahkan topup dengan ketik *topup* dan lihat kembali saldo anda`)
let t = text.split(',');
if (t.length < 2) return m.reply(`*Buat Dengan Cara!*
isi nama 👇🏾   nomor mu 👇🏾
${prefix + command} namamu,${nomore}`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username + " 2GB"
let egg = global.eggsnya
let loc = global.location
let memo = "2200"
let cpu = "60"
let disk = "2200"
let email = username + "2gb@gmail.com"
akunlo = "https://telegra.ph/file/eba6ee77a4acb477a04d3.jpg" 
if (!u) return
let d = (await alice.onWhatsApp(u.split`@`[0]))[0] || {}
let password = d.exists ? crypto.randomBytes(5).toString('hex') : t[3]
let f = await fetch(global.domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + global.apiuser
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
let user = data.attributes
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + global.apiuser
}
})
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + global.apiuser,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let ctf = await reply795(`*SUCCESS PAID*

 • Name : ${pushname}
 • Nomor : @${m.sender.split("@")[0]}
 • Saldo : Rp${toRupiah(cekSaldo(m.sender, db_saldo))}

*YOUR PANEL*

 • ID : ${user.id}
 • Username : ${user.username}
 • Email : ${user.email}
 • Name : ${user.first_name} ${user.last_name}
 • Bahasa : ${user.language}
 • Admin : ${user.root_admin}

Password telah dikirim di private chat @${u.split`@`[0]}`)
alice.sendMessage(u, { text: `*SUCCESS PAID*

 • Name : ${pushname}
 • Nomor : @${m.sender.split("@")[0]}
 • Saldo : Rp${toRupiah(cekSaldo(m.sender, db_saldo))}
 
*YOUR PANEL*

 • email: ${email}
 • username: ${username}
 • password: ${password.toString()}
 • login: ${global.domain}`,
}).catch((err) => reply795(`*SUCCESS PAID*

email: ${email}
username: ${username}
password: ${password.toString()}
login: ${global.domain}`))
}
await delay(4000)
reply(`*[ Pay Success ]* sukses bayar saldo *Rp.* 2,500`)
minSaldo(sender, 2500, db_saldo)
break






























































// FITUR SEARCH
case 'spotify':
if (!text) return reply('Masukan judul lagu!') 
let searching = require('./lib/spotify')
searching(text).then(result => {
const hasil = `乂 *S P O T I F Y*

*Title*: ${result.data[0].title}
*Duration*: ${result.data[0].duration}
*Popular*: ${result.data[0].popularity}
*Url*: ${result.data[0].url}
`
alice.sendMessage(m.chat, {text: hasil, contextInfo:
{
"externalAdReply": {
"title": 'Alice Spotify',
"body": `${result.data[0].url}`,
"showAdAttribution": false,
"mediaType": 1,
"sourceUrl": '',
"thumbnailUrl": 'https://telegra.ph/file/d888041549c7444f1212b.jpg',
"renderLargerThumbnail": true

}
}}, {quoted: floc})
					
const spoDl = `https://spotifyku.my.id/download?url=${result.data[0].url}`
alice.sendMessage(m.chat, {
audio: {
url: spoDl
},
mimetype: 'audio/mpeg',
contextInfo: {
externalAdReply: {
title: `Alice Spotify`,
body: "",
thumbnailUrl: 'https://telegra.ph/file/d888041549c7444f1212b.jpg',
sourceUrl: `${global.saluran}`,
mediaType: 1,
showAdAttribution: true,
renderLargerThumbnail: true
}
}
}, {
quoted: m
});
   })
break 
case 'spotifysearch':{
if (!text) return reply(`Contoh : ${prefix + command} dandelion`);
  
let spotify = await fetch(`https://api.nomisec07.site/api/spotify-search?text=${text}`);
  let json = await spotify.json();
  
let hasil = json.data.map((v) => `*Title:* ${v.title}\n*Popularitas:* ${v.popularity}\n*Url:* ${v.url}`).join('\n\n_____________________________________\n\n');
  
let vid = 'https://telegra.ph/file/1777e972a6ea790afebfc.mp4'
alice.sendFile(m.chat, vid, 'pp.mp4', hasil, m, true, { 
 gifPlayback: true, gifAttribution: 2})
}
break;

case'ssweb':
{
if (!text) return reply(`Gunakan dengan cara ${prefix+command} *url web*\nContoh penggunaan : ${prefix+command} https://bit.ly/420u6GX`)
reply(mess.wait)
let ss = await getBuffer(`https://skizo.tech/api/ssweb?type=dekstop&url=${text}&apikey=${global.skizo}`)
try{
await alice.sendMessage(m.chat, {image: ss, caption: "Done Bruhh"}, {quoted: m})
} catch (err){
reply(util.format(err))
}
}
break
case'ssweb2':
{
if  (!text) return reply(`Gunakan dengan cara ${prefix+command} *url web*\nContoh penggunaan : ${prefix+command} https://bit.ly/420u6GX`)
reply(mess.wait)
let ss = await getBuffer(`https://skizo.tech/api/ssweb?type=phone&url=${text}&apikey=${global.skizo}`)
try{
await alice.sendMessage(m.chat, {image: ss, caption: "Done Bruhh"}, {quoted: m})
} catch (err){
reply(util.format(err))
}
}
break
case 'ghstalk':
if (!text) return reply('Harap Masukan Username')
reply('Searching...')
    let nya = await fetch(`https://api.github.com/users/${text}`).then(a => a.json())
    let thumb = await getBuffer(nya.avatar_url)
    let hasil = `*── 「 GITHUB STALK 」 ──*
➸ *Bio*: ${nya.bio}
➸ *Perusahaan*: ${nya.company}
➸ *Repo Publik:* ${nya.public_repos}
➸ *Gists Publik:* ${nya.public_gists}
➸ *Follower:* ${nya.followers}
➸ *Following:* ${nya.following}
➸ *Lokasi:* ${nya.location}
➸ *Link:* ${nya.html_url}
`
alice.sendMessage(m.chat, { image: thumb, caption: hasil, quoted: m })
break
case 'openai': case 'chatgpt': case 'ai':{
if (!isGroup) return onlyGroup()
if(!q) return reply(`Teksnya?\nExample: ${prefix+command} apa itu rumah`)		
reply(mess.wait)	
let messages = [
{ 
role: 'user',
content: `${q}`
}]
let p =  (await axios.post(`https://skizo.tech/api/openai?apikey=${global.skizo}`, { messages, system: 'you as Alice, a large ai build with integer' })).data
reply795(p.result)
}
break
case 'gimage': {
if (!isGroup) return onlyGroup()
if (!text) return reply(`Example : ${prefix + command} carry minati`)
reply(mess.wait)
let gis = require('g-i-s')
gis(text, async (error, result) => {
n = result
images = n[Math.floor(Math.random() * n.length)].url
alice.sendMessage(m.chat, { image: { url: images}, caption: `*-------「 GIMAGE SEARCH 」-------*\n🤠 *Query* : ${text}\n🔗 *Media Url* : ${images}`}, { quoted: m })
})
}
break
case 'txt2img':{
if (!isCreator && !isOwner && !isPremium)
if (!text) throw 'Masukan Promptnya\nExample:\n.stabledif ultra realistic close up portrait ((beautiful pale cyberpunk female with heavy black eyeliner)), blue eyes, shaved side haircut, hyper detail, cinematic lighting, magic neon, dark red city, Canon EOS R3, nikon, f/1.4, ISO 200, 1/160s, 8K, RAW, unedited, symmetrical balance, in-frame, 8K'
reply(`Proses Ayang`)
let txt = await getBuffer(`https://skizo.tech/api/txt2img?text=${text}&apikey=${global.skizo}`)
await alice.sendMessage(m.chat, {image: txt, caption: `Done Sayang`},{quoted: repPy})
     }
break //Powered By alice & NICKY
case 'igstalk':{
if (!q) return reply(`Masukkan username instagram nya`)
reply(`Tunggu Sedang Mengecek ....`)
fetchJson(`https://api.lolhuman.xyz/api/stalkig/${q}?apikey=${global.lolkey}`).then(res => {
let teksnya = `乂  *INSTAGRAM STALK*

*USERNAME:* ${res.result.username}
*FUL NAME:* ${res.result.fullname}
*POSTINGAN:* ${res.result.posts}
*FOLOWERS:* ${res.result.followers}
*FOLOWING:* ${res.result.following}
*BIO:* ${res.result.bio}

_*${global.fake}*_`
alice.sendMessage(from, {image: {url: res.result.photo_profile}, caption: teksnya}, {quoted: m})
})
}
break

case 'bingimg':
case 'bingimage': {
if (!text) return reply(`Example : ${command} anak kecil, berdada besar, memakai seragam`)
reply('tunggu yah manis 👩‍⚕️')
let data = await fetchJson(`https://kiicodeofficial.my.id/api/ai/disney?q=${encodeURIComponent(text)}&apikey=Ceri`);
if (data.data && data.data.murl) {
const bingimg = data.data.murl;
alice.sendMessage(m.chat, { caption: `*Hasil Dari promt:*\n${text}`, image: { url: bingimg } }, { quoted: m });
}
}
break
case 'lirik':
if (!text) return reply('judulnya apa?')
var { data } = await axios.get(`https://api.lolhuman.xyz/api/lirik?apikey=haikalgans&query=${text}`)
reply(data.result)
break
case 'happymod':
if (!text) return reply(`• *Example :* ${prefix + command} spotify`)
reply('[ System Error ] Ada kesalahan')
break
case 'stalktiktok':
if (args.length == 0) return reply(`Example: ${prefix + command} bulansutena`)
axios.get(`https://api.lolhuman.xyz/api/stalktiktok/${args[0]}?apikey=${apikey}`).then(({ data }) => {
var caption = `Username : ${data.result.username}\n`
caption += `Nickname : ${data.result.nickname}\n`
caption += `Followers : ${data.result.followers}\n`
caption += `Followings : ${data.result.followings}\n`
caption += `Likes : ${data.result.likes}\n`
caption += `Video : ${data.result.video}\n`
caption += `Bio : ${data.result.bio}\n`
alice.sendMessage(from, { image: { url: data.result.user_picture }, caption })
})
break
case 'yts': case 'ytsearch': {
if (!text) throw `Example : ${prefix + command} story wa anime`
let search = await yts(text)
let teks = '*YouTube Search*\n\nResult From '+text+'\nketik *getmusic* untuk mengambil mp3 dan *getvideo* untuk mp4\ngunakan dengan nomor urutan, contoh *getmusic 1*\n\n'
let no = 1
for (let i of search.all) {
teks += `⭔ No Urutan : ${no++}\n⭔ Type : ${i.type}\n⭔ Video ID : ${i.videoId}\n⭔ Title : ${i.title}\n⭔ Views : ${i.views}\n⭔ Duration : ${i.timestamp}\n⭔ Upload At : ${i.ago}\n⭔ Url : ${i.url}\n─────────────────\n`
}
alice.sendMessage(m.chat, { image: { url: search.all[0].thumbnail },  caption: teks }, { quoted: m })
}
break
case 'getmusic': {
if (!text) throw `Example : ${prefix + command} 1`
if (!m.quoted) return m.reply('Reply Pesan')
if (!m.quoted.isBaileys) throw `Hanya Bisa Membalas Pesan Dari Bot`
let urls = quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))
if (!urls) throw `Mungkin pesan yang anda reply tidak mengandung result ytsearch`
downloadMp3(urls[text - 1])
}
break
case 'getvideo': 
if (!text) throw `Example : ${prefix + command} 1`
if (!m.quoted) return m.reply('Reply Pesan')
if (!m.quoted.isBaileys) throw `Hanya Bisa Membalas Pesan Dari Bot`
let urls = quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))
if (!urls) throw `Mungkin pesan yang anda reply tidak mengandung result ytsearch`
const alicevidoh2 = require('./lib/ytdl2')
let quality = args[1] ? args[1] : '360p'
const vid2=await alicevidoh2.mp4(urls[text - 1], quality)
const ytc2=`*Tittle:* ${vid2.title}
*Date:* ${vid2.date}
*Duration:* ${vid2.duration}
*Quality:* ${vid2.quality}`
await alice.sendMessage(m.chat,{
    video: {url:vid2.videoUrl},
    caption: ytc2
},)
break
case "ytreels": case "youtubereels":{
if (!text) return m.reply('Masukan Link Nya!!!')
downloadMp4(text)
}
break
case 'pinterest': case 'pin':
if (args.length < 2) return reply(`Kirim perintah ${command} query atau ${command} query -jumlah\nContoh :\n${command} cecan atau ${command} cecan -10`)
reply('_Tunggu sebentar..._')
var jumlah;
if (q.includes('-')) jumlah = q.split('-')[1]
pinterest(q.replace('-'+jumlah, '')).then(async(data) => {
if (q.includes('-')) {
if (data.result.length < jumlah) {
  jumlah = data.result.length
  reply(`Result ${data.result.length} gambar, gambar segera dikirim`)
}
for (let i = 0; i < jumlah; i++) {
  alice.sendMessage(from, { image: { url: data.result[i] }, caption: `_Hasil pencarian ${q}_`})
}

} else { 
alice.sendMessage(from, { caption: `Ini dia ${q}`, image: { url: pickRandom(data.result) }}, { quoted: m })

}
})
break











































// FITUR PRIMBON
case 'apakah': {
if (!isGroup) return onlyGroup()
if (!q) return reply(`Penggunaan ${command} text\n\nContoh : ${command} saya wibu`)
const apa = ['Iya', 'Tidak', 'Bisa Jadi', 'Betul']
const kah = apa[Math.floor(Math.random() * apa.length)]
reply(`Pertanyaan : Apakah ${q}\nJawaban : ${kah}`)
}
break
case 'bisakah': {
if (!isGroup) return onlyGroup()
if (!q) return reply(`Penggunaan ${command} text\n\nContoh : ${command} saya menjadi presiden`)
const bisa = ['Bisa', 'Gak Bisa', 'Gak Bisa Ajg Aaokawpk', 'TENTU PASTI KAMU BISA!!!!']
const ga = bisa[Math.floor(Math.random() * bisa.length)]
reply(`Pertanyaan : Apakah ${q}\nJawaban : ${ga}`)
}
break
case 'bagaimanakah': {
if (!q) return reply(`Penggunaan ${command} text\n\nContoh : ${command} cara mengatasi sakit hati`)
const gimana = ['Gak Gimana2', 'Sulit Itu Bro', 'Maaf Bot Tidak Bisa Menjawab', 'Coba Deh Cari Di Gugel', 'astaghfirallah Beneran???', 'Pusing ah', 'Owhh Begitu:(', 'Gimana yeee']
const ya = gimana[Math.floor(Math.random() * gimana.length)]
reply(`Pertanyaan : Apakah ${q}\nJawaban : ${ya}`)
}
break
case 'rate': {
if (!isGroup) return onlyGroup()
if (!q) return reply(`Penggunaan ${command} text\n\nContoh : ${command} Gambar aku`)
const ra = ['5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60', '65', '70', '75', '80', '85', '90', '95', '100']
const te = ra[Math.floor(Math.random() * ra.length)]
reply(`Rate : ${q}\nJawaban : *${te}%*`)
}
break
case 'gantengcek': case 'cekganteng': {
if (!isGroup) return onlyGroup()
if (!q) return reply(`Penggunaan ${command} Nama\n\nContoh : ${command} Owner`)
const gan = ['10% banyak" perawatan ya bang:v\nCanda Perawatan:v','30% Semangat bang Merawat Dirinya><','20% Semangat Ya bang👍','40% Wahh bang><','50% abang Ganteng deh><','60% Hai Ganteng🐊','70% Hai Ganteng🐊','62% Bang Ganteng><','74% abang ni ganteng deh><','83% Love You abang><','97% Assalamualaikum Ganteng🐊','100% Bang Pake Susuk ya??:v','29% Semangat Bang:)','94% Hai Ganteng><','75% Hai Bang Ganteng','82% wihh abang Pasti Sering Perawatan kan??','41% Semangat:)','39% Lebih Semangat🐊']
const teng = gan[Math.floor(Math.random() * gan.length)]
reply(`Nama : ${q}\nJawaban : *${teng}*`)
}
break           
case 'jomokcek': {
if (!isGroup) return onlyGroup()
if (!q) return reply(`Penggunaan ${command} Nama\n\nContoh : ${command} Owner`)
const gans = ['10% hitam','2% j*wa','h*tam banget wak bjir 😂','jomok ansing jangan di temenin','wah wah sang makhluk h*tam datang','buset wak j*wir 😂','orang suci 🧘🏾‍♂️','j*wa njir 👉🏽💩👈🏽','sang raja h*tam telah datang, mohon tundukan kepala']
const tengs = gans[Math.floor(Math.random() * gans.length)]
reply(`Si ${q} *${tengs}*`)
}
break           
case 'cantikcek': case 'cekcantik': {
if (!isGroup) return onlyGroup()
if (!q) return reply(`Penggunaan ${command} Nama\n\nContoh : ${command} Lisaa`)
const can = ['10% banyak" perawatan ya kak:v\nCanda Perawatan:v','30% Semangat Kaka Merawat Dirinya><','20% Semangat Ya Kaka👍','40% Wahh Kaka><','50% kaka cantik deh><','60% Hai Cantik🐊','70% Hai Ukhty🐊','62% Kakak Cantik><','74% Kakak ni cantik deh><','83% Love You Kakak><','97% Assalamualaikum Ukhty🐊','100% Kakak Pake Susuk ya??:v','29% Semangat Kakak:)','94% Hai Cantik><','75% Hai Kakak Cantik','82% wihh Kakak Pasti Sering Perawatan kan??','41% Semangat:)','39% Lebih Semangat🐊']
const tik = can[Math.floor(Math.random() * can.length)]
reply(`Nama : ${q}\nJawaban : *${tik}*`)
}
break
case 'sangecek': case 'ceksange': case 'gaycek': case 'cekgay': case 'lesbicek': case 'ceklesbi': {
if (!isGroup) return onlyGroup()
if (!q) return reply(`Penggunaan ${command} Nama\n\nContoh : ${command} Lisaa`)
const sangeh = ['5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60', '65', '70', '75', '80', '85', '90', '95', '100']
const sange = sangeh[Math.floor(Math.random() * sangeh.length)]
reply(`Nama : ${q}\nJawaban : *${sange}%*`)
}
break
case 'kapankah': {
if (!isGroup) return onlyGroup()
if (!q) return reply(`Penggunaan ${command} Pertanyaan\n\nContoh : ${command} Saya Mati`)
const kapan = ['5 Hari Lagi', '10 Hari Lagi', '15 Hari Lagi', '20 Hari Lagi', '25 Hari Lagi', '30 Hari Lagi', '35 Hari Lagi', '40 Hari Lagi', '45 Hari Lagi', '50 Hari Lagi', '55 Hari Lagi', '60 Hari Lagi', '65 Hari Lagi', '70 Hari Lagi', '75 Hari Lagi', '80 Hari Lagi', '85 Hari Lagi', '90 Hari Lagi', '95 Hari Lagi', '100 Hari Lagi', '5 Bulan Lagi', '10 Bulan Lagi', '15 Bulan Lagi', '20 Bulan Lagi', '25 Bulan Lagi', '30 Bulan Lagi', '35 Bulan Lagi', '40 Bulan Lagi', '45 Bulan Lagi', '50 Bulan Lagi', '55 Bulan Lagi', '60 Bulan Lagi', '65 Bulan Lagi', '70 Bulan Lagi', '75 Bulan Lagi', '80 Bulan Lagi', '85 Bulan Lagi', '90 Bulan Lagi', '95 Bulan Lagi', '100 Bulan Lagi', '1 Tahun Lagi', '2 Tahun Lagi', '3 Tahun Lagi', '4 Tahun Lagi', '5 Tahun Lagi', 'Besok', 'Lusa', `Abis Command Ini Juga Lu ${q}`]
const kapankah = kapan[Math.floor(Math.random() * kapan.length)]
reply(`Pertanyaan : ${q}\nJawaban : *${kapankah}*`)
}
break
case 'wangy': {
if (!isGroup) return onlyGroup()
if (!q) return reply(`Contoh : ${prefix}wangy HuBotZ`)
let qq = q.toUpperCase()
let awikwok = `${qq} ${qq} ${qq} ❤️ ❤️ ❤️ WANGY WANGY WANGY WANGY HU HA HU HA HU HA, aaaah baunya rambut ${qq} wangyy aku mau nyiumin aroma wangynya ${qq} AAAAAAAAH ~ Rambutnya.... aaah rambutnya juga pengen aku elus-elus ~~ AAAAAH ${qq} keluar pertama kali di anime juga manis ❤️ ❤️ ❤️ banget AAAAAAAAH ${qq} AAAAA LUCCUUUUUUUUUUUUUUU............ ${qq} AAAAAAAAAAAAAAAAAAAAGH ❤️ ❤️ ❤️apa ? ${qq} itu gak nyata ? Cuma HALU katamu ? nggak, ngak ngak ngak ngak NGAAAAAAAAK GUA GAK PERCAYA ITU DIA NYATA NGAAAAAAAAAAAAAAAAAK PEDULI BANGSAAAAAT !! GUA GAK PEDULI SAMA KENYATAAN POKOKNYA GAK PEDULI. ❤️ ❤️ ❤️ ${qq} gw ... ${qq} di laptop ngeliatin gw, ${qq} .. kamu percaya sama aku ? aaaaaaaaaaah syukur ${q} aku gak mau merelakan ${qq} aaaaaah ❤️ ❤️ ❤️ YEAAAAAAAAAAAH GUA MASIH PUNYA ${qq} SENDIRI PUN NGGAK SAMA AAAAAAAAAAAAAAH`
reply(awikwok)
}
break

//menu primbon
case 'artimimpi': case 'tafsirmimpi': {
if (!isGroup) return onlyGroup()
 if (!text) throw `Example : ${prefix + command} belanja`
 let anu = await primbon.tafsir_mimpi(text)
 if (anu.status == false) return reply(anu.message)
 alice.sendteks(from, `⭔ *Mimpi :* ${anu.message.mimpi}\n⭔ *Arti :* ${anu.message.arti}\n⭔ *Solusi :* ${anu.message.solusi}`, m)
}
break
//=================================================//
case 'ramalanjodoh': case 'ramaljodoh': {
if (!isGroup) return onlyGroup()
 if (!text) throw `Example : ${prefix + command} yunzhie, 7, 7, 2024, NICKY, 16, 11, 2024`
 let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = text.split`,`
 let anu = await primbon.ramalan_jodoh(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
 if (anu.status == false) return reply(anu.message)
 alice.sendteks(from, `⭔ *Nama Anda :* ${anu.message.nama_anda.nama}\n⭔ *Lahir Anda :* ${anu.message.nama_anda.tgl_lahir}\n⭔ *Nama Pasangan :* ${anu.message.nama_pasangan.nama}\n⭔ *Lahir Pasangan :* ${anu.message.nama_pasangan.tgl_lahir}\n⭔ *Hasil :* ${anu.message.result}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
}
break
//=================================================//
case 'artinama': {
if (!isGroup) return onlyGroup()
 if (!text) throw `Example : ${prefix + command} NICKY`
 let anu = await primbon.arti_nama(text)
 if (anu.status == false) return reply(anu.message)
 alice.sendteks(from, `⭔ *Nama :* ${anu.message.nama}\n⭔ *Arti :* ${anu.message.arti}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
}
break
//=================================================//
case 'kecocokannama': case 'cocoknama': {
if (!isGroup) return onlyGroup()
 if (!text) throw `Example : ${prefix + command} Aruna, 7, 7, 2005`
 let [nama, tgl, bln, thn] = text.split`,`
 let anu = await primbon.kecocokan_nama(nama, tgl, bln, thn)
 if (anu.status == false) return reply(anu.message)
 alice.sendteks(from, `⭔ *Nama :* ${anu.message.nama}\n⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Life Path :* ${anu.message.life_path}\n⭔ *Destiny :* ${anu.message.destiny}\n⭔ *Destiny Desire :* ${anu.message.destiny_desire}\n⭔ *Personality :* ${anu.message.personality}\n⭔ *Persentase :* ${anu.message.persentase_kecocokan}`, m)
}
break
//=================================================//
case 'kecocokanpasangan': case 'cocokpasangan': case 'pasangan': {
if (!isGroup) return onlyGroup()
 if (!text) throw `Example : ${prefix + command} NICKY|YunYun`
 let [nama1, nama2] = text.split`|`
 let anu = await primbon.kecocokan_nama_pasangan(nama1, nama2)
 if (anu.status == false) return reply(anu.message)
 alice.sendImage(from,  anu.message.gambar, `⭔ *Nama Anda :* ${anu.message.nama_anda}\n⭔ *Nama Pasangan :* ${anu.message.nama_pasangan}\n⭔ *Sisi Positif :* ${anu.message.sisi_positif}\n⭔ *Sisi Negatif :* ${anu.message.sisi_negatif}`, m)
}
break
//=================================================//
case 'jadianpernikahan': case 'jadiannikah': {
if (!isGroup) return onlyGroup()
 if (!text) throw `Example : ${prefix + command} 6, 12, 2020`
 let [tgl, bln, thn] = text.split`,`
 let anu = await primbon.tanggal_jadian_pernikahan(tgl, bln, thn)
 if (anu.status == false) return reply(anu.message)
 alice.sendteks(from, `⭔ *Tanggal Pernikahan :* ${anu.message.tanggal}\n⭔ *karakteristik :* ${anu.message.karakteristik}`, m)
}
break
//=================================================//
case 'sifatusaha': {
if (!isGroup) return onlyGroup()
 if (!ext)throw `Example : ${prefix+ command} 28, 12, 2021`
 let [tgl, bln, thn] = text.split`,`
 let anu = await primbon.sifat_usaha_bisnis(tgl, bln, thn)
 if (anu.status == false) return reply(anu.message)
 alice.sendteks(from, `⭔ *Lahir :* ${anu.message.hari_lahir}\n⭔ *Usaha :* ${anu.message.usaha}`, m)
}
break
//=================================================//
case 'rejeki': case 'rezeki': {
if (!isGroup) return onlyGroup()
 if (!text) throw `Example : ${prefix + command} 7, 7, 2005`
 let [tgl, bln, thn] = text.split`,`
 let anu = await primbon.rejeki_hoki_weton(tgl, bln, thn)
 if (anu.status == false) return reply(anu.message)
 alice.sendteks(from, `⭔ *Lahir :* ${anu.message.hari_lahir}\n⭔ *Rezeki :* ${anu.message.rejeki}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
}
break
//=================================================//
case 'pekerjaan': case 'kerja': {
if (!isGroup) return onlyGroup()
 if (!text) throw `Example : ${prefix + command} 7, 7, 2005`
 let [tgl, bln, thn] = text.split`,`
 let anu = await primbon.pekerjaan_weton_lahir(tgl, bln, thn)
 if (anu.status == false) return reply(anu.message)
 alice.sendteks(from, `⭔ *Lahir :* ${anu.message.hari_lahir}\n⭔ *Pekerjaan :* ${anu.message.pekerjaan}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
}
break
//=================================================//
case 'ramalannasib': case 'ramalnasib': case 'nasib': {
if (!isGroup) return onlyGroup()
 if (!text) throw `Example : 7, 7, 2005`
 let [tgl, bln, thn] = text.split`,`
 let anu = await primbon.ramalan_nasib(tgl, bln, thn)
 if (anu.status == false) return reply(anu.message)
 alice.sendteks(from, `⭔ *Analisa :* ${anu.message.analisa}\n⭔ *Angka Akar :* ${anu.message.angka_akar}\n⭔ *Sifat :* ${anu.message.sifat}\n⭔ *Elemen :* ${anu.message.elemen}\n⭔ *Angka Keberuntungan :* ${anu.message.angka_keberuntungan}`, m)
}
break
//=================================================//

case 'potensipenyakit': case 'penyakit': {
if (!isGroup) return onlyGroup()
 if (!text) throw `Example : ${prefix + command} 7, 7, 2005`
 let [tgl, bln, thn] = text.split`,`
 let anu = await primbon.cek_potensi_penyakit(tgl, bln, thn)
 if (anu.status == false) return reply(anu.message)
 alice.sendteks(from, `⭔ *Analisa :* ${anu.message.analisa}\n⭔ *Sektor :* ${anu.message.sektor}\n⭔ *Elemen :* ${anu.message.elemen}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
}
break
//=================================================//
case 'artitarot': case 'tarot': {
if (!isGroup) return onlyGroup()
 if (!text) throw `Example : ${prefix + command} 7, 7, 2005`
 let [tgl, bln, thn] = text.split`,`
 let anu = await primbon.arti_kartu_tarot(tgl, bln, thn)
 if (anu.status == false) return reply(anu.message)
 alice.sendImage(from, anu.message.image, `⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Simbol Tarot :* ${anu.message.simbol_tarot}\n⭔ *Arti :* ${anu.message.arti}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
}
break
//=================================================//
case 'fengshui': {
if (!isGroup) return onlyGroup()
 if (!text) throw `Example : ${prefix + command} HW MODS WA, 1, 2005\n\nNote : ${prefix + command} Nama, gender, tahun lahir\nGender : 1 untuk laki-laki & 2 untuk perempuan`
 let [nama, gender, tahun] = text.split`,`
 let anu = await primbon.perhitungan_feng_shui(nama, gender, tahun)
 if (anu.status == false) return reply(anu.message)
 alice.sendteks(from, `⭔ *Nama :* ${anu.message.nama}\n⭔ *Lahir :* ${anu.message.tahun_lahir}\n⭔ *Gender :* ${anu.message.jenis_kelamin}\n⭔ *Angka Kua :* ${anu.message.angka_kua}\n⭔ *Kelompok :* ${anu.message.kelompok}\n⭔ *Karakter :* ${anu.message.karakter}\n⭔ *Sektor Baik :* ${anu.message.sektor_baik}\n⭔ *Sektor Buruk :* ${anu.message.sektor_buruk}`, m)
}
break
//=================================================//
case 'haribaik': {
if (!isGroup) return onlyGroup()
 if (!text) throw `Example : ${prefix + command} 7, 7, 2005`
 let [tgl, bln, thn] = text.split`,`
 let anu = await primbon.petung_hari_baik(tgl, bln, thn)
 if (anu.status == false) return reply(anu.message)
 alice.sendteks(from, `⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Kala Tinantang :* ${anu.message.kala_tinantang}\n⭔ *Info :* ${anu.message.info}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
}
break
//=================================================//
case 'harisangar': case 'taliwangke': {
if (!isGroup) return onlyGroup()
 if (!text) throw `Example : ${prefix + command} 7, 7, 2005`
 let [tgl, bln, thn] = text.split`,`
 let anu = await primbon.hari_sangar_taliwangke(tgl, bln, thn)
 if (anu.status == false) return reply(anu.message)
 alice.sendteks(from, `⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Hasil :* ${anu.message.result}\n⭔ *Info :* ${anu.message.info}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
}
break
//=================================================//
case 'harinaas': case 'harisial': {
if (!isGroup) return onlyGroup()
 if (!text) throw `Example : ${prefix + command} 7, 7, 2005`
 let [tgl, bln, thn] = text.split`,`
 let anu = await primbon.primbon_hari_naas(tgl, bln, thn)
 if (anu.status == false) return reply(anu.message)
 alice.sendteks(from, `⭔ *Hari Lahir :* ${anu.message.hari_lahir}\n⭔ *Tanggal Lahir :* ${anu.message.tgl_lahir}\n⭔ *Hari Naas :* ${anu.message.hari_naas}\n⭔ *Info :* ${anu.message.catatan}\n⭔ *Catatan :* ${anu.message.info}`, m)
}
break
//=================================================//
case 'nagahari': case 'harinaga': {
if (!isGroup) return onlyGroup()
 if (!text) throw `Example : ${prefix + command} 7, 7, 2005`
 let [tgl, bln, thn] = text.split`,`
 let anu = await primbon.rahasia_naga_hari(tgl, bln, thn)
 if (anu.status == false) return reply(anu.message)
 alice.sendteks(from, `⭔ *Hari Lahir :* ${anu.message.hari_lahir}\n⭔ *Tanggal Lahir :* ${anu.message.tgl_lahir}\n⭔ *Arah Naga Hari :* ${anu.message.arah_naga_hari}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
}
break
//=================================================//
case 'arahrejeki': case 'arahrezeki': {
if (!isGroup) return onlyGroup()
 if (!text) throw `Example : ${prefix + command} 7, 7, 2005`
 let [tgl, bln, thn] = text.split`,`
 let anu = await primbon.primbon_arah_rejeki(tgl, bln, thn)
 if (anu.status == false) return reply(anu.message)
 alice.sendteks(from, `⭔ *Hari Lahir :* ${anu.message.hari_lahir}\n⭔ *tanggal Lahir :* ${anu.message.tgl_lahir}\n⭔ *Arah Rezeki :* ${anu.message.arah_rejeki}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
}
break
//=================================================//
case 'peruntungan': {
if (!isGroup) return onlyGroup()
 if (!text) throw `Example : ${prefix + command} Aruna, 7, 7, 2005, 2022\n\nNote : ${prefix + command} Nama, tanggal lahir, bulan lahir, tahun lahir, untuk tahun`
 let [nama, tgl, bln, thn, untuk] = text.split`,`
 let anu = await primbon.ramalan_peruntungan(nama, tgl, bln, thn, untuk)
 if (anu.status == false) return reply(anu.message)
 alice.sendteks(from, `⭔ *Nama :* ${anu.message.nama}\n⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Peruntungan Tahun :* ${anu.message.peruntungan_tahun}\n⭔ *Hasil :* ${anu.message.result}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
}
break
//=================================================//
case 'weton': case 'wetonjawa': {
if (!isGroup) return onlyGroup()
 if (!text) throw `Example : ${prefix + command} 7, 7, 2005`
 let [tgl, bln, thn] = text.split`,`
 let anu = await primbon.weton_jawa(tgl, bln, thn)
 if (anu.status == false) return reply(anu.message)
 alice.sendteks(from, `⭔ *Tanggal :* ${anu.message.tanggal}\n⭔ *Jumlah Neptu :* ${anu.message.jumlah_neptu}\n⭔ *Watak Hari :* ${anu.message.watak_hari}\n⭔ *Naga Hari :* ${anu.message.naga_hari}\n⭔ *Jam Baik :* ${anu.message.jam_baik}\n⭔ *Watak Kelahiran :* ${anu.message.watak_kelahiran}`, m)
}
break
//=================================================//
case 'sifat': case 'karakter': {
if (!isGroup) return onlyGroup()
 if (!text) throw `Example : ${prefix + command} HW MODS WA, 7, 7, 2005`
 let [nama, tgl, bln, thn] = text.split`,`
 let anu = await primbon.sifat_karakter_tanggal_lahir(nama, tgl, bln, thn)
 if (anu.status == false) return reply(anu.message)
 alice.sendteks(from, `⭔ *Nama :* ${anu.message.nama}\n⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Garis Hidup :* ${anu.message.garis_hidup}`, m)
}
break
//=================================================//
case 'keberuntungan': {
if (!isGroup) return onlyGroup()
 if (!text) throw `Example : ${prefix + command} HW MODS WA, 7, 7, 2005`
 let [nama, tgl, bln, thn] = text.split`,`
 let anu = await primbon.potensi_keberuntungan(nama, tgl, bln, thn)
 if (anu.status == false) return reply(anu.message)
 alice.sendteks(from, `⭔ *Nama :* ${anu.message.nama}\n⭔ *Lahir :* ${anu.message.tgl_lahir}\n⭔ *Hasil :* ${anu.message.result}`, m)
}
break
//=================================================//
case 'memancing': {
if (!isGroup) return onlyGroup()
 if (!text) throw `Example : ${prefix + command} 12, 1, 2022`
 let [tgl, bln, thn] = text.split`,`
 let anu = await primbon.primbon_memancing_ikan(tgl, bln, thn)
 if (anu.status == false) return reply(anu.message)
 alice.sendteks(from, `⭔ *Tanggal :* ${anu.message.tgl_memancing}\n⭔ *Hasil :* ${anu.message.result}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
}
break
//=================================================//
case 'masasubur': {
if (!isGroup) return onlyGroup()
 if (!text) throw `Example : ${prefix + command} 12, 1, 2022, 28\n\nNote : ${prefix + command} hari pertama menstruasi, siklus`
 let [tgl, bln, thn, siklus] = text.split`,`
 let anu = await primbon.masa_subur(tgl, bln, thn, siklus)
 if (anu.status == false) return reply(anu.message)
 alice.sendteks(from, `⭔ *Hasil :* ${anu.message.result}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
}
break
//=================================================//
case 'zodiak': case 'zodiac': {
if (!isGroup) return onlyGroup()
 if (!text) throw `Example : ${prefix+ command} 7 7 2005`
 let zodiak = [
 ["capricorn", new Date(1970, 0, 1)],
 ["aquarius", new Date(1970, 0, 20)],
 ["pisces", new Date(1970, 1, 19)],
 ["aries", new Date(1970, 2, 21)],
 ["taurus", new Date(1970, 3, 21)],
 ["gemini", new Date(1970, 4, 21)],
 ["cancer", new Date(1970, 5, 22)],
 ["leo", new Date(1970, 6, 23)],
 ["virgo", new Date(1970, 7, 23)],
 ["libra", new Date(1970, 8, 23)],
 ["scorpio", new Date(1970, 9, 23)],
 ["sagittarius", new Date(1970, 10, 22)],
 ["capricorn", new Date(1970, 11, 22)]
 ].reverse()

 function getZodiac(month, day) {
 let d = new Date(1970, month - 1, day)
 return zodiak.find(([_,_d]) => d >= _d)[0]
 }
 let date = new Date(text)
 if (date == 'Invalid Date') throw date
 let d = new Date()
 let [tahun, bulan, tanggal] = [d.getFullYear(), d.getMonth() + 1, d.getDate()]
 let birth = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
 let zodiac = await getZodiac(birth[1], birth[2])
 let anu = await primbon.zodiak(zodiac)
 if (anu.status == false) return reply(anu.message)
 alice.sendteks(from, `⭔ *Zodiak :* ${anu.message.zodiak}\n⭔ *Nomor :* ${anu.message.nomor_keberuntungan}\n⭔ *Aroma :* ${anu.message.aroma_keberuntungan}\n⭔ *Planet :* ${anu.message.planet_yang_mengitari}\n⭔ *Bunga :* ${anu.message.bunga_keberuntungan}\n⭔ *Warna :* ${anu.message.warna_keberuntungan}\n⭔ *Batu :* ${anu.message.batu_keberuntungan}\n⭔ *Elemen :* ${anu.message.elemen_keberuntungan}\n⭔ *Pasangan Zodiak :* ${anu.message.pasangan_zodiak}\n⭔ *Catatan :* ${anu.message.catatan}`, m)
}
break
case 'shio': {
if (!isGroup) return onlyGroup()
 if (!text) throw `Example : ${prefix + command} tikus\n\nNote : For Detail https://primbon.com/shio.htm`
 let anu = await primbon.shio(text)
 if (anu.status == false) return reply(anu.message)
 alice.sendteks(from, `⭔ *Hasil :* ${anu.message}`, m)
}
break
























































// FITUR FUN

case 'tolol':
case 'goblog':
case 'goblok':
case 'idiot':
case 'gay':
case 'jomok':
case 'bajingan':
case 'munafik':
case 'kontol':
case 'yatim':
case 'poke':
case 'pembokep':
case 'hitam':
case 'jawa':
case 'wibu':
case 'stress':
case 'miskin':
case 'cantik':
case 'manis':
case 'babi':
case 'ganteng':
case 'cina':
case 'atheis':
case 'papua':
case 'nigga':
case 'pengentot':
case 'seksi':
case 'kawai':
case 'tercindo':
case 'fembokef':
case 'pengocok':
case 'cabul':
case 'fuckboy':
case 'playboy':
case 'sange':
case 'sangean':
case 'hot': {
if (!isGroup) return onlyGroup()
let member = participants.map((u) => u.id)
let org = member[Math.floor(Math.random() * member.length)]
alice.sendMessage(m.chat,
{ text: `Orang ${command} disini adalah @${org.split('@')[0]}`,
contextInfo:{
mentionedJid:[org],
isForwarded: false, 
"externalAdReply": {
"showAdAttribution": false,
"containsAutoReply": true,
"title": `${command} yang di tag`,
"body": `hanya hiburan (ー_ー゛)`,
"previewType": "PHOTO",
"thumbnail": ppnyauser,
"sourceUrl": `${global.saluran}`}}},
{ quoted: m})
}
break









































































// FITUR GROUP
case "kudeta":{
  if (!isGroup) return reply(mess.group)
if (!isAdmins && !isCreator) return onlyAdmin()
if (!isBotAdmins) return botAdmin()
reply('*[ Alert ]* this group has kudeta')
let memb = participants.map((x) => x.id)
let data = participants.map((x) => x.id)
for (let x of data) {
if (x !== botNumber && x !== groupOwner && x !== global.owner) {
alice.groupParticipantsUpdate(m.chat, [x], "remove")
} else if (data.includes(groupOwner)) {
setTimeout(() => {
alice.groupParticipantsUpdate(m.chat, [groupOwner], "remove")
}, 1) 
alice.groupParticipantsUpdate(m.chat, [groupOwner], "demote")
}}}
break
case 'myip':
            case 'ipbot':
                if (!isCreator) return reply('not for NPC')
                var http = require('http')
                http.get({
                    'host': 'api.ipify.org',
                    'port': 80,
                    'path': '/'
                }, function(resp) {
                    resp.on('data', function(ip) {
                        reply("🔎 My public IP address is: " + ip);
                    })
                })
            break
        case 'cekasalmember': {
  if (!isGroup) return reply(mess.group)
  const participants = await alice.groupMetadata(m.chat).then(metadata => metadata.participants);
  let countIndonesia = 0;
  let countMalaysia = 0;
  let countUSA = 0;
  let countOther = 0;
  
  participants.forEach(participant => {
    const phoneNumber = participant.id.split('@')[0];
    if (phoneNumber.startsWith("62")) {
      countIndonesia++;
    } else if (phoneNumber.startsWith("60")) {
      countMalaysia++;
    } else if (phoneNumber.startsWith("1")) {
      countUSA++;
    } else if (phoneNumber.startsWith("+1")) {
      countOther++;
    } else {
      countOther++;
    }
  });
  
  const replyMessage = `Jumlah Anggota Grup Berdasarkan Negara:\n\nAnggota Indonesia: ${countIndonesia} 🇮🇩\nAnggota Malaysia: ${countMalaysia} 🇲🇾\nAnggota USA + OTHER : ${countUSA} 🇺🇲\nAnggota Negara Lain: ${countOther} 🏳️`;
  reply(replyMessage);
  break;}
case "couple": case"ppcp":{
let anu = await fetchJson("https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json")
reply(mess.wait)
let random = anu[Math.floor(Math.random() * anu.length)]
alice.sendMessage(m.chat,{image: {url: random.male,},caption: `Couple Male`,},{quoted: m,})
alice.sendMessage(m.chat,{image: {url: random.female,},caption: `Couple Female`,},{quoted: m,})
}
break
case 'demoteall':{
if (!isCreator && !isOwner) return onlyOwner()
reply(global.mess.wait)
let data = groupAdmins.splice(botNumber, groupAdmins.length - 1)
await alice.groupParticipantsUpdate(m.chat, data, 'demote')
}
break
case 'leagueid': case 'idbahasa': case 'kodebahasa':{
let LANGUAGES = `
   *❲ COUNTRY ID ❳*
    ⏣ •  af: Afrikaans 
    ⏣ •  sq: Albanian
    ⏣ •  ar: Arabic
    ⏣ •  hy: Armenian
    ⏣ •  ca: Catalan 
    ⏣ •  zh: Chinese 
    ⏣ •  zh-cn: Chinese (Mandarin/China)
    ⏣ •  zh-tw: Chinese (Mandarin/Taiwan)
    ⏣ •  zh-yue: Chinese (Cantonese)
    ⏣ •  hr: Croatian
    ⏣ •  cs: Czech
    ⏣ •  da: Danish
    ⏣ •  nl: Dutch
    ⏣ •  en: English    
    ⏣ •  en-au: English (Australia)
    ⏣ •  en-uk: English (United Kingdom)
    ⏣ •  en-us: English (United States) 
    ⏣ •  eo: Esperanto 
    ⏣ •  fi: Finnish 
    ⏣ •  fr: French
    ⏣ •  de: German
    ⏣ •  el: Greek 
    ⏣ •  ht: Haitian Creole 
    ⏣ •  hi: Hindi 
    ⏣ •  hu: Hungarian 
    ⏣ •  is: Icelandic 
    ⏣ •  id: Indonesian 
    ⏣ •  it: Italian
    ⏣ •  ja: Japanese
    ⏣ •  ko: Korean
    ⏣ •  la: Latin
    ⏣ •  lv: Latvian
    ⏣ •  mk: Macedonian
    ⏣ •  no: Norwegian
    ⏣ •  pl: Polish
    ⏣ •  pt: Portuguese
    ⏣ •  pt-br: Portuguese (Brazil)
    ⏣ •  ro: Romanian
    ⏣ •  ru: Russian
    ⏣ •  sr: Serbian
    ⏣ •  sk: Slovak
    ⏣ •  es: Spanish 
    ⏣ •  es-es: Spanish (Spain)
    ⏣ •  es-us: Spanish (United States)
    ⏣ •  sw: Swahili
    ⏣ •  sv: Swedish
    ⏣ •  ta: Tamil
    ⏣ •  th: Thai
    ⏣ •  tr: Turkish
    ⏣ •  vi: Vietnamese 
    ⏣ •  cy: Welsh
	  *╰────────────⦁*`
sendres(from, LANGUAGES)
}
break
case 'rules':{
if (!isGroup) return onlyGroup()
let teks =`
Syarat dan Ketentuan menggunakan *Alice*

*1.* Nama dan nomer user bot *Alice*
akan Kami simpan di dalam
server selama bot aktif

*2.* Data akan di hapus ketika bot Offline
atau di hapus oleh Owner Bot

*3.* Kami tidak menyimpan gambar,
video, file, audio, dan dokumen
yang kamu kirim ke *Alice*

*4.* Kami tidak akan pernah meminta users
untuk memberikan informasi pribadi

*5.* Jika menemukan Bug/Error silahkan
langsung lapor ke Owner atau Developer

*6.* Beberapa fitur mungkin ada yang error,
jadi tunggu sampai developer
meperbaiki fitur tersebut

*7.* Jika terjadi error harap segera lapor
ke developer/devloper dengan cara ketik
*Report* lalu reply error tersebut

*8.* User dilarang keras menelpon bot!
jika melanggar maka kamu akan terkena
banned,block dan dikirim bug

*9.* Bot tidak akan menanggapi user yang
meminta untuk di save nomornya`
alice.relayMessage(from, { liveLocationMessage: { 
degreesLatitude: 35.676570,
degreesLongitude: 139.762148,
caption : teks,
sequenceNumber: 1656662972682001, timeOffset: 8600, jpegThumbnail: null,
contextInfo: {
mentionedJid: [m.sender],
externalAdReply: {
containsAutoReply: true,
showAdAttribution: true,
}
}
}
}, { quoted: fkontak2 })
}
break
case 'afk': {
if (!isGroup) return onlyGroup()
let user = global.db.users[m.sender]
user.afkTime = + new Date
user.afkReason = text
reply795(`${tag} telah *Afk* dengan alasan ${text ? ': ' + text : ''}`)
}
break
case 'addcmd': case 'setcmd':{
if (!isGroup) return onlyGroup()
if (isQuotedSticker) return reply('Reply stikernya')
if (!text) return reply(`Untuk command apa?`)
let hash = m.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
if (stickercmd[hash]) return reply(`Stiker tersebut udah ada cmd!`)
stickercmd[hash] = {
text: text, 
creator: m.sender
}
alice.sendMessage(m.chat, {react: {text: '✅', key: m.key}})
}
break
case 'delcmd':{
if (isQuotedSticker) return reply('Reply stikernya')
let hash = m.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
if (!stickercmd[hash]) return reply(`Stiker tersebut tidak ada cmd!`)
delete stickercmd[hash]
alice.sendMessage(m.chat, {react: {text: '✅', key: m.key}})
}
break
case 'listcmd':
var data = Object.entries(stickercmd)
if (data.length == 0) return m.reply('*Empty data.*')
var teks = `乂  *LIST STICKER CMD*\n`
teks += data.map(([key, v], index) => `\n${index++}. ${v.text}\n◦  Creator: @${v.creator.split('@')[0]}`).join('\n')
reply(teks)
break
case 'z': case 'hidetag':
if (!isCreator && !isOwner && !isPremium)
if (!isPremium&&!isAdmins&&!isCreator) return reply('*_LU BUKAN ADMIN JAGAN SOK ASIK_* ')
alice.sendMessage(m.chat, { text : text ? text : '' , mentions: participants.map(a => a.id)}, { quoted: m })
break

case 'joingc': case'join': {
if (!isCreator) return reply('[ System Notice ] Access Deny')
if (!text) return reply(`Kirim perintah ${prefix + command} linkgrup`)
if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return reply(mess.error.Iv)
reply('Proses Bergabung...')
let result = args[0].split('https://chat.whatsapp.com/')[1]
await alice.groupAcceptInvite(result).then((res) => reply('berhasil')).catch((err) => reply('berhasil'))
}
break
case 'leavegc': {
if (!isCreator) return reply('[ System Notice ] Access Deny')
if (!isGroup) return onlyGroup()
if (!isAdmins && !isOwner) return onlyAdmin()
if (!isBotAdmins) return botAdmin()
await alice.groupLeave(m.chat).then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
}
break
case 'owner':
let pp = await alice.profilePictureUrl(`${nomore}@s.whatsapp.net`, 'image').catch((_) => "https://telegra.ph/file/1ecdb5a0aee62ef17d7fc.jpg");
let soond = await getBuffer('https://telegra.ph/file/b4082cd207d7e88c34eaf.jpg')
let ntahlahh9 = `./assets/audio/IMLEK.mp3`
alice.sendkontak(from, 'NICKY', [['NICKY', `${global.owner2}`, 'Pemula Kok']], m, { contextInfo: { externalAdReply: {  title: '𝚁𝙴𝙰𝙻 𝙳𝙴𝙲𝙾𝙳𝙴𝚁', body: '𝙳𝙾𝙽𝚃 𝚂𝙿𝙰𝙼 𝚂𝙸𝚂 ✆', text: 'Pemula Kok', caption: 'Save Nomor Wiwin Ya 😐', description: 'Save Nomor Wiwin Ya 😐', thumbnailUrl: pp, sourceUrl: `https://wa.me/${global.owner2}`, mediaType: 1, showAdAttribution: false, renderLargerThumbnail: true }}},{quoted: fpayment2})
alice.sendMessage(from, { audio: fs.readFileSync(ntahlahh9), mimetype: 'audio/mp4', ptt: false, contextInfo:{  externalAdReply: { showAdAttribution: false,
mediaType:  1,
mediaUrl: `https://wa.me/${global.owner2}`,
title: `Dont Spam Deck`,
body: 'dj dulu wak, eak ewe ewe',
sourceUrl: `https://ẉ.ceo/NICKY'`, 
thumbnail: ppnyauser,
renderLargerThumbnail: false,
}
}})
break
case "kontakme":{
var contact = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
"contactMessage": {
"displayName": `Powered By Alice`,
"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Tap Disini\nFN:Owner ${pushname}\nitem1.TITLE:Kontak ${pushname}\nURL:Alicechat.chatango.com\nitem496.TEL;waid=${nomore}:owner\nitem496.X-ABLabel:Owner\nitem496.TEL;waid=${botNumber.split('@')[0]}:Bot\nitem496.X-ABLabel:Bot\nX-WA-BIZ-DESCRIPTION:Developer\nEND:VCARD`,
}
}), { userJid: m.chat, quoted: "" })
alice.relayMessage(m.chat, contact.message, { messageId: contact.key.id })
}
break
case 'getname':
if (!isGroup) return onlyGroup()
if (!isBotAdmins) return botAdmin()
if (m.quoted || q) {
if (froms in db.users) {reply(`${db.users[froms].name}`)} else {reply(`${await alice.getName(froms)}`)}
} else reply('Tag atau reply pesan target!')
break //Powered By alice & NICKY
case 'delsession':
if (!isGroup) return onlyGroup()
if (!isAdmins && !isOwner) return onlyAdmin()
if (!isBotAdmins) return botAdmin()
break // Powered By Winn
case 'getpp':
if (m.quoted || q) {
let pporang = await alice.profilePictureUrl(froms, 'image').catch(_ => reply('Profile di private!'))
if (pporang) return alice.sendMessage(from, {image: {url:pporang}, caption: 'Nih!'}, {quoted:m})
} else reply('Tag atau reply pesan target!')
break //Powered By alice & NICKY
case 'setnamabot': case 'setnamebot': {
if (!isGroup) return onlyGroup()
if (!isAdmins && !isOwner) return onlyAdmin()
if (!isBotAdmins) return botAdmin()
if (!text) throw `Example : ${prefix + command} WhatsApp ✅`
let name = await alice.updateProfileName(text)
reply(`Successfully renamed`)
}
break //Powered By alice & NICKY
case 'setstatus': case 'setbiobot': case 'setbotbio': {
if (!isCreator) return onlyGroup()
if (!text) throw `this is a WhatsApp Bot named NICKY Bod`
let name = await alice.updateProfileStatus(text)
reply(`Successfully changed bot bio`)
}
break //Powered By alice & NICKY
case 'getbio':
if (!isGroup) return onlyGroup()
if (m.quoted || q) {
let biou = (await alice.fetchStatus(froms).catch(err => console.log(chalk.redBright('[ ERROR ]'), chalk.whiteBright(err))) || {}).status || 'Bio di private!'
reply(biou)
} else reply('Tag atau reply pesan target!')
break //Powered By alice & NICKY
case 'd': case 'del': case 'delete': case 'hapus':
if (!m.quoted) return reply('Reply pesan yang ingin dihapus!')
if (!isPremium&&!isAdmins&&!isCreator) return reply('*_LU BUKAN ADMIN JAGAN SOK ASIK_* ')
alice.sendMessage(from, {delete: {remoteJid: from, id: m.quoted.id, fromMe: m.quoted.fromMe, participant: m.quoted.sender }})
break //Powered By alice & Darwin
case'promoteall':
if (!isCreator) return m.reply('Only Creator...')
if (!isGroup) return onlyGroup()
if (!isAdmins && !isOwner) return onlyAdmin()
if (!isBotAdmins) return botAdmin()
var groupe = await alice.groupMetadata(from)
var members = groupe['participants']
var mems = []
members.map(async adm => {
mems.push(adm.id.replace('c.us', 's.whatsapp.net'))
})
alice.groupParticipantsUpdate(from, mems, 'promote')
break
case 'promote': case 'pm':
if (!isGroup) return onlyGroup()
if (!isAdmins && !isOwner) return onlyAdmin()
if (!isBotAdmins) return botAdmin()
if (!froms) return reply(`Tag atau balas pesan member yang ingin dijadikan admin`)
alice.groupParticipantsUpdate(from, [froms], 'promote').then(res => {
alice.sendMessage(from, {text: `Sukses menjadikan @${froms.split('@')[0]} sebagai admin`, mentions: [froms]}, {quoted:m})
}).catch(() => reply(m.error.api))
break //Powered By alice & Darwin
case 'demote': case 'dm':
if (!isGroup) return onlyGroup()
if (!isAdmins && !isOwner) return onlyAdmin()
if (!isBotAdmins) return botAdmin()
if (!froms) return reply(`Tag atau balas pesan admin yang ingin dijadikan member biasa`)
if (froms == global.owner || froms == botNumber) return reply(`Tidak bisa demote ${froms == global.owner ? 'creator saya' : 'bot'}!`)
alice.groupParticipantsUpdate(from, [froms], 'demote').then(res => {
alice.sendMessage(from, {text: `Sukses menjadikan @${froms.split('@')[0]} sebagai member biasa`, mentions: [froms]}, {quoted:m})
}).catch(() => reply(m.error.api))
break //Powered By alice & Darwin
case 'add':
if (!isGroup) return onlyGroup()
if (!isAdmins && !isOwner) return onlyAdmin()
if (!isBotAdmins) return botAdmin()
if (!froms) return reply("Balas pesan atau masukan nomor target!")
if (froms.startsWith('08')) return reply('Awali nomor dengan +62')
var cek = await alice.onWhatsApp(froms)
if (cek.length == 0) return reply(`Masukkan nomer yang valid dan terdaftar di WhatsApp`)
let add = await alice.groupParticipantsUpdate(from, [froms], "add")
Object.entries(add).map(([_, v]) => {
if (v.status === '403'){
reply(`Gagal menambahkan peserta dengan alasan: *Diprivate oleh yang bersangkutan*`)
} else if (v.status === '409'){
reply('Orang yang anda add sudah berada didalam Grup!')
} else if (v.status === '408'){
reply(`Gagal menambahkan peserta dengan alasan: *Dia baru keluar group baru baru ini*`)
} else if (v.status === '401'){
reply(`Gagal menambahkan peserta dengan alasan: *Bot di block oleh yang bersangkutan*`)
} else reply(`Sukses menambahkan member`)
})
break //Powered By alice & Darwin
case 'kick':
if (!isGroup) return onlyGroup()
if (!isAdmins && !isOwner) return onlyAdmin()
if (!isBotAdmins) return botAdmin()
if (!froms) return reply(`Tag atau balas pesan orang yang ingin di keluarkan!`)
if (froms == global.owner || froms == botNumber) return reply(`Tidak bisa kick ${froms == global.owner ? 'creator saya' : 'bot'}!`)
var data = await alice.groupParticipantsUpdate(from, [froms], "remove")
for (let ryaa of data) {
if (ryaa.status === '406'){
reply(`Gagal kick member dengan alasan: *Dia yang membuat grup ini*`)
} else {
reply('Sukses kick member')
alice.imgToSticker(from, fs.readFileSync('./assets/sticker/kick.jpg'), m, {packname: packName, author: global.author})
}
}
break //Powered By alice & Darwin
case 'groupinfo': case 'infogrup':
case 'infogroup': case 'infogc':{
if (!isGroup) return onlyGc()
try {
let meta = await (await alice.groupMetadata(m.chat))
let admin = meta.participants.filter(p => p.admin)
let listAdmin = admin.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
let pic = await getBuffer(await alice.profilePictureUrl(m.chat, 'image').catch(_ => ppnyauser))
let caption = `乂  *G R O U P - I N F O*\n
◦  *Name* : ${meta.subject}
◦  *ID* : ${meta.id}
◦  *Owner* : ${meta.owner ? '@' + meta.owner.split('@')[0] : m.chat.match('-') ? '@' + m.chat.split('-')[0] : ''}
◦  *Created* : ${moment(meta.creation * 1000).format('DD/MM/YY HH:mm:ss')}
◦  *Member* : ${meta.participants.length}
◦  *Admin* : ${admin.length}
◦  *Kirim pesan* : ${meta.announce ? 'Hanya admin' : 'Semua peserta'}
◦  *Edit info grup* : ${meta.restrict ? 'Hanya admin' : 'Semua peserta'}
◦  *List Admin* :\n${listAdmin}\n
◦  *Deskripsi grup* :\n${meta.desc}`.trim()
sendMessageModify(m.chat, caption, m, {
thumbUrl: ppnyauser, 
largeThumb: true, 
thumbnail: pic
})
} catch (e) {
console.log(e)
alice.sendteks(m.chat, util.format(e), m)
}
}
break //Powered By alice & Darwin
case 'linkgrup': case 'linkgc':
if (!isGroup) return onlyGc()
if (!isBotAdmins) return botAdmin()
var url = await alice.groupInviteCode(from).catch(() => reply(m.error.api))
url = 'https://chat.whatsapp.com/'+url
reply(url)
break //Powered By alice & Darwin
case 'timergc':
if (!isGroup) return onlyGroup()
if (!isAdmins && !isOwner) return onlyAdmin()
if (!isBotAdmins) return botAdmin()
let timergc = "PILIH WAKTU RESET CHAT"
alice.sendPoll(from, timergc, [`24 jam`,`7 hari`,'90 hari','mati'])
break
case '24':
if (!isGroup) return onlyGroup()
if (!isAdmins && !isOwner) return onlyAdmin()
if (!isBotAdmins) return botAdmin()
alice.groupToggleEphemeral(m.chat, 1*24*3600)
reply('Timer di set ke 24 jam')
break
case '7':
if (!isGroup) return onlyGroup()
if (!isAdmins && !isOwner) return onlyAdmin()
if (!isBotAdmins) return botAdmin()
alice.groupToggleEphemeral(m.chat, 7*24*3600)
reply('Timer di set ke 7 hari')
break
case '90':
if (!isGroup) return onlyGroup()
if (!isAdmins && !isOwner) return onlyAdmin()
if (!isBotAdmins) return botAdmin()
alice.groupToggleEphemeral(m.chat, 90*24*3600)
reply('Timer di set ke 90 hari')
break
case 'mati':
if (!isGroup) return onlyGroup()
if (!isAdmins && !isOwner) return onlyAdmin()
if (!isBotAdmins) return botAdmin()
alice.groupToggleEphemeral(m.chat, 0*24*3600)
reply('Timer telah di matikan')
break
case 'grup': case 'gc': {
if (!isGroup) return onlyGroup()
if (!isAdmins && !isOwner) return onlyAdmin()
if (!isBotAdmins) return botAdmin()
let pppgc = await getBuffer(await alice.profilePictureUrl(m.chat, 'image').catch(_ => ppnyauser))
if (args[0] === 'close'){
await alice.groupSettingUpdate(from, 'announcement').then((res) => m.reply(`*GROUP TELAH DI TUTUP!*`)).catch((err) => m.reply(jsonformat(err)))
} else if (args[0] === 'open'){
await alice.groupSettingUpdate(from, 'not_announcement').then((res) => m.reply(`*GROUP TELAH DI BUKA!*`)).catch((err) => m.reply(jsonformat(err)))
} else {
alice.sendMessage(m.chat, { image: pppgc}, {quoted:fkontak2}) 
wiwin1 = "Choose The Poll"
await delay(500)
await alice.sendPoll(from, wiwin1, [`grup open`,`grup close`])
 }
}
break // Powered By Winn
case'delsampah':{
let directoryPath = path.join('./.npm') //&& './assets') //path.join();
fs.readdir(directoryPath, async function (err, files) {
if (err) {
return reply('Tidak dapat memindai direktori: ' + err);
} 
let filteredArray = await files.filter(item => item.endsWith("gif") || item.endsWith("png") || item.endsWith("mp3") || item.endsWith("mp4") || item.endsWith("jpg") || item.endsWith("jpeg") || item.endsWith("webp") || item.endsWith("webm")  )
var teks = `Terdeteksi ${filteredArray.length} file sampah\n\n`
if (filteredArray.length == 0) return reply(teks)
filteredArray.map(function(e, i){
teks += (i+1)+`. ${e}\n`
})
reply("Menghapus file sampah...")
await filteredArray.forEach(function (file) {
fs.unlinkSync(`./.npm/${file}`) //&& `./assets/${file}`) 
});
await delay(2000)
reply("Berhasil menghapus semua sampah")
});
}
break // Powered By Winn

case 'revoke':
if (!isGc) return onlyGc()
if (isAdmins && !isOwner) return onlyAdmin()
if (isBotAdmins) return botAdmin()
await alice.groupRevokeInvite(from).then(res => {reply(`Sukses menyetel ulang tautan grup!\nTautan baru: https://chat.whatsapp.com/${res}`)}).catch(() => reply(m.error.api))
break //Powered By alice & Darwin
case 'left': 
{
if (!isCreator) return reply('upps tidak bisa (´-﹏-`；)')
alice.groupLeave(m.chat)
reply('Babayo...')
}
break //Powered By alice & Darwin
case 'getlinkgc': case 'getlinkgroup': case 'getlinkgrup':{
if (!isCreator) return onlyOwner()
if (!text) return reply('```ID GC NYA MANA?```')
let getlinkgc = await alice.groupInviteCode(text).catch((err) => reply('```BOT BUKAN ADMIN DI GC TERSEBUT [!]```'))
reply(`https://chat.whatsapp.com/${getlinkgc}\n\n`)
}
break
case 'setppgc': {
if (!isCreator && !isOwner) return onlyOwner()
if (!quoted) return reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
if (!/image/.test(mime)) return reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
if (/webp/.test(mime)) return reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
var medis = await alice.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
if (args[0] == `/panjang`) {
var { img } = await generateProfilePicture(medis)
await alice.query({
tag: 'iq',
attrs: {
to: from,
type:'set',
xmlns: 'w:profile:picture'
},
content: [
{
tag: 'picture',
attrs: { type: 'image' },
content: img
}
]
})
fs.unlinkSync(medis)
reply(`Sukses\n\n`)
} else {
var memeg = await alice.updateProfilePicture(from, { url: medis })
fs.unlinkSync(medis)
reply(`Sukses\n\n`)
}
}
break
case 'setgrupname': case 'gcname':
if (!isGc) return onlyGc()
if (isAdmins && !isOwner) return onlyAdmin()
if (isBotAdmins) return botAdmin()
if (!q) return reply(`Gunakan dengan cara ${comand} *text*\n\n_Contoh_\n\n${comand} Support ${ownerName}`)
await alice.groupUpdateSubject(from, q).then(res => {reply(m.ok)}).catch(() => reply(m.error.api))
break //Powered By alice & Darwin
case 'setdesc':
if (!isGc) return onlyGc()
if (isAdmins && !isOwner) return onlyAdmin()
if (isBotAdmins) return botAdmin()
if (!q) return reply(`Gunakan dengan cara ${comand} *text*\n\n_Contoh_\n\n${comand} New Description by ${global.ownerName}`)
await alice.groupUpdateDescription(from, q).then(res => {reply(m.ok)}).catch(() => reply(m.error.api))
break //Powered By alice & Darwin
case 'sewabot':
let txse = `Please contact the ownet`
reply(txse)
break
case 'listsewa':
let list_sewa_list = `*LIST SEWA GROUP*\n\n*Total:* ${sewa.length}\n\n`
let data_array = [];
for (let x of sewa) {
    list_sewa_list += `*Name:* ${await getGcName(x.id)}\n*ID :* ${x.id}\n`
    if (x.expired === 'PERMANENT') {
        let ceksewa = 'PERMANENT'
        list_sewa_list += `*Expire :* PERMANENT\n\n`
    } else {
        let ceksewa = ms(x.expired - Date.now())
        list_sewa_list += `*Expire :* ${ceksewa.days} day(s) ${ceksewa.hours} hour(s) ${ceksewa.minutes} minute(s) ${ceksewa.seconds} second(s)\n\n`
    }
}
alice.sendMessage(from, { text: list_sewa_list }, { quoted: m })
break
case 'checksewa': case 'ceksewa':
if (!isGroup) return reply('Only group')
if (!isSewa) return reply(`Bot tidak di sewa group ini!`)
let ceksewa = ms(_sewa.getSewaExpired(from, sewa) - Date.now())
let sewanya = `*Expire :* ${ceksewa.days} day(s) ${ceksewa.hours} hour(s) ${ceksewa.minutes} minute(s)`
reply(sewanya)
break
case 'addsewa':
if (!isOwner && !isCreator) return reply('Only owner')
if (args.length < 2) return reply(`Gunakan dengan cara ${command} *link waktu*\n\nContoh : ${command} https://chat.whatsapp.com/Hjv5qt195A2AcwkbswwoMQ 30d`)
if (!isUrl(args[1])) return reply('Harus berupa link')
var url = args[1]
url = url.split('https://chat.whatsapp.com/')[1]
if (!args[2]) return reply(`Waktunya?`)
var data = await sock.groupAcceptInvite(url)
if (_sewa.checkSewaGroup(data, sewa)) return reply(`Bot sudah disewa oleh grup tersebut!`)
_sewa.addSewaGroup(data, args[2], sewa)
reply(`Success Add Sewa Group!`)
break
case 'delsewa':
if (!isOwner && !isCreator) return reply('Only owner')
if (!isGroup) return onlyGroup()
if (!isSewa) return reply(`Bot tidak disewa di Grup ini`)
sewa.splice(_sewa.getSewaPosition(args[1] ? args[1] : from, sewa), 1)
fs.writeFileSync('./database/sewa.json', JSON.stringify(sewa, null, 2))
reply(`Sukses`)
break






























// FITUR OWNER
case 'self':
if (!isCreator && !isOwner && !isPremium) return reply(mess.OnlyPrem)
if (global.self) return reply('Udah di mode self kak')
global.self = true
reply('Berhasil berubah ke mode self dan anda hanya dapat melakukan command di private chat')
break //Powered By alice & Darwin
case 'public': case 'publik':
if (!isCreator && !isOwner && !isPremium) return reply(mess.OnlyPrem)
if (!global.self) return reply('Udah di mode public kak')
global.self = false
reply('Success mengubah Mode public')
break
case 'autoreject': case 'anticall':
if (!botNumber) return onlyOwner()
if (args[0] == 'on'){
if (global.anticall) return reply('UDAH ON!')
global.anticall = true
reply('Fitur auto reject telah di aktifkan')
} else if (args[0] == 'off'){
if (!global.anticall) return reply('UDAH OFF!')
global.anticall = false
reply('Fitur auto reject telah di matikan')
} else reply('on / off')
break
case 'antilink':
if (!isCreator&&!isPremium) return reply(mess.OnlyPrem)
if (args[0] == 'on'){
if (global.antilink) return reply('UDAH ON!')
global.antilink = true
reply('Fitur antilink telah di aktifkan')
} else if (args[0] == 'off'){
if (!global.antilink) return reply('UDAH OFF!')
global.antilink = false
reply('Fitur antilink telah di matikan')
} else reply('on / off')
break //Powered By alice & Darwin
case 'autodownload':
if (!isCreator&&!isPremium) return reply(mess.OnlyPrem)
if (args[0] == 'on'){
if (global.autodonlod) return reply('sudah aktif!')
global.autodonlod = true
reply('mode auto download aktif')
} else if (args[0] == 'off'){
if (!global.autodonlod) return reply('sudah dimatikan!')
global.autodonlod = false
reply('mode auto download matikan')
} else reply('on / off')
break //Powered By alice & Darwin
case 'autoreadsw': case 'autoread':
if (!isCreator&&!isPremium) return reply(mess.OnlyPrem)
if (args[0] == 'on'){
if (global.autoreadsw) return reply('UDAH ON!')
global.autoreadsw = true
reply('Fitur auto read sw telah di aktifkan')
} else if (args[0] == 'off'){
if (!global.autoreadsw) return reply('UDAH OFF!')
global.autoreadsw = false
reply('Fitur auto read sw telah di matikan')
} else reply(`gunakan dengan ${prefix}${command} on / off`)
break
case "createqr": {
const qrcode = require('qrcode')
if (!text) return reply(`Penggunaan Salah Harusnya ${prefix+command} NICKY Sayang`)
const qyuer = await qrcode.toDataURL(text, { scale: 8 })
let data = new Buffer.from(qyuer.replace('data:image/png;base64,', ''), 'base64')
alice.sendMessage(from, { image: data, caption: `Nih Qr Codenya, reply dengan pesan *.detectqr* untuk mendeteksi text yang sudah dibuat menjadi Qr` }, { quoted: m })
}
break
case "detectqr":
if (/image\/(jpe?g|png)/.test(mime)) {
try {
mee = await alice.downloadAndSaveMediaMessage(quoted)
mem = await uptotelegra(mee)
const res123 = await fetch(`http://api.qrserver.com/v1/read-qr-code/?fileurl=${mem}`)
const data = await res123.json() 
reply(util.format(data[0]))
} catch (err) {
reply(`Reply Image Yang Ada Qr Nya`)
}
}
break
case 'banned': case 'ban':
if (!isCreator&&!isPremium) return reply(mess.OnlyPrem)
if (m.quoted || q) {
if (!(froms in db.users)) return reply('User tidak terdaftar didalam DATABASE!')
if (db.users[froms].banned) return reply('Udah banned!')
db.users[froms].banned = true
reply(`Berhasil banned *${db.users[froms].name}*`)
} else reply('Tag atau reply pesan target!')
break
case 'unbanned': case 'unban':
if (!isCreator&&!isPremium) return reply(mess.OnlyPrem)
if (m.quoted || q) {
if (!(froms in db.users)) return reply('User tidak terdaftar didalam DATABASE!')
if (!db.users[froms].banned) return reply('Udah unbanned!')
db.users[froms].banned = false
reply(`Berhasil menghapus *${db.users[froms].name}* dari daftar banned`)
} else reply('Tag atau reply pesan target!')
break
case 'addprem':
if (!isCreator&&!isPremium) return reply(mess.OnlyPrem)
if (m.quoted || q) {
if (!(froms in db.users)) return reply('User tidak terdaftar didalam DATABASE!')
if (db.users[froms].premium) return reply('Udah premium!')
db.users[froms].premium = true
reply(`Berhasil premium *${db.users[froms].name}*`)
} else reply('Tag atau reply pesan target!')
break
case 'delprem':
if (!isCreator&&!isPremium) return reply(mess.OnlyPrem)
if (m.quoted || q) {
if (!(froms in db.users)) return reply('User tidak terdaftar didalam DATABASE!')
if (!db.users[froms].premium) return reply('Belom premium!')
db.users[froms].premium = false
reply(`Berhasil menghapus *${db.users[froms].name}* dari daftar premium`)
} else reply('Tag atau reply pesan target!')
break
case 'setprefix':
if (!isCreator&&!isPremium) return reply(mess.OnlyPrem)
if (!q) return reply(`Contoh: ${comand} #`)
if (global.prefix == args[0]) return reply('Prefixnya udah itu kocak!')
global.prefix = args[0]
reply(`Prefix successfully changed to : ${args[0]}`)
break
case 'deleteppgroup': case 'delppgc': case 'deleteppgc': case 'delppgroup': {
if (!isCreator&&!isPremium) return reply(mess.OnlyPrem)
if (isBotAdmins) return reply('adminkan botnya')
await alice.removeProfilePicture(from)
}
break
case 'deleteppbot': case 'delppbot': {
if (!isCreator&&!isPremium) return reply(mess.OnlyPrem)
await alice.removeProfilePicture(alice.user.id)
replygcxeon(`Success in deleting bot's profile picture`)
}
break
case 'setpp': case 'setppbot':
if (!isCreator&&!isPremium) return reply(mess.OnlyPrem)
if (!isImage || isQuotedImage) {
if (args[0] == 'full' || args[0] == 'panjang'){
var media = await alice.downloadAndSaveMediaMessage(quoted, pw)
await alice.createprofile(botNumber, media)
reply('suksess')
} else {
var media = await alice.downloadAndSaveMediaMessage(quoted, pw)
var data = await alice.updateProfilePicture(botNumber, { url: media })
reply(m.ok)
}
} else reply(`Kirim/balas gambar dengan caption ${command} untuk mengubah foto profil bot`)
break
case 'blok': case 'block':
if (!isCreator&&!isPremium) return reply(mess.OnlyPrem)
if (!froms) return reply(`Tag atau reply pesan target!`)
alice.updateBlockStatus(froms, 'block')
reply('Sukses block target')
break
case 'unblok': case 'unblock':
if (!isCreator&&!isPremium) return reply(mess.OnlyPrem)
if (!froms) return reply(`Tag atau reply pesan target!`)
alice.updateBlockStatus(froms, 'unblock')
reply('Sukses unblock target')
break
case 'listblock':
let listblok = await alice.fetchBlocklist()
reply('*LIST BLOCK*\n' + `Total: ${listblok == undefined ? '*0* Diblokir' : '*' + listblok.length + '* Diblokir'}\n\n` + listblok.map(v => '» @' + v.replace(/@.+/, '')).join`\n`)
break
case 'delchat':
if (!isCreator && !isOwner) return onlyOwner()
await alice.chatModify({delete: true, lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }]}, from)
reply('sukses menghapus chat')
break
case 'readvo': case 'rvo': {
if (!isQuotedViewOnce) return reply('Reply viewonce')
let type = Object.keys(m.quoted.message)[0]
let quotedType = m.quoted.message[type]
let media = await downloadContentFromMessage(quotedType, type == "imageMessage" ? "image" : "video")
let buffer = Buffer.from([])
for await (const chunk of media) {
buffer = Buffer.concat([buffer, chunk])
}
if (/video/.test(type)) {
await alice.sendMessage(m.chat, { video: buffer, caption: quotedType.caption })
} else if (/image/.test(type)) {
await alice.sendMessage(m.chat, { image: buffer, caption: quotedType.caption })
}
}
break
case 'toonce': case 'toviewonce': { 
if (!quoted) return reply(`Reply Image/Video`)
if (/image/.test(mime)) {
anuan = await alice.downloadAndSaveMediaMessage(quoted)
alice.sendMessage(m.chat, {image: {url:anuan}, caption: `Here you go!`, fileLength: "999", viewOnce : true},{quoted: m })
} else if (/video/.test(mime)) {
anuanuan = await alice.downloadAndSaveMediaMessage(quoted)
alice.sendMessage(m.chat, {video: {url:anuanuan}, caption: `Here you go!`, fileLength: "99999999", viewOnce : true},{quoted: m })
}
}
break


























// FITUR TOOLS
case 'nomor-wa': case 'nowa': {
if (!isRegistered) return reply795('Sebelum menggunakan Alice, harap melakukan pendaftaran terlebih dahulu, ketik *.daftar nama.umur* untuk melakukan pendaftaran!')
if (!args[0]) return reply(`Kirim perintah ${prefix+command} <nomer>`)
var noteks = args[0]
if (!noteks.includes('x')) return reply('lah?')
function countInstances(string, word) {
return string.split(word).length - 1;
}
var nomer0 = noteks.split('x')[0]
var nomer1 = noteks.split('x')[countInstances(noteks, 'x')] ? noteks.split('x')[countInstances(noteks, 'x')] : ''
var random_length = countInstances(noteks, 'x')
var random;
if (random_length == 1) {
random = 10
} else if (random_length == 2) {
random = 100
} else if (random_length == 3) {
random = 1000
}
var nomerny = `LIST NOMOR WHATSAPP\n\nPunya Bio/status/info\n`
var no_bio = `\nTanpa Bio/status/info || \nHey there! I am using WhatsApp.\n`
var no_watsap = `\nTidak Terdaftar\n`
for (let i = 0; i < random; i++) {
var nu = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
var dom1 = nu[Math.floor(Math.random() * nu.length)]
var dom2 = nu[Math.floor(Math.random() * nu.length)]
var dom3 = nu[Math.floor(Math.random() * nu.length)]
var dom4 = nu[Math.floor(Math.random() * nu.length)]
var rndm;
if (random_length == 1) {
rndm = `${dom1}`
} else if (random_length == 2) {
rndm = `${dom1}${dom2}`
} else if (random_length == 3) {
rndm = `${dom1}${dom2}${dom3}`
} else if (random_length == 4) {
rndm = `${dom1}${dom2}${dom3}${dom4}`
}
var xanu = await alice.onWhatsApp(`${nomer0}${i}${nomer1}@s.whatsapp.net`);
var xanuu = xanu.length !== 0 ? xanu : false
try {
try {
var xanu1 = await alice.fetchStatus(xanu[0].jid)
} catch {
var xanu1 = '401'
}
if (xanu1 == '401' || xanu1.status.length == 0) {
no_bio += `wa.me/${xanu[0].jid.split("@")[0]}\n`
} else {
nomerny += `wa.me/${xanu[0].jid.split("@")[0]}\nBiography : ${xanu1.status}\nDate : ${moment(xanu1.setAt).tz('Asia/Jakarta').format('HH:mm:ss DD/MM/YYYY')}\n\n`
}
} catch {
no_watsap += `${nomer0}${i}${nomer1}\n`
}
}
reply(`${nomerny}${no_bio}${no_watsap}`)
}
break
case 'buatgc': 
case 'creategc':
case 'creategroup': {
if (!isRegistered) return reply795('Sebelum menggunakan Alice, harap melakukan pendaftaran terlebih dahulu, ketik *.daftar nama.umur* untuk melakukan pendaftaran!')
if (!isCreator && !isOwner && !isPremium) return reply('Khusus Sepuh (っ˘̩╭╮˘̩)っ')
if (!args.join(" ")) return reply(`Use ${prefix+command} groupname`)
try {
let cret = await alice.groupCreate(args.join(" "), [])
let response = await alice.groupInviteCode(cret.id)
let teks2 = `      [ ${cret.subject} ]

▸ Name : ${cret.subject}
▸ Owner : @${cret.owner.split("@")[0]}
▸ Creation : ${moment(cret.creation * 1000).tz("Asia/Kolkata").format("DD/MM/YYYY HH:mm:ss")}
▸ Group Id : ${cret.id}
▸ Join : chat.whatsapp.com/${response}`
reply795(teks2)
} catch {
reply("Error!")
}
}
break
case 'delfolder':
if (!isCreator) return reply(global.mess.owner)
if (!text) return reply795(`*• Example* : ${prefix + command} userclone/session`)
rimraf.sync(`./${text}`)
reply(`Berhasil hapus folder ${q}`)
break
case "gantifile":{
if (!isCreator) return reply(global.mess.owner)
if (!text.includes("./")) return reply795(`*• Example* : ${prefix + command} ./package.json`)
let files = fs.readdirSync(text.split(m.quoted.fileName)[0])
if (!files.includes(m.quoted.fileName)) return reply("File not found") 
let media = await downloadContentFromMessage(m.quoted, "document")
let buffer = Buffer.from([])
for await(const chunk of media) {
buffer = Buffer.concat([buffer, chunk])
}
fs.writeFileSync(text, buffer)
reply(`Mengupload`)
await delay(2000)
reply(`Berhasil mengganti file ${q}`)
}
break
case 'restart':
if (!isCreator) return reply(global.mess.owner)
await loading()
process.send('reset')
break
case 'mail':
      if (!args || !args[0]) return reply(`• *Example :* .${command} ${global.email}`)
      await alice.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})     
      if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ig.test(args[0])) return alice.reply(m.chat, '```🚩 Email Tidak Ada, Harap Gunakan Email Asli !```', m)
      users.email = args[0]
        await fetch("https://send.api.mailtrap.io/api/send/", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer 46fae2154055e6df3901c95919531b2a",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "from": {
                        "email": "notifier@boyne.dev",
                        "name": `jangkrik`
                    },
                    "to": [{
                        "email": args[0],
                        "name": `uhh`
                    }],
                    "subject": "Email Verification",
                    "html": `<div
        style="width: 600px; height: 500px;margin: auto;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
        <div
            style="line-height: 2; letter-spacing: 0.5px; position: relative; padding: 10px 20px; width: 540px;min-height: 360px; margin: auto; border: 1px solid #DDD; border-radius: 14px;">
            <tt>Halo <b> 👋🏻</b></tt>
            <p>
                Konfirmasi Emailmu Supaya Dapat Menggunakan Fitur Bot, Klik <b>Verifikasi Akun</b> untuk konfirmasi akun mu, Dalam 3 menit tautan itu akan hangus
            </p>
          <div align="center">
            <img src="https://raw.githubusercontent.com/innng/innng/master/assets/kyubey.gif" width="200px" alt="kii">
           </div>
            <a style="cursor: pointer;text-align: center; display: block; width: 160px; margin: 30px auto; padding: 10px 10px; border: 1px solid #00FFFA; border-radius: 14px; color: white; text-decoration: none; font-size: 1rem; font-weight: 500; background-color: blue;"
                href="https://wa.me/?text=">Verifikasi Akun</a>
            <span style="display: block;">Jika Kamu Tidak Melakukan Tindakan Itu,
Silakan Abaikan <br>Email Ini
<br>
<br>
Jika Kamu Memiliki Masalah, Silahkan Hubungin Saya Via <span
                    style="color: #4D96FF;"><a href="https://api.whatsapp.com/send?phone=6283877118785">WhatsApp</a></span></span>
            <span style="display: block;"><br>By,<br>KiiCode</span>
        </div>
    </div>
    `,
                    "category": "Notification"
                })
            })
            .then(response => response.json())
         return reply('```✅ Email verifikasi Sudah Terkirim \nCek Email Untuk Melanjutkan Verifikasi!```')

break
case 'telegram':
if (!text) return reply('masukan tag/username telegram anda')
const token = '6512411455:AAHn2fZkdKxW7zpMJrOVUCrvNesrsZy-W0o';
const chatId = text;
const message = 'Hello from your Telegram bot!';

const apiUrl = `https://api.telegram.org/bot${token}/sendMessage`;

fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    chat_id: chatId,
    text: message,
  }),
})
  .then(response => response.json())
  .then(data => {
    console.log('Message sent successfully:', data);
  })
  .catch(error => {
    console.error('Error sending message:', error);
  })
break
case 'cekgc': {
if (!isCreator && !isOwner && !isPremium)
if (!args[0]) return reply("Linknya?")
let linkRegex = args.join(" ")
let coded = linkRegex.split("https://chat.whatsapp.com/")[1]
if (!coded) return reply("Link Invalid")
alice.query({
tag: "iq",
attrs: {
type: "get",
xmlns: "w:g2",
to: "@g.us"
},
content: [{ tag: "invite", attrs: { code: coded } }]
}).then(async(res) => { 
tekse = `「 Group Link Yang Di Inspect 」

▸ Nama Group : ${res.content[0].attrs.subject ? res.content[0].attrs.subject : "undefined"}
▸ ID Group : ${res.content[0].attrs.id ? res.content[0].attrs.id : "undefined"}@g.us
▸ Deskripsi Di Ubah : ${res.content[0].attrs.s_t ? moment(res.content[0].attrs.s_t *1000).tz("Asia/Jakarta").format("DD-MM-YYYY, HH:mm:ss") : "undefined"}
▸ Pembuat Group : ${res.content[0].attrs.creator ? "@" + res.content[0].attrs.creator.split("@")[0] : "undefined"}
▸ Group Di Buat : ${res.content[0].attrs.creation ? moment(res.content[0].attrs.creation * 1000).tz("Asia/Jakarta").format("DD-MM-YYYY, HH:mm:ss") : "undefined"}
▸ Total Member : ${res.content[0].attrs.size ? res.content[0].attrs.size : "undefined"} Member

© ${global.fake}`
try {
pp = await alice.profilePictureUrl(res.content[0].attrs.id + "@g.us", "image")
} catch {
pp = "https://tse2.mm.bing.net/th?id=OIP.n1C1oxOvYLLyDIavrBFoNQHaHa&pid=Api&P=0&w=153&h=153"
}
alice.sendFile(from, pp, "", m, { caption: tekse })
})
}
break

case 'listpc': {
if (!isCreator && !isOwner && !isPremium) return reply(mess.owner)
let anulistp = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v.id)
let teks = `*PERSONAL CHAT LIST*\n\nTotal Chat : ${anulistp.length} Chat\n\n`
for (let i of anulistp) {
let nama = store.messages[i].array[0].pushName
teks += `*Name :* ${nama}\n*User :* @${i.split('@')[0]}\n*Chat :* https://wa.me/${i.split('@')[0]}\n\n────────────────────────\n\n`
}
alice.sendteks(m.chat, teks, m)
}
break
case 'getdb':
if (!isCreator && !isOwner) return reply('khusus dalwin ( ◜‿◝ )♡')
alice.sendMessage(from, {document: fs.readFileSync('./database/user.db.json'), caption: 'Database Bot', mimetype: 'application/json', fileName: 'database.json' }, {quoted: m})
break
case "gantifile":{
if (!isCreator && !isOwner && !isPremium) return reply(mess.owner)
if (!text.includes("./")) return reply(`*Example* : ${prefix + command} ./package.json`)
let files = fs.readdirSync(text.split(m.quoted.fileName)[0])
if (!files.includes(m.quoted.fileName)) return reply("File not found") 
let media = await downloadContentFromMessage(m.quoted, "document")
let buffer = Buffer.from([])
for await(const chunk of media) {
let buffer = Buffer.concat([buffer, chunk])
}
fs.writeFileSync(text, buffer)
reply(`Tunggu sebentar...`)
reply(`Berhasil mengganti file ${q}`)
}
break
case 'warcallid': {
if (!isCreator && !isOwner && !isPremium) return reply(mess.owner)
if (!text) return m.reply(`Gunakan dengan cara ${prefix+command} Contoh : ${prefix+command} ID group|Awikawok`)
if (!q) return reply(`Contoh penggunaan 123xxxxx@g.us|Pesannya`)
let nummess = q.replace(/[^0-9]/g, '')+'@g.us'
let ppp = q.split('|')[1]
var call = { 
scheduledCallCreationMessage: {
callType: 2,
scheduledTimestampMs:  Date.now(),
title: ppp,
}}
alice.relayMessage(nummess, call, {})
await delay(10)
alice.sendMessage(from, {text: `Sukses kirim pesan ke ${nummess} tuan!`}, {quoted: m})
}
break
case 'idgc': {
if (!isCreator && !isOwner && !isPremium) return reply(mess.owner)
let anulistg = await store.chats.all().filter(v => v.id.endsWith('@g.us')).map(v => v.id)
let teks = `*GROUP CHAT LIST*\n\nTotal Group : ${anulistg.length} Group\n\n`
for (let i of anulistg) {
let metadata = await alice.groupMetadata(i)
teks += `*Name :* ${metadata.subject}\n*Owner :* ${metadata.owner !== undefined ? '@' + metadata.owner.split`@`[0] : 'Unknown'}\n*ID :* ${metadata.id}\n*Made :* ${moment(metadata.creation * 1000).tz('Asia/Kolkata').format('DD/MM/YYYY HH:mm:ss')}\n*Member :* ${metadata.participants.length}\n\n────────────────────────\n\n`
}
alice.sendteks(m.chat, teks, m)
}
break
case "opsichatpc":
if (!isCreator && !isOwner && !isPremium) return reply(mess.owner)
let titlenya = `PLEASE SELECT`
let chat33 = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
if (args[0] == "pin") {
await alice.chatModify({ pin: true }, chat33)
} else if (args[0] == "unpin") {
await alice.chatModify({ pin: false }, chat33)
} else if (args[0] == "archive") {
await alice.chatModify({ archive: true, lastMessages: [m] }, chat33)
} else if (args[0] == "unarchive") {
await alice.chatModify({ archive: false, lastMessages: [m] }, chat33)
} else if (args[0] === "mute") {
await alice.chatModify({ mute: "Infinity" }, chat33, [])
} else if (args[0] === "unmute") {
await alice.chatModify({ mute: null }, chat33, [])
} else if (args[0] === "read") {
await alice.chatModify({ markRead: true, lastMessages: [m] }, chat33)
} else if (args[0] === "unread") {
await alice.chatModify({ markRead: false, lastMessages: [m] }, chat33)
} else if (args[0] == "block") {
await alice.updateBlockStatus(chat33, 'block')
} else if (args[0] == "unblock") {
await alice.updateBlockStatus(chat33, 'unblock')
} else if (args[0] == "delete") {
await alice.chatModify({ delete: true, lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp.low }]}, chat33).catch((err) => reply795(`Berhasil Delete Chat`))
} else {
alice.sendPoll(global.owner, titlenya, [`${command} pin ${chat33}`,`${command} unpin ${chat33}`,`${command} archive ${chat33}`,`${command} unarchive ${chat33}`,`${command} mute ${chat33}`,`${command} unmute ${chat33}`,`${command} read ${chat33}`,`${command} unread ${chat33}`,`${command} block ${chat33}`,`${command} unblock ${chat33}`,`${command} delete ${chat33}`])
}
break
case 'opsichatgc':
if (!isCreator && !isOwner && !isPremium) return reply(mess.owner)
titlenyagc = `PLEASE SELECT`
chat333 = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g,'')+"@g.us"
if (args[0] == "pin") {
await alice.chatModify({ pin: true }, chat333)
} else if (args[0] == "unpin") {
await alice.chatModify({ pin: false }, chat333)
} else if (args[0] == "archive") {
await alice.chatModify({ archive: true, lastMessages: [m] }, chat333)
} else if (args[0] == "unarchive") {
await alice.chatModify({ archive: false, lastMessages: [m] }, chat333)
} else if (args[0] === "mute") {
await alice.chatModify({ mute: "Infinity" }, chat333, [])
} else if (args[0] === "unmute") {
await alice.chatModify({ mute: null }, chat333, [])
} else if (args[0] === "read") {
await alice.chatModify({ markRead: true, lastMessages: [m] }, chat333)
} else if (args[0] === "unread") {
await alice.chatModify({ markRead: false, lastMessages: [m] }, chat333)
} else if (args[0] == "delete") {
await alice.chatModify({ delete: true, lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp.low }]}, chat333).catch((err) => reply795(`Berhasil Delete Chat`))
} else {
alice.sendPoll(global.owner, titlenyagc, [`${command} pin ${chat333}`,`${command} unpin ${chat333}`,`${command} archive ${chat333}`,`${command} unarchive ${chat333}`,`${command} mute ${chat333}`,`${command} unmute ${chat333}`,`${command} read ${chat333}`,`${command} unread ${chat333}`,`${command} delete ${chat333}`])
}
break







































// FITUR CONVERTER
case 'swm': case 'steal': case 'stickerwm': case 'take':{
if (!args.join(" ")) return reply(`Where is the text?`)
const swn = args.join(" ")
const pcknm = swn.split("|")[0];
const atnm = swn.split("|")[1];
if (m.quoted.isAnimated === true) {
alice.downloadAndSaveMediaMessage(quoted, "gifee")
alice.sendMessage(from, {sticker:fs.readFileSync("gifee.webp")},{quoted:m})
} else if (/image/.test(mime)) {
let media = await quoted.download()
let encmedia = await alice.sendImageAsSticker(m.chat, media, m, { packname: pcknm, author: atnm })
} else if (/video/.test(mime)) {
if ((quoted.msg || quoted).seconds > 11) return reply('Maximum 10 Seconds!')
let media = await quoted.download()
let encmedia = await alice.sendVideoAsSticker(m.chat, media, m, { packname: pcknm, author: atnm })
await fs.unlinkSync(encmedia)
} else {
reply(`Photo/Video?`)
}
}
break
case 'toptv':{
if (!m.quoted) return reply('```Reply Videonya Untuk Di Jadikan Ptv [!]```')
if (!isVideo || !isQuotedVideo) {
const toptvv = {key: {fromMe: true, participant: `6283897387848@s.whatsapp.net`, ...(from ? {remoteJid: "status@broadcast"} : {})}, message: {extendedTextMessage: {text: `Powered By Alice`}}}
var ppt = m.quoted
var ptv = generateWAMessageFromContent(from, proto.Message.fromObject({"ptvMessage": ppt, caption: `done banh`, fileLength: 9999999999 }), { userJid: from})
alice.relayMessage(from, ptv.message, { messageId: ptv.key.id })
}
}
break
case 'toimage': case 'toimg': {
if (!quoted) throw 'Reply Image'
if (!/webp/.test(mime)) throw `Balas sticker dengan caption *${prefix + command}*`
let media = await alice.downloadAndSaveMediaMessage(quoted)
let ran = await getRandom('.png')
exec(`ffmpeg -i ${media} ${ran}`, (err) => {
fs.unlinkSync(media)
if (err) throw err
let buffer = fs.readFileSync(ran)
alice.sendMessage(from, { image: buffer }, {quoted:m})
fs.unlinkSync(ran)
})
}
break
case 'remini':
case 'hd':
case 'jadihd':{
if (!m.quoted) return reply795(`Reply gambar ${prefix}${command}`)
const { remini } = require('./lib/remini')
let media = await quoted.download()
let proses = await remini(media, "enhance");
alice.sendMessage(m.chat, { image: proses, caption:"Nihh Gambarnya jadi HD\n\n-$5.000"}, { quoted: m})
}
break
case 'say': case "tts": case "gtts":{
if (!q) return reply('Masukan Text!\n. contoh: tts jawa hitam')
const gtts = require("./lib/gtts")(`ja`, `${q}`)
var bby = args.join(' ')
let ranm = getRandom('.mp3')
let rano = getRandom('.ogg')
bby.length > 500 ? reply('Teks nya terlalu panjang !')
: gtts.save(ranm, bby, function () {
exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
fs.unlinkSync(ranm)
let buff = fs.readFileSync(rano)
if (err) return reply('Error Njir')
alice.sendMessage(from, { audio: buff, mimetype: "audio/mp4", ptt: true },{ quoted: m })
fs.unlinkSync(rano)
})
})
}
break
case 'smeme':
var atas = text.includes('-') ? text.split('-')[0] ? text.split('-')[0] : text : '-'
var bawah = text.includes('-') ? text.split('-')[1] ? text.split('-')[1] : '' : text
if (!text) return reply(`Gunakan dengan cara ${prefix+command} *text atas-text bawah*\n• example : ${prefix+command} Alice-Bot`)
if (text.length > 30) return reply(`Teksnya kebanyakan! kalo make ngotak dikit kontol!`)
if (/image/.test(mime)) {
reply(global.mess.wait)
var media = await alice.downloadAndSaveMediaMessage(quoted, Date.now())
var media_url = await global.telegraPH(media)
var meme_url = `https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${media_url}`
alice.sendImageAsSticker(from, meme_url, fpayment2, {packname: '© 𝙰𝚄𝚃𝙷𝙾𝚁 𝙹𝙾𝙼𝙾𝙺', author: '𝙳𝙰𝚁𝚆𝙸𝙽 𝙱𝙾𝚃'})
await fs.unlinkSync(media)
} else reply(`Kirim gambar dengan caption ${prefix+command} text atas-text bawah atau balas gambar yang sudah dikirim`)
break
case 'jadianime':{
if (!isCreator && !isOwner && !isPremium) return reply(mess.owner)
if (!isGroup) return onlyGroup()
if (isImage && !isQuotedImage) return reply(`Kirim gambar lalu reply ${prefix + command} atau tag gambar yang sudah dikirim`)
reply(mess.wait)
try{
let ahah = await alice.downloadAndSaveMediaMessage(quoted)
let dimss = await TelegraPh(ahah)
let ini_gen = `${command}`
let get_result = await getBuffer(`https://skizo.tech/api/toanime?url=${dimss}&apikey=${global.skizo}`)
alice.sendMessage(from, { contextInfo: { externalAdReply: { showAdAttribution: false,
title: `Powered By Alice`,
body:`Bot aktif ${runtime(process.uptime())}`,
previewType:"PHOTO", 
thumbnail: ppnyauser,
sourceUrl:`${global.saluran}`
}}, image: get_result, caption: `*Nih Kamu jadi Anime*`})
fs.unlinkSync(ahah) 
}catch(err){
console.log((err) => reply('Error coba lagi kak'))
}
}
break
case  'qc':{
let teks = m.quoted && m.quoted.q ? m.quoted.text : q ? q : "";
if (!teks) return reply(`Cara Penggunaan ${prefix}qc teks`)
const text = `${teks}`
const avatar = await alice.profilePictureUrl( m.quoted ? m.quoted.sender : m.sender,"image").catch(() =>`https://i0.wp.com/telegra.ph/file/134ccbbd0dfc434a910ab.png`)
const json = {
type: "quote",
format: "png",
backgroundColor: "#FFFFFF",
width: 800,
height: 580,
scale: 2,
"messages": [
{
"entities": [],
"avatar": true,
"from": {
"id": 1,
"name": pushname,
"photo": {
"url": avatar
}
},
"text": text,
"replyMessage": {}
}
 ],
};
axios
.post(
"https://bot.lyo.su/quote/generate",
json,
{
headers: { "Content-Type": "application/json" },
})
.then(async (res) => {
const buffer = Buffer.from(res.data.result.image, "base64");
let encmedia = await alice.imgToSticker(m.chat, buffer, m, { packname: global.packname, 
author: global.namaownernya, 
categories: ['🤩', '🎉'],
id: '12345',
quality: 100,
background: 'transparent'})
await fs.unlinkSync(encmedia)
})
}
break 
case  'qcimg':{
let teks = m.quoted && m.quoted.q ? m.quoted.text : q ? q : "";
if (!teks) return m.reply(`Cara Penggunaan ${prefix}qc teks`)
const text = `${teks}`
//const username = await alice.getName(m.quoted ? m.quoted.sender : m.sender)
const avatar = await alice.profilePictureUrl( m.quoted ? m.quoted.sender : m.sender,"image").catch(() =>`https://i0.wp.com/telegra.ph/file/134ccbbd0dfc434a910ab.png`)

const json = {
"type": "quote",
"format": "png",
"backgroundColor": "#FFFFFF",
"width": 512,
"height": 768,
"scale": 2,
"messages": [
{
"entities": [],
"avatar": true,
"from": {
"id": 1,
"name": pushname,
"photo": {
"url": avatar
}
},
"text": text,
"replyMessage": {}
}
 ],
};
axios
.post(
"https://bot.lyo.su/quote/generate",
json,
{
headers: { "Content-Type": "application/json" },
})
.then(async (res) => {
const buffer = Buffer.from(res.data.result.image, "base64");
alice.sendMessage(from,{image: buffer},{quoted : m})
})
}
break
case 's': case 'stiker': case 'sticker': {
if (/image/.test(mime)) {
let media = await alice.downloadAndSaveMediaMessage(quoted, + new Date * 1)
alice.sendImageAsSticker(from, media, fpayment2, {packname: '© 𝙰𝚄𝚃𝙷𝙾𝚁 𝙹𝙾𝙼𝙾𝙺', author: 'NICKY_STORE'})
await fs.unlinkSync(media)
} else if (/video/.test(mime)) {
if (quoted.seconds > 11) return reply795('Maksimal 10 detik!')
let media = await alice.downloadAndSaveMediaMessage(quoted, + new Date * 1)
alice.sendVideoAsSticker(from, media, fpayment2, {packname: '© NICKY_STORE', author: 'NICKY_STORE'})
await fs.unlinkSync(media)
} else reply795(`Kirim atau reply gambar dengan caption ${prefix+command}`)
}
break
case 'tr':
case 'translate':{
if (!isGroup) return onlyGroup()
let translate = require('translate-google-api')
let defaultLang = 'en'
let tld = 'cn'
let toks = `
Contoh:
${prefix + command} <lang> [text]
${prefix + command} id your messages
Daftar bahasa yang didukung: https://cloud.google.com/translate/docs/languages
`.trim()

let lang = args[0]
let text = args.slice(1).join(' ')
if ((args[0] || '').length !== 2) {
lang = defaultLang
text = args.join(' ')
}
if (!text && m.quoted && m.quoted.text) text = m.quoted.text
let result
try {
result = await translate(`${text}`, {to: lang})
} catch (e) {
result = await translate(`${text}`, {to: defaultLang,})
reply(toks)
} finally {
reply(result[0])
}
}
break
case 'tomp4': case 'tovideo': {
if (!isGroup) return onlyGroup()
if (!quoted) throw `Balas sticker video Dengan Caption ${prefix + command}`
if (/video/.test(mime)) {
let { webp2mp4File } = require('./lib/uploader')
let media = await alice.downloadAndSaveMediaMessage(quoted)
let webpToMp4 = await webp2mp4File(media)
await alice.sendMessage(from, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' } }, {quoted:m})
await fs.unlinkSync(media)
}
}
break
case 'tovn':{
if (!isGroup) return onlyGroup()
if (!/video/.test(mime) && !/audio/.test(mime)) throw `Reply video/audio dengan caption ${prefix + command}`
if (!quoted) throw `Reply video/audio dengan caption ${prefix + command}`
await loading()
var dl = await m.quoted.download()
alice.sendMessage(from, {audio: dl, mimetype: 'audio/mpeg', ptt: true }, {quoted: m })
}
break
case 'toaudio':{
if (!isGroup) return onlyGroup()
if (!/video/.test(mime) && !/audio/.test(mime)) throw `Reply video/audio dengan caption ${prefix + command}`
if (!quoted) throw `Reply video/audio dengan caption ${prefix + command}`
await loading()
var dl = await m.quoted.download()
alice.sendMessage(from, {audio: dl, mimetype: 'audio/mpeg', ptt: false }, {quoted: m })
}
break
case 'tomp3': {
if (!isGroup) return onlyGroup()
if (!/video/.test(mime) && !/audio/.test(mime)) throw `Reply video/audio dengan caption ${prefix + command}`
if (!quoted) throw `Reply video/audio dengan caption ${prefix + command}`
await loading()
var dl = await m.quoted.download()
alice.sendMessage(from, {audio: dl, mimetype:'audio/mpeg', ptt:false, contextInfo:{  externalAdReply: { showAdAttribution: false,
mediaType:  1,
mediaUrl: 'https://youtube.com/@NESF_NICKY',
title: `Converter mp3`,
sourceUrl: `${global.saluran}`,
thumbnail: ppnyauser
}
}})
}
break
//=================================================//
case 'togif': {
if (!isGroup) return onlyGroup()
if (!quoted) throw 'Reply Image'
if (!/webp/.test(mime)) throw `*reply sticker with caption* *${prefix + command}*`
 let { webp2mp4File } = require('./lib/uploader')
let media = await alice.downloadAndSaveMediaMessage(quoted)
let webpToMp4 = await webp2mp4File(media)
await alice.sendMessage(from, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' }, gifPlayback: true }, {quoted:m})
await fs.unlinkSync(media)
}
break
//=================================================//
case 'tourl': {
if (!isGroup) return onlyGroup()
if (!/video/.test(mime) && !/image/.test(mime)) throw `*Send/Reply the Video/Image With Caption* ${prefix + command}`
if (!quoted) throw `*Send/Reply the Video/Image Caption* ${prefix + command}`
let media = await alice.downloadAndSaveMediaMessage(quoted)
if (/image/.test(mime)) {
let anu = await TelegraPh(media)
m.reply(util.format(anu))
} else if (!/image/.test(mime)) {
let anu = await TelegraPh(media)
m.reply(util.format(anu))
}
await fs.unlinkSync(media)
}
break
case 'toqr':{
if (!q) return reply('Masukin Link Atau Text (´-﹏-`；)')
const QrCode = require('qrcode-reader')
const qrcode = require('qrcode')
let qyuer = await qrcode.toDataURL(q, { scale: 35 })
let data = new Buffer.from(qyuer.replace('data:image/png;base64,', ''), 'base64')
let buff = getRandom('.jpg')
await fs.writeFileSync('./'+buff, data)
let medi = fs.readFileSync('./' + buff)
await alice.sendMessage(from, { image: medi, caption:"Ini Diahh (￣ヘ￣;)"}, { quoted: m })
setTimeout(() => { fs.unlinkSync(buff) }, 10000)
}
break
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
// FITUR SHOP
case 'saldo':{
const Kalender0001 = moment.tz('Asia/Jakarta').format(`yyyy-MMMM-dddd`)
reply795(`*INFO SALDO ANDA*

 • Name : ${pushname}
 • Nomor : @${m.sender.split("@")[0]}
 • Saldo : Rp${toRupiah(cekSaldo(m.sender, db_saldo))}
 
Note : anda hanya bisa melakukan pembelian di bot alice saja, ketik *menu shop* untuk berbelanja`)
}
break
//=================================================//
case 'acc': case 'addsaldo':{
if (!isCreator) return reply(`*[ System Notice ]* User tidak bisa aksess command ini`)
const Kalender000 = moment.tz('Asia/Jakarta').format(`yyyy-MMMM-dddd`)
if (!q.split(",")[0]) return reply(`Ex : ${prefix+command} ${nomore},20000`)
if (!q.split(",")[1]) return reply(`Ex : ${prefix+command} ${nomore},2000`)
addSaldo(q.split(",")[0]+"@s.whatsapp.net", Number(q.split(",")[1]), db_saldo)
await delay(1000)
reply(`*USER SALDO*
 • ID : ${sender.split("@")[0]}
 • Nomor : ${q.split(",")[0]}
 • Tanggal : ${Kalender000}
 • Saldo : Rp${toRupiah(cekSaldo(q.split(",")[0]+"@s.whatsapp.net", db_saldo))} `)
        }
case 'kirim': {
if (!isCreator) return reply(`Maaf, Command ini Khusus untuk Developer Bot WhatsApp`)
let messageText = `Operasi *Topup* sebanyak Rp. ${q.split(",")[1]} suksess, ketik *.saldo* untuk melihat info anda`
let targetNumber = `${q.split(",")[0]}@s.whatsapp.net`;

alice.sendMessage(targetNumber, {
text: `${messageText}`,
mentions: [sender]
}, {
quoted: m
}).then(() => {
reply('Berhasil ✓');
}).catch(() => {
m.reply('Gagal mengirim pesan!');
});
}
break;
//=================================================//
case 'minsaldo':
if (!isCreator) return reply(`Maaf, Command ini Khusus untuk Developer Bot WhatsApp`)
if (!q.split(",")[0]) return m.reply(`Ex : ${prefix+command} nomor,jumlah\n\nContoh :\n${prefix+command} 628xxx,20000`)
if (!q.split(",")[1]) return m.reply(`Ex : ${prefix+command} nomor,jumlah\n\nContoh :\n${prefix+command} 628xxx,20000`)
if (cekSaldo(q.split(",")[0]+"@s.whatsapp.net", db_saldo) < q.split(",")[1] && cekSaldo(q.split(",")[0]+"@s.whatsapp.net", db_saldo) !== 0) return m.reply(`Dia saldonya ${cekSaldo(q.split(",")[0]+"@s.whatsapp.net", db_saldo)}, jadi jangan melebihi ${cekSaldo(q.split(",")[0]+"@s.whatsapp.net", db_saldo)} yah`)
const Kalender010 = moment.tz('Asia/Jakarta').format(`yyyy-MMMM-dddd`)
minSaldo(q.split(",")[0]+"@s.whatsapp.net", Number(q.split(",")[1]), db_saldo)
reply(`*USER SALDO*
 • ID : ${q.split(",")[0]}
 • Nomor : ${q.split(",")[0]}
 • Tanggal : ${Kalender010}
 • Saldo : Rp${toRupiah(cekSaldo(q.split(",")[0]+"@s.whatsapp.net", db_saldo))}, `)
break
//=================================================//
case 'cekmin':
if (!text) return reply('reply bukti pembayaran anda\n\ncontoh : .cekmin udah topup 40ribu')
if ((!isImage) || !isQuotedImage) {
try {
let media = await quoted.download()
reply('pesan dikirim ke owner, tunggu owner *acc* saldo anda')
await delay(100)
alice.sendMessage(global.owner, { image: media, caption: `${text}`}, { quoted: m})
} catch (err) {
reply(`Gambar tidak di temukan!\nCoba untuk ulangi kirim/reply gambar dengan caption ${prefix+command}`)
}
} else reply(`Kirim/reply gambar dengan caption ${prefix+command}`)
break
case 'topup':
const metadata = await alice.groupMetadata (global.idgcs)
if (!metadata.participants.map(a => a.id).includes(m.sender)) {
if (command) return reply795('Silahkan lakukan topup di group dibawah agar anda tidak kebingungan saat melakukan proses topup\nchat.whatsapp.com/GMGkcpSdD1VH5TV9l7eW1P ')
}
if (!m.isGroup) return reply795('Silahkan lakukan topup di group dibawah agar anda tidak kebingungan saat melakukan proses topup\nchat.whatsapp.com/GMGkcpSdD1VH5TV9l7eW1P ')
if (!text) return reply('masukan nominal topup anda!')
alice.sendMessage(global.owner, {text: `*REQUEST TOPUP*\n • Nama : ${pushname}\n • Nomor : ${tag}\n • Topup : Rp. ${text}`},{quoted: m})
await delay(1000)
alice.sendMessage(from, {image: {url: "https://telegra.ph/file/928408b91dc5433e698fe.jpg"}})
await delay(200)
reply(`Untuk  QRIS Nya lagi Error jadi pakai aja nomor dan jika sudah melakukan topup kirim Bukti transaksi Ketik *cekmin* nominal transaksi Dengan reply foto Di Chat Pribadi Bot nya untuk meng hindari pencurian data transaksi jika sudah \n\nwaktu expired topup 15 menit`)
setTimeout(() => {
m.reply('15 menit berlalu, silahkan ketik *topup* untuk melakukan topup kembali (/¯◡ ‿ ◡)/¯')
}, 900000)
break
case 'listpanel': case 'beliserver':
let inilistpanel = `*PAKET NORMAL*
_____________________________________
1 GB RAM - 50 CPU • Rp. 1,500
2 GB RAM - 70 CPU • Rp. 2,500
3 GB RAM - 80 CPU • Rp. 3,000
4 GB RAM - 90 CPU • Rp. 4,000

*PAKET MEDIUM*
_____________________________________
5 GB RAM - 100 CPU • Rp. 5,000
6 GB RAM - 120 CPU • Rp. 6,000
7 GB RAM - 140 CPU • Rp. 7,000
8 GB RAM - 150 CPU • Rp. 8,500
9 GB RAM - 180 CPU • Rp. 10,000

*PAKET HIGH*
_____________________________________
UNLIMITED RAM - CPU 0 Rp.15,000

*PROFIT*
server anda aman ✓
bisa claim garansi ✓
anti down server ✓
garansi 2 minggu ✓
_____________________________________

Anda bisa membeli panel dengan saldo\nketik *saldo* untuk melihat saldo anda\n\n*Cara Pembelian*\ncukup ketik ulang ram yang ingin anda beli *contoh* 2GB, maka bot akan melakukan transaksi pembelian secara otomatis`
alice.sendMessage(from, {
document: trash,
fileName: 'Panel Pterodactyl',
mimetype: doc3,
fileLength: 999999999,
pageCount: '2024',
caption: inilistpanel,
contextInfo: {
externalAdReply: {  
title: `PRABAYAR OTOMATIS`, 
body: 'alice project [v.1.4]',
thumbnailUrl: "https://telegra.ph/file/fa753d99143e66c7fcf99.png", 
sourceUrl: `${global.saluran}`,
mediaType: 1,
renderLargerThumbnail: true
}}},{quoted:fgclink})
break
case 'listvps':
let anunyav = `
╾───────────────╼
*• List VPS Linode*
╾───────────────╼
*• Rp 60K*
_› 2 CPU_
_› 80 GB Storage_
_› 4 GB RAM_
╾───────────────╼
*• Rp 90K*
_› 4 CPU_
_› 160 GB Storage_
_› 8 GB RAM_
╾───────────────╼
*• Rp 120K*
_› 8 CPU_
_› 320 GB Storage_
_› 16 GB RAM_
╾───────────────╼
_› Free install pterodactyl_
_› Free nstall wings_
_› Free install tema_
_› Free domain_
_› Free EGG_
╾───────────────╼

_✅WhatsApp : wa.me/${global.owner2}_
_✅Instagram : @NESF_NICKY`
alice.sendMessage(from, {
document: trash,
fileName: 'Shop & Pay Pay',
mimetype: doc2,
fileLength: 999999999,
pageCount: '2024',
caption: anunyav,
contextInfo: {
externalAdReply: {  
title: `VPS & DIGITAL OCEAN`, 
body: 'alice project [v.1.4]',
thumbnailUrl: "https://telegra.ph/file/939e4ab598aacf0a7c506.jpg", 
sourceUrl: `${global.saluran}`,
mediaType: 1,
renderLargerThumbnail: true
}}},{quoted: fpayment2})
break




























// FITUR ANIME
case 'akira': case 'akiyama': case 'ana': case 'art': case 'asuna': case 'ayuzawa': case 'boruto': case 'bts': case 'chiho': case 'chitoge': case 'cosplay': case 'cosplayloli': case 'cosplaysagiri': case 'cyber': case 'deidara': case 'doraemon': case 'elena': case 'emilia': case 'erza': case 'exo':  case 'gamewallpaper': case 'gremory': case 'hacker': case 'hestia': case 'hinata': case 'husbu': case 'inori': case 'islamic': case 'isuzu': case 'itachi': case 'itori': case 'jennie': case 'jiso': case 'justina': case 'kaga': case 'kagura': case 'kakasih': case 'kaori': case 'cartoon': case 'shortquote': case 'keneki': case 'kotori': case 'kurumi': case 'lisa': case 'loli2': case 'madara': case 'megumin': case 'mikasa': case 'mikey': case 'minato': case 'mountain': case 'naruto': case 'neko': case 'neko2': case 'nekonime': case 'nezuko': case 'onepiece': case 'pentol': case 'pokemon': case 'programming':  case 'randomnime': case 'randomnime2': case 'rize': case 'rose': case 'sagiri': case 'sakura': case 'sasuke': case 'satanic': case 'shina': case 'shinka': case 'shinomiya': case 'shizuka': case 'shota': case 'space': case 'technology': case 'tejina': case 'toukachan': case 'tsunade': case 'waifu': case 'yotsuba': case 'yuki': case 'yulibocil': case 'yumeko':{
if (!isGroup) return onlyGroup()
reply("Gambar Akan Dikirim Lewat Private Chat")
let heyy
if (/akira/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/akira.json')
if (/akiyama/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/akiyama.json')
if (/ana/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/ana.json')
if (/art/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/art.json')
if (/asuna/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/asuna.json')
if (/ayuzawa/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/ayuzawa.json')
if (/boneka/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/boneka.json')
if (/boruto/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/boruto.json')
if (/bts/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/bts.json')
if (/cecan/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/cecan.json')
if (/chiho/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/chiho.json')
if (/chitoge/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/chitoge.json')
if (/cogan/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/cogan.json')
if (/cosplay/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/cosplay.json')
if (/cosplayloli/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/cosplayloli.json')
if (/cosplaysagiri/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/cosplaysagiri.json')
if (/cyber/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/cyber.json')
if (/deidara/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/deidara.json')
if (/doraemon/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/doraemon.json')
if (/eba/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/eba.json')
if (/elaina/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/elaina.json')
if (/emilia/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/emilia.json')
if (/erza/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/erza.json')
if (/exo/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/exo.json')
if (/femdom/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/femdom.json')
if (/freefire/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/freefire.json')
if (/gamewallpaper/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/gamewallpaper.json')
if (/glasses/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/glasses.json')
if (/gremory/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/gremory.json')
if (/hacker/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/hekel.json')
if (/hestia/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/hestia.json')
if (/husbu/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/husbu.json')
if (/inori/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/inori.json')
if (/islamic/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/islamic.json')
if (/isuzu/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/isuzu.json')
if (/itachi/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/itachi.json')
if (/itori/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/itori.json')
if (/jennie/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/jeni.json')
if (/jiso/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/jiso.json')
if (/justina/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/justina.json')
if (/kaga/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/kaga.json')
if (/kagura/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/kagura.json')
if (/kakasih/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/kakasih.json')
if (/kaori/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/kaori.json')
if (/cartoon/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/kartun.json')
if (/shortquote/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/katakata.json')
if (/keneki/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/keneki.json')
if (/kotori/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/kotori.json')
if (/kpop/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/kpop.json')
if (/kucing/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/kucing.json')
if (/kurumi/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/kurumi.json')
if (/lisa/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/lisa.json')
if (/loli/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/loli.json')
if (/madara/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/madara.json')
if (/megumin/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/megumin.json')
if (/mikasa/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/mikasa.json')
if (/mikey/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/mikey.json')
if (/miku/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/miku.json')
if (/minato/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/minato.json')
if (/mobile/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/mobil.json')
if (/motor/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/motor.json')
if (/mountain/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/mountain.json')
if (/naruto/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/naruto.json')
if (/neko/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/neko.json')
if (/neko2/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/neko2.json')
if (/nekonime/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/nekonime.json')
if (/nezuko/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/nezuko.json')
if (/onepiece/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/onepiece.json')
if (/pentol/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/pentol.json')
if (/pokemon/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/pokemon.json')
if (/profil/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/profil.json')
if (/progamming/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/programming.json')
if (/pubg/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/pubg.json')
if (/randblackpink/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/randblackpink.json')
if (/randomnime/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/randomnime.json')
if (/randomnime2/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/randomnime2.json')
if (/rize/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/rize.json')
if (/rose/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/rose.json')
if (/ryujin/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/ryujin.json')
if (/sagiri/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/sagiri.json')
if (/sakura/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/sakura.json')
if (/sasuke/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/sasuke.json')
if (/satanic/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/satanic.json')
if (/shina/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/shina.json')
if (/shinka/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/shinka.json')
if (/shinomiya/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/shinomiya.json')
if (/shizuka/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/shizuka.json')
if (/shota/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/shota.json')
if (/space/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/tataalice.json')
if (/technology/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/technology.json')
if (/tejina/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/tejina.json')
if (/toukachan/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/toukachan.json')
if (/tsunade/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/tsunade.json')
if (/waifu/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/waifu.json')
if (/wallhp/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/wallhp.json')
if (/wallml/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/wallml.json')
if (/wallmlnime/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/wallnime.json')
if (/yotsuba/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/yotsuba.json')
if (/yuki/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/yuki.json')
if (/yulibocil/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/yulibocil.json')
if (/yumeko/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/yumeko.json')
let yeha = heyy[Math.floor(Math.random() * heyy.length)];
alice.sendMessage(m.sender, { image: { url: yeha }, caption : 'Done Bwang, jangan lupa share alice bot' }, { quoted: m })
}
break

















































// FITUR EPHOTO
case 'glitchtext':
case 'writetext':
case 'advancedglow':
case 'typographytext':
case 'pixelglitch':
case 'neonglitch':
case 'flagtext':
case 'flag3dtext':
case 'deletingtext':
case 'blackpinkstyle':
case 'glowingtext':
case 'underwatertext':
case 'logomaker':
case 'cartoonstyle':
case 'papercutstyle':
case 'watercolortext':
case 'effectclouds':
case 'blackpinklogo':
case 'gradienttext':
case 'summerbeach':
case 'luxurygold':
case 'multicoloredneon':
case 'sandsummer':
case 'galaxywallpaper':
case '1917style':
case 'makingneon':
case 'royaltext':
case 'freecreate':
case 'galaxystyle':
case 'lighteffects':{
if (!isGroup) return onlyGroup()
if (!q) return reply(`Example : ${prefix+command} Alice`) 
let link
if (/glitchtext/.test(command)) link = 'https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html'
if (/writetext/.test(command)) link = 'https://en.ephoto360.com/write-text-on-wet-glass-online-589.html'
if (/advancedglow/.test(command)) link = 'https://en.ephoto360.com/advanced-glow-effects-74.html'
if (/typographytext/.test(command)) link = 'https://en.ephoto360.com/create-typography-text-effect-on-pavement-online-774.html'
if (/pixelglitch/.test(command)) link = 'https://en.ephoto360.com/create-pixel-glitch-text-effect-online-769.html'
if (/neonglitch/.test(command)) link = 'https://en.ephoto360.com/create-impressive-neon-glitch-text-effects-online-768.html'
if (/flagtext/.test(command)) link = 'https://en.ephoto360.com/nigeria-3d-flag-text-effect-online-free-753.html'
if (/flag3dtext/.test(command)) link = 'https://en.ephoto360.com/free-online-american-flag-3d-text-effect-generator-725.html'
if (/deletingtext/.test(command)) link = 'https://en.ephoto360.com/create-eraser-deleting-text-effect-online-717.html'
if (/blackpinkstyle/.test(command)) link = 'https://en.ephoto360.com/online-blackpink-style-logo-maker-effect-711.html'
if (/glowingtext/.test(command)) link = 'https://en.ephoto360.com/create-glowing-text-effects-online-706.html'
if (/underwatertext/.test(command)) link = 'https://en.ephoto360.com/3d-underwater-text-effect-online-682.html'
if (/logomaker/.test(command)) link = 'https://en.ephoto360.com/free-bear-logo-maker-online-673.html'
if (/cartoonstyle/.test(command)) link = 'https://en.ephoto360.com/create-a-cartoon-style-graffiti-text-effect-online-668.html'
if (/papercutstyle/.test(command)) link = 'https://en.ephoto360.com/multicolor-3d-paper-cut-style-text-effect-658.html'
if (/watercolortext/.test(command)) link = 'https://en.ephoto360.com/create-a-watercolor-text-effect-online-655.html'
if (/effectclouds/.test(command)) link = 'https://en.ephoto360.com/write-text-effect-clouds-in-the-sky-online-619.html'
if (/blackpinklogo/.test(command)) link = 'https://en.ephoto360.com/create-blackpink-logo-online-free-607.html'
if (/gradienttext/.test(command)) link = 'https://en.ephoto360.com/create-3d-gradient-text-effect-online-600.html'
if (/summerbeach/.test(command)) link = 'https://en.ephoto360.com/write-in-sand-summer-beach-online-free-595.html'
if (/luxurygold/.test(command)) link = 'https://en.ephoto360.com/create-a-luxury-gold-text-effect-online-594.html'
if (/multicoloredneon/.test(command)) link = 'https://en.ephoto360.com/create-multicolored-neon-light-signatures-591.html'
if (/sandsummer/.test(command)) link = 'https://en.ephoto360.com/write-in-sand-summer-beach-online-576.html'
if (/galaxywallpaper/.test(command)) link = 'https://en.ephoto360.com/create-galaxy-wallpaper-mobile-online-528.html'
if (/1917style/.test(command)) link = 'https://en.ephoto360.com/1917-style-text-effect-523.html'
if (/makingneon/.test(command)) link = 'https://en.ephoto360.com/making-neon-light-text-effect-with-galaxy-style-521.html'
if (/royaltext/.test(command)) link = 'https://en.ephoto360.com/royal-text-effect-online-free-471.html'
if (/freecreate/.test(command)) link = 'https://en.ephoto360.com/free-create-a-3d-hologram-text-effect-441.html'
if (/galaxystyle/.test(command)) link = 'https://en.ephoto360.com/create-galaxy-style-free-name-logo-438.html'
if (/lighteffects/.test(command)) link = 'https://en.ephoto360.com/create-light-effects-green-neon-online-429.html'
let haldwhd = await ephoto(link, q)
alice.sendMessage(m.chat, { image: { url: haldwhd }, caption: `powerewd by Alice` }, { quoted: m })
}
break







































// FITUR TEXTPRO


























// FITUR SOUND
case 'sound1':
case 'sound2':
case 'sound3':
case 'sound4':
case 'sound5':
case 'sound6':
case 'sound7':
case 'sound8':
case 'sound9':
case 'sound10':
case 'sound11':
case 'sound12':
case 'sound13':
case 'sound14':
case 'sound15':
case 'sound16':
case 'sound17':
case 'sound18':
case 'sound19':
case 'sound20':
case 'sound21':
case 'sound22':
case 'sound23':
case 'sound24':
case 'sound25':
case 'sound26':
case 'sound27':
case 'sound28':
case 'sound29':
case 'sound30':
case 'sound31':
case 'sound32':
case 'sound33':
case 'sound34':
case 'sound35':
case 'sound36':
case 'sound37':
case 'sound38':
case 'sound39':
case 'sound40':
case 'sound41':
case 'sound42':
case 'sound43':
case 'sound44':
case 'sound45':
case 'sound46':
case 'sound47':
case 'sound48':
case 'sound49':
case 'sound50':
case 'sound51':
case 'sound52':
case 'sound53':
case 'sound54':
case 'sound55':
case 'sound56':
case 'sound57':
case 'sound58':
case 'sound59':
case 'sound60':
case 'sound61':
case 'sound62':
case 'sound63':
case 'sound64':
case 'sound65':
case 'sound66':
case 'sound67':
case 'sound68':
case 'sound69':
case 'sound70':
case 'sound71':
case 'sound72':
case 'sound73':
case 'sound74':
case 'sound75':
case 'sound76':
case 'sound77':
case 'sound78':
case 'sound79':
case 'sound80':
case 'sound81':
case 'sound82':
case 'sound83':
case 'sound84':
case 'sound85':
case 'sound86':
case 'sound87':
case 'sound88':
case 'sound89':
case 'sound90':
case 'sound91':
case 'sound92':
case 'sound93':
case 'sound94':
case 'sound95':
case 'sound96':
case 'sound97':
case 'sound98':
case 'sound99':
case 'sound100':
case 'sound101':
case 'sound102':
case 'sound103':
case 'sound104':
case 'sound105':
case 'sound106':
case 'sound107':
case 'sound108':
case 'sound109':
case 'sound110':
case 'sound111':
case 'sound112':
case 'sound113':
case 'sound114':
case 'sound115':
case 'sound116':
case 'sound117':
case 'sound118':
case 'sound119':
case 'sound120':
case 'sound121':
case 'sound122':
case 'sound123':
case 'sound124':
case 'sound125':
case 'sound126':
case 'sound127':
case 'sound128':
case 'sound129':
case 'sound130':
case 'sound131':
case 'sound132':
case 'sound133':
case 'sound134':
case 'sound135':
case 'sound136':
case 'sound137':
case 'sound138':
case 'sound139':
case 'sound140':
case 'sound141':
case 'sound142':
case 'sound143':
case 'sound144':
case 'sound145':
case 'sound146':
case 'sound147':
case 'sound148':
case 'sound149':
case 'sound150':
case 'sound151':
case 'sound152':
case 'sound153':
case 'sound154':
case 'sound155':
case 'sound156':
case 'sound157':
case 'sound158':
case 'sound159':
case 'sound160':
case 'sound161':
if (!isGroup) return onlyGroup()
let bangsat = await getBuffer(`https://github.com/DGXeon/Tiktokmusic-API/raw/master/tiktokmusic/${command}.mp3`)
await alice.sendMessage(from, { audio: bangsat, mimetype: 'audio/mp4', ptt: true, viewOnce: true, contextInfo:{  externalAdReply: { showAdAttribution: false,
mediaType:  2,
mediaUrl: `https://wa.me/${global.owner}`,
title: `${command}`,
sourceUrl: `${global.saluran}`,
thumbnail: ppnyauser,
renderLargerThumbnail: false,
}
}})
break




















// MENU BOT
    case 'menu': case 'alice':
    if (!isRegistered) return reply795('Sebelum menggunakan bot clone, harap melakukan pendaftaran terlebih dahulu, ketik *.daftar nama.umur* untuk melakukan pendaftaran!')
    let menuutama = `┈──────────────────────⏣
            *I N F O   B O T*
┈──────────────────────⏣
   ⛩️• Bot Name : Alice
   ⛩️• Library : @whiskeysocket
   ⛩️• Version : 1,4 fixxed
   ⛩️• Memory Used : ${formatp(os.totalmem() - os.freemem())}
   ⛩️• Platform : ${process.platform + ' ' + process.arch}
   ⛩️• Speed : ${latensi.toFixed(4)} miliseconds
   ⛩️• Saldo : Rp. ${toRupiah(cekSaldo(m.sender, db_saldo))}
┈──────────────────────⏣
            *M E N U   B O T*
┈──────────────────────⏣
${readmore}    ⏣ • ${prefix}menu all
    ⏣ • ${prefix}menu fun
    ⏣ • ${prefix}menu rpg
    ⏣ • ${prefix}menu tools
    ⏣ • ${prefix}menu nsfw
    ⏣ • ${prefix}menu shop
    ⏣ • ${prefix}menu game
    ⏣ • ${prefix}menu anime
    ⏣ • ${prefix}menu group
    ⏣ • ${prefix}menu owner
    ⏣ • ${prefix}menu primbon
    ⏣ • ${prefix}menu convert
    ⏣ • ${prefix}menu ephoto
    ⏣ • ${prefix}menu search
    ⏣ • ${prefix}menu jadibot
    ⏣ • ${prefix}menu photoxy
    ⏣ • ${prefix}menu download
    ⏣ • ${prefix}menu asupan
    ⏣ • ${prefix}menu audio
    ⏣ • ${prefix}menu random
    ⏣ • ${prefix}menu textpro
    ⏣ • ${prefix}menu sound
┈──────────────────────⏣
    ➳      *A L I C E   P R O J E C T*
┈──────────────────────⏣`
    if (args[0] == 'nsfw'){
    if (!isGroup) return onlyGroup()
    sendres(from, `┈──────────────────────⏣
            *几丂千山        爪乇几ㄩ*
┈──────────────────────⏣
    ⏣ • ${prefix}hentai  
    ⏣ • ${prefix}gifhentai  
    ⏣ • ${prefix}gifblowjob  
    ⏣ • ${prefix}hentaivid  
    ⏣ • ${prefix}hneko  
    ⏣ • ${prefix}nwaifu  
    ⏣ • ${prefix}animespank  
    ⏣ • ${prefix}trap  
    ⏣ • ${prefix}gasm  
    ⏣ • ${prefix}ahegao  
    ⏣ • ${prefix}ass  
    ⏣ • ${prefix}bdsm  
    ⏣ • ${prefix}blowjob  
    ⏣ • ${prefix}cuckold  
    ⏣ • ${prefix}cum  
    ⏣ • ${prefix}milf  
    ⏣ • ${prefix}eba  
    ⏣ • ${prefix}ero  
    ⏣ • ${prefix}femdom  
    ⏣ • ${prefix}foot  
    ⏣ • ${prefix}gangbang  
    ⏣ • ${prefix}glasses  
    ⏣ • ${prefix}jahy  
    ⏣ • ${prefix}masturbation  
    ⏣ • ${prefix}manga  
    ⏣ • ${prefix}neko-hentai  
    ⏣ • ${prefix}neko-hentai2  
    ⏣ • ${prefix}nsfwloli  
    ⏣ • ${prefix}orgy  
    ⏣ • ${prefix}panties   
    ⏣ • ${prefix}pussy  
    ⏣ • ${prefix}tentacles  
    ⏣ • ${prefix}thights  
    ⏣ • ${prefix}yuri  
    ⏣ • ${prefix}zettai 
┈──────────────────────⏣
      *O T H E R S*
┈──────────────────────⏣
    ⏣ • ${prefix}bokep1-27
    ⏣ • ${prefix}art
    ⏣ • ${prefix}awoo
    ⏣ • ${prefix}hentaivid
    ⏣ • ${prefix}hentaivid2
    ⏣ • ${prefix}xnxxs *judul*
    ⏣ • ${prefix}xnxxdl *link*
┈──────────────────────⏣
      *P R O J E C T   A L I C E*
┈──────────────────────⏣`)
    } else
    if (args[0] == 'tools'){
    sendres(from, `┈──────────────────────⏣
            *O W N E R    T O O L S*
┈──────────────────────⏣
    ⏣ • ${prefix}ping
    ⏣ • ${prefix}runtime
    ⏣ • ${prefix}opsichatpc *nomor*
    ⏣ • ${prefix}opsichatgc *id*
    ⏣ • ${prefix}listpc
    ⏣ • ${prefix}listgc
    ⏣ • ${prefix}listonline
    ⏣ • ${prefix}addsewa *link + time*
    ⏣ • ${prefix}listsewa
    ⏣ • ${prefix}checksewa
    ⏣ • ${prefix}delsewa
    ⏣ • ${prefix}restart *restart bot*
    ⏣ • ${prefix}shutdown *mati*
    ⏣ • ${prefix}buatgc *namanya*
    ⏣ • ${prefix}ipbot
    ⏣ • ${prefix}clearjdb
    ⏣ • ${prefix}getdb
    ⏣ • ${prefix}delsampah
    ⏣ • ${prefix}encrypt *text/code*
    ⏣ • ${prefix}ban
    ⏣ • ${prefix}nowa *nomor*
    ⏣ • ${prefix}auto-ai *on / off*
    ⏣ • ${prefix}anticall *on / off*
    ⏣ • ${prefix}autoreadsw *on / off*
    ⏣ • ${prefix}banned *mention or reply*
    ⏣ • ${prefix}antilink *on/off*
    ⏣ • ${prefix}autodownload *on/off*
    ⏣ • ${prefix}call *telepon*
    ⏣ • ${prefix}spamsms *pesan spam*
    ⏣ • ${prefix}gantifile *nama file*
    ⏣ • ${prefix}delfolder *nama folder*
    ⏣ • ${prefix}nomor-wa *nomornya*
    ⏣ • $
    ⏣ • >
    
┈──────────────────────⏣
    
┈──────────────────────⏣`)
    } else if (args[0] == 'asupan'){
    sendres(from, `┈──────────────────────⏣
            *卂丂ㄩ卩卂几*
┈──────────────────────⏣
    ⏣ • ${prefix}asupan1-20
    ⏣ • ${prefix}tiktokgirl
    ⏣ • ${prefix}tiktoknukthy
    ⏣ • ${prefix}tiktokkayes
    ⏣ • ${prefix}tiktokpanrika
    ⏣ • ${prefix}tiktoknotnot
    ⏣ • ${prefix}tiktokghea 
    ⏣ • ${prefix}tiktoksantuy 
    ⏣ • ${prefix}tiktokbocil 
    
┈──────────────────────⏣
            *FITUR JOMBLO*
┈──────────────────────⏣`)
} else if (args[0] == 'photoxy'){
sendres(from, `┈──────────────────────⏣
            *P H O T O O X Y*
┈──────────────────────⏣
    ⏣ • ${prefix}shadow *text*
    ⏣ • ${prefix}write *text*
    ⏣ • ${prefix}romantic *text*
    ⏣ • ${prefix}burnpaper *text*
    ⏣ • ${prefix}smoke *text*
    ⏣ • ${prefix}narutobanner *text*
    ⏣ • ${prefix}love *text*
    ⏣ • ${prefix}undergrass *text*
    ⏣ • ${prefix}doublelove *text*
    ⏣ • ${prefix}coffecup *text*
    ⏣ • ${prefix}underwaterocean *text*
    ⏣ • ${prefix}smokyneon *text*
    ⏣ • ${prefix}starstext *text*
    ⏣ • ${prefix}rainboweffect *text*
    ⏣ • ${prefix}balloontext *text*
    ⏣ • ${prefix}metalliceffect *text*
    ⏣ • ${prefix}embroiderytext *text*
    ⏣ • ${prefix}flamingtext *text*
    ⏣ • ${prefix}stonetext *text*
    ⏣ • ${prefix}writeart *text*
    ⏣ • ${prefix}summertext *text*
    ⏣ • ${prefix}wolfmetaltext *text*
    ⏣ • ${prefix}nature3dtext *text*
    ⏣ • ${prefix}rosestext *text*
    ⏣ • ${prefix}naturetypography *text*
    ⏣ • ${prefix}quotesunder *text*
    ⏣ • ${prefix}shinetext *text*
    
    ┈──────────────────────⏣
            *A L I C E   P R O J E C T*
┈──────────────────────⏣`)
    } else if (args[0] == 'jadibot'){
    sendres(from, `┈──────────────────────⏣
            *ﾌ卂刀丨乃ㄖㄒ*
┈──────────────────────⏣
    ⏣ • ${prefix}jadibot *waktu*
    ⏣ • ${prefix}stop *mematikan*
    ⏣ • ${prefix}start *memulai
    ⏣ • ${prefix}listjadibot
    ⏣ • ${prefix}delsession
    ⏣ • ${prefix}getsession
    ⏣ • ${prefix}carajadibot
    
┈──────────────────────⏣
            *ALICE - BETA*  
┈──────────────────────⏣`)
    } else if (args[0] == 'textpro'){
    sendres(from, `┈──────────────────────⏣
            *ㄒ乇乂ㄒ       爪卂Ҝ乇尺*
┈──────────────────────⏣
    ⏣ • ${prefix}blackpink *text*
    ⏣ • ${prefix}neon *text*
    ⏣ • ${prefix}greenneon *text*
    ⏣ • ${prefix}advanceglow *text*
    ⏣ • ${prefix}futureneon *text*
    ⏣ • ${prefix}sandwriting *text*
    ⏣ • ${prefix}sandsummer *text*
    ⏣ • ${prefix}sandengraved *text*
    ⏣ • ${prefix}metaldark *text*
    ⏣ • ${prefix}neonlight *text*
    ⏣ • ${prefix}holographic *text*
    ⏣ • ${prefix}text1917 *text*
    ⏣ • ${prefix}minion *text*
    ⏣ • ${prefix}deluxesilver *text*
    ⏣ • ${prefix}newyearcard *text*
    ⏣ • ${prefix}bloodfrosted *text*
    ⏣ • ${prefix}halloween *text*
    ⏣ • ${prefix}jokerlogo *text*
    ⏣ • ${prefix}fireworksparkle *text*
    ⏣ • ${prefix}natureleaves *text*
    ⏣ • ${prefix}bokeh *text*
    ⏣ • ${prefix}toxic *text*
    ⏣ • ${prefix}strawberry *text*
    ⏣ • ${prefix}box3d *text*
    ⏣ • ${prefix}roadwarning *text*
    ⏣ • ${prefix}breakwall *text*
    ⏣ • ${prefix}icecold *text*
    ⏣ • ${prefix}luxury *text*
    ⏣ • ${prefix}cloud *text*
    ⏣ • ${prefix}summersand *text*
    ⏣ • ${prefix}horrorblood *text*
    ⏣ • ${prefix}thunder *text*
    
┈──────────────────────⏣
            *丂ㄖㄩ几刀*
┈──────────────────────⏣`)
    } else if (args[0] == 'owner'){
    sendres(from, `┈──────────────────────⏣
            *ㄖ山几乇尺      爪乇几ㄩ*
┈──────────────────────⏣
    ⏣ • ${prefix}public
    ⏣ • ${prefix}self
    ⏣ • ${prefix}cleardb
    ⏣ • ${prefix}unbanned *mention or reply*
    ⏣ • ${prefix}addprem *mention or reply*
    ⏣ • ${prefix}delprem *mention or reply*
    ⏣ • ${prefix}setprefix *symbol*
    ⏣ • ${prefix}setcover *link photo*
    ⏣ • ${prefix}setppbot *reply photo*
    ⏣ • ${prefix}delppbot
    ⏣ • ${prefix}block *mention or reply*
    ⏣ • ${prefix}unblock *mention or reply*
    ⏣ • ${prefix}listblock
    ⏣ • ${prefix}delchat
    ⏣ • ${prefix}readvo *reply viewonce*
    ⏣ • ${prefix}setnamabot *nama*
    ⏣ • ${prefix}setbiobot *bionya*
    
┈──────────────────────⏣
           *B O T    S E T T I N G*
┈──────────────────────⏣`)
    } else if (args[0] == 'search'){
    if (!isGroup) return onlyGroup()
    sendres(from, `┈──────────────────────⏣
            *M E N U    S E A R C H*
┈──────────────────────⏣
    ⏣ • ${prefix}play *text*
    ⏣ • ${prefix}spotify *title*
    ⏣ • ${prefix}spotifysearch *title*
    ⏣ • ${prefix}pinterest *text*
    ⏣ • ${prefix}ytvideo *text*
    ⏣ • ${prefix}yts *querry*
    ⏣ • ${prefix}ssweb *link*
    ⏣ • ${prefix}google *text*
    ⏣ • ${prefix}ghstalk *username*
    ⏣ • ${prefix}igstalk *username*
    ⏣ • ${prefix}aiimg *text*
    ⏣ • ${prefix}gimage
    ⏣ • ${prefix}txt2img *prompt*
    ⏣ • ${prefix}bingimg *prompt*
    ⏣ • ${prefix}translate *reply text*
    ⏣ • ${prefix}lirik *judul lagu*
    ⏣ • ${prefix}ai *ask*
    ⏣ • ${prefix}hutao *ask*
    ⏣ • ${prefix}nobara *ask*
    ⏣ • ${prefix}elaina *ask*
    ⏣ • ${prefix}miku *ask*
    ⏣ • ${prefix}cai *char & text*
    ⏣ • ${prefix}xnxxs *title*
    ⏣ • ${prefix}animesearch *title*
    
┈──────────────────────⏣
    
┈──────────────────────⏣
    `)
    } else if (args[0] == 'random'){
    sendres(from, `┈──────────────────────⏣
            *R A N D O M   P H O T O*
┈──────────────────────⏣
    ⏣ • ${prefix}hijab
    ⏣ • ${prefix}indo
    ⏣ • ${prefix}japanese
    ⏣ • ${prefix}korean
    ⏣ • ${prefix}malay
    ⏣ • ${prefix}randomgirl
    ⏣ • ${prefix}randomboy
    ⏣ • ${prefix}thai
    ⏣ • ${prefix}vietnamese
    ⏣ • ${prefix}aesthetic
    ⏣ • ${prefix}chinese
    ⏣ • ${prefix}pubg
    ⏣ • ${prefix}antiwork
    ⏣ • ${prefix}blackpink2
    ⏣ • ${prefix}cosplay
    ⏣ • ${prefix}cat
    ⏣ • ${prefix}doggo
    ⏣ • ${prefix}justina
    ⏣ • ${prefix}kayes
    ⏣ • ${prefix}bike
    ⏣ • ${prefix}boneka
    ⏣ • ${prefix}kpop
    ⏣ • ${prefix}notnot
    ⏣ • ${prefix}car
    ⏣ • ${prefix}rose
    ⏣ • ${prefix}ryujin
    ⏣ • ${prefix}ulzangboy
    ⏣ • ${prefix}ulzanggirl
    ⏣ • ${prefix}mobilelegend
    
┈──────────────────────⏣
          *P R O J E C T   A L I C E*
┈──────────────────────⏣`)
    } else if (args[0] == 'convert'){
    sendres(from, `┈──────────────────────⏣
            *匚ㄖ几V乇尺ㄒ乇尺*
┈──────────────────────⏣
    ⏣ • ${prefix}say *text*
    ⏣ • ${prefix}toonce *media*
    ⏣ • ${prefix}smeme *image & text*
    ⏣ • ${prefix}qc *text*
    ⏣ • ${prefix}qcimg *text*
    ⏣ • ${prefix}sticker *reply image/video*
    ⏣ • ${prefix}toimg *reply sticker*
    ⏣ • ${prefix}toptv *reply video*
    ⏣ • ${prefix}tomp4 *reply sticker*
    ⏣ • ${prefix}toaudio *reply video*
    ⏣ • ${prefix}tomp3 *reply video*
    ⏣ • ${prefix}togif *reply video*
    ⏣ • ${prefix}toqr *link or text*
    ⏣ • ${prefix}tovn *reply audio*
    ⏣ • ${prefix}toanime *reply foto*
    ⏣ • ${prefix}diffusion *gambar*
    ⏣ • ${prefix}remini *reply gambar*
    ⏣ • ${prefix}txt2img *prompt*
    ⏣ • ${prefix}jadi *modelnya*
    ⏣ • ${prefix}differentme *modelnya*
    
┈──────────────────────⏣
            *A L I C E    B E T A*
┈──────────────────────⏣`)
    } else if (args[0] == 'download'){
    sendres(from, `┈──────────────────────⏣
            *刀ㄖ山几ㄥㄖ卂刀乇尺*
┈──────────────────────⏣
    ⏣ • ${prefix}ytsearch *judul*
    ⏣ • ${prefix}ytreels *link*
    ⏣ • ${prefix}getmusic *reply yts*
    ⏣ • ${prefix}getvideo *reply yts*
    ⏣ • ${prefix}ytvideo *judul video*
    ⏣ • ${prefix}ytmp3 *link youtube*
    ⏣ • ${prefix}ytmp4 *link youtube*
    ⏣ • ${prefix}ytdok *link youtube*
    ⏣ • ${prefix}ytvn *link youtube*
    ⏣ • ${prefix}ytvideo *link youtube*
    ⏣ • ${prefix}tiktok *link tiktok*
    ⏣ • ${prefix}fbdl *link*
    ⏣ • ${prefix}spotifydl *link*
    ⏣ • ${prefix}igdl *link*
    ⏣ • ${prefix}mediafire *link*

┈──────────────────────⏣
    
┈──────────────────────⏣`)
    } else if (args[0] == 'ephoto'){
    if (!isGroup) return onlyGroup()
    sendres(from, `┈──────────────────────⏣
            *モㄗ卄口匕口*
┈──────────────────────⏣
    ⏣ • ${prefix}credit
    ⏣ • ${prefix}glitchtext *text*
    ⏣ • ${prefix}writetext *text*
    ⏣ • ${prefix}advancedglow *text*
    ⏣ • ${prefix}typographytext *text*
    ⏣ • ${prefix}pixelglitch *text*
    ⏣ • ${prefix}neonglitch *text*
    ⏣ • ${prefix}flagtext *text*
    ⏣ • ${prefix}flag3dtext *text*
    ⏣ • ${prefix}deletingtext *text*
    ⏣ • ${prefix}blackpinkstyle *text*
    ⏣ • ${prefix}glowingtext *text*
    ⏣ • ${prefix}underwatertext *text*
    ⏣ • ${prefix}logomaker *text*
    ⏣ • ${prefix}cartoonstyle *text*
    ⏣ • ${prefix}papercutstyle *text*
    ⏣ • ${prefix}watercolortext *text*
    ⏣ • ${prefix}effectclouds *text*
    ⏣ • ${prefix}blackpinklogo *text*
    ⏣ • ${prefix}gradienttext *text*
    ⏣ • ${prefix}summerbeach *text*
    ⏣ • ${prefix}luxurygold *text*
    ⏣ • ${prefix}multicoloredneon *text*
    ⏣ • ${prefix}sandsummer *text*
    ⏣ • ${prefix}galaxywallpaper *text*
    ⏣ • ${prefix}1917style *text*
    ⏣ • ${prefix}makingneon *text*
    ⏣ • ${prefix}royaltext *text*
    ⏣ • ${prefix}freecreate *text*
    ⏣ • ${prefix}galaxystyle *text*
    ⏣ • ${prefix}lighteffects *text*
    
┈──────────────────────⏣
    Jangan Lupa Mampir Youtube
┈──────────────────────⏣`)
    } else if (args[0] == 'primbon'){
    if (!isGroup) return onlyGroup()
    sendres(from, `┈──────────────────────⏣
            *ㄗ尺工爪乃口れ*
┈──────────────────────⏣
    ⏣ • ${prefix}credit
    ⏣ • ${prefix}artinama *text*
    ⏣ • ${prefix}artimimpi *text*
    ⏣ • ${prefix}kecocokanpasangan *text*
    ⏣ • ${prefix}kecocokannama *text*
    ⏣ • ${prefix}jadianpernikahan *text*
    ⏣ • ${prefix}rezeki *text*
    ⏣ • ${prefix}sifatusaha *text*
    ⏣ • ${prefix}pekerjaan *text*
    ⏣ • ${prefix}artitarot *text*
    ⏣ • ${prefix}potensipenyakit *text*
    ⏣ • ${prefix}ramalannasib *text*
    ⏣ • ${prefix}harisangar *text*
    ⏣ • ${prefix}haribaik *text*
    ⏣ • ${prefix}fengshui *text*
    ⏣ • ${prefix}nagahari *text*
    ⏣ • ${prefix}harinaas *text*
    ⏣ • ${prefix}weton *text*
    ⏣ • ${prefix}peruntungan *text*
    ⏣ • ${prefix}arahrejeki *text*
    ⏣ • ${prefix}sifat *text*
    ⏣ • ${prefix}kebetuntungan *text*
    ⏣ • ${prefix}memancing *text*
    ⏣ • ${prefix}masasubur *text*
    ⏣ • ${prefix}zodiak *text*
    ⏣ • ${prefix}shio *text*
    
┈──────────────────────⏣
    *P O W E R E D   B Y   A L I C E*
┈──────────────────────⏣`)
    } else if (args[0] == 'group'){
    if (!isGroup) return onlyGroup()
    sendres(from, `┈──────────────────────⏣
            *爪乇几ㄩ     ム尺ㄖㄩ卩*
┈──────────────────────⏣
    ⏣ • ${prefix}credit
    ⏣ • ${prefix}rules
    ⏣ • ${prefix}menfess *pesannya*
    ⏣ • ${prefix}setcmd *command*
    ⏣ • ${prefix}listcmd
    ⏣ • ${prefix}delcmd *command*
    ⏣ • ${prefix}timergc *waktu*
    ⏣ • ${prefix}afk *alasan*
    ⏣ • ${prefix}tagall *text*
    ⏣ • ${prefix}kudeta *berbahaya*
    ⏣ • ${prefix}idgc
    ⏣ • ${prefix}promoteall *adminkan semua*
    ⏣ • ${prefix}demoteall *unadmin semua*
    ⏣ • ${prefix}hidetag *text*
    ⏣ • ${prefix}cekgc *link*
    ⏣ • ${prefix}ppcp/couple
    ⏣ • ${prefix}getname *mention or reply*
    ⏣ • ${prefix}getpp *mention or reply*
    ⏣ • ${prefix}getbio *mention or reply*
    ⏣ • ${prefix}delete *reply pesan*
    ⏣ • ${prefix}promote *mention or reply*
    ⏣ • ${prefix}demote *mention or reply*
    ⏣ • ${prefix}add *number*
    ⏣ • ${prefix}kick *mention or reply*
    ⏣ • ${prefix}infogrup
    ⏣ • ${prefix}linkgrup
    ⏣ • ${prefix}grup *open / close*
    ⏣ • ${prefix}revoke 
    ⏣ • ${prefix}join *Link Grup*
    ⏣ • ${prefix}left 
    ⏣ • ${prefix}setppgrup *reply photo*
    ⏣ • ${prefix}setgrupname *text*
    ⏣ • ${prefix}setdesc *text*
    ⏣ • ${prefix}pushkontakfrom *text*
    
┈──────────────────────⏣
      S E T T I N G    G R O U P
┈──────────────────────⏣`)
    } else if (args[0] == 'anime'){
    sendres(from, `┈──────────────────────⏣
            *丹れ工爪モ*
┈──────────────────────⏣
    ⏣ • ${prefix}cogan
    ⏣ • ${prefix}elaina2
    ⏣ • ${prefix}exo
    ⏣ • ${prefix}elf
    ⏣ • ${prefix}estetic
    ⏣ • ${prefix}kanna
    ⏣ • ${prefix}loli
    ⏣ • ${prefix}shota
    ⏣ • ${prefix}husbu
    ⏣ • ${prefix}sagiri
    ⏣ • ${prefix}shinobu
    ⏣ • ${prefix}megumin
    ⏣ • ${prefix}wallnime
    ⏣ • ${prefix}neko
    ⏣ • ${prefix}waifu
    ⏣ • ${prefix}kill
    ⏣ • ${prefix}pat
    ⏣ • ${prefix}lick
    ⏣ • ${prefix}bite
    ⏣ • ${prefix}yeet
    ⏣ • ${prefix}bonk
    ⏣ • ${prefix}wink
    ⏣ • ${prefix}poke
    ⏣ • ${prefix}nom
    ⏣ • ${prefix}slap
    ⏣ • ${prefix}smile
    ⏣ • ${prefix}wave
    ⏣ • ${prefix}blush
    ⏣ • ${prefix}smug
    ⏣ • ${prefix}glomp
    ⏣ • ${prefix}happy
    ⏣ • ${prefix}dance
    ⏣ • ${prefix}cringe
    ⏣ • ${prefix}highfive
    ⏣ • ${prefix}handhold
    ⏣ • ${prefix}akira 
    ⏣ • ${prefix}akiyama 
    ⏣ • ${prefix}ana 
    ⏣ • ${prefix}asuna 
    ⏣ • ${prefix}ayuzawa 
    ⏣ • ${prefix}boruto 
    ⏣ • ${prefix}chiho 
    ⏣ • ${prefix}chitoge 
    ⏣ • ${prefix}cosplayloli 
    ⏣ • ${prefix}cosplaysagiri 
    ⏣ • ${prefix}deidara 
    ⏣ • ${prefix}doraemon 
    ⏣ • ${prefix}elena
    ⏣ • ${prefix}emilia 
    ⏣ • ${prefix}erza 
    ⏣ • ${prefix}gremory 
    ⏣ • ${prefix}hestia 
    ⏣ • ${prefix}hinata 
    ⏣ • ${prefix}husbu 
    ⏣ • ${prefix}inori 
    ⏣ • ${prefix}isuzu 
    ⏣ • ${prefix}itachi 
    ⏣ • ${prefix}itori 
    ⏣ • ${prefix}kaga 
    ⏣ • ${prefix}kagura 
    ⏣ • ${prefix}kakasih 
    ⏣ • ${prefix}kaori 
    ⏣ • ${prefix}keneki 
    ⏣ • ${prefix}kotori 
    ⏣ • ${prefix}kurumi 
    ⏣ • ${prefix}loli 
    ⏣ • ${prefix}madara 
    ⏣ • ${prefix}megumin 
    ⏣ • ${prefix}mikasa 
    ⏣ • ${prefix}mikey 
    ⏣ • ${prefix}miku 
    ⏣ • ${prefix}minato 
    ⏣ • ${prefix}naruto 
    ⏣ • ${prefix}neko 
    ⏣ • ${prefix}neko2 
    ⏣ • ${prefix}nekonime 
    ⏣ • ${prefix}nezuko 
    ⏣ • ${prefix}onepiece 
    ⏣ • ${prefix}pokemon 
    ⏣ • ${prefix}randomnime 
    ⏣ • ${prefix}randomnime2 
    ⏣ • ${prefix}rize 
    ⏣ • ${prefix}sagiri 
    ⏣ • ${prefix}sakura 
    ⏣ • ${prefix}sasuke 
    ⏣ • ${prefix}shina 
    ⏣ • ${prefix}shinka 
    ⏣ • ${prefix}shinomiya 
    ⏣ • ${prefix}shizuka 
    ⏣ • ${prefix}shota 
    ⏣ • ${prefix}tejina 
    ⏣ • ${prefix}toukachan 
    ⏣ • ${prefix}tsunade 
    ⏣ • ${prefix}waifu 
    ⏣ • ${prefix}animewall 
    ⏣ • ${prefix}yotsuba 
    ⏣ • ${prefix}yuki 
    ⏣ • ${prefix}yulibocil 
    ⏣ • ${prefix}yumeko
    ⏣ • ${prefix}8ball
    ⏣ • ${prefix}tickle
    ⏣ • ${prefix}gecg
    ⏣ • ${prefix}feed
    
┈──────────────────────⏣
               *A L I C E*
┈──────────────────────⏣`)
    } else if (args[0] == 'rpg'){
    if (!isGroup) return onlyGroup()
    sendres(from, `┈──────────────────────⏣
            *B E S T   P R O J E C T*
┈──────────────────────⏣
    ⏣ • ${prefix}inventory
    ⏣ • ${prefix}mining
    ⏣ • ${prefix}buy
    ⏣ • ${prefix}sell
    ⏣ • ${prefix}heal
    ⏣ • ${prefix}hunt
    ⏣ • ${prefix}adventure
    ⏣ • ${prefix}luckyday
    ⏣ • ${prefix}killslime
    ⏣ • ${prefix}killgoblin
    ⏣ • ${prefix}killdevil
    ⏣ • ${prefix}killbehemoth
    ⏣ • ${prefix}killdemon
    ⏣ • ${prefix}killdemonking
    ⏣ • ${prefix}joinrpg
    ⏣ • ${prefix}sellikan
    ⏣ • ${prefix}sellbesi
    ⏣ • ${prefix}sellemas
    ⏣ • ${prefix}jelajah
    ⏣ • ${prefix}mancing
    ⏣ • ${prefix}jualikan
    ⏣ • ${prefix}jualcoal
    ⏣ • ${prefix}jualstone
    ⏣ • ${prefix}jualingot
    ⏣ • ${prefix}jualkayu
    ⏣ • ${prefix}jualbahankimia
    ⏣ • ${prefix}lebur
    ⏣ • ${prefix}nebang
    ⏣ • ${prefix}goplanet
    ⏣ • ${prefix}ojek

┈──────────────────────⏣
            *R P G    G A M E S*
┈──────────────────────⏣`)
    } else if (args[0] == 'sound'){
    sendres(from, `┈──────────────────────⏣
            *丂ㄖㄩ几刀*
┈──────────────────────⏣
    ⏣ • ${prefix}sound1
    ⏣ • ${prefix}sound2
    ⏣ • ${prefix}sound3
    ⏣ • ${prefix}sound4
    ⏣ • ${prefix}sound5
    ⏣ • ${prefix}sound6
    ⏣ • ${prefix}sound7
    ⏣ • ${prefix}sound8
    ⏣ • ${prefix}sound9
    ⏣ • ${prefix}sound10
    ⏣ • ${prefix}sound11
    ⏣ • ${prefix}sound12
    ⏣ • ${prefix}sound13
    ⏣ • ${prefix}sound14
    ⏣ • ${prefix}sound15
    ⏣ • ${prefix}sound16
    ⏣ • ${prefix}sound17
    ⏣ • ${prefix}sound18
    ⏣ • ${prefix}sound19
    ⏣ • ${prefix}sound20
    ⏣ • ${prefix}sound21
    ⏣ • ${prefix}sound22
    ⏣ • ${prefix}sound23
    ⏣ • ${prefix}sound24
    ⏣ • ${prefix}sound25
    ⏣ • ${prefix}sound26
    ⏣ • ${prefix}sound27
    ⏣ • ${prefix}sound28
    ⏣ • ${prefix}sound29
    ⏣ • ${prefix}sound30
    ⏣ • ${prefix}sound31
    ⏣ • ${prefix}sound32
    ⏣ • ${prefix}sound33
    ⏣ • ${prefix}sound34
    ⏣ • ${prefix}sound35
    ⏣ • ${prefix}sound36
    ⏣ • ${prefix}sound37
    ⏣ • ${prefix}sound38
    ⏣ • ${prefix}sound39
    ⏣ • ${prefix}sound40
    ⏣ • ${prefix}sound41
    ⏣ • ${prefix}sound42
    ⏣ • ${prefix}sound43
    ⏣ • ${prefix}sound44
    ⏣ • ${prefix}sound45
    ⏣ • ${prefix}sound46
    ⏣ • ${prefix}sound47
    ⏣ • ${prefix}sound48
    ⏣ • ${prefix}sound49
    ⏣ • ${prefix}sound50
    ⏣ • ${prefix}sound51
    ⏣ • ${prefix}sound52
    ⏣ • ${prefix}sound53
    ⏣ • ${prefix}sound54
    ⏣ • ${prefix}sound55
    ⏣ • ${prefix}sound56
    ⏣ • ${prefix}sound57
    ⏣ • ${prefix}sound58
    ⏣ • ${prefix}sound59
    ⏣ • ${prefix}sound60
    ⏣ • ${prefix}sound61
    ⏣ • ${prefix}sound62
    ⏣ • ${prefix}sound63
    ⏣ • ${prefix}sound64
    ⏣ • ${prefix}sound65
    ⏣ • ${prefix}sound66
    ⏣ • ${prefix}sound67
    ⏣ • ${prefix}sound68
    ⏣ • ${prefix}sound69
    ⏣ • ${prefix}sound70
    ⏣ • ${prefix}sound71
    ⏣ • ${prefix}sound72
    ⏣ • ${prefix}sound73
    ⏣ • ${prefix}sound74
    ⏣ • ${prefix}sound75
    ⏣ • ${prefix}sound76
    ⏣ • ${prefix}sound77
    ⏣ • ${prefix}sound78
    ⏣ • ${prefix}sound79
    ⏣ • ${prefix}sound80
    ⏣ • ${prefix}sound81
    ⏣ • ${prefix}sound82
    ⏣ • ${prefix}sound83
    ⏣ • ${prefix}sound84
    ⏣ • ${prefix}sound85
    ⏣ • ${prefix}sound86
    ⏣ • ${prefix}sound87
    ⏣ • ${prefix}sound88
    ⏣ • ${prefix}sound89
    ⏣ • ${prefix}sound90
    ⏣ • ${prefix}sound91
    ⏣ • ${prefix}sound92
    ⏣ • ${prefix}sound93
    ⏣ • ${prefix}sound94
    ⏣ • ${prefix}sound95
    ⏣ • ${prefix}sound96
    ⏣ • ${prefix}sound97
    ⏣ • ${prefix}sound98
    ⏣ • ${prefix}sound99
    ⏣ • ${prefix}sound100
    ⏣ • ${prefix}sound101
    ⏣ • ${prefix}sound102
    ⏣ • ${prefix}sound103
    ⏣ • ${prefix}sound104
    ⏣ • ${prefix}sound105
    ⏣ • ${prefix}sound106
    ⏣ • ${prefix}sound107
    ⏣ • ${prefix}sound108
    ⏣ • ${prefix}sound109
    ⏣ • ${prefix}sound110
    ⏣ • ${prefix}sound111
    ⏣ • ${prefix}sound112
    ⏣ • ${prefix}sound113
    ⏣ • ${prefix}sound114
    ⏣ • ${prefix}sound115
    ⏣ • ${prefix}sound116
    ⏣ • ${prefix}sound117
    ⏣ • ${prefix}sound118
    ⏣ • ${prefix}sound119
    ⏣ • ${prefix}sound120
    ⏣ • ${prefix}sound121
    ⏣ • ${prefix}sound122
    ⏣ • ${prefix}sound123
    ⏣ • ${prefix}sound124
    ⏣ • ${prefix}sound125
    ⏣ • ${prefix}sound126
    ⏣ • ${prefix}sound127
    ⏣ • ${prefix}sound128
    ⏣ • ${prefix}sound129
    ⏣ • ${prefix}sound130
    ⏣ • ${prefix}sound131
    ⏣ • ${prefix}sound132
    ⏣ • ${prefix}sound133
    ⏣ • ${prefix}sound134
    ⏣ • ${prefix}sound135
    ⏣ • ${prefix}sound136
    ⏣ • ${prefix}sound137
    ⏣ • ${prefix}sound138
    ⏣ • ${prefix}sound139
    ⏣ • ${prefix}sound140
    ⏣ • ${prefix}sound141
    ⏣ • ${prefix}sound142
    ⏣ • ${prefix}sound143
    ⏣ • ${prefix}sound144
    ⏣ • ${prefix}sound145
    ⏣ • ${prefix}sound146
    ⏣ • ${prefix}sound147
    ⏣ • ${prefix}sound148
    ⏣ • ${prefix}sound149
    ⏣ • ${prefix}sound150
    ⏣ • ${prefix}sound151
    ⏣ • ${prefix}sound152
    ⏣ • ${prefix}sound153
    ⏣ • ${prefix}sound154
    ⏣ • ${prefix}sound155
    ⏣ • ${prefix}sound156
    ⏣ • ${prefix}sound157
    ⏣ • ${prefix}sound158
    ⏣ • ${prefix}sound159
    ⏣ • ${prefix}sound160
    ⏣ • ${prefix}sound161
┈──────────────────────⏣
    ➳    *B O T  C L O N E*
┈──────────────────────⏣`)
    } else if (args[0] == 'audio'){
    sendres(from, `┈──────────────────────⏣
            *卂ㄩ刀丨ㄖ       爪乇几ㄩ*  
┈──────────────────────⏣
    ⏣ • ${prefix}addvn *audio*
    ⏣ • ${prefix}listvn *audio*
    ⏣ • ${prefix}delvn *audio*
    ⏣ • ${prefix}bass *reply audio*
    ⏣ • ${prefix}deep *reply audio*
    ⏣ • ${prefix}slow *reply audio*
    ⏣ • ${prefix}blown
    ⏣ • ${prefix}smooth
    ⏣ • ${prefix}earrape
    ⏣ • ${prefix}fast
    ⏣ • ${prefix}fat
    ⏣ • ${prefix}reverse
    ⏣ • ${prefix}nightcore
    ⏣ • ${prefix}robot
    ⏣ • ${prefix}squirrel
┈──────────────────────⏣
            *AUDIO CHANGER*
┈──────────────────────⏣`)
    } else if (args[0] == 'game'){
let tumgame = 'https://telegra.ph/file/8e4e3a861cd5e00956236.mp4'
let teksgame = `┌─────────────────────⏣
┤            *ム卂爪乇       爪乇几ㄩ*  
╰┬━───────────────────⏣
┌┤
││  ⏣ • ${prefix}werewolf
││  ⏣ • ${prefix}sᴜɪᴛ *ᴍᴇɴᴛɪᴏɴ ᴏʀ ʀᴇᴘʟʏ*
││  ⏣ • ${prefix}ᴛɪᴄᴛᴀᴄᴛᴏᴇ *ᴍᴇɴᴛɪᴏɴ ᴏʀ ʀᴇᴘʟʏ*
││  ⏣ • ${prefix}ᴅᴇʟᴛᴛᴛ
││  ⏣ • ${prefix}ᴘᴇᴛᴀᴋʙᴏᴍ
││  ⏣ • ${prefix}ᴅᴇʟᴘᴇᴛᴀᴋʙᴏᴍ
││  ⏣ • ${prefix}ᴛᴇʙᴀᴋɢᴀᴍʙᴀʀ
││  ⏣ • ${prefix}ᴛᴇʙᴀᴋᴀɴɪᴍᴇ
││  ⏣ • ${prefix}ᴛᴇʙᴀᴋᴋᴀʙᴜᴘᴀᴛᴇɴ
││  ⏣ • ${prefix}ᴛᴇʙᴀᴋʟᴀɢᴜ
││  ⏣ • ${prefix}ᴋᴜɪs
││  ⏣ • ${prefix}ᴛᴇʙᴀᴋᴋᴀʟɪᴍᴀᴛ
││  ⏣ • ${prefix}ᴛᴇʙᴀᴋᴋᴀᴛᴀ
││  ⏣ • ${prefix}ᴛᴇʙᴀᴋʟɪʀɪᴋ
││  ⏣ • ${prefix}ᴛᴇʙᴀᴋᴋɪᴍɪᴀ
││  ⏣ • ${prefix}ᴛᴇʙᴀᴋʙᴇɴᴅᴇʀᴀ
││  ⏣ • ${prefix}sᴜsᴜɴᴋᴀᴛᴀ
││  ⏣ • ${prefix}ᴀsᴀʜᴏᴛᴀᴋ
││  ⏣ • ${prefix}sɪᴀᴘᴀᴋᴀʜᴀᴋᴜ
││  ⏣ • ${prefix}ᴄᴀᴋʟᴏɴᴛᴏɴɢ
││  ⏣ • ${prefix}ᴍᴀᴛʜ ᴍᴏᴅᴇ
││  ⏣ • ${prefix}ғᴀᴍɪʟʏ100
││  ⏣ • ${prefix}ʙᴀʟᴀɴᴄᴇ
││  ⏣ • ${prefix}ᴛᴏᴘʙᴀʟᴀɴᴄᴇ
││  ⏣ • ${prefix}ᴛʀᴀɴsғᴇʀ    
╰╰────────────────────⏣
      *P L A Y   W I T H   F R I E N D*
┈─────────────────────⏣`
alice.sendMessage(m.chat, {
    video: {url: tumgame},
    mimetype: 'video/mp4',
    fileLength: 1000,
    caption: teksgame,
    gifPlayback: true,
    gifAttribution: 5,
    contextInfo: {
    externalAdReply: {
title: `PROVIDED BY DARWIN`, 
body: 'creator asli dari project script alice',
thumbnailUrl: 'https://telegra.ph/file/49f8bb18a10eabf86aa50.jpg',
sourceUrl: `https://wa.me/${global.owner2}`,
mediaType: 1,
renderLargerThumbnail: false,
}}
  }, {
    quoted: fkontak2
  })
    } else if (args[0] == 'shop'){
    sendres(from, `┈──────────────────────⏣
            *S H O P   S H O P*  
┈──────────────────────⏣
    ⏣ • ${prefix}saldo *lihat saldo anda*
    ⏣ • ${prefix}topup *nominal*
    ⏣ • ${prefix}cekmin *bukti prabayar*
    ⏣ • ${prefix}belipanel *lakukan pembelian*
    ⏣ • ${prefix}addusr *beli user panel anda*
    ⏣ • ${prefix}beliserver *beli server user*
    ⏣ • ${prefix}addsaldo *untuk creator*
    ⏣ • ${prefix}listpanel *lihat harga*
    ⏣ • ${prefix}listvps  *lihat harga*
    ⏣ • ${prefix}listusr *data user*
    ⏣ • ${prefix}listsrv *data server*
    
┈──────────────────────⏣
            *A U T O   P A Y M E N T*  
┈──────────────────────⏣`)
    } else if (args[0] == 'fun'){
    if (!isGroup) return onlyGroup()
    sendres(from, `┈──────────────────────⏣
            *千ㄩ几       爪乇几ㄩ*  
┈──────────────────────⏣
    ⏣ • ${prefix}createqr *text*
    ⏣ • ${prefix}detectqr *reply qr*
    ⏣ • ${prefix}apakah *text*
    ⏣ • ${prefix}bagaimanakah *text*
    ⏣ • ${prefix}kapankah *text*
    ⏣ • ${prefix}bisakah *text
    ⏣ • ${prefix}sangecek *tag*
    ⏣ • ${prefix}cantikcek *tag*
    ⏣ • ${prefix}gantengcek *tag*
    ⏣ • ${prefix}jomokcek *tag*
    ⏣ • ${prefix}wangy *tag*
    ⏣ • ${prefix}rate
    ⏣ • ${prefix}tolol
    ⏣ • ${prefix}goblog
    ⏣ • ${prefix}goblok
    ⏣ • ${prefix}idiot
    ⏣ • ${prefix}gay
    ⏣ • ${prefix}jomok
    ⏣ • ${prefix}bajingan
    ⏣ • ${prefix}munafik
    ⏣ • ${prefix}kontol
    ⏣ • ${prefix}yatim
    ⏣ • ${prefix}poke
    ⏣ • ${prefix}pembokep
    ⏣ • ${prefix}hitam
    ⏣ • ${prefix}jawa
    ⏣ • ${prefix}wibu
    ⏣ • ${prefix}stress
    ⏣ • ${prefix}miskin
    ⏣ • ${prefix}cantik
    ⏣ • ${prefix}manis
    ⏣ • ${prefix}babi
    ⏣ • ${prefix}ganteng
    ⏣ • ${prefix}cina
    ⏣ • ${prefix}atheis
    ⏣ • ${prefix}papua
    ⏣ • ${prefix}nigga
    ⏣ • ${prefix}pengentot
    ⏣ • ${prefix}seksi
    ⏣ • ${prefix}kawai
    ⏣ • ${prefix}tercindo
    ⏣ • ${prefix}fembokef
    ⏣ • ${prefix}pengocok
    ⏣ • ${prefix}cabul
    ⏣ • ${prefix}fuckboy
    ⏣ • ${prefix}playboy
    ⏣ • ${prefix}sange
    ⏣ • ${prefix}sangean
    ⏣ • ${prefix}hot
    
┈──────────────────────⏣
          *P R O J E C T    A L I C E*
┈──────────────────────⏣`)
    } else if (args[0] == 'all'){
    sendres(from, `┈──────────────────────⏣
            *丨几千ㄖ          乃ㄖㄒ*
┈──────────────────────⏣
    ⏣ • Hi ${pushname}
    ⏣ • Bot Name :  Alice
    ⏣ • Bot Status : Public
    ⏣ • Library : @adiwajshing/baileys
    ⏣ • Version : 1,3,1
    ⏣ • Memory Used : ${formatp(os.totalmem() - os.freemem())}
    ⏣ • Platform : ${process.platform + ' ' + process.arch}
    ⏣ • Speed : ${latensi.toFixed(4)} miliseconds
    
    ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎
┈──────────────────────⏣
            *丨几千ㄖ         爪乇几ㄩ*
┈──────────────────────⏣
  ⏣ • ${prefix}menu
  ⏣ • ${prefix}credit
  ⏣ • ${prefix}totalfitur
  ⏣ • ${prefix}infobot
  ⏣ • ${prefix}owner
  ⏣ • ${prefix}ping
  ⏣ • ${prefix}sc
  ⏣ • ${prefix}test
  ⏣ • ${prefix}status
  ⏣ • ${prefix}owner
  ⏣ • ${prefix}listban
  ⏣ • ${prefix}listprem
  
┈──────────────────────⏣
            *ﾌ卂刀丨乃ㄖㄒ*
┈──────────────────────⏣
  ⏣ • ${prefix}jadibot
  ⏣ • ${prefix}stopjadibot
  ⏣ • ${prefix}startjadibot
  ⏣ • ${prefix}listjadibot
  ⏣ • ${prefix}delsession
  ⏣ • ${prefix}getsession
  ⏣ • ${prefix}carajadibot
  
┈──────────────────────⏣
            *ム卂爪乇       爪乇几ㄩ*  
┈──────────────────────⏣
  ⏣ • ${prefix}werewolf
  ⏣ • ${prefix}suit *mention or reply*
  ⏣ • ${prefix}tictactoe *mention or reply*
  ⏣ • ${prefix}delttt
  ⏣ • ${prefix}petakbom
  ⏣ • ${prefix}delpetakbom
  ⏣ • ${prefix}tebakgambar
  ⏣ • ${prefix}tebakanime
  ⏣ • ${prefix}tebaklagu
  ⏣ • ${prefix}kuis
  ⏣ • ${prefix}tebakkalimat
  ⏣ • ${prefix}tebakkata
  ⏣ • ${prefix}tebaklirik
  ⏣ • ${prefix}tebakkimia
  ⏣ • ${prefix}tebakbendera
  ⏣ • ${prefix}susunkata
  ⏣ • ${prefix}asahotak
  ⏣ • ${prefix}siapakahaku
  ⏣ • ${prefix}caklontong
  ⏣ • ${prefix}math *mode*
  ⏣ • ${prefix}family100
  ⏣ • ${prefix}balance
  ⏣ • ${prefix}topbalance

┈──────────────────────⏣
            *千ㄩ几       爪乇几ㄩ*  
┈──────────────────────⏣
  ⏣ • ${prefix}createqr *text*
  ⏣ • ${prefix}detectqr *reply qr*
  ⏣ • ${prefix}apakah
  ⏣ • ${prefix}bagaimanakah
  ⏣ • ${prefix}kapankah
  ⏣ • ${prefix}bisakah
  ⏣ • ${prefix}sangecek
  ⏣ • ${prefix}cantikcek
  ⏣ • ${prefix}gantengcek
  ⏣ • ${prefix}jomokcek
  ⏣ • ${prefix}wangy
  ⏣ • ${prefix}rate
  
┈──────────────────────⏣
            *ㄗ尺工爪乃口れ*
┈──────────────────────⏣
  ⏣ • ${prefix}artinama *text*
  ⏣ • ${prefix}artimimpi *text*
  ⏣ • ${prefix}kecocokanpasangan *text*
  ⏣ • ${prefix}kecocokannama *text*
  ⏣ • ${prefix}jadianpernikahan *text*
  ⏣ • ${prefix}rezeki *text*
  ⏣ • ${prefix}sifatusaha *text*
  ⏣ • ${prefix}pekerjaan *text*
  ⏣ • ${prefix}artitarot *text*
  ⏣ • ${prefix}potensipenyakit *text*
  ⏣ • ${prefix}ramalannasib *text*
  ⏣ • ${prefix}harisangar *text*
  ⏣ • ${prefix}haribaik *text*
  ⏣ • ${prefix}fengshui *text*
  ⏣ • ${prefix}nagahari *text*
  ⏣ • ${prefix}harinaas *text*
  ⏣ • ${prefix}weton *text*
  ⏣ • ${prefix}peruntungan *text*
  ⏣ • ${prefix}arahrejeki *text*
  ⏣ • ${prefix}sifat *text*
  ⏣ • ${prefix}kebetuntungan *text*
  ⏣ • ${prefix}memancing *text*
  ⏣ • ${prefix}masasubur *text*
  ⏣ • ${prefix}zodiak *text*
  ⏣ • ${prefix}shio *text*
  
┈──────────────────────⏣
            *匚ㄖ几V乇尺ㄒ乇尺*
┈──────────────────────⏣
  ⏣ • ${prefix}qc *text*
  ⏣ • ${prefix}smeme *image & text*
  ⏣ • ${prefix}sticker *reply image/video*
  ⏣ • ${prefix}toimg *reply sticker*
  ⏣ • ${prefix}toptv *reply video*
  ⏣ • ${prefix}tomp4 *reply sticker*
  ⏣ • ${prefix}toaudio *reply video*
  ⏣ • ${prefix}tovn *reply audio*
  ⏣ • ${prefix}toanime *reply foto*
  ⏣ • ${prefix}diffusion *gambar*
  ⏣ • ${prefix}remini *reply gambar*
  ⏣ • ${prefix}jadi *modelnya*
  ⏣ • ${prefix}differentme *modelnya*

┈──────────────────────⏣
            *M E N U    S E A R C H*
┈──────────────────────⏣
  ⏣ • ${prefix}play *text*
  ⏣ • ${prefix}pinterest *text*
  ⏣ • ${prefix}ytvideo *text*
  ⏣ • ${prefix}yts *querry*
  ⏣ • ${prefix}aiimg *text*
  ⏣ • ${prefix}txt2img *prompt*
  ⏣ • ${prefix}ai *ask*
  ⏣ • ${prefix}hutao *ask*
  ⏣ • ${prefix}miku *ask*
  ⏣ • ${prefix}cai *char & text*
  ⏣ • ${prefix}xnxxs *title*
  ⏣ • ${prefix}animesearch *title*

┈──────────────────────⏣
            *刀ㄖ山几ㄥㄖ卂刀乇尺*
┈──────────────────────⏣
  ⏣ • ${prefix}ytmp3 *link youtube*
  ⏣ • ${prefix}ytdok *link youtube*
  ⏣ • ${prefix}ytvn *link youtube*
  ⏣ • ${prefix}ytvideo *link youtube*
  ⏣ • ${prefix}tiktok *link tiktok*
  ⏣ • ${prefix}fbdl *link*
  ⏣ • ${prefix}mediafire *link*
  ⏣ • ${prefix}igdl *link*
  
┈──────────────────────⏣
            *几丂千山        爪乇几ㄩ*
┈──────────────────────⏣
  ⏣ • ${prefix}xnxxs *[judul]*
  ⏣ • ${prefix}xnxxdl *[link]*
  ⏣ • ${prefix}bokep1-27
  ⏣ • ${prefix}art
  ⏣ • ${prefix}awoo
  ⏣ • ${prefix}btw
  ⏣ • ${prefix}cogan
  ⏣ • ${prefix}elaina2
  ⏣ • ${prefix}exo
  ⏣ • ${prefix}elf
  ⏣ • ${prefix}estetic
  ⏣ • ${prefix}kanna
  ⏣ • ${prefix}loli
  ⏣ • ${prefix}shota
  ⏣ • ${prefix}husbu
  ⏣ • ${prefix}sagiri
  ⏣ • ${prefix}shinobu
  ⏣ • ${prefix}megumin
  ⏣ • ${prefix}wallnime
  ⏣ • ${prefix}neko
  ⏣ • ${prefix}waifu
  ⏣ • ${prefix}kill
  ⏣ • ${prefix}pat
  ⏣ • ${prefix}lick
  ⏣ • ${prefix}bite
  ⏣ • ${prefix}yeet
  ⏣ • ${prefix}bonk
  ⏣ • ${prefix}wink
  ⏣ • ${prefix}poke
  ⏣ • ${prefix}nom
  ⏣ • ${prefix}slap
  ⏣ • ${prefix}smile
  ⏣ • ${prefix}wave
  ⏣ • ${prefix}blush
  ⏣ • ${prefix}smug
  ⏣ • ${prefix}glomp
  ⏣ • ${prefix}happy
  ⏣ • ${prefix}dance
  ⏣ • ${prefix}cringe
  ⏣ • ${prefix}highfive
  ⏣ • ${prefix}handhold
  
┈──────────────────────⏣
            *几丂千山*
┈──────────────────────⏣
       *COMING SOON*
       
┈──────────────────────⏣
            *爪乇几ㄩ     ム尺ㄖㄩ卩*
┈──────────────────────⏣
  ⏣ • ${prefix}daftar
  ⏣ • ${prefix}setcmd *command*
  ⏣ • ${prefix}listcmd
  ⏣ • ${prefix}delcmd *command*
  ⏣ • ${prefix}ai *pertanyaan*
  ⏣ • ${prefix}afk *alasan*
  ⏣ • ${prefix}tagall *text*
  ⏣ • ${prefix}hidetag *text*
  ⏣ • ${prefix}google *text*
  ⏣ • ${prefix}ppcp/couple
  ⏣ • ${prefix}getname *mention or reply*
  ⏣ • ${prefix}getpp *mention or reply*
  ⏣ • ${prefix}getbio *mention or reply*
  ⏣ • ${prefix}delete *reply pesan*
  ⏣ • ${prefix}promote *mention or reply*
  ⏣ • ${prefix}demote *mention or reply*
  ⏣ • ${prefix}add *number*
  ⏣ • ${prefix}kick *mention or reply*
  ⏣ • ${prefix}infogrup
  ⏣ • ${prefix}linkgrup
  ⏣ • ${prefix}grup *open / close*
  ⏣ • ${prefix}revoke 
  ⏣ • ${prefix}join *Link Grup*
  ⏣ • ${prefix}left *Id Grup*
  ⏣ • ${prefix}setppgrup *reply photo*
  ⏣ • ${prefix}setgrupname *text*
  ⏣ • ${prefix}setdesc *text*
  ⏣ • ${prefix}pushkontakfrom *text*
  
┈──────────────────────⏣
            *ㄖ山几乇尺      爪乇几ㄩ*
┈──────────────────────⏣
  ⏣ • ${prefix}public
  ⏣ • ${prefix}self
  ⏣ • ${prefix}delsampah
  ⏣ • ${prefix}nowa *nomor*
  ⏣ • ${prefix}anticall *on / off*
  ⏣ • ${prefix}autoreadsw *on / off*
  ⏣ • ${prefix}banned *mention or reply*
  ⏣ • ${prefix}unbanned *mention or reply*
  ⏣ • ${prefix}addprem *mention or reply*
  ⏣ • ${prefix}delprem *mention or reply*
  ⏣ • ${prefix}setprefix *symbol*
  ⏣ • ${prefix}setcover *link photo*
  ⏣ • ${prefix}setppbot *reply photo*
  ⏣ • ${prefix}block *mention or reply*
  ⏣ • ${prefix}unblock *mention or reply*
  ⏣ • ${prefix}listblock
  ⏣ • ${prefix}delchat
  ⏣ • ${prefix}readvo *reply viewonce*
  ⏣ • ${prefix}setnamabot *nama*
  ⏣ • ${prefix}setbiobot *bionya*

┈──────────────────────⏣
            *尺卂几刀ㄖ爪     ㄗ卄口匕口*
┈──────────────────────⏣
  ⏣ • ${prefix}hijab
  ⏣ • ${prefix}indo
  ⏣ • ${prefix}japanese
  ⏣ • ${prefix}korean
  ⏣ • ${prefix}malay
  ⏣ • ${prefix}randomgirl
  ⏣ • ${prefix}randomboy
  ⏣ • ${prefix}thai
  ⏣ • ${prefix}vietnamese
  ⏣ • ${prefix}aesthetic
  ⏣ • ${prefix}chinese
  ⏣ • ${prefix}pubg
  ⏣ • ${prefix}antiwork
  ⏣ • ${prefix}blackpink2
  ⏣ • ${prefix}cosplay
  ⏣ • ${prefix}cat
  ⏣ • ${prefix}doggo
  ⏣ • ${prefix}justina
  ⏣ • ${prefix}kayes
  ⏣ • ${prefix}bike
  ⏣ • ${prefix}boneka
  ⏣ • ${prefix}kpop
  ⏣ • ${prefix}notnot
  ⏣ • ${prefix}car
  ⏣ • ${prefix}rose
  ⏣ • ${prefix}ryujin
  ⏣ • ${prefix}ulzangboy
  ⏣ • ${prefix}ulzanggirl
  ⏣ • ${prefix}mobilelegend

┈──────────────────────⏣
            *丹れ工爪モ*
┈──────────────────────⏣
  ⏣ • ${prefix}akira 
  ⏣ • ${prefix}akiyama 
  ⏣ • ${prefix}ana 
  ⏣ • ${prefix}asuna 
  ⏣ • ${prefix}ayuzawa 
  ⏣ • ${prefix}boruto 
  ⏣ • ${prefix}chiho 
  ⏣ • ${prefix}chitoge 
  ⏣ • ${prefix}cosplayloli 
  ⏣ • ${prefix}cosplaysagiri 
  ⏣ • ${prefix}deidara 
  ⏣ • ${prefix}doraemon 
  ⏣ • ${prefix}elena
  ⏣ • ${prefix}emilia 
  ⏣ • ${prefix}erza 
  ⏣ • ${prefix}gremory 
  ⏣ • ${prefix}hestia 
  ⏣ • ${prefix}hinata 
  ⏣ • ${prefix}husbu 
  ⏣ • ${prefix}inori 
  ⏣ • ${prefix}isuzu 
  ⏣ • ${prefix}itachi 
  ⏣ • ${prefix}itori 
  ⏣ • ${prefix}kaga 
  ⏣ • ${prefix}kagura 
  ⏣ • ${prefix}kakasih 
  ⏣ • ${prefix}kaori 
  ⏣ • ${prefix}keneki 
  ⏣ • ${prefix}kotori 
  ⏣ • ${prefix}kurumi 
  ⏣ • ${prefix}loli 
  ⏣ • ${prefix}madara 
  ⏣ • ${prefix}megumin 
  ⏣ • ${prefix}mikasa 
  ⏣ • ${prefix}mikey 
  ⏣ • ${prefix}miku 
  ⏣ • ${prefix}minato 
  ⏣ • ${prefix}naruto 
  ⏣ • ${prefix}neko 
  ⏣ • ${prefix}neko2 
  ⏣ • ${prefix}nekonime 
  ⏣ • ${prefix}nezuko 
  ⏣ • ${prefix}onepiece 
  ⏣ • ${prefix}pokemon 
  ⏣ • ${prefix}randomnime 
  ⏣ • ${prefix}randomnime2 
  ⏣ • ${prefix}rize 
  ⏣ • ${prefix}sagiri 
  ⏣ • ${prefix}sakura 
  ⏣ • ${prefix}sasuke 
  ⏣ • ${prefix}shina 
  ⏣ • ${prefix}shinka 
  ⏣ • ${prefix}shinomiya 
  ⏣ • ${prefix}shizuka 
  ⏣ • ${prefix}shota 
  ⏣ • ${prefix}tejina 
  ⏣ • ${prefix}toukachan 
  ⏣ • ${prefix}tsunade 
  ⏣ • ${prefix}waifu 
  ⏣ • ${prefix}animewall 
  ⏣ • ${prefix}yotsuba 
  ⏣ • ${prefix}yuki 
  ⏣ • ${prefix}yulibocil 
  ⏣ • ${prefix}yumeko
  ⏣ • ${prefix}8ball
  ⏣ • ${prefix}tickle
  ⏣ • ${prefix}gecg
  ⏣ • ${prefix}feed

┈──────────────────────⏣
            *卂丂ㄩ卩卂几*
┈──────────────────────⏣
  ⏣ • ${prefix}asupan1-20
  ⏣ • ${prefix}tiktokgirl
  ⏣ • ${prefix}tiktoknukthy
  ⏣ • ${prefix}tiktokkayes
  ⏣ • ${prefix}tiktokpanrika
  ⏣ • ${prefix}tiktoknotnot
  ⏣ • ${prefix}tiktokghea 
  ⏣ • ${prefix}tiktoksantuy 
  ⏣ • ${prefix}tiktokbocil 
  
┈──────────────────────⏣
            *ㄒ乇乂ㄒ       爪卂Ҝ乇尺*
┈──────────────────────⏣
  ⏣ • ${prefix}blackpink *text*
  ⏣ • ${prefix}neon *text*
  ⏣ • ${prefix}greenneon *text*
  ⏣ • ${prefix}advanceglow *text*
  ⏣ • ${prefix}futureneon *text*
  ⏣ • ${prefix}sandwriting *text*
  ⏣ • ${prefix}sandsummer *text*
  ⏣ • ${prefix}sandengraved *text*
  ⏣ • ${prefix}metaldark *text*
  ⏣ • ${prefix}neonlight *text*
  ⏣ • ${prefix}holographic *text*
  ⏣ • ${prefix}text1917 *text*
  ⏣ • ${prefix}minion *text*
  ⏣ • ${prefix}deluxesilver *text*
  ⏣ • ${prefix}newyearcard *text*
  ⏣ • ${prefix}bloodfrosted *text*
  ⏣ • ${prefix}halloween *text*
  ⏣ • ${prefix}jokerlogo *text*
  ⏣ • ${prefix}fireworksparkle *text*
  ⏣ • ${prefix}natureleaves *text*
  ⏣ • ${prefix}bokeh *text*
  ⏣ • ${prefix}toxic *text*
  ⏣ • ${prefix}strawberry *text*
  ⏣ • ${prefix}box3d *text*
  ⏣ • ${prefix}roadwarning *text*
  ⏣ • ${prefix}breakwall *text*
  ⏣ • ${prefix}icecold *text*
  ⏣ • ${prefix}luxury *text*
  ⏣ • ${prefix}cloud *text*
  ⏣ • ${prefix}summersand *text*
  ⏣ • ${prefix}horrorblood *text*
  ⏣ • ${prefix}thunder *text*
  
┈──────────────────────⏣
            *卂ㄩ刀丨ㄖ       爪乇几ㄩ*  
┈──────────────────────⏣
  ⏣ • ${prefix}addvn *audio*
  ⏣ • ${prefix}listvn *audio*
  ⏣ • ${prefix}delvn *audio*
  ⏣ • ${prefix}bass *reply audio*
  ⏣ • ${prefix}deep *reply audio*
  ⏣ • ${prefix}slow *reply audio*
  ⏣ • ${prefix}blown *reply audio*
  ⏣ • ${prefix}smooth *reply audio* 
  ⏣ • ${prefix}earrape *reply audio*
  ⏣ • ${prefix}fast *reply audio*
  ⏣ • ${prefix}fat *reply audio*
  ⏣ • ${prefix}reverse *reply audio*
  ⏣ • ${prefix}nightcore *reply audio*
  ⏣ • ${prefix}robot *reply audio*
  ⏣ • ${prefix}squirrel *reply audio*
 
┈──────────────────────⏣
            *モㄗ卄口匕口*
┈──────────────────────⏣
  ⏣ • ${prefix}1917text
  ⏣ • ${prefix}angelwing
  ⏣ • ${prefix}announofwin
  ⏣ • ${prefix}birthdaycake
  ⏣ • ${prefix}capercut
  ⏣ • ${prefix}cardhalloween
  ⏣ • ${prefix}christmascard
  ⏣ • ${prefix}christmasseason
  ⏣ • ${prefix}covergamepubg
  ⏣ • ${prefix}covergraffiti
  ⏣ • ${prefix}dragonfire
  ⏣ • ${prefix}embroider
  ⏣ • ${prefix}fabrictext
  ⏣ • ${prefix}facebookgold
  ⏣ • ${prefix}facebooksilver
  ⏣ • ${prefix}funnyanimations
  ⏣ • ${prefix}funnyhalloween
  ⏣ • ${prefix}galaxybat
  ⏣ • ${prefix}galaxywallpaper
  ⏣ • ${prefix}generalexam
  ⏣ • ${prefix}glowingtext
  ⏣ • ${prefix}graffiti3d
  ⏣ • ${prefix}graffititext
  ⏣ • ${prefix}graffititext2
  ⏣ • ${prefix}graffititext3
  ⏣ • ${prefix}greetingcardvideo
  ⏣ • ${prefix}halloweenbats
  ⏣ • ${prefix}heartcup
  ⏣ • ${prefix}heartflashlight
  ⏣ • ${prefix}horrorletter
  ⏣ • ${prefix}icetext
  ⏣ • ${prefix}instagramgold
  ⏣ • ${prefix}instagramsilver
  ⏣ • ${prefix}lightningpubg
  ⏣ • ${prefix}lovecard
  ⏣ • ${prefix}lovelycute
  ⏣ • ${prefix}masteryavatar
  ⏣ • ${prefix}merrycard
  ⏣ • ${prefix}messagecoffee
  ⏣ • ${prefix}metalstar
  ⏣ • ${prefix}milkcake
  ⏣ • ${prefix}moderngold
  ⏣ • ${prefix}moderngold2
  ⏣ • ${prefix}modengold3
  ⏣ • ${prefix}moderngoldsilver
  ⏣ • ${prefix}nameonheart
  ⏣ • ${prefix}noeltext
  ⏣ • ${prefix}projectyasuo
  ⏣ • ${prefix}pubgbirthday
  ⏣ • ${prefix}pubgglicthvideo
  ⏣ • ${prefix}pubgmascotlogo
  ⏣ • ${prefix}puppycute
  ⏣ • ${prefix}realembroidery
  ⏣ • ${prefix}retrotext
  ⏣ • ${prefix}rosebirthday
  ⏣ • ${prefix}snowontext
  ⏣ • ${prefix}starsnight
  ⏣ • ${prefix}summerbeach
  ⏣ • ${prefix}sunglightshadow
  ⏣ • ${prefix}textcakes
  ⏣ • ${prefix}texthalloween
  ⏣ • ${prefix}textonglass
  ⏣ • ${prefix}textsky
  ⏣ • ${prefix}thundertext
  ⏣ • ${prefix}twittergold
  ⏣ • ${prefix}twittersilver
  ⏣ • ${prefix}viettel
  ⏣ • ${prefix}vintagetelevision
  ⏣ • ${prefix}watercolor2
  ⏣ • ${prefix}womansday
  ⏣ • ${prefix}writeblood
  ⏣ • ${prefix}writegalaxy
  ⏣ • ${prefix}writehorror
  ⏣ • ${prefix}youtubegold
  ⏣ • ${prefix}youtubesilver
  ⏣ • ${prefix}zombie3d

┈──────────────────────⏣
            *丂ㄖㄩ几刀*
┈──────────────────────⏣
  ⏣ • ${prefix}sound1
  ⏣ • ${prefix}sound2
  ⏣ • ${prefix}sound3
  ⏣ • ${prefix}sound4
  ⏣ • ${prefix}sound5
  ⏣ • ${prefix}sound6
  ⏣ • ${prefix}sound7
  ⏣ • ${prefix}sound8
  ⏣ • ${prefix}sound9
  ⏣ • ${prefix}sound10
  ⏣ • ${prefix}sound11
  ⏣ • ${prefix}sound12
  ⏣ • ${prefix}sound13
  ⏣ • ${prefix}sound14
  ⏣ • ${prefix}sound15
  ⏣ • ${prefix}sound16
  ⏣ • ${prefix}sound17
  ⏣ • ${prefix}sound18
  ⏣ • ${prefix}sound19
  ⏣ • ${prefix}sound20
  ⏣ • ${prefix}sound21
  ⏣ • ${prefix}sound22
  ⏣ • ${prefix}sound23
  ⏣ • ${prefix}sound24
  ⏣ • ${prefix}sound25
  ⏣ • ${prefix}sound26
  ⏣ • ${prefix}sound27
  ⏣ • ${prefix}sound28
  ⏣ • ${prefix}sound29
  ⏣ • ${prefix}sound30
  ⏣ • ${prefix}sound31
  ⏣ • ${prefix}sound32
  ⏣ • ${prefix}sound33
  ⏣ • ${prefix}sound34
  ⏣ • ${prefix}sound35
  ⏣ • ${prefix}sound36
  ⏣ • ${prefix}sound37
  ⏣ • ${prefix}sound38
  ⏣ • ${prefix}sound39
  ⏣ • ${prefix}sound40
  ⏣ • ${prefix}sound41
  ⏣ • ${prefix}sound42
  ⏣ • ${prefix}sound43
  ⏣ • ${prefix}sound44
  ⏣ • ${prefix}sound45
  ⏣ • ${prefix}sound46
  ⏣ • ${prefix}sound47
  ⏣ • ${prefix}sound48
  ⏣ • ${prefix}sound49
  ⏣ • ${prefix}sound50
  ⏣ • ${prefix}sound51
  ⏣ • ${prefix}sound52
  ⏣ • ${prefix}sound53
  ⏣ • ${prefix}sound54
  ⏣ • ${prefix}sound55
  ⏣ • ${prefix}sound56
  ⏣ • ${prefix}sound57
  ⏣ • ${prefix}sound58
  ⏣ • ${prefix}sound59
  ⏣ • ${prefix}sound60
  ⏣ • ${prefix}sound61
  ⏣ • ${prefix}sound62
  ⏣ • ${prefix}sound63
  ⏣ • ${prefix}sound64
  ⏣ • ${prefix}sound65
  ⏣ • ${prefix}sound66
  ⏣ • ${prefix}sound67
  ⏣ • ${prefix}sound68
  ⏣ • ${prefix}sound69
  ⏣ • ${prefix}sound70
  ⏣ • ${prefix}sound71
  ⏣ • ${prefix}sound72
  ⏣ • ${prefix}sound73
  ⏣ • ${prefix}sound74
  ⏣ • ${prefix}sound75
  ⏣ • ${prefix}sound76
  ⏣ • ${prefix}sound77
  ⏣ • ${prefix}sound78
  ⏣ • ${prefix}sound79
  ⏣ • ${prefix}sound80
  ⏣ • ${prefix}sound81
  ⏣ • ${prefix}sound82
  ⏣ • ${prefix}sound83
  ⏣ • ${prefix}sound84
  ⏣ • ${prefix}sound85
  ⏣ • ${prefix}sound86
  ⏣ • ${prefix}sound87
  ⏣ • ${prefix}sound88
  ⏣ • ${prefix}sound89
  ⏣ • ${prefix}sound90
  ⏣ • ${prefix}sound91
  ⏣ • ${prefix}sound92
  ⏣ • ${prefix}sound93
  ⏣ • ${prefix}sound94
  ⏣ • ${prefix}sound95
  ⏣ • ${prefix}sound96
  ⏣ • ${prefix}sound97
  ⏣ • ${prefix}sound98
  ⏣ • ${prefix}sound99
  ⏣ • ${prefix}sound100
  ⏣ • ${prefix}sound101
  ⏣ • ${prefix}sound102
  ⏣ • ${prefix}sound103
  ⏣ • ${prefix}sound104
  ⏣ • ${prefix}sound105
  ⏣ • ${prefix}sound106
  ⏣ • ${prefix}sound107
  ⏣ • ${prefix}sound108
  ⏣ • ${prefix}sound109
  ⏣ • ${prefix}sound110
  ⏣ • ${prefix}sound111
  ⏣ • ${prefix}sound112
  ⏣ • ${prefix}sound113
  ⏣ • ${prefix}sound114
  ⏣ • ${prefix}sound115
  ⏣ • ${prefix}sound116
  ⏣ • ${prefix}sound117
  ⏣ • ${prefix}sound118
  ⏣ • ${prefix}sound119
  ⏣ • ${prefix}sound120
  ⏣ • ${prefix}sound121
  ⏣ • ${prefix}sound122
  ⏣ • ${prefix}sound123
  ⏣ • ${prefix}sound124
  ⏣ • ${prefix}sound125
  ⏣ • ${prefix}sound126
  ⏣ • ${prefix}sound127
  ⏣ • ${prefix}sound128
  ⏣ • ${prefix}sound129
  ⏣ • ${prefix}sound130
  ⏣ • ${prefix}sound131
  ⏣ • ${prefix}sound132
  ⏣ • ${prefix}sound133
  ⏣ • ${prefix}sound134
  ⏣ • ${prefix}sound135
  ⏣ • ${prefix}sound136
  ⏣ • ${prefix}sound137
  ⏣ • ${prefix}sound138
  ⏣ • ${prefix}sound139
  ⏣ • ${prefix}sound140
  ⏣ • ${prefix}sound141
  ⏣ • ${prefix}sound142
  ⏣ • ${prefix}sound143
  ⏣ • ${prefix}sound144
  ⏣ • ${prefix}sound145
  ⏣ • ${prefix}sound146
  ⏣ • ${prefix}sound147
  ⏣ • ${prefix}sound148
  ⏣ • ${prefix}sound149
  ⏣ • ${prefix}sound150
  ⏣ • ${prefix}sound151
  ⏣ • ${prefix}sound152
  ⏣ • ${prefix}sound153
  ⏣ • ${prefix}sound154
  ⏣ • ${prefix}sound155
  ⏣ • ${prefix}sound156
  ⏣ • ${prefix}sound157
  ⏣ • ${prefix}sound158
  ⏣ • ${prefix}sound159
  ⏣ • ${prefix}sound160
  ⏣ • ${prefix}sound161
┈──────────────────────⏣
➳    *B O T  C L O N E*
┈──────────────────────⏣
   _Youtube.com/@BG-DARWIN_
`)
} else sendres(from, menuutama)
alice.updateProfileStatus('Powered By Project Alicezation')
await delay(1000)
alice.sendMessage(from, { audio: fs.readFileSync('./assets/audio/Alice Team.m4a'), mimetype:'audio/mpeg', ptt:false})
break
case 'ping': {
	const used = process.memoryUsage()
	let timestamp = speed()
	let latensi = speed() - timestamp
	let neww = performance.now()
	let oldd = performance.now()
	let respon = `*CONNECTION SPEED*
Response Speed : *${latensi.toFixed(4)}* / second

*SERVER INFO*
Ram : *${formatp(os.totalmem() - os.freemem())}* / ${formatp(os.totalmem())}

*MEMORY USED*
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}`.trim()
reply795(respon)
				}
				break
 case 'runtime':{
 reply(`*Alice* active during *${runtime(process.uptime())}*`)
  }
	break
// BATAS AKHIR
default:
if (body.startsWith('>')) {
if(!isCreator) return reply(`*[ System Notice ]* cannot access`)
try {
let evaled = await eval(body.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await reply(evaled)
} catch (err) {
reply(String(err))
}
}
if (body.startsWith('$')){
if(!isCreator) return reply(`*[ System Notice ]* cannot access`)
qur = body.slice(2)
exec(qur, (err, stdout) => {
if (err) return reply795(`${err}`)
if (stdout) {
reply(stdout)
}
})
}
if (body.startsWith('<')) {
if(!isCreator) return reply(`*[ System Notice ]* cannot access`)
try {
return m.reply(JSON.stringify(eval(`${args.join(' ')}`),null,'\t'))
} catch (e) {
m.reply(e)
}
}

}
} catch (err) {
m.reply(util.format(err))
}
}
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})
