import { materials } from '../data/materials'

interface TutorRule {
  keywords: string[]
  response: string
}

const genericRules: TutorRule[] = [
  {
    keywords: ['variable', 'variabel'],
    response: `**Variabel** adalah "wadah" untuk menyimpan data agar bisa digunakan lagi.

Contoh:
\`\`\`pseudoCode
nama <- "Andi"    # wadah nama berisi teks
umur <- 19        # wadah umur berisi angka
\`\`\`

Setelah disimpan, kamu bisa memakai wadah itu kapan saja:
\`\`\`pseudoCode
tulis(nama)      # Andi
tulis(umur)      # 19
\`\`\`

🧠 **Latihan cepat:** Coba buat variabel \`jurusan <- "Informatika"\` lalu tampilkan dengan \`tulis(jurusan)\`.`
  },
  {
    keywords: ['tipe data', 'type', 'integer', 'float', 'string', 'boolean', 'int', 'str'],
    response: `Tipe data menentukan **jenis nilai** yang disimpan program:

- **integer** → bilangan bulat: \`10\`, \`-3\`, \`0\`
- **float** → bilangan desimal: \`3.14\`, \`2.5\`
- **string** → teks: \`"Halo"\`, \`'PseudoLearn'\`
- **boolean** → \`benar\` / \`salah\` (ditampilkan sebagai \`true\` / \`false\`)
- **kosong** → tidak ada nilai

Contoh penyimpanan:
\`\`\`pseudoCode
angka <- 10          # integer
desimal <- 3.14      # float
teks <- "Halo"       # string
lulus <- benar       # boolean
belum <- kosong      # kosong

tulis(angka, desimal, teks, lulus)   # 10 3.14 Halo true
\`\`\`

⚠️ Input dari \`baca()\` selalu bertipe **string**. Untuk angka, konversi dengan \`int()\` atau \`float()\`.`
  },
  {
    keywords: ['operator', 'aritmatika', 'perbandingan', 'logika', '+', '-', '*', '/', 'mod', 'pangkat', 'eksponen'],
    response: `Operator dalam pemrograman ada beberapa jenis:

**Aritmatika:**
\`\`\`pseudoCode
5 + 2     # 7 (tambah)
5 - 2     # 3 (kurang)
5 * 2     # 10 (kali)
5 / 2     # 2.5 (bagi)
5 div 2   # 2 (bagi bulat)
5 mod 2   # 1 (sisa bagi)
2 ** 3    # 8 (pangkat)
\`\`\`

**Perbandingan** (hasilnya benar/salah): \`=\`, \`==\`, \`<>\`, \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\`

**Logika:** \`dan\`, \`atau\`, \`tidak\`

💡 \`=\` untuk membandingkan, sedangkan \`<-\` untuk menyimpan nilai — sering tertukar!`
  },
  {
    keywords: ['input', 'output', 'print', 'scanf', 'console'],
    response: `Untuk **output** gunakan \`tulis()\`:
\`\`\`pseudoCode
nama <- "Budi"
tulis(nama)                   # Budi
tulis("Nama:", nama)          # Nama: Budi (argumen dipisah satu spasi)
tulis("Halo " + nama)         # Halo Budi (menggabung teks dengan +)
\`\`\`

Untuk **input** gunakan \`baca()\`:
\`\`\`pseudoCode
nama <- baca("Masukkan nama: ")
umur <- int(baca("Masukkan umur: "))
\`\`\`

⚠️ \`baca()\` selalu memberikan string. Jika mau angka, bungkus dengan \`int()\` atau \`float()\`.`
  },
  {
    keywords: ['if', 'else', 'elif', 'percabangan', 'kondisi', 'keputusan', 'decision'],
    response: `**Percabangan** membuat program bisa mengambil keputusan:

\`\`\`pseudoCode
nilai <- 80

jika nilai >= 70 maka
  tulis("Lulus")
selainnya
  tulis("Tidak Lulus")
akhirjika
\`\`\`

Alurnya seperti percabangan jalan:
- kondisi **benar** → jalankan blok setelah \`maka\`
- kondisi **salah** → jalankan blok \`selainnya\`

Untuk banyak kondisi, susun \`jika\` secara berlapis (tidak ada \`elif\`):
\`\`\`pseudoCode
jika nilai >= 90 maka
  grade <- "A"
selainnya
  jika nilai >= 80 maka
    grade <- "B"
  selainnya
    grade <- "C"
  akhirjika
akhirjika
\`\`\`

🔑 Gunakan \`dan\`/\`atau\` untuk menggabungkan kondisi, dan jangan lupa menutup blok dengan \`akhirjika\`.`
  },
  {
    keywords: ['loop', 'perulangan', 'for', 'while', 'range', 'iterasi', 'ulang'],
    response: `Perulangan mengulang kode tanpa menulisnya berkali-kali.

**untuk** — dipakai saat jumlah pengulangan sudah diketahui:
\`\`\`pseudoCode
untuk i <- 1 sampai 5
  tulis(i)          # 1, 2, 3, 4, 5
akhiruntuk

untuk i <- 1 sampai 10 langkah 2
  tulis(i)          # 1, 3, 5, 7, 9
akhiruntuk

untuk i <- 10 menurun sampai 1
  tulis(i)          # 10, 9, ..., 1
akhiruntuk
\`\`\`

**selama** — dipakai saat pengulangan bergantung kondisi:
\`\`\`pseudoCode
n <- 0
selama n < 3
  tulis(n)
  n <- n + 1        # JANGAN lupa update!
akhirsementara
\`\`\`

- \`keluar\` → menghentikan perulangan
- \`lanjut\` → melewati iterasi saat ini

⚠️ Jika lupa mengupdate kondisi di \`selama\`, terjadi **infinite loop**.`
  },
  {
    keywords: ['function', 'fungsi', 'def', 'return', 'parameter', 'argumen'],
    response: `**Fungsi** adalah blok kode yang bisa dipanggil berulang kali.

\`\`\`pseudoCode
fungsi tambah(a, b)
  kembalikan a + b
akhirfungsi

hasil <- tambah(5, 3)
tulis(hasil)    # 8
\`\`\`

Bagian-bagiannya:
1. \`fungsi\` → kata kunci membuat fungsi
2. \`nama_fungsi\` → nama yang dipakai untuk memanggil
3. \`(a, b)\` → parameter (input)
4. \`kembalikan\` → mengembalikan nilai (opsional)

Fungsi **tanpa** \`kembalikan\` tidak menghasilkan nilai (dianggap \`kosong\`). Contoh:
\`\`\`pseudoCode
fungsi sapa(nama)
  tulis("Halo " + nama)
akhirfungsi

sapa("Budi")    # Halo Budi
\`\`\``
  },
  {
    keywords: ['list', 'array', 'append', 'pop', 'remove', 'index'],
    response: `**Array** menyimpan banyak nilai dalam satu variabel, memakai kurung siku \`[]\`:

\`\`\`pseudoCode
buah <- ["apel", "mangga", "jeruk"]
tulis(buah[1])          # apel (indeks mulai 1)
tulis(buah[3])          # jeruk
tulis(panjang(buah))    # 3 (jumlah elemen)
\`\`\`

**Menambah elemen** di akhir dilakukan pada posisi setelah elemen terakhir, secara konsep:
\`buah[panjang(buah) + 1] <- "nanas"\`

Operasi lain yang sering dipakai (secara konsep):
- **sort** → mengurutkan elemen (mis. dari kecil ke besar atau A–Z)
- **reverse** → membalik urutan elemen
- \`sum(data)\` → menjumlahkan seluruh elemen
- \`min(3, 7, 1)\` → nilai terkecil, \`max(3, 7, 1)\` → nilai terbesar

💡 Indeks array **mulai dari 1**: elemen pertama ada di \`data[1]\`.`
  },
  {
    keywords: ['dictionary', 'dict', 'key', 'value', 'peta', 'map'],
    response: `**Dictionary** (peta) menyimpan pasangan **kunci → nilai**.

Bayangkan data mahasiswa seperti ini:
\`\`\`
nama  -> "Budi"
nim   -> "12345678"
ipk   -> 3.75
\`\`\`

Cara membacanya:
- \`"nama"\` adalah **kunci**, \`"Budi"\` adalah **nilainya**
- untuk mengambil nilai, kamu menyebut kuncinya: \`mahasiswa["nama"]\` → \`"Budi"\`
- untuk menambah atau mengubah data, kamu isi lewat kunci: \`mahasiswa["aktif"] <- benar\`

🔑 Setiap kunci harus unik. Berbeda dengan array yang diakses lewat nomor urut, dictionary diakses lewat kuncinya.

*ℹ️ Interpreter pseudocode di aplikasi ini belum mendukung dictionary secara langsung, jadi contoh di atas bersifat konsep.*`
  },
  {
    keywords: ['error', 'bug', 'salah', 'tidak kerja', 'gagal', 'exception', 'syntax'],
    response: `Bantuan untuk mencari error! Berikut langkah debugging dasar:

Periksa hal-hal umum ini:

**1. Kata kunci pembuka/penutup blok** — pastikan tiap blok ditutup dengan benar:
\`\`\`pseudoCode
jika nilai >= 70 maka
  tulis("Lulus")
akhirjika          # jangan lupa menutup blok!
\`\`\`

**2. Struktur perintah** — pastikan penulisannya tepat: \`jika ... maka\`, \`selainnya\`, \`akhirjika\`; \`untuk ... sampai\`, \`akhiruntuk\`; \`selama\`, \`akhirsementara\`.

**3. Tanda kutip** — pastikan string dibuka dan ditutup dengan benar.

**4. Konversi tipe** — mengoper teks yang bukan angka ke fungsi angka menghasilkan error:
\`\`\`pseudoCode
int("abc")   # error!
\`\`\`

Jika kamu tunjukkan kode yang error ke saya (paste kodenya), saya bisa bantu cari masalahnya!`
  },
  {
    keywords: ['fstring', 'f-string', 'format', 'formatting'],
    response: `Untuk **memformat tampilan teks**, gabungkan teks dan variabel dengan operator \`+\` atau pisahkan dengan koma di \`tulis()\`:

\`\`\`pseudoCode
nama <- "Andi"
ipk <- 3.78

tulis("Nama:", nama)             # Nama: Andi
tulis("Halo " + nama)            # Halo Andi
tulis("IPK:", ipk)               # IPK: 3.78
tulis("IPK bulat:", bulat(ipk))  # IPK bulat: 4
\`\`\`

Tips format yang berguna:
- beberapa argumen di \`tulis()\` otomatis dipisah satu spasi
- gabungkan menjadi satu string dengan \`+\`
- bulatkan angka desimal dengan \`bulat()\`

Dengan cara ini kamu bisa menampilkan teks dan nilai variabel dengan rapi.`
  }
]

function detectHelpTopic(question: string): string {
  const q = question.toLowerCase()

  const keywordMap: [string[], string][] = [
    [['indentasi', 'indent'], 'indentasi'],
    [['elif'], 'elif'],
    [['nested'], 'nested'],
    [['percabangan', 'if', 'else'], 'percabangan'],
    [['perulangan', 'loop', 'for', 'while'], 'perulangan'],
    [['list'], 'list'],
    [['dictionary', 'dict'], 'dictionary'],
    [['fungsi', 'function', 'def'], 'fungsi'],
    [['variabel', 'variable'], 'variabel'],
    [['tipe data', 'type'], 'tipe data'],
    [['input'], 'input'],
    [['string'], 'string'],
    [['operator'], 'operator'],
    [['array'], 'list'],
    [['break'], 'break'],
    [['continue'], 'continue'],
  ]

  for (const [kws, topic] of keywordMap) {
    if (kws.some(k => q.includes(k))) return topic
  }
  return ''
}

export function getTopicContextName(topicId: string): string {
  const m = materials.find(m => m.id === topicId)
  return m ? m.title : ''
}

export async function getTutorResponse(question: string, currentTopic: string): Promise<string> {
  const q = question.trim().toLowerCase()
  const topicName = getTopicContextName(currentTopic)

  const greetingMatch = q.match(/(halo|hai|hi|hello|pagi|siang|sore|malam)/)
  if (greetingMatch) {
    const t = topicName ? `🎓 Saat ini kamu sedang berada di materi **${topicName}**. ` : ''
    return `Halo! 👋 Saya AI Tutor PseudoLearn. ${t}Bertanya apa saja tentang pseudocode ya, misalnya:
- "Apa itu variabel?"
- "Bagaimana cara pakai jika-maka?"
- "Jelaskan perulangan untuk"
- "Tolong bantu cari error kode saya"

Mari belajar bersama! 🚀`
  }

  if (q.includes('terima kasih') || q.includes('makasih') || q.includes('thanks')) {
    return `Sama-sama! 🎉 Senang bisa membantu. Jangan sungkan bertanya lagi kalau ada konsep pseudocode yang masih membingungkan. Tetap semangat belajarnya! 💪`
  }

  if (q.includes('contoh') || q.includes('contohkan') || (q.includes('beri') && q.includes('contoh'))) {
    const topic = detectHelpTopic(q)
    const rule = genericRules.find(r => r.keywords.includes(topic))
    if (rule) {
      return `Tentu! Berikut contoh untuk topik ini:\n\n${rule.response}`
    }
    return `Tentu, berikut contoh program pseudocode sederhana:\n\n\`\`\`pseudoCode\n# Program menyapa dan menampilkan data mahasiswa\nnama <- "Andi"\numur <- 20\nipk <- 3.75\n\ntulis("Nama:", nama)\ntulis("Umur:", umur)\ntulis("IPK:", ipk)\n\ntotal <- sum([1, 2, 3])\ntulis("Total:", total)\n\`\`\`\n\nCoba jalankan di Playground dan ubah nilainya sendiri! 💻`
  }

  if (q.includes('hint') || q.includes('petunjuk') || q.includes('clue')) {
    const topic = detectHelpTopic(q)
    switch (topic) {
      case 'percabangan':
        return `Hint untuk percabangan 💡:\n\n1. Tulis \`jika\` lalu kondisi, contoh: \`jika nilai >= 70 maka\`\n2. Untuk kondisi kedua, susun \`jika\` berlapis di dalam \`selainnya\`\n3. Gunakan \`selainnya\` sebagai pilihan terakhir\n4. Jangan lupa menutup blok dengan \`akhirjika\`\n\nCoba pikirkan: kondisi apa yang benar untuk "lulus"? 🐍`
      case 'perulangan':
        return `Hint untuk perulangan 💡:\n\n1. \`untuk i <- 1 sampai jumlah\` mengulang sejumlah kali\n2. \`untuk i <- 1 sampai 5\` berarti angka 1 sampai 5\n3. Jangan lupa menutup blok dengan \`akhiruntuk\`\n\nCoba buat loop yang mencetak 1 sampai 10, lalu coba lagi yang mencetak 10 sampai 1. 🔄`
      default:
        return `Hint umum 💡:\n\n1. Mulai dari hal paling sederhana yang kamu tahu pasti benar\n2. Uji satu bagian kode dulu sebelum lanjut\n3. Gunakan \`tulis()\` untuk melihat nilai variabel (debugging)\n\nCeritakan bagian mana yang paling membingungkan—nanti saya bantu lebih spesifik! 🐍`
    }
  }

  if (q.includes('latihan') || q.includes('soal') || q.includes('exercise')) {
    const topic = detectHelpTopic(q) || (currentTopic ? currentTopic.replace(/-/g, ' ') : '')
    if (q.includes('percabangan') || topic === 'percabangan') {
      return `Berikut latihan percabangan 📝:

**Soal:** Buat program yang menentukan apakah sebuah angka **positif, negatif, atau nol**.

Gunakan \`jika angka > 0 maka\`, \`jika angka < 0 maka\` secara berlapis, dan \`selainnya\`.

Contoh output yang diharapkan:
\`\`\`
Angka: 5
Positif
\`\`\`

Kerjakan dulu ya! Kalau sudah, coba juga versi yang menampilkan keterangan "genap"/"ganjil". 🐍`
    }
    return `Berikut latihan singkat 📝:

**Soal:** Buat program yang mencetak angka 1 sampai 10 menggunakan \`untuk\`.

Lalu ubah agar hanya mencetak angka **genap** (pakai \`untuk i <- 1 sampai 10\` dan cek \`i mod 2 = 0\`, atau gunakan \`langkah 2\`).

Kemudian tantangan kedua: gunakan \`selama\` untuk mencetak hitung mundur dari 5 sampai 1. 🔄

Jangan lupa jalankan di Playground untuk melihat hasilnya!`
  }

  if (q.includes('analogi') || q.includes('ibarat') || q.includes('bayangkan')) {
    return `Oke, mari pakai analogi! 🏠

Bayangkan pemrograman seperti **dapur**:
- **Variabel** → wadah/toples untuk menyimpan bahan (data)
- **Tipe data** → jenis wadah: botol untuk cairan (float), kotak untuk kering (integer), kertas untuk label (string)
- **jika/selainnya** → seperti memilih: "Jika beras tersisa, masak nasi; jika tidak, beli dulu"
- **untuk** → seperti memasang 10 telur di teflon satu per satu (pasti jumlahnya)
- **selama** → seperti menunggu air mendidih: terus cek sampai mendidih
- **Fungsi** → resep: sekali ditulis, bisa dipakai untuk masakan apa saja
- **Array** → rak bahan yang disusun berurutan
- **Dictionary** → buku resep dengan label nama di setiap resep

Mau analogi lebih detail untuk konsep tertentu?`
  }

  if (q.includes('kenapa') || q.includes('mengapa') || q.includes('why')) {
    const topic = detectHelpTopic(q)
    if (topic) {
      const rule = genericRules.find(r => r.keywords.includes(topic))
      if (rule) {
        return `Pertanyaan bagus! Kenapa <b>${topic}</b> penting?\n\n${rule.response}\n\nSemoga menjelaskan alasannya! Kalau masih kurang jelas, ceritakan bagian mana yang membingungkan. 🤔`
      }
    }
    return `Pertanyaan bagus! 🤔 Untuk memahami alasannya, yuk kita lihat biasanya pseudocode dipakai untuk apa.\n\nPseudocode memakai **bahasa deskriptif** yang mirip bahasa sehari-hari sehingga pemula bisa fokus pada logika, bukan memutar kepala memahami sintaks yang rumit. \`\`\`pseudoCode\nx <- 5\njika x > 3 maka\n  tulis("lebih besar")\nakhirjika\n\`\`\`\n\nBandingkan dengan bahasa pemrograman lain yang sintaksnya lebih rumit. Mau saya jelaskan konsep spesifik tertentu?`
  }

  // Specific topic answer
  const topic = detectHelpTopic(q)
  const rule = genericRules.find(r => r.keywords.includes(topic))
  if (rule) {
    const contextNote = topicName && topic && currentTopic.split('-').join(' ') !== topic
      ? `\n\n*ℹ️ Topik yang kamu tanyakan (${topic}) berbeda dengan materi yang sedang kamu buka (${topicName}). Kamu bisa mengerjakannya terpisah.*`
      : ''
    return rule.response + contextNote
  }

  // Code explanation request
  if (q.includes('jelaskan') && q.includes('kode')) {
    return `Boleh! Paste kodenya ke sini, nanti saya jelaskan baris per baris. 📖\n\nAtau coba fitur **AI Code Explainer** di halaman AI Tutor (input kode → klik "Jelaskan").`
  }

  if (q.includes('artinya') || q.includes('maksud')) {
    return `Bisa ceritakan lebih detail bagian mana yang membuat bingung? Baik itu istilah, kode, ataupun materi, saya akan jelaskan dengan bahasa yang sederhana. 🐍`
  }

  return `Hmm, saya belum yakin bisa menjawab pertanyaan itu. 🤔

Karena peran saya adalah **AI Tutor pemrograman (pseudocode)**, saya paling membantu untuk topik seperti:
- Variabel dan tipe data
- Operator
- Input/Output
- Percabangan (jika/selainnya)
- Perulangan (untuk/selama)
- Fungsi
- Array dan Dictionary
- Debugging/error

Bisa dicoba pertanyaan contoh berikut:
- "Jelaskan variabel dengan contoh"
- "Apa bedanya keluar dan lanjut?"
- "Bagaimana cara pakai array?"

Kalau kamu bertanya di luar materi pemrograman, saya mohon maaf dan saya arahkan kembali ke materi belajar ya! 😊`
}

export function generateQuickPrompt(question: string): string {
  return question.trim()
}

export function analyzeQuizFeedback(wrongTopics: string[], quizScore: number): { message: string; recommendations: string[] } {
  let message = ''
  const recommendations: string[] = []

  if (quizScore >= 90) {
    message = `Luar biasa! 🌟 Kamu sudah sangat memahami materi ini. Pertahankan dan terus tantang dirimu dengan materi berikutnya.`
  } else if (quizScore >= 70) {
    message = `Kerja bagus! 👍 Kamu sudah menguasai konsep dasar dengan cukup baik. Beberapa konsep masih bisa diperkuat untuk hasil yang lebih maksimal.`
  } else {
    message = `Tetap semangat! 💪 Masih banyak ruang untuk berkembang. Mengulang materi dan latihan akan sangat membantu memperkuat pemahamanmu.`
  }

  if (wrongTopics.length > 0) {
    message += `\n\nDari jawabanmu, konsep yang perlu diperkuat: **${wrongTopics.join(', ')}**.`
    recommendations.push(`Pelajari kembali materi ${wrongTopics[0]}`)
    recommendations.push(`Kerjakan latihan ${wrongTopics[0]} di halaman Latihan`)
    recommendations.push('Tanyakan konsep yang masih bingung ke AI Tutor')
  } else {
    recommendations.push('Lanjut ke materi berikutnya')
    recommendations.push('Coba kerjakan latihan lebih banyak')
  }

  return { message, recommendations }
}
