let handler = async (m, { conn, usedPrefix }) => {
    let id = m.chat
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) return await conn.sendButton(m.chat, `Devamsızlık yapılmaz!`.trim(), 'Laçin Eke YouTube', 'Başlangıç', `${usedPrefix}mulaiabsen`, m)
    let d = new Date
    let date = d.toLocaleDateString('id', {
        Gün: 'numeric',
        Ay: 'long',
        Yıl: 'numeric'
    })
    let absen = conn.absen[id][1]
    let list = absen.map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join('\n')
    let caption = `
Tanggal: ${date}

${conn.absen[id][2]}
    
┌「 *Absen* 」 
├ Total: ${absen.length}
${list} 
└────`.trim()
    await conn.send2Button(m.chat, caption, 'Laçin Eke YouTube', 'Sunmak', `${usedPrefix}absen`, 'Mutlu', `${usedPrefix}-absen`, m)
}
handler.help = ['mevcut olmayan']
handler.tags = ['yoklama']
handler.command = /^cekabsen$/i

module.exports = handler
