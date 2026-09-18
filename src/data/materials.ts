import type { Topic } from '../types'

export const materials: Topic[] = [
  {
    id: 'pengenalan-python',
    number: 1,
    title: 'Pengenalan Pemrograman',
    description: 'Memahami apa itu pemrograman, karakteristik bahasa pemrograman, dan struktur program sederhana.',
    difficulty: 'Beginner',
    estimatedMinutes: 10,
    icon: '💻',
    subTopics: [
      {
        id: 'apa-itu-python',
        title: 'Apa itu Pemrograman?',
        content: `Pemrograman adalah proses menulis serangkaian instruksi yang dapat dipahami dan dieksekusi oleh komputer untuk menyelesaikan suatu masalah.

Sebelum menulis kode, kita merancang **algoritma**, yaitu langkah-langkah logis yang tersusun berurutan untuk mencapai tujuan tertentu. Contoh sederhana: menentukan bilangan terbesar dari dua bilangan.

Konsep penting:
- **Algoritma** — langkah berpikir yang belum berbentuk kode.
- **Bahasa pemrograman** — alat untuk menuliskan algoritma agar bisa dieksekusi komputer.
- **Kode sumber** — teks program yang ditulis manusia.

Bahasa pemrograman dieksekusi dengan dua cara utama:
1. **Kompilasi** — seluruh kode sumber diterjemahkan menjadi program (kode mesin) sekaligus sebelum dijalankan.
2. **Interpretasi** — kode dieksekusi baris per baris oleh penerjemah (interpreter), tanpa perlu diubah seluruhnya terlebih dahulu.

Kedua pendekatan sama-sama bertujuan menerjemahkan instruksi menjadi tindakan nyata oleh komputer.`,
        codeExample: `# Algoritma: menentukan bilangan terbesar
# dari dua bilangan
a <- 8
b <- 3

jika a > b maka
  terbesar <- a
selainnya
  terbesar <- b
akhirjika

tulis("Bilangan terbesar:", terbesar)`,
        output: `Bilangan terbesar: 8`
      },
      {
        id: 'karakteristik-python',
        title: 'Karakteristik Bahasa Pemrograman',
        content: `Setiap bahasa pemrograman memiliki karakteristik yang memengaruhi cara kita menulis dan menjalankan program.

1. **Sederhana** — Sintaks yang mirip bahasa sehari-hari membuat kode mudah dibaca dan ditulis.

2. **Interpretasi / kompilasi** — Bahasa interpretasi dieksekusi langsung baris per baris; bahasa kompilasi diterjemahkan seluruhnya sebelum dijalankan.

3. **Dinamis** — Tipe data ditentukan otomatis saat program berjalan, tidak perlu dideklarasikan secara eksplisit.

4. **Multi-paradigma** — Mendukung gaya prosedural, berorientasi objek, maupun fungsional.

5. **Terbuka dan gratis** — Banyak bahasa bersifat terbuka (open source) dengan komunitas besar.

6. **Portabel** — Program yang sama dapat dijalankan di berbagai sistem operasi.

Karakteristik ini menentukan kapan suatu bahasa cocok dipakai untuk kebutuhan tertentu.`,
        codeExample: `# Pendekatan dinamis: tipe mengikuti nilai
nama <- "Budi"        # teks
umur <- 20            # bilangan bulat
tinggi <- 170.5       # bilangan desimal
aktif <- benar        # boolean

# Nilai dapat berganti tipe saat program berjalan
x <- 10
tulis("Nilai x:", x)
x <- "sekarang teks"
tulis("Nilai x:", x)`,
        output: `Nilai x: 10
Nilai x: sekarang teks`
      },
      {
        id: 'struktur-program',
        title: 'Struktur Dasar Program',
        content: `Sebuah program disusun dari baris-baris kode yang dieksekusi dari atas ke bawah. Banyak bahasa pemrograman menggunakan indentasi (spasi di awal baris) untuk menandai blok kode tertentu.

Struktur dasar sebuah program:

1. **Komentar** — Catatan untuk pembaca manusia, tidak dieksekusi. Ditulis dengan tanda \`#\` di awal baris.
2. **Statement** — Perintah/instruksi yang benar-benar dieksekusi.
3. **Indentasi** — Penanda blok kode di dalam struktur seperti percabangan dan perulangan.

Komentar hanya membantu manusia memahami kode; interpreter akan mengabaikannya.`,
        codeExample: `# Ini komentar - tidak dieksekusi

# Program menghitung luas persegi panjang
panjang <- 10
lebar <- 5

# Rumus luas
luas <- panjang * lebar

tulis("Panjang:", panjang)
tulis("Lebar:", lebar)
tulis("Luas:", luas)`,
        output: `Panjang: 10
Lebar: 5
Luas: 50`
      },
      {
        id: 'fungsi-print',
        title: 'Menampilkan Output (tulis)',
        content: `Fungsi \`tulis()\` digunakan untuk menampilkan output ke layar. Ini adalah fungsi pertama yang harus dikuasai.

Beberapa cara menggunakan tulis():

1. **Teks biasa** — \`tulis("Halo")\`
2. **Variabel** — \`tulis(nama)\`
3. **Banyak argumen** — \`tulis("Nama:", nama)\` menghasilkan \`Nama: Budi\`
4. **Konkatenasi** — \`tulis("Halo " + nama)\`

Setiap pemanggilan \`tulis()\` mencetak satu baris (diakhiri baris baru). Nilai yang dipisah koma dalam satu pemanggilan dicetak dengan satu spasi di antaranya.

Teks ditulis di dalam tanda kutip, sedangkan variabel ditulis tanpa tanda kutip.`,
        codeExample: `# Teks biasa
tulis("Halo Dunia!")

# Teks dengan variabel
nama <- "Andi"
umur <- 19
tulis("Nama:", nama)
tulis("Umur:", umur)

# Konkatenasi teks dan variabel
tulis("Nama saya " + nama + ", umur " + str(umur) + " tahun")

# Penggabungan dengan pemisah (sep)
tulis("A", "B", "C", sep="-")`,
        output: `Halo Dunia!
Nama: Andi
Umur: 19
Nama saya Andi, umur 19 tahun
A-B-C`
      }
    ],
    summary: 'Algoritma adalah langkah logis untuk menyelesaikan masalah. Bahasa pemrograman menuliskan algoritma menjadi kode yang dieksekusi komputer (interpretasi atau kompilasi). Gunakan tulis() untuk menampilkan output.'
  },
  {
    id: 'variabel-tipe-data',
    number: 2,
    title: 'Variabel dan Tipe Data',
    description: 'Memahami cara mendeklarasikan variabel dan berbagai tipe data dasar.',
    difficulty: 'Beginner',
    estimatedMinutes: 12,
    icon: '📦',
    subTopics: [
      {
        id: 'pengertian-variabel',
        title: 'Pengertian Variabel',
        content: `Variabel adalah nama yang digunakan untuk menyimpan data di dalam memori komputer. Anda tidak perlu menyebutkan tipe data secara eksplisit — cukup beri nama dan masukkan nilainya dengan tanda \`<-\`.

Aturan penamaan variabel:
1. Harus dimulai dengan huruf atau garis bawah (_)
2. Boleh mengandung huruf, angka, dan garis bawah
3. **Tidak boleh** menggunakan spasi atau karakter khusus
4. **Berdasarkan huruf besar/kecil** — \`nama\` dan \`Nama\` adalah variabel berbeda
5. Tidak boleh menggunakan kata kunci bahasa (jika, untuk, selama, dll.)

Contoh: \`nama <- "Siti"\` menyimpan teks, \`ipk <- 3.75\` menyimpan bilangan desimal.`,
        codeExample: `# Pendeklarasian variabel
nama <- "Siti"
nim <- "12345678"
ipk <- 3.75
aktif <- benar

# Penamaan yang benar
nama_mahasiswa <- "Budi"
_nilai <- 90
angkatan2024 <- 2024

# Penamaan yang SALAH (mengakibatkan error)
# 2angkatan <- 2024   # Error! diawali angka
# nama siswa <- "A"   # Error! ada spasi
# untuk <- 5          # Error! kata kunci bahasa

tulis("Nama:", nama)
tulis("NIM:", nim)
tulis("IPK:", ipk)
tulis("Aktif:", aktif)`,
        output: `Nama: Siti
NIM: 12345678
IPK: 3.75
Aktif: true`
      },
      {
        id: 'tipe-data',
        title: 'Tipe Data Dasar',
        content: `Bahasa pemrograman menyediakan beberapa tipe data dasar:

1. **Integer** — Bilangan bulat, tanpa desimal. Contoh: 10, -5, 0, 1000

2. **Desimal (float)** — Bilangan dengan desimal. Contoh: 3.14, -0.5, 100.0

3. **String** — Teks, ditulis di dalam tanda kutip. Contoh: "Halo", "Belajar"

4. **Boolean** — Nilai benar atau salah. Contoh: benar, salah

5. **Kosong (null)** — Tidak ada nilai. Contoh: kosong

Nilai boolean dicetak sebagai \`true\` (benar) atau \`false\` (salah). Nilai kosong menandai data yang belum diisi.`,
        codeExample: `# Bilangan bulat
umur <- 20
jumlah_mahasiswa <- 100
tulis("Umur:", umur)
tulis("Jumlah mahasiswa:", jumlah_mahasiswa)

# Bilangan desimal
ipk <- 3.75
tinggi <- 170.5
tulis("IPK:", ipk)
tulis("Tinggi:", tinggi)

# Teks
nama <- "Budi"
tulis("Nama:", nama)

# Boolean
aktif <- benar
lulus <- salah
tulis("Aktif:", aktif)
tulis("Lulus:", lulus)`,
        output: `Umur: 20
Jumlah mahasiswa: 100
IPK: 3.75
Tinggi: 170.5
Nama: Budi
Aktif: true
Lulus: false`
      },
      {
        id: 'konversi-tipe',
        title: 'Konversi Tipe Data',
        content: `Terkadang kita perlu mengubah data dari satu tipe ke tipe lain. Proses ini disebut **konversi tipe** atau **type casting**.

Fungsi konversi:
- \`int(...)\` — mengubah menjadi integer
- \`float(...)\` — mengubah menjadi float
- \`str(...)\` — mengubah menjadi string

**Perhatikan:** Tidak semua konversi berhasil. Misalnya, \`int("abc")\` akan menghasilkan error karena teks tersebut bukan angka.

Aturan konversi boolean umumnya: nilai 0, teks kosong, dan nilai kosong dianggap salah; selain itu dianggap benar.`,
        codeExample: `# String ke integer
nilai_teks <- "85"
nilai_angka <- int(nilai_teks)
tulis("Nilai:", nilai_angka)

# Integer ke float
angka <- 10
desimal <- float(angka)
tulis(angka, "->", desimal)

# Angka ke string
harga <- 50000
harga_teks <- str(harga)
tulis("Harga: Rp" + harga_teks)`,
        output: `Nilai: 85
10 -> 10
Harga: Rp50000`
      },
      {
        id: 'operasi-string',
        title: 'Operasi pada String',
        content: `String sangat fleksibel. Beberapa operasi yang bisa dilakukan:

1. **Konkatenasi** — Menggabungkan teks dengan \`+\`
2. **Indeks** — Mengakses karakter tertentu dengan \`[posisi]\` (indeks dimulai dari 1)
3. **Panjang** — \`panjang(teks)\` untuk mengetahui jumlah karakter

Dalam notasi pseudocode yang dipakai di sini, indeks string dimulai dari 1, sama seperti indeks array. Karakter pada \`teks[1]\` adalah karakter pertama.`,
        codeExample: `# Konkatenasi
depan <- "Halo"
belakang <- "Dunia"
gabungan <- depan + " " + belakang
tulis(gabungan)

# Panjang teks
kata <- "Belajar"
tulis("Panjang kata:", panjang(kata))

# Akses karakter pertama dan terakhir
tulis("Karakter pertama:", kata[1])
tulis("Karakter terakhir:", kata[panjang(kata)])

# Mengulang teks memakai perulangan untuk
untuk i <- 1 sampai 3
  tulis("Ha")
akhiruntuk

# Gabungan variabel dan teks
nama <- "Budi"
tulis("Halo, " + nama + "!")`,
        output: `Halo Dunia
Panjang kata: 7
Karakter pertama: B
Karakter terakhir: r
Ha
Ha
Ha
Halo, Budi!`
      }
    ],
    summary: 'Variabel menyimpan data dengan nama tertentu memakai tanda <-. Tipe dasar: integer, desimal, string, boolean, dan kosong. Gunakan int(), float(), str() untuk konversi tipe data.'
  },
  {
    id: 'operator',
    number: 3,
    title: 'Operator',
    description: 'Memahami berbagai jenis operator: aritmatika, perbandingan, logika, dan penugasan.',
    difficulty: 'Beginner',
    estimatedMinutes: 10,
    icon: '🔢',
    subTopics: [
      {
        id: 'operator-aritmatika',
        title: 'Operator Aritmatika',
        content: `Operator aritmatika digunakan untuk operasi matematika dasar.

| Operator | Keterangan | Contoh | Hasil |
|----------|-----------|---------|-------|
| + | Penjumlahan | 5 + 3 | 8 |
| - | Pengurangan | 5 - 3 | 2 |
| * | Perkalian | 5 * 3 | 15 |
| / | Pembagian | 10 / 2 | 5 |
| div | Bagi bulat (floor) | 15 div 4 | 3 |
| mod | Sisa bagi (modulus) | 15 mod 4 | 3 |
| ** | Eksponen (pangkat) | 2 ** 3 | 8 |

Catatan: \`/\` menghasilkan bilangan desimal, sedangkan \`div\` menghasilkan bilangan bulat (dibulatkan ke bawah). \`mod\` menghasilkan sisa pembagian.`,
        codeExample: `a <- 15
b <- 4

tulis("15 + 4 =", a + b)
tulis("15 - 4 =", a - b)
tulis("15 * 4 =", a * b)
tulis("15 / 2 =", 15 / 2)
tulis("15 div 4 =", 15 div 4)
tulis("15 mod 4 =", 15 mod 4)
tulis("2 ** 3 =", 2 ** 3)`,
        output: `15 + 4 = 19
15 - 4 = 11
15 * 4 = 60
15 / 2 = 7.5
15 div 4 = 3
15 mod 4 = 3
2 ** 3 = 8`
      },
      {
        id: 'operator-perbandingan',
        title: 'Operator Perbandingan',
        content: `Operator perbandingan menghasilkan nilai boolean (benar/salah).

| Operator | Keterangan | Contoh | Hasil |
|----------|-----------|---------|-------|
| = atau == | Sama dengan | 5 = 5 | benar |
| <> atau != | Tidak sama dengan | 5 <> 3 | benar |
| > | Lebih besar dari | 5 > 3 | benar |
| < | Lebih kecil dari | 5 < 3 | salah |
| >= | Lebih besar atau sama dengan | 5 >= 5 | benar |
| <= | Lebih kecil atau sama dengan | 3 <= 5 | benar |

**Perhatikan:** gunakan \`=\` atau \`==\` untuk membandingkan, sedangkan \`<-\` untuk menugaskan nilai. Hasil boolean dicetak sebagai \`true\` atau \`false\`.`,
        codeExample: `x <- 10
y <- 5

tulis(x, "=", y, ":", x = y)
tulis(x, "<>", y, ":", x <> y)
tulis(x, ">", y, ":", x > y)
tulis(x, "<", y, ":", x < y)
tulis(x, ">=", x, ":", x >= x)
tulis(x, "<=", y, ":", x <= y)

# Perbandingan teks
tulis("abc = abc:", "abc" = "abc")
tulis("abc = Abc:", "abc" = "Abc")`,
        output: `10 = 5 : false
10 <> 5 : true
10 > 5 : true
10 < 5 : false
10 >= 10 : true
10 <= 5 : false
abc = abc: true
abc = Abc: false`
      },
      {
        id: 'operator-logika',
        title: 'Operator Logika',
        content: `Operator logika digunakan untuk menggabungkan beberapa kondisi boolean.

| Operator | Keterangan | Contoh |
|----------|-----------|---------|
| dan (and) | Benar jika KEDUA benar | benar dan salah -> salah |
| atau (or) | Benar jika SALAH SATU benar | benar atau salah -> benar |
| tidak (not) | Membalik nilai | tidak benar -> salah |

**Tabel kebenaran \`dan\`:**
- benar dan benar = benar
- benar dan salah = salah
- salah dan salah = salah

**Tabel kebenaran \`atau\`:**
- benar atau benar = benar
- benar atau salah = benar
- salah atau salah = salah

**\`tidak\`** membalik nilai: \`tidak benar\` = salah, \`tidak salah\` = benar.`,
        codeExample: `usia <- 25
penghasilan <- 5000000

# Operator dan
kredit_diterima <- usia >= 21 dan penghasilan >= 3000000
tulis("Kredit diterima:", kredit_diterima)

# Operator atau
diskon <- usia <= 12 atau usia >= 60
tulis("Dapat diskon:", diskon)

# Operator tidak
is_admin <- salah
bukan_admin <- tidak is_admin
tulis("Bukan admin:", bukan_admin)

# Gabungan
lulus <- benar
bayar <- salah
bisa_wisuda <- lulus dan bayar
tulis("Bisa wisuda:", bisa_wisuda)

langsung_cetak <- tidak bayar
tulis("Langsung cetak:", langsung_cetak)`,
        output: `Kredit diterima: true
Dapat diskon: false
Bukan admin: true
Bisa wisuda: false
Langsung cetak: true`
      },
      {
        id: 'operator-assignment',
        title: 'Operator Assignment',
        content: `Operator penugasan digunakan untuk menugaskan atau memperbarui nilai variabel.

| Perintah | Arti |
|----------|------|
| x <- 5 | x diberi nilai 5 |
| x := 3 | x diberi nilai 3 (tanda lain yang dibolehkan) |
| x <- x + 3 | x diperbarui dengan nilai lama ditambah 3 |
| total <- total + nilai | menjumlahkan nilai ke total |

Pola \`x <- x + ...\` membuat kode lebih jelas membaca urutan pembaruan. Selalu tulis ulang nama variabel di ruas kanan saat memperbarui nilainya.`,
        codeExample: `# Penugasan biasa
x <- 10
tulis("x =", x)

# Memperbarui nilai
x <- x + 5
tulis("Setelah x <- x + 5:", x)

x <- x - 3
tulis("Setelah x <- x - 3:", x)

x <- x * 2
tulis("Setelah x <- x * 2:", x)

x <- x div 3
tulis("Setelah x <- x div 3:", x)

x <- x ** 2
tulis("Setelah x <- x ** 2:", x)

# Contoh penggunaan pada belanja
total <- 0
total <- total + 100  # Belanja 1
total <- total + 250  # Belanja 2
total <- total + 150  # Belanja 3
tulis("Total belanja:", total)`,
        output: `x = 10
Setelah x <- x + 5: 15
Setelah x <- x - 3: 12
Setelah x <- x * 2: 24
Setelah x <- x div 3: 8
Setelah x <- x ** 2: 64
Total belanja: 500`
      }
    ],
    summary: 'Operator aritmatika (+, -, *, /, div, mod, **), perbandingan (=, <>, <, >, <=, >=), logika (dan, atau, tidak), dan penugasan dengan <-.'
  },
  {
    id: 'input-output',
    number: 4,
    title: 'Input dan Output',
    description: 'Memahami cara menerima input dari pengguna dan menampilkan output.',
    difficulty: 'Beginner',
    estimatedMinutes: 10,
    icon: '⌨️',
    subTopics: [
      {
        id: 'fungsi-print-lanjutan',
        title: 'Fungsi tulis() Lanjutan',
        content: `Fungsi \`tulis()\` memiliki beberapa cara lanjutan untuk mengatur tampilan output:

- **sep** — teks pemisah antar nilai (nilai awal: satu spasi). Contoh: \`tulis("a", "b", sep="-")\` mencetak \`a-b\`.
- **Banyak argumen** — semua nilai dicetak dalam satu baris, dipisah pemisah yang ditentukan.

Setiap pemanggilan \`tulis()\` menutup output dengan baris baru. Untuk mencetak banyak nilai dalam satu baris, gabungkan semuanya dalam satu pemanggilan \`tulis()\`.

Parameter \`sep\` sangat berguna, misalnya untuk memformat tanggal dengan pemisah tanda \`-\`.`,
        codeExample: `# Parameter pemisah (sep)
tulis("A", "B", "C", sep=", ")
tulis("2024", "01", "15", sep="-")

# Beberapa tulis() menghasilkan masing-masing satu baris
tulis("Memuat")
tulis(".")
tulis(".")
tulis("Selesai!")

# Banyak argumen dalam satu baris
tulis("Hasil:", 100, 200, sep=" | ")`,
        output: `A, B, C
2024-01-15
Memuat
.
.
Selesai!
Hasil: | 100 | 200`
      },
      {
        id: 'fungsi-input',
        title: 'Membaca Input (baca)',
        content: `Fungsi \`baca()\` digunakan untuk menerima masukan dari pengguna melalui papan ketik.

**Cara menggunakan:**
nama <- baca()

Fungsi \`baca()\` membaca satu baris masukan lalu **selalu mengembalikan teks (string)**, meskipun pengguna mengetik angka. Jika ingin angka, hasilnya harus dikonversi terlebih dahulu memakai \`int()\` atau \`float()\`.

**Catatan:** pada penafsir otomatis (playground) tidak ada papan ketik yang aktif, sehingga \`baca()\` mengembalikan teks kosong (""). Karena itu contoh kode berikut tidak bergantung pada isi masukan — kita mensimulasikan nilai yang akan diketik pengguna.`,
        codeExample: `# Pada penafsir otomatis, baca() mengembalikan teks kosong,
# sehingga contoh berikut mensimulasikan alur pemakaiannya.

# nama <- baca()         # menerima ketikan pengguna
# umur <- int(baca())    # hasil dikonversi ke angka

# Simulasi nilai yang diketik pengguna
nama <- "Budi"
umur_teks <- "20"

# Konversi dari teks ke angka
umur <- int(umur_teks)

tulis("Nama:", nama)
tulis("Umur:", umur, "tahun")`,
        output: `Nama: Budi
Umur: 20 tahun`
      },
      {
        id: 'konversi-input',
        title: 'Konversi Tipe Input',
        content: `Karena \`baca()\` selalu menghasilkan teks, hasilnya perlu dikonversi sesuai kebutuhan:

- \`int(baca())\` — untuk bilangan bulat
- \`float(baca())\` — untuk bilangan desimal
- \`baca()\` langsung — untuk teks (nilai awal)

**Tips:** Pastikan isi masukan benar-benar berupa angka sebelum dikonversi, agar program tidak mengalami error.`,
        codeExample: `# Simulasi kalkulator sederhana
# Dalam program interaktif:
# a <- float(baca())
# b <- float(baca())

a <- 10
b <- 5
op <- "+"

hasil <- 0
jika op = "+" maka
  hasil <- a + b
akhirjika
jika op = "-" maka
  hasil <- a - b
akhirjika
jika op = "*" maka
  hasil <- a * b
akhirjika
jika op = "/" maka
  hasil <- a / b
akhirjika

tulis(a, op, b, "=", hasil)`,
        output: `10 + 5 = 15`
      },
      {
        id: 'format-output',
        title: 'Format Output',
        content: `Ada beberapa cara untuk menyusun (memformat) output agar mudah dibaca:

1. **Banyak argumen** — \`tulis("Nama:", nama)\` mencetak \`Nama: Andi\`, nilai dipisah satu spasi.
2. **Pemisah khusus** — \`tulis(nilai1, nilai2, sep=", ")\` memisah dengan tanda lain.
3. **Gabungan teks** — \`tulis("Halo " + nama)\` menyatukan teks dan nilai.
4. **Fungsi bantu** — \`bulat()\` untuk pembulatan, \`str()\` untuk mengubah angka menjadi teks.

Gunakan kombinasi argumen dan teks agar hasil tampilan rapi dan mudah dibaca.`,
        codeExample: `nama <- "Andi"
ipk <- 3.78

# Banyak argumen
tulis("Nama:", nama)
tulis("IPK:", ipk)

# Gabungan teks dan variabel
tulis("Mahasiswa " + nama + " memiliki IPK " + str(ipk))

# Pembulatan
tulis("Bulatkan 7.8:", bulat(7.8))

# Operasi langsung di dalam tulis
tulis("6 + 2 =", 6 + 2)
tulis("10 div 3 =", 10 div 3)`,
        output: `Nama: Andi
IPK: 3.78
Mahasiswa Andi memiliki IPK 3.78
Bulatkan 7.8: 8
6 + 2 = 8
10 div 3 = 3`
      }
    ],
    summary: 'baca() menerima masukan pengguna (selalu teks, perlu dikonversi). tulis() menampilkan output. Gunakan banyak argumen atau sep untuk format output yang rapi.'
  },
  {
    id: 'percabangan',
    number: 5,
    title: 'Percabangan',
    description: 'Memahami struktur percabangan untuk pengambilan keputusan dalam program.',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    icon: '🔀',
    subTopics: [
      {
        id: 'if-else',
        title: 'jika dan selainnya',
        content: `Percabangan \`jika\` digunakan untuk membuat keputusan dalam program. Program menjalankan blok kode yang berbeda tergantung kondisi.

**Sintaks:**

    jika kondisi maka
      # dijalankan jika kondisi benar
    selainnya
      # dijalankan jika kondisi salah
    akhirjika

**Penting:**
- Kondisi harus bernilai benar atau salah (boolean)
- Setiap \`jika\` ditutup dengan \`akhirjika\`
- Gunakan \`dan\`/\`atau\` untuk menggabungkan beberapa kondisi
- Bagian \`selainnya\` bersifat opsional (boleh tidak ditulis)`,
        codeExample: `nilai <- 80

jika nilai >= 70 maka
  tulis("Selamat, Anda LULUS!")
selainnya
  tulis("Anda TIDAK lulus. Tetap semangat!")
akhirjika

# Menggabungkan kondisi dengan dan
usia <- 25
ktp <- benar
jika usia >= 17 dan ktp maka
  tulis("Boleh membuat KTP")
akhirjika

# Percabangan berlapis (nested jika)
nilai <- 85
jika nilai >= 70 maka
  jika nilai >= 90 maka
    tulis("Predikat: Sangat Baik")
  selainnya
    jika nilai >= 80 maka
      tulis("Predikat: Baik")
    selainnya
      tulis("Predikat: Cukup")
    akhirjika
  akhirjika
selainnya
  tulis("Tidak Lulus")
akhirjika`,
        output: `Selamat, Anda LULUS!
Boleh membuat KTP
Predikat: Baik`
      },
      {
        id: 'elif',
        title: 'Percabangan Berlapis',
        content: `Untuk mengecek **lebih dari dua** kondisi secara berurutan, tidak tersedia kata kunci khusus untuk kondisi lanjutan. Solusinya adalah **menyusun beberapa \`jika\` berlapis** (nested jika).

Pola umum:

    jika kondisi1 maka
      # blok 1
    selainnya
      jika kondisi2 maka
        # blok 2
      selainnya
        # blok default
      akhirjika
    akhirjika

**Alur eksekusi:**
1. Cek kondisi1 → jika benar, jalankan blok 1
2. Jika salah, cek kondisi2 → jika benar, jalankan blok 2
3. Jika semua salah, jalankan blok \`selainnya\` terakhir

Hanya **satu** blok yang akan dieksekusi.`,
        codeExample: `# Predikat nilai mahasiswa
nilai <- 85

jika nilai >= 90 maka
  grade <- "A"
selainnya
  jika nilai >= 80 maka
    grade <- "B"
  selainnya
    jika nilai >= 70 maka
      grade <- "C"
    selainnya
      jika nilai >= 60 maka
        grade <- "D"
      selainnya
        grade <- "E"
      akhirjika
    akhirjika
  akhirjika
akhirjika

tulis("Nilai:", nilai)
tulis("Grade:", grade)

# Contoh lain: memilih operasi
a <- 10
b <- 3
op <- "-"

jika op = "+" maka
  hasil <- a + b
selainnya
  jika op = "-" maka
    hasil <- a - b
  selainnya
    jika op = "*" maka
      hasil <- a * b
    selainnya
      hasil <- "Operator tidak dikenal"
    akhirjika
  akhirjika
akhirjika

tulis(a, op, b, "=", hasil)`,
        output: `Nilai: 85
Grade: B
10 - 3 = 7`
      },
      {
        id: 'visualisasi-keputusan',
        title: 'Visualisasi Alur Keputusan',
        content: `Bayangkan alur percabangan seperti diagram alur (flowchart):

        [Kondisi]
       /         \\
    Benar        Salah
     |             |
  [Blok A]     [Blok B]

Untuk beberapa kondisi:

   [Kondisi 1] --Salah--> [Kondisi 2] --Salah--> [Blok Selainnya]
       |Benar                |Benar
    [Blok A]             [Blok B]

Program selalu memeriksa kondisi dari atas ke bawah dan menjalankan blok pertama yang kondisinya benar.`,
        codeExample: `# Simulasi keputusan cuaca
cuaca <- "hujan"

jika cuaca = "cerah" maka
  kegiatan <- "bersepeda"
selainnya
  jika cuaca = "mendung" maka
    kegiatan <- "berjalan kaki"
  selainnya
    jika cuaca = "hujan" maka
      kegiatan <- "di dalam ruangan"
    selainnya
      kegiatan <- "tidak ada"
    akhirjika
  akhirjika
akhirjika

tulis("Cuaca:", cuaca)
tulis("Kegiatan:", kegiatan)

# Keputusan belanja
harga <- 75000
saldo <- 100000

jika saldo >= harga maka
  sisa <- saldo - harga
  tulis("Berhasil! Sisa saldo: Rp" + str(sisa))
selainnya
  kekurangan <- harga - saldo
  tulis("Saldo tidak cukup! Kurang Rp" + str(kekurangan))
akhirjika`,
        output: `Cuaca: hujan
Kegiatan: di dalam ruangan
Berhasil! Sisa saldo: Rp25000`
      }
    ],
    summary: 'Percabangan jika-selainnya memungkinkan program membuat keputusan. Kondisi dievaluasi dari atas ke bawah. Untuk banyak kondisi, susun jika berlapis; hanya satu blok yang dieksekusi.'
  },
  {
    id: 'perulangan',
    number: 6,
    title: 'Perulangan',
    description: 'Memahami perulangan untuk mengulang eksekusi kode.',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    icon: '🔄',
    subTopics: [
      {
        id: 'for-loop',
        title: 'Perulangan untuk',
        content: `Perulangan \`untuk\` digunakan untuk mengulang blok kode sejumlah kali yang sudah diketahui.

**Sintaks:**
- \`untuk i <- mulai sampai akhir ... akhiruntuk\` — maju satu-satu.
- \`untuk i <- mulai sampai akhir langkah nilai ... akhiruntuk\` — maju dengan langkah tertentu.
- \`untuk i <- akhir menurun sampai mulai ... akhiruntuk\` — mundur dari besar ke kecil.

Setiap iterasi variabel \`i\` otomatis diperbarui sesuai langkah, dan bisa dipakai di dalam blok perulangan.

Contoh deret yang dihasilkan:
- \`untuk i <- 1 sampai 5\` → 1, 2, 3, 4, 5
- \`untuk i <- 1 sampai 9 langkah 2\` → 1, 3, 5, 7, 9
- \`untuk i <- 5 menurun sampai 1\` → 5, 4, 3, 2, 1`,
        codeExample: `# Deret 1-5
tulis("=== Angka 1-5 ===")
untuk i <- 1 sampai 5
  tulis(i)
akhiruntuk

# Deret dengan langkah
tulis("=== Angka ganjil 1-9 ===")
untuk i <- 1 sampai 9 langkah 2
  tulis(i)
akhiruntuk

# Deret menurun
tulis("=== Angka 5-1 ===")
untuk i <- 5 menurun sampai 1
  tulis(i)
akhiruntuk

# Iterasi array dengan untuk
tulis("=== Daftar buah ===")
buah <- ["apel", "mangga", "jeruk"]
untuk i <- 1 sampai panjang(buah)
  tulis("Saya suka " + buah[i])
akhiruntuk`,
        output: `=== Angka 1-5 ===
1
2
3
4
5
=== Angka ganjil 1-9 ===
1
3
5
7
9
=== Angka 5-1 ===
5
4
3
2
1
=== Daftar buah ===
Saya suka apel
Saya suka mangga
Saya suka jeruk`
      },
      {
        id: 'while-loop',
        title: 'Perulangan selama',
        content: `Perulangan \`selama\` mengulang eksekusi selama kondisinya masih benar.

**Sintaks:**

    selama kondisi
      # blok kode
      # pastikan kondisi diperbarui!
    akhirsementara

**Peringatan:** Jika kondisi selalu benar, terjadi **perulangan tak terhingga** (infinite loop). Selalu pastikan ada bagian yang memperbarui variabel kondisi.

**Kapan memakai untuk vs selama:**
- Pakai \`untuk\` jika jumlah perulangan sudah diketahui.
- Pakai \`selama\` jika perulangan bergantung pada kondisi.`,
        codeExample: `# Hitung mundur
tulis("=== Hitung mundur ===")
hitung <- 5
selama hitung > 0
  tulis(hitung)
  hitung <- hitung - 1
akhirsementara
tulis("Lepas landas!")

# Selama dengan kondisi pencarian
tulis("=== Mencari angka ===")
target <- 7
tebakan <- 1
selama tebakan < target
  tulis("Tebakan " + str(tebakan) + ": Terlalu kecil!")
  tebakan <- tebakan + 1
akhirsementara

tulis("Benar! Angka adalah " + str(target))
tulis("Percobaan:", tebakan - 1)`,
        output: `=== Hitung mundur ===
5
4
3
2
1
Lepas landas!
=== Mencari angka ===
Tebakan 1: Terlalu kecil!
Tebakan 2: Terlalu kecil!
Tebakan 3: Terlalu kecil!
Tebakan 4: Terlalu kecil!
Tebakan 5: Terlalu kecil!
Tebakan 6: Terlalu kecil!
Benar! Angka adalah 7
Percobaan: 6`
      },
      {
        id: 'break-continue',
        title: 'keluar dan lanjut',
        content: `Dua perintah penting dalam perulangan:

**keluar** — Menghentikan perulangan sepenuhnya. Ketika \`keluar\` dijalankan, perulangan langsung berhenti dan program melanjutkan ke baris setelah perulangan.

**lanjut** — Melewati iterasi saat ini. Ketika \`lanjut\` dijalankan, sisa blok kode pada iterasi itu dilewatkan dan langsung menuju iterasi berikutnya.

Gunakan \`keluar\` dan \`lanjut\` dengan hati-hati agar logika program tetap jelas.`,
        codeExample: `# keluar - berhenti saat ditemukan
tulis("=== Mencari angka 5 ===")
untuk i <- 1 sampai 10
  jika i = 5 maka
    tulis("Ditemukan angka " + str(i) + "! Berhenti.")
    keluar
  akhirjika
  tulis("Cek angka " + str(i) + "...")
akhiruntuk

# lanjut - lewati yang ganjil
tulis("=== Bilangan genap 1-10 ===")
untuk i <- 1 sampai 10
  jika i mod 2 <> 0 maka
    lanjut
  akhirjika
  tulis(i)
akhiruntuk

# keluar saat total melebihi batas
tulis("=== Proses hingga batas ===")
data <- [10, 25, 30, 5, 40, 15]
total <- 0
untuk i <- 1 sampai panjang(data)
  total <- total + data[i]
  jika total > 50 maka
    tulis("Total melebihi 50:", total)
    keluar
  akhirjika
  tulis("Tambah " + str(data[i]) + ", total: " + str(total))
akhiruntuk`,
        output: `=== Mencari angka 5 ===
Cek angka 1...
Cek angka 2...
Cek angka 3...
Cek angka 4...
Ditemukan angka 5! Berhenti.
=== Bilangan genap 1-10 ===
2
4
6
8
10
=== Proses hingga batas ===
Tambah 10, total: 10
Tambah 25, total: 35
Total melebihi 50: 65`
      }
    ],
    summary: 'untuk dipakai jika jumlah iterasi sudah diketahui, selama dipakai jika bergantung pada kondisi. keluar menghentikan perulangan, lanjut melewati iterasi saat ini. Hindari perulangan tak terhingga.'
  },
  {
    id: 'fungsi',
    number: 7,
    title: 'Fungsi',
    description: 'Memahami cara mendefinisikan dan memanggil fungsi.',
    difficulty: 'Beginner',
    estimatedMinutes: 12,
    icon: '⚡',
    subTopics: [
      {
        id: 'definisi-fungsi',
        title: 'Definisi Fungsi',
        content: `Fungsi adalah blok kode yang dapat digunakan berulang kali. Fungsi membantu mengorganisasi kode dan menghindari duplikasi.

**Sintaks:**

    fungsi nama_fungsi(parameter)
      # isi fungsi
      kembalikan nilai   # opsional
    akhirfungsi

**Karakteristik:**
1. Dimulai dengan kata kunci \`fungsi\`
2. Diikuti nama fungsi dan parameter di dalam kurung
3. Berisi blok kode yang diindentasi
4. Bisa mengembalikan nilai dengan \`kembalikan\`
5. Tanpa \`kembalikan\`, fungsi tidak menghasilkan nilai tertentu`,
        codeExample: `# Fungsi sederhana (tanpa parameter)
fungsi sapa()
  tulis("Halo! Selamat datang di aplikasi belajar!")
akhirfungsi

# Memanggil fungsi
sapa()
sapa()

# Fungsi dengan parameter
fungsi sapa_nama(nama)
  tulis("Halo, " + nama + "!")
akhirfungsi

sapa_nama("Budi")
sapa_nama("Siti")

# Fungsi dengan kembalikan
fungsi tambah(a, b)
  kembalikan a + b
akhirfungsi

hasil <- tambah(5, 3)
tulis("5 + 3 =", hasil)

# Fungsi dengan kondisi
fungsi status_ipk(ipk)
  jika ipk >= 3.5 maka
    kembalikan "Cum Laude"
  selainnya
    kembalikan "Reguler"
  akhirjika
akhirfungsi

status <- status_ipk(3.7)
tulis("Andi - IPK: 3.7 -", status)`,
        output: `Halo! Selamat datang di aplikasi belajar!
Halo! Selamat datang di aplikasi belajar!
Halo, Budi!
Halo, Siti!
5 + 3 = 8
Andi - IPK: 3.7 - Cum Laude`
      },
      {
        id: 'parameter-default',
        title: 'Parameter dan Nilai Default',
        content: `Fungsi bisa menerima parameter dengan beberapa aturan:

1. **Parameter wajib** — harus diisi nilainya saat fungsi dipanggil.
2. **Urutan argumen** — nilai dari pemanggilan mengikuti urutan parameter pada definisi.
3. **Nilai awal (default)** — beberapa bahasa mengizinkan parameter diberi nilai awal sehingga boleh tidak diisi saat pemanggilan.

Aturan utamanya: jumlah dan urutan argumen saat memanggil harus sesuai dengan definisi parameter fungsi.`,
        codeExample: `# Fungsi dengan parameter wajib
fungsi hitung_luas(panjang, lebar)
  kembalikan panjang * lebar
akhirfungsi

tulis("Luas 5x3:", hitung_luas(5, 3))
tulis("Luas 5x1:", hitung_luas(5, 1))

# Fungsi dengan banyak parameter
fungsi buat_profil(nama, umur, kota)
  tulis(nama + ", " + str(umur) + " tahun, " + kota)
akhirfungsi

buat_profil("Budi", 20, "Jakarta")
buat_profil("Siti", 21, "Bandung")

# Fungsi menjumlahkan seluruh isi array
fungsi jumlahkan(data)
  total <- 0
  untuk i <- 1 sampai panjang(data)
    total <- total + data[i]
  akhiruntuk
  kembalikan total
akhirfungsi

angka <- [1, 2, 3, 4, 5]
tulis("Jumlah:", jumlahkan(angka))`,
        output: `Luas 5x3: 15
Luas 5x1: 5
Budi, 20 tahun, Jakarta
Siti, 21 tahun, Bandung
Jumlah: 15`
      },
      {
        id: 'scope-fungsi',
        title: 'Lingkup Variabel (Scope)',
        content: `**Lingkup (scope)** adalah area di mana sebuah variabel bisa diakses.

1. **Lingkup lokal** — Variabel yang didefinisikan di dalam fungsi hanya bisa diakses di dalam fungsi itu saja.

2. **Lingkup global** — Variabel yang didefinisikan di luar fungsi bisa diakses di mana saja, termasuk di dalam fungsi.

**Tip:** Susun nama variabel dengan jelas agar kode mudah dipahami dan tidak bingung membedakan variabel lokal dan global.`,
        codeExample: `# Variabel lokal
fungsi fungsi_lokal()
  x <- 10
  tulis("Dalam fungsi: x =", x)
akhirfungsi

fungsi_lokal()
# x tidak dikenal di luar fungsi (akan error)

# Variabel global
nama <- "Global"

fungsi tampilkan_nama()
  tulis("Nama:", nama)
akhirfungsi

tampilkan_nama()

# Perbedaan variabel lokal dan global
nilai <- 100  # global

fungsi ubah_nilai()
  nilai_lokal <- 50  # variabel baru di dalam fungsi
  tulis("Dalam fungsi:", nilai_lokal)
akhirfungsi

ubah_nilai()
tulis("Di luar fungsi:", nilai)`,
        output: `Dalam fungsi: x = 10
Nama: Global
Dalam fungsi: 50
Di luar fungsi: 100`
      }
    ],
    summary: 'Fungsi didefinisikan dengan kata kunci fungsi, bisa memiliki parameter, nilai awal, dan mengembalikan nilai dengan kembalikan. Variabel lokal hanya bisa diakses di dalam fungsi.'
  },
  {
    id: 'list-dictionary',
    number: 8,
    title: 'Array (Larik)',
    description: 'Memahami struktur data array (larik) untuk menyimpan koleksi data.',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    icon: '📚',
    subTopics: [
      {
        id: 'list-dasar',
        title: 'Array Dasar',
        content: `Array (larik) adalah struktur data yang menyimpan **beberapa nilai** dalam satu variabel. Array bersifat **dapat diubah** (mutable), artinya isinya bisa diganti setelah dibuat.

**Karakteristik:**
- Ditulis dalam kurung siku \`[]\`
- Bisa menyimpan tipe data berbeda dalam satu array
- Berurutan (ordered)
- Boleh ada nilai yang sama (duplikat)
- **Indeks dimulai dari 1** — \`data[1]\` adalah elemen pertama
- \`panjang(data)\` menghitung jumlah elemen`,
        codeExample: `# Membuat array
buah <- ["apel", "mangga", "jeruk"]
angka <- [10, 20, 30, 40, 50]

# Akses elemen
tulis("Buah pertama:", buah[1])
tulis("Buah terakhir:", buah[3])

# Info panjang array
tulis("Jumlah buah:", panjang(buah))

# Ubah isi elemen
angka[2] <- 99
tulis("Elemen kedua sekarang:", angka[2])

# Looping array
tulis("Daftar buah:")
untuk i <- 1 sampai panjang(buah)
  tulis(buah[i])
akhiruntuk`,
        output: `Buah pertama: apel
Buah terakhir: jeruk
Jumlah buah: 3
Elemen kedua sekarang: 99
Daftar buah:
apel
mangga
jeruk`
      },
      {
        id: 'list-method',
        title: 'Operasi pada Array',
        content: `Beberapa operasi yang bisa dilakukan pada array:

| Operasi | Contoh |
|---------|--------|
| Baca elemen | data[posisi] |
| Ubah elemen | data[posisi] <- nilai_baru |
| Banyak elemen | panjang(data) |
| Jumlah seluruh nilai | sum(data) |
| Nilai terkecil/terbesar | min(data), max(data) |
| Pembulatan | bulat(x) |
| Akar kuadrat | akar(x) |
| Pangkat | pangkat(a, b) |

Iterasi atas seluruh elemen sering dilakukan dengan \`untuk\` menggunakan indeks 1 sampai \`panjang(array)\`.`,
        codeExample: `# Mengolah data array
angka <- [8, 3, 10, 6, 2]

tulis("Banyak elemen:", panjang(angka))
tulis("Jumlah total:", sum(angka))
tulis("Nilai terkecil:", min(angka))
tulis("Nilai terbesar:", max(angka))

# Ubah satu elemen
angka[2] <- 7
tulis("Elemen kedua sekarang:", angka[2])

# Rata-rata: 8 + 7 + 10 + 6 + 2 = 33, bagi 5 = 6.6 -> 6
rata_rata <- sum(angka) div panjang(angka)
tulis("Rata-rata (pembulatan bawah):", rata_rata)

# Fungsi matematika
tulis("Akar 16:", akar(16))
tulis("Bulatkan 3.6:", bulat(3.6))
tulis("2 pangkat 3:", pangkat(2, 3))`,
        output: `Banyak elemen: 5
Jumlah total: 29
Nilai terkecil: 2
Nilai terbesar: 10
Elemen kedua sekarang: 7
Rata-rata (pembulatan bawah): 6
Akar 16: 4
Bulatkan 3.6: 4
2 pangkat 3: 8`
      },
      {
        id: 'dictionary',
        title: 'Array Lanjutan (Nested Loop)',
        content: `Array juga bisa berisi array lain (array multidimensi), misalnya matriks atau tabel. Untuk membaca seluruh isinya digunakan **perulangan berlapis (nested loop)** — satu \`untuk\` di dalam \`untuk\` yang lain.

Contoh array 2 dimensi (matriks 2 baris x 3 kolom). Elemen pada baris \`i\`, kolom \`j\` diakses dengan \`matriks[i][j]\`.

Pola umum:

    untuk i <- 1 sampai jumlah_baris
      untuk j <- 1 sampai jumlah_kolom
        # proses matriks[i][j]
      akhiruntuk
    akhiruntuk

Nilai \`panjang(matriks)\` menghitung jumlah baris, sedangkan \`panjang(matriks[1])\` menghitung jumlah kolom pada baris pertama.`,
        codeExample: `# Matriks 2 baris x 3 kolom
matriks <- [[2, 4, 6], [1, 3, 5]]

# Jumlah baris dan kolom
tulis("Jumlah baris:", panjang(matriks))
tulis("Jumlah kolom:", panjang(matriks[1]))

# Membaca dengan perulangan berlapis
tulis("Isi matriks:")
untuk i <- 1 sampai panjang(matriks)
  untuk j <- 1 sampai panjang(matriks[i])
    tulis("Baris " + str(i) + " kolom " + str(j) + ":", matriks[i][j])
  akhiruntuk
akhiruntuk

# Menjumlahkan seluruh elemen dengan loop berlapis
total <- 0
untuk i <- 1 sampai panjang(matriks)
  untuk j <- 1 sampai panjang(matriks[i])
    total <- total + matriks[i][j]
  akhiruntuk
akhiruntuk
tulis("Jumlah seluruh elemen:", total)`,
        output: `Jumlah baris: 2
Jumlah kolom: 3
Isi matriks:
Baris 1 kolom 1: 2
Baris 1 kolom 2: 4
Baris 1 kolom 3: 6
Baris 2 kolom 1: 1
Baris 2 kolom 2: 3
Baris 2 kolom 3: 5
Jumlah seluruh elemen: 21`
      },
      {
        id: 'dictionary-method',
        title: 'Statistik dan Pencarian pada Array',
        content: `Array banyak dipakai untuk menghitung statistik sederhana dan mencari data.

Beberapa teknik yang umum:
- **Rata-rata** — jumlah seluruh nilai dibagi banyaknya nilai: \`sum(data) div panjang(data)\`.
- **Pencarian linier** — memeriksa setiap elemen dari indeks 1 sampai nilai yang dicari ditemukan.
- **Keluar lebih awal** — gunakan \`keluar\` begitu nilai ditemukan agar pencarian berhenti.

Contoh berikut mencari nilai tertentu lalu menghitung berapa banyak nilai di atas rata-rata.`,
        codeExample: `# Data nilai mahasiswa
nilai <- [80, 65, 90, 75, 88]

# Rata-rata seluruh nilai
rata <- sum(nilai) div panjang(nilai)
tulis("Rata-rata:", rata)

# Nilai tertinggi dan terendah
tulis("Tertinggi:", max(nilai))
tulis("Terendah:", min(nilai))

# Pencarian linier nilai 90
cari <- 90
ditemukan <- 0
untuk i <- 1 sampai panjang(nilai)
  jika nilai[i] = cari maka
    ditemukan <- i
    keluar
  akhirjika
akhiruntuk

jika ditemukan <> 0 maka
  tulis("Nilai " + str(cari) + " ditemukan di indeks " + str(ditemukan))
selainnya
  tulis("Nilai " + str(cari) + " tidak ditemukan")
akhirjika

# Menghitung nilai di atas rata-rata
di_atas <- 0
untuk i <- 1 sampai panjang(nilai)
  jika nilai[i] > rata maka
    di_atas <- di_atas + 1
  akhirjika
akhiruntuk
tulis("Jumlah nilai di atas rata-rata:", di_atas)`,
        output: `Rata-rata: 79
Tertinggi: 90
Terendah: 65
Nilai 90 ditemukan di indeks 3
Jumlah nilai di atas rata-rata: 3`
      }
    ],
    summary: 'Array menyimpan banyak nilai dalam satu variabel; indeks dimulai dari 1. Pakai untuk sampai/langkah, sum, min/max, akar, bulat, dan perulangan berlapis untuk mengolah data.'
  }
]