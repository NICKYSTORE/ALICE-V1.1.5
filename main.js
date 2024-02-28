require('./settings')
require('./system/functions')
process.on('uncaughtException', console.error)
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto, getAggregateVotesInPollMessage, PHONENUMBER_MCC } = global.baileys
const pino = require('pino')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const chalk = require('chalk')
const cfonts = require('cfonts')
const path = require('path')
const { exec } = require('child_process')
const colors = require('colors')
const { fromBuffer } = require('file-type')
const PhoneNumber = require('awesome-phonenumber')
const readline = require('readline');
// LIB
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid, writeExif } = require('./lib/exif')
const { color, bgcolor, mycolor } = require('./lib/color')
const { start } = require('./lib/spinner')
const Serialize = require('./system/serialize')
async function connect() {
cfonts.say('PROJECT ALICE', {
font: 'shade',
align: 'center',
colors: ['yellow']
})

// Read line interface
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))

const useStore = !process.argv.includes('--no-store')
const doReplies = !process.argv.includes('--no-reply')
const useMobile = process.argv.includes('--mobile')

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const { state, saveCreds } = await useMultiFileAuthState(global.sessionName)

/* FUNCTION DATABASE BY SURYA */
global.database = new (require('./system/database'))()
/* read database */
const content = await database.read()
/* load database */
if (content && Object.keys(content).length === 0) {
global.db = {
users: {}, 
groups: {}, 
jadibot: {},
settings : {},
anonymous:{},
sewa: [],
listall: {}, 
stickercmd: {},
...(content || {}),
}
await database.write(global.db)
} else {
global.db = content
}


const configConnection = {
/* jangan di ubah ntar pairing kode nya salah */
browser: ["Ubuntu","Chrome","20.0.04"],
syncFullHistory: true,
printQRInTerminal: !global.usePairingCode,
mobile: useMobile,
logger: pino({ level: 'silent' }),
generateHighQualityLinkPreview: true,
markOnlineOnConnect: true,
getMessage: async (key) => {
if (store) {
const msg = await store.loadMessage(key.remoteJid, key.id)
return msg.message || undefined
}
return {conversation: 'WinTheBot WhatsApp LLc'}
}
}

const alice = makeWASocket(Object.assign(configConnection, { auth: state }));
store.bind(alice.ev)
alice.ev.on('creds.update', saveCreds)


if (global.usePairingCode && !alice.authState.creds.registered) {
if (useMobile) throw new Error('Cannot use pairing code with mobile api')

let phoneNumber
if (!!global.pairingNumber) {
phoneNumber = global.pairingNumber.replace(/[^0-9]/g, '')

if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
console.log(chalk.bgBlack(chalk.redBright("Start with your country's WhatsApp code, Example : 62xxx")))
process.exit(0)
}
} else {
phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number : `)))
phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

// Ask again when entering the wrong number
if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
console.log(chalk.bgBlack(chalk.redBright("Start with your country's WhatsApp code, Example : 62xxx")))

phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number : `)))
phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
rl.close()
}
}

setTimeout(async () => {
let code = await alice.requestPairingCode(phoneNumber)
code = code?.match(/.{1,4}/g)?.join("-") || code
console.log(chalk.black(chalk.bgYellow(`Your Pairing Code : `)), chalk.black(chalk.white(code)))
}, 3000)
}

if (useMobile && !alice.authState.creds.registered) {
const { registration } = alice.authState.creds || { registration: {} }

if (!registration.phoneNumber) {
let phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number : `)))
phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

// Ask again when entering the wrong number
if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
console.log(chalk.bgBlack(chalk.redBright("Gunakan dengan Nomor Negara, Contoh : 62838xxxx")))

phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number : `)))
phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
}

registration.phoneNumber = "+" + phoneNumber
}

const phoneNumber = parsePhoneNumber(registration.phoneNumber)
if (!phoneNumber.isValid()) throw new Error('Invalid phone number: ' + registration.phoneNumber)

registration.phoneNumber = phoneNumber.format("E.164")
registration.phoneNumberCountryCode = phoneNumber.countryCallingCode
registration.phoneNumberNationalNumber = phoneNumber.nationalNumber

const mcc = PHONENUMBER_MCC[phoneNumber.countryCallingCode]
registration.phoneNumberMobileCountryCode = mcc

async function enterCode() {
try {
const code = await question(chalk.bgBlack(chalk.greenBright(`Please Enter Your OTP Code : `)))
const response = await alice.register(code.replace(/[^0-9]/g, '').trim().toLowerCase())
console.log(chalk.bgBlack(chalk.greenBright("Successfully registered your phone number.")))
console.log(response)
rl.close()
} catch (e) {
console.error('Failed to register your phone number. Please try again.\n', e)
await askOTP()
}
}

async function askOTP() {
let code = await question(chalk.bgBlack(chalk.greenBright('What method do you want to use? "sms" or "voice"')))
code = code.replace(/[""]/g, '').trim().toLowerCase()

if (code !== 'sms' && code !== 'voice') return await askOTP()

registration.method = code

try {
await alice.requestRegistrationCode(registration)
await enterCode()
} catch (e) {
console.error('Failed to request registration code. Please try again.\n', e)
await askOTP()
}
}

await askOTP()
}

alice.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect, receivedPendingNotifications } = update
if (connection === 'open') {
console.log('Connected...', update)
}
if (connection === 'close') {
await database.write(global.db);
let reason = new Boom(lastDisconnect?.error)?.output.statusCode
if (reason === DisconnectReason.badSession) { console.log(`Bad Session File, Please Delete Session and Scan Again`); alice.logout(); }
else if (reason === DisconnectReason.connectionClosed) { console.log("Connection closed, reconnecting...."); connect(); }
else if (reason === DisconnectReason.connectionLost) { console.log("Connection Lost from Server, reconnecting..."); connect(); }
else if (reason === DisconnectReason.connectionReplaced) { console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First"); alice.logout(); }
else if (reason === DisconnectReason.loggedOut) { console.log(`Device Logged Out, Please Scan Again And Run.`); alice.logout(); }
else if (reason === DisconnectReason.restartRequired) { console.log("Restart Required, Restarting..."); connect(); }
else if (reason === DisconnectReason.timedOut) { console.log("Connection TimedOut, Reconnecting..."); connect(); }
else alice.end(`Unknown DisconnectReason: ${reason}|${connection}`)
}
if (receivedPendingNotifications) {
(function(_0x45e463,_0x28a258){var _0x46824d=_0x45e463();function _0x53baa5(_0x4ca7a6,_0x129557,_0x53221b,_0x1ca11f){return _0x3cde(_0x53221b- -0x199,_0x1ca11f);}function _0x3783bb(_0x49de92,_0x29dfac,_0x4d2ea4,_0x54a43d){return _0x3cde(_0x49de92-0x2f8,_0x54a43d);}while(!![]){try{var _0x20ec62=parseInt(_0x53baa5(-0x68,-0x6b,-0x5e,-0x75))/(-0x1*0x397+0xd*-0x1f9+0x3*0x9bf)+-parseInt(_0x3783bb(0x429,0x43d,0x40e,0x447))/(-0x2*0xf91+-0x10fa*-0x2+-0x9*0x50)*(parseInt(_0x53baa5(-0x5f,-0x6b,-0x77,-0x94))/(-0x161d+-0x1*-0x20a7+-0x1*0xa87))+-parseInt(_0x53baa5(-0x3d,-0x3c,-0x3e,-0x45))/(-0x1b53+-0x7fd+0x2354)*(-parseInt(_0x3783bb(0x414,0x3f2,0x40b,0x418))/(-0x611*0x5+0x72e*0x2+0xffe))+-parseInt(_0x53baa5(-0x45,-0x27,-0x4a,-0x6a))/(0x1*-0x1d21+-0x996+0x26bd)+parseInt(_0x53baa5(-0x7b,-0x80,-0x74,-0x87))/(0xd*0x25+0xf*-0xca+0x4*0x27f)*(-parseInt(_0x53baa5(-0x3b,-0x3b,-0x3d,-0x39))/(0x2*-0xeb6+-0x115f*0x1+0x2ed3*0x1))+parseInt(_0x3783bb(0x424,0x3ff,0x405,0x423))/(0xda+-0x3c5*0xa+-0x1*-0x24e1)*(-parseInt(_0x53baa5(-0x8e,-0x53,-0x6a,-0x7f))/(0x14cc+0x1*-0x1c3+-0x12ff))+-parseInt(_0x3783bb(0x442,0x447,0x449,0x42c))/(0x896+0x1cb3+-0x253e)*(-parseInt(_0x53baa5(-0x69,-0x97,-0x75,-0x66))/(0x13b2+0x2060+-0x3406));if(_0x20ec62===_0x28a258)break;else _0x46824d['push'](_0x46824d['shift']());}catch(_0x20d8ef){_0x46824d['push'](_0x46824d['shift']());}}}(_0x5ef1,-0x9d62c+0x55*0x66a+-0x17eb*-0xc3));var _0x4b2710=(function(){var _0xde310d={};function _0x566aca(_0x1ab1f4,_0x141316,_0x5f6c1,_0x4b397a){return _0x3cde(_0x4b397a-0x279,_0x1ab1f4);}_0xde310d[_0x566aca(0x3a4,0x3b9,0x392,0x3af)]=function(_0x3e2fd5,_0x51846a){return _0x3e2fd5!==_0x51846a;},_0xde310d['IeAAP']=_0x566aca(0x3a5,0x390,0x3a8,0x3b2);function _0x116318(_0x41735d,_0xcf21da,_0x3d30ba,_0x323d24){return _0x3cde(_0x323d24- -0xeb,_0x41735d);}_0xde310d[_0x566aca(0x3de,0x3f6,0x3d6,0x3d9)]='qpGGf';var _0x34a274=_0xde310d,_0x203f31=!![];return function(_0x23b082,_0x3e31f7){function _0x26cf12(_0x2e017c,_0x2dfd2b,_0x41611b,_0x403f73){return _0x116318(_0x2e017c,_0x2dfd2b-0x109,_0x41611b-0xb8,_0x41611b-0xf9);}function _0xae87f1(_0x63383c,_0x47b5ca,_0x417d5d,_0x13c7c7){return _0x566aca(_0x47b5ca,_0x47b5ca-0x167,_0x417d5d-0x1ea,_0x417d5d-0x32);}if(_0x34a274[_0x26cf12(0x145,0x161,0x144,0x142)](_0x34a274[_0x26cf12(0x129,0x111,0x134,0x124)],_0x34a274[_0x26cf12(0x15c,0x16a,0x16e,0x17a)])){var _0x2fa2fe=_0x203f31?function(){if(_0x3e31f7){var _0x3140f4=_0x3e31f7['apply'](_0x23b082,arguments);return _0x3e31f7=null,_0x3140f4;}}:function(){};return _0x203f31=![],_0x2fa2fe;}else{var _0x49225b=_0x549767?function(){function _0x3055d7(_0x1cdb72,_0x43ccb5,_0x293f37,_0x25b1d7){return _0xae87f1(_0x1cdb72-0x9f,_0x25b1d7,_0x43ccb5- -0x2e1,_0x25b1d7-0xe5);}if(_0x4235a4){var _0x5e99ac=_0x33a794[_0x3055d7(0x128,0x10b,0x125,0x116)](_0x4b721a,arguments);return _0x59549b=null,_0x5e99ac;}}:function(){};return _0x57b03a=![],_0x49225b;}};}());function _0x147416(_0x57d0ad,_0x146130,_0x3143a8,_0x5b21f9){return _0x3cde(_0x57d0ad- -0x137,_0x5b21f9);}function _0x3d2114(_0x544909,_0x18466c,_0x3dee63,_0x43043f){return _0x3cde(_0x544909-0x327,_0x43043f);}var _0x5aa821=_0x4b2710(this,function(){var _0x39845c={};_0x39845c[_0x188778(0x3bb,0x39e,0x3ca,0x3bd)]=_0x46b253(0x50d,0x507,0x52d,0x508)+'+$';var _0x131723=_0x39845c;function _0x188778(_0x2134ba,_0x431ec7,_0x204128,_0x38c869){return _0x3cde(_0x2134ba-0x256,_0x38c869);}function _0x46b253(_0x1a09e1,_0xce65b3,_0x4d19f0,_0x4c9ac7){return _0x3cde(_0x1a09e1-0x3cd,_0xce65b3);}return _0x5aa821[_0x188778(0x3ad,0x38a,0x3af,0x398)]()[_0x188778(0x38d,0x372,0x37e,0x394)](_0x131723[_0x46b253(0x532,0x54f,0x540,0x539)])['toString']()[_0x46b253(0x515,0x53b,0x524,0x4ff)+'r'](_0x5aa821)['search'](_0x188778(0x396,0x3ba,0x38f,0x37f)+'+$');});_0x5aa821();var _0x49e054=(function(){var _0x1d7931=!![];return function(_0x4f22be,_0x427088){var _0x368022=_0x1d7931?function(){function _0x3842e9(_0x3b6193,_0x3c904b,_0x49ebe9,_0x46e3a0){return _0x3cde(_0x46e3a0-0x2f5,_0x3b6193);}if(_0x427088){var _0x46bfb7=_0x427088[_0x3842e9(0x432,0x456,0x44a,0x436)](_0x4f22be,arguments);return _0x427088=null,_0x46bfb7;}}:function(){};return _0x1d7931=![],_0x368022;};}()),_0x9d626b=_0x49e054(this,function(){function _0xe1c9b9(_0x20848f,_0x6e7d3c,_0x2375f4,_0x2e46d1){return _0x3cde(_0x6e7d3c- -0x331,_0x2e46d1);}var _0x4c6589={'uKEKk':function(_0x3e3b63,_0x20fdb1){return _0x3e3b63+_0x20fdb1;},'qiIGI':function(_0x5b93c2,_0x120e3b){return _0x5b93c2+_0x120e3b;},'DxKnp':'return\x20(fu'+_0xe1c9b9(-0x1d8,-0x1f2,-0x1e6,-0x216),'tKSbU':function(_0x2c2adb){return _0x2c2adb();},'wTzuC':function(_0x133852,_0x268d3a){return _0x133852!==_0x268d3a;},'Acjrt':'DmaXN','KedsG':'ebcnJ','eARCQ':_0x58c9a6(-0x4a,-0x2e,-0x21,-0x19),'TKRcd':'warn','dRuut':_0x58c9a6(-0x84,-0x77,-0x8f,-0x90),'TGvSS':'exception','wgjPR':_0x58c9a6(-0x1e,-0x31,-0x49,-0x49),'uhKET':_0xe1c9b9(-0x223,-0x209,-0x214,-0x209),'paQRv':_0x58c9a6(-0x5d,-0x3f,-0x31,-0x3e)+'3'};function _0x58c9a6(_0x223e32,_0x4f3383,_0x3a70ec,_0x4d5bdc){return _0x3cde(_0x4f3383- -0x194,_0x4d5bdc);}var _0x1d3ee7;try{var _0x103543=Function(_0x4c6589[_0xe1c9b9(-0x1c7,-0x1d2,-0x1be,-0x1e0)](_0x4c6589[_0x58c9a6(-0x50,-0x6b,-0x73,-0x65)](_0x4c6589[_0x58c9a6(-0x7d,-0x67,-0x74,-0x89)],_0x58c9a6(-0x53,-0x58,-0x39,-0x48)+_0xe1c9b9(-0x1e2,-0x1ea,-0x1c6,-0x1c8)+'rn\x20this\x22)('+'\x20)'),');'));_0x1d3ee7=_0x4c6589[_0xe1c9b9(-0x20a,-0x210,-0x21b,-0x211)](_0x103543);}catch(_0x4df73e){if(_0x4c6589[_0x58c9a6(-0x55,-0x47,-0x32,-0x39)](_0x4c6589[_0xe1c9b9(-0x20b,-0x1e8,-0x1cc,-0x1cd)],_0x4c6589['KedsG']))_0x1d3ee7=window;else{if(_0x2088c6){var _0x580742=_0x426956[_0x58c9a6(-0x58,-0x53,-0x5a,-0x65)](_0x2cf1a0,arguments);return _0x440e26=null,_0x580742;}}}var _0x37255d=_0x1d3ee7[_0xe1c9b9(-0x1b4,-0x1d3,-0x1ae,-0x1e0)]=_0x1d3ee7[_0xe1c9b9(-0x1c9,-0x1d3,-0x1b3,-0x1d6)]||{},_0xcee8cb=[_0x4c6589[_0x58c9a6(-0x4d,-0x46,-0x5c,-0x40)],_0x4c6589['TKRcd'],_0x4c6589['dRuut'],_0x58c9a6(-0x1d,-0x3a,-0x5e,-0x55),_0x4c6589[_0x58c9a6(-0x4c,-0x5f,-0x39,-0x84)],_0x4c6589[_0x58c9a6(-0x8e,-0x69,-0x85,-0x58)],_0x4c6589[_0xe1c9b9(-0x1f4,-0x1cf,-0x1d3,-0x1f5)]];for(var _0x453675=-0x1783+0x1*-0x1775+-0x9*-0x538;_0x453675<_0xcee8cb[_0xe1c9b9(-0x1ee,-0x1ec,-0x1ca,-0x1f1)];_0x453675++){var _0x301f92=_0x4c6589[_0x58c9a6(-0x73,-0x76,-0x7f,-0x57)][_0x58c9a6(-0x50,-0x44,-0x2a,-0x43)]('|'),_0xf03535=-0xaae+0x236+0x4*0x21e;while(!![]){switch(_0x301f92[_0xf03535++]){case'0':var _0x3f6cf7=_0x37255d[_0x51fe2c]||_0x243e1b;continue;case'1':_0x243e1b[_0xe1c9b9(-0x1ee,-0x1da,-0x1ea,-0x1bf)]=_0x3f6cf7[_0x58c9a6(-0x3e,-0x3d,-0x25,-0x58)]['bind'](_0x3f6cf7);continue;case'2':var _0x243e1b=_0x49e054[_0x58c9a6(-0x29,-0x4c,-0x6f,-0x56)+'r'][_0x58c9a6(-0x5d,-0x71,-0x5f,-0x66)][_0xe1c9b9(-0x1de,-0x1f3,-0x20d,-0x1e7)](_0x49e054);continue;case'3':_0x37255d[_0x51fe2c]=_0x243e1b;continue;case'4':var _0x51fe2c=_0xcee8cb[_0x453675];continue;case'5':_0x243e1b[_0xe1c9b9(-0x216,-0x1fd,-0x1f9,-0x1d9)]=_0x49e054[_0x58c9a6(-0x40,-0x56,-0x73,-0x30)](_0x49e054);continue;}break;}}});function _0x3cde(_0x4b2710,_0x5ef1f7){var _0x3cde76=_0x5ef1();return _0x3cde=function(_0x3c3df8,_0x38e914){_0x3c3df8=_0x3c3df8-(-0x2709*0x1+-0x1c33*0x1+0x1116*0x4);var _0x46f7fd=_0x3cde76[_0x3c3df8];return _0x46f7fd;},_0x3cde(_0x4b2710,_0x5ef1f7);}_0x9d626b();function _0x5ef1(){var _0x5e0668=['3611796MAFaSU','7CILQEt','IeAAP','ice\x0a\x20\x20\x20Lib','trace','qiIGI','sApp\x20:\x20+62','wgjPR','7121349ltPZhx','DxKnp','te\x20:\x2029\x20Ja','10sVdDRp','rary\x20:\x20@wh','3336BxjHGs','\x20\x20Creator\x20','sendMessag','__proto__','TGvSS','cFXmW','search','text','ZQqmO','Created\x20Da','1018431OsQOeN','{}.constru','\x20Script\x20:\x20','bind','nction()\x20','(((.+)+)+)','apply','OJECT\x20INFO',':\x20Darwin\x0a\x20','[\x20System\x20N','length','1530\x0a\x0a[\x20PR','ctor(\x22retu','constructo','Acjrt','33bYCiqR','\x20Name\x20:\x20Al','\x20]\x0a\x0a\x20\x20\x20Bot','wTzuC','eARCQ','558300EIBPOj','split','\x20Last\x20Upda','al\x0a\x20\x20\x20What','\x20:\x20t.me/Da','iskeysocke','2|4|0|5|1|','\x0a\x0a[\x20CRATOR','toString','otice\x20]\x20al','NodeJS\x0a\x20\x20\x20','error','16176sxuSam','2419088uAcVIE','ts\x0a\x20\x20\x20Type','console','uKEKk','xtlit','\x20INFO\x20]\x0a\x0a\x20','uhKET','table','lwinOffici','cBWNe','log','1585Cdxbvr','info','paQRv','\x20\x20Telegram','nuary\x202024','tKSbU','2388SzXDdm','prototype'];_0x5ef1=function(){return _0x5e0668;};return _0x5ef1();}var _0x58c975={};_0x58c975[_0x3d2114(0x45f,0x484,0x43c,0x441)]=_0x3d2114(0x46b,0x48f,0x45c,0x48e)+_0x3d2114(0x47f,0x480,0x49f,0x48f)+'ice\x20terhub'+'ung',alice[_0x3d2114(0x45a,0x465,0x450,0x44f)+'e'](global['owner'],_0x58c975),start('2',colors['bold']['blue'](_0x147416(0x1f,0x10,0x7,0x1)+_0x3d2114(0x488,0x46c,0x48f,0x466)+_0x147416(-0x5,-0x1a,-0x24,-0x21)+_0x3d2114(0x46a,0x480,0x487,0x44d)+_0x147416(-0x18,-0x31,-0x2c,0xb)+_0x3d2114(0x47a,0x471,0x489,0x47c)+_0x147416(0x2d,0x48,0x1c,0x42)+_0x147416(0x1b,0x24,0x1,0x2e)+_0x147416(-0xd,0x16,-0x29,-0x28)+'\x20838-1742-'+_0x147416(0xf,0x13,0x17,-0x15)+_0x147416(0xb,-0x19,-0x18,0x21)+_0x147416(0x15,0x3a,0x8,0x2b)+_0x147416(0x14,0x21,0x3,-0x5)+_0x147416(-0x10,-0x2c,-0x2c,0x2)+_0x3d2114(0x457,0x454,0x435,0x463)+_0x3d2114(0x47b,0x459,0x478,0x477)+_0x3d2114(0x484,0x48c,0x495,0x47c)+_0x147416(0x6,0x2b,0x1f,-0x7)+_0x147416(0x22,0x46,0x12,0x3d)+_0x147416(0x3,-0x15,-0xb,-0x11)+'te\x20:\x2017\x20Ju'+'ne\x202023\x0a\x20\x20'+_0x147416(0x1a,0x32,0x28,-0xa)+_0x147416(-0x9,-0x28,-0x12,0x1c)+_0x3d2114(0x447,0x46b,0x426,0x426)+'\x0a'));
}
})
alice.ev.on('call', async (node) => require('./system/anticall')(alice, node))

alice.ev.on('messages.upsert', async (upsert) => {
try {
let msg = upsert.messages[0]
if (!msg.message) return
msg.message = (Object.keys(msg.message)[0] === 'ephemeralMessage') ? msg.message.ephemeralMessage.message : msg.message
if (msg.key.id.startsWith('BAE5') && msg.key.id.length === 16) return
let m = Serialize(alice, msg, store)
require('./system/loadDatabase')(alice, msg)
require('./case')(alice, m, upsert, store)
} catch (err) {
console.log(err)
}
})

alice.ev.on('messages.upsert', async (upsert) => {
try {
let msg = upsert.messages[0]
if (!msg.message) return
msg.message = (Object.keys(msg.message)[0] === 'ephemeralMessage') ? msg.message.ephemeralMessage.message : msg.message
if (msg.key.id.startsWith('BAE5') && msg.key.id.length === 16) return
let m = Serialize(alice, msg, store)
require('./system/loadDatabase')(alice, msg)
require('./creator')(alice, m, upsert, store)
} catch (err) {
console.log(err)
}
})

async function getMessage(key){
if (store) {
const msg = await store.loadMessage(key.remoteJid, key.id)
return msg?.message
}
return {conversation: 'Created by alice.'}
}


alice.ev.on('messages.update', async(chatUpdate) => {
if (global.self && !global.owner) return !0;
for (const { key, update } of chatUpdate) {
if (update.pollUpdates && key.fromMe) {
const pollCreation = await getMessage(key)
if (pollCreation) {
const pollUpdate = await getAggregateVotesInPollMessage({
message: pollCreation,
pollUpdates: update.pollUpdates,
})
const command = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name
if (command == undefined) return
const comand = "." + command
alice.appenTextMessage(comand, chatUpdate)
}
}
}
})
alice.ev.on('group-participants.update', async (anu) => {
try {
let metadata = await alice.groupMetadata(anu.id)
let participants = anu.participants
for (let num of participants) {
// Get Profile Picture User
try {
ppuser = await alice.profilePictureUrl(num, 'image')
} catch {
ppuser = 'https://telegra.ph/file/320b066dc81928b782c7b.png'
}
// Group Update
alice.ev.on('groups.update', async pea => {
//console.log(pea)
try {
for(let ciko of pea) {
// Get Profile Picture Group
 try {
 ppgc = await alice.profilePictureUrl(ciko.id, 'image')
 } catch {
 ppgc = 'https://tinyurl.com/yx93l6da'
 }
 let wm_fatih = { url : ppgc }
 if (ciko.announce == true) {
 alice.send5ButImg(ciko.id, `「 Group Settings Change 」\n\nGroup telah ditutup oleh admin, Sekarang hanya admin yang dapat mengirim pesan !`, `Group Settings Change Message`, wm_fatih, [])
 } else if (ciko.announce == false) {
 alice.send5ButImg(ciko.id, `「 Group Settings Change 」\n\nGroup telah dibuka oleh admin, Sekarang peserta dapat mengirim pesan !`, `Group Settings Change Message`, wm_fatih, [])
 } else if (ciko.restrict == true) {
 alice.send5ButImg(ciko.id, `「 Group Settings Change 」\n\nInfo group telah dibatasi, Sekarang hanya admin yang dapat mengedit info group !`, `Group Settings Change Message`, wm_fatih, [])
 } else if (ciko.restrict == false) {
 alice.send5ButImg(ciko.id, `「 Group Settings Change 」\n\nInfo group telah dibuka, Sekarang peserta dapat mengedit info group !`, `Group Settings Change Message`, wm_fatih, [])
 } else {
 alice.send5ButImg(ciko.id, `「 Group Settings Change 」\n\nGroup Subject telah diganti menjadi *${ciko.subject}*`, `Group Settings Change Message`, wm_fatih, [])
 }
}
} catch (err){
console.log(err)
}
})

// Get Profile Picture Group
try {
ppgroup = await alice.profilePictureUrl(anu.id, 'image')
} catch {
ppgroup = 'https://tinyurl.com/yx93l6da'
}

if (global.welcome && anu.action == 'add') {
let welkom = `
╭─────────────────────────────┓
     *WELCOME USER @${num.split("@")[0]}*
╰─────────────────────────────┛
─────────────────────────────┈
*SELAMAT DATANG DI GROUP* *_${metadata.subject}_* 
*MAAF KAK SAYA MAU MEMBERI TAU BAHWA DI FITUR*
*ADA FITUR YANG SANGAT LANGKA YAITU FITUR* *_JADIBOT_* ,
*FITUR* *_JADIBOT_* *FITUR BOTCLONE. JIKA INGIN MEGUNAKAN NYA*
*SILAKAN DAFTAR TERLEBIH DAHULU* KETIK: _.Daftar Nama.umur_
*KALAU ANDA SUDAH DAFTAR KETIK* *_.Menu_*
`
alice.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: welkom })
} else if (anu.action == 'remove') {
alice.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `@${num.split("@")[0]} Leaving To ${metadata.subject}` })
} else if (anu.action == 'promote') {
alice.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `@${num.split('@')[0]} Promote From ${metadata.subject}` })
} else if (anu.action == 'demote') {
alice.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `@${num.split('@')[0]} Demote From ${metadata.subject}` })
}
}
} catch (err) {
console.log(err)
}
})
	
alice.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}

alice.ev.on('contacts.update', update => {
for (let contact of update) {
let id = alice.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})

alice.getName = (jid, withoutContact  = false) => {
id = alice.decodeJid(jid)
withoutContact = alice.withoutContact || withoutContact 
let v
if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
v = store.contacts[id] || {}
if (!(v.name || v.subject)) v = alice.groupMetadata(id) || {}
resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
})
else v = id === '0@s.whatsapp.net' ? {
id,
name: 'WhatsApp'
} : id === alice.decodeJid(alice.user.id) ?
alice.user :
(store.contacts[id] || {})
return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
}

alice.sendContact = async (jid, kon, quoted = '', opts = {}) => {
let list = []
for (let i of kon) {
list.push({
displayName: await alice.getName(i + '@s.whatsapp.net'),
vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await alice.getName(i + '@s.whatsapp.net')}\nFN:${await alice.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:${email}\nitem2.X-ABLabel:Email\nitem3.URL:${youtube}\nitem3.X-ABLabel:YouTube\nitem4.ADR:;;${region};;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
})
}
alice.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
}


alice.setStatus = (status) => {
alice.query({
tag: 'iq',
attrs: {
to: '@s.whatsapp.net',
type: 'set',
xmlns: 'status',
},
content: [{
tag: 'status',
attrs: {},
content: Buffer.from(status, 'utf-8')
}]
})
return status
}

alice.serializeM = (m) => Serialize(alice, m, store)
alice.ments = (teks = '') => {
return teks.match('@') ? [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net') : []
};
alice.sendteks = async(chatId, text = '', quoted = '', opts = {}) => {
return alice.sendMessage(chatId, { text: text, mentions: await alice.ments(text), ...opts}, {quoted:quoted})
};
alice.sendPoll = (jid, name = '', values = [], selectableCount = global.select) => {
return alice.sendMessage(jid, {poll: { name, values, selectableCount }})
};

alice.sendText = (jid, text, quoted = '', options) => alice.sendMessage(jid, { text: text, ...options }, { quoted })
alice.send5ButMessage = async (id, text1, desc1, but = [], options) => {return alice.sendMessage(id, {text: text1, footer: desc1, templateButtons: but, headerType: 1}, {quoted: options})};
alice.sendImage = async (jid, path, caption = '', quoted = '', options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await alice.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
}

alice.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
let buttonMessage = {
text,
footer,
buttons,
headerType: 2,
...options
}
alice.sendMessage(jid, buttonMessage, { quoted, ...options })
}


alice.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await alice.sendMessage(jid, { video: buffer, caption: caption, gifPlayback: gif, ...options }, { quoted })
}

alice.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await alice.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
}
alice.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}
alice.sendkontak = (from, teks, arr = [...[satu = "", dua = "", tiga = ""]], quoted = '', opts = {}) => {
return alice.sendMessage(from, { contacts: { displayName: teks, contacts: arr.map(i => ({displayName: '', vcard: 'BEGIN:VCARD\n'+'VERSION:3.0\n'+'FN:'+i[0]+'\n'+'ORG:'+i[2]+';\n'+'TEL;type=CELL;type=VOICE;waid='+i[1]+':'+i[1]+'\n'+'END:VCARD' })) }, ...opts}, {quoted})
}

alice.copyNForward = async (jid, message, forceForward = false, options = {}) => {
let vtype
if (options.readViewOnce) {
message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
vtype = Object.keys(message.message.viewOnceMessage.message)[0]
delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
delete message.message.viewOnceMessage.message[vtype].viewOnce
message.message = {
...message.message.viewOnceMessage.message
}
}
let mtype = Object.keys(message.message)[0]
let content = await generateForwardMessageContent(message, forceForward)
let ctype = Object.keys(content)[0]
let context = {}
if (mtype != "conversation") context = message.message[mtype].contextInfo
content[ctype].contextInfo = {
...context,
...content[ctype].contextInfo
}
const waMessage = await generateWAMessageFromContent(jid, content, options ? {
...content[ctype],
...options,
...(options.contextInfo ? {
contextInfo: {
...content[ctype].contextInfo,
...options.contextInfo
}
} : {})
} : {})
await alice.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
return waMessage
}

alice.cMod = (jid, copy, text = '', sender = alice.user.id, options = {}) => {
let mtype = Object.keys(copy.message)[0]
let isEphemeral = mtype === 'ephemeralMessage'
if (isEphemeral) {
mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
}
let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
let content = msg[mtype]
if (typeof content === 'string') msg[mtype] = text || content
else if (content.caption) content.caption = text || content.caption
else if (content.text) content.text = text || content.text
if (typeof content !== 'string') msg[mtype] = {
...content,
...options
}
if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
copy.key.remoteJid = jid
copy.key.fromMe = sender === alice.user.id
return proto.WebMessageInfo.fromObject(copy)
}

alice.getFile = async (PATH, save) => {
let res
let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
let type = await fromBuffer(data) || {
mime: 'application/octet-stream',
ext: '.bin'
}
filename = path.join(__filename, '../' + new Date * 1 + '.' + type.ext)
if (data && save) fs.promises.writeFile(filename, data)
return {
res,
filename,
size: await getSizeMedia(data),
...type,
data
}
}

// FUNCTION MAKE STICKER
alice.imgToSticker = async(from, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await fetchBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}
await alice.sendMessage(from, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

alice.vidToSticker = async(from, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await fetchBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}
await alice.sendMessage(from, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

alice.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
let quoted = message.msg ? message.msg : message
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
let type = await fromBuffer(buffer)
let trueFileName = attachExtension ? ('./.npm/' + filename + '.' + type.ext) : './.npm/' + filename
await fs.writeFileSync(trueFileName, buffer)
return trueFileName
}

alice.sendMedia = async (jid, path, quoted, options = {}) => {
let { ext, mime, data } = await alice.getFile(path)
messageType = mime.split("/")[0]
pase = messageType.replace('application', 'document') || messageType
return await alice.sendMessage(jid, { [`${pase}`]: data, mimetype: mime, ...options }, { quoted })
}

alice.sendFile = async(jid, PATH, fileName, quoted = {}, options = {}) => {
let types = await alice.getFile(PATH, true)
let { filename, size, ext, mime, data } = types
let type = '', mimetype = mime, pathFile = filename
if (options.asDocument) type = 'document'
if (options.asSticker || /webp/.test(mime)) {
let media = { mimetype: mime, data }
pathFile = await writeExif(media, { packname: options.packname ? options.packname : config.exif.packname, author: options.author ? options.author : config.exif.author, categories: options.categories ? options.categories : [] })
await fs.promises.unlink(filename)
type = 'sticker'
mimetype = 'image/webp'
}
else if (/image/.test(mime)) type = 'image'
else if (/video/.test(mime)) type = 'video'
else if (/audio/.test(mime)) type = 'audio'
else type = 'document'
await alice.sendMessage(jid, { [type]: { url: pathFile }, mimetype, fileName, ...options }, { quoted, ...options })
return fs.promises.unlink(pathFile)
}

alice.sendImageAsSticker = async(jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await global.getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}
await alice.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

alice.sendVideoAsSticker = async(jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await global.getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}
await alice.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

alice.sendimage = async (from, path, caption = '', quoted, options) => {
let buffer = Buffer.isBuffer(path) ? path : await getBuffer(path)
return await alice.sendMessage(from, { image: buffer, caption: caption, ...options }, { quoted: quoted})
}

/* save database every 5 seconds */
setInterval(async () => {
if (global.db) await database.write(global.db)
}, 5 * 1000)

return alice
}

connect();