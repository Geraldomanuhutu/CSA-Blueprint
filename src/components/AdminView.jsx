import { useState } from "react";
import { CONTROL_DATA, CONTROL_OPTIONS } from "../data";
import { ModHeader, SectionLabel } from "./shared";

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN VIEW — Konfigurasi & Publish Kertas Kerja
// ─────────────────────────────────────────────────────────────────────────────
export default function AdminView({ onPublish }) {
  const [controlId, setControlId] = useState("ULM-12-02");
  const [header, setHeader] = useState({
    namaAktivitas: CONTROL_DATA["ULM-12-02"].namaAktivitas,
    deskripsi: CONTROL_DATA["ULM-12-02"].deskripsi,
    periode: CONTROL_DATA["ULM-12-02"].periode,
  });
  const [atributList, setAtributList] = useState(
    CONTROL_DATA["ULM-12-02"].atribut.map((a) => ({ ...a }))
  );
  const [docList, setDocList] = useState(
    CONTROL_DATA["ULM-12-02"].dokumen.map((d) => ({
      ...d,
      fields: [...d.fields],
    }))
  );
  const [docCounter, setDocCounter] = useState(10);
  const [newFieldInputs, setNewFieldInputs] = useState({});

  // ── Control select ──
  const handleControlChange = (e) => {
    const id = e.target.value;
    setControlId(id);
    if (CONTROL_DATA[id]) {
      setHeader({
        namaAktivitas: CONTROL_DATA[id].namaAktivitas,
        deskripsi: CONTROL_DATA[id].deskripsi,
        periode: CONTROL_DATA[id].periode,
      });
      setAtributList(CONTROL_DATA[id].atribut.map((a) => ({ ...a })));
      setDocList(
        CONTROL_DATA[id].dokumen.map((d) => ({ ...d, fields: [...d.fields] }))
      );
    }
  };

  // ── Atribut ──
  const addAtribut = () => {
    const kode = String.fromCharCode(65 + atributList.length);
    setAtributList((prev) => [...prev, { kode, deskripsi: "" }]);
  };
  const updateAtribut = (idx, val) => {
    setAtributList((prev) =>
      prev.map((a, i) => (i === idx ? { ...a, deskripsi: val } : a))
    );
  };
  const delAtribut = (idx) => {
    setAtributList((prev) =>
      prev
        .filter((_, i) => i !== idx)
        .map((a, i) => ({ ...a, kode: String.fromCharCode(65 + i) }))
    );
  };

  // ── Dokumen ──
  const addDoc = () => {
    const id = `d${docCounter}`;
    setDocCounter((c) => c + 1);
    setDocList((prev) => [
      ...prev,
      { id, nama: "Nama Dokumen Baru", fields: ["Nomor", "Tanggal"], withUpload: true },
    ]);
  };
  const delDoc = (idx) => setDocList((prev) => prev.filter((_, i) => i !== idx));
  const updateDocNama = (idx, val) =>
    setDocList((prev) => prev.map((d, i) => (i === idx ? { ...d, nama: val } : d)));
  const toggleUpload = (idx) =>
    setDocList((prev) =>
      prev.map((d, i) => (i === idx ? { ...d, withUpload: !d.withUpload } : d))
    );

  // ── Fields per dokumen ──
  const addField = (docIdx) => {
    const val = (newFieldInputs[docIdx] || "").trim();
    if (!val) return;
    setDocList((prev) =>
      prev.map((d, i) => (i === docIdx ? { ...d, fields: [...d.fields, val] } : d))
    );
    setNewFieldInputs((prev) => ({ ...prev, [docIdx]: "" }));
  };
  const delField = (docIdx, fieldIdx) =>
    setDocList((prev) =>
      prev.map((d, i) =>
        i === docIdx ? { ...d, fields: d.fields.filter((_, fi) => fi !== fieldIdx) } : d
      )
    );

  // ── Publish ──
  const handlePublish = () => {
    const payload = { controlId, header, atributList, docList };
    onPublish(payload);
  };

  return (
    <div>
      {/* Role Banner */}
      <div className="role-banner admin">
        <span className="role-pill" style={{ background: "var(--gold)", color: "var(--navy)" }}>
          ADMIN
        </span>
        <span className="role-desc">Konfigurasi Kertas Kerja — Definisi Dokumen & Field</span>
        <span className="role-lock">Publish agar tersedia untuk Lini 1</span>
      </div>

      <ModHeader subtitle="RISK & COMPLIANCE DIVISION · ADMIN PANEL · PERIODE: 2025" />

      {/* ── A. Identifikasi Kontrol ── */}
      <SectionLabel label="A. Identifikasi Kontrol" />
      <div className="table-wrap">
        <table className="csa-table">
          <tbody>
            <tr className="row-odd">
              <td className="lbl-cell">Key Control ID</td>
              <td>
                <select className="csa-select" value={controlId} onChange={handleControlChange} style={{ maxWidth: 320 }}>
                  {CONTROL_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </td>
              <td className="lbl-cell">Periode</td>
              <td>
                <input className="csa-input" type="text" value={header.periode}
                  onChange={(e) => setHeader((h) => ({ ...h, periode: e.target.value }))}
                  style={{ maxWidth: 120 }} />
              </td>
            </tr>
            <tr className="row-even">
              <td className="lbl-cell">Nama Aktivitas</td>
              <td colSpan={3}>
                <input className="csa-input" type="text" value={header.namaAktivitas}
                  onChange={(e) => setHeader((h) => ({ ...h, namaAktivitas: e.target.value }))} />
              </td>
            </tr>
            <tr className="row-odd">
              <td className="lbl-cell">Deskripsi</td>
              <td colSpan={3}>
                <input className="csa-input" type="text" value={header.deskripsi}
                  onChange={(e) => setHeader((h) => ({ ...h, deskripsi: e.target.value }))} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── B. Atribut Pengujian ── */}
      <SectionLabel label="B. Atribut Pengujian" />
      <div className="table-wrap">
        <table className="csa-table">
          <thead>
            <tr>
              <th className="th-center" style={{ width: 60 }}>Kode</th>
              <th>Deskripsi Atribut</th>
              <th className="th-center" style={{ width: 70 }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {atributList.map((attr, idx) => (
              <tr key={attr.kode} className={idx % 2 === 0 ? "row-odd" : "row-even"}>
                <td style={{ textAlign: "center" }}>
                  <span className="attr-code">[{attr.kode}]</span>
                </td>
                <td>
                  <input className="csa-input" type="text" value={attr.deskripsi}
                    onChange={(e) => updateAtribut(idx, e.target.value)}
                    placeholder={`Deskripsi atribut ${attr.kode}...`} />
                </td>
                <td style={{ textAlign: "center" }}>
                  <button className="del-btn" onClick={() => delAtribut(idx)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row-toolbar">
          <button className="add-btn" onClick={addAtribut}>+ Tambah Atribut</button>
        </div>
      </div>

      {/* ── C. Konfigurasi Dokumen ── */}
      <SectionLabel label="C. Daftar Dokumen & Konfigurasi Field Detail" />
      <div className="table-wrap">
        <div className="note-bar">
          Definisikan dokumen beserta field detail yang harus diisi Lini 1 saat self assessment
        </div>

        {docList.map((doc, di) => (
          <div key={doc.id} className="doc-config-card">
            <div className="doc-config-hdr">
              <span style={{ fontFamily: "monospace", fontSize: 10, background: "var(--gold)", color: "var(--navy)", padding: "1px 6px", borderRadius: 2 }}>
                {di + 1}
              </span>
              <input
                type="text"
                value={doc.nama}
                onChange={(e) => updateDocNama(di, e.target.value)}
                style={{ flex: 1, background: "transparent", border: "none", borderBottom: "1px solid #2a4a6a", color: "var(--gold-light)", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, padding: "2px 4px", outline: "none" }}
              />
              <button className="del-btn" style={{ marginLeft: "auto" }} onClick={() => delDoc(di)}>
                Hapus Dokumen
              </button>
            </div>
            <div className="doc-config-body">
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "var(--text-muted)", letterSpacing: 1, marginBottom: 5 }}>
                FIELD DETAIL YANG HARUS DIISI LINI 1:
              </div>
              <div>
                {doc.fields.map((f, fi) => (
                  <span key={fi} className="field-chip">
                    {f}
                    <button onClick={() => delField(di, fi)}>×</button>
                  </span>
                ))}
              </div>
              <div className="field-input-row">
                <input
                  className="csa-input"
                  type="text"
                  placeholder="Nama field baru (contoh: Nama Nasabah)..."
                  value={newFieldInputs[di] || ""}
                  onChange={(e) => setNewFieldInputs((prev) => ({ ...prev, [di]: e.target.value }))}
                  onKeyDown={(e) => e.key === "Enter" && addField(di)}
                  style={{ fontSize: 11 }}
                />
                <button className="sm-add-btn" onClick={() => addField(di)}>
                  + Tambah Field
                </button>
              </div>
              <div style={{ marginTop: 8 }}>
                <label style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10.5, cursor: "pointer" }}>
                  <input type="checkbox" checked={doc.withUpload !== false} onChange={() => toggleUpload(di)} />
                  Upload file bukti
                </label>
              </div>
            </div>
          </div>
        ))}

        <div className="row-toolbar">
          <button className="add-btn" onClick={addDoc}>+ Tambah Dokumen</button>
        </div>
      </div>

      <button
        className="submit-btn"
        onClick={handlePublish}
        disabled={!controlId}
        style={{ marginBottom: 16 }}
      >
        ▶ Publish Kertas Kerja ke Lini 1
      </button>
    </div>
  );
}
