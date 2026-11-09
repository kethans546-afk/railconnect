# -*- coding: utf-8 -*-
"""
Full 37-Page Academic Engineering Project Report Builder for RAILCONNECT
SRM Institute of Science and Technology
Authors: S Kethan (RA2511026050134) & B Balaji (RA2511026050179)
"""

import os

HTML_OUTPUT = r"C:\Users\V CHETAN\.gemini\antigravity\scratch\railconnect-workspace\RAILCONNECT_PROJECT_REPORT_37_PAGES.html"
MD_OUTPUT = r"C:\Users\V CHETAN\.gemini\antigravity\scratch\railconnect-workspace\RAILCONNECT_PROJECT_REPORT_37_PAGES.md"
ARTIFACT_OUTPUT = r"C:\Users\V CHETAN\.gemini\antigravity\brain\7b915978-f194-4040-8f61-6787844bbe78\railconnect_academic_project_report_37_pages.md"

def get_srm_svg():
    return '''<svg width="140" height="140" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" style="display:block; margin:0 auto 12px auto;">
  <defs>
    <linearGradient id="srmBlue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a2540"/>
      <stop offset="100%" stop-color="#1e3a8a"/>
    </linearGradient>
    <linearGradient id="srmGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#b45309"/>
      <stop offset="50%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
  </defs>
  <circle cx="150" cy="150" r="142" fill="#ffffff" stroke="url(#srmBlue)" stroke-width="8"/>
  <circle cx="150" cy="150" r="130" fill="none" stroke="url(#srmGold)" stroke-width="3"/>
  <circle cx="150" cy="150" r="102" fill="url(#srmBlue)" stroke="none"/>
  
  <path id="topArc" d="M 35,150 A 115,115 0 1,1 265,150" fill="none"/>
  <text font-family="'Times New Roman', serif" font-weight="bold" font-size="13.5" fill="#0a2540" letter-spacing="1.2">
    <textPath href="#topArc" startOffset="50%" text-anchor="middle">
      SRM INSTITUTE OF SCIENCE &amp; TECHNOLOGY
    </textPath>
  </text>
  
  <path id="bottomArc" d="M 265,150 A 115,115 0 0,1 35,150" fill="none"/>
  <text font-family="'Times New Roman', serif" font-weight="bold" font-size="10.5" fill="#991b1b" letter-spacing="0.8">
    <textPath href="#bottomArc" startOffset="50%" text-anchor="middle">
      (Deemed to be University u/s 3 of UGC Act, 1956)
    </textPath>
  </text>
  
  <!-- Sun Rays -->
  <g stroke="url(#srmGold)" stroke-width="2.5">
    <line x1="150" y1="65" x2="150" y2="78"/>
    <line x1="125" y1="72" x2="132" y2="82"/>
    <line x1="175" y1="72" x2="168" y2="82"/>
    <line x1="105" y1="90" x2="116" y2="97"/>
    <line x1="195" y1="90" x2="184" y2="97"/>
  </g>
  <circle cx="150" cy="98" r="18" fill="url(#srmGold)"/>
  
  <!-- Book of Knowledge -->
  <path d="M 150,145 Q 120,135 90,140 L 90,168 Q 120,162 150,172 Q 180,162 210,168 L 210,140 Q 180,135 150,145 Z" fill="#ffffff" stroke="url(#srmGold)" stroke-width="2"/>
  <line x1="150" y1="145" x2="150" y2="172" stroke="#0a2540" stroke-width="2"/>
  
  <!-- Technology Orbits -->
  <circle cx="150" cy="198" r="16" fill="none" stroke="url(#srmGold)" stroke-width="3" stroke-dasharray="4 2"/>
  <ellipse cx="150" cy="198" rx="26" ry="9" fill="none" stroke="#ffffff" stroke-width="1.5" transform="rotate(-25 150 198)"/>
  <ellipse cx="150" cy="198" rx="26" ry="9" fill="none" stroke="#ffffff" stroke-width="1.5" transform="rotate(25 150 198)"/>
  <circle cx="150" cy="198" r="4" fill="url(#srmGold)"/>

  <!-- Motto Banner -->
  <path d="M 95,228 L 205,228 L 195,242 L 105,242 Z" fill="url(#srmGold)"/>
  <text x="150" y="238" font-family="'Times New Roman', serif" font-size="9" font-weight="bold" fill="#0a2540" text-anchor="middle" letter-spacing="1">LEARN . LEAP . LEAD</text>
</svg>'''

print("Base helper loaded.")
