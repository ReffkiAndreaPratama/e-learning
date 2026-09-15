import type { ExerciseQuestion } from '../types'

export const exercises: ExerciseQuestion[] = [
  // PENGENALAN PYTHON
  {
    id: 'x1', type: 'multiple-choice', topicId: 'pengenalan-python',
    question: 'Apa output dari kode berikut?',
    options: ['Halo Dunia', '"Halo Dunia"', 'Error', 'halo dunia'],
    correctIndex: 0,
    explanation: 'print() menampilkan isi string tanpa tanda kutip.',
    codeSnippet: 'print("Halo Dunia")'
  },
  {
    id: 'x2', type: 'true-false', topicId: 'pengenalan-python',
    question: 'Python adalah bahasa pemrograman yang dikompilasi menjadi biner.',
    options: ['True', 'False'],
    correctIndex: 1,
    explanation: 'Python adalah bahasa interpretasi, bukan compiled.'
  },
  {
    id: 'x3', type: 'output-prediction', topicId: 'pengenalan-python',
    question: 'Apa output dari program ini?',
    options: ['3\n5\n2', '5\n3\n2', '3\n2\n5', 'Error'],
    correctIndex: 0,
    explanation: 'Baris dieksekusi dari atas: print(3), print(5), lalu print(5-3).',
    codeSnippet: 'print(3)\nprint(5)\nprint(5 - 3)'
  },
  {
    id: 'x4', type: 'multiple-choice', topicId: 'pengenalan-python',
    question: 'Python banyak digunakan untuk...',
    options: ['Data science dan ML', 'Web development', 'Automation', 'Semua benar'],
    correctIndex: 3,
    explanation: 'Python dipakai di berbagai bidang.'
  },
  {
    id: 'x5', type: 'code-completion', topicId: 'pengenalan-python',
    question: 'Lengkapi kode untuk mencetak "PyLearn" di layar:',
    options: ['print("PyLearn")', 'echo("PyLearn")', 'output("PyLearn")', 'write("PyLearn")'],
    correctIndex: 0,
    explanation: 'Fungsi output Python adalah print().'
  },

  // VARIABEL & TIPE DATA
  {
    id: 'x6', type: 'multiple-choice', topicId: 'variabel-tipe-data',
    question: 'Manakah nama variabel yang benar?',
    options: ['nama-siswa', 'nama_siswa', '1nama', 'class'],
    correctIndex: 1,
    explanation: 'Underscore valid, tetapi spasi, awalan angka, dan keyword tidak.'
  },
  {
    id: 'x7', type: 'output-prediction', topicId: 'variabel-tipe-data',
    question: 'Apa output dari kode berikut?',
    options: ['3', '5', '8', 'Error'],
    correctIndex: 0,
    explanation: 'len("abc") = 3.',
    codeSnippet: 'kata = "abc"\nprint(len(kata))'
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
    question: 'int("10") akan menghasilkan integer 10.',
    options: ['True', 'False'],
    correctIndex: 0,
    explanation: 'int() mengkonversi string numerik menjadi integer.'
  },
  {
    id: 'x10', type: 'output-prediction', topicId: 'variabel-tipe-data',
    question: 'Apa output dari kode berikut?',
    options: ['<class \'str\'>', 'Hello', '<class \'int\'>', 'Error'],
    correctIndex: 0,
    explanation: 'Variabel yang di assignment "Hello" bertipe string.',
    codeSnippet: 'a = "Hello"\nprint(type(a))'
  },

  // OPERATOR
  {
    id: 'x11', type: 'output-prediction', topicId: 'operator',
    question: 'Apa output dari kode berikut?',
    options: ['2', '3', '1', '4'],
    correctIndex: 2,
    explanation: '10 % 3 = sisa bagi 1.',
    codeSnippet: 'print(10 % 3)'
  },
  {
    id: 'x12', type: 'multiple-choice', topicId: 'operator',
    question: 'x += 3 sama dengan...',
    options: ['x = 3', 'x = x + 3', 'x + 3', 'x = 3x'],
    correctIndex: 1,
    explanation: 'Augmented assignment menggabungkan tunggal dan assignment.'
  },
  {
    id: 'x13', type: 'true-false', topicId: 'operator',
    question: 'Hasil dari 7 > 5 and 3 < 1 adalah True.',
    options: ['True', 'False'],
    correctIndex: 1,
    explanation: '3 < 1 adalah False, sehingga False and ... = False.'
  },
  {
    id: 'x14', type: 'output-prediction', topicId: 'operator',
    question: 'Apa output dari kode berikut?',
    options: ['3', '4', '5', '6'],
    correctIndex: 0,
    explanation: '2 ** 3 - 5 = 8 - 5 = 3.',
    codeSnippet: 'print(2 ** 3 - 5)'
  },
  {
    id: 'x15', type: 'multiple-choice', topicId: 'operator',
    question: 'Operator yang menghasilkan True/False adalah...',
    options: ['Aritmatika', 'Perbandingan', 'Assignment', 'Eksponen'],
    correctIndex: 1,
    explanation: 'Operator perbandingan selalu menghasilkan boolean.'
  },

  // INPUT & OUTPUT
  {
    id: 'x16', type: 'multiple-choice', topicId: 'input-output',
    question: 'input() selalu mengembalikan nilai bertipe...',
    options: ['int', 'float', 'str', 'bool'],
    correctIndex: 2,
    explanation: 'Input selalu string, perlu konversi.'
  },
  {
    id: 'x17', type: 'code-completion', topicId: 'input-output',
    question: 'Lengkapi kode berikut agar program menerima angka bulat:',
    options: ['int(input("Umur: "))', 'str(input("Umur: "))', 'input(int("Umur: "))', 'bool(input("Umur: "))'],
    correctIndex: 0,
    explanation: 'Bungkus input() dengan int() untuk mengubah ke integer.'
  },
  {
    id: 'x18', type: 'output-prediction', topicId: 'input-output',
    question: 'Apa output dari kode berikut?',
    options: ['a-b-c', 'a b c', 'abc', 'a,b,c'],
    correctIndex: 0,
    explanation: 'sep="-" mengganti pemisah.',
    codeSnippet: 'print("a", "b", "c", sep="-")'
  },
  {
    id: 'x19', type: 'true-false', topicId: 'input-output',
    question: 'f-string menggunakan tanda f sebelum string dan {} untuk variabel.',
    options: ['True', 'False'],
    correctIndex: 0,
    explanation: 'Benar: f"Nilai: {x}".'
  },
  {
    id: 'x20', type: 'multiple-choice', topicId: 'input-output',
    question: 'Format Rupiah dengan f-string untuk harga=50000 adalah...',
    options: ['f"Harga Rp{harga:,}"', 'f"Harga Rp{harga}"', 'format(harga)', 'f"{harga:Rp}"'],
    correctIndex: 0,
    explanation: 'Format :, menambah pemisah ribuan.'
  },

  // PERCABANGAN
  {
    id: 'x21', type: 'output-prediction', topicId: 'percabangan',
    question: 'Apa output dari kode berikut?',
    options: ['A', 'B', 'C', 'D'],
    correctIndex: 1,
    explanation: 'nilai 65: >=85? tidak. >=70? tidak. >=60? ya → B.',
    codeSnippet: 'nilai = 65\nif nilai >= 85:\n    grade = "A"\nelif nilai >= 70:\n    grade = "B"\nelif nilai >= 60:\n    grade = "C"\nelse:\n    grade = "D"\nprint(grade)'
  },
  {
    id: 'x22', type: 'true-false', topicId: 'percabangan',
    question: 'Blok else akan dijalankan jika semua kondisi if/elif False.',
    options: ['True', 'False'],
    correctIndex: 0,
    explanation: 'else adalah blok default ketika tidak ada kondisi yang terpenuhi.'
  },
  {
    id: 'x23', type: 'code-completion', topicId: 'percabangan',
    question: 'Lengkapi kode untuk menampilkan "Genap" jika x genap:',
    options: ['if x % 2 == 0:', 'if x / 2:', 'if x % 2:', 'while x % 2 == 0:'],
    correctIndex: 0,
    explanation: 'x % 2 == 0 benar untuk bilangan genap.'
  },
  {
    id: 'x24', type: 'output-prediction', topicId: 'percabangan',
    question: 'Apa output dari kode berikut?',
    options: ['Diizinkan', 'Ditolak', 'Error', 'Tanpa output'],
    correctIndex: 0,
    explanation: 'usia 21 >= 17 dan ktp True → Diizinkan.',
    codeSnippet: 'usia = 21\nktp = True\nif usia >= 17 and ktp:\n    print("Diizinkan")\nelse:\n    print("Ditolak")'
  },
  {
    id: 'x25', type: 'multiple-choice', topicId: 'percabangan',
    question: 'Percabangan di dalam percabangan disebut...',
    options: ['Nested if', 'Loop if', 'Recursive if', 'Chained if'],
    correctIndex: 0,
    explanation: 'if dalam if disebut nested (bersarang).'
  },

  // PERULANGAN
  {
    id: 'x26', type: 'output-prediction', topicId: 'perulangan',
    question: 'Apa output dari kode berikut?',
    options: ['0 2 4 6 8', '0 1 2 3 4', '2 4 6 8 10', '0 2 4'],
    correctIndex: 0,
    explanation: 'range(0,10,2) → 0,2,4,6,8.',
    codeSnippet: 'for i in range(0, 10, 2):\n    print(i)'
  },
  {
    id: 'x27', type: 'true-false', topicId: 'perulangan',
    question: 'while akan berhenti jika kondisinya menjadi False.',
    options: ['True', 'False'],
    correctIndex: 0,
    explanation: 'while mengulang selama kondisi True, berhenti saat False.'
  },
  {
    id: 'x28', type: 'multiple-choice', topicId: 'perulangan',
    question: 'Untuk menghentikan perulangan secara paksa, gunakan...',
    options: ['continue', 'pass', 'break', 'skip'],
    correctIndex: 2,
    explanation: 'break menghentikan loop sepenuhnya.'
  },
  {
    id: 'x29', type: 'code-completion', topicId: 'perulangan',
    question: 'Lengkapi kode untuk mencetak 1 sampai 5:',
    options: ['for i in range(1, 6):', 'for i in range(5):', 'while i < 5:', 'for i in 5:'],
    correctIndex: 0,
    explanation: 'range(1,6) mencetak 1..5.'
  },
  {
    id: 'x30', type: 'output-prediction', topicId: 'perulangan',
    question: 'Apa output dari kode berikut?',
    options: ['1 2 4', '0 1 2 3', '1 2 3 4', '0 3'],
    correctIndex: 0,
    explanation: 'i yang habis dibagi 3 (0 dan 3) dilewati oleh continue, sisanya 1, 2, 4 dicetak.',
    codeSnippet: 'for i in range(5):\n    if i % 3 == 0:\n        continue\n    print(i)'
  },

  // FUNGSI
  {
    id: 'x31', type: 'code-completion', topicId: 'fungsi',
    question: 'Lengkapi definisi fungsi yang benar:',
    options: ['def tampil():', 'function tampil():', 'tampil = function()', 'def tampil'], 
    correctIndex: 0,
    explanation: 'Fungsi dideklarasikan dengan def nama(): dan tanda titik dua.'
  },
  {
    id: 'x32', type: 'output-prediction', topicId: 'fungsi',
    question: 'Apa output dari kode berikut?',
    options: ['12', '7', '5', '35'],
    correctIndex: 0,
    explanation: 'kali(3,4) = 3*4 = 12.',
    codeSnippet: 'def kali(a, b):\n    return a * b\n\nprint(kali(3, 4))'
  },
  {
    id: 'x33', type: 'true-false', topicId: 'fungsi',
    question: 'Fungsi tanpa return mengembalikan nilai None.',
    options: ['True', 'False'],
    correctIndex: 0,
    explanation: 'Tanpa return, fungsi mengembalikan None.'
  },
  {
    id: 'x34', type: 'output-prediction', topicId: 'fungsi',
    question: 'Apa output dari kode berikut?',
    options: ['Halo Budi', 'Halo', 'Halo Teman', 'Error'],
    correctIndex: 2,
    explanation: 'sapa() tanpa argumen memakai default "Teman".',
    codeSnippet: 'def sapa(nama="Teman"):\n    print("Halo", nama)\n\nsapa()'
  },
  {
    id: 'x35', type: 'multiple-choice', topicId: 'fungsi',
    question: 'Fungsi yang memanggil dirinya sendiri disebut...',
    options: ['Rekursi', 'Iterasi', 'Loop', 'Thread'],
    correctIndex: 0,
    explanation: 'Rekursi adalah pemanggilan fungsi pada dirinya sendiri.'
  },

  // LIST & DICTIONARY
  {
    id: 'x36', type: 'output-prediction', topicId: 'list-dictionary',
    question: 'Apa output dari kode berikut?',
    options: ['3', '2', '1', 'Error'],
    correctIndex: 0,
    explanation: 'len(list) menghitung jumlah elemen.',
    codeSnippet: 'lst = [10, 20, 30]\nprint(len(lst))'
  },
  {
    id: 'x37', type: 'code-completion', topicId: 'list-dictionary',
    question: 'Lengkapi kode untuk menambah elemen ke list:',
    options: ['lst.append(4)', 'lst.add(4)', 'lst.push(4)', 'lst.insertEnd(4)'],
    correctIndex: 0,
    explanation: 'Method append() menambah di akhir list.'
  },
  {
    id: 'x38', type: 'output-prediction', topicId: 'list-dictionary',
    question: 'Apa output dari kode berikut?',
    options: ['Andi', 'Budi', 'Caca', 'Error'],
    correctIndex: 1,
    explanation: 'Hapus "Andi" dari list, sisa "Budi", "Caca". Index 0 = Budi.',
    codeSnippet: 'siswa = ["Andi", "Budi", "Caca"]\nsiswa.remove("Andi")\nprint(siswa[0])'
  },
  {
    id: 'x39', type: 'true-false', topicId: 'list-dictionary',
    question: 'Dictionary bisa diakses menggunakan index seperti list.',
    options: ['True', 'False'],
    correctIndex: 1,
    explanation: 'Dictionary diakses menggunakan key, bukan index.'
  },
  {
    id: 'x40', type: 'output-prediction', topicId: 'list-dictionary',
    question: 'Apa output dari kode berikut?',
    options: ['Jakarta', 'Indonesia', 'Error', 'None'],
    correctIndex: 0,
    explanation: 'data["Indonesia"] mengambil nilai Jakarta.',
    codeSnippet: 'data = {"Indonesia": "Jakarta", "Jepang": "Tokyo"}\nprint(data["Indonesia"])'
  }
]