import type { QuizQuestion } from '../types'

export const quizzes: Record<string, QuizQuestion[]> = {
  'pengenalan-python': [
    {
      id: 'p1', question: 'Python adalah bahasa pemrograman yang bersifat...', options: ['Compiled', 'Interpretasi', 'Mesin biner', 'Semantik'],
      correctIndex: 1, explanation: 'Python menggunakan interpreter yang mengeksekusi kode baris per baris.',
      codeSnippet: 'print("Hello")'
    },
    {
      id: 'p2', question: 'Siapa yang menciptakan bahasa Python?', options: ['Bill Gates', 'Guido van Rossum', 'James Gosling', 'Dennis Ritchie'],
      correctIndex: 1, explanation: 'Python dibuat oleh Guido van Rossum pada tahun 1991.'
    },
    {
      id: 'p3', question: 'Apa output dari kode berikut?', options: ['0\n1\n2\n3\n4', '1\n2\n3\n4\n5', '0\n1\n2\n3\n4\n5', '4\n3\n2\n1\n0'],
      correctIndex: 0, explanation: 'range(5) menghasilkan 0-4.',
      codeSnippet: 'for i in range(5):\n    print(i)'
    },
    {
      id: 'p4', question: 'Komentar di Python ditulis dengan simbol...', options: ['//', '/* */', '#', '<!-- -->'],
      correctIndex: 2, explanation: 'Komentar Python menggunakan tanda pagar #.'
    },
    {
      id: 'p5', question: 'Manakah yang merupakan kegunaan utama Python?', options: ['Pengembangan web', 'Ilmu data dan machine learning', 'Automation dan scripting', 'Semua benar'],
      correctIndex: 3, explanation: 'Python digunakan di banyak bidang termasuk web, data science, otomasi, dan IoT.'
    },
    {
      id: 'p6', question: 'Apa output dari print("Python")?', options: ['Python', '"Python"', '[Python]', 'Error'],
      correctIndex: 0, explanation: 'print() menampilkan isi string tanpa tanda kutip.',
      codeSnippet: 'print("Python")'
    },
    {
      id: 'p7', question: 'Apa output dari kode berikut?', options: ['10', '10 20', '20 10', 'Error'],
      correctIndex: 0, explanation: 'Karena x=y=10, keduanya bernilai 10.',
      codeSnippet: 'x = y = 10\nprint(x)'
    },
    {
      id: 'p8', question: 'Python menggunakan... untuk menandai blok kode.', options: ['Kurung {}', 'Indentasi', 'Kata END', 'Tag HTML'],
      correctIndex: 1, explanation: 'Python menggunakan indentasi (umumnya 4 spasi) untuk blok kode.'
    },
    {
      id: 'p9', question: 'Python pertama kali dirilis pada tahun...', options: ['1985', '1991', '2000', '1995'],
      correctIndex: 1, explanation: 'Guido van Rossum merilis Python pertama pada tahun 1991.'
    },
    {
      id: 'p10', question: 'Fungsi yang digunakan untuk menampilkan output di Python adalah...', options: ['print()', 'echo()', 'output()', 'console.log()'],
      correctIndex: 0, explanation: 'print() adalah fungsi output bawaan Python.'
    }
  ],
  'variabel-tipe-data': [
    {
      id: 'v1', question: 'Manakah nama variabel yang VALID di Python?', options: ['2nama', 'nama-siswa', 'nama_siswa', 'for'],
      correctIndex: 2, explanation: 'Nama variabel harus dimulai huruf/underscore, tanpa spasi/karakter khusus, dan bukan keyword.'
    },
    {
      id: 'v2', question: 'Apa tipe data dari nilai True?', options: ['int', 'str', 'bool', 'float'],
      correctIndex: 2, explanation: 'True dan False adalah tipe boolean.'
    },
    {
      id: 'v3', question: 'Apa output dari kode berikut?', options: ['<class \'str\'>', '<class \'int\'>', '<class \'float\'>', 'Error'],
      correctIndex: 1, explanation: 'input() menghasilkan string, tapi 20 tanpa kutip adalah integer.',
      codeSnippet: 'umur = 20\nprint(type(umur))'
    },
    {
      id: 'v4', question: '3.14 adalah contoh tipe data...', options: ['int', 'float', 'str', 'bool'],
      correctIndex: 1, explanation: 'Bilangan dengan desimal termasuk tipe float.'
    },
    {
      id: 'v5', question: 'Hasil dari int("85") adalah...', options: ['"85"', '85', '85.0', 'Error'],
      correctIndex: 1, explanation: 'int() mengkonversi string "85" menjadi integer 85.'
    },
    {
      id: 'v6', question: 'Fungsi untuk mengecek tipe data adalah...', options: ['type()', 'typeof()', 'checktype()', 'datatype()'],
      correctIndex: 0, explanation: 'Python menggunakan type() untuk mengecek tipe data.'
    },
    {
      id: 'v7', question: 'Apa output dari kode berikut?', options: ['HaloBudi', 'Halo Budi', 'Halo\nBudi', 'Error'],
      correctIndex: 0, explanation: 'String digabungkan dengan + tanpa spasi.',
      codeSnippet: 'a = "Halo"\nb = "Budi"\nprint(a + b)'
    },
    {
      id: 'v8', question: 'Nilai None memiliki tipe...', options: ['NoneType', 'null', 'void', 'undefined'],
      correctIndex: 0, explanation: 'None adalah objek dari tipe NoneType.'
    },
    {
      id: 'v9', question: 'Apa output dari kode berikut?', options: ['3', '5', '2', 'Error'],
      correctIndex: 0, explanation: 'len("abc") mengembalikan 3.',
      codeSnippet: 'nama = "abc"\nprint(len(nama))'
    },
    {
      id: 'v10', question: 'Apa output dari "Python"[0]?', options: ['P', 'y', '"P"', 'Error'],
      correctIndex: 0, explanation: 'Index 0 mengambil karakter pertama string.'
    }
  ],
  operator: [
    {
      id: 'o1', question: 'Hasil dari 10 // 3 adalah...', options: ['3.33', '3', '4', '1'],
      correctIndex: 1, explanation: 'Floor division // membagi lalu membulatkan ke bawah: 10//3 = 3.'
    },
    {
      id: 'o2', question: 'Hasil dari 10 % 3 adalah...', options: ['3', '1', '0', '3.33'],
      correctIndex: 1, explanation: 'Modulus menghasilkan sisa bagi: 10 % 3 = 1.'
    },
    {
      id: 'o3', question: 'Operator untuk membandingkan "sama dengan" adalah...', options: ['=', '==', '===', '=>'],
      correctIndex: 1, explanation: 'AAA == membandingkan, satu = untuk assignment.'
    },
    {
      id: 'o4', question: 'Hasil dari True and False adalah...', options: ['True', 'False', 'Error', 'None'],
      correctIndex: 1, explanation: 'and menghasilkan True hanya jika kedua operand True.'
    },
    {
      id: 'o5', question: 'X += 5 sama dengan...', options: ['X = 5', 'X = X + 5', 'X + 5', 'X = 5 + 5'],
      correctIndex: 1, explanation: 'Augmented assignment += sama dengan X = X + 5.'
    },
    {
      id: 'o6', question: 'Apa output dari print(2 ** 3)?', options: ['6', '8', '9', '23'],
      correctIndex: 1, explanation: '** adalah operator pangkat: 2 ** 3 = 8.'
    },
    {
      id: 'o7', question: 'Hasil dari 7 >= 7 adalah...', options: ['7', 'True', 'False', 'Error'],
      correctIndex: 1, explanation: '>= berarti lebih besar atau sama dengan, 7 >= 7 adalah True.'
    },
    {
      id: 'o8', question: 'Apa output dari print(10 > 5 and 5 > 3)?', options: ['True', 'False', 'Error', 'None'],
      correctIndex: 0, explanation: 'Kedua kondisi True, sehingga True and True = True.'
    },
    {
      id: 'o9', question: 'not True menghasilkan...', options: ['True', 'False', '1', 'None'],
      correctIndex: 1, explanation: 'not membalik nilai boolean: not True = False.'
    },
    {
      id: 'o10', question: 'Hasil dari 15 // 4 adalah...', options: ['3.75', '3', '4', '0'],
      correctIndex: 1, explanation: '15 // 4 membagi lalu membulatkan ke bawah menjadi 3.'
    }
  ],
  'input-output': [
    {
      id: 'i1', question: 'Fungsi untuk menerima input dari pengguna adalah...', options: ['println()', 'input()', 'read()', 'scanf()'],
      correctIndex: 1, explanation: 'input() digunakan untuk menerima masukan keyboard.'
    },
    {
      id: 'i2', question: 'input() selalu mengembalikan nilai bertipe...', options: ['int', 'float', 'str', 'bool'],
      correctIndex: 2, explanation: 'input() selalu menghasilkan string, perlu konversi untuk angka.'
    },
    {
      id: 'i3', question: 'Untuk menerima angka bulat dari input, gunakan...', options: ['str(input())', 'int(input())', 'float(input())', 'bool(input())'],
      correctIndex: 1, explanation: 'int(input()) mengkonversi input string menjadi integer.'
    },
    {
      id: 'i4', question: 'Apa output dari kode berikut?', options: ['A-B-C', 'A B C', 'A-B C', 'ABC'],
      correctIndex: 0, explanation: 'Parameter sep menentukan pemisah antar nilai.',
      codeSnippet: 'print("A", "B", "C", sep="-")'
    },
    {
      id: 'i5', question: 'Cara paling modern untuk format output adalah...', options: ['%s', '.format()', 'f-string', 'printf'],
      correctIndex: 2, explanation: 'f-string (f"...") adalah cara terbaik dan modern di Python 3.6+.'
    },
    {
      id: 'i6', question: 'print("Hasil:", end="...") akan mencetak...', options: ['Hasil:...', 'Hasil: \\n', 'Hasil:', 'Hasil ...'],
      correctIndex: 0, explanation: 'Parameter end menggantikan karakter akhir (bukan ganti baris lagi).'
    },
    {
      id: 'i7', question: 'Apa output dari print(f"Skor {0.85:.1%}")?', options: ['Skor 0.8%', 'Skor 85.0%', 'Skor 0.9%', 'Skor 85%'],
      correctIndex: 1, explanation: 'Format .1% mengubah decimal menjadi persen 1 desimal.'
    },
    {
      id: 'i8', question: 'Apa output dari kode berikut?', options: ['3.0', '3', "'3'", 'Error'],
      correctIndex: 0, explanation: 'float(3) menghasilkan 3.0.',
      codeSnippet: 'print(float(3))'
    },
    {
      id: 'i9', question: 'int("abc") akan menghasilkan...', options: ['0', 'abc', 'Error', 'None'],
      correctIndex: 2, explanation: 'Konversi string non-numerik ke int menghasilkan ValueError.'
    },
    {
      id: 'i10', question: 'print("Harga", 5000) di f-string f"Harga Rp{harga:,}" dengan harga=5000 menghasilkan...', options: ['Harga Rp5000', 'Harga Rp5,000', 'Harga Rp5000,', 'Error'],
      correctIndex: 1, explanation: 'Format :, menambahkan pemisah ribuan.'
    }
  ],
  percabangan: [
    {
      id: 'c1', question: 'Apa output dari kode berikut?', options: ['Lulus', 'Tidak Lulus', 'Lulus\\nTidak Lulus', 'Error'],
      correctIndex: 0, explanation: 'nilai 85 >= 70 sehingga mencetak "Lulus".',
      codeSnippet: 'nilai = 85\nif nilai >= 70:\n    print("Lulus")\nelse:\n    print("Tidak Lulus")'
    },
    {
      id: 'c2', question: 'Sintaks untuk percabangan lebih dari dua kondisi adalah...', options: ['if / else if', 'if / elif / else', 'switch', 'case'],
      correctIndex: 1, explanation: 'Python menggunakan elif untuk banyak kondisi.'
    },
    {
      id: 'c3', question: 'Setelah baris if kondisi:, blok kode harus di...', options: ['diawali tanda {', 'indentasi 4 spasi', 'akhir dengan ;', 'diberi kurung ()'],
      correctIndex: 1, explanation: 'Python menggunakan indentasi untuk menandai blok kode.'
    },
    {
      id: 'c4', question: 'Jika kondisi if False dan elif False, blok yang dijalankan adalah...', options: ['if', 'elif', 'else', 'semua'],
      correctIndex: 2, explanation: 'else dijalankan jika semua kondisi sebelumnya False.'
    },
    {
      id: 'c5', question: 'Apa output dari kode berikut?', options: ['A', 'B', 'C', 'Error'],
      correctIndex: 1, explanation: 'nilai 75 < 90, drop ke elif berikutnya. 75 >= 80 salah, 75 >= 70 benar → C.',
      codeSnippet: 'nilai = 75\nif nilai >= 90:\n    grade = "A"\nelif nilai >= 80:\n    grade = "B"\nelif nilai >= 70:\n    grade = "C"\nelse:\n    grade = "D"\nprint(grade)'
    },
    {
      id: 'c6', question: 'Operator yang tepat untuk kondisi "usia >= 17 DAN punya KTP" adalah...', options: ['or', 'and', 'not', 'xor'],
      correctIndex: 1, explanation: 'and mengharuskan kedua kondisi benar.'
    },
    {
      id: 'c7', question: 'Apa output dari kode berikut?', options: ['True', 'False', 'Error', 'None'],
      correctIndex: 1, explanation: '5 > 10 False dan tidak perlu cek kedua.',
      codeSnippet: 'if 5 > 10 and 10 > 5:\n    print(True)\nelse:\n    print(False)'
    },
    {
      id: 'c8', question: 'Percabangan di dalam percabangan disebut...', options: ['loop', 'nested if', 'recursion', 'switch'],
      correctIndex: 1, explanation: 'if di dalam if disebut nested if.'
    },
    {
      id: 'c9', question: 'Apa output dari kode berikut?', options: ['dewasa', 'remaja', 'anak', 'Error'],
      correctIndex: 1, explanation: 'usia 16: bukan >= 18, bukan >= 13? Ya, sehingga "remaja".',
      codeSnippet: 'usia = 16\nif usia >= 18:\n    print("dewasa")\nelif usia >= 13:\n    print("remaja")\nelse:\n    print("anak")'
    },
    {
      id: 'c10', question: 'Berapa blok maksimal yang dieksekusi dalam if-elif-else?', options: ['Semua', 'Satu', 'Dua', 'Nol'],
      correctIndex: 1, explanation: 'Hanya satu blok yang bisa dijalankan di if-elif-else.'
    }
  ],
  perulangan: [
    {
      id: 'l1', question: 'range(3) menghasilkan...', options: ['1,2,3', '0,1,2', '0,1,2,3', '3'],
      correctIndex: 1, explanation: 'range(n) menghasilkan 0 sampai n-1.'
    },
    {
      id: 'l2', question: 'Apa output dari kode berikut?', options: ['0 1 2 3 4', '1 2 3 4 5', '0 1 2 3', 'Error'],
      correctIndex: 0, explanation: 'range(5) menghasilkan 0-4.',
      codeSnippet: 'for i in range(5):\n    print(i)'
    },
    {
      id: 'l3', question: 'range(1, 6, 2) menghasilkan...', options: ['1,2,3,4,5', '1,3,5', '2,4,6', '1,2,3'],
      correctIndex: 1, explanation: 'Step 2 mulai dari 1: 1, 3, 5.'
    },
    {
      id: 'l4', question: 'Kata kunci untuk menghentikan perulangan adalah...', options: ['stop', 'break', 'halt', 'exit'],
      correctIndex: 1, explanation: 'break menghentikan perulangan sepenuhnya.'
    },
    {
      id: 'l5', question: 'Kata kunci untuk melewati iterasi saat ini adalah...', options: ['skip', 'continue', 'next', 'pass'],
      correctIndex: 1, explanation: 'continue langsung menuju iterasi berikutnya.'
    },
    {
      id: 'l6', question: 'Perulangan while akan berjalan selama...', options: ['kondisi True', 'kondisi False', 'selamanya', 'range habis'],
      correctIndex: 0, explanation: 'while mengulang selama kondisinya True.'
    },
    {
      id: 'l7', question: 'Apa output dari kode berikut?', options: ['0,1,2', '1,2,3', '0,1,2,3,4', '3'],
      correctIndex: 0, explanation: 'x mulai 0, loop while x < 3 mencetak 0, 1, 2 lalu berhenti.',
      codeSnippet: 'x = 0\nwhile x < 3:\n    print(x)\n    x += 1'
    },
    {
      id: 'l8', question: 'Untuk menghitung 1+2+..+100, perulangan paling tepat adalah...', options: ['for dengan range', 'while dengan 100 iterasi manual', 'keduanya', 'tidak bisa'],
      correctIndex: 0, explanation: 'for dengan range(1, 101) paling ringkas untuk jumlah iterasi yang diketahui.'
    },
    {
      id: 'l9', question: 'Apa output dari kode berikut?', options: ['0,1,2,3,4', '0,2,4', '1,3,5', '2,4'],
      correctIndex: 1, explanation: 'Ganjil di continue, genap dicetak.',
      codeSnippet: 'for i in range(5):\n    if i % 2 != 0:\n        continue\n    print(i)'
    },
    {
      id: 'l10', question: 'Jika kondisi while selalu True tanpa update, terjadi...', options: ['error', 'infinite loop', 'percabangan', 'list kosong'],
      correctIndex: 1, explanation: 'Infinite loop membuat program berjalan tanpa berhenti.'
    }
  ],
  fungsi: [
    {
      id: 'f1', question: 'Kata kunci untuk mendefinisikan fungsi adalah...', options: ['function', 'def', 'func', 'lambda'],
      correctIndex: 1, explanation: 'Python menggunakan def untuk mendefinisikan fungsi.'
    },
    {
      id: 'f2', question: 'Apa output dari kode berikut?', options: ['8', '5', '3', '15'],
      correctIndex: 0, explanation: 'tambah(5,3) mengembalikan 5+3=8.',
      codeSnippet: 'def tambah(a, b):\n    return a + b\n\nprint(tambah(5, 3))'
    },
    {
      id: 'f3', question: 'Jika fungsi tidak memiliki return, nilai yang dikembalikan adalah...', options: ['0', 'None', 'False', 'Error'],
      correctIndex: 1, explanation: 'Fungsi tanpa return mengembalikan None.'
    },
    {
      id: 'f4', question: 'def sapa(nama="Teman"): Jika dipanggil sapa(), output...', options: ['Error', 'Halo Teman', 'Halo', 'Halo None'],
      correctIndex: 1, explanation: 'Parameter default digunakan jika tidak diisi.',
      codeSnippet: 'def sapa(nama="Teman"):\n    print("Halo", nama)\n\nsapa()'
    },
    {
      id: 'f5', question: 'Parameter yang memiliki nilai default disebut...', options: ['positional', 'default parameter', 'keyword', 'arbitrary'],
      correctIndex: 1, explanation: 'Default parameter punya nilai awal yang bisa diganti.'
    },
    {
      id: 'f6', question: 'Fungsi yang memanggil dirinya sendiri disebut...', options: ['loop', 'recursion', 'iteration', 'lambda'],
      correctIndex: 1, explanation: 'Rekursi adalah fungsi yang memanggil dirinya sendiri.'
    },
    {
      id: 'f7', question: 'Apa output dari kode berikut?', options: ['2', '3', '1', '0'],
      correctIndex: 0, explanation: 'luas(2) dengan lebar=1: 2*1=2.',
      codeSnippet: 'def luas(p, l=1):\n    return p*l\n\nprint(luas(2))'
    },
    {
      id: 'f8', question: 'Variabel yang didefinisikan di dalam fungsi bersifat...', options: ['global', 'local', 'static', 'global permanent'],
      correctIndex: 1, explanation: 'Variabel dalam fungsi adalah local, hanya bisa diakses di sana.'
    },
    {
      id: 'f9', question: 'Apa output dari kode berikut?', options: ['nilai 5', 'nilai 10', 'Error', 'None'],
      correctIndex: 1, explanation: 'Fungsi memodifikasi nilai global dengan keyword global.',
      codeSnippet: 'nilai = 10\ndef tampil():\n    print("nilai", nilai)\n\ntampil()'
    },
    {
      id: 'f10', question: 'Fungsi yang tidak butuh parameter dan hanya mencetak disebut...', options: ['void function', 'parameterless', 'return function', 'lambda'],
      correctIndex: 1, explanation: 'Fungsi tanpa parameter disebut parameterless.'
    }
  ],
  'list-dictionary': [
    {
      id: 'd1', question: 'List ditulis dengan...', options: ['()', '[]', '{}', '<>'],
      correctIndex: 1, explanation: 'List menggunakan kurung siku []'
    },
    {
      id: 'd2', question: 'Apa output dari kode berikut?', options: ['apel', 'mangga', 'jeruk', 'Error'],
      correctIndex: 0, explanation: 'Index 0 mengambil elemen pertama.',
      codeSnippet: 'buah = ["apel", "mangga", "jeruk"]\nprint(buah[0])'
    },
    {
      id: 'd3', question: 'Method untuk menambah elemen di akhir list adalah...', options: ['add()', 'append()', 'push()', 'insert()'],
      correctIndex: 1, explanation: 'append() menambah elemen di akhir list.'
    },
    {
      id: 'd4', question: 'Apa output dari kode berikut?', options: ['List berisi ["apel", "mangga", "jeruk", "pisang"]', 'pisang', 'Error', 'apel'],
      correctIndex: 0, explanation: 'append menambah pisang di akhir list.',
      codeSnippet: 'buah = ["apel", "mangga", "jeruk"]\nbuah.append("pisang")\nprint(buah)'
    },
    {
      id: 'd5', question: 'Dictionary menyimpan data dalam pasangan...', options: ['index-value', 'key-value', 'key-index', 'array'],
      correctIndex: 1, explanation: 'Dictionary memakai pasangan key-value.'
    },
    {
      id: 'd6', question: 'Dictionary ditulis dengan kurung...', options: ['()', '[]', '{}', '::'],
      correctIndex: 2, explanation: 'Dictionary menggunakan kurung kurawal {}.'
    },
    {
      id: 'd7', question: 'Apa output dari kode berikut?', options: ['Andi', 'Budi', 'Error', 'None'],
      correctIndex: 0, explanation: 'data["nama"] mengambil value dari key nama.',
      codeSnippet: 'data = {"nama": "Andi", "umur": 19}\nprint(data["nama"])'
    },
    {
      id: 'd8', question: 'Method untuk menghapus elemen list berdasarkan index adalah...', options: ['remove()', 'pop()', 'delete()', 'drop()'],
      correctIndex: 1, explanation: 'pop(index) menghapus berdasar index, remove(x) berdasar nilai.'
    },
    {
      id: 'd9', question: 'Data = {"a": 1, "b": 2}. len(Data) adalah...', options: ['2', '1', '4', 'Error'],
      correctIndex: 0, explanation: 'len() menghitung jumlah pasangan key-value.'
    },
    {
      id: 'd10', question: 'Untuk mengecek apakah "nama" ada di dictionary d, gunakan...', options: ['d.check("nama")', '"nama" in d', 'd.has("nama")', '"nama" exists'],
      correctIndex: 1, explanation: 'Operator in mengecek keberadaan key di dictionary.'
    }
  ]
}

export const pretestQuestions: QuizQuestion[] = [
  {
    id: 'pt1', question: 'Bahasa Python bersifat...', options: ['Compiled', 'Interpretasi', 'Biner', 'Assembly'],
    correctIndex: 1, explanation: 'Python dieksekusi oleh interpreter baris per baris.'
  },
  {
    id: 'pt2', question: 'Apa output dari print(10 // 3)?', options: ['3.33', '3', '4', '1'],
    correctIndex: 1, explanation: 'Floor division menghasilkan 3.'
  },
  {
    id: 'pt3', question: 'Tipe data dari 3.14 adalah...', options: ['int', 'float', 'str', 'decimal'],
    correctIndex: 1, explanation: 'Bilangan desimal adalah float.'
  },
  {
    id: 'pt4', question: 'Manakah yang VALID sebagai nama variabel?', options: ['2x', 'x-y', 'x_y', 'if'],
    correctIndex: 2, explanation: 'Nama variabel memakai underscore dan bukan keyword.'
  },
  {
    id: 'pt5', question: 'Apa output dari kode berikut?', options: ['Lulus', 'Tidak Lulus', 'Error', 'Tidak ada'],
    correctIndex: 0, explanation: 'nilai 90 >= 70 → Lulus.',
    codeSnippet: 'nilai = 90\nif nilai >= 70:\n    print("Lulus")\nelse:\n    print("Tidak Lulus")'
  },
  {
    id: 'pt6', question: 'range(1, 4) menghasilkan...', options: ['1,2,3,4', '1,2,3', '0,1,2,3', '4'],
    correctIndex: 1, explanation: 'range(start, stop) tidak termasuk stop: 1,2,3.'
  },
  {
    id: 'pt7', question: 'Fungsi yang menampilkan output adalah...', options: ['input()', 'print()', 'read()', 'show()'],
    correctIndex: 1, explanation: 'print() menampilkan output ke layar.'
  },
  {
    id: 'pt8', question: 'Apa output dari 2 ** 4?', options: ['8', '16', '6', '24'],
    correctIndex: 1, explanation: '2 pangkat 4 = 16.'
  },
  {
    id: 'pt9', question: 'Kata kunci untuk menghentikan perulangan adalah...', options: ['stop', 'break', 'exit', 'return'],
    correctIndex: 1, explanation: 'break menghentikan perulangan.'
  },
  {
    id: 'pt10', question: 'data = {"nama": "Budi"}. akses nilainya dengan...', options: ['data[0]', 'data["nama"]', 'data.nama', 'data("nama")'],
    correctIndex: 1, explanation: 'Dictionary diakses dengan key: data["nama"].'
  }
]

export const posttestQuestions: QuizQuestion[] = [
  {
    id: 'po1', question: 'def tambah(a,b): return a+b. Output tambah(3,7)?', options: ['37', '10', '7', '11'],
    correctIndex: 1, explanation: '3 + 7 = 10.'
  },
  {
    id: 'po2', question: 'Apa output nya?', options: ['99', '100', '101', 'Error'],
    correctIndex: 1, explanation: 'for i in range(1,101) menjumlahkan 1..100 = 5050.',
    codeSnippet: 'total = 0\nfor i in range(1, 101):\n    total += i\nprint(total)'
  },
  {
    id: 'po3', question: 'list.append(x) berfungsi untuk...', options: ['hapus x', 'tambah x di akhir', 'tambah x di awal', 'mengurutkan'],
    correctIndex: 1, explanation: 'append menambahkan elemen di akhir list.'
  },
  {
    id: 'po4', question: 'Apa output dari kode berikut?', options: ['8', '6', '5', 'Error'],
    correctIndex: 0, explanation: '5*2-2 = 8.',
    codeSnippet: 'x = 5\nprint(x * 2 - 2)'
  },
  {
    id: 'po5', question: 'Nested dictionary adalah...', options: ['dict dalam list', 'dict dalam dict', 'list dalam dict', 'array 2D'],
    correctIndex: 1, explanation: 'Dictionary yang berisi dictionary lain.'
  },
  {
    id: 'po6', question: 'Apa output dari "Python"[1:4]?', options: ['Pyt', 'yth', 'ytho', 'ython'],
    correctIndex: 1, explanation: 'Slicing index 1 sampai 3: "yth".'
  },
  {
    id: 'po7', question: 'break digunakan untuk...', options: ['melanjutkan iterasi', 'menghentikan loop', 'membalik nilai', 'membuat fungsi'],
    correctIndex: 1, explanation: 'break menghentikan perulangan sepenuhnya.'
  },
  {
    id: 'po8', question: 'Output dari bool("") adalah...', options: ['True', 'False', 'Error', 'None'],
    correctIndex: 1, explanation: 'String kosong dikonversi menjadi False.'
  },
  {
    id: 'po9', question: 'Parameter yang wajib diisi saat memanggil fungsi disebut...', options: ['default', 'positional', 'optional', 'variadic'],
    correctIndex: 1, explanation: 'Positional parameter harus diisi urut sesuai deklarasi.'
  },
  {
    id: 'po10', question: 'Untuk mengurutkan list tanpa mengubah aslinya, gunakan...', options: ['list.sort()', 'sorted(list)', 'list.reverse()', 'sort()'],
    correctIndex: 1, explanation: 'sorted() mengembalikan salinan terurut tanpa mengubah asli.'
  }
]