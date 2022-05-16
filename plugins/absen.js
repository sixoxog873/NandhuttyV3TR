let handler = async (m, { conn, usedPrefix }) => {
    let id = m.chat
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) return await conn.sendButton(m.chat, `Devamsızlık yapılmaz!`, 'Laçin Eke YouTube', 'Başlangıç', `${usedPrefix}mulaiabsen`, m)
    let absen = conn.absen[id][1]
    const wasVote = absen.includes(m.sender)
    if (wasVote) throw '*Sen yoksun!*'
    absen.push(m.sender)
    let d = new Date
    let date = d.toLocaleDateString('id', {
        Gün: 'numeric',
        Ay: 'long',
        Yıl: 'numeric'
    })
    let list = absen.map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join('\n')
    let caption = `
Tarih: ${date}

${conn.absen[id][2]}

┌「 *Yoklama* 」  
├ Toplam: ${absen.length}
${list} 
└────`.trim()
    await conn.send2Button(m.chat, caption, 'Laçin Eke YouTube', 'Yoklama', `${usedPrefix}absen`, 'Kontrol etmek', `${usedPrefix}cekabsen`, m)
}
handler.help = ['absen']
handler.tags = ['absen']
handler.command = /^(absen|hadir)$/i

module.exports = handler
