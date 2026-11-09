# -*- coding: utf-8 -*-
"""
Master Builder for RAILCONNECT 37-Page Academic Project Report
SRM Institute of Science and Technology
Students:
- S Kethan (RA2511026050134)
- B Balaji (RA2511026050179)
"""

import os
import sys

# Paths
WORKSPACE = r"C:\Users\V CHETAN\.gemini\antigravity\scratch\railconnect-workspace"
HTML_PATH = os.path.join(WORKSPACE, "RAILCONNECT_PROJECT_REPORT_37_PAGES.html")
MD_PATH = os.path.join(WORKSPACE, "RAILCONNECT_PROJECT_REPORT_37_PAGES.md")
ARTIFACT_DIR = r"C:\Users\V CHETAN\.gemini\antigravity\brain\7b915978-f194-4040-8f61-6787844bbe78"
ARTIFACT_PATH = os.path.join(ARTIFACT_DIR, "railconnect_academic_project_report_37_pages.md")

sys.path.insert(0, WORKSPACE)

import make_report_p1_7
import make_report_p8_15
import make_report_p16_25
import make_report_p26_37

pages = []

# Pages 1 to 7
for item in make_report_p1_7.PAGES:
    pages.append(item)

# Pages 8 to 15
for item in make_report_p8_15.P8_15:
    pages.append(item)

# Pages 16 to 25
for item in make_report_p16_25.P16_25:
    pages.append(item)

# Pages 26 to 37
for item in make_report_p26_37.P26_37:
    pages.append(item)

print(f"Total collected pages: {len(pages)}")
assert len(pages) == 37, f"Expected 37 pages, got {len(pages)}"

# Construct HTML Document
html_head = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>RAILCONNECT - Academic Project Report (37 Pages) - SRM IST</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js" onload="renderMathInElement(document.body);"></script>
<style>
  @page {
    size: A4 portrait;
    margin: 12mm 15mm 15mm 15mm;
  }
  
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    background: #475569;
    font-family: 'Times New Roman', Times, serif;
    color: #0f172a;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Fixed Top Toolbar */
  .toolbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #0f172a;
    color: #ffffff;
    padding: 12px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 9999;
    font-family: system-ui, -apple-system, sans-serif;
  }
  .toolbar-title {
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .toolbar-actions {
    display: flex;
    gap: 12px;
  }
  .btn {
    background: #2563eb;
    color: white;
    border: none;
    padding: 8px 18px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .btn:hover {
    background: #1d4ed8;
  }
  .btn-gold {
    background: #d97706;
  }
  .btn-gold:hover {
    background: #b45309;
  }

  .report-container {
    padding-top: 70px;
    padding-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
  }

  /* Exactly A4 Sheet Container */
  .page {
    width: 210mm;
    min-height: 297mm;
    height: 297mm;
    background: #ffffff;
    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
    padding: 18mm 18mm 16mm 18mm;
    position: relative;
    page-break-after: always;
    page-break-inside: avoid;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }

  .page-content {
    flex: 1 1 auto;
    overflow: hidden;
  }

  .page-footer {
    flex: 0 0 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #cbd5e1;
    padding-top: 4px;
    font-size: 10.5px;
    color: #64748b;
    font-family: 'Times New Roman', serif;
  }

  .page-footer .left {
    font-weight: 600;
    color: #1e3a8a;
  }

  .page-footer .center {
    font-style: italic;
  }

  .page-footer .right {
    font-weight: bold;
    color: #0f172a;
  }

  @media print {
    body {
      background: none;
    }
    .toolbar {
      display: none !important;
    }
    .report-container {
      padding: 0 !important;
      gap: 0 !important;
    }
    .page {
      box-shadow: none !important;
      margin: 0 !important;
      width: 100% !important;
      height: 100% !important;
      min-height: 297mm !important;
      padding: 14mm 15mm 14mm 15mm !important;
      page-break-after: always !important;
    }
  }
</style>
</head>
<body>

<div class="toolbar">
  <div class="toolbar-title">
    <span>🚆</span>
    <span>RAILCONNECT — 37-Page Academic Engineering Project Report (SRM IST)</span>
  </div>
  <div class="toolbar-actions">
    <button class="btn" onclick="window.print()">
      🖨️ Print / Save as PDF (37 Pages)
    </button>
    <a class="btn btn-gold" href="./RAILCONNECT_PROJECT_REPORT_37_PAGES.md" download>
      📄 Download Markdown (.md)
    </a>
  </div>
</div>

<div class="report-container">
'''

html_pages_list = []
md_content_list = []

for idx, p in enumerate(pages):
    page_num = idx + 1
    title = p.get("title", f"Page {page_num}")
    html_body = p.get("html", "")
    md_body = p.get("md", "")
    is_cover = (page_num == 1)

    footer_html = ""
    if not is_cover:
        footer_html = f'''
        <div class="page-footer">
          <span class="left">SRM IST &bull; Dept of CSE</span>
          <span class="center">RAILCONNECT Engineering Project Report</span>
          <span class="right">Page {page_num} of 37</span>
        </div>
        '''

    page_div = f'''
    <div class="page" id="page-{page_num}">
      <div class="page-content">
        {html_body}
      </div>
      {footer_html}
    </div>
    '''
    html_pages_list.append(page_div)

    # Markdown Accumulator
    md_page = f"""
<!-- PAGE {page_num} OF 37: {title.upper()} -->
<div style="page-break-after: always; padding-bottom: 20px;">

{md_body}

<div style="display:flex; justify-content:space-between; border-top:1px solid #ccc; font-size:11px; color:#666; padding-top:6px; margin-top:25px;">
  <span>SRM Institute of Science and Technology &bull; Dept. of CSE</span>
  <span>Page {page_num} of 37</span>
</div>
</div>
---
"""
    md_content_list.append(md_page)

html_tail = '''
</div>

<script>
  window.addEventListener('DOMContentLoaded', () => {
    if (typeof renderMathInElement === 'function') {
      renderMathInElement(document.body, {
        delimiters: [
          {left: '$$', right: '$$', display: true},
          {left: '$', right: '$', display: false}
        ]
      });
    }
  });
</script>
</body>
</html>
'''

full_html = html_head + "\n".join(html_pages_list) + html_tail

# Write HTML
with open(HTML_PATH, "w", encoding="utf-8") as f:
    f.write(full_html)

print(f"Generated HTML Report: {HTML_PATH} ({os.path.getsize(HTML_PATH):,} bytes)")

# Write MD
full_md = f"""# RAILCONNECT: Next-Generation Railway Transit & Dynamic Seat Reservation Platform
## Comprehensive Academic Engineering Project Report (37 Pages)
### SRM Institute of Science and Technology
**Department of Computer Science and Engineering**
**Academic Year 2025–2026**

**Project Authors:**
- **S Kethan** (Registration No: `RA2511026050134`)
- **B Balaji** (Registration No: `RA2511026050179`)

---

""" + "\n".join(md_content_list)

with open(MD_PATH, "w", encoding="utf-8") as f:
    f.write(full_md)
print(f"Generated Markdown Report: {MD_PATH} ({os.path.getsize(MD_PATH):,} bytes)")

# Write Artifact Copy
with open(ARTIFACT_PATH, "w", encoding="utf-8") as f:
    f.write(full_md)
print(f"Copied to Artifact Path: {ARTIFACT_PATH} ({os.path.getsize(ARTIFACT_PATH):,} bytes)")

print("\n--- ALL 37 PAGES SUCCESSFULLY COMPILED AND VERIFIED! ---")
