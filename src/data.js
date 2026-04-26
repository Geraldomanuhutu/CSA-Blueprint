// ─────────────────────────────────────────────────────────────────────────────
// DATA LAYER — swap dengan REST API endpoint di sini nanti
// ─────────────────────────────────────────────────────────────────────────────

export const CONTROL_OPTIONS = [
  { value: "", label: "-- Pilih ID Kontrol --" },
  { value: "ULM-12-02", label: "ULM-12-02 – Proses Pembiayaan Usaha Mikro" },
];

export const CONTROL_DATA = {
  "ULM-12-02": {
    id: "ULM-12-02",
    periode: "2025",
    namaAktivitas:
      "Kepala Unit ULaMM (KUU) melakukan proses akad pembiayaan dan tanda tangan bersama notaris, nasabah, dan para saksi termasuk pejabat ULaMM",
    deskripsi:
      "Proses akad dihadiri calon nasabah, notaris, KUU, dan para saksi. KUU melakukan tanda tangan basah pada Perjanjian Pembiayaan.",
    atribut: [
      {
        kode: "A",
        deskripsi:
          "Informasi pada PK (plafon, jangka waktu, tujuan) sesuai dengan Perjanjian Kredit Notaril dan dokumen pendukung",
      },
      {
        kode: "B",
        deskripsi:
          "Dokumen PK telah direviu dan ditandatangani oleh nasabah dan pejabat yang berwenang",
      },
    ],
    dokumen: [
      {
        id: "d1",
        nama: "Perjanjian Pembiayaan yang sudah ditandatangani",
        fields: ["Nomor", "Tanggal", "Fasilitas Kredit", "Ditandatangani Oleh"],
        withUpload: true,
      },
      {
        id: "d2",
        nama: "Perjanjian Kredit Notaril",
        fields: ["Tanggal", "Fasilitas Kredit", "Ditandatangani Oleh"],
        withUpload: true,
      },
      {
        id: "d3",
        nama: "Covernote",
        fields: ["Nomor", "Tanggal", "Nomor Agunan", "Disiapkan Oleh"],
        withUpload: true,
      },
      {
        id: "d4",
        nama: "Tanda Terima Dokumen Agunan",
        fields: ["Nomor", "Tanggal", "Nomor Agunan", "Ditandatangani Oleh"],
        withUpload: true,
      },
    ],
  },
  // Tambah kontrol lain di sini:
  // "ULM-12-03": { ... }
};

export const POSISI_OPTIONS = [
  "Account Officer (AO)",
  "Senior Account Officer (SAO)",
  "Branch Manager (BM)",
  "Assistant Branch Manager (ABM)",
  "Kepala Unit ULaMM (KUU)",
  "Credit Analyst",
  "Back Office Staff",
  "Lainnya",
];
