# 🔌 Extension Flow Documentation

## ✅ Fixed Architecture (Following Your Pipeline)

### **Step 1: User Activates Extension**
- User opens `sample_audit_page.html` in browser
- User clicks Compliance Buddy extension icon
- Extension automatically:
  - Detects checklist on page
  - Extracts questions with `data-cb-qid` attributes
  - Sends to backend `/analyze_controls`
  - Receives suggestions (RAG-based)
  - Overlays suggestion badges next to each question

### **Step 2: Suggestions Displayed**
Extension injects badges inline on the audit page:
- ✅ Green badge: Recommended answer is "Yes"
- ⚠️ Yellow badge: Partial/needs review
- 💡 Blue badge: Analyzing or informational
- Hover over badges to see full suggestions

### **Step 3: Evidence Upload Interception (AUTOMATIC)**
When user selects files in the audit page:
1. User clicks "Browse" on `#common-evidence` input
2. User selects files (PDF, DOCX, XLSX, etc.)
3. **Extension automatically intercepts** the file selection
4. Extension:
   - Captures file copies
   - Sends to backend `/validate_evidence_bulk`
   - Receives verdicts with scores
   - Overlays verdict badges next to questions

**No manual trigger needed!** Extension watches the file input.

### **Step 4: Real-time Verdict Display**
- ✅ Pass (green): Evidence validates the control
- ⚠️ Partial (yellow): Partial compliance
- ❌ Fail (red): Non-compliant
- Hover for detailed explanation + recommendations

---

## 📁 File Changes Made

### `extension/popup.html`
- ❌ **Removed**: File upload section
- ✅ **Added**: Evidence status display
- Shows real-time status updates from content script

### `extension/popup.js`
- ❌ **Removed**: Bulk upload validation logic
- ✅ **Added**: Message listeners for evidence upload events
- Displays: "⏳ Validating X files..." → "✅ Validated X files"

### `extension/content.js`
- ❌ **Removed**: `START_VALIDATION` message handler
- ✅ **Added**: Automatic file interceptor (`setupFileInterceptor()`)
- Listens to `#common-evidence` input's `change` event
- Automatically triggers validation when files are selected
- Sends progress updates to popup
- Overlays badges in real-time

### `sample_audit_page.html`
- ✅ **Enhanced**: Validate button now triggers change event
- ✅ **Added**: Debug console logs for testing
- ✅ **Added**: Professional audit portal design

---

## 🔄 Complete Flow Diagram

```
┌─────────────────────────────────────────────────┐
│  User opens sample_audit_page.html              │
└───────────────┬─────────────────────────────────┘
                ▼
┌─────────────────────────────────────────────────┐
│  User clicks Extension Icon                     │
└───────────────┬─────────────────────────────────┘
                ▼
┌─────────────────────────────────────────────────┐
│  content.js: Scrapes checklist                  │
│  - Finds all .question[data-cb-qid]             │
│  - Extracts: {question_id, question_text}       │
└───────────────┬─────────────────────────────────┘
                ▼
┌─────────────────────────────────────────────────┐
│  background.js → Backend: /analyze_controls     │
│  Payload: [{question_id, question_text}]        │
└───────────────┬─────────────────────────────────┘
                ▼
┌─────────────────────────────────────────────────┐
│  Backend: RAG Processing                        │
│  - Retrieves relevant compliance context        │
│  - Generates suggestions for each question      │
└───────────────┬─────────────────────────────────┘
                ▼
┌─────────────────────────────────────────────────┐
│  Response: [{question_id, suggestion, ...}]     │
└───────────────┬─────────────────────────────────┘
                ▼
┌─────────────────────────────────────────────────┐
│  content.js: Overlay suggestion badges          │
│  - Finds element by data-cb-qid                 │
│  - Injects badge with tooltip                   │
└─────────────────────────────────────────────────┘
                │
                │ User sees suggestions ✅
                ▼
┌─────────────────────────────────────────────────┐
│  User selects evidence files on audit page      │
│  (Clicks browse on #common-evidence)            │
└───────────────┬─────────────────────────────────┘
                ▼
┌─────────────────────────────────────────────────┐
│  content.js: AUTOMATIC INTERCEPTION              │
│  - change event fires on #common-evidence       │
│  - setupFileInterceptor() captures files        │
│  - Reads files as ArrayBuffer                   │
└───────────────┬─────────────────────────────────┘
                ▼
┌─────────────────────────────────────────────────┐
│  content.js → popup: EVIDENCE_UPLOAD_DETECTED   │
│  Popup shows: "⏳ Validating X files..."         │
└─────────────────────────────────────────────────┘
                ▼
┌─────────────────────────────────────────────────┐
│  content.js → background.js                     │
│  Message: VALIDATE_BULK_EVIDENCE                │
│  Payload: [{filename, filetype, file}]          │
└───────────────┬─────────────────────────────────┘
                ▼
┌─────────────────────────────────────────────────┐
│  background.js → Backend: /validate_evidence_bulk│
│  FormData with all files                        │
└───────────────┬─────────────────────────────────┘
                ▼
┌─────────────────────────────────────────────────┐
│  Backend: Full AI Pipeline                      │
│  1. Parse files (pdfplumber, docx, OCR)         │
│  2. Structure data (Llama3 parse mode)          │
│  3. RAG retrieval (compliance rules)            │
│  4. Reason (Llama3 verdict mode)                │
│  5. Track emissions (CodeCarbon)                │
└───────────────┬─────────────────────────────────┘
                ▼
┌─────────────────────────────────────────────────┐
│  Response: [{question_id, verdict, score,       │
│              explanation, recommendation}]      │
└───────────────┬─────────────────────────────────┘
                ▼
┌─────────────────────────────────────────────────┐
│  content.js: Overlay verdict badges             │
│  - Updates badges with verdicts                 │
│  - Shows Pass/Fail/Partial with scores          │
│  - Tooltip with explanation                     │
└───────────────┬─────────────────────────────────┘
                ▼
┌─────────────────────────────────────────────────┐
│  content.js → popup: EVIDENCE_VALIDATION_COMPLETE│
│  Popup shows: "✅ Validated X files"             │
└─────────────────────────────────────────────────┘
                ▼
┌─────────────────────────────────────────────────┐
│  User sees real-time verdicts on page ✅        │
└─────────────────────────────────────────────────┘
```

---

## 🧪 How to Test (Without Backend)

### 1. Load Extension in Chrome
```bash
1. Open Chrome → chrome://extensions/
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select: /path/to/Compliance-Buddy/extension
```

### 2. Open Audit Page
```bash
# In browser, navigate to:
http://localhost:8080/sample_audit_page.html
```

### 3. Activate Extension
```bash
1. Click Compliance Buddy extension icon
2. Click "🔍 Scan Page"
3. Check console logs for:
   - "[Audit Page] Questions: ..."
   - "[ComplianceBuddy] File interceptor attached"
```

### 4. Test File Interception
```bash
1. On audit page, click "Browse" under evidence section
2. Select any file(s)
3. Check console for:
   - "[Audit Page] File input changed, files: ..."
   - "[ComplianceBuddy] Intercepted X file(s): ..."
4. Extension will attempt to send to backend (will fail if backend not running)
```

---

## 🔑 Key Variable Names (Maintained)

- `question_number` / `question_id` → `data-cb-qid` (e.g., "q1", "q2")
- `question` / `question_text` → Label text from `.question`
- `suggestion` → RAG-generated suggestion from backend
- `common-evidence` → File input ID on audit page
- `verdict` → Pass/Partial/Fail from backend
- `score` → Compliance score (0-100)
- `explanation` → Why the verdict was given
- `recommendation` → What to do next

---

## 📊 JSON Structure Examples

### Request to `/analyze_controls`
```json
{
  "checklist": [
    {"question_id": "q1", "question_text": "Have you determined..."},
    {"question_id": "q2", "question_text": "Are the information security..."}
  ],
  "page_url": "http://localhost:8080/sample_audit_page.html"
}
```

### Response from `/analyze_controls`
```json
{
  "suggestions": [
    {
      "question_id": "q1",
      "question_text": "Have you determined...",
      "suggestion": "Document SWOT analysis and risk assessment",
      "recommended_answer": "Yes",
      "reasoning": "ISO 27001 Clause 4.1 requires...",
      "confidence": 0.92
    }
  ]
}
```

### Response from `/validate_evidence_bulk`
```json
{
  "results": [
    {
      "question_id": "q1",
      "verdict": "Pass",
      "score": 94,
      "explanation": "Evidence shows documented SWOT analysis...",
      "recommendation": "Update annually",
      "emissions": 0.0021
    }
  ]
}
```

---

## ✅ Compliance with Your Architecture

| Requirement | Implementation |
|-------------|----------------|
| Extension detects checklist | ✅ Auto-scans on load |
| Extracts question text | ✅ From `.question[data-cb-qid]` |
| Sends to backend for suggestions | ✅ `/analyze_controls` |
| Overlays suggestions inline | ✅ Badge injection |
| Intercepts file uploads | ✅ Automatic `change` listener |
| Captures file copy | ✅ ArrayBuffer capture |
| Sends to backend with question_id | ✅ `/validate_evidence_bulk` |
| Overlays verdicts | ✅ Real-time badge updates |
| No popup file upload | ✅ Removed |

---

## 🚀 Next Steps

1. **Build Backend**: FastAPI server with endpoints
2. **Implement RAG**: Knowledge base for suggestions
3. **Integrate Llama3**: Parse + Reason modes
4. **Add CodeCarbon**: Track emissions
5. **Connect Frontend Dashboard**: Sync JSON data
6. **Test End-to-End**: Full pipeline validation

---

**Built for Green Mind Hackathon 2025** 🌱
