const crypto = require("crypto")

const secret = crypto.randomBytes(32).toString("hex")

console.log(secret) //cba7bdba5ad4817086eaf7c64c35966b3fa65e871131dacf7e8ddf1bd888c331