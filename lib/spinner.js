var spin = require('spinnies')

var spinner = { 
"interval": 2000,
"frames": [
"┈─P──────────────────────────────────",
"┈─P─R────────────────────────────────",
"┈─P─R─O──────────────────────────────",
"┈─P─R─O─J────────────────────────────",
"┈─P─R─O─J─E──────────────────────────",
"┈─P─R─O─J─E─C────────────────────────",
"┈─P─R─O─J─E─C─T──────────────────────",
"┈─P─R─O─J─E─C─T───A──────────────────",

"┈────────────────A─L────────────────",
"┈────────────────A─L─I──────────────",
"┈────────────────A─L─I─C────────────",
"┈────────────────A─L─I─C─E──────────",
"┈──────────────────────────────────",
"┈──────────────────────────────────",
"┈───────────────────────────────────",
"┈───────────────────────────────────",

]}

let globalSpinner;
var getGlobalSpinner = (disableSpins = false) => {
if(!globalSpinner) globalSpinner = new spin({ color: 'yellow', succeedColor: 'yellow', spinner, disableSpins});
return globalSpinner;
}
spins = getGlobalSpinner(false)
module.exports.start = (id, text) => {
spins.add(id, {text: text})
}