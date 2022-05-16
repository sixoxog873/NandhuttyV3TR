const roles = {
    /*
    'Rol adları': <Bu Rolü Elde Etmek İçin Minimum Seviye>
    */
    'Savaşçı V': 0,
    'Savaşçı IV': 5,
    'Savaşçı III': 10,
    'Savaşçı II': 15,
    'Savaşçı I': 20,
    'Elit V': 25,
    'Elit IV': 30,
    'Elit III': 35,
    'Elit II': 40,
    'Elit I': 45,
    'Usta V': 50,
    'Usta IV': 55,
    'Usta III': 60,
    'Usta II': 65,
    'Usta I': 70,
    'Büyük Usta V': 75,
    'Büyük Usta IV': 80,
    'Büyük Usta III': 85,
    'Büyük Usta II': 90,
    'Büyük Usta I': 95,
    'Epik V': 100,
    'Epik IV': 105,
    'Epik III': 110,
    'Epik II': 115,
    'Epik I': 120,
    'Efsanevi V': 125,
    'Efsanevi IV': 130,
    'Efsanevi III': 135,
    'Efsanevi II': 140,
    'Efsanevi I': 145,
    'Mythic V': 150,
    'Mythic IV': 155,
    'Mythic III': 160,
    'Mythic II': 165,
    'Mythic I': 170,
    'Mythic zafer': 175
}

module.exports = {
    before(m) {
        let user = db.data.users[m.sender]
        let level = user.level
        let role = (Object.entries(roles).sort((a, b) => b[1] - a[1]).find(([, minLevel]) => level >= minLevel) || Object.entries(roles)[0])[0]
        user.role = role
        return !0
    }
}
