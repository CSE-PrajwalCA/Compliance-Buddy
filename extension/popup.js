/* popup.js — Compliance Buddy
   ----------------------------
   - Scans current page for checklist items
   - Displays them for user confirmation
   - Shows status of automatic file interception
*/

const statusLine = document.getElementById("status-line");
const scanBtn = document.getElementById("scan-btn");
const openDashBtn = document.getElementById("open-dashboard-btn");
const checklistList = document.getElementById("checklist-list");
const backendUrlEl = document.getElementById("backend-url");
const evidenceStatus = document.getElementById("evidence-status");

const BACKEND_BASE = "http://localhost:8000"; // must match background.js

/* ---------- 1️⃣ Open dashboard ---------- */
openDashBtn.addEventListener("click", () => {
  const dashUrl = "http://localhost:3000"; // Frontend React dashboard
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

/* ---------- 5️⃣ Listen for evidence upload events from content script ---------- */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "EVIDENCE_UPLOAD_DETECTED") {
    evidenceStatus.innerHTML = `<strong>⏳ Validating ${message.fileCount} file(s)...</strong>`;
    statusLine.innerText = "⏳ Evidence validation in progress";
  }
  
  if (message.type === "EVIDENCE_VALIDATION_COMPLETE") {
    const results = message.results || [];
    evidenceStatus.innerHTML = `<strong>✅ Validated ${results.length} evidence file(s)</strong>`;
    statusLine.innerText = "✅ Validation complete";
  }
  
  if (message.type === "EVIDENCE_VALIDATION_ERROR") {
    evidenceStatus.innerHTML = `<strong>❌ Validation failed: ${message.error}</strong>`;
    statusLine.innerText = "❌ Validation error";
  }
  
  sendResponse({ received: true });
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
