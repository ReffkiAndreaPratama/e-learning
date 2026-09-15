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
\`\`\`python
nama = "Andi"    # wadah nama berisi teks
umur = 19        # wadah umur berisi angka
\`\`\`

Setelah disimpan, kamu bisa memakai wadah itu kapan saja:
\`\`\`python
print(nama)      # Andi
print(umur)      # 19
\`\`\`

🧠 **Latihan cepat:** Coba buat variabel \`jurusan = "Informatika"\` lalu cetak dengan \`print(jurusan)\`.`
  },
  {
    keywords: ['tipe data', 'type', 'integer', 'float', 'string', 'boolean', 'int', 'str'],
    response: `Tipe data menentukan **jenis nilai** yang disimpan Python:

- **int** → bilangan bulat: \`10\`, \`-3\`, \`0\`
- **float** → bilangan desimal: \`3.14\`, \`2.5\`
- **str** → teks: \`"Halo"\`, \`'Python'\`
- **bool** → \`True\` / \`False\`
- **None** → tidak ada nilai

Cek tipe data dengan \`type()\`:
\`\`\`python
print(type(10))      # <class 'int'>
print(type("halo"))  # <class 'str'>
\`\`\`

⚠️ Input dari \`input()\` selalu bertipe **str**. Untuk angka, konversi dengan \`int()\` atau \`float()\`.`
  },
  {
    keywords: ['operator', 'aritmatika', 'perbandingan', 'logika', '+', '-', '*', '/', 'mod', 'pangkat', 'eksponen'],
    response: `Operator di Python ada beberapa jenis:

**Aritmatika:**
\`\`\`python
5 + 2   # 7 (tambah)
5 - 2   # 3 (kurang)
5 * 2   # 10 (kali)
5 / 2   # 2.5 (bagi)
5 // 2  # 2 (bagi bulat)
5 % 2   # 1 (sisa bagi)
2 ** 3  # 8 (pangkat)
\`\`\`

**Perbandingan** (hasilnya True/False): \`==\`, \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\`

**Logika:** \`and\`, \`or\`, \`not\`

💡 \`==\` untuk membandingkan, \`=\` untuk menyimpan nilai — sering tertukar!`
  },
  {
    keywords: ['input', 'output', 'print', 'scanf', 'console'],
    response: `Untuk **output** gunakan \`print()\`:
\`\`\`python
nama = "Budi"
print(nama)                    # Budi
print(f"Nama: {nama}")         # Nama: Budi (f-string)
print("A", "B", sep="-")       # A-B
\`\`\`

Untuk **input** gunakan \`input()\`:
\`\`\`python
nama = input("Masukkan nama: ")
umur = int(input("Masukkan umur: "))
\`\`\`

⚠️ \`input()\` selalu memberikan string. Jika mau angka, bungkus dengan \`int()\` atau \`float()\`.`
  },
  {
    keywords: ['if', 'else', 'elif', 'percabangan', 'kondisi', 'keputusan', 'decision'],
    response: `**Percabangan** membuat program bisa mengambil keputusan:

\`\`\`python
nilai = 80

if nilai >= 70:
    print("Lulus")
else:
    print("Tidak Lulus")
\`\`\`

Alurnya seperti percabangan jalan:
- kondisi **True** → jalankan blok if
- kondisi **False** → jalankan blok else

Untuk banyak kondisi, pakai **elif**:
\`\`\`python
if nilai >= 90:
    grade = "A"
elif nilai >= 80:
    grade = "B"
else:
    grade = "C"
\`\`\`

🔑 Gunakan \`and\`/\`or\` untuk menggabungkan kondisi, dan jangan lupa tanda \`:\` setelah kondisi.`
  },
  {
    keywords: ['loop', 'perulangan', 'for', 'while', 'range', 'iterasi', 'ulang'],
    response: `Perulangan mengulang kode tanpa menulisnya berkali-kali.

**for** — dipakai saat jumlah pengulangan sudah diketahui:
\`\`\`python
for i in range(5):     # 0,1,2,3,4
    print(i)

for buah in ["apel", "mangga"]:
    print(buah)
\`\`\`

**while** — dipakai saat pengulangan bergantung kondisi:
\`\`\`python
n = 0
while n < 3:
    print(n)
    n += 1        # JANGAN lupa update! 
\`\`\`

- \`break\` → menghentikan loop
- \`continue\` → melewati iterasi saat ini

⚠️ Jika lupa mengupdate kondisi di \`while\`, terjadi **infinite loop**.`
  },
  {
    keywords: ['function', 'fungsi', 'def', 'return', 'parameter', 'argumen'],
    response: `**Fungsi** adalah blok kode yang bisa dipanggil berulang kali.

\`\`\`python
def tambah(a, b):
    return a + b

hasil = tambah(5, 3)
print(hasil)    # 8
\`\`\`

Bagian-bagiannya:
1. \`def\` → kata kunci membuat fungsi
2. \`nama_fungsi\` → nama yang dipakai untuk memanggil
3. \`(a, b)\` → parameter (input)
4. \`return\` → mengembalikan nilai (opsional)

Fungsi **tanpa** \`return\` mengembalikan \`None\`. Parameter juga bisa punya nilai default:
\`\`\`python
def sapa(nama="Teman"):
    print(f"Halo, {nama}")
\`\`\``
  },
  {
    keywords: ['list', 'array', 'append', 'pop', 'remove', 'index'],
    response: `**List** menyimpan banyak nilai dalam satu variabel, memakai kurung siku \`[]\`:

\`\`\`python
buah = ["apel", "mangga", "jeruk"]
print(buah[0])       # apel (index mulai 0)
print(buah[-1])      # jeruk (dari belakang)
buah.append("nanas") # tambah di akhir
buah.remove("apel")  # hapus berdasarkan nilai
print(len(buah))     # jumlah elemen
\`\`\`

Method penting: \`append()\`, \`insert()\`, \`remove()\`, \`pop()\`, \`sort()\`, \`reverse()\`

💡 Membaca/menulis dari index di awal list cepat, tapi di tengah bisa lambat untuk list yang sangat besar.`
  },
  {
    keywords: ['dictionary', 'dict', 'key', 'value', 'peta', 'map'],
    response: `**Dictionary** menyimpan pasangan **key → value**, memakai kurung kurawal \`{}\`:

\`\`\`python
mahasiswa = {
    "nama": "Budi",
    "nim": "12345678",
    "ipk": 3.75
}

print(mahasiswa["nama"])          # Budi
print(mahasiswa.get("ipk"))       # 3.75
mahasiswa["aktif"] = True         # tambah data baru
del mahasiswa["nim"]              # hapus data

for k, v in mahasiswa.items():
    print(f"{k}: {v}")
\`\`\`

🔑 Key harus unik. Tidak seperti list, dictionary tidak berurutan (sebelum Python 3.7).`
  },
  {
    keywords: ['error', 'bug', 'salah', 'tidak kerja', 'gagal', 'exception', 'syntax'],
    response: `Bantuan untuk mencari error! Berikut langkah debugging dasar:

Periksa hal-hal umum ini:

**1. Indentasi** — Python mengharuskan indentasi konsisten:
\`\`\`python
if nilai >= 70:
    print("Lulus")   # ← harus di-indent 4 spasi
\`\`\`

**2. Titik dua \`:\`** — jangan lupa setelah if/for/while/def.

**3. Tanda kutip** — pastikan string dibuka dan ditutup dengan benar.

**4. Konversi tipe** — mengoper string ke fungsi angka menghasilkan error:
\`\`\`python
int("abc")   # ValueError!
\`\`\`

Jika kamu tunjukkan kode yang error ke saya (paste kodenya), saya bisa bantu cari masalahnya!`
  },
  {
    keywords: ['fstring', 'f-string', 'format', 'formatting'],
    response: `**f-string** adalah cara terbaik untuk menggabungkan teks dan variabel (Python 3.6+):

\`\`\`python
nama = "Andi"
ipk = 3.78

print(f"Nama: {nama}, IPK: {ipk:.2f}")
print(f"IPK di atas 3.5? {ipk > 3.5}")
\`\`\`

Format yang berguna:
- \`{harga:,}\` → pemisah ribuan
- \`{.2f}\` → 2 angka desimal
- \`{.1%}\` → format persen

Tanda \`f\` sebelum kutip membuat {} bisa berisi ekspresi/variabel.`
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
    return `Halo! 👋 Saya AI Tutor PyLearn. ${t}Bertanya apa saja tentang Python ya, misalnya:
- "Apa itu variabel?"
- "Bagaimana cara pakai if?"
- "Jelaskan perulangan for"
- "Tolong bantu cari error kode saya"

Mari belajar bersama! 🚀`
  }

  if (q.includes('terima kasih') || q.includes('makasih') || q.includes('thanks')) {
    return `Sama-sama! 🎉 Senang bisa membantu. Jangan sungkan bertanya lagi kalau ada konsep Python yang masih membingungkan. Tetap semangat belajarnya! 💪`
  }

  if (q.includes('contoh') || q.includes('contohkan') || (q.includes('beri') && q.includes('contoh'))) {
    const topic = detectHelpTopic(q)
    const rule = genericRules.find(r => r.keywords.includes(topic))
    if (rule) {
      return `Tentu! Berikut contoh untuk topik ini:\n\n${rule.response}`
    }
    return `Tentu, berikut contoh program Python sederhana:\n\n\`\`\`python\n# Program menyapa dan menampilkan data mahasiswa\nnama = "Andi"\numur = 20\nipk = 3.75\n\nprint(f"Nama: {nama}")\nprint(f"Umur: {umur}")\nprint(f"IPK: {ipk}")\n\ntotal = sum([1, 2, 3])\nprint(f"Total: {total}")\n\`\`\`\n\nCoba jalankan di Playground dan ubah nilainya sendiri! 💻`
  }

  if (q.includes('hint') || q.includes('petunjuk') || q.includes('clue')) {
    const topic = detectHelpTopic(q)
    switch (topic) {
      case 'percabangan':
        return `Hint untuk percabangan 💡:\n\n1. Tulis \`if\` lalu kondisi, contoh: \`if nilai >= 70:\`\n2. Gunakan \`elif\` untuk kondisi kedua\n3. Gunakan \`else\` sebagai pilihan terakhir\n4. Jangan lupa tanda \`:\` dan indentasi\n\nCoba pikirkan: kondisi apa yang benar untuk "lulus"? 🐍`
      case 'perulangan':
        return `Hint untuk perulangan 💡:\n\n1. \`for i in range(jumlah):\` mengulang sejumlah kali\n2. \`range(1, 6)\` berarti angka 1 sampai 5\n3. Jangan lupa indentasi di dalam loop\n\nCoba buat loop yang mencetak 1 sampai 10, lalu coba lagi yang mencetak 10 sampai 1. 🔄`
      default:
        return `Hint umum 💡:\n\n1. Mulai dari hal paling sederhana yang kamu tahu pasti benar\n2. Uji satu bagian kode dulu sebelum lanjut\n3. Gunakan \`print()\` untuk melihat nilai variabel (debugging)\n\nCeritakan bagian mana yang paling membingungkan—nanti saya bantu lebih spesifik! 🐍`
    }
  }

  if (q.includes('latihan') || q.includes('soal') || q.includes('exercise')) {
    const topic = detectHelpTopic(q) || (currentTopic ? currentTopic.replace(/-/g, ' ') : '')
    if (q.includes('percabangan') || topic === 'percabangan') {
      return `Berikut latihan percabangan 📝:

**Soal:** Buat program yang menentukan apakah sebuah angka **positif, negatif, atau nol**.

Gunakan \`if angka > 0:\`, \`elif angka < 0:\`, dan \`else:\`.

Contoh output yang diharapkan:
\`\`\`
Angka: 5
Positif
\`\`\`

Kerjakan dulu ya! Kalau sudah, coba juga versi yang menampilkan keterangan "genap"/"ganjil". 🐍`
    }
    return `Berikut latihan singkat 📝:

**Soal:** Buat program yang mencetak angka 1 sampai 10 menggunakan \`for\` dan \`range()\`.

Lalu ubah agar hanya mencetak angka **genap** (pakai \`range(0, 11, 2)\`).

Kemudian tantangan kedua: gunakan \`while\` untuk mencetak hitung mundur dari 5 sampai 1. 🔄

Jangan lupa jalankan di Playground untuk melihat hasilnya!`
  }

  if (q.includes('analogi') || q.includes('ibarat') || q.includes('bayangkan')) {
    return `Oke, mari pakai analogi! 🏠

Bayangkan Python seperti **dapur**:
- **Variabel** → wadah/toples untuk menyimpan bahan (data)
- **Tipe data** → jenis wadah: botol untuk cairan (float), kotak untuk kering (int), kertas untuk label (str)
- **if/else** → seperti memilih: "Jika beras tersisa, masak nasi; jika tidak, beli dulu"
- **for** → seperti memasang 10 telur di teflon satu per satu (pasti jumlahnya)
- **while** → seperti menunggu air mendidih: terus cek sampai mendidih
- **Fungsi** → resep: sekali ditulis, bisa dipakai untuk masakan apa saja
- **List** → rak bahan yang disusun berurutan
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
    return `Pertanyaan bagus! 🤔 Untuk memahami alasannya, yuk kita lihat biasanya Python dipakai untuk apa.\n\nPython dipilih karena **sintaksnya sederhana** (mirip bahasa Inggris) sehingga programmer pemula bisa fokus pada logika, bukan memutar kepala memahami sintaks. \`\`\`python\nx = 5\nif x > 3:\n    print("lebih besar")\n\`\`\`\n\nBandingkan dengan bahasa lain yang lebih rumit sintaksnya. Mau saya jelaskan konsep spesifik tertentu?`
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

Karena peran saya adalah **AI Tutor Python**, saya paling membantu untuk topik seperti:
- Variabel dan tipe data
- Operator
- Input/Output
- Percabangan (if/elif/else)
- Perulangan (for/while)
- Fungsi
- List dan Dictionary
- Debugging/error

Bisa dicoba pertanyaan contoh berikut:
- "Jelaskan variabel dengan contoh"
- "Apa bedanya break dan continue?"
- "Bagaimana cara pakai dictionary?"

Kalau kamu bertanya di luar materi Python, saya mohon maaf dan saya arahkan kembali ke materi belajar ya! 😊`
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