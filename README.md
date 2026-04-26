# CSA Module — PNM OPERA
**Control Self-Assessment (ICoFR Style)** · React + Vercel

---

## Struktur Project

```
csa-pnm/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── AdminView.jsx    ← Admin: konfigurasi & publish kertas kerja
│   │   ├── Lini1View.jsx    ← Lini 1: self assessment + upload bukti
│   │   └── shared.jsx       ← Komponen reusable (Topbar, Footer, Badge, dll)
│   ├── App.jsx              ← Root + mode switcher admin/lini1
│   ├── data.js              ← Master data dummy (swap dengan API)
│   ├── styles.css           ← Global styles
│   └── index.js             ← Entry point
├── vercel.json              ← Config deploy Vercel
├── .gitignore
└── package.json
```

---

## Deploy ke Vercel via GitHub

### Step 1 — Push ke GitHub
```bash
cd csa-pnm
git init
git add .
git commit -m "feat: initial CSA module — PNM OPERA"

# Buat repo baru di github.com, lalu:
git remote add origin https://github.com/USERNAME/csa-pnm.git
git branch -M main
git push -u origin main
```

### Step 2 — Connect ke Vercel
1. Buka [vercel.com](https://vercel.com) → Login dengan GitHub
2. Klik **"Add New Project"**
3. Import repo `csa-pnm`
4. Vercel auto-detect sebagai React (Create React App)
5. Klik **Deploy** ✅

> Setiap `git push` ke branch `main` akan trigger auto-deploy.

---

## Run Lokal

```bash
npm install
npm start
# → http://localhost:3000
```

---

## Cara Pakai (Flow)

### Admin
1. Pilih Key Control ID
2. Edit nama aktivitas & deskripsi
3. Konfigurasi atribut pengujian (tambah/hapus/edit)
4. Konfigurasi dokumen + field detail per dokumen
5. Klik **Publish Kertas Kerja** → otomatis pindah ke tampilan Lini 1

### Lini 1
1. Isi info pelaksana pengendalian
2. Isi info sampel (nama nasabah, no. PK)
3. Isi field detail per dokumen (Nomor, Tanggal, dll)
4. Upload file bukti per dokumen
5. Jawab atribut Ya/Tidak → Kill Switch kalkulasi otomatis
6. Klik **Submit Self Assessment**

---

## Kill Switch Logic (ICoFR)
| Kondisi | Hasil |
|---|---|
| Semua atribut = **Ya** | ✓ **EFEKTIF** |
| Minimal 1 atribut = **Tidak** | ✕ **TIDAK EFEKTIF** |
| Belum semua dijawab | — Belum Dinilai |

---

## Integrasi API (Next Steps)

Data dummy ada di `src/data.js`. Untuk connect ke backend:

```js
// Contoh fetch control data
const res = await fetch(`/api/controls/${controlId}`);
const data = await res.json();
```

Endpoint yang dibutuhkan:
- `GET  /api/controls` — list semua kontrol
- `GET  /api/controls/:id` — detail kontrol + atribut + dokumen
- `POST /api/submissions` — submit hasil self assessment
- `POST /api/uploads` — upload file bukti dokumen
