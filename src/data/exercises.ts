import type { ExerciseQuestion } from '../types'

export const exercises: ExerciseQuestion[] = [
  // PENGENALAN PEMROGRAMAN
  {
    id: 'x1', type: 'multiple-choice', topicId: 'pengenalan-python',
    question: 'Apa output dari kode berikut?',
    options: ['Halo Dunia', '"Halo Dunia"', 'Error', 'halo dunia'],
    correctIndex: 0,
    explanation: 'tulis() menampilkan isi string tanpa tanda kutip.',
    codeSnippet: 'tulis("Halo Dunia")'
  },
  {
    id: 'x2', type: 'true-false', topicId: 'pengenalan-python',
    question: 'Bahasa pemrograman interpretasi dieksekusi baris per baris tanpa dikompilasi terlebih dahulu.',
    options: ['Benar', 'Salah'],
    correctIndex: 0,
    explanation: 'Bahasa interpretasi diterjemahkan dan langsung dieksekusi baris per baris.'
  },
  {
    id: 'x3', type: 'output-prediction', topicId: 'pengenalan-python',
    question: 'Apa output dari program ini?',
    options: ['3\n5\n2', '5\n3\n2', '3\n2\n5', 'Error'],
    correctIndex: 0,
    explanation: 'Baris dieksekusi dari atas: tulis(3), tulis(5), lalu tulis(5 - 3).',
    codeSnippet: 'tulis(3)\ntulis(5)\ntulis(5 - 3)'
  },
  {
    id: 'x4', type: 'multiple-choice', topicId: 'pengenalan-python',
    question: 'Bahasa pemrograman tingkat tinggi banyak digunakan untuk...',
    options: ['Data science dan machine learning', 'Web development', 'Automation', 'Semua benar'],
    correctIndex: 3,
    explanation: 'Bahasa pemrograman dipakai di berbagai bidang.'
  },
  {
    id: 'x5', type: 'code-completion', topicId: 'pengenalan-python',
    question: 'Lengkapi kode untuk menampilkan "PseudoLearn" di layar:',
    options: ['tulis("PseudoLearn")', 'cetak("PseudoLearn")', 'output("PseudoLearn")', 'show("PseudoLearn")'],
    correctIndex: 0,
    explanation: 'Fungsi untuk menampilkan output pada pseudocode adalah tulis().'
  },

  // VARIABEL & TIPE DATA
  {
    id: 'x6', type: 'multiple-choice', topicId: 'variabel-tipe-data',
    question: 'Manakah nama variabel yang benar?',
    options: ['nama-siswa', 'nama_siswa', '1nama', 'nama siswa'],
    correctIndex: 1,
    explanation: 'Nama variabel memakai underscore, tanpa spasi, tanda hubung, atau awalan angka.'
  },
  {
    id: 'x7', type: 'output-prediction', topicId: 'variabel-tipe-data',
    question: 'Apa output dari kode berikut?',
    options: ['3', '5', '8', 'Error'],
    correctIndex: 0,
    explanation: 'panjang("abc") = 3.',
    codeSnippet: 'kata <- "abc"\ntulis(panjang(kata))'
  },
  {
    id: 'x8', type: 'multiple-choice', topicId: 'variabel-tipe-data',
    question: 'Tipe data dari nilai 3.14 adalah...',
    options: ['int', 'float', 'str', 'bool'],
    correctIndex: 1,
    explanation: 'Bilangan desimal bertipe float.'
  },
  {
    id: 'x9', type: 'true-false', topicId: 'variabel-tipe-data',
    question: 'Konversi string "10" menjadi bilangan bulat menghasilkan integer 10.',
    options: ['Benar', 'Salah'],
    correctIndex: 0,
    explanation: 'Fungsi int() mengonversi string numerik menjadi integer.'
  },
  {
    id: 'x10', type: 'output-prediction', topicId: 'variabel-tipe-data',
    question: 'Apa output dari kode berikut?',
    options: ['Halo Budi', 'Halo', 'Budi', 'Error'],
    correctIndex: 0,
    explanation: 'Operator + menggabungkan string dan variabel, hasilnya "Halo Budi".',
    codeSnippet: 'nama <- "Budi"\ntulis("Halo " + nama)'
  },

  // OPERATOR
  {
    id: 'x11', type: 'output-prediction', topicId: 'operator',
    question: 'Apa output dari kode berikut?',
    options: ['2', '3', '1', '4'],
    correctIndex: 2,
    explanation: '10 mod 3 = sisa bagi 1.',
    codeSnippet: 'tulis(10 mod 3)'
  },
  {
    id: 'x12', type: 'multiple-choice', topicId: 'operator',
    question: 'Untuk menambah nilai variabel x dengan 3 lalu menyimpannya kembali ke x, ditulis...',
    options: ['x <- 3', 'x <- x + 3', 'x + 3', '3 <- x'],
    correctIndex: 1,
    explanation: 'Nilai baru x sama dengan nilai lama x ditambah 3, lalu disimpan kembali ke x.'
  },
  {
    id: 'x13', type: 'true-false', topicId: 'operator',
    question: 'Hasil dari `7 > 5 dan 3 < 1` adalah benar (Benar).',
    options: ['Benar', 'Salah'],
    correctIndex: 1,
    explanation: '3 < 1 salah, sehingga benar dan salah = salah (Salah).'
  },
  {
    id: 'x14', type: 'output-prediction', topicId: 'operator',
    question: 'Apa output dari kode berikut?',
    options: ['3', '4', '5', '6'],
    correctIndex: 0,
    explanation: '2 ** 3 - 5 = 8 - 5 = 3.',
    codeSnippet: 'tulis(2 ** 3 - 5)'
  },
  {
    id: 'x15', type: 'multiple-choice', topicId: 'operator',
    question: 'Operator yang menghasilkan nilai benar/salah (boolean) adalah...',
    options: ['Aritmatika', 'Perbandingan', 'Assignment', 'Eksponen'],
    correctIndex: 1,
    explanation: 'Operator perbandingan selalu menghasilkan boolean.'
  },

  // INPUT & OUTPUT
  {
    id: 'x16', type: 'multiple-choice', topicId: 'input-output',
    question: 'baca() selalu mengembalikan nilai bertipe...',
    options: ['int', 'float', 'str', 'bool'],
    correctIndex: 2,
    explanation: 'Hasil baca() selalu string, perlu dikonversi untuk angka.'
  },
  {
    id: 'x17', type: 'code-completion', topicId: 'input-output',
    question: 'Lengkapi kode berikut agar program menerima angka bulat:',
    options: ['int(baca("Umur: "))', 'str(baca("Umur: "))', 'baca(int("Umur: "))', 'bool(baca("Umur: "))'],
    correctIndex: 0,
    explanation: 'Bungkus baca() dengan int() untuk mengubah hasilnya menjadi integer.'
  },
  {
    id: 'x18', type: 'output-prediction', topicId: 'input-output',
    question: 'Apa output dari kode berikut?',
    options: ['a-b-c', 'a b c', 'abc', 'a,b,c'],
    correctIndex: 0,
    explanation: 'Operator + menggabungkan string sehingga terbentuk "a-b-c".',
    codeSnippet: 'tulis("a" + "-" + "b" + "-" + "c")'
  },
  {
    id: 'x19', type: 'true-false', topicId: 'input-output',
    question: 'Pada pseudocode, dua string dapat digabungkan menggunakan operator +.',
    options: ['Benar', 'Salah'],
    correctIndex: 0,
    explanation: 'Operator + menggabungkan (konkatenasi) dua string.'
  },
  {
    id: 'x20', type: 'multiple-choice', topicId: 'input-output',
    question: 'Cara yang benar untuk menggabungkan teks "Nama:" dengan variabel nama adalah...',
    options: ['tulis("Nama: " + nama)', 'tulis("Nama: nama")', 'tulis("Nama: " - nama)', 'tulis("Nama: " ** nama)'],
    correctIndex: 0,
    explanation: 'Operator + menggabungkan teks dengan isi variabel.'
  },

  // PERCABANGAN
  {
    id: 'x21', type: 'output-prediction', topicId: 'percabangan',
    question: 'Apa output dari kode berikut?',
    options: ['A', 'B', 'C', 'D'],
    correctIndex: 2,
    explanation: 'nilai 65: >=85? tidak. >=70? tidak. >=60? ya, sehingga grade = C.',
    codeSnippet: 'nilai <- 65\njika nilai >= 85 maka\n    grade <- "A"\nselainnya\n    jika nilai >= 70 maka\n        grade <- "B"\n    selainnya\n        jika nilai >= 60 maka\n            grade <- "C"\n        selainnya\n            grade <- "D"\n        akhirjika\n    akhirjika\nakhirjika\ntulis(grade)'
  },
  {
    id: 'x22', type: 'true-false', topicId: 'percabangan',
    question: 'Blok selainnya (else) akan dijalankan jika semua kondisi sebelumnya salah (Salah).',
    options: ['Benar', 'Salah'],
    correctIndex: 0,
    explanation: 'Selainnya berperan sebagai blok default ketika semua kondisi sebelumnya tidak terpenuhi.'
  },
  {
    id: 'x23', type: 'code-completion', topicId: 'percabangan',
    question: 'Lengkapi kode untuk menampilkan "Genap" jika x genap:',
    options: ['jika x mod 2 = 0 maka', 'jika x / 2 maka', 'jika x mod 2 maka', 'selama x mod 2 = 0'],
    correctIndex: 0,
    explanation: 'x mod 2 = 0 benar untuk bilangan genap.'
  },
  {
    id: 'x24', type: 'output-prediction', topicId: 'percabangan',
    question: 'Apa output dari kode berikut?',
    options: ['Diizinkan', 'Ditolak', 'Error', 'Tanpa output'],
    correctIndex: 0,
    explanation: 'usia 21 >= 17 dan ktp benar → Diizinkan.',
    codeSnippet: 'usia <- 21\nktp <- benar\njika usia >= 17 dan ktp maka\n    tulis("Diizinkan")\nselainnya\n    tulis("Ditolak")\nakhirjika'
  },
  {
    id: 'x25', type: 'multiple-choice', topicId: 'percabangan',
    question: 'Percabangan yang berada di dalam percabangan lain disebut...',
    options: ['Bersarang (nested)', 'Perulangan', 'Rekursi', 'Berantai'],
    correctIndex: 0,
    explanation: 'Percabangan di dalam percabangan disebut nested / bersarang.'
  },

  // PERULANGAN
  {
    id: 'x26', type: 'output-prediction', topicId: 'perulangan',
    question: 'Apa output dari kode berikut?',
    options: ['0\n2\n4\n6\n8', '0\n1\n2\n3\n4', '2\n4\n6\n8\n10', '0\n2\n4'],
    correctIndex: 0,
    explanation: 'Perulangan dengan langkah 2 menampilkan 0, 2, 4, 6, 8.',
    codeSnippet: 'untuk i <- 0 sampai 8 langkah 2\ntulis(i)\nakhiruntuk'
  },
  {
    id: 'x27', type: 'true-false', topicId: 'perulangan',
    question: 'Perulangan selama (while) akan berhenti jika kondisinya menjadi salah (Salah).',
    options: ['Benar', 'Salah'],
    correctIndex: 0,
    explanation: 'Perulangan selama mengulang selama kondisi benar dan berhenti saat kondisi salah.'
  },
  {
    id: 'x28', type: 'multiple-choice', topicId: 'perulangan',
    question: 'Untuk menghentikan perulangan secara paksa, gunakan...',
    options: ['lanjut', 'lewati', 'keluar', 'skip'],
    correctIndex: 2,
    explanation: 'keluar (break) menghentikan perulangan sepenuhnya.'
  },
  {
    id: 'x29', type: 'code-completion', topicId: 'perulangan',
    question: 'Lengkapi kode untuk menampilkan angka 1 sampai 5:',
    options: ['untuk i <- 1 sampai 5', 'untuk i <- 0 sampai 4', 'selama i < 5', 'untuk i <- 5'],
    correctIndex: 0,
    explanation: 'untuk i <- 1 sampai 5 menghasilkan nilai 1 sampai 5.'
  },
  {
    id: 'x30', type: 'output-prediction', topicId: 'perulangan',
    question: 'Apa output dari kode berikut?',
    options: ['1\n2\n4', '0\n1\n2\n3', '1\n2\n3\n4', '0\n3'],
    correctIndex: 0,
    explanation: 'i yang habis dibagi 3 (0 dan 3) dilewati oleh lanjut, sisanya 1, 2, 4 ditampilkan.',
    codeSnippet: 'untuk i <- 0 sampai 4\n    jika i mod 3 = 0 maka\n        lanjut\n    akhirjika\n    tulis(i)\nakhiruntuk'
  },

  // FUNGSI
  {
    id: 'x31', type: 'code-completion', topicId: 'fungsi',
    question: 'Lengkapi definisi fungsi yang benar:',
    options: ['fungsi tampil()', 'fungsi tampil', 'prosedur tampil()', 'tampil() <- fungsi'],
    correctIndex: 0,
    explanation: 'Fungsi dideklarasikan dengan kata kunci fungsi, lalu nama dan tanda kurung.'
  },
  {
    id: 'x32', type: 'output-prediction', topicId: 'fungsi',
    question: 'Apa output dari kode berikut?',
    options: ['12', '7', '5', '35'],
    correctIndex: 0,
    explanation: 'kali(3,4) = 3 × 4 = 12.',
    codeSnippet: 'fungsi kali(a, b)\n    kembalikan a * b\nakhirfungsi\ntulis(kali(3, 4))'
  },
  {
    id: 'x33', type: 'true-false', topicId: 'fungsi',
    question: 'Fungsi yang tidak memiliki perintah kembalikan tidak mengembalikan nilai apa pun.',
    options: ['Benar', 'Salah'],
    correctIndex: 0,
    explanation: 'Tanpa perintah kembalikan, fungsi tidak menghasilkan nilai balik (kosong/null).'
  },
  {
    id: 'x34', type: 'output-prediction', topicId: 'fungsi',
    question: 'Apa output dari kode berikut?',
    options: ['Halo Budi', 'Halo', 'Halo Teman', 'Error'],
    correctIndex: 2,
    explanation: 'Saat nama kosong, fungsi mengisinya dengan "Teman", sehingga mencetak "Halo Teman".',
    codeSnippet: 'fungsi sapa(nama)\n    jika panjang(nama) = 0 maka\n        nama <- "Teman"\n    akhirjika\n    tulis("Halo " + nama)\nakhirfungsi\nsapa("")'
  },
  {
    id: 'x35', type: 'multiple-choice', topicId: 'fungsi',
    question: 'Fungsi yang memanggil dirinya sendiri disebut...',
    options: ['Rekursi', 'Iterasi', 'Perulangan', 'Thread'],
    correctIndex: 0,
    explanation: 'Rekursi adalah pemanggilan fungsi pada dirinya sendiri.'
  },

  // ARRAY & STRING
  {
    id: 'x36', type: 'output-prediction', topicId: 'list-dictionary',
    question: 'Apa output dari kode berikut?',
    options: ['3', '2', '1', 'Error'],
    correctIndex: 0,
    explanation: 'panjang(array) menghitung jumlah elemen.',
    codeSnippet: 'data <- [10, 20, 30]\ntulis(panjang(data))'
  },
  {
    id: 'x37', type: 'code-completion', topicId: 'list-dictionary',
    question: 'Untuk mengganti elemen ke-2 dari array data dengan nilai 4, ditulis...',
    options: ['data[2] <- 4', 'data[2] = 4', 'data <- 4', 'data(2) <- 4'],
    correctIndex: 0,
    explanation: 'Elemen array diakses dengan indeks dalam kurung siku, lalu diisi menggunakan <-.'
  },
  {
    id: 'x38', type: 'output-prediction', topicId: 'list-dictionary',
    question: 'Apa output dari kode berikut?',
    options: ['Andi', 'Budi', 'Caca', 'Error'],
    correctIndex: 1,
    explanation: 'Elemen ke-2 array siswa (indeks 2) adalah "Budi".',
    codeSnippet: 'siswa <- ["Andi", "Budi", "Caca"]\ntulis(siswa[2])'
  },
  {
    id: 'x39', type: 'true-false', topicId: 'list-dictionary',
    question: 'Indeks elemen pertama pada array pseudocode dimulai dari 0 (nol).',
    options: ['Benar', 'Salah'],
    correctIndex: 1,
    explanation: 'Indeks array pada pseudocode dimulai dari 1, bukan 0.'
  },
  {
    id: 'x40', type: 'output-prediction', topicId: 'list-dictionary',
    question: 'Apa output dari kode berikut?',
    options: ['Jakarta', 'Tokyo', 'Error', 'Null'],
    correctIndex: 0,
    explanation: 'Elemen pertama array (indeks 1) berisi "Jakarta".',
    codeSnippet: 'data <- ["Jakarta", "Tokyo"]\ntulis(data[1])'
  }
]