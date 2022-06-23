const requestResponse = {
    gagal: (pesan) => {
        return {
            sukses: false,
            pesan: pesan
        }
    },
    berhasil: (pesan) => {
        return {
            sukses: true,
            pesan: pesan
        }
    },
    kesalahan: {
        sukses: false,
        pesan: 'terjadi kesahan server'
    },
    suksesLogin: (data) => {
        return {
            sukses: true,
            pesan: 'Berhasil Login',
            data: data
        }
    },
    suksesWithData: (data) => {
        return {
            sukses: true,
            pesan: 'Berhasil Memuat Data',
            data: data
        }
    }
}
module.exports = { requestResponse }