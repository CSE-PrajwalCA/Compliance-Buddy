/* content.js — Compliance Buddy (Updated for single validation button flow)
   --------------------------------------------------------------
   - Scrapes checklist questions from vendor webpage.
   - Sends checklist to backend for AI-based suggestions.
   - Waits for popup message “START_VALIDATION” to collect all uploaded evidence files.
   - Sends all files to backend in one bulk request.
   - Receives verdict JSON (mapped question-wise) and overlays results.
*/

/* CONFIG */
const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB limit
const OVERLAY_CLASS = "cb-overlay-badge";

/* ---------- 1) Checklist Detection ---------- */
function findChecklistContainers() {
  const selectors = ["form", ".checklist", ".question", "[data-cb-qid]"];
  const found = new Set();
  selectors.forEach((sel) => document.querySelectorAll(sel).forEach((el) => found.add(el)));
  return Array.from(found);
}

function extractQuestions(container) {
  const questions = [];
  container.querySelectorAll(".question, [data-cb-qid]").forEach((el, i) => {
    const id = el.getAttribute("data-cb-qid") || `q${i + 1}`;
    el.setAttribute("data-cb-qid", id);
    questions.push({
      question_id: id,
      question_text: (el.innerText || "").trim(),
    });
  });
  return questions;
}

/* ---------- 2) Overlay UI Utilities ---------- */
function ensureOverlayStyle() {
  if (document.getElementById("cb-overlay-styles")) return;
  const style = document.createElement("style");
  style.id = "cb-overlay-styles";
  style.textContent = `
    .${OVERLAY_CLASS} {
      position: absolute;
      z-index: 2147483647;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 8px;
      border-radius: 6px;
      font-family: system-ui, Arial, sans-serif;
      font-size: 12px;
      color: white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    .cb-badge-pass { background: #16a34a; }
    .cb-badge-partial { background: #eab308; }
    .cb-badge-fail { background: #dc2626; }
    .cb-badge-info { background: #2563eb; }
    .cb-tooltip {
      display:block;
      font-size: 12px;
      background: rgba(255,255,255,0.98);
      color: #111;
      padding: 8px;
      border-radius: 6px;
      box-shadow: 0 6px 16px rgba(0,0,0,0.15);
      max-width: 360px;
    }
  `;
  document.head.appendChild(style);
}

function placeBadgeForElement(el, status, tooltipHtml, score) {
  ensureOverlayStyle();
  removeBadgeForElement(el);
  const rect = el.getBoundingClientRect();
  const badge = document.createElement("div");
  badge.className = `${OVERLAY_CLASS} ${statusToClass(status)}`;
  badge.setAttribute("data-cb-target", el.getAttribute("data-cb-qid"));
  badge.style.top = `${window.scrollY + Math.max(0, rect.top - 6)}px`;
  badge.style.left = `${window.scrollX + Math.min(document.documentElement.clientWidth - 200, rect.right + 6)}px`;
  badge.style.minWidth = "120px";

  badge.innerText = `${statusIcon(status)} ${statusLabel(status)}`;
  if (score) badge.innerText += ` (${score}%)`;

  badge.addEventListener("mouseenter", () => showTooltip(badge, tooltipHtml));
  badge.addEventListener("mouseleave", () => hideTooltip(badge));

  document.body.appendChild(badge);
  el.__cb_badge = badge;
}

function removeBadgeForElement(el) {
  if (el && el.__cb_badge) {
    el.__cb_badge.remove();
    delete el.__cb_badge;
  }
}

function showTooltip(parentBadge, html) {
  hideTooltip(parentBadge);
  const tip = document.createElement("div");
  tip.className = "cb-tooltip";
  tip.innerHTML = html || "<i>No details</i>";
  tip.style.position = "absolute";
  tip.style.top = `${parentBadge.getBoundingClientRect().bottom + window.scrollY + 6}px`;
  tip.style.left = `${parentBadge.getBoundingClientRect().left + window.scrollX}px`;
  parentBadge.__cb_tooltip = tip;
  document.body.appendChild(tip);
}

function hideTooltip(parentBadge) {
  if (parentBadge.__cb_tooltip) {
    parentBadge.__cb_tooltip.remove();
    delete parentBadge.__cb_tooltip;
  }
}

function statusToClass(status) {
  const s = (status || "").toLowerCase();
  if (s === "pass") return "cb-badge-pass";
  if (s === "partial") return "cb-badge-partial";
  if (s === "fail") return "cb-badge-fail";
  return "cb-badge-info";
}
function statusIcon(status) {
  const s = (status || "").toLowerCase();
  return s === "pass" ? "✅" : s === "partial" ? "⚠️" : s === "fail" ? "❌" : "ℹ️";
}
function statusLabel(status) {
  const s = (status || "").toLowerCase();
  return s === "pass" ? "Pass" : s === "partial" ? "Partial" : s === "fail" ? "Fail" : "Info";
}

/* ---------- 3) Checklist Scanning + Suggestion Phase ---------- */
async function sendChecklistToBackend(checklist) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      { type: "ANALYZE_CHECKLIST", payload: { checklist, page_url: window.location.href } },
      (resp) => resolve(resp || {})
    );
  });
}

async function runChecklistScan() {
  const containers = findChecklistContainers();
  if (!containers.length) return;
  let questions = [];
  containers.forEach((c) => (questions = questions.concat(extractQuestions(c))));
  if (!questions.length) return;
  window.__cb_checklist = questions;

  // Show analyzing badges
  questions.forEach((q) => {
    const el = document.querySelector(`[data-cb-qid="${q.question_id}"]`);
    if (el) placeBadgeForElement(el, "info", "Analyzing...", null);
  });

  const resp = await sendChecklistToBackend(questions);
  const suggestions = resp.suggestions || [];

  suggestions.forEach((s) => {
    const el = document.querySelector(`[data-cb-qid="${s.question_id}"]`);
    if (!el) return;
    const html = `<b>Suggestion:</b> ${escapeHtml(s.recommended_answer || "N/A")}<br>${escapeHtml(
      s.reasoning || ""
    )}`;
    placeBadgeForElement(
      el,
      s.recommended_answer?.toLowerCase() === "yes" ? "pass" : "partial",
      html,
      s.confidence ? Math.round(s.confidence * 100) : undefined
    );
  });
}

/* ---------- 4) Evidence Validation (Bulk Upload Triggered from Popup) ---------- */
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === "START_VALIDATION") {
    console.log("[ComplianceBuddy] Starting evidence validation...");

    const evidenceInput = document.querySelector("#common-evidence");
    if (!evidenceInput) {
      alert("No evidence upload section found on this page.");
      return;
    }

    const files = Array.from(evidenceInput.files || []);
    if (!files.length) {
      alert("Please upload evidence documents first.");
      return;
    }

    // Prepare file data
    const fileBuffers = await Promise.all(files.map((f) => f.arrayBuffer()));
    const payload = files.map((f, i) => ({
      filename: f.name,
      filetype: f.type,
      file: fileBuffers[i],
    }));

    // Send to background for backend upload
    chrome.runtime.sendMessage({ type: "VALIDATE_BULK_EVIDENCE", payload }, (resp) => {
      if (!resp || resp.error) {
        console.error("Evidence validation error", resp?.error);
        alert("Validation failed. Check console logs.");
        return;
      }

      const results = resp.results || [];
      results.forEach((r) => {
        const el = document.querySelector(`[data-cb-qid="${r.question_id}"]`);
        if (el) {
          const html = `<b>Explanation:</b> ${escapeHtml(r.explanation || "")}<br><b>Recommendation:</b> ${escapeHtml(
            r.recommendation || ""
          )}`;
          placeBadgeForElement(el, r.verdict, html, r.score);
        }
      });
    });
  }
});

/* ---------- 5) Misc Helpers ---------- */
function escapeHtml(s) {
  if (!s) return "";
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ---------- 6) Auto-run scan ---------- */
window.addEventListener("load", () => setTimeout(runChecklistScan, 800));
