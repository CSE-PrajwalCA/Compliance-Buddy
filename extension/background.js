/* background.js — Compliance Buddy (Manifest V3 service worker)
   -------------------------------------------------------------
   - Handles messages from popup and content scripts.
   - Communicates with local FastAPI backend.
   - Supports:
        1️⃣ Checklist analysis (no evidence)
        2️⃣ Bulk evidence validation (multi-file upload)
*/

const BACKEND_BASE = "http://localhost:8000"; // Change if backend runs elsewhere
const ANALYZE_ENDPOINT = `${BACKEND_BASE}/analyze_controls`;
const VALIDATE_BULK_ENDPOINT = `${BACKEND_BASE}/validate_evidence_bulk`;

/* ---------- Helper: Upload multiple files ---------- */
async function uploadBulkEvidence(filesPayload) {
  const fd = new FormData();

  // append each file
  for (const f of filesPayload) {
    const blob = new Blob([f.file], { type: f.filetype || "application/octet-stream" });
    fd.append("files", blob, f.filename);
  }

  // optional metadata (could include timestamp or URL)
  const meta = { page_url: "N/A", timestamp: new Date().toISOString() };
  fd.append("meta", JSON.stringify(meta));

  const resp = await fetch(VALIDATE_BULK_ENDPOINT, {
    method: "POST",
    body: fd
  });

  if (!resp.ok) throw new Error(`Backend error: ${resp.status}`);
  return await resp.json();
}

/* ---------- Helper: Analyze checklist ---------- */
async function analyzeChecklist(payload) {
  const resp = await fetch(ANALYZE_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!resp.ok) throw new Error(`Analyze failed: ${resp.status}`);
  return await resp.json();
}

/* ---------- Message Listener ---------- */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message || !message.type) {
    sendResponse({ error: "no_message_type" });
    return true;
  }

  (async () => {
    try {
      /* 1️⃣ Analyze checklist text (pre-validation) */
      if (message.type === "ANALYZE_CHECKLIST") {
        const data = await analyzeChecklist(message.payload);
        sendResponse(data);
        return;
      }

      /* 2️⃣ Validate all evidence in one go */
      if (message.type === "VALIDATE_BULK_EVIDENCE") {
        console.log("[Background] Bulk evidence validation triggered");
        const filesPayload = message.payload || [];
        const results = await uploadBulkEvidence(filesPayload);
        sendResponse(results);
        return;
      }

      /* fallback */
      sendResponse({ ok: true });
    } catch (err) {
      console.error("Background handler error:", err);
      sendResponse({ error: err.message || "unknown error" });
    }
  })();

  return true; // Keep the message channel open for async response
});
