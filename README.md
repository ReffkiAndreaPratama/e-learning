# PseudoLearn AI

Pengembangan **Media Pembelajaran Interaktif Berbasis Web** untuk memahami konsep dasar pemrograman (logika & algoritma melalui notasi **pseudocode**) dengan dukungan **AI Tutor**.

PseudoLearn AI dirancang untuk mendukung proses belajar mengajar (PBK/CAL — Pembelajaran Berbantuan Komputer / Computer-Assisted Learning) dengan alur yang terstruktur: **Pelajari Materi → Praktik di Playground → Kerjakan Latihan → Uji Pemahaman dengan Quiz → Bertanya ke AI Tutor → Pantau Progress**.

## Fitur Utama

- **Materi Interaktif** — 8 topik dasar pemrograman (pengenalan, variabel & tipe data, operator, input/output, percabangan, perulangan, fungsi, array & string) lengkap dengan kode contoh dan output dalam pseudocode.
- **Pseudo Playground** — editor kode dengan simulator pseudocode berbahasa Indonesia yang berjalan langsung di browser (tanpa server). Mendukung `tulis`, `baca`, `jika/maka/selainnya`, `untuk`, `selama`, fungsi dengan `kembalikan`, array 1-based, dan fungsi bawaan (`int`, `float`, `str`, `panjang`, `sum`, `min`, `max`, `akar`, dll.).
- **Latihan & Quiz** — soal pilihan ganda, benar/salah, teka-teki output, dan perbaikan kode dengan umpan balik langsung.
- **Pretest & Posttest** — evaluasi sebelum dan sesudah belajar untuk mengukur peningkatan pemahaman.
- **AI Tutor** — asisten belajar untuk konsep pemrograman, pemberian contoh, hint, latihan, hingga bantuan debugging. Dilengkapi **AI Code Explainer** dan **AI Question Generator**.
- **Progress, Analytics & Achievements** — pelacakan kemajuan, statistik belajar, dan pencapaian (gamifikasi + streak).
- **AI Usage Log** — catatan seluruh percakapan dengan AI Tutor untuk keperluan evaluasi dan penelitian.
- **Evaluasi SUS** — kuesioner *System Usability Scale* (10 pernyataan, skor 0–100) untuk mengukur kegunaan aplikasi, lengkap dengan riwayat dan ekspor data.
- **Dark Mode & Responsif** — mendukung mode gelap dan tampilan mobile.
- **Demo Mode** — login instan sebagai akun contoh (Andi Pratama) untuk mencoba semua fitur.

## Teknologi

- **React 19** + **TypeScript** — antarmuka dan logika aplikasi
- **Vite 8** — bundler & dev server
- **Tailwind CSS v4** — styling utility-first
- **React Router v7** — routing halaman
- **lucide-react** — ikon
- Penyimpanan data menggunakan **localStorage** (tanpa backend, cocok untuk proyek akademik)

## Cara Menjalankan

```bash
# 1. Install dependensi
npm install

# 2. Jalankan dev server
npm run dev
# Buka http://localhost:5173

# 3. Build produksi
npm run build

# 4. Pratinjau hasil build
npm run preview
```

> Catatan: di Windows, gunakan `npm.cmd` jika `npm.ps1` diblokir oleh execution policy.

## Struktur Proyek

```
src/
├── main.tsx              # Entry point React
├── App.tsx               # Routing & auth guard
├── context/AppContext.tsx# State global (auth, progress, achevements, localStorage)
├── components/
│   ├── Layout.tsx        # Sidebar, topbar mobile, bottom nav
│   ├── ui.tsx            # Komponen UI dasar (Card, Badge, PageHeader, dll.)
│   └── QuizRunner.tsx    # Mesin kuis
├── data/
│   ├── materials.ts      # Konten 8 topik materi
│   ├── exercises.ts      # Soal latihan
│   └── quizzes.ts        # Soal quiz & pretest/posttest
├── lib/
│   ├── pseudoRunner.ts   # Simulator/executor pseudocode (berjalan di browser)
│   └── aiTutor.ts        # Mesin AI Tutor (rule-based)
└── pages/                # Halaman aplikasi (Login, Dashboard, Materi, Playground,
                          # Latihan, Quiz, Pretest, Posttest, AI Tutor, Progress,
                          # Analytics, Achievements, Evaluasi SUS, AI Log, Profile, Settings)
```

## Menjalankan Pseudocode di Browser

`src/lib/pseudoRunner.ts` berisi interpreter pseudocode berbahasa Indonesia yang dieksekusi sepenuhnya di browser (sinkron). Fitur yang didukung:

- Variabel & assignment (`x <- 5`, `x := 3`)
- Tipe data: integer, float (desimal), string, boolean (`benar`/`salah`), nilai kosong (`kosong`)
- Ekspresi dengan urutan operator (`dan`/`atau`/`tidak`, perbandingan, `+/-`, `*//`, `div`/`mod`, `**`), variabel, fungsi bawaan, pemanggilan fungsi buatan, dan array
- `tulis()` / `cetak()` dengan banyak argumen dan `sep`/`end`
- `baca()` — membaca masukan (di playground mengembalikan string kosong)
- `jika ... maka ... selainnya ... akhirjika` termasuk bersarang (nested)
- `untuk ... sampai ...` (dengan `langkah`/`menurun`) dan `selama ...`
- `keluar`, `lanjut`, `kembalikan`
- Fungsi dengan `fungsi ... kembalikan ... akhirfungsi`
- Array 1-based `[1, 2, 3]` dengan indexing `data[i]`, akses karakter string `teks[i]`
- Fungsi bawaan: `tulis`, `cetak`, `baca`, `int`, `float`, `str`, `panjang`/`len`, `sum`, `min`, `max`, `abs`, `akar`, `bulat`, `pangkat`
- Pelindung loop tak terbatas dan batas output

## Pengembangan

Tes interpreter & validasi seluruh konten materi/latihan/quiz:

```bash
node scripts/test-pseudo.mjs   # tes unit interpreter (64 kasus)
node scripts/validate-data.mjs # jalankan semua kode contoh di materi & soal
```

## Kontributor

Proyek akademik Mata Kuliah **Pengajaran/Pembelajaran Berbantuan Komputer (PBK/CAL)**.

## Lisensi

Gunakan untuk keperluan pendidikan dan penelitian.