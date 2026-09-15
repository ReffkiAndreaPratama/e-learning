import type { Topic } from '../types'

export const materials: Topic[] = [
  {
    id: 'pengenalan-python',
    number: 1,
    title: 'Pengenalan Python',
    description: 'Memahami apa itu Python, karakteristik Python, dan struktur program sederhana.',
    difficulty: 'Beginner',
    estimatedMinutes: 10,
    icon: '🐍',
    subTopics: [
      {
        id: 'apa-itu-python',
        title: 'Apa itu Python?',
        content: `Python adalah bahasa pemrograman tingkat tinggi yang dirancang oleh Guido van Rossum pada tahun 1991. Python dikenal karena kesederhanaan sintaksnya sehingga mudah dipelajari, terutama bagi pemula.

Python banyak digunakan dalam:
- Pengembangan web (Django, Flask)
- Ilmu data dan machine learning (NumPy, Pandas, TensorFlow)
- Otomasi dan scripting
- Game development (Pygame)
- Internet of Things (IoT)

Python menggunakan pendekatan interpretasi, artinya kode dieksekusi baris per baris tanpa perlu dikompilasi terlebih dahulu.`,
        codeExample: `# Program pertama Python
print("Hello World!")
print("Selamat datang di PyLearn AI!")
print("Mari belajar Python bersama.")`,
        output: `Hello World!
Selamat datang di PyLearn AI!
Mari belajar Python bersama.`
      },
      {
        id: 'karakteristik-python',
        title: 'Karakteristik Python',
        content: `Python memiliki beberapa karakteristik unggul:

1. **Sederhana** - Sintaks Python mirip dengan bahasa Inggris sehingga mudah dibaca dan ditulis.

2. **Interpretasi** - Kode Python dieksekusi langsung tanpa kompilasi, memudahkan debugging.

3. **Dinamis** - Tipe data ditentukan secara otomatis saat runtime, tidak perlu deklarasi tipe.

4. **Multi-paradigma** - Mendukung OOP, procedural, dan functional programming.

5. **Open Source** - Python gratis dan memiliki komunitas besar di seluruh dunia.

6. **Portable** - Kode Python bisa dijalankan di berbagai platform (Windows, Linux, macOS) tanpa perubahan.`,
        codeExample: `# Python bersifat dinamis
nama = "Budi"      # string
umur = 20           # integer
tinggi = 170.5      # float
mahasiswa = True    # boolean

# Tipe data berubah otomatis
x = 10
print(type(x))     # <class 'int'>
x = "sekarang string"
print(type(x))     # <class 'str'>`,
        output: `<class 'int'>
<class 'str'>`
      },
      {
        id: 'struktur-program',
        title: 'Struktur Program Python',
        content: `Program Python tersusun dari baris-baris kode yang dieksekusi dari atas ke bawah. Python menggunakan indentasi (spasi) untuk menandai blok kode, bukan kurung seperti bahasa lain.

Struktur dasar program Python:

1. **Komentar** - Catatan yang tidak dieksekusi
2. **Statement** - Pernyataan/perintah yang dieksekusi
3. **Indentasi** - Penanda blok kode (4 spasi standar)

Komentar ditulis dengan tanda \`#\` di awal baris. Komentar hanya untuk pembaca manusia dan dilewat oleh interpreter.`,
        codeExample: `# Ini komentar - tidak dieksekusi

# Program menghitung luas persegi panjang
panjang = 10
lebar = 5

# Rumus luas
luas = panjang * lebar

print("Panjang:", panjang)
print("Lebar:", lebar)
print("Luas:", luas)`,
        output: `Panjang: 10
Lebar: 5
Luas: 50`
      },
      {
        id: 'fungsi-print',
        title: 'Fungsi print()',
        content: `Fungsi \`print()\` digunakan untuk menampilkan output ke layar. Ini adalah fungsi pertama yang harus dikuasai.

Beberapa cara menggunakan print():

1. **Teks biasa** - \`print("Hello")\`
2. **Variabel** - \`print(nama)\`
3. **Gabungan** - \`print("Nama:", nama)\`
4. **F-string** - \`print(f"Halo {nama}")\` (Python 3.6+)
5. **Parameter end** - Mengganti akhiran baris (default \`\\n\`)
6. **Parameter sep** - Mengganti pemisah (default spasi)`,
        codeExample: `# Teks biasa
print("Hello World!")

# Print dengan variabel
nama = "Andi"
umur = 19
print("Nama:", nama)
print("Umur:", umur)

# F-string (cara modern)
print(f"Nama saya {nama}, umur {umur} tahun")

# Parameter end dan sep
print("A", "B", "C", sep="-")
print("Tanpa", "ganti", "baris", end="...")`,
        output: `Hello World!
Nama: Andi
Umur: 19
Nama saya Andi, umur 19 tahun
A-B-C
Tanpa ganti baris...`
      }
    ],
    summary: 'Python adalah bahasa pemrograman sederhana, interpretasi, dan dinamis. Gunakan print() untuk menampilkan output. Python menggunakan indentasi untuk struktur kode.'
  },
  {
    id: 'variabel-tipe-data',
    number: 2,
    title: 'Variabel dan Tipe Data',
    description: 'Memahami cara mendeklarasikan variabel dan berbagai tipe data dasar di Python.',
    difficulty: 'Beginner',
    estimatedMinutes: 12,
    icon: '📦',
    subTopics: [
      {
        id: 'pengertian-variabel',
        title: 'Pengertian Variabel',
        content: `Variabel adalah nama yang digunakan untuk menyimpan data di dalam memori komputer. Di Python, Anda tidak perlu mendeklarasikan tipe data secara eksplisit — cukup beri nama dan masukkan nilainya.

Aturan penamaan variabel di Python:
1. Harus dimulai dengan huruf atau underscore (_)
2. Bisa mengandung huruf, angka, dan underscore
3. **Tidak boleh** menggunakan spasi atau karakter khusus
4. **Case-sensitive** — \`nama\` dan \`Nama\` adalah variabel berbeda
5. Tidak boleh menggunakan keyword Python (if, for, while, dll.)`,
        codeExample: `# Pendeklarasian variabel
nama = "Siti"
nim = "12345678"
ipk = 3.75
aktif = True

# Penamaan yang benar
nama_mahasiswa = "Budi"
_nilai = 90
angkatan2024 = 2024

# Penamaan yang SALAH
# 2angkatan = 2024  # Error! diawali angka
# nama siswa = "A"  # Error! ada spasi
# for = 5           # Error! keyword Python

print("Nama:", nama)
print("NIM:", nim)
print("IPK:", ipk)
print("Aktif:", aktif)`,
        output: `Nama: Siti
NIM: 12345678
IPK: 3.75
Aktif: True`
      },
      {
        id: 'tipe-data',
        title: 'Tipe Data Dasar',
        content: `Python memiliki beberapa tipe data dasar:

1. **int** (Integer) — Bilangan bulat, tanpa desimal
   Contoh: 10, -5, 0, 1000

2. **float** (Floating Point) — Bilangan desimal
   Contoh: 3.14, -0.5, 100.0

3. **str** (String) — Teks, ditulis dalam tanda kutip
   Contoh: "Hello", 'Python', """Multi-line"""

4. **bool** (Boolean) — Nilai benar atau salah
   Contoh: True, False

5. **None** — Tidak ada nilai
   Contoh: None

Anda bisa mengecek tipe data dengan fungsi \`type()\`.`,
        codeExample: `# Integer
umur = 20
jumlah_mahasiswa = 100
print("Umur:", umur, "-> Tipe:", type(umur))

# Float
ipk = 3.75
tinggi = 170.5
print("IPK:", ipk, "-> Tipe:", type(ipk))

# String
nama = "Budi"
alamat = 'Jl. Merdeka No. 10'
print("Nama:", nama, "-> Tipe:", type(nama))

# Boolean
aktif = True
lulus = False
print("Aktif:", aktif, "-> Tipe:", type(aktif))

# None
nilai = None
print("Nilai:", nilai, "-> Tipe:", type(nilai))`,
        output: `Umur: 20 -> Tipe: <class 'int'>
IPK: 3.75 -> Tipe: <class 'float'>
Nama: Budi -> Tipe: <class 'str'>
Aktif: True -> Tipe: <class 'bool'>
Nilai: None -> Tipe: <class 'NoneType'>`
      },
      {
        id: 'konversi-tipe',
        title: 'Konversi Tipe Data',
        content: `Terkkadang kita perlu mengubah tipe data dari satu ke tipe lain. Proses ini disebut **type casting** atau **type conversion**.

Fungsi konversi:
- \`int()\` — ke integer
- \`float()\` — ke float
- \`str()\` — ke string
- \`bool()\` — ke boolean

**Perhatikan:** Tidak semua konversi berhasil. Misalnya, \`int("abc")\` akan menghasilkan error.

Konversi boolean:
- \`0\`, \`0.0\`, \`""\`, \`None\` → False
- Selain itu → True`,
        codeExample: `# String ke Integer
nilai_str = "85"
nilai_int = int(nilai_str)
print("Tipe awal:", type(nilai_str))
print("Tipe akhir:", type(nilai_int))
print("Nilai:", nilai_int)

# Integer ke Float
angka = 10
desimal = float(angka)
print(f"{angka} -> {desimal}")

# Angka ke String
harga = 50000
harga_str = str(harga)
print(f"Harga: Rp{harga_str}")

# Konversi ke Boolean
print(f"bool(0) = {bool(0)}")
print(f"bool(1) = {bool(1)}")
print(f"bool('') = {bool('')}")
print(f"bool('halo') = {bool('halo')}")`,
        output: `Tipe awal: <class 'str'>
Tipe akhir: <class 'int'>
Nilai: 85
10 -> 10.0
Harga: Rp50000
bool(0) = False
bool(1) = True
bool('') = False
bool('halo') = True`
      },
      {
        id: 'operasi-string',
        title: 'Operasi pada String',
        content: `String di Python sangat fleksibel. Beberapa operasi yang bisa dilakukan:

1. **Konkatenasi** — Menggabungkan string dengan \`+\`
2. **Pengulangan** — Mengulang string dengan \`*\`
3. **Indexing** — Mengakses karakter tertentu dengan \`[index]\`
4. **Slicing** — Mengambil substr \`[awal:akhir]\`
5. **Method** — Fungsi bawaan seperti \`.upper()\`, \`.lower()\`, \`.strip()\`

Index di Python dimulai dari 0. Index negatif dimult dari belakang.`,
        codeExample: `# Konkatenasi
depan = "Hello"
belakang = "World"
gabungan = depan + " " + belakang
print(gabungan)

# Pengulangan
print("=" * 30)
print("Ha" * 3)

# Indexing
kata = "Python"
print(f"Karakter pertama: {kata[0]}")
print(f"Karakter terakhir: {kata[-1]}")

# Slicing
print(f"3 karakter pertama: {kata[:3]}")
print(f"Sejak index 2: {kata[2:]}")

# Method string
teks = "  Halo Dunia  "
print(teks.strip())       # Hilangkan spasi
print(teks.upper())       # Huruf besar
print(teks.lower())       # Huruf kecil
print(teks.replace("Dunia", "Python"))`,
        output: `Hello World
==============================
HaHaHa
Karakter pertama: P
Karakter terakhir: n
3 karakter pertama: Pyt
Sejak index 2: thon
Halo Dunia
  HALO DUNIA  
  halo dunia  
  Halo Python  `
      }
    ],
    summary: 'Variabel menyimpan data dengan nama tertentu. Tipe dasar: int, float, str, bool, None. Gunakan type() untuk mengecek tipe dan fungsi casting untuk konversi.'
  },
  {
    id: 'operator',
    number: 3,
    title: 'Operator',
    description: 'Memahami berbagai jenis operator dalam Python: aritmatika, perbandingan, logika, dan assignment.',
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
| / | Pembagian | 10 / 3 | 3.333 |
| // | Floor division | 10 // 3 | 3 |
| % | Modulus (sisa bagi) | 10 % 3 | 1 |
| ** | Eksponen (pangkat) | 2 ** 3 | 8 |

Catatan: \`/\` selalu menghasilkan float, sedangkan \`//\` menghasilkan integer (dibulatkan ke bawah).`,
        codeExample: `a = 15
b = 4

print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} * {b} = {a * b}")
print(f"{a} / {b} = {a / b}")
print(f"{a} // {b} = {a // b}")
print(f"{a} % {b} = {a % b}")
print(f"{a} ** {b} = {a ** b}")`,
        output: `15 + 4 = 19
15 - 4 = 11
15 * 4 = 60
15 / 4 = 3.75
15 // 4 = 3
15 % 4 = 3
15 ** 4 = 50625`
      },
      {
        id: 'operator-perbandingan',
        title: 'Operator Perbandingan',
        content: `Operator perbandingan menghasilkan nilai boolean (True/False).

| Operator | Keterangan | Contoh | Hasil |
|----------|-----------|---------|-------|
| == | Sama dengan | 5 == 5 | True |
| != | Tidak sama dengan | 5 != 3 | True |
| > | Lebih besar dari | 5 > 3 | True |
| < | Lebih kecil dari | 5 < 3 | False |
| >= | Lebih besar atau sama | 5 >= 5 | True |
| <= | Lebih kecil atau sama | 3 <= 5 | True |

**Perhatikan:** \`==\` untuk membandingkan, \`=\` untuk menugaskan nilai.`,
        codeExample: `x = 10
y = 5

print(f"{x} == {y}: {x == y}")
print(f"{x} != {y}: {x != y}")
print(f"{x} > {y}: {x > y}")
print(f"{x} < {y}: {x < y}")
print(f"{x} >= {x}: {x >= x}")
print(f"{x} <= {y}: {x <= y}")

# Perbandingan string
print(f'"abc" == "abc": {"abc" == "abc"}')
print(f'"abc" == "Abc": {"abc" == "Abc"}')`,
        output: `10 == 5: False
10 != 5: True
10 > 5: True
10 < 5: False
10 >= 10: True
10 <= 5: False
"abc" == "abc": True
"abc" == "Abc": False`
      },
      {
        id: 'operator-logika',
        title: 'Operator Logika',
        content: `Operator logika digunakan untuk menggabungkan beberapa kondisi boolean.

| Operator | Keterangan | Contoh |
|----------|-----------|---------|
| and | Benar jika KEDUA benar | True and False → False |
| or | Benar jika SALAH SATU benar | True or False → True |
| not | Membalik nilai | not True → False |

**Tabel Kebenaran for:**
- True and True = True
- True and False = False
- False and False = False

- True or True = True
- True or False = True
- False or False = False

- not True = False
- not False = True`,
        codeExample: `usia = 25
penghasilan = 5000000

# Operator AND
kredit_diterima = usia >= 21 and penghasilan >= 3000000
print(f"Kredit diterima: {kredit_diterima}")

# Operator OR
diskon = usia <= 12 or usia >= 60
print(f"Dapat diskon: {diskon}")

# Operator NOT
is_admin = False
is_not_admin = not is_admin
print(f"Bukan admin: {is_not_admin}")

# Gabungan
lulus = True
bayar = False
bisa_wisuda = lulus and bayar
print(f"Bisa wisuda: {bisa_wisuda}")

cetak = not bayar
print(f"Langsung cetak: {cetak}")`,
        output: `Kredit diterima: True
Dapat diskon: False
Bukan admin: True
Bisa wisuda: False
Langsung cetak: True`
      },
      {
        id: 'operator-assignment',
        title: 'Operator Assignment',
        content: `Operator assignment digunakan untuk menugaskan atau memperbarui nilai variabel.

| Operator | Contoh | Sama dengan |
|----------|--------|-------------|
| = | x = 5 | x = 5 |
| += | x += 3 | x = x + 3 |
| -= | x -= 2 | x = x - 2 |
| *= | x *= 4 | x = x * 4 |
| /= | x /= 2 | x = x / 2 |
| //= | x //= 3 | x = x // 3 |
| %= | x %= 2 | x = x % 2 |
| **= | x **= 3 | x = x ** 3 |

Operator augmented assignment (+=, -=, dll) membuat kode lebih ringkas.`,
        codeExample: `# Assignment biasa
x = 10
print(f"x = {x}")

# Augmented assignment
x += 5
print(f"x += 5 -> x = {x}")

x -= 3
print(f"x -= 3 -> x = {x}")

x *= 2
print(f"x *= 2 -> x = {x}")

x //= 3
print(f"x //= 3 -> x = {x}")

x **= 2
print(f"x **= 2 -> x = {x}")

# Contoh penggunaan
total = 0
total += 100  # Belanja 1
total += 250  # Belanja 2
total += 150  # Belanja 3
print(f"Total belanja: {total}")`,
        output: `x = 10
x += 5 -> x = 15
x -= 3 -> x = 12
x *= 2 -> x = 24
x //= 3 -> x = 8
x **= 2 -> x = 64
Total belanja: 500`
      }
    ],
    summary: 'Python memiliki operator aritmatika (+, -, *, /, //, %, **), perbandingan (==, !=, >, <, >=, <=), logika (and, or, not), dan assignment (+=, -=, dll).'
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
        title: 'Fungsi print() Lanjutan',
        content: `Fungsi \`print()\` memiliki beberapa parameter opsional:

- **sep** — Pemisah antar nilai (default: " ")
- **end** — Karakter di akhir output (default: "\\n")
- **file** — Tempat output ditampilkan (default: sys.stdout)

Parameter \`end\` sangat berguna jika kita ingin mencetak beberapa nilai dalam satu baris, atau mencetak tanpa ganti baris.`,
        codeExample: `# Parameter sep
print("A", "B", "C", sep=", ")
print("2024", "01", "15", sep="-")

# Parameter end
print("Memuat", end=" ")
print(".", end=" ")
print(".", end=" ")
print("Selesai!")

# Gabungan
print("Hasil:", 100, 200, sep=" | ", end=" [OK]\\n")

# Output ke file (konsep)
# with open("output.txt", "w") as f:
#     print("Hello File", file=f)`,
        output: `A, B, C
2024-01-15
Memuat . . Selesai!
Hasil: 100 | 200 [OK]`
      },
      {
        id: 'fungsi-input',
        title: 'Fungsi input()',
        content: `Fungsi \`input()\` digunakan untuk menerima masukan dari pengguna melalui keyboard.

**Cara menggunakan:**
\`\`\`python
nama = input("Masukkan nama: ")
\`\`\`

Teks dalam kurung adalah **prompt** yang ditampilkan ke pengguna.

**Perhatikan:** \`input()\` SELALU mengembalikan tipe **string**, meskipun pengguna memasukkan angka. Jika ingin angka, harus dikonversi manual.`,
        codeExample: `# Konsep input() - tidak bisa dijalankan di playground
# karena memerlukan input dari keyboard

# Contoh penggunaan:
# nama = input("Masukkan nama: ")
# umur = int(input("Masukkan umur: "))

# Simulasi dengan nilai tetap
nama = "Budi"
umur_str = "20"

# Konversi tipe
umur = int(umur_str)

print(f"Nama: {nama}")
print(f"Umur: {umur} tahun")
print(f"Tipe umur: {type(umur)}")`,
        output: `Nama: Budi
Umur: 20 tahun
Tipe umur: <class 'int'>`
      },
      {
        id: 'konversi-input',
        title: 'Konversi Tipe Input',
        content: `Karena \`input()\` selalu menghasilkan string, kita perlu mengkonversinya:

- \`int(input())\` — untuk bilangan bulat
- \`float(input())\` — untuk bilangan desimal
- \`str(input())\` — untuk teks (default)

**Tips:** Selalu gunakan try-except untuk menangani input yang tidak valid, agar program tidak crash.`,
        codeExample: `# Contoh program kalkulator sederhana
# (Simulasi dengan nilai tetap)

# Dalam program nyata:
# a = float(input("Masukkan angka pertama: "))
# operator = input("Masukkan operator (+,-,*,/): ")
# b = float(input("Masukkan angka kedua: "))

a = 10
b = 3
op = "+"

if op == "+":
    hasil = a + b
elif op == "-":
    hasil = a - b
elif op == "*":
    hasil = a * b
elif op == "/":
    if b != 0:
        hasil = a / b
    else:
        hasil = "Error: Bagi dengan 0"
else:
    hasil = "Operator tidak valid"

print(f"{a} {op} {b} = {hasil}")`,
        output: `10 + 3 = 13`
      },
      {
        id: 'format-output',
        title: 'Format Output',
        content: `Python menyediakan beberapa cara untuk memformat output:

1. **f-string** (Python 3.6+) — Cara terbaik dan paling modern
   \`f"Nilai: {variabel}"\`

2. **str.format()** — Cara lama tapi masih dipakai
   \`"Nilai: {}".format(variabel)\`

3. **% formatting** — Cara paling tua
   \`"Nilai: %s" % variabel\`

F-string paling direkomendasikan karena paling mudah dibaca dan ditulis. Anda bisa memasukkan ekspresi langsung di dalam kurung kurawal.`,
        codeExample: `nama = "Andi"
ipk = 3.78
semester = 4

# F-string (recommended)
print(f"Nama: {nama}")
print(f"IPK: {ipk:.2f}")  # 2 angka desimal
print(f" semester {semester}")

# Format angka
harga = 1500000
print(f"Harga: Rp{harga:,}".replace(",", "."))

# Format persentase
skor = 0.856
print(f"Skor: {skor:.1%}")

# Ekspresi dalam f-string
print(f"IPK >= 3.5? {ipk >= 3.5}")`,
        output: `Nama: Andi
IPK: 3.78
 semester 4
Harga: Rp1.500.000
Skor: 85.6%
IPK >= 3.5? True`
      }
    ],
    summary: 'input() menerima masukan pengguna (selalu string, perlu dikonversi). print() menampilkan output. Gunakan f-string untuk format output yang mudah dibaca.'
  },
  {
    id: 'percabangan',
    number: 5,
    title: 'Percabangan',
    description: 'Memahami struktur percabangan if, elif, dan else untuk pengambilan keputusan.',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    icon: '🔀',
    subTopics: [
      {
        id: 'if-else',
        title: 'if dan else',
        content: `Percabangan \`if-else\` digunakan untuk membuat keputusan dalam program. Program akan menjalankan blok kode yang berbeda tergantung kondisi.

**Sintaks:**
\`\`\`python
if kondisi:
    # dijalankan jika kondisi True
else:
    # dijalankan jika kondisi False
\`\`\`

**Penting:**
- Kondisi harus bernilai True atau False
- Gunakan \`:\` di akhir baris if/elif/else
- Indentasi 4 spasi untuk blok kode
- Bisa pakai \`and\`/\`or\` untuk multiple conditions`,
        codeExample: `nilai = 80

if nilai >= 70:
    print("Selamat, Anda LULUS!")
else:
    print("Anda TIDAK lulus. Tetap semangat!")

# With and/or
usia = 25
ktp = True

if usia >= 17 and ktp:
    print("Boleh membuat KTP")

# Nested if
nilai = 85
if nilai >= 70:
    if nilai >= 90:
        print("Predikat: Sangat Baik")
    elif nilai >= 80:
        print("Predikat: Baik")
    else:
        print("Predikat: Cukup")
else:
    print("Tidak Lulus")`,
        output: `Selamat, Anda LULUS!
Boleh membuat KTP
Predikat: Baik`
      },
      {
        id: 'elif',
        title: 'elif (Else If)',
        content: `Digunakan untuk mengecek **lebih dari dua** kondisi secara berurutan.

**Sintaks:**
\`\`\`python
if kondisi1:
    # blok 1
elif kondisi2:
    # blok 2
elif kondisi3:
    # blok 3
else:
    # blok default
\`\`\`

**Alur eksekusi:**
1. Cek kondisi1 → jika True, jalankan blok 1
2. Jika False, cek kondisi2 → jika True, jalankan blok 2
3. Jika False, cek kondisi3 → dst.
4. Jika semua False, jalankan else

Hanya **satu** blok yang akan dieksekusi.`,
        codeExample: `# Program grade mahasiswa
nilai = 85

if nilai >= 90:
    grade = "A"
elif nilai >= 80:
    grade = "B"
elif nilai >= 70:
    grade = "C"
elif nilai >= 60:
    grade = "D"
else:
    grade = "E"

print(f"Nilai: {nilai}")
print(f"Grade: {grade}")

# Contoh lain: Kalkulator sederhana
a = 10
b = 3
op = "-"

if op == "+":
    hasil = a + b
elif op == "-":
    hasil = a - b
elif op == "*":
    hasil = a * b
elif op == "/":
    hasil = a / b
else:
    hasil = "Operator tidak dikenal"

print(f"{a} {op} {b} = {hasil}")`,
        output: `Nilai: 85
Grade: B
10 - 3 = 7`
      },
      {
        id: 'visualisasi-keputusan',
        title: 'Visualisasi Alur Keputusan',
        content: `Bayangkan alur percabangan seperti diagram alur (flowchart):

\`\`\`
        [Kondisi]
       /         \\
    True         False
     |             |
  [Blok A]     [Blok B]
\`\`\`

Untuk if-elif-else:

\`\`\`
   [Kondisi 1] ──False──→ [Kondisi 2] ──False──→ [Blok Else]
       │True                    │True
    [Blok A]                [Blok B]
\`\`\`

Program selalu mengecek kondisi dari atas ke bawah dan menjalankan blok pertama yang kondisinya True.`,
        codeExample: `# Simulasi keputusan cuaca
cuaca = "hujan"

if cuaca == "cerah":
    kegiatan = "bersepeda"
elif cuaca == "mendung":
    kegiatan = "berjalan kaki"
elif cuaca == "hujan":
    kegiatan = "di dalam ruangan"
else:
    kegiatan = "tidak ada"

print(f"Cuaca: {cuaca}")
print(f"Kegiatan: {kegiatan}")

# Keputusan belanja
harga = 75000
saldo = 100000

if saldo >= harga:
    sisa = saldo - harga
    print(f"Berhasil! Sisa saldo: Rp{sisa}")
else:
    kekurangan = harga - saldo
    print(f"Saldo tidak cukup! Kurang Rp{kekurangan}")`,
        output: `Cuaca: hujan
Kegiatan: di dalam ruangan
Berhasil! Sisa saldo: Rp25000`
      }
    ],
    summary: 'Percabangan if-elif-else memungkinkan program membuat keputusan. Kondisi dievaluasi dari atas ke bawah, dan hanya satu blok yang dieksekusi.'
  },
  {
    id: 'perulangan',
    number: 6,
    title: 'Perulangan',
    description: 'Memahami perulangan for dan while untuk mengulang eksekusi kode.',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    icon: '🔄',
    subTopics: [
      {
        id: 'for-loop',
        title: 'Perulangan for',
        content: `Perulangan \`for\` digunakan untuk iterasi atas sequence (range, list, string, dll).

**Sintaks:**
\`\`\`python
for variabel in range(start, stop, step):
    # blok kode
\`\`\`

**range()** menghasilkan deret angka:
- \`range(5)\` → 0, 1, 2, 3, 4
- \`range(1, 6)\` → 1, 2, 3, 4, 5
- \`range(0, 10, 2)\` → 0, 2, 4, 6, 8

for juga bisa iterasi atas list, string, dan dictionary.`,
        codeExample: `# Range sederhana
print("=== Angka 0-4 ===")
for i in range(5):
    print(f"Ke-{i}")

# Range dengan start dan stop
print("\\n=== Angka 1-5 ===")
for i in range(1, 6):
    print(i)

# Range dengan step
print("\\n=== Angka genap 0-8 ===")
for i in range(0, 9, 2):
    print(i)

# Iterasi string
print("\\n=== Huruf dalam Python ===")
for huruf in "Python":
    print(huruf)

# Iterasi list
print("\\n=== Daftar buah ===")
buah = ["apel", "mangga", "jeruk"]
for b in buah:
    print(f"Saya suka {b}")`,
        output: `=== Angka 0-4 ===
Ke-0
Ke-1
Ke-2
Ke-3
Ke-4

=== Angka 1-5 ===
1
2
3
4
5

=== Angka genap 0-8 ===
0
2
4
6
8

=== Huruf dalam Python ===
P
y
t
h
o
n

=== Daftar buah ===
Saya suka apel
Saya suka mangga
Saya suka jeruk`
      },
      {
        id: 'while-loop',
        title: 'Perulangan while',
        content: `Perulangan \`while\` mengulang selama kondisi masih True.

**Sintaks:**
\`\`\`python
while kondisi:
    # blok kode
    # jangan lupa update kondisi!
\`\`\`

**Peringatan:** Jika kondisi selalu True, akan terjadi **infinite loop** (perulangan tak terhingga). Selalu pastikan ada cara untuk menghentikan loop.

**Kapan pakai for vs while:**
- Pakai \`for\` jika sudah tahu jumlah iterasi
- Pakai \`while\` jika iterasi bergantung pada kondisi`,
        codeExample: `# While sederhana
print("=== Hitung mundur ===")
hitung = 5
while hitung > 0:
    print(hitung)
    hitung -= 1
print("Lepas landas! 🚀")

# While dengan kondisi
print("\\n=== Tebak angka ===")
target = 7
tebakan = 1

while tebakan != target:
    # Simulasi: langsung benar di percobaan ke-3
    if tebakan < target:
        print(f"Tebakan {tebakan}: Terlalu kecil!")
    tebakan += 1

print(f"Benar! Angka adalah {target}")
print(f"Percobaan: {tebakan - 1}")`,
        output: `=== Hitung mundur ===
5
4
3
2
1
Lepas landas! 🚀

=== Tebak angka ===
Tebakan 1: Terlalu kecil!
Tebakan 2: Terlalu kecil!
Tebakan 3: Terlalu kecil!
Tebakan 4: Terlalu kecil!
Tebakan 5: Terlalu kecil!
Tebakan 6: Terlalu kecil!
Benar! Angka adalah 7
Percobaan: 7`
      },
      {
        id: 'break-continue',
        title: 'break dan continue',
        content: `Dua kata kunci penting dalam perulangan:

**break** — Menghentikan perulangan sepenuhnya
Ketika \`break\` dijalankan, perulangan langsung berhenti dan program melanjutkan ke baris setelah perulangan.

**continue** — Melewati iterasi saat ini
Ketika \`continue\` dijalankan, sisa blok kode dalam iterasi itu dilewatkan dan langsung ke iterasi berikutnya.

Gunakan \`break\` dan \`continue\` dengan hati-hati agar logika program tetap jelas.`,
        codeExample: `# break - Hentikan saat ditemukan
print("=== Mencari angka 5 ===")
for i in range(1, 11):
    if i == 5:
        print(f"Ditemukan angka {i}! Berhenti.")
        break
    print(f"Cek angka {i}...")

# continue - Lewati yang ganjil
print("\\n=== Bilangan genap 1-10 ===")
for i in range(1, 11):
    if i % 2 != 0:  # Ganjil
        continue
    print(i)

# break dengan while
print("\\n=== Proses hingga batas ===")
data = [10, 25, 30, 5, 40, 15]
total = 0
for val in data:
    total += val
    if total > 50:
        print(f"Total melebihi 50: {total}")
        break
    print(f"Tambah {val}, total: {total}")`,
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
Tambah 30, total: 65
Total melebihi 50: 65`
      }
    ],
    summary: 'for digunakan untuk iterasi pada range/list, while untuk kondisi. break menghentikan loop, continue melewati iterasi saat ini. Selalu hindari infinite loop.'
  },
  {
    id: 'fungsi',
    number: 7,
    title: 'Fungsi',
    description: 'Memahami cara mendefinisikan dan memanggil fungsi di Python.',
    difficulty: 'Beginner',
    estimatedMinutes: 12,
    icon: '⚡',
    subTopics: [
      {
        id: 'definisi-fungsi',
        title: 'Definisi Fungsi',
        content: `Fungsi adalah blok kode yang dapat digunakan berulang kali. Fungsi membantu mengorganisasi kode dan menghindari duplikasi.

**Sintaks:**
\`\`\`python
def nama_fungsi(parameter):
    # isi fungsi
    return nilai  # opsional
\`\`\`

**Karakteristik:**
1. Dimulai dengan kata kunci \`def\`
2. Diikuti nama fungsi dan parameter dalam kurung
3. Diakhiri \`:\` dan blok kode terindentasi
4. Bisa mengembalikan nilai dengan \`return\`
5. Tanpa \`return\`, fungsi mengembalikan \`None\``,
        codeExample: `# Fungsi sederhana
def sapa():
    print("Halo! Selamat datang di PyLearn AI!")

# Memanggil fungsi
sapa()
sapa()  # Bisa dipanggil berulang kali

# Fungsi dengan parameter
def sapa_nama(nama):
    print(f"Halo, {nama}!")

sapa_nama("Budi")
sapa_nama("Siti")

# Fungsi dengan return
def tambah(a, b):
    return a + b

hasil = tambah(5, 3)
print(f"5 + 3 = {hasil}")

# Fungsi dengan multiple return
def info_mahasiswa(nama, ipk):
    if ipk >= 3.5:
        status = "Cum Laude"
    else:
        status = "Reguler"
    return nama, ipk, status

n, i, s = info_mahasiswa("Andi", 3.7)
print(f"\\n{n} - IPK: {i} - {s}")`,
        output: `Halo! Selamat datang di PyLearn AI!
Halo! Selamat datang di PyLearn AI!
Halo, Budi!
Halo, Siti!
5 + 3 = 8

Andi - IPK: 3.7 - Cum Laude`
      },
      {
        id: 'parameter-default',
        title: 'Parameter dan Default Value',
        content: `Fungsi bisa memiliki beberapa jenis parameter:

1. **Positional parameter** — Harus diisi saat memanggil
2. **Default parameter** — Memiliki nilai default, opsional diisi
3. **Keyword argument** — Memanggil dengan nama parameter
4. **Arbitrary parameter (*args)** — Menerima argumen dalam jumlah banyak

Aturan:
- Parameter wajib diletakkan SEBELUM parameter default
- Saat memanggil, argumen positional harus sebelum keyword`,
        codeExample: `# Default parameter
def hitung_luas(panjang, lebar=1):
    return panjang * lebar

print(hitung_luas(5, 3))     # 15
print(hitung_luas(5))        # 5 (lebar default = 1)

# Keyword argument
def buat_profil(nama, umur, kota="Jakarta"):
    return f"{nama}, {umur} tahun, {kota}"

print(buat_profil("Budi", 20))
print(buat_profil("Siti", 21, kota="Bandung"))

# *args - argumen variabel
def jumlahkan(*angka):
    total = 0
    for a in angka:
        total += a
    return total

print(f"Jumlah: {jumlahkan(1, 2, 3, 4, 5)}")

# **kwargs
def info(**data):
    for key, val in data.items():
        print(f"  {key}: {val}")

print("\\nProfil:")
info(nama="Andi", umur=20, jurusan="Informatika")`,
        output: `15
5
Budi, 20 tahun, Jakarta
Siti, 21 tahun, Bandung
Jumlah: 15

Profil:
  nama: Andi
  umur: 20
  jurusan: Informatika`
      },
      {
        id: 'scope-fungsi',
        title: 'Scope Variabel',
        content: `**Scope** adalah area di mana variabel bisa diakses.

1. **Local scope** — Variabel yang didefinisikan di dalam fungsi hanya bisa diakses di dalam fungsi itu saja.

2. **Global scope** — Variabel yang didefinisikan di luar fungsi bisa diakses di mana saja (termasuk di dalam fungsi).

3. **global keyword** — Digunakan untuk memodifikasi variabel global dari dalam fungsi.

**Tip:** Usahakan hindari penggunaan \`global\` agar kode lebih mudah dipahami.`,
        codeExample: `# Local scope
def fungsi_lokal():
    x = 10  # Variabel lokal
    print(f"Dalam fungsi: x = {x}")

fungsi_lokal()
# print(x)  # Error! x tidak dikenal di luar

# Global scope
nama = "Global"

def tampilkan_nama():
    print(f"Nama: {nama}")

tampilkan_nama()

# Perbedaan local vs global
nilai = 100  # Global

def ubah_nilai():
    nilai = 50  # Ini variabel BARU (lokal)
    print(f"Dalam fungsi: {nilai}")

ubah_nilai()
print(f"Di luar fungsi: {nilai}")`,
        output: `Dalam fungsi: x = 10
Nama: Global
Dalam fungsi: 50
Di luar fungsi: 100`
      }
    ],
    summary: 'Fungsi didefinisikan dengan def, bisa memiliki parameter, default value, dan return value. Variabel lokal hanya bisa diakses di dalam fungsi.'
  },
  {
    id: 'list-dictionary',
    number: 8,
    title: 'List dan Dictionary',
    description: 'Memahami struktur data list dan dictionary untuk menyimpan koleksi data.',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    icon: '📚',
    subTopics: [
      {
        id: 'list-dasar',
        title: 'List Dasar',
        content: `List adalah struktur data yang menyimpan **beberapa nilai** dalam satu variabel. List bersifat **mutable** (bisa diubah setelah dibuat).

**Karakteristik:**
- Ditulis dalam kurung siku \`[]\`
- Bisa menyimpan tipe data berbeda
- Diurutkan (ordered)
- Boleh ada duplikat
- Index dimulai dari 0
- Index negatif dari belakang: -1, -2, -3, ...`,
        codeExample: `# Membuat list
buah = ["apel", "mangga", "jeruk"]
angka = [10, 20, 30, 40, 50]
campuran = [1, "dua", 3.0, True]

# Akses elemen
print(f"Buah pertama: {buah[0]}")
print(f"Buah terakhir: {buah[-1]}")

# Slicing
print(f"Dua pertama: {buah[:2]}")
print(f"Sejak index 1: {buah[1:]}")

# Info list
print(f"Jumlah buah: {len(buah)}")

# Looping
print("\\nDaftar buah:")
for i, b in enumerate(buah):
    print(f"  {i+1}. {b}")`,
        output: `Buah pertama: apel
Buah terakhir: jeruk
Dua pertama: ['apel', 'mangga']
Sejak index 1: ['mangga', 'jeruk']
Jumlah buah: 3

Daftar buah:
  1. apel
  2. mangga
  3. jeruk`
      },
      {
        id: 'list-method',
        title: 'Method List',
        content: `List memiliki banyak method bawaan:

| Method | Fungsi | Contoh |
|--------|--------|--------|
| append(x) | Tambah di akhir | list.append(4) |
| insert(i, x) | Tambah di index i | list.insert(0, "a") |
| remove(x) | Hapus nilai x | list.remove(3) |
| pop(i) | Hapus & kembalikan index i | list.pop(0) |
| sort() | Urutkan | list.sort() |
| reverse() | Balik urutan | list.reverse() |
| clear() | Hapus semua | list.clear() |
| index(x) | Cari index x | list.index(2) |
| count(x) | Hitung kemunculan x | list.count(2) |

**Catatan:** \`sort()\` mengubah list asli. Untuk salinan terurut, gunakan \`sorted(list)\`.`,
        codeExample: `# Method list
angka = [3, 1, 4, 1, 5, 9, 2, 6]

# append
angka.append(7)
print(f"Setelah append(7): {angka}")

# insert
angka.insert(0, 0)
print(f"Setelah insert(0, 0): {angka}")

# remove
angka.remove(1)  # Hapus nilai pertama yang 1
print(f"Setelah remove(1): {angka}")

# pop
elemen = angka.pop()
print(f"Setelah pop(): {angka}, yang diambil: {elemen}")

# sort
angka.sort()
print(f"Setelah sort(): {angka}")

# reverse
angka.reverse()
print(f"Setelah reverse(): {angka}")

# count
print(f"Jumlah kemunculan 1: {angka.count(1)}")

# Membuat list dengan list comprehension
kuadrat = [x**2 for x in range(1, 6)]
print(f"Kuadrat 1-5: {kuadrat}")`,
        output: `Setelah append(7): [3, 1, 4, 1, 5, 9, 2, 6, 7]
Setelah insert(0, 0): [0, 3, 1, 4, 1, 5, 9, 2, 6, 7]
Setelah remove(1): [0, 3, 4, 1, 5, 9, 2, 6, 7]
Setelah pop(): [0, 3, 4, 1, 5, 9, 2, 6], yang diambil: 7
Setelah sort(): [0, 1, 2, 3, 4, 5, 6, 9]
Setelah reverse(): [9, 6, 5, 4, 3, 2, 1, 0]
Jumlah kemunculan 1: 1
Kuadrat 1-5: [1, 4, 9, 16, 25]`
      },
      {
        id: 'dictionary',
        title: 'Dictionary',
        content: `Dictionary adalah struktur data yang menyimpan data dalam pasangan **key-value**.

**Karakteristik:**
- Ditulis dalam kurung kurawal \`{}\`
- Setiap elemen berupa \`key: value\`
- Key harus **unique** dan **immutable** (string, int, tuple)
- Value bisa tipe apa saja
- Diakses menggunakan key, bukan index
- Bersifat mutable`,
        codeExample: `# Membuat dictionary
mahasiswa = {
    "nama": "Budi",
    "nim": "12345678",
    "ipk": 3.75,
    "aktif": True
}

# Akses value
print(f"Nama: {mahasiswa['nama']}")
print(f"NIM: {mahasiswa.get('nim', 'Tidak ada')}")
print(f"Jurusan: {mahasiswa.get('jurusan', 'Belum ditentukan')}")

# Looping dictionary
print("\\nData mahasiswa:")
for key, val in mahasiswa.items():
    print(f"  {key}: {val}")

# Hanya key
print(f"\\nKolom: {list(mahasiswa.keys())}")`,
        output: `Nama: Budi
NIM: 12345678
Jurusan: Belum ditentukan

Data mahasiswa:
  nama: Budi
  nim: 12345678
  ipk: 3.75
  aktif: True

Kolom: ['nama', 'nim', 'ipk', 'aktif']`
      },
      {
        id: 'dictionary-method',
        title: 'Operasi Dictionary',
        content: `Beberapa operasi penting pada dictionary:

| Operasi | Contoh | Keterangan |
|---------|--------|------------|
| Tambah | d["key"] = val | Menambah elemen baru |
| Ubah | d["key"] = val | Mengubah value |
| Hapus | del d["key"] | Menghapus elemen |
| Cek | "key" in d | Mengecek keberadaan key |
| Length | len(d) | Jumlah elemen |
| Update | d.update(d2) | Menggabungkan dictionary |
| Clear | d.clear() | Menghapus semua elemen |

**Nested dictionary** — Dictionary dalam dictionary.`,
        codeExample: `# Operasi dictionary
kontak = {}
kontak["Andi"] = "08123456"
kontak["Budi"] = "08234567"
kontak["Siti"] = "08345678"
print(f"Kontak: {kontak}")

# Ubah value
kontak["Budi"] = "08999999"
print(f"Setelah update: {kontak}")

# Hapus
del kontak["Siti"]
print(f"Setelah hapus: {kontak}")

# Cek key
print(f"Ada Andi? {"Andi" in kontak}")

# Nested dictionary
kelas = {
    "A1": {"mahasiswa": 30, "wali": "Pak Budi"},
    "A2": {"mahasiswa": 28, "wali": "Pak Ani"}
}

print("\\nInfo Kelas:")
for kelas_nama, info in kelas.items():
    print(f"  {kelas_nama}: {info['mahasiswa']} mhs, Wali: {info['wali']}")`,
        output: `Kontak: {'Andi': '08123456', 'Budi': '08234567', 'Siti': '08345678'}
Setelah update: {'Andi': '08123456', 'Budi': '08999999', 'Siti': '08345678'}
Setelah hapus: {'Andi': '08123456', 'Budi': '08999999'}
Ada Andi? True

Info Kelas:
  A1: 30 mhs, Wali: Pak Budi
  A2: 28 mhs, Wali: Pak Ani`
      }
    ],
    summary: 'List menyimpan data berurutan dalam []. Dictionary menyimpan pasangan key-value dalam {}. Keduanya mutable dan memiliki banyak method bawaan.'
  }
]