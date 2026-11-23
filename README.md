# Website Ormafest 2026

Website statis (HTML, CSS, JavaScript biasa). Tidak perlu build. Buka `index.html` untuk melihat hasilnya.

## Struktur folder

| Berkas / folder | Fungsi |
|---|---|
| `index.html` | Struktur halaman dan teks (Beranda, Timeline, OrmaFinder, Maps, Passport, footer) |
| `style.css` | Seluruh tampilan, warna, font, dan animasi |
| `script.js` | Data dan perilaku halaman. **Sebagian besar pengisian data dilakukan di sini** |
| `logo/` | Logo Ormafest (`ormafest.png`) dan ikon tab (`favicon.png`) |
| `img/` | Gambar cover dan gambar filosofi |
| `denah/` | Gambar denah (OrmaExplore sudah ada, OrmaFair menyusul) |
| `apps-script/Code.gs` | Kode Google Apps Script untuk Passport (tidak ikut dipakai website secara langsung) |

## Bagian yang perlu diisi (semuanya di bagian paling atas `script.js`)

| Yang diisi | Variabel | Contoh |
|---|---|---|
| Logo tiap ormawa | `LOGO` | `{"Kelompok Pencinta Alam STAPALA":"logo/ormawa/stapala.png"}` |
| Link video profil | `VIDEO` | `{"Kelompok Pencinta Alam STAPALA":"https://youtu.be/xxxx"}` |
| Denah OrmaFair | `MAPS.ormafair` | `ormafair:"denah/ormafair.png"` |
| URL Google Apps Script | `API` | `"https://script.google.com/macros/s/.../exec"` |
| Link Google Form OrmaExplore | `FORM_EXPLORE` | `"https://forms.gle/xxxx"` |
| Jadwal Timeline | `TL` | ubah `d`, `t`, `k`, `p` |

Catatan:
- Nama ormawa pada `LOGO` dan `VIDEO` harus **sama persis** dengan nama pada daftar `DATA` di `script.js`.
- Simpan logo ormawa di `logo/ormawa/` (buat foldernya). Saran: PNG persegi, latar transparan, sekitar 256 x 256 px, di bawah 200 KB.
- Ikon YouTube di footer masih nonaktif. Untuk mengaktifkan, ubah `<a aria-disabled="true" ...>` pada ikon YouTube di `index.html` menjadi `<a href="LINK_YOUTUBE" target="_blank" rel="noopener noreferrer" ...>`.
- Selama `API` masih kosong, bagian Passport menampilkan **data contoh** yang diberi label. Isi `API` sebelum website dibuka untuk umum.

## Alur memperbarui website

1. Edit berkas di Antigravity, simpan.
2. Commit lalu push ke GitHub.
3. Vercel otomatis men-deploy ulang (sekitar 1 sampai 2 menit).
4. Buka website, tekan `Ctrl + F5` agar tampilan terbaru muncul.
