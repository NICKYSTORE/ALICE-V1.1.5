const fs = require('fs')
const chalk = require('chalk')
const { join, dirname } = require('path')

const dirr = join('./cloneBot', './database')

const data = {
user: join(dirr, 'user.db.json'),
};

// database user
try {
fs.existsSync(data.user) ? JSON.parse(fs.readFileSync(data.user)) : fs.writeFileSync(data.user, JSON.stringify({}, null, 2))
} catch (err) {
fs.writeFileSync(data.user, JSON.stringify({}, null, 2));
console.log('FILE DATABASE USER ERROR!')
}

let db = {
user: JSON.parse(fs.readFileSync(data.user)),
}


async function initDatabase() {
setInterval(async() => {
fs.writeFileSync(data.user, JSON.stringify(db.user, null, 2)); //Write from read file db user 
}, 990);
}

module.exports = { db, initDatabase }

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.greenBright("[ UPDATE ]"), chalk.whiteBright(`${__filename}`) )
delete require.cache[file]
require(file)
})