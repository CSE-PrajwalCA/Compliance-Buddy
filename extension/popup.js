/* popup.js — Compliance Buddy
   ----------------------------
   - Scans current page for checklist items
   - Displays them for user confirmation
   - Lets user upload multiple evidence files (bulk)
   - Sends evidence to backend via background.js
*/

const statusLine = document.getElementById("status-line");
const scanBtn = document.getElementById("scan-btn");
const openDashBtn = document.getElementById("open-dashboard-btn");
const checklistList = document.getElementById("checklist-list");
const backendUrlEl = document.getElementById("backend-url");
const uploadFilesInput = document.getElementById("popup-files");
const validateBtn = document.getElementById("validate-btn");
const uploadResult = document.getElementById("upload-result");

const BACKEND_BASE = "http://localhost:8000"; // must match background.js

/* ---------- 1️⃣ Open dashboard ---------- */
openDashBtn.addEventListener("click", () => {
  const dashUrl = `${BACKEND_BASE}/dashboard`;
  chrome.tabs.create({ url: dashUrl });
});

/* ---------- 2️⃣ Scan current tab for checklist ---------- */
scanBtn.addEventListener("click", async () => {
  statusLine.innerText = "🔍 Scanning page...";
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) return;

  chrome.tabs.sendMessage(tab.id, { type: "RUN_SCAN_NOW" }, () => {
    setTimeout(() => fetchChecklistFromPage(tab.id), 400);
  });
});

/* ---------- 3️⃣ Fetch checklist from page (via window var) ---------- */
async function fetchChecklistFromPage(tabId) {
  chrome.scripting.executeScript(
    {
      target: { tabId },
      func: () => window.__cb_last_checklist || [],
    },
    (results) => {
      const checklist = results?.[0]?.result || [];
      if (checklist.length === 0) {
        checklistList.innerHTML = "<em>No checklist found.</em>";
        statusLine.innerText = "❌ No checklist detected";
        return;
      }
      renderChecklist(checklist);
      statusLine.innerText = `✅ Found ${checklist.length} items`;
    }
  );
}

/* ---------- 4️⃣ Render checklist text ---------- */
function renderChecklist(items) {
  checklistList.innerHTML = "";
  items.forEach((q) => {
    const row = document.createElement("div");
    row.className = "cl-row";
    row.innerHTML = `<div class="cl-text">${escapeHtml(q.question_text)}</div>
                     <div class="cl-id">${q.question_id}</div>`;
    checklistList.appendChild(row);
  });
}

/* ---------- 5️⃣ Validate evidence (bulk upload) ---------- */
validateBtn.addEventListener("click", async () => {
  const files = Array.from(uploadFilesInput.files || []);
  if (files.length === 0) {
    uploadResult.innerText = "⚠️ Please select one or more files.";
    return;
  }

  statusLine.innerText = "⏳ Uploading and validating evidence...";
  uploadResult.innerText = "";

  const filePayloads = [];
  for (const f of files) {
    const ab = await f.arrayBuffer();
    filePayloads.push({
      filename: f.name,
      filetype: f.type,
      file: ab,
    });
  }

  chrome.runtime.sendMessage(
    {
      type: "VALIDATE_BULK_EVIDENCE",
      payload: filePayloads,
    },
    (resp) => {
      if (!resp) {
        uploadResult.innerText = "❌ No response from backend.";
        statusLine.innerText = "Validation failed.";
        return;
      }

      if (resp.error) {
        uploadResult.innerText = "❌ Error: " + resp.error;
        statusLine.innerText = "Validation error.";
        return;
      }

      // Expected resp.results = [ {checklist_id, verdict, score, explanation, recommendation} ]
      const results = resp.results || [];
      uploadResult.innerText = `✅ ${results.length} evidence files validated.`;

      // Apply verdicts to content page if applicable
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs?.[0]?.id;
        if (!tabId) return;
        results.forEach((r) => {
          chrome.tabs.sendMessage(tabId, {
            type: "APPLY_VERDICT",
            payload: { question_id: r.checklist_id, verdict: r },
          });
        });
      });

      statusLine.innerText = "✅ Validation complete";
    }
  );
});

/* ---------- helpers ---------- */
function escapeHtml(s) {
  if (!s) return "";
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}

/* ---------- init ---------- */
backendUrlEl.innerText = BACKEND_BASE;
document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || !tabs[0]) return;
    fetchChecklistFromPage(tabs[0].id);
  });
});
