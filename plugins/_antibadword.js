let { GroupSettingChange } = require('@adiwajshing/baileys')
let handler = m => m

let badwordRegex = /anj(k|g)|ajn?(g|k)|a?njin(g|k)|bajingan|b(a?n)?gsa?t|ko?nto?l|me?me?(k|q)|pe?pe?(k|q)|meki|titi(t|d)|pe?ler|tetek|toket|ngewe|go?blo?k|to?lo?l|idiot|(k|ng)e?nto?(t|d)|jembut|bego|dajj?al|janc(u|o)k|pantek|puki ?(mak)?|kimak|kampang|lonte|col(i|mek?)|pelacur|henceu?t|nigga|sikerim|ananı|anani|piç|orospu|orospu çocuğu|orospu cocugu|yavşak|yavsak|porno|sex|seks|sikiş|boşalmak|fuck|dick|yarrak|bitch|tits|bastard|asshole/i // kendini ekle

handler.before = function (m, { isOwner, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return !0
    let chat = global.db.data.chats[m.chat]
    let user = global.db.data.users[m.sender]
    let isBadword = badwordRegex.exec(m.text)

    if (!chat.antiBadword && !chat.isBanned && isBadword) {
        user.warning += 1
        this.send2Button(m.chat, `*Küfür tespit edildi!!*
Warning: ${user.warning} / 5
Uyarı 5'e ulaşırsa banlanırsınız/Gruptan atılırsınız!

antibadword'ü açmak için şu komutu yaz *#on antibadword*
şunu yaz *#astagfirullah* uyarıyı azaltmak için şunu yaz *#maaf*

“YouTube Laçin Eke” (HR. al-Bukhari dan Muslim).`, 'YouTube Laçin Eke', 'Antibadwordü aç', ',1 antibadword', 'Astaghfirullah', ',maaf', m)
        if (user.warning >= 5) {
            user.banned = true
            if (m.isGroup) {
                if (isBotAdmin) {
                    this.groupSettingChange(m.chat, GroupSettingChange.messageSend, true)
                }
            }
        }
    }
    return !0
}
module.exports = handler
