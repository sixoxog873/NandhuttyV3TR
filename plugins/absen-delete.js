let handler = async(m, { conn, usedPrefix }) => {
    if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
    }
    let id = m.chat
    conn.absent = conn.absent ? conn.absent : {}
    if (!(id in conn.absen)) return await conn.sendButton(m.chat, `Devam eden devamsızlık yok!`, '© stickerin', 'Başla', `${usedPrefix}+absent`, m)
    delete conn.absen[id]
    m.reply(`Olmayan oturumu başarıyla sil!`)
}
handler.help = ['Yokluğu kaldır']
handler.tags = ['mevcut olmayan']
handler.command = /^(-|delete|delete)absent$/i

module.exports = handler
