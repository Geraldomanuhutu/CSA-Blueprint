// ─────────────────────────────────────────────────────────────────────────────
// SHARED COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

export function Topbar() {
  return (
    <div className="topbar">
      <span className="topbar-logo">PNM</span>
      <div className="topbar-divider" />
      <span className="topbar-title">OPERA — Internal Control System</span>
      <span className="topbar-sub">CSA MODULE v2.4.1 | ICoFR FRAMEWORK</span>
    </div>
  );
}

export function ModHeader({ subtitle }) {
  return (
    <div className="mod-header">
      <div className="mod-tag">CSA</div>
      <div>
        <div className="mod-title">
          Control Self-Assessment — Lembar Pengujian Pengendalian
        </div>
        <div className="mod-sub">
          {subtitle || "RISK & COMPLIANCE DIVISION · TEST OF ONE · PERIODE: 2025"}
        </div>
      </div>
    </div>
  );
}

export function SectionLabel({ label }) {
  return <div className="sec-label">{label}</div>;
}

export function StatusBadge({ type, label }) {
  const cls = {
    pending: "badge-pending",
    pass: "badge-pass",
    fail: "badge-fail",
    "def-y": "badge-def-y",
    "def-t": "badge-def-t",
  }[type] || "badge-pending";
  return <span className={`badge ${cls}`}>{label}</span>;
}

export function KillSwitchFooter({ kesimpulan, dijawab, total, failCount }) {
  const footerClass = {
    pending: "footer-pending",
    efektif: "footer-efektif",
    "tidak-efektif": "footer-tidak",
  }[kesimpulan];

  const concValClass = {
    pending: "conc-val-pending",
    efektif: "conc-val-efektif",
    "tidak-efektif": "conc-val-tidak",
  }[kesimpulan];

  const progress = total > 0 ? Math.round((dijawab / total) * 100) : 0;

  return (
    <div className="footer-bar">
      <div className="footer-hdr">
        ▶ Kesimpulan Akhir — Kalkulasi Otomatis (Kill Switch Logic ICoFR)
      </div>
      <div className={`footer-body ${footerClass}`}>
        <div style={{ minWidth: 200 }}>
          <div className="conc-lbl">HASIL SELF ASSESSMENT</div>
          <div className={`conc-val ${concValClass}`}>
            {kesimpulan === "pending" && "— BELUM DINILAI"}
            {kesimpulan === "efektif" && "✓ EFEKTIF"}
            {kesimpulan === "tidak-efektif" && "✕ TIDAK EFEKTIF"}
          </div>
          <div className="conc-meta">
            {dijawab} dari {total} atribut telah dinilai
          </div>
          <div className="progress-wrap">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {kesimpulan !== "pending" && (
          <div
            className={`conc-note ${
              kesimpulan === "efektif" ? "conc-note-efektif" : "conc-note-tidak"
            }`}
          >
            {kesimpulan === "efektif"
              ? "Seluruh atribut pengendalian terpenuhi. Tidak ditemukan defisiensi. Pengendalian dinyatakan EFEKTIF sesuai standar ICoFR."
              : `Ditemukan ${failCount} atribut yang TIDAK terpenuhi. Pengendalian dinyatakan TIDAK EFEKTIF. Wajib dilaporkan kepada Risk Owner untuk tindak lanjut segera.`}
          </div>
        )}
      </div>
    </div>
  );
}
