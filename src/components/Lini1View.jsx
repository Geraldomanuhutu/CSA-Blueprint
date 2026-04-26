import { useState, useMemo } from "react";
import { ModHeader, SectionLabel, StatusBadge, KillSwitchFooter } from "./shared";

export default function Lini1View({ config }) {
  const { header, atributList, docList } = config;

  const [pelaksana, setPelaksana] = useState([
    { nama: "", posisi: "" },
    { nama: "", posisi: "" },
  ]);
  const [sampel, setSampel] = useState({ nasabah: "", noPK: "" });
  const [jawaban, setJawaban] = useState({});
  const [fieldValues, setFieldValues] = useState({});
  const [uploads, setUploads] = useState({});
  const [keterangan, setKeterangan] = useState("");

  const totalAtribut = atributList.length;
  const totalDijawab = atributList.filter((a) => jawaban[a.kode] !== undefined).length;
  const allAnswered = totalDijawab === totalAtribut;
  const adaTidak = Object.values(jawaban).includes("tidak");
  const failCount = Object.values(jawaban).filter((v) => v === "tidak").length;

  const kesimpulan = useMemo(() => {
    if (!allAnswered) return "pending";
    return adaTidak ? "tidak-efektif" : "efektif";
  }, [allAnswered, adaTidak]);

  const setJaw = (kode, val) => setJawaban((prev) => ({ ...prev, [kode]: val }));

  const onFileChosen = (docId, e) => {
    const file = e.target.files?.[0];
    if (file) setUploads((prev) => ({ ...prev, [docId]: file.name }));
  };
  const removeFile = (docId) =>
    setUploads((prev) => { const n = { ...prev }; delete n[docId]; return n; });

  const setFieldVal = (key, val) =>
    setFieldValues((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = () => {
    const payload = { header, pelaksana, sampel, jawaban, fieldValues, uploads, keterangan, kesimpulan };
    console.log("SUBMIT PAYLOAD:", payload);
    alert("Self Assessment berhasil disubmit!");
  };

  const defBadge = !allAnswered
    ? { type: "pending", label: "—" }
    : adaTidak
    ? { type: "def-y", label: "Y — Ada Defisiensi" }
    : { type: "def-t", label: "T — Tidak Ada" };

  return (
    <div>
      <div className="role-banner lini1">
        <span className="role-pill" style={{ background: "#1d9e75", color: "#04342c" }}>LINI 1</span>
        <span className="role-desc">Mode Self Assessment — Isi sesuai dokumen yang diperiksa</span>
        <span className="role-lock">🔒 Struktur dikunci Admin</span>
      </div>

      <ModHeader />

      {/* A. Identifikasi */}
      <SectionLabel label="A. Identifikasi Kontrol" />
      <div className="table-wrap">
        <table className="csa-table">
          <tbody>
            <tr className="row-locked">
              <td className="lbl-cell">Key Control ID</td>
              <td><span className="locked-val">{config.controlId}</span></td>
              <td className="lbl-cell">Status Pengisian</td>
              <td>
                {allAnswered
                  ? <StatusBadge type="pass" label={`✓ Lengkap (${totalAtribut}/${totalAtribut})`} />
                  : <StatusBadge type="pending" label={`${totalDijawab}/${totalAtribut} Atribut`} />}
              </td>
            </tr>
            <tr className="row-locked">
              <td className="lbl-cell">Nama Aktivitas</td>
              <td colSpan={3}><span className="locked-val">{header.namaAktivitas}</span></td>
            </tr>
            <tr className="row-locked">
              <td className="lbl-cell">Deskripsi</td>
              <td colSpan={3}><span className="locked-val">{header.deskripsi}</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* B. Pelaksana */}
      <SectionLabel label="B. Kontak Informasi Pelaksana Pengendalian" />
      <div className="table-wrap">
        <div className="note-bar">
          Mohon untuk menuliskan semua personel yang menjalankan pengendalian dari keseluruhan proses
        </div>
        <table className="csa-table">
          <thead>
            <tr>
              <th className="th-center" style={{ width: 40 }}>No</th>
              <th>Nama</th>
              <th style={{ width: 220 }}>Posisi / Jabatan</th>
            </tr>
          </thead>
          <tbody>
            {pelaksana.map((p, i) => (
              <tr key={i} className={i % 2 === 0 ? "row-odd" : "row-even"}>
                <td style={{ textAlign: "center", fontFamily: "monospace", fontSize: 10, color: "var(--text-muted)" }}>{i + 1}</td>
                <td>
                  <input className="csa-input" type="text" placeholder="Nama pelaksana..."
                    value={p.nama}
                    onChange={(e) => setPelaksana((prev) => prev.map((x, j) => j === i ? { ...x, nama: e.target.value } : x))} />
                </td>
                <td>
                  <input className="csa-input" type="text" placeholder="Posisi / jabatan..."
                    value={p.posisi}
                    onChange={(e) => setPelaksana((prev) => prev.map((x, j) => j === i ? { ...x, posisi: e.target.value } : x))} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* C. Atribut Pengujian — READ ONLY, biar lini 1 paham sebelum isi grid */}
      <SectionLabel label="C. Atribut Pengujian Pengendalian" />
      <div className="table-wrap">
        <div className="note-bar">
          Berikut adalah atribut yang akan dinilai dalam self assessment ini. Pastikan Anda memahami setiap atribut sebelum mengisi hasil pengujian di bawah.
        </div>
        <table className="csa-table">
          <thead>
            <tr>
              <th className="th-center" style={{ width: 60 }}>Kode</th>
              <th>Deskripsi Atribut Pengujian</th>
              <th className="th-center" style={{ width: 130 }}>Kriteria Penilaian</th>
            </tr>
          </thead>
          <tbody>
            {atributList.map((attr, idx) => (
              <tr key={attr.kode} className="row-locked">
                <td style={{ textAlign: "center" }}>
                  <span className="attr-code" style={{ color: "var(--navy-light)", fontSize: 11, fontWeight: 700 }}>
                    [{attr.kode}]
                  </span>
                </td>
                <td style={{ fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.6 }}>
                  {attr.deskripsi}
                </td>
                <td style={{ textAlign: "center" }}>
                  <span className="badge" style={{ background: "#fffbeb", color: "#92400e", border: "1px solid #fcd34d", fontSize: 9 }}>
                    Ya / Tidak
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* D. Hasil Pengujian — grid utama */}
      <SectionLabel label="D. Hasil Pengujian Self Assessment" />
      <div className="table-wrap scrollable">
        <table className="csa-table" style={{ minWidth: "max-content" }}>
          <thead>
            <tr className="group-hdr">
              <th colSpan={2} style={{ textAlign: "center" }}>Informasi Sampel</th>
              {docList.map((doc) => (
                <th key={doc.id} colSpan={doc.fields.length + (doc.withUpload ? 1 : 0)}
                  style={{ textAlign: "center", borderLeft: "2px solid #2a4a6a" }}>
                  {doc.nama}
                </th>
              ))}
              <th colSpan={atributList.length} style={{ textAlign: "center", borderLeft: "2px solid #2a4a6a" }}>
                Atribut Pengujian
              </th>
              <th colSpan={2} style={{ textAlign: "center", borderLeft: "2px solid #2a4a6a" }}>Hasil</th>
            </tr>
            <tr>
              <th className="th-center" style={{ width: 34 }}>No</th>
              <th style={{ minWidth: 130 }}>Nama Nasabah / No. PK</th>
              {docList.map((doc, di) => (
                <>
                  {doc.fields.map((f, fi) => (
                    <th key={`${di}-${fi}`} style={{ minWidth: 100, borderLeft: fi === 0 ? "2px solid #2a4a6a" : undefined }}>{f}</th>
                  ))}
                  {doc.withUpload && <th className="th-center" style={{ width: 85 }}>File</th>}
                </>
              ))}
              {atributList.map((a) => (
                <th key={a.kode} className="th-center"
                  style={{ width: 75, borderLeft: "2px solid #2a4a6a" }}
                  title={a.deskripsi}>
                  [{a.kode}]
                </th>
              ))}
              <th className="th-center" style={{ width: 95, borderLeft: "2px solid #2a4a6a" }}>Defisiensi</th>
              <th style={{ minWidth: 140 }}>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            <tr className={adaTidak ? "row-fail" : "row-odd"}>
              <td style={{ textAlign: "center", fontFamily: "monospace", fontSize: 10, color: "var(--text-muted)" }}>1</td>
              <td>
                <input className="csa-input" type="text" placeholder="Nama nasabah..."
                  value={sampel.nasabah}
                  onChange={(e) => setSampel((s) => ({ ...s, nasabah: e.target.value }))}
                  style={{ marginBottom: 3 }} />
                <input className="csa-input" type="text" placeholder="No. PK..."
                  value={sampel.noPK}
                  onChange={(e) => setSampel((s) => ({ ...s, noPK: e.target.value }))}
                  style={{ fontSize: 10.5, color: "var(--text-muted)" }} />
              </td>
              {docList.map((doc) => (
                <>
                  {doc.fields.map((f, fi) => {
                    const key = `${doc.id}_${fi}`;
                    return (
                      <td key={key} style={{ borderLeft: fi === 0 ? "2px solid #ece8e0" : undefined }}>
                        <input className="csa-input" type="text" placeholder={`${f}...`}
                          value={fieldValues[key] || ""}
                          onChange={(e) => setFieldVal(key, e.target.value)} />
                      </td>
                    );
                  })}
                  {doc.withUpload && (
                    <td key={`up-${doc.id}`} style={{ textAlign: "center" }}>
                      <input type="file" id={`file-${doc.id}`} onChange={(e) => onFileChosen(doc.id, e)} />
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                        {uploads[doc.id] ? (
                          <>
                            <label htmlFor={`file-${doc.id}`} className="upload-btn uploaded" style={{ fontSize: 9 }}>✓ Terupload</label>
                            <span className="file-name done" title={uploads[doc.id]}>
                              {uploads[doc.id].length > 14 ? uploads[doc.id].slice(0, 12) + "…" : uploads[doc.id]}
                            </span>
                            <button onClick={() => removeFile(doc.id)}
                              style={{ fontSize: 9, color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer" }}>
                              ✕ hapus
                            </button>
                          </>
                        ) : (
                          <>
                            <label htmlFor={`file-${doc.id}`} className="upload-btn">↑ Upload</label>
                            <span className="file-name">Belum ada</span>
                          </>
                        )}
                      </div>
                    </td>
                  )}
                </>
              ))}
              {atributList.map((attr) => {
                const jaw = jawaban[attr.kode];
                const isYes = jaw === "ya";
                const isNo = jaw === "tidak";
                return (
                  <td key={attr.kode} style={{ textAlign: "center", borderLeft: "2px solid #ece8e0" }}>
                    <div className="radio-group">
                      <label className={`rl rl-ya ${isYes ? "active" : ""}`}>
                        <input type="radio" name={`attr-${attr.kode}`} checked={isYes} onChange={() => setJaw(attr.kode, "ya")} />
                        Ya
                      </label>
                      <label className={`rl rl-no ${isNo ? "active" : ""}`}>
                        <input type="radio" name={`attr-${attr.kode}`} checked={isNo} onChange={() => setJaw(attr.kode, "tidak")} />
                        Tidak
                      </label>
                    </div>
                  </td>
                );
              })}
              <td style={{ textAlign: "center", borderLeft: "2px solid #ece8e0" }}>
                <StatusBadge type={defBadge.type} label={defBadge.label} />
              </td>
              <td>
                <textarea className="csa-textarea" placeholder="Keterangan jika ada defisiensi..."
                  value={keterangan} onChange={(e) => setKeterangan(e.target.value)} rows={2} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* E. Kesimpulan */}
      <KillSwitchFooter kesimpulan={kesimpulan} dijawab={totalDijawab} total={totalAtribut} failCount={failCount} />

      <button className="submit-btn" onClick={handleSubmit} disabled={!allAnswered}>
        ▶ Submit Self Assessment
      </button>
    </div>
  );
}
