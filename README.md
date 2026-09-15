# PyLearn AI

Pengembangan **Media Pembelajaran Interaktif Berbasis Web** untuk memahami konsep dasar pemrograman Python dengan dukungan **AI Tutor**.

PyLearn AI dirancang untuk mendukung proses belajar mengajar (PBK/CAL — Pembelajaran Berbantuan Komputer / Computer-Assisted Learning) dengan alur yang terstruktur: **Pelajari Materi → Praktik di Playground → Kerjakan Latihan → Uji Pemahaman dengan Quiz → Bertanya ke AI Tutor → Pantau Progress**.

## Fitur Utama

- **Materi Interaktif** — 8 topik dasar Python (pengenalan, variabel & tipe data, operator, input/output, percabangan, perulangan, fungsi, list & dictionary) lengkap dengan kode contoh dan output.
- **Playground Python** — editor kode dengan simulator/executor Python yang berjalan langsung di browser (tanpa server) dan mendukung `print`, `if/elif/else`, `for`, `while`, fungsi dengan `return`, list, dictionary, dan f-string.
- **Latihan & Quiz** — soal pilihan ganda, benar/salah, teka-teki output, dan perbaikan kode dengan umpan balik langsung.
- **Pretest & Posttest** — evaluasi sebelum dan sesudah belajar untuk mengukur peningkatan pemahaman.
- **AI Tutor** — asisten belajar untuk konsep Python, pemberian contoh, hint, latihan, hingga bantuan debugging. Dilengkapi **AI Code Explainer** dan **AI Question Generator**.
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
│   ├── pythonRunner.ts   # Simulator/executor Python (berjalan di browser)
│   └── aiTutor.ts        # Mesin AI Tutor (rule-based)
└── pages/                # Halaman aplikasi (Login, Dashboard, Materi, Playground,
                          # Latihan, Quiz, Pretest, Posttest, AI Tutor, Progress,
                          # Analytics, Achievements, Evaluasi SUS, AI Log, Profile, Settings)
```

## Eksekusi Python di Browser

`src/lib/pythonRunner.ts` berisi interpreter Python mini yang dieksekusi sepenuhnya di browser (sinkron). Fitur yang didukung:

- Variabel, assignment, dan assignment majemuk (`+=`, `-=`, dll.)
- Tipe data: `int`, `float`, `str`, `bool`, `list`, `dict`, `None`
- Ekspresi dengan urutan operator Python (`and/or`, perbandingan, `+/-`, `*//%`, `**`), parenthes, f-string
- `print()` dengan `sep` dan `end`
- `if / elif / else` termasuk bersarang (nested)
- `for ... in range()/list/string` dan `while`
- `break`, `continue`, `return`
- Fungsi dengan `def`, parameter, rekursi
- Method list (`append`, `pop`, `sort`, `reverse`, dll.) dan indexing (termasuk indeks negatif)
- Fungsi bawaan: `print`, `input`, `type`, `len`, `int`, `float`, `str`, `bool`, `abs`, `round`, `min`, `max`, `sum`
- Pelindung loop tak terbatas dan batas output

## Kontributor

Proyek akademik Mata Kuliah **Pengajaran/Pembelajaran Berbantuan Komputer (PBK/CAL)**.

## Lisensi

Gunakan untuk keperluan pendidikan dan penelitian.