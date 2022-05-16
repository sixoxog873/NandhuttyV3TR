let fs = require('fs')
let handler = m => m

handler.all = async function (m, { conn, isBlocked }) {

    if (isBlocked || m.fromMe || m.chat.endsWith('broadcast')) return
    let set = db.data.settings[this.user.jid]
    let { isBanned } = db.data.chats[m.chat]
    let { banned } = db.data.users[m.sender]

    // etiketlendiğinde 
    if (m.isGroup) {
        if (m.mentionedJid.includes(this.user.jid)) {
            await this.send2Button(m.chat,
                isBanned ? 'Nandhutty Aktif değil!' : banned ? 'Yasaklandın!' : 'Nandhutty Aktif!',
                'Laçin Eke YouTube',
                isBanned ? 'Yasaklamayı kaldır' : banned ? 'Bot Sahibi' : 'Menü',
                isBanned ? '.unban' : banned ? '.owner' : '.?',
                m.isGroup ? 'Yasakla' : isBanned ? 'Yasaklamayı kaldır' : 'Bağış yap!',
                m.isGroup ? '.ban' : isBanned ? '.unban' : '.donasi', m)
        }
    }

    //  Biri özel sohbette bir grup bağlantısını davet ettiğinde/gönderdiğinde.
    if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat') || m.text.startsWith('bu Linki/Bağlantıyı aç')) && !m.isBaileys && !m.isGroup) {
        this.sendButton(m.chat, `┌「 *Invite Bot to Group* 」
 Selam ${name}
 Grubunuza bot eklemek ister misiniz??

Şunu yazın .join https://chat.whatsapp.com/GrupBağlantısı
`.trim(), 'Laçin Eke YouTube', 'Git', ',git', m)
    }


    // backup db
    if (set.backup) {
        if (new Date() * 1 - set.backupTime > 1000 * 60 * 60) {
            let d = new Date
            let date = d.toLocaleDateString('id', {
                Gün: 'numeric',
                Ay: 'long',
                Yıl: 'numeric'
            })
            await global.db.write()
            this.reply(global.owner[0] + '@s.whatsapp.net', `Database: ${date}`, null)
            this.sendFile(global.owner[0] + '@s.whatsapp.net', fs.readFileSync('./database.json'), 'database.json', '', 0, 0, { mimetype: 'application/json' })
            set.backupTime = new Date() * 1
        }
    }

    // update status
    if (set.autoupdatestatus) {
        if (new Date() * 1 - set.status > 1000) {
            let _uptime = process.uptime() * 1000
            let uptime = conn.clockString(_uptime)
            await this.setStatus(`Sırasında aktif ${uptime} | Mode: ${set.self ? 'Özel' : set.group ? 'Sadece Gruplarda' : 'Halka açık/Public'} | Nandhutty V3 TR By Laçin Eke YouTube`).catch(_ => _)
            set.status = new Date() * 1
        }
    }

}

module.exports = handler 
