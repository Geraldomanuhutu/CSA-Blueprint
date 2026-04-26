import { useState } from "react";
import "./styles.css";
import { CONTROL_DATA } from "./data";
import { Topbar } from "./components/shared";
import AdminView from "./components/AdminView";
import Lini1View from "./components/Lini1View";

// Default config untuk Lini 1 (sebelum admin publish)
const DEFAULT_CONFIG = {
  controlId: "ULM-12-02",
  header: {
    namaAktivitas: CONTROL_DATA["ULM-12-02"].namaAktivitas,
    deskripsi: CONTROL_DATA["ULM-12-02"].deskripsi,
    periode: CONTROL_DATA["ULM-12-02"].periode,
  },
  atributList: CONTROL_DATA["ULM-12-02"].atribut,
  docList: CONTROL_DATA["ULM-12-02"].dokumen,
};

export default function App() {
  const [mode, setMode] = useState("admin");
  // Config yang dipublish admin → diteruskan ke Lini1View
  const [publishedConfig, setPublishedConfig] = useState(DEFAULT_CONFIG);

  const handlePublish = (payload) => {
    setPublishedConfig(payload);
    setMode("lini1");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="shell">
      <Topbar />

      {/* Mode Switcher — untuk demo/presentasi */}
      <div className="mode-bar">
        <button
          className={`mode-btn ${mode === "admin" ? "active-admin" : ""}`}
          onClick={() => setMode("admin")}
        >
          ▶ Tampilan Admin
        </button>
        <button
          className={`mode-btn ${mode === "lini1" ? "active-lini1" : ""}`}
          onClick={() => setMode("lini1")}
        >
          ▶ Tampilan Lini 1
        </button>
        <span className="mode-lbl">Toggle untuk presentasi</span>
      </div>

      {mode === "admin" ? (
        <AdminView onPublish={handlePublish} />
      ) : (
        <Lini1View config={publishedConfig} />
      )}
    </div>
  );
}
