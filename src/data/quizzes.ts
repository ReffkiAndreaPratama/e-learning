import type { QuizQuestion } from '../types'

export const quizzes: Record<string, QuizQuestion[]> = {
  'pengenalan-python': [
    {
      id: 'p1', question: 'Bahasa pemrograman yang dieksekusi baris per baris oleh penerjemah disebut bahasa...', options: ['Terkompilasi', 'Interpretasi', 'Mesin biner', 'Semantik'],
      correctIndex: 1, explanation: 'Bahasa interpretasi dieksekusi oleh interpreter baris per baris.',
      codeSnippet: 'tulis("Halo")'
    },
    {
      id: 'p2', question: 'Langkah berpikir logis untuk menyelesaikan masalah secara runtut disebut...', options: ['Algoritma', 'Indeks', 'Kompilator', 'Variabel'],
      correctIndex: 0, explanation: 'Algoritma adalah urutan langkah logis untuk menyelesaikan masalah.'
    },
    {
      id: 'p3', question: 'Apa output dari kode berikut?', options: ['0\n1\n2\n3\n4', '1\n2\n3\n4\n5', '0\n1\n2\n3\n4\n5', '4\n3\n2\n1\n0'],
      correctIndex: 0, explanation: 'Perulangan untuk i dari 0 sampai 4 menampilkan 0 sampai 4.',
      codeSnippet: 'untuk i <- 0 sampai 4\ntulis(i)\nakhiruntuk'
    },
    {
      id: 'p4', question: 'Komentar/keterangan pada pseudocode ditulis dengan simbol...', options: ['##', '/* */', '#', '<!-- -->'],
      correctIndex: 2, explanation: 'Komentar pseudocode menggunakan tanda pagar #.'
    },
    {
      id: 'p5', question: 'Manakah yang merupakan kegunaan utama bahasa pemrograman?', options: ['Pengembangan web', 'Ilmu data dan machine learning', 'Otomasi dan skrip', 'Semua benar'],
      correctIndex: 3, explanation: 'Pemrograman dipakai di banyak bidang, termasuk web, data, otomasi, dan IoT.'
    },
    {
      id: 'p6', question: 'Apa output dari kode berikut?', options: ['Halo', '"Halo"', '[Halo]', 'Error'],
      correctIndex: 0, explanation: 'tulis() menampilkan isi string tanpa tanda kutip.',
      codeSnippet: 'tulis("Halo")'
    },
    {
      id: 'p7', question: 'Apa output dari kode berikut?', options: ['10', '10 20', '20 10', 'Error'],
      correctIndex: 0, explanation: 'y mengambil nilai x yaitu 10, lalu tulis(x) menampilkan 10.',
      codeSnippet: 'x <- 10\ny <- x\ntulis(x)'
    },
    {
      id: 'p8', question: 'Akhir dari blok perulangan "untuk" pada pseudocode ditandai kata kunci...', options: ['akhiruntuk', 'akhirjika', 'akhirselama', 'keluar'],
      correctIndex: 0, explanation: 'Blok perulangan untuk ditutup dengan kata kunci akhiruntuk.'
    },
    {
      id: 'p9', question: 'Hal pertama yang dilakukan saat akan membuat program untuk memecahkan masalah adalah...', options: ['Menganalisis masalah', 'Menulis kode', 'Menjalankan program', 'Menghapus file'],
      correctIndex: 0, explanation: 'Analisis masalah dilakukan sebelum menulis kode dan menguji program.'
    },
    {
      id: 'p10', question: 'Fungsi untuk menampilkan output pada pseudocode adalah...', options: ['tulis', 'cetak', 'output', 'show'],
      correctIndex: 0, explanation: 'tulis() adalah fungsi bawaan untuk menampilkan output ke layar.'
    }
  ],
  'variabel-tipe-data': [
    {
      id: 'v1', question: 'Manakah nama variabel yang benar?', options: ['2nama', 'nama-siswa', 'nama_siswa', 'nama siswa'],
      correctIndex: 2, explanation: 'Nama variabel harus diawali huruf atau underscore, tanpa spasi dan karakter khusus.'
    },
    {
      id: 'v2', question: 'Apa tipe data dari nilai benar (benar/salah)?', options: ['int', 'str', 'bool', 'float'],
      correctIndex: 2, explanation: 'Nilai benar dan salah adalah tipe boolean.'
    },
    {
      id: 'v3', question: 'Apa output dari kode berikut?', options: ['20', '"20"', '20.0', 'Error'],
      correctIndex: 0, explanation: 'tulis() menampilkan nilai variabel umur yaitu 20.',
      codeSnippet: 'umur <- 20\ntulis(umur)'
    },
    {
      id: 'v4', question: '3.14 adalah contoh tipe data...', options: ['int', 'float', 'str', 'bool'],
      correctIndex: 1, explanation: 'Bilangan dengan desimal termasuk tipe float.'
    },
    {
      id: 'v5', question: 'Hasil dari konversi string angka "85" menjadi integer adalah...', options: ['"85"', '85', '85.0', 'Error'],
      correctIndex: 1, explanation: 'Konversi string angka "85" menghasilkan integer 85.'
    },
    {
      id: 'v6', question: 'Operator yang digunakan untuk menyimpan nilai ke dalam variabel adalah...', options: ['<-', '=>', '->', '::'],
      correctIndex: 0, explanation: 'Nilai disimpan ke variabel menggunakan operator <-.'
    },
    {
      id: 'v7', question: 'Apa output dari kode berikut?', options: ['HaloBudi', 'Halo Budi', 'Halo\nBudi', 'Error'],
      correctIndex: 0, explanation: 'Operator + menggabungkan string tanpa spasi: "Halo" + "Budi".',
      codeSnippet: 'a <- "Halo"\nb <- "Budi"\ntulis(a + b)'
    },
    {
      id: 'v8', question: 'Nilai kosong (tidak ada nilai) pada pseudocode dinyatakan dengan kata...', options: ['kosong', 'benar', 'salah', 'nol'],
      correctIndex: 0, explanation: 'Nilai kosong menyatakan variabel yang belum memiliki nilai.'
    },
    {
      id: 'v9', question: 'Apa output dari kode berikut?', options: ['3', '5', '2', 'Error'],
      correctIndex: 0, explanation: 'panjang("abc") mengembalikan 3.',
      codeSnippet: 'nama <- "abc"\ntulis(panjang(nama))'
    },
    {
      id: 'v10', question: 'Apa output dari kode berikut?', options: ['P', 'e', 'm', 'Error'],
      correctIndex: 0, explanation: 'Indeks string dimulai dari 1, jadi kata[1] = "P".',
      codeSnippet: 'kata <- "Pemrograman"\ntulis(kata[1])'
    }
  ],
  operator: [
    {
      id: 'o1', question: 'Hasil dari 10 div 3 adalah...', options: ['3.33', '3', '4', '1'],
      correctIndex: 1, explanation: 'div membagi lalu membulatkan ke bawah: 10 div 3 = 3.'
    },
    {
      id: 'o2', question: 'Hasil dari 10 mod 3 adalah...', options: ['3', '1', '0', '3.33'],
      correctIndex: 1, explanation: 'mod memberikan sisa bagi: 10 mod 3 = 1.'
    },
    {
      id: 'o3', question: 'Operator yang digunakan untuk membandingkan kesamaan dua nilai adalah...', options: ['=', '<-', '+', '**'],
      correctIndex: 0, explanation: 'Untuk membandingkan kesamaan digunakan = (atau ==).'
    },
    {
      id: 'o4', question: 'Hasil dari benar dan salah adalah...', options: ['Benar', 'Salah', 'Error', 'Kosong'],
      correctIndex: 1, explanation: 'dan menghasilkan benar hanya jika kedua operand benar.'
    },
    {
      id: 'o5', question: 'X <- X + 5 berarti...', options: ['X diubah menjadi 5', 'nilai X ditambah 5 lalu disimpan ke X', '5 ditambah 5', 'X selalu 5'],
      correctIndex: 1, explanation: 'nilai lama X ditambah 5, lalu hasilnya disimpan kembali ke X.'
    },
    {
      id: 'o6', question: 'Apa output dari kode berikut?', options: ['6', '8', '9', '23'],
      correctIndex: 1, explanation: '** adalah operator pangkat: 2 ** 3 = 8.',
      codeSnippet: 'tulis(2 ** 3)'
    },
    {
      id: 'o7', question: 'Hasil dari 7 >= 7 adalah...', options: ['7', 'true', 'false', 'Error'],
      correctIndex: 1, explanation: '>= berarti lebih besar atau sama dengan, jadi 7 >= 7 bernilai true.'
    },
    {
      id: 'o8', question: 'Apa output dari kode berikut?', options: ['true', 'false', 'Error', 'null'],
      correctIndex: 0, explanation: '10 > 5 benar dan 5 > 3 benar, sehingga hasilnya true.',
      codeSnippet: 'tulis(10 > 5 dan 5 > 3)'
    },
    {
      id: 'o9', question: 'Hasil dari tidak benar (not true) adalah...', options: ['Benar', 'Salah', '1', 'Kosong'],
      correctIndex: 1, explanation: 'tidak membalik nilai boolean: tidak benar = salah.'
    },
    {
      id: 'o10', question: 'Hasil dari 15 div 4 adalah...', options: ['3.75', '3', '4', '0'],
      correctIndex: 1, explanation: '15 div 4 = 3 karena pembulatan ke bawah.'
    }
  ],
  'input-output': [
    {
      id: 'i1', question: 'Fungsi untuk menerima masukan dari pengguna pada pseudocode adalah...', options: ['tulis', 'cetak', 'baca', 'output'],
      correctIndex: 2, explanation: 'baca() digunakan untuk menerima masukan dari keyboard.'
    },
    {
      id: 'i2', question: 'baca() selalu mengembalikan nilai bertipe...', options: ['int', 'float', 'str', 'bool'],
      correctIndex: 2, explanation: 'baca() selalu menghasilkan string, perlu konversi untuk angka.'
    },
    {
      id: 'i3', question: 'Untuk menerima angka bulat dari input, gunakan...', options: ['str(baca("Umur: "))', 'int(baca("Umur: "))', 'float(baca("Umur: "))', 'bool(baca("Umur: "))'],
      correctIndex: 1, explanation: 'int(baca()) mengubah hasil baca yang berupa string menjadi integer.'
    },
    {
      id: 'i4', question: 'Apa output dari kode berikut?', options: ['A-B-C', 'A B C', 'A-B C', 'ABC'],
      correctIndex: 0, explanation: 'Operator + menggabungkan string sehingga membentuk "A-B-C".',
      codeSnippet: 'tulis("A" + "-" + "B" + "-" + "C")'
    },
    {
      id: 'i5', question: 'Untuk menampilkan nilai variabel di dalam teks output, gunakan operator...', options: ['+ (penggabungan)', '* (perkalian)', '- (pengurangan)', '/ (pembagian)'],
      correctIndex: 0, explanation: 'Operator + menggabungkan string dengan variabel, contoh tulis("Nama: " + nama).'
    },
    {
      id: 'i6', question: 'Apa output dari kode berikut?', options: ['Hasil: 5', 'Hasil:5', 'Hasil', 'Error'],
      correctIndex: 0, explanation: 'Beberapa argumen pada tulis() dipisahkan satu spasi: "Hasil: 5".',
      codeSnippet: 'tulis("Hasil:", 5)'
    },
    {
      id: 'i7', question: 'Apa output dari kode berikut?', options: ['Skor 85', 'Skor85', '85', 'Error'],
      correctIndex: 0, explanation: 'tulis() menampilkan "Skor 85" sebagai satu baris output.',
      codeSnippet: 'tulis("Skor" + " 85")'
    },
    {
      id: 'i8', question: 'Apa output dari kode berikut?', options: ['3', '3.5', '4', 'Error'],
      correctIndex: 0, explanation: '7 div 2 = 3 karena pembagian dibulatkan ke bawah.',
      codeSnippet: 'tulis(7 div 2)'
    },
    {
      id: 'i9', question: 'Apa output dari kode berikut?', options: ['15', '105', '10', 'Error'],
      correctIndex: 0, explanation: 'int("10") menjadi 10, lalu 10 + 5 = 15.',
      codeSnippet: 'tulis(int("10") + 5)'
    },
    {
      id: 'i10', question: 'Jika harga <- 50000, hasil dari tulis("Harga: " + harga) adalah...', options: ['Harga: 50000', 'Harga:50000', 'Harga Rp50.000', 'Error'],
      correctIndex: 0, explanation: 'Operator + menggabungkan teks dengan nilai variabel menjadi "Harga: 50000".'
    }
  ],
  percabangan: [
    {
      id: 'c1', question: 'Apa output dari kode berikut?', options: ['Lulus', 'Tidak Lulus', 'Lulus\nTidak Lulus', 'Error'],
      correctIndex: 0, explanation: 'nilai 85 >= 70, sehingga mencetak "Lulus".',
      codeSnippet: 'nilai <- 85\njika nilai >= 70 maka\n    tulis("Lulus")\nselainnya\n    tulis("Tidak Lulus")\nakhirjika'
    },
    {
      id: 'c2', question: 'Pada pseudocode, percabangan dengan banyak kondisi biasanya disusun dengan...', options: ['menumpuk blok jika-selainnya', 'menggunakan perintah pilihan ganda', 'switch', 'case'],
      correctIndex: 0, explanation: 'Kondisi bertingkat dibuat dengan menumpuk blok jika-selainnya secara bersarang.'
    },
    {
      id: 'c3', question: 'Akhir dari blok percabangan pada pseudocode ditandai kata kunci...', options: ['akhirjika', 'selainnya', 'untuk', 'akhiruntuk'],
      correctIndex: 0, explanation: 'Blok percabangan ditutup dengan kata kunci akhirjika.'
    },
    {
      id: 'c4', question: 'Jika semua kondisi pada percabangan tidak terpenuhi, blok yang dijalankan adalah...', options: ['selainnya', 'perulangan', 'akhirjika', 'semua blok'],
      correctIndex: 0, explanation: 'Blok selainnya dijalankan ketika semua kondisi sebelumnya salah.'
    },
    {
      id: 'c5', question: 'Apa output dari kode berikut?', options: ['A', 'B', 'C', 'Error'],
      correctIndex: 2, explanation: 'nilai 75: kurang dari 90 dan 80, tetapi >= 70, sehingga grade = C.',
      codeSnippet: 'nilai <- 75\njika nilai >= 90 maka\n    grade <- "A"\nselainnya\n    jika nilai >= 80 maka\n        grade <- "B"\n    selainnya\n        jika nilai >= 70 maka\n            grade <- "C"\n        selainnya\n            grade <- "D"\n        akhirjika\n    akhirjika\nakhirjika\ntulis(grade)'
    },
    {
      id: 'c6', question: 'Operator yang mengharuskan kedua kondisi benar adalah...', options: ['dan', 'atau', 'tidak', 'mod'],
      correctIndex: 0, explanation: 'dan (and) mengharuskan kedua kondisi bernilai benar.'
    },
    {
      id: 'c7', question: 'Apa output dari kode berikut?', options: ['true', 'false', 'Error', 'null'],
      correctIndex: 1, explanation: '5 > 10 salah, sehingga hasil keseluruhan false.',
      codeSnippet: 'jika 5 > 10 dan 10 > 5 maka\n    tulis(true)\nselainnya\n    tulis(false)\nakhirjika'
    },
    {
      id: 'c8', question: 'Percabangan yang berada di dalam percabangan lain disebut percabangan...', options: ['bersarang', 'perulangan', 'rekursi', 'pemilihan ganda'],
      correctIndex: 0, explanation: 'Percabangan di dalam percabangan disebut bersarang (nested).'
    },
    {
      id: 'c9', question: 'Apa output dari kode berikut?', options: ['dewasa', 'remaja', 'anak', 'Error'],
      correctIndex: 1, explanation: 'usia 16: bukan >= 18, tetapi >= 13, sehingga mencetak "remaja".',
      codeSnippet: 'usia <- 16\njika usia >= 18 maka\n    tulis("dewasa")\nselainnya\n    jika usia >= 13 maka\n        tulis("remaja")\n    selainnya\n        tulis("anak")\n    akhirjika\nakhirjika'
    },
    {
      id: 'c10', question: 'Berapa blok maksimal yang dieksekusi dalam satu rangkaian percabangan jika-selainnya?', options: ['Satu blok', 'Semua blok', 'Dua blok', 'Nol blok'],
      correctIndex: 0, explanation: 'Hanya satu blok yang dieksekusi dalam satu rangkaian percabangan.'
    }
  ],
  perulangan: [
    {
      id: 'l1', question: 'Perulangan untuk i <- 0 sampai 2 menghasilkan nilai i berurutan...', options: ['0, 1, 2', '1, 2, 3', '0, 1, 2, 3', '2'],
      correctIndex: 0, explanation: 'i berjalan dari 0 sampai 2 (inklusif): 0, 1, 2.'
    },
    {
      id: 'l2', question: 'Apa output dari kode berikut?', options: ['0\n1\n2\n3\n4', '1\n2\n3\n4\n5', '0\n1\n2\n3', 'Error'],
      correctIndex: 0, explanation: 'Perulangan menampilkan i dari 0 sampai 4.',
      codeSnippet: 'untuk i <- 0 sampai 4\ntulis(i)\nakhiruntuk'
    },
    {
      id: 'l3', question: 'Perulangan untuk i <- 1 sampai 5 langkah 2 menghasilkan...', options: ['1, 2, 3, 4, 5', '1, 3, 5', '2, 4, 6', '1, 2, 3'],
      correctIndex: 1, explanation: 'Dengan langkah 2 mulai dari 1: 1, 3, 5.'
    },
    {
      id: 'l4', question: 'Kata kunci untuk menghentikan perulangan pada pseudocode adalah...', options: ['keluar', 'lanjut', 'mulai', 'ulang'],
      correctIndex: 0, explanation: 'keluar (break) menghentikan perulangan; lanjut hanya melewati iterasi.'
    },
    {
      id: 'l5', question: 'Kata kunci untuk melewati sisa iterasi saat ini adalah...', options: ['lanjut', 'keluar', 'mulai', 'ulang'],
      correctIndex: 0, explanation: 'lanjut (continue) melewati sisa iterasi dan lanjut ke iterasi berikutnya.'
    },
    {
      id: 'l6', question: 'Perulangan selama akan terus berjalan selama...', options: ['kondisi benar', 'kondisi salah', 'selamanya', 'rentang habis'],
      correctIndex: 0, explanation: 'Perulangan selama mengulang selama kondisinya benar.'
    },
    {
      id: 'l7', question: 'Apa output dari kode berikut?', options: ['0\n1\n2', '1\n2\n3', '0\n1\n2\n3\n4', '3'],
      correctIndex: 0, explanation: 'x mulai 0 dan bertambah 1 selama x < 3, menampilkan 0, 1, 2.',
      codeSnippet: 'x <- 0\nselama x < 3\n    tulis(x)\n    x <- x + 1\nakhirsementara'
    },
    {
      id: 'l8', question: 'Untuk menghitung 1+2+3+...+100, perulangan yang paling ringkas adalah...', options: ['untuk i <- 1 sampai 100', 'selama dengan penghitung manual', 'keduanya', 'tidak bisa'],
      correctIndex: 0, explanation: 'Perulangan untuk ... sampai ... paling ringkas karena jumlah iterasi sudah diketahui.'
    },
    {
      id: 'l9', question: 'Apa output dari kode berikut?', options: ['0\n1\n2\n3\n4', '0\n2\n4', '1\n3\n5', '2\n4'],
      correctIndex: 1, explanation: 'i ganjil dilewati oleh lanjut, hanya bilangan genap 0, 2, 4 yang ditampilkan.',
      codeSnippet: 'untuk i <- 0 sampai 4\n    jika i mod 2 <> 0 maka\n        lanjut\n    akhirjika\n    tulis(i)\nakhiruntuk'
    },
    {
      id: 'l10', question: 'Jika kondisi perulangan selama selalu benar tanpa ada perubahan, yang terjadi adalah...', options: ['perulangan tak berujung', 'percabangan', 'perulangan berhenti', 'galat sintaks'],
      correctIndex: 0, explanation: 'Tanpa perubahan, kondisi tetap benar sehingga perulangan tidak akan pernah berakhir.'
    }
  ],
  fungsi: [
    {
      id: 'f1', question: 'Kata kunci untuk mendefinisikan fungsi pada pseudocode adalah...', options: ['fungsi', 'macam', 'def', 'lambda'],
      correctIndex: 0, explanation: 'fungsi digunakan untuk mendefinisikan sebuah fungsi.'
    },
    {
      id: 'f2', question: 'Apa output dari kode berikut?', options: ['8', '5', '3', '15'],
      correctIndex: 0, explanation: 'tambah(5, 3) mengembalikan 5 + 3 = 8.',
      codeSnippet: 'fungsi tambah(a, b)\n    kembalikan a + b\nakhirfungsi\ntulis(tambah(5, 3))'
    },
    {
      id: 'f3', question: 'Jika fungsi tidak memiliki perintah kembalikan, nilai baliknya adalah...', options: ['kosong', '0', 'false', 'galat'],
      correctIndex: 0, explanation: 'Fungsi tanpa perintah kembalikan tidak menghasilkan nilai (kosong).'
    },
    {
      id: 'f4', question: 'Apa output dari kode berikut?', options: ['Halo Budi', 'Halo', 'Halo Teman', 'Error'],
      correctIndex: 0, explanation: 'Argumen "Budi" diteruskan ke parameter nama, sehingga tercetak "Halo Budi".',
      codeSnippet: 'fungsi sapa(nama)\n    tulis("Halo " + nama)\nakhirfungsi\nsapa("Budi")'
    },
    {
      id: 'f5', question: 'Parameter yang memiliki nilai awal bawaan disebut...', options: ['parameter default', 'parameter posisi', 'parameter kata kunci', 'parameter tak tentu'],
      correctIndex: 0, explanation: 'Parameter default memiliki nilai awal yang bisa diganti saat dipanggil.'
    },
    {
      id: 'f6', question: 'Fungsi yang memanggil dirinya sendiri disebut...', options: ['rekursi', 'iterasi', 'perulangan', 'lambda'],
      correctIndex: 0, explanation: 'Rekursi adalah pemanggilan fungsi terhadap dirinya sendiri.'
    },
    {
      id: 'f7', question: 'Apa output dari kode berikut?', options: ['6', '2', '5', 'Error'],
      correctIndex: 0, explanation: 'luas(2, 3) = 2 × 3 = 6.',
      codeSnippet: 'fungsi luas(p, l)\n    kembalikan p * l\nakhirfungsi\ntulis(luas(2, 3))'
    },
    {
      id: 'f8', question: 'Variabel yang didefinisikan di dalam fungsi bersifat...', options: ['lokal', 'global', 'statis', 'menyeluruh'],
      correctIndex: 0, explanation: 'Variabel di dalam fungsi bersifat lokal dan hanya dapat diakses di sana.'
    },
    {
      id: 'f9', question: 'Apa output dari kode berikut?', options: ['nilai 10', 'nilai 5', 'nilai', 'Error'],
      correctIndex: 0, explanation: 'Fungsi membaca variabel nilai di luar fungsi yang bernilai 10.',
      codeSnippet: 'nilai <- 10\nfungsi tampil()\n    tulis("nilai", nilai)\nakhirfungsi\ntampil()'
    },
    {
      id: 'f10', question: 'Kumpulan perintah yang dijalankan tanpa mengembalikan nilai disebut...', options: ['prosedur', 'operator', 'perulangan', 'variabel'],
      correctIndex: 0, explanation: 'Prosedur menjalankan perintah tanpa menghasilkan nilai balik.'
    }
  ],
  'list-dictionary': [
    {
      id: 'd1', question: 'Struktur data array pada pseudocode ditulis dengan...', options: ['[ ]', '( )', '{ }', '< >'],
      correctIndex: 0, explanation: 'Array menggunakan kurung siku [ ].'
    },
    {
      id: 'd2', question: 'Apa output dari kode berikut?', options: ['apel', 'mangga', 'jeruk', 'Error'],
      correctIndex: 0, explanation: 'Indeks 1 mengambil elemen pertama array, yaitu "apel".',
      codeSnippet: 'buah <- ["apel", "mangga", "jeruk"]\ntulis(buah[1])'
    },
    {
      id: 'd3', question: 'Struktur data yang menyimpan banyak nilai dan diakses menggunakan indeks disebut...', options: ['array', 'dictionary', 'nilai', 'prosedur'],
      correctIndex: 0, explanation: 'Array menyimpan banyak nilai yang diakses lewat indeks.'
    },
    {
      id: 'd4', question: 'Apa output dari kode berikut?', options: ['3', '1', '2', 'Error'],
      correctIndex: 0, explanation: 'panjang() menghitung jumlah elemen array, yaitu 3.',
      codeSnippet: 'data <- [10, 20, 30]\ntulis(panjang(data))'
    },
    {
      id: 'd5', question: 'Struktur data yang menyimpan pasangan kunci dan nilai disebut...', options: ['kamus', 'array', 'perulangan', 'fungsi'],
      correctIndex: 0, explanation: 'Kamus menyimpan pasangan kunci-nilai (key-value).'
    },
    {
      id: 'd6', question: 'Pada kamus (dictionary), sebuah nilai diambil menggunakan...', options: ['kunci (key)', 'indeks angka', 'perulangan', 'panjang data'],
      correctIndex: 0, explanation: 'Nilai pada kamus diakses menggunakan kunci (key), bukan indeks.'
    },
    {
      id: 'd7', question: 'Apa output dari kode berikut?', options: ['Andi', 'Budi', 'Error', 'null'],
      correctIndex: 1, explanation: 'Indeks 2 mengambil elemen kedua array, yaitu "Budi".',
      codeSnippet: 'data <- ["Andi", "Budi"]\ntulis(data[2])'
    },
    {
      id: 'd8', question: 'Mengakses indeks di luar panjang array akan menghasilkan...', options: ['galat', 'nilai pertama', 'nilai kosong', 'benar'],
      correctIndex: 0, explanation: 'Indeks di luar jangkauan array menghasilkan galat pada interpreter.'
    },
    {
      id: 'd9', question: 'Jika data <- [1, 2], maka panjang(data) adalah...', options: ['2', '1', '4', 'galat'],
      correctIndex: 0, explanation: 'Array berisi 2 elemen, sehingga panjang(data) = 2.'
    },
    {
      id: 'd10', question: 'Apa output dari kode berikut?', options: ['[1, 2, 3]', '1 2 3', '123', 'Error'],
      correctIndex: 0, explanation: 'tulis() menampilkan seluruh isi array dalam kurung siku.',
      codeSnippet: 'data <- [1, 2, 3]\ntulis(data)'
    }
  ]
}

export const pretestQuestions: QuizQuestion[] = [
  {
    id: 'pt1', question: 'Bahasa pemrograman yang dieksekusi baris per baris oleh interpreter bersifat...', options: ['Terkompilasi', 'Interpretasi', 'Biner', 'Rangkaian mesin'],
    correctIndex: 1, explanation: 'Interpreter mengeksekusi kode baris per baris tanpa kompilasi sebelumnya.'
  },
  {
    id: 'pt2', question: 'Apa output dari kode berikut?', options: ['3.33', '3', '4', '1'],
    correctIndex: 1, explanation: 'div menghasilkan pembagian dengan pembulatan ke bawah: 3.',
    codeSnippet: 'tulis(10 div 3)'
  },
  {
    id: 'pt3', question: 'Tipe data dari 3.14 adalah...', options: ['int', 'float', 'str', 'decimal'],
    correctIndex: 1, explanation: 'Bilangan desimal adalah float.'
  },
  {
    id: 'pt4', question: 'Manakah yang VALID sebagai nama variabel?', options: ['2x', 'x-y', 'x_y', 'x y'],
    correctIndex: 2, explanation: 'Nama variabel memakai underscore dan tanpa spasi atau tanda hubung.'
  },
  {
    id: 'pt5', question: 'Apa output dari kode berikut?', options: ['Lulus', 'Tidak Lulus', 'Error', 'Tidak ada'],
    correctIndex: 0, explanation: 'nilai 90 >= 70, sehingga mencetak "Lulus".',
    codeSnippet: 'nilai <- 90\njika nilai >= 70 maka\n    tulis("Lulus")\nselainnya\n    tulis("Tidak Lulus")\nakhirjika'
  },
  {
    id: 'pt6', question: 'Perulangan untuk i <- 1 sampai 3 menghasilkan...', options: ['1, 2, 3, 4', '1, 2, 3', '0, 1, 2, 3', '3'],
    correctIndex: 1, explanation: 'Nilai i berjalan dari 1 sampai 3: 1, 2, 3.'
  },
  {
    id: 'pt7', question: 'Fungsi yang menampilkan output adalah...', options: ['tulis()', 'baca()', 'baca_ulang()', 'simpan()'],
    correctIndex: 0, explanation: 'tulis() menampilkan output ke layar.'
  },
  {
    id: 'pt8', question: 'Apa output dari kode berikut?', options: ['8', '16', '6', '24'],
    correctIndex: 1, explanation: '2 pangkat 4 = 16.',
    codeSnippet: 'tulis(2 ** 4)'
  },
  {
    id: 'pt9', question: 'Kata kunci untuk menghentikan perulangan pada pseudocode adalah...', options: ['keluar', 'lanjut', 'mulai', 'ulang'],
    correctIndex: 0, explanation: 'keluar menghentikan perulangan sepenuhnya.'
  },
  {
    id: 'pt10', question: 'Jika data <- ["Budi", "Andi"], nilai "Budi" diakses dengan...', options: ['data[1]', 'data[0]', 'data.nama', 'data["Budi"]'],
    correctIndex: 0, explanation: 'Indeks 1 mengambil elemen pertama array, yaitu "Budi".'
  }
]

export const posttestQuestions: QuizQuestion[] = [
  {
    id: 'po1', question: 'Fungsi tambah(a, b) mengembalikan a + b. Output dari tambah(3, 7) adalah...', options: ['37', '10', '7', '11'],
    correctIndex: 1, explanation: '3 + 7 = 10.'
  },
  {
    id: 'po2', question: 'Apa output dari kode berikut?', options: ['5050', '100', '101', '1000'],
    correctIndex: 0, explanation: 'Menjumlahkan 1 sampai 100 menghasilkan 5050.',
    codeSnippet: 'total <- 0\nuntuk i <- 1 sampai 100\n    total <- total + i\nakhiruntuk\ntulis(total)'
  },
  {
    id: 'po3', question: 'Struktur data yang elemennya diakses menggunakan indeks adalah...', options: ['array', 'kamus', 'perulangan', 'variabel'],
    correctIndex: 0, explanation: 'Array menyimpan banyak nilai dan diakses lewat indeks.'
  },
  {
    id: 'po4', question: 'Apa output dari kode berikut?', options: ['8', '6', '5', 'Error'],
    correctIndex: 0, explanation: '5 × 2 - 2 = 8.',
    codeSnippet: 'x <- 5\ntulis(x * 2 - 2)'
  },
  {
    id: 'po5', question: 'Array yang berisi array lain di dalamnya disebut...', options: ['array multidimensi', 'array 1 dimensi', 'array kosong', 'string array'],
    correctIndex: 0, explanation: 'Array di dalam array membentuk array multidimensi.'
  },
  {
    id: 'po6', question: 'Apa output dari kode berikut?', options: ['11', '10', '9', 'Error'],
    correctIndex: 0, explanation: 'panjang("Pemrograman") = 11.',
    codeSnippet: 'kata <- "Pemrograman"\ntulis(panjang(kata))'
  },
  {
    id: 'po7', question: 'keluar digunakan untuk...', options: ['menghentikan perulangan', 'melanjutkan iterasi', 'membalik nilai', 'membuat fungsi'],
    correctIndex: 0, explanation: 'keluar menghentikan perulangan sepenuhnya.'
  },
  {
    id: 'po8', question: 'Apa output dari kode berikut?', options: ['true', 'false', '7', 'Error'],
    correctIndex: 0, explanation: '7 > 3 bernilai benar (true).',
    codeSnippet: 'tulis(7 > 3)'
  },
  {
    id: 'po9', question: 'Parameter yang wajib diisi saat pemanggilan fungsi disebut parameter...', options: ['wajib', 'bawaan', 'opsional', 'acak'],
    correctIndex: 0, explanation: 'Parameter yang harus diisi pada setiap pemanggilan disebut parameter wajib.'
  },
  {
    id: 'po10', question: 'Proses mencari dan memperbaiki kesalahan pada program disebut...', options: ['debugging', 'compiling', 'designing', 'hosting'],
    correctIndex: 0, explanation: 'Debugging adalah proses menemukan dan memperbaiki kesalahan (bug) pada program.'
  }
]