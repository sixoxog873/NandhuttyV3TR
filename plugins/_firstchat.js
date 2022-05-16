let handler = m => m

handler.all = async function (m) {

    if (m.chat.endsWith('broadcast') || m.fromMe || m.isGroup || db.data.settings[this.user.jid].group) return
    let user = global.db.data.users[m.sender]
    if (new Date - user.pc < 86400000) return // setiap 24 jam sekali
    await this.sendButton(m.chat, `
Hai, ${this.ucapan()}

${user.banned ? 'Sen cezalısın/Yasaklısın!' : `Bazıları yapabilir ${this.user.name} Yardım?`}
`.trim(), 'Laçin Eke YouTube', user.banned ? 'Bot sahibi' : 'Menü', user.banned ? ',Sahip' : ',?', m)
    user.pc = new Date * 1
}

module.exports = handler
