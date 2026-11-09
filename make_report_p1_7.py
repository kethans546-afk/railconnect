# -*- coding: utf-8 -*-
"""
Full 37-Page Academic Engineering Project Report Generator for RAILCONNECT
Department of Computer Science and Engineering
SRM Institute of Science and Technology
Authors:
  - S Kethan (Reg. No: RA2511026050134)
  - B Balaji (Reg. No: RA2511026050179)
"""

import os
import sys
from report_svgs import get_srm_logo_svg, get_uml_page1_class_diagram_svg, get_uml_page2_sequence_svg, get_uml_page3_usecase_statemachine_svg

PAGES = []

def add_page(title, content_html, content_md, is_cover=False, is_uml=False):
    PAGES.append({
        "num": len(PAGES) + 1,
        "title": title,
        "html": content_html,
        "md": content_md,
        "is_cover": is_cover,
        "is_uml": is_uml
    })

# ==============================================================================
# PAGE 1: COVER / TITLE PAGE
# ==============================================================================
p1_html = f'''
<div style="text-align:center; padding: 20px 10px 0 10px;">
  {get_srm_logo_svg()}
  <h2 style="font-family:'Times New Roman', serif; font-size: 20px; font-weight: bold; color: #0a2540; margin: 5px 0; text-transform: uppercase; letter-spacing: 1px;">
    SRM INSTITUTE OF SCIENCE AND TECHNOLOGY
  </h2>
  <h4 style="font-family:'Times New Roman', serif; font-size: 13px; font-weight: 600; color: #8b0000; margin: 2px 0 15px 0;">
    (Deemed to be University Under Section 3 of UGC Act, 1956)<br/>
    Kattankulathur, Chengalpattu District, Tamil Nadu – 603203
  </h4>
  <div style="width: 80%; height: 2px; background: linear-gradient(90deg, #1e3a8a, #d97706, #1e3a8a); margin: 0 auto 20px auto;"></div>

  <p style="font-family:'Times New Roman', serif; font-size: 13px; font-style: italic; color: #475569; margin-bottom: 15px;">
    A MAJOR CAPSTONE ENGINEERING PROJECT REPORT
  </p>

  <h1 style="font-family:'Times New Roman', serif; font-size: 22px; font-weight: 900; color: #0f172a; line-height: 1.35; margin: 15px auto 20px auto; max-width: 780px; text-transform: uppercase; border-top: 1.5px solid #cbd5e1; border-bottom: 1.5px solid #cbd5e1; padding: 14px 0;">
    RAILCONNECT: NEXT-GENERATION UNIFIED ENTERPRISE RAILWAY RESERVATION, DIGITAL TRAVEL PASS &amp; INTELLIGENT PASSENGER OPERATIONS PLATFORM
  </h1>

  <p style="font-family:'Times New Roman', serif; font-size: 13px; color: #334155; margin: 20px 0 15px 0;">
    Submitted in partial fulfillment of the requirements for the award of degree of<br/>
    <strong style="font-size: 15px; color: #0a2540;">BACHELOR OF TECHNOLOGY</strong><br/>
    IN<br/>
    <strong style="font-size: 14px; color: #0a2540;">COMPUTER SCIENCE AND ENGINEERING</strong>
  </p>

  <div style="margin: 30px auto; max-width: 650px; background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 18px;">
    <p style="font-family:'Times New Roman', serif; font-size: 13px; font-weight: bold; color: #475569; text-transform: uppercase; margin-bottom: 10px; letter-spacing: 0.5px;">Submitted by:</p>
    <table style="width: 100%; border-collapse: collapse; font-family:'Times New Roman', serif; font-size: 14.5px;">
      <tr>
        <td style="text-align: left; padding: 6px 15px; font-weight: bold; color: #0a2540; font-size: 16px;">S KETHAN</td>
        <td style="text-align: right; padding: 6px 15px; font-family: monospace; font-weight: bold; color: #1e3a8a; font-size: 15px;">RA2511026050134</td>
      </tr>
      <tr>
        <td style="text-align: left; padding: 6px 15px; font-weight: bold; color: #0a2540; font-size: 16px;">B BALAJI</td>
        <td style="text-align: right; padding: 6px 15px; font-family: monospace; font-weight: bold; color: #1e3a8a; font-size: 15px;">RA2511026050179</td>
      </tr>
    </table>
  </div>

  <p style="font-family:'Times New Roman', serif; font-size: 13px; color: #334155; margin-top: 30px;">
    <strong>DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING</strong><br/>
    COLLEGE OF ENGINEERING AND TECHNOLOGY<br/>
    <strong>SRM INSTITUTE OF SCIENCE AND TECHNOLOGY</strong><br/>
    OCTOBER 2026
  </p>
</div>
'''

p1_md = '''# RAILCONNECT: NEXT-GENERATION UNIFIED ENTERPRISE RAILWAY RESERVATION, DIGITAL TRAVEL PASS & INTELLIGENT PASSENGER OPERATIONS PLATFORM

**SRM INSTITUTE OF SCIENCE AND TECHNOLOGY**  
*(Deemed to be University Under Section 3 of UGC Act, 1956)*  
Kattankulathur, Chengalpattu District, Tamil Nadu – 603203

A Major Capstone Engineering Project Report submitted in partial fulfillment of the requirements for the award of the degree of **Bachelor of Technology in Computer Science and Engineering**.

### Submitted by:
- **S KETHAN** (Register No: `RA2511026050134`)
- **B BALAJI** (Register No: `RA2511026050179`)

**Department of Computer Science and Engineering**  
College of Engineering and Technology  
SRM Institute of Science and Technology  
Academic Year: 2025–2026
'''

add_page("Title Page / Cover Page", p1_html, p1_md, is_cover=True)

# ==============================================================================
# PAGE 2: BONAFIDE CERTIFICATE
# ==============================================================================
p2_html = '''
<div style="padding: 30px 20px;">
  <h2 style="font-family:'Times New Roman', serif; font-size: 19px; font-weight: bold; text-align: center; color: #0a2540; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">
    SRM INSTITUTE OF SCIENCE AND TECHNOLOGY
  </h2>
  <h4 style="font-family:'Times New Roman', serif; font-size: 13px; text-align: center; color: #64748b; margin-top: 0; margin-bottom: 35px;">
    Kattankulathur, Chengalpattu District, Tamil Nadu – 603203<br/>
    Department of Computer Science and Engineering
  </h4>

  <h3 style="font-family:'Times New Roman', serif; font-size: 17px; font-weight: bold; text-align: center; color: #0f172a; text-transform: uppercase; text-decoration: underline; margin-bottom: 40px;">
    BONAFIDE CERTIFICATE
  </h3>

  <p style="font-family:'Times New Roman', serif; font-size: 14.5px; line-height: 1.85; text-align: justify; color: #1e293b; text-indent: 40px;">
    Certified that this project report titled <strong>“RAILCONNECT: NEXT-GENERATION UNIFIED ENTERPRISE RAILWAY RESERVATION, DIGITAL TRAVEL PASS &amp; INTELLIGENT PASSENGER OPERATIONS PLATFORM”</strong> is the bonafide work of <strong>S KETHAN (Reg. No: RA2511026050134)</strong> and <strong>B BALAJI (Reg. No: RA2511026050179)</strong> who carried out the major engineering project work under my supervision in partial fulfillment of the requirements for the award of the degree of <strong>Bachelor of Technology in Computer Science and Engineering</strong> at SRM Institute of Science and Technology, Kattankulathur.
  </p>

  <p style="font-family:'Times New Roman', serif; font-size: 14.5px; line-height: 1.85; text-align: justify; color: #1e293b; text-indent: 40px; margin-top: 25px;">
    The work embodied in this project report has not been submitted to any other University or Institution for the award of any other degree, diploma, or fellowship.
  </p>

  <div style="margin-top: 130px; display: flex; justify-content: space-between;">
    <div style="text-align: left; font-family:'Times New Roman', serif;">
      <div style="border-top: 1.5px solid #0f172a; width: 220px; margin-bottom: 6px;"></div>
      <strong style="font-size: 14px; color: #0f172a;">PROJECT GUIDE</strong><br/>
      <span style="font-size: 13px; color: #475569;">Assistant Professor</span><br/>
      <span style="font-size: 13px; color: #475569;">Department of CSE</span><br/>
      <span style="font-size: 13px; color: #475569;">SRM IST, Kattankulathur</span>
    </div>
    <div style="text-align: right; font-family:'Times New Roman', serif;">
      <div style="border-top: 1.5px solid #0f172a; width: 220px; margin-bottom: 6px; margin-left: auto;"></div>
      <strong style="font-size: 14px; color: #0f172a;">HEAD OF THE DEPARTMENT</strong><br/>
      <span style="font-size: 13px; color: #475569;">Professor &amp; Head</span><br/>
      <span style="font-size: 13px; color: #475569;">Department of CSE</span><br/>
      <span style="font-size: 13px; color: #475569;">SRM IST, Kattankulathur</span>
    </div>
  </div>

  <div style="margin-top: 80px; font-family:'Times New Roman', serif; font-size: 13.5px;">
    <p>Submitted for the University Project Viva-Voce Examination held on: ____________________</p>
    <div style="display: flex; justify-content: space-between; margin-top: 45px;">
      <div><strong>INTERNAL EXAMINER</strong></div>
      <div><strong>EXTERNAL EXAMINER</strong></div>
    </div>
  </div>
</div>
'''

p2_md = '''## BONAFIDE CERTIFICATE

Certified that this project report titled **“RAILCONNECT: NEXT-GENERATION UNIFIED ENTERPRISE RAILWAY RESERVATION, DIGITAL TRAVEL PASS & INTELLIGENT PASSENGER OPERATIONS PLATFORM”** is the bonafide work of **S KETHAN (Reg. No: RA2511026050134)** and **B BALAJI (Reg. No: RA2511026050179)** who carried out the project under supervision in partial fulfillment of the requirements for the award of the degree of **Bachelor of Technology in Computer Science and Engineering** at SRM Institute of Science and Technology.

**Project Guide:** Assistant Professor, Department of CSE  
**Head of the Department:** Professor & Head, Department of CSE  
Submitted for Viva-Voce Examination held on: `October 2026`
'''

add_page("Bonafide Certificate", p2_html, p2_md)

# ==============================================================================
# PAGE 3: DECLARATION
# ==============================================================================
p3_html = '''
<div style="padding: 30px 20px;">
  <h3 style="font-family:'Times New Roman', serif; font-size: 18px; font-weight: bold; text-align: center; color: #0f172a; text-transform: uppercase; text-decoration: underline; margin-bottom: 40px;">
    DECLARATION OF ORIGINALITY
  </h3>

  <p style="font-family:'Times New Roman', serif; font-size: 15px; line-height: 1.9; text-align: justify; color: #1e293b; text-indent: 40px;">
    We, <strong>S KETHAN (Reg. No: RA2511026050134)</strong> and <strong>B BALAJI (Reg. No: RA2511026050179)</strong>, hereby declare that the project report entitled <strong>“RAILCONNECT: NEXT-GENERATION UNIFIED ENTERPRISE RAILWAY RESERVATION, DIGITAL TRAVEL PASS &amp; INTELLIGENT PASSENGER OPERATIONS PLATFORM”</strong> submitted to the <strong>Department of Computer Science and Engineering, SRM Institute of Science and Technology</strong>, in partial fulfillment of the requirements for the award of the degree of <strong>Bachelor of Technology in Computer Science and Engineering</strong>, is a record of original engineering work done by us under the guidance and supervision of our faculty advisor.
  </p>

  <p style="font-family:'Times New Roman', serif; font-size: 15px; line-height: 1.9; text-align: justify; color: #1e293b; text-indent: 40px; margin-top: 25px;">
    We further declare that:
  </p>
  <ul style="font-family:'Times New Roman', serif; font-size: 14.5px; line-height: 1.8; color: #1e293b; margin-left: 20px;">
    <li>The software artifacts, architecture designs, data models, and algorithms presented in this report were created and implemented by us.</li>
    <li>Due citations, credits, and formal acknowledgements have been given to all existing software libraries, open standards, and academic literature referenced during the engineering lifecycle.</li>
    <li>This report has not been submitted previously in part or in full to any other university, institute, or examining body for any degree, diploma, or certification.</li>
  </ul>

  <div style="margin-top: 130px; display: flex; justify-content: space-between;">
    <div style="font-family:'Times New Roman', serif;">
      <p style="margin: 0; color: #475569; font-size: 13px;">Place: Kattankulathur</p>
      <p style="margin: 4px 0 0 0; color: #475569; font-size: 13px;">Date: 29-10-2026</p>
    </div>
    <div style="font-family:'Times New Roman', serif; text-align: right;">
      <div style="margin-bottom: 40px;">
        <p style="margin: 0; font-weight: bold; color: #0f172a; font-size: 15px;">S KETHAN</p>
        <span style="font-size: 13px; font-family: monospace; color: #1e3a8a;">RA2511026050134</span>
      </div>
      <div>
        <p style="margin: 0; font-weight: bold; color: #0f172a; font-size: 15px;">B BALAJI</p>
        <span style="font-size: 13px; font-family: monospace; color: #1e3a8a;">RA2511026050179</span>
      </div>
    </div>
  </div>
</div>
'''

p3_md = '''## DECLARATION OF ORIGINALITY

We, **S KETHAN (RA2511026050134)** and **B BALAJI (RA2511026050179)**, students of the Department of Computer Science and Engineering, SRM Institute of Science and Technology, hereby declare that the project titled **“RAILCONNECT: NEXT-GENERATION UNIFIED ENTERPRISE RAILWAY RESERVATION, DIGITAL TRAVEL PASS & INTELLIGENT PASSENGER OPERATIONS PLATFORM”** is our original work and has not been submitted elsewhere for any academic degree or diploma.

**Place:** Kattankulathur  
**Date:** 29-10-2026  
**Signatures:** S Kethan & B Balaji
'''

add_page("Student Declaration", p3_html, p3_md)

# ==============================================================================
# PAGE 4: ACKNOWLEDGEMENTS
# ==============================================================================
p4_html = '''
<div style="padding: 30px 20px;">
  <h3 style="font-family:'Times New Roman', serif; font-size: 18px; font-weight: bold; text-align: center; color: #0f172a; text-transform: uppercase; text-decoration: underline; margin-bottom: 35px;">
    ACKNOWLEDGEMENTS
  </h3>

  <p style="font-family:'Times New Roman', serif; font-size: 14.5px; line-height: 1.85; text-align: justify; color: #1e293b; text-indent: 40px;">
    We express our deepest sense of gratitude and respect to the Founder Chancellor, <strong>Dr. T. R. Paarivendhar</strong>, and the Pro-Chancellors of <strong>SRM Institute of Science and Technology</strong> for providing world-class educational infrastructure and state-of-the-art laboratory facilities that made this endeavor possible.
  </p>

  <p style="font-family:'Times New Roman', serif; font-size: 14.5px; line-height: 1.85; text-align: justify; color: #1e293b; text-indent: 40px; margin-top: 15px;">
    We are immensely thankful to our respected Vice Chancellor, Registrar, and Dean of the College of Engineering and Technology, for their continuous administrative backing, vision, and encouragement towards innovative technical engineering initiatives.
  </p>

  <p style="font-family:'Times New Roman', serif; font-size: 14.5px; line-height: 1.85; text-align: justify; color: #1e293b; text-indent: 40px; margin-top: 15px;">
    We place on record our profound gratitude to <strong>Dr. [Head of Department]</strong>, Professor &amp; Head, Department of Computer Science and Engineering, for providing scholarly guidance, administrative permissions, and constant motivation throughout the project duration.
  </p>

  <p style="font-family:'Times New Roman', serif; font-size: 14.5px; line-height: 1.85; text-align: justify; color: #1e293b; text-indent: 40px; margin-top: 15px;">
    We owe our sincere and heartfelt thanks to our Project Guide and Faculty Advisor, for their insightful technical suggestions, rigorous review of architectural designs, patience in debugging distributed concurrency challenges, and invaluable guidance during each engineering milestone.
  </p>

  <p style="font-family:'Times New Roman', serif; font-size: 14.5px; line-height: 1.85; text-align: justify; color: #1e293b; text-indent: 40px; margin-top: 15px;">
    Finally, we extend our sincere appreciation to all the faculty members, laboratory staff, peer colleagues, and especially our parents, whose unconditional love, moral support, and faith inspired us to complete this engineering project successfully.
  </p>

  <div style="margin-top: 60px; text-align: right; font-family:'Times New Roman', serif; font-size: 14.5px; color: #0f172a;">
    <strong>S KETHAN (RA2511026050134)</strong><br/>
    <strong>B BALAJI (RA2511026050179)</strong>
  </div>
</div>
'''

p4_md = '''## ACKNOWLEDGEMENTS

We express our gratitude to the Management of **SRM Institute of Science and Technology**, the Dean (CET), the Head of the Department of Computer Science and Engineering, and our project guide for their continuous support and guidance throughout the development of **RAILCONNECT**. We also thank our faculty members, family, and friends for their encouragement and inspiration.

**S KETHAN & B BALAJI**
'''

add_page("Acknowledgements", p4_html, p4_md)

# ==============================================================================
# PAGE 5: ABSTRACT & EXECUTIVE SUMMARY
# ==============================================================================
p5_html = '''
<div style="padding: 25px 20px;">
  <h3 style="font-family:'Times New Roman', serif; font-size: 18px; font-weight: bold; text-align: center; color: #0f172a; text-transform: uppercase; text-decoration: underline; margin-bottom: 25px;">
    ABSTRACT &amp; EXECUTIVE SUMMARY
  </h3>

  <p style="font-family:'Times New Roman', serif; font-size: 14px; line-height: 1.85; text-align: justify; color: #1e293b; text-indent: 35px;">
    National railway networks constitute the economic backbone of mass transit infrastructure; however, legacy passenger reservation architectures (such as the CRIS/CONCERT mainframe framework underpinning Indian Railways) encounter severe structural challenges. These include catastrophic lock contention under flash-sale (Tatkal) bursts, vulnerability to offline ticket falsification, rigid post-allotment seat reassignments, and complete operational decoupling from real-time meteorological corridor telemetry.
  </p>

  <p style="font-family:'Times New Roman', serif; font-size: 14px; line-height: 1.85; text-align: justify; color: #1e293b; text-indent: 35px; margin-top: 12px;">
    To resolve these limitations, this project presents <strong>RAILCONNECT</strong>, a next-generation unified enterprise railway reservation, digital travel pass issuance, and autonomous passenger operations platform. Built on <strong>Java 17 / 21</strong>, <strong>Spring Boot 3.3</strong>, <strong>Spring Security 6.1</strong>, and <strong>Maven Multi-Module Architecture</strong>, RAILCONNECT is engineered as an 8-subsystem modular platform serving both local high-performance transactional backends and zero-server client-side simulated deployments.
  </p>

  <p style="font-family:'Times New Roman', serif; font-size: 14px; line-height: 1.85; text-align: justify; color: #1e293b; text-indent: 35px; margin-top: 12px;">
    The platform introduces several key engineering innovations: (1) an <em>Optimistic In-Memory Seat Locking Protocol</em> with a 10-minute Time-To-Live (TTL) that eliminates double-booking race conditions without database thread starvation; (2) an <em>Infallible Multi-Tier Digital Travel Pass Engine</em> combining ZXing server-side Base64 generation, client-side ISO/IEC 18004 local canvas generation, and emergency endpoint failovers for instant offline verification by Traveling Ticket Examiners (TTE); (3) an <em>Autonomous Peer-to-Peer (P2P) Berth Mutual Exchange Protocol</em> enabling consented seat swaps between confirmed passengers in the same coach without ticketing counter intervention; (4) a <em>Telescopic Dynamic Fare Engine</em> computing per-kilometer rates, tatkal surge coefficients, and GST; and (5) a <em>Real-Time Journey Telemetry &amp; Weather Hazard Warning System</em> alerting passengers to corridor disruptions.
  </p>

  <p style="font-family:'Times New Roman', serif; font-size: 14px; line-height: 1.85; text-align: justify; color: #1e293b; text-indent: 35px; margin-top: 12px;">
    The system is validated on a national topology spanning <strong>24 major railway stations</strong>, <strong>30 premiere express trains</strong> (including Vande Bharat, Rajdhani, Shatabdi, and Duronto fleets), and achieves transaction latency under <strong>15 milliseconds</strong> with zero seat-locking collisions across empirical stress benchmarks.
  </p>

  <div style="margin-top: 25px; background: #f1f5f9; border-left: 4px solid #1e3a8a; padding: 12px 16px;">
    <p style="font-family:'Times New Roman', serif; font-size: 13.5px; margin: 0; color: #0f172a;">
      <strong>Keywords:</strong> Enterprise Railway Platform, Distributed Concurrency Control, Optimistic Seat Locking, Digital Travel Pass, Multi-Tier QR Verification, Peer-to-Peer Berth Exchange, Spring Boot 3.3, Java 17, RBAC Security.
    </p>
  </div>
</div>
'''

p5_md = '''## ABSTRACT & EXECUTIVE SUMMARY

National railway reservation systems face severe concurrency bottlenecks, offline fraud vulnerability, and rigid post-allocation seat management. **RAILCONNECT** is a unified enterprise platform developed using **Spring Boot 3.3, Java 17, and a decoupled 8-module architecture** that addresses these challenges through:
1. **Optimistic In-Memory Seat Locking Protocol (10-minute TTL)** preventing race conditions and double-booking during peak Tatkal demand.
2. **Infallible Multi-Tier Digital Travel Pass Engine** utilizing ZXing server-side rendering, client-side ISO/IEC 18004 generation, and offline TTE inspection.
3. **Autonomous Peer-to-Peer (P2P) Berth Mutual Exchange Protocol** facilitating passenger-initiated in-coach seat swaps.
4. **Graph-Based Intermediate Stop Routing & Telescopic Dynamic Fare Engine** covering 30 premium trains (Vande Bharat, Rajdhani, Shatabdi) across 24 stations.
5. **Real-Time Journey Telemetry & Weather Hazard Alerts**.

**Keywords:** Distributed Reservation, Seat Concurrency, QR Travel Pass, P2P Berth Swap, Spring Boot 3.3, Java 17.
'''

add_page("Abstract & Executive Summary", p5_html, p5_md)

# ==============================================================================
# PAGE 6: TABLE OF CONTENTS
# ==============================================================================
p6_html = '''
<div style="padding: 25px 20px; font-family:'Times New Roman', serif;">
  <h3 style="font-size: 18px; font-weight: bold; text-align: center; color: #0f172a; text-transform: uppercase; text-decoration: underline; margin-bottom: 25px;">
    TABLE OF CONTENTS
  </h3>

  <table style="width: 100%; border-collapse: collapse; font-size: 13px; line-height: 1.6;">
    <tr style="border-bottom: 1.5px solid #0f172a; font-weight: bold;">
      <td style="padding: 6px 0; width: 80px;">Chapter</td>
      <td style="padding: 6px 0;">Title / Topic Description</td>
      <td style="padding: 6px 0; text-align: right; width: 60px;">Page No.</td>
    </tr>
    <tr><td></td><td><strong>Cover Page, Certificate, Declaration, Acknowledgements, Abstract</strong></td><td style="text-align: right;">1 – 5</td></tr>
    <tr><td></td><td><strong>Table of Contents &amp; List of Figures / Tables</strong></td><td style="text-align: right;">6 – 7</td></tr>
    <tr><td><strong>1</strong></td><td><strong>Introduction &amp; Problem Formulation</strong></td><td style="text-align: right;">8 – 9</td></tr>
    <tr><td></td><td>&nbsp;&nbsp;1.1 Background of Modern Railway Passenger Reservation Systems (PRS)</td><td style="text-align: right;">8</td></tr>
    <tr><td></td><td>&nbsp;&nbsp;1.2 Challenges in Legacy Architectures &amp; Concurrency Vulnerabilities</td><td style="text-align: right;">8</td></tr>
    <tr><td></td><td>&nbsp;&nbsp;1.3 Problem Statement, Motivation &amp; Research Objectives</td><td style="text-align: right;">9</td></tr>
    <tr><td><strong>2</strong></td><td><strong>Literature Survey &amp; State-of-the-Art Analysis</strong></td><td style="text-align: right;">10</td></tr>
    <tr><td></td><td>&nbsp;&nbsp;2.1 Comparative Study: IRCTC CRIS, Amadeus Rail, Eurostar, Shinkansen SmartEX</td><td style="text-align: right;">10</td></tr>
    <tr><td></td><td>&nbsp;&nbsp;2.2 Technological Gaps &amp; Design Imperatives</td><td style="text-align: right;">10</td></tr>
    <tr><td><strong>3</strong></td><td><strong>Software Requirement Specification (SRS) &amp; Feasibility</strong></td><td style="text-align: right;">11</td></tr>
    <tr><td></td><td>&nbsp;&nbsp;3.1 Functional Requirements (FR1 – FR12)</td><td style="text-align: right;">11</td></tr>
    <tr><td></td><td>&nbsp;&nbsp;3.2 Non-Functional Requirements (NFR1 – NFR8) &amp; Execution Environment</td><td style="text-align: right;">11</td></tr>
    <tr><td><strong>4</strong></td><td><strong>System Architecture &amp; UML Modeling Specification</strong></td><td style="text-align: right;">12 – 15</td></tr>
    <tr><td></td><td>&nbsp;&nbsp;4.1 High-Level Modular Monolith / Micro-Component Architecture</td><td style="text-align: right;">12</td></tr>
    <tr style="background:#f1f5f9; font-weight: bold;"><td>UML-1</td><td><strong>Dedicated UML Page 1: Structural Domain Class &amp; Package Model</strong></td><td style="text-align: right;">13</td></tr>
    <tr style="background:#f1f5f9; font-weight: bold;"><td>UML-2</td><td><strong>Dedicated UML Page 2: High-Concurrency Booking &amp; Berth Exchange Sequences</strong></td><td style="text-align: right;">14</td></tr>
    <tr style="background:#f1f5f9; font-weight: bold;"><td>UML-3</td><td><strong>Dedicated UML Page 3: System Use Cases &amp; Seat Lifecycle State Machine</strong></td><td style="text-align: right;">15</td></tr>
    <tr><td><strong>5</strong></td><td><strong>Database Architecture, Normalization &amp; Data Dictionary</strong></td><td style="text-align: right;">16 – 17</td></tr>
    <tr><td></td><td>&nbsp;&nbsp;5.1 Relational Schema Design, ER Modeling &amp; Normalization Proofs (3NF/BCNF)</td><td style="text-align: right;">16</td></tr>
    <tr><td></td><td>&nbsp;&nbsp;5.2 Comprehensive Data Dictionary &amp; DDL Schema Definitions</td><td style="text-align: right;">17</td></tr>
    <tr><td><strong>6</strong></td><td><strong>Core Engineering Subsystems &amp; Technical Deep-Dive</strong></td><td style="text-align: right;">18 – 25</td></tr>
    <tr><td></td><td>&nbsp;&nbsp;6.1 Subsystem 1: Stateless JWT Authentication &amp; RBAC Framework</td><td style="text-align: right;">18</td></tr>
    <tr><td></td><td>&nbsp;&nbsp;6.2 Subsystem 2: Distributed Coach Topology &amp; Dynamic Seat Map Engine</td><td style="text-align: right;">19</td></tr>
    <tr><td></td><td>&nbsp;&nbsp;6.3 Subsystem 3: Concurrency Control &amp; Optimistic Seat Locking Protocol (10m TTL)</td><td style="text-align: right;">20</td></tr>
    <tr><td></td><td>&nbsp;&nbsp;6.4 Subsystem 4: Graph-Based Multi-Hop Route Filter &amp; Intermediate Halts</td><td style="text-align: right;">21</td></tr>
    <tr><td></td><td>&nbsp;&nbsp;6.5 Subsystem 5: Telescopic Dynamic Pricing Engine &amp; Fare Surcharges</td><td style="text-align: right;">22</td></tr>
    <tr><td></td><td>&nbsp;&nbsp;6.6 Subsystem 6: Digital Travel Pass &amp; Infallible Multi-Tier QR Verification</td><td style="text-align: right;">23</td></tr>
    <tr><td></td><td>&nbsp;&nbsp;6.7 Subsystem 7: Autonomous Peer-to-Peer (P2P) Berth Mutual Exchange Protocol</td><td style="text-align: right;">24</td></tr>
    <tr><td></td><td>&nbsp;&nbsp;6.8 Subsystem 8: Real-Time Journey Telemetry &amp; Meteorological Hazard Warnings</td><td style="text-align: right;">25</td></tr>
    <tr><td><strong>7</strong></td><td><strong>Administrative Fleet Control &amp; Station Operations Console</strong></td><td style="text-align: right;">26</td></tr>
    <tr><td><strong>8</strong></td><td><strong>Frontend Engineering, Glassmorphism UI &amp; Bilingual i18n</strong></td><td style="text-align: right;">27</td></tr>
    <tr><td><strong>9</strong></td><td><strong>Algorithmic Pseudocode &amp; Mathematical Formulations</strong></td><td style="text-align: right;">28</td></tr>
    <tr><td><strong>10</strong></td><td><strong>Implementation Details &amp; Dual-Mode Runtime Architecture</strong></td><td style="text-align: right;">29</td></tr>
    <tr><td><strong>11</strong></td><td><strong>Quality Assurance, Testing Methodology &amp; Test Matrix</strong></td><td style="text-align: right;">30 – 31</td></tr>
    <tr><td><strong>12</strong></td><td><strong>CI/CD Pipelines, Monorepo Deployment &amp; GitHub Automation</strong></td><td style="text-align: right;">32</td></tr>
    <tr><td><strong>13</strong></td><td><strong>Empirical Results, Latency Benchmarks &amp; Performance Metrics</strong></td><td style="text-align: right;">33</td></tr>
    <tr><td><strong>14</strong></td><td><strong>Security Analysis, Threat Modeling &amp; OWASP Top 10 Defenses</strong></td><td style="text-align: right;">34</td></tr>
    <tr><td><strong>15</strong></td><td><strong>Engineering Challenges Encountered &amp; Post-Mortem Solutions</strong></td><td style="text-align: right;">35</td></tr>
    <tr><td><strong>16</strong></td><td><strong>Technological Roadmap &amp; Future Research Directions</strong></td><td style="text-align: right;">36</td></tr>
    <tr><td><strong>17</strong></td><td><strong>Conclusion, Project Retrospective &amp; Academic References</strong></td><td style="text-align: right;">37</td></tr>
  </table>
</div>
'''

p6_md = '''## TABLE OF CONTENTS

- **Prelims:** Title Page (p.1), Bonafide Certificate (p.2), Declaration (p.3), Acknowledgements (p.4), Abstract (p.5), Table of Contents (p.6), List of Figures/Tables (p.7)
- **Chapter 1:** Introduction, Background & Problem Statement (p.8–9)
- **Chapter 2:** Literature Survey & Comparative Analysis (p.10)
- **Chapter 3:** Software Requirement Specification (SRS) (p.11)
- **Chapter 4:** System Architecture & UML Modeling (p.12–15)
  - **Dedicated UML Page 1 (p.13):** Domain Class & Package Model
  - **Dedicated UML Page 2 (p.14):** Concurrency & Berth Exchange Sequence Diagrams
  - **Dedicated UML Page 3 (p.15):** Use Cases & Seat Lifecycle State Machine
- **Chapter 5:** Database Architecture & Schema Data Dictionary (p.16–17)
- **Chapter 6:** Technical Deep-Dive into 8 Subsystems (p.18–25)
- **Chapter 7:** Administrative Operations Console (p.26)
- **Chapter 8:** Frontend Architecture & i18n (p.27)
- **Chapter 9:** Algorithmic Pseudocode (p.28)
- **Chapter 10:** Implementation Details & Dual-Mode Runtime (p.29)
- **Chapter 11:** Testing Methodology & Test Execution Matrix (p.30–31)
- **Chapter 12:** Deployment & CI/CD Automation (p.32)
- **Chapter 13:** Performance Benchmarks & Empirical Results (p.33)
- **Chapter 14:** Security Analysis & Vulnerability Assessment (p.34)
- **Chapter 15:** Engineering Post-Mortems & Bug Resolutions (p.35)
- **Chapter 16:** Future Roadmap & AI Integrations (p.36)
- **Chapter 17:** Conclusion & Academic References (p.37)
'''

add_page("Table of Contents", p6_html, p6_md)

# ==============================================================================
# PAGE 7: LIST OF FIGURES & LIST OF TABLES
# ==============================================================================
p7_html = '''
<div style="padding: 25px 20px; font-family:'Times New Roman', serif;">
  <h3 style="font-size: 17px; font-weight: bold; text-align: center; color: #0f172a; text-transform: uppercase; text-decoration: underline; margin-bottom: 20px;">
    LIST OF FIGURES
  </h3>
  <table style="width: 100%; border-collapse: collapse; font-size: 13px; line-height: 1.6; margin-bottom: 25px;">
    <tr style="font-weight: bold; border-bottom: 1px solid #94a3b8;">
      <td style="width: 80px;">Figure No.</td><td>Caption / Figure Title</td><td style="width: 60px; text-align: right;">Page</td>
    </tr>
    <tr><td>Figure 4.0</td><td>High-Level Multi-Tier Architectural Topology of RAILCONNECT</td><td style="text-align: right;">12</td></tr>
    <tr style="font-weight: bold; color: #1e3a8a;"><td>Figure 4.1</td><td>Comprehensive Structural Domain Class Diagram (UML Page 1)</td><td style="text-align: right;">13</td></tr>
    <tr style="font-weight: bold; color: #1e3a8a;"><td>Figure 4.2</td><td>High-Concurrency Seat Locking &amp; QR Pass Issuance Sequence Diagram (UML Page 2)</td><td style="text-align: right;">14</td></tr>
    <tr style="font-weight: bold; color: #1e3a8a;"><td>Figure 4.3</td><td>System Use Case Model &amp; Seat State Machine Transition Diagram (UML Page 3)</td><td style="text-align: right;">15</td></tr>
    <tr><td>Figure 5.1</td><td>Entity Relationship (ER) Relational Topology and Schema Interconnections</td><td style="text-align: right;">16</td></tr>
    <tr><td>Figure 6.1</td><td>Spring Security 6.1 Stateless JWT Filter Chain Architecture</td><td style="text-align: right;">18</td></tr>
    <tr><td>Figure 6.2</td><td>Topological Coach Layout Mapping (Sleeper 8-Berth vs. Chair Car 5-Abreast)</td><td style="text-align: right;">19</td></tr>
    <tr><td>Figure 6.3</td><td>Concurrent Seat Locking Protocol with 10-Minute Sliding TTL Expiration</td><td style="text-align: right;">20</td></tr>
    <tr><td>Figure 6.4</td><td>Graph-Based Multi-Hop Directed Route Stop Filter Pipeline</td><td style="text-align: right;">21</td></tr>
    <tr><td>Figure 6.5</td><td>Infallible 3-Tier Digital Travel Pass QR Generation &amp; Validation Pipeline</td><td style="text-align: right;">23</td></tr>
    <tr><td>Figure 6.6</td><td>Bipartite Passenger Consent Protocol for Mutual In-Coach Berth Exchange</td><td style="text-align: right;">24</td></tr>
    <tr><td>Figure 7.1</td><td>Chief Operations Administrator Console Interface Architecture</td><td style="text-align: right;">26</td></tr>
    <tr><td>Figure 12.1</td><td>Automated GitHub Actions CI/CD Deployment Workflow Topology</td><td style="text-align: right;">32</td></tr>
    <tr><td>Figure 13.1</td><td>Empirical End-to-End Latency vs. Concurrent User Load Benchmarking</td><td style="text-align: right;">33</td></tr>
  </table>

  <h3 style="font-size: 17px; font-weight: bold; text-align: center; color: #0f172a; text-transform: uppercase; text-decoration: underline; margin-bottom: 20px;">
    LIST OF TABLES
  </h3>
  <table style="width: 100%; border-collapse: collapse; font-size: 13px; line-height: 1.6;">
    <tr style="font-weight: bold; border-bottom: 1px solid #94a3b8;">
      <td style="width: 80px;">Table No.</td><td>Table Caption / Description</td><td style="width: 60px; text-align: right;">Page</td>
    </tr>
    <tr><td>Table 2.1</td><td>Comparative Matrix: RAILCONNECT vs. Global Railway Reservation Systems</td><td style="text-align: right;">10</td></tr>
    <tr><td>Table 3.1</td><td>Hardware, Software, Runtime and Network Environment Specifications</td><td style="text-align: right;">11</td></tr>
    <tr><td>Table 5.1</td><td>Master Database Relational Schema &amp; Data Dictionary</td><td style="text-align: right;">17</td></tr>
    <tr><td>Table 6.1</td><td>Role-Based Access Control (RBAC) Endpoint Authorization Matrix</td><td style="text-align: right;">18</td></tr>
    <tr><td>Table 6.2</td><td>Telescopic Fare Engine Rate Surcharge &amp; Tax Multiplier Structure</td><td style="text-align: right;">22</td></tr>
    <tr><td>Table 11.1</td><td>Comprehensive Verification &amp; Test Execution Matrix (30 Scenarios)</td><td style="text-align: right;">31</td></tr>
    <tr><td>Table 13.1</td><td>Empirical Performance Benchmark Metrics &amp; Subsystem Latencies</td><td style="text-align: right;">33</td></tr>
    <tr><td>Table 14.1</td><td>OWASP Top 10 Vulnerability Threat Modeling &amp; Mitigation Analysis</td><td style="text-align: right;">34</td></tr>
  </table>
</div>
'''

p7_md = '''## LIST OF FIGURES & TABLES

### List of Figures:
- **Figure 4.0:** High-Level Multi-Tier Architectural Topology of RAILCONNECT (p.12)
- **Figure 4.1 (UML Page 1):** Comprehensive Structural Domain Class Diagram (p.13)
- **Figure 4.2 (UML Page 2):** High-Concurrency Booking & Seat Locking Sequence Diagram (p.14)
- **Figure 4.3 (UML Page 3):** System Use Case Model & Seat State Machine (p.15)
- **Figure 5.1:** Entity Relationship (ER) Schema Interconnections (p.16)
- **Figure 6.1:** Spring Security 6.1 JWT Filter Chain Architecture (p.18)
- **Figure 6.2:** Spatial Coach Layout Geometry (p.19)
- **Figure 6.3:** In-Memory Concurrent Seat Locking Protocol (p.20)
- **Figure 6.5:** Multi-Tier QR Travel Pass Validation Pipeline (p.23)
- **Figure 12.1:** GitHub Actions CI/CD Deployment Topology (p.32)
- **Figure 13.1:** Throughput and Latency Benchmarks (p.33)

### List of Tables:
- **Table 2.1:** Comparative Analysis of Global Railway Systems (p.10)
- **Table 3.1:** Hardware, Software & Runtime Specifications (p.11)
- **Table 5.1:** Master Database Data Dictionary (p.17)
- **Table 6.1:** Role-Based Access Control Matrix (p.18)
- **Table 6.2:** Dynamic Fare Multipliers & Tax Matrix (p.22)
- **Table 11.1:** Test Execution Matrix covering 30 Scenarios (p.31)
- **Table 14.1:** OWASP Top 10 Vulnerability Mitigations (p.34)
'''

add_page("List of Figures & Tables", p7_html, p7_md)

print("Prelim pages 1-7 generated.")
