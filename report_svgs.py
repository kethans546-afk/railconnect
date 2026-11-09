# -*- coding: utf-8 -*-
"""
SVG Vector Graphic Generator for RAILCONNECT 37-Page Academic Report
Includes:
- SRM Institute of Science & Technology Official Crest / Seal
- UML Diagram Page 1: Comprehensive Domain Class Model
- UML Diagram Page 2: High-Concurrency Booking & Berth Exchange Sequence Diagrams
- UML Diagram Page 3: System Use Case, Seat Lifecycle State Machine & Activity Models
"""

def get_srm_logo_svg():
    return '''<svg width="150" height="150" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" style="display:block; margin:0 auto 14px auto;">
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
  <!-- Outer Blue Ring with Gold Inlay -->
  <circle cx="150" cy="150" r="142" fill="#ffffff" stroke="url(#srmBlue)" stroke-width="8"/>
  <circle cx="150" cy="150" r="130" fill="none" stroke="url(#srmGold)" stroke-width="3"/>
  <circle cx="150" cy="150" r="102" fill="url(#srmBlue)" stroke="none"/>
  
  <!-- Outer Circular Text Arc (Top) -->
  <path id="topArc" d="M 35,150 A 115,115 0 1,1 265,150" fill="none"/>
  <text font-family="'Times New Roman', serif" font-weight="bold" font-size="13.5" fill="#0a2540" letter-spacing="1.2">
    <textPath href="#topArc" startOffset="50%" text-anchor="middle">
      SRM INSTITUTE OF SCIENCE &amp; TECHNOLOGY
    </textPath>
  </text>
  
  <!-- Outer Circular Text Arc (Bottom) -->
  <path id="bottomArc" d="M 265,150 A 115,115 0 0,1 35,150" fill="none"/>
  <text font-family="'Times New Roman', serif" font-weight="bold" font-size="10.5" fill="#991b1b" letter-spacing="0.8">
    <textPath href="#bottomArc" startOffset="50%" text-anchor="middle">
      (Deemed to be University u/s 3 of UGC Act, 1956)
    </textPath>
  </text>
  
  <!-- Sun Rays & Sun of Knowledge -->
  <g stroke="url(#srmGold)" stroke-width="2.5">
    <line x1="150" y1="65" x2="150" y2="78"/>
    <line x1="125" y1="72" x2="132" y2="82"/>
    <line x1="175" y1="72" x2="168" y2="82"/>
    <line x1="105" y1="90" x2="116" y2="97"/>
    <line x1="195" y1="90" x2="184" y2="97"/>
  </g>
  <circle cx="150" cy="98" r="18" fill="url(#srmGold)"/>
  
  <!-- Open Book of Learning -->
  <path d="M 150,145 Q 120,135 90,140 L 90,168 Q 120,162 150,172 Q 180,162 210,168 L 210,140 Q 180,135 150,145 Z" fill="#ffffff" stroke="url(#srmGold)" stroke-width="2"/>
  <line x1="150" y1="145" x2="150" y2="172" stroke="#0a2540" stroke-width="2"/>
  
  <!-- Technology Cogwheel / Science Orbits -->
  <circle cx="150" cy="198" r="16" fill="none" stroke="url(#srmGold)" stroke-width="3" stroke-dasharray="4 2"/>
  <ellipse cx="150" cy="198" rx="26" ry="9" fill="none" stroke="#ffffff" stroke-width="1.5" transform="rotate(-25 150 198)"/>
  <ellipse cx="150" cy="198" rx="26" ry="9" fill="none" stroke="#ffffff" stroke-width="1.5" transform="rotate(25 150 198)"/>
  <circle cx="150" cy="198" r="4" fill="url(#srmGold)"/>

  <!-- University Motto Banner -->
  <path d="M 95,228 L 205,228 L 195,242 L 105,242 Z" fill="url(#srmGold)"/>
  <text x="150" y="238" font-family="'Times New Roman', serif" font-size="9" font-weight="bold" fill="#0a2540" text-anchor="middle" letter-spacing="1">LEARN . LEAP . LEAD</text>
</svg>'''

def get_uml_page1_class_diagram_svg():
    return '''<svg width="100%" height="680" viewBox="0 0 950 680" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Segoe UI', Arial, sans-serif;">
  <defs>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.15"/>
    </filter>
    <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#1e3a8a"/>
    </marker>
    <marker id="diamond" viewBox="0 0 12 12" refX="12" refY="6" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <polygon points="6,0 12,6 6,12 0,6" fill="#1e3a8a"/>
    </marker>
  </defs>

  <!-- Title Banner -->
  <rect x="15" y="10" width="920" height="36" rx="4" fill="#1e3a8a"/>
  <text x="475" y="34" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">Figure 4.1: RAILCONNECT Enterprise Domain Class Architecture Model</text>

  <!-- Class 1: User -->
  <g transform="translate(30, 60)" filter="url(#shadow)">
    <rect x="0" y="0" width="180" height="150" fill="#f8fafc" stroke="#1e3a8a" stroke-width="1.8" rx="3"/>
    <rect x="0" y="0" width="180" height="26" fill="#e2e8f0"/>
    <text x="90" y="18" font-weight="bold" font-size="13" fill="#0f172a" text-anchor="middle">User</text>
    <line x1="0" y1="26" x2="180" y2="26" stroke="#1e3a8a" stroke-width="1.5"/>
    <text x="8" y="42" font-size="10.5" fill="#334155">- id: Long [PK]</text>
    <text x="8" y="56" font-size="10.5" fill="#334155">- username: String</text>
    <text x="8" y="70" font-size="10.5" fill="#334155">- password: String</text>
    <text x="8" y="84" font-size="10.5" fill="#334155">- role: Role [ENUM]</text>
    <text x="8" y="98" font-size="10.5" fill="#334155">- fullName: String</text>
    <text x="8" y="112" font-size="10.5" fill="#334155">- email: String</text>
    <line x1="0" y1="120" x2="180" y2="120" stroke="#cbd5e1" stroke-width="1"/>
    <text x="8" y="134" font-size="10" fill="#0f172a">+ getAuthorities()</text>
    <text x="8" y="145" font-size="10" fill="#0f172a">+ validateToken()</text>
  </g>

  <!-- Class 2: Train -->
  <g transform="translate(250, 60)" filter="url(#shadow)">
    <rect x="0" y="0" width="210" height="175" fill="#f8fafc" stroke="#1e3a8a" stroke-width="1.8" rx="3"/>
    <rect x="0" y="0" width="210" height="26" fill="#e2e8f0"/>
    <text x="105" y="18" font-weight="bold" font-size="13" fill="#0f172a" text-anchor="middle">Train</text>
    <line x1="0" y1="26" x2="210" y2="26" stroke="#1e3a8a" stroke-width="1.5"/>
    <text x="8" y="42" font-size="10.5" fill="#334155">- id: Long [PK]</text>
    <text x="8" y="56" font-size="10.5" fill="#334155">- trainNumber: String [UK]</text>
    <text x="8" y="70" font-size="10.5" fill="#334155">- trainName: String</text>
    <text x="8" y="84" font-size="10.5" fill="#334155">- trainType: TrainType [ENUM]</text>
    <text x="8" y="98" font-size="10.5" fill="#334155">- sourceStation: Station</text>
    <text x="8" y="112" font-size="10.5" fill="#334155">- destinationStation: Station</text>
    <text x="8" y="126" font-size="10.5" fill="#334155">- departureTime: LocalTime</text>
    <text x="8" y="140" font-size="10.5" fill="#334155">- active: boolean</text>
    <line x1="0" y1="146" x2="210" y2="146" stroke="#cbd5e1" stroke-width="1"/>
    <text x="8" y="160" font-size="10" fill="#0f172a">+ getCoaches(): List&lt;Coach&gt;</text>
    <text x="8" y="171" font-size="10" fill="#0f172a">+ getRoutes(): List&lt;Route&gt;</text>
  </g>

  <!-- Class 3: Station -->
  <g transform="translate(500, 60)" filter="url(#shadow)">
    <rect x="0" y="0" width="190" height="150" fill="#f8fafc" stroke="#1e3a8a" stroke-width="1.8" rx="3"/>
    <rect x="0" y="0" width="190" height="26" fill="#e2e8f0"/>
    <text x="95" y="18" font-weight="bold" font-size="13" fill="#0f172a" text-anchor="middle">Station</text>
    <line x1="0" y1="26" x2="190" y2="26" stroke="#1e3a8a" stroke-width="1.5"/>
    <text x="8" y="42" font-size="10.5" fill="#334155">- id: Long [PK]</text>
    <text x="8" y="56" font-size="10.5" fill="#334155">- code: String [UK]</text>
    <text x="8" y="70" font-size="10.5" fill="#334155">- name: String</text>
    <text x="8" y="84" font-size="10.5" fill="#334155">- city: String</text>
    <text x="8" y="98" font-size="10.5" fill="#334155">- state: String</text>
    <text x="8" y="112" font-size="10.5" fill="#334155">- platformCount: int</text>
    <line x1="0" y1="120" x2="190" y2="120" stroke="#cbd5e1" stroke-width="1"/>
    <text x="8" y="135" font-size="10" fill="#0f172a">+ getStationDetails(): String</text>
  </g>

  <!-- Class 4: TrainRoute -->
  <g transform="translate(730, 60)" filter="url(#shadow)">
    <rect x="0" y="0" width="190" height="150" fill="#f8fafc" stroke="#1e3a8a" stroke-width="1.8" rx="3"/>
    <rect x="0" y="0" width="190" height="26" fill="#e2e8f0"/>
    <text x="95" y="18" font-weight="bold" font-size="13" fill="#0f172a" text-anchor="middle">TrainRoute</text>
    <line x1="0" y1="26" x2="190" y2="26" stroke="#1e3a8a" stroke-width="1.5"/>
    <text x="8" y="42" font-size="10.5" fill="#334155">- id: Long [PK]</text>
    <text x="8" y="56" font-size="10.5" fill="#334155">- train: Train [FK]</text>
    <text x="8" y="70" font-size="10.5" fill="#334155">- station: Station [FK]</text>
    <text x="8" y="84" font-size="10.5" fill="#334155">- stopSequence: int</text>
    <text x="8" y="98" font-size="10.5" fill="#334155">- distanceFromSourceKm: double</text>
    <text x="8" y="112" font-size="10.5" fill="#334155">- arrivalTime: LocalTime</text>
    <line x1="0" y1="120" x2="190" y2="120" stroke="#cbd5e1" stroke-width="1"/>
    <text x="8" y="135" font-size="10" fill="#0f172a">+ calculateHaltTime(): int</text>
  </g>

  <!-- Class 5: Coach -->
  <g transform="translate(250, 275)" filter="url(#shadow)">
    <rect x="0" y="0" width="190" height="135" fill="#f8fafc" stroke="#1e3a8a" stroke-width="1.8" rx="3"/>
    <rect x="0" y="0" width="190" height="26" fill="#e2e8f0"/>
    <text x="95" y="18" font-weight="bold" font-size="13" fill="#0f172a" text-anchor="middle">Coach</text>
    <line x1="0" y1="26" x2="190" y2="26" stroke="#1e3a8a" stroke-width="1.5"/>
    <text x="8" y="42" font-size="10.5" fill="#334155">- id: Long [PK]</text>
    <text x="8" y="56" font-size="10.5" fill="#334155">- trainId: Long [FK]</text>
    <text x="8" y="70" font-size="10.5" fill="#334155">- coachCode: String (e.g. C1)</text>
    <text x="8" y="84" font-size="10.5" fill="#334155">- coachType: String (CC, 3A)</text>
    <text x="8" y="98" font-size="10.5" fill="#334155">- totalSeats: int</text>
    <line x1="0" y1="106" x2="190" y2="106" stroke="#cbd5e1" stroke-width="1"/>
    <text x="8" y="122" font-size="10" fill="#0f172a">+ getAvailableSeats(): List&lt;Seat&gt;</text>
  </g>

  <!-- Class 6: Seat -->
  <g transform="translate(480, 275)" filter="url(#shadow)">
    <rect x="0" y="0" width="190" height="135" fill="#f8fafc" stroke="#1e3a8a" stroke-width="1.8" rx="3"/>
    <rect x="0" y="0" width="190" height="26" fill="#e2e8f0"/>
    <text x="95" y="18" font-weight="bold" font-size="13" fill="#0f172a" text-anchor="middle">Seat</text>
    <line x1="0" y1="26" x2="190" y2="26" stroke="#1e3a8a" stroke-width="1.5"/>
    <text x="8" y="42" font-size="10.5" fill="#334155">- id: Long [PK]</text>
    <text x="8" y="56" font-size="10.5" fill="#334155">- coach: Coach [FK]</text>
    <text x="8" y="70" font-size="10.5" fill="#334155">- seatNumber: int</text>
    <text x="8" y="84" font-size="10.5" fill="#334155">- berthType: BerthType [ENUM]</text>
    <text x="8" y="98" font-size="10.5" fill="#334155">- cabinNumber: int</text>
    <line x1="0" y1="106" x2="190" y2="106" stroke="#cbd5e1" stroke-width="1"/>
    <text x="8" y="122" font-size="10" fill="#0f172a">+ isWindowBerth(): boolean</text>
  </g>

  <!-- Class 7: Booking -->
  <g transform="translate(30, 275)" filter="url(#shadow)">
    <rect x="0" y="0" width="190" height="180" fill="#f8fafc" stroke="#1e3a8a" stroke-width="1.8" rx="3"/>
    <rect x="0" y="0" width="190" height="26" fill="#e2e8f0"/>
    <text x="95" y="18" font-weight="bold" font-size="13" fill="#0f172a" text-anchor="middle">Booking</text>
    <line x1="0" y1="26" x2="190" y2="26" stroke="#1e3a8a" stroke-width="1.5"/>
    <text x="8" y="42" font-size="10.5" fill="#334155">- id: Long [PK]</text>
    <text x="8" y="56" font-size="10.5" fill="#334155">- pnrNumber: String [UK]</text>
    <text x="8" y="70" font-size="10.5" fill="#334155">- user: User [FK]</text>
    <text x="8" y="84" font-size="10.5" fill="#334155">- train: Train [FK]</text>
    <text x="8" y="98" font-size="10.5" fill="#334155">- journeyDate: LocalDate</text>
    <text x="8" y="112" font-size="10.5" fill="#334155">- coachType: String</text>
    <text x="8" y="126" font-size="10.5" fill="#334155">- totalFare: double</text>
    <text x="8" y="140" font-size="10.5" fill="#334155">- status: BookingStatus</text>
    <line x1="0" y1="148" x2="190" y2="148" stroke="#cbd5e1" stroke-width="1"/>
    <text x="8" y="162" font-size="10" fill="#0f172a">+ generateQrPass(): String</text>
    <text x="8" y="174" font-size="10" fill="#0f172a">+ cancelReservation()</text>
  </g>

  <!-- Class 8: BookingPassenger -->
  <g transform="translate(30, 490)" filter="url(#shadow)">
    <rect x="0" y="0" width="200" height="150" fill="#f8fafc" stroke="#1e3a8a" stroke-width="1.8" rx="3"/>
    <rect x="0" y="0" width="200" height="26" fill="#e2e8f0"/>
    <text x="100" y="18" font-weight="bold" font-size="13" fill="#0f172a" text-anchor="middle">BookingPassenger</text>
    <line x1="0" y1="26" x2="200" y2="26" stroke="#1e3a8a" stroke-width="1.5"/>
    <text x="8" y="42" font-size="10.5" fill="#334155">- id: Long [PK]</text>
    <text x="8" y="56" font-size="10.5" fill="#334155">- booking: Booking [FK]</text>
    <text x="8" y="70" font-size="10.5" fill="#334155">- passengerName: String</text>
    <text x="8" y="84" font-size="10.5" fill="#334155">- allocatedCoach: String</text>
    <text x="8" y="98" font-size="10.5" fill="#334155">- allocatedSeatNumber: int</text>
    <text x="8" y="112" font-size="10.5" fill="#334155">- allocatedBerthType: String</text>
    <line x1="0" y1="120" x2="200" y2="120" stroke="#cbd5e1" stroke-width="1"/>
    <text x="8" y="136" font-size="10" fill="#0f172a">+ updateBerth(newBerth)</text>
  </g>

  <!-- Class 9: Payment -->
  <g transform="translate(260, 490)" filter="url(#shadow)">
    <rect x="0" y="0" width="190" height="150" fill="#f8fafc" stroke="#1e3a8a" stroke-width="1.8" rx="3"/>
    <rect x="0" y="0" width="190" height="26" fill="#e2e8f0"/>
    <text x="95" y="18" font-weight="bold" font-size="13" fill="#0f172a" text-anchor="middle">Payment</text>
    <line x1="0" y1="26" x2="190" y2="26" stroke="#1e3a8a" stroke-width="1.5"/>
    <text x="8" y="42" font-size="10.5" fill="#334155">- id: Long [PK]</text>
    <text x="8" y="56" font-size="10.5" fill="#334155">- booking: Booking [FK]</text>
    <text x="8" y="70" font-size="10.5" fill="#334155">- transactionId: String</text>
    <text x="8" y="84" font-size="10.5" fill="#334155">- paymentMethod: String</text>
    <text x="8" y="98" font-size="10.5" fill="#334155">- amount: double</text>
    <text x="8" y="112" font-size="10.5" fill="#334155">- status: PaymentStatus</text>
    <line x1="0" y1="120" x2="190" y2="120" stroke="#cbd5e1" stroke-width="1"/>
    <text x="8" y="136" font-size="10" fill="#0f172a">+ verifyPaymentSignature()</text>
  </g>

  <!-- Class 10: BerthExchangeRequest -->
  <g transform="translate(480, 460)" filter="url(#shadow)">
    <rect x="0" y="0" width="220" height="180" fill="#f8fafc" stroke="#1e3a8a" stroke-width="1.8" rx="3"/>
    <rect x="0" y="0" width="220" height="26" fill="#e2e8f0"/>
    <text x="110" y="18" font-weight="bold" font-size="13" fill="#0f172a" text-anchor="middle">BerthExchangeRequest</text>
    <line x1="0" y1="26" x2="220" y2="26" stroke="#1e3a8a" stroke-width="1.5"/>
    <text x="8" y="42" font-size="10.5" fill="#334155">- id: Long [PK]</text>
    <text x="8" y="56" font-size="10.5" fill="#334155">- requesterBooking: Booking</text>
    <text x="8" y="70" font-size="10.5" fill="#334155">- targetBooking: Booking</text>
    <text x="8" y="84" font-size="10.5" fill="#334155">- train: Train</text>
    <text x="8" y="98" font-size="10.5" fill="#334155">- journeyDate: LocalDate</text>
    <text x="8" y="112" font-size="10.5" fill="#334155">- status: ExchangeStatus</text>
    <text x="8" y="126" font-size="10.5" fill="#334155">- reason: String</text>
    <line x1="0" y1="134" x2="220" y2="134" stroke="#cbd5e1" stroke-width="1"/>
    <text x="8" y="150" font-size="10" fill="#0f172a">+ acceptExchange(): boolean</text>
    <text x="8" y="165" font-size="10" fill="#0f172a">+ approveByTTE(tteId): void</text>
  </g>

  <!-- Class 11: FareRule -->
  <g transform="translate(730, 460)" filter="url(#shadow)">
    <rect x="0" y="0" width="190" height="180" fill="#f8fafc" stroke="#1e3a8a" stroke-width="1.8" rx="3"/>
    <rect x="0" y="0" width="190" height="26" fill="#e2e8f0"/>
    <text x="95" y="18" font-weight="bold" font-size="13" fill="#0f172a" text-anchor="middle">FareRule</text>
    <line x1="0" y1="26" x2="190" y2="26" stroke="#1e3a8a" stroke-width="1.5"/>
    <text x="8" y="42" font-size="10.5" fill="#334155">- id: Long [PK]</text>
    <text x="8" y="56" font-size="10.5" fill="#334155">- trainType: String</text>
    <text x="8" y="70" font-size="10.5" fill="#334155">- coachType: String</text>
    <text x="8" y="84" font-size="10.5" fill="#334155">- baseFarePerKm: double</text>
    <text x="8" y="98" font-size="10.5" fill="#334155">- reservationCharge: double</text>
    <text x="8" y="112" font-size="10.5" fill="#334155">- superfastCharge: double</text>
    <text x="8" y="126" font-size="10.5" fill="#334155">- gstPercentage: double</text>
    <line x1="0" y1="134" x2="190" y2="134" stroke="#cbd5e1" stroke-width="1"/>
    <text x="8" y="150" font-size="10" fill="#0f172a">+ computeFare(distKm): double</text>
  </g>

  <!-- Connectors & Relationships -->
  <!-- Train to Coach Composition -->
  <line x1="355" y1="235" x2="355" y2="275" stroke="#1e3a8a" stroke-width="1.8" marker-start="url(#diamond)"/>
  <text x="362" y="258" font-size="11" font-weight="bold" fill="#1e3a8a">1..*</text>

  <!-- Coach to Seat Composition -->
  <line x1="440" y1="340" x2="480" y2="340" stroke="#1e3a8a" stroke-width="1.8" marker-start="url(#diamond)"/>
  <text x="455" y="333" font-size="11" font-weight="bold" fill="#1e3a8a">1..*</text>

  <!-- User to Booking Association -->
  <line x1="120" y1="210" x2="120" y2="275" stroke="#1e3a8a" stroke-width="1.8" marker-end="url(#arrow)"/>
  <text x="126" y="248" font-size="11" font-weight="bold" fill="#1e3a8a">1..*</text>

  <!-- Booking to Passenger Composition -->
  <line x1="120" y1="455" x2="120" y2="490" stroke="#1e3a8a" stroke-width="1.8" marker-start="url(#diamond)"/>
  <text x="126" y="478" font-size="11" font-weight="bold" fill="#1e3a8a">1..*</text>

  <!-- Booking to Payment 1..1 -->
  <line x1="220" y1="380" x2="355" y2="380" stroke="#1e3a8a" stroke-width="1.8"/>
  <line x1="355" y1="380" x2="355" y2="490" stroke="#1e3a8a" stroke-width="1.8" marker-end="url(#arrow)"/>
  <text x="235" y="373" font-size="11" font-weight="bold" fill="#1e3a8a">1..1</text>

  <!-- Train to Route Association -->
  <line x1="460" y1="135" x2="730" y2="135" stroke="#1e3a8a" stroke-width="1.8" marker-end="url(#arrow)"/>
  <text x="590" y="128" font-size="11" font-weight="bold" fill="#1e3a8a">1..* routes</text>

  <!-- Station to Route Association -->
  <line x1="690" y1="135" x2="730" y2="135" stroke="#1e3a8a" stroke-width="1.8"/>

</svg>'''

def get_uml_page2_sequence_svg():
    return '''<svg width="100%" height="700" viewBox="0 0 950 700" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Segoe UI', Arial, sans-serif;">
  <defs>
    <filter id="shadow2" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="1" dy="1" stdDeviation="2" flood-color="#000000" flood-opacity="0.15"/>
    </filter>
    <marker id="seqArrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#1e3a8a"/>
    </marker>
    <marker id="dashArrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569"/>
    </marker>
  </defs>

  <rect x="15" y="10" width="920" height="34" rx="4" fill="#1e3a8a"/>
  <text x="475" y="33" font-size="14.5" font-weight="bold" fill="#ffffff" text-anchor="middle">Figure 4.2: High-Concurrency Seat Locking, Booking &amp; QR Pass Generation Sequence</text>

  <!-- Lifeline Headers -->
  <!-- 1. Passenger -->
  <g transform="translate(40, 55)" filter="url(#shadow2)">
    <rect x="0" y="0" width="105" height="32" rx="4" fill="#e2e8f0" stroke="#1e3a8a" stroke-width="1.5"/>
    <text x="52" y="21" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">:Passenger</text>
  </g>
  <line x1="92" y1="87" x2="92" y2="670" stroke="#94a3b8" stroke-dasharray="4 4" stroke-width="1.5"/>

  <!-- 2. Frontend App -->
  <g transform="translate(185, 55)" filter="url(#shadow2)">
    <rect x="0" y="0" width="110" height="32" rx="4" fill="#e2e8f0" stroke="#1e3a8a" stroke-width="1.5"/>
    <text x="55" y="21" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">:WebAppUI</text>
  </g>
  <line x1="240" y1="87" x2="240" y2="670" stroke="#94a3b8" stroke-dasharray="4 4" stroke-width="1.5"/>

  <!-- 3. ApiGateway -->
  <g transform="translate(335, 55)" filter="url(#shadow2)">
    <rect x="0" y="0" width="115" height="32" rx="4" fill="#e2e8f0" stroke="#1e3a8a" stroke-width="1.5"/>
    <text x="57" y="21" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">:SecurityGateway</text>
  </g>
  <line x1="392" y1="87" x2="392" y2="670" stroke="#94a3b8" stroke-dasharray="4 4" stroke-width="1.5"/>

  <!-- 4. SeatEngine -->
  <g transform="translate(490, 55)" filter="url(#shadow2)">
    <rect x="0" y="0" width="115" height="32" rx="4" fill="#e2e8f0" stroke="#1e3a8a" stroke-width="1.5"/>
    <text x="57" y="21" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">:SeatLockManager</text>
  </g>
  <line x1="547" y1="87" x2="547" y2="670" stroke="#94a3b8" stroke-dasharray="4 4" stroke-width="1.5"/>

  <!-- 5. BookingService -->
  <g transform="translate(645, 55)" filter="url(#shadow2)">
    <rect x="0" y="0" width="120" height="32" rx="4" fill="#e2e8f0" stroke="#1e3a8a" stroke-width="1.5"/>
    <text x="60" y="21" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">:BookingService</text>
  </g>
  <line x1="705" y1="87" x2="705" y2="670" stroke="#94a3b8" stroke-dasharray="4 4" stroke-width="1.5"/>

  <!-- 6. Database / QRCode -->
  <g transform="translate(805, 55)" filter="url(#shadow2)">
    <rect x="0" y="0" width="115" height="32" rx="4" fill="#e2e8f0" stroke="#1e3a8a" stroke-width="1.5"/>
    <text x="57" y="21" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">:JPA / ZXing</text>
  </g>
  <line x1="862" y1="87" x2="862" y2="670" stroke="#94a3b8" stroke-dasharray="4 4" stroke-width="1.5"/>

  <!-- Sequence Step 1: Search -->
  <line x1="92" y1="110" x2="240" y2="110" stroke="#1e3a8a" stroke-width="1.5" marker-end="url(#seqArrow)"/>
  <text x="166" y="104" font-size="10.5" fill="#1e3a8a" text-anchor="middle">1. searchTrains(SBC, MAS, Date)</text>

  <line x1="240" y1="125" x2="392" y2="125" stroke="#1e3a8a" stroke-width="1.5" marker-end="url(#seqArrow)"/>
  <text x="316" y="120" font-size="10.5" fill="#1e3a8a" text-anchor="middle">GET /api/trains/search</text>

  <line x1="392" y1="145" x2="862" y2="145" stroke="#1e3a8a" stroke-width="1.5" marker-end="url(#seqArrow)"/>
  <text x="627" y="139" font-size="10.5" fill="#1e3a8a" text-anchor="middle">findDirectTrainsWithIntermediateRoutes()</text>

  <line x1="862" y1="165" x2="240" y2="165" stroke="#475569" stroke-width="1.5" stroke-dasharray="3 3" marker-end="url(#dashArrow)"/>
  <text x="551" y="160" font-size="10.5" fill="#475569" text-anchor="middle">trainsList [20608 Vande Bharat, 12028 Shatabdi]</text>

  <!-- Sequence Step 2: Select Berth & Acquire Lock -->
  <line x1="92" y1="200" x2="240" y2="200" stroke="#1e3a8a" stroke-width="1.5" marker-end="url(#seqArrow)"/>
  <text x="166" y="194" font-size="10.5" fill="#1e3a8a" text-anchor="middle">2. selectBerth(Seat #15, Coach C1)</text>

  <line x1="240" y1="220" x2="547" y2="220" stroke="#1e3a8a" stroke-width="1.5" marker-end="url(#seqArrow)"/>
  <text x="393" y="214" font-size="10.5" fill="#1e3a8a" text-anchor="middle">3. lockSeat(seatId=15, duration=10m)</text>

  <!-- Activation bar on SeatLockManager -->
  <rect x="542" y="220" width="10" height="70" fill="#cbd5e1" stroke="#1e3a8a"/>
  
  <line x1="547" y1="240" x2="570" y2="240" stroke="#1e3a8a" stroke-width="1.5"/>
  <line x1="570" y1="240" x2="570" y2="260" stroke="#1e3a8a" stroke-width="1.5"/>
  <line x1="570" y1="260" x2="552" y2="260" stroke="#1e3a8a" stroke-width="1.5" marker-end="url(#seqArrow)"/>
  <text x="578" y="254" font-size="10" fill="#1e3a8a">Atomic CAS Lock TTL=600s</text>

  <line x1="542" y1="285" x2="240" y2="285" stroke="#475569" stroke-width="1.5" stroke-dasharray="3 3" marker-end="url(#dashArrow)"/>
  <text x="393" y="280" font-size="10.5" fill="#475569" text-anchor="middle">LockGranted(lockExpiresAt=10:45:00)</text>

  <!-- Sequence Step 3: Passenger Details & Checkout -->
  <line x1="92" y1="320" x2="240" y2="320" stroke="#1e3a8a" stroke-width="1.5" marker-end="url(#seqArrow)"/>
  <text x="166" y="314" font-size="10.5" fill="#1e3a8a" text-anchor="middle">4. enterPassenger(Rahul, 29, Male)</text>

  <line x1="92" y1="355" x2="240" y2="355" stroke="#1e3a8a" stroke-width="1.5" marker-end="url(#seqArrow)"/>
  <text x="166" y="349" font-size="10.5" fill="#1e3a8a" text-anchor="middle">5. confirmPayment(UPI / NetBanking)</text>

  <line x1="240" y1="380" x2="705" y2="380" stroke="#1e3a8a" stroke-width="1.5" marker-end="url(#seqArrow)"/>
  <text x="472" y="374" font-size="10.5" fill="#1e3a8a" text-anchor="middle">POST /api/bookings/create (Auth Bearer)</text>

  <!-- Activation on BookingService -->
  <rect x="700" y="380" width="10" height="170" fill="#cbd5e1" stroke="#1e3a8a"/>

  <line x1="705" y1="405" x2="547" y2="405" stroke="#1e3a8a" stroke-width="1.5" marker-end="url(#seqArrow)"/>
  <text x="626" y="399" font-size="10" fill="#1e3a8a" text-anchor="middle">verifyLockOwnership(seatId=15)</text>

  <line x1="547" y1="420" x2="705" y2="420" stroke="#475569" stroke-width="1.5" stroke-dasharray="3 3" marker-end="url(#dashArrow)"/>
  <text x="626" y="415" font-size="10" fill="#475569" text-anchor="middle">lockValid: OK</text>

  <!-- Booking and PNR generation -->
  <line x1="705" y1="445" x2="862" y2="445" stroke="#1e3a8a" stroke-width="1.5" marker-end="url(#seqArrow)"/>
  <text x="783" y="439" font-size="10" fill="#1e3a8a" text-anchor="middle">saveBooking(PNR=4827193056, CONFIRMED)</text>

  <line x1="705" y1="475" x2="862" y2="475" stroke="#1e3a8a" stroke-width="1.5" marker-end="url(#seqArrow)"/>
  <text x="783" y="469" font-size="10" fill="#1e3a8a" text-anchor="middle">generateZXingQRCodeBase64(PNR, Payload)</text>

  <line x1="862" y1="500" x2="705" y2="500" stroke="#475569" stroke-width="1.5" stroke-dasharray="3 3" marker-end="url(#dashArrow)"/>
  <text x="783" y="494" font-size="10" fill="#475569" text-anchor="middle">qrBase64 [data:image/png;base64...]</text>

  <line x1="705" y1="525" x2="547" y2="525" stroke="#1e3a8a" stroke-width="1.5" marker-end="url(#seqArrow)"/>
  <text x="626" y="520" font-size="10" fill="#1e3a8a" text-anchor="middle">releaseSeatLock(seatId=15)</text>

  <line x1="700" y1="550" x2="240" y2="550" stroke="#475569" stroke-width="1.5" stroke-dasharray="3 3" marker-end="url(#dashArrow)"/>
  <text x="470" y="544" font-size="10.5" fill="#475569" text-anchor="middle">HTTP 201 Created: BookingConfirmedDTO</text>

  <!-- Step 4: Digital Travel Pass Presentation -->
  <line x1="240" y1="585" x2="92" y2="585" stroke="#1e3a8a" stroke-width="1.5" marker-end="url(#seqArrow)"/>
  <text x="166" y="579" font-size="10.5" fill="#1e3a8a" text-anchor="middle">Render Digital Travel Pass + Scannable QR</text>

  <!-- Note box -->
  <rect x="180" y="615" width="580" height="42" rx="4" fill="#fef3c7" stroke="#d97706" stroke-width="1"/>
  <text x="470" y="632" font-size="10.5" font-weight="bold" fill="#92400e" text-anchor="middle">Guaranteed Zero-Double-Booking Guarantee:</text>
  <text x="470" y="647" font-size="10" fill="#92400e" text-anchor="middle">Atomic ConcurrentHashMap TTL protects peak Tatkal transactions; ZXing and local ISO 18004 provide infallible offline validation.</text>

</svg>'''

def get_uml_page3_usecase_statemachine_svg():
    return '''<svg width="100%" height="700" viewBox="0 0 950 700" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Segoe UI', Arial, sans-serif;">
  <defs>
    <filter id="shadow3" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="2" dy="2" stdDeviation="2.5" flood-color="#000000" flood-opacity="0.12"/>
    </filter>
    <marker id="uArrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#1e3a8a"/>
    </marker>
  </defs>

  <rect x="15" y="10" width="920" height="34" rx="4" fill="#1e3a8a"/>
  <text x="475" y="33" font-size="14.5" font-weight="bold" fill="#ffffff" text-anchor="middle">Figure 4.3: System Use Case Model &amp; Seat Reservation State Transition Machine</text>

  <!-- PART A: USE CASE MODEL (Top Half) -->
  <rect x="25" y="55" width="900" height="340" rx="6" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="45" y="78" font-size="13" font-weight="bold" fill="#0f172a">PART A: Unified Railway System Use Case Diagram</text>

  <!-- Actor 1: Passenger -->
  <g transform="translate(60, 150)">
    <circle cx="20" cy="15" r="14" fill="#ffffff" stroke="#1e3a8a" stroke-width="2"/>
    <line x1="20" y1="29" x2="20" y2="65" stroke="#1e3a8a" stroke-width="2"/>
    <line x1="0" y1="42" x2="40" y2="42" stroke="#1e3a8a" stroke-width="2"/>
    <line x1="20" y1="65" x2="5" y2="95" stroke="#1e3a8a" stroke-width="2"/>
    <line x1="20" y1="65" x2="35" y2="95" stroke="#1e3a8a" stroke-width="2"/>
    <text x="20" y="112" font-size="11" font-weight="bold" fill="#0f172a" text-anchor="middle">Passenger</text>
  </g>

  <!-- Actor 2: Administrator -->
  <g transform="translate(850, 110)">
    <circle cx="20" cy="15" r="14" fill="#ffffff" stroke="#b45309" stroke-width="2"/>
    <line x1="20" y1="29" x2="20" y2="65" stroke="#b45309" stroke-width="2"/>
    <line x1="0" y1="42" x2="40" y2="42" stroke="#b45309" stroke-width="2"/>
    <line x1="20" y1="65" x2="5" y2="95" stroke="#b45309" stroke-width="2"/>
    <line x1="20" y1="65" x2="35" y2="95" stroke="#b45309" stroke-width="2"/>
    <text x="20" y="112" font-size="11" font-weight="bold" fill="#b45309" text-anchor="middle">Admin (ks9312)</text>
  </g>

  <!-- Actor 3: TTE Inspector -->
  <g transform="translate(850, 245)">
    <circle cx="20" cy="15" r="14" fill="#ffffff" stroke="#15803d" stroke-width="2"/>
    <line x1="20" y1="29" x2="20" y2="65" stroke="#15803d" stroke-width="2"/>
    <line x1="0" y1="42" x2="40" y2="42" stroke="#15803d" stroke-width="2"/>
    <line x1="20" y1="65" x2="5" y2="95" stroke="#15803d" stroke-width="2"/>
    <line x1="20" y1="65" x2="35" y2="95" stroke="#15803d" stroke-width="2"/>
    <text x="20" y="112" font-size="11" font-weight="bold" fill="#15803d" text-anchor="middle">TTE Inspector</text>
  </g>

  <!-- Use Cases (Ellipses) -->
  <!-- UC1 -->
  <g transform="translate(200, 95)">
    <ellipse cx="90" cy="22" rx="90" ry="22" fill="#ffffff" stroke="#1e3a8a" stroke-width="1.5" filter="url(#shadow3)"/>
    <text x="90" y="26" font-size="11" font-weight="600" fill="#0f172a" text-anchor="middle">Search Multi-Hop Trains</text>
  </g>
  <!-- UC2 -->
  <g transform="translate(200, 150)">
    <ellipse cx="90" cy="22" rx="90" ry="22" fill="#ffffff" stroke="#1e3a8a" stroke-width="1.5" filter="url(#shadow3)"/>
    <text x="90" y="26" font-size="11" font-weight="600" fill="#0f172a" text-anchor="middle">Select Berth &amp; Coach</text>
  </g>
  <!-- UC3 -->
  <g transform="translate(200, 205)">
    <ellipse cx="90" cy="22" rx="90" ry="22" fill="#ffffff" stroke="#1e3a8a" stroke-width="1.5" filter="url(#shadow3)"/>
    <text x="90" y="26" font-size="11" font-weight="600" fill="#0f172a" text-anchor="middle">Book Ticket &amp; Pay</text>
  </g>
  <!-- UC4 -->
  <g transform="translate(200, 260)">
    <ellipse cx="90" cy="22" rx="90" ry="22" fill="#ffffff" stroke="#1e3a8a" stroke-width="1.5" filter="url(#shadow3)"/>
    <text x="90" y="26" font-size="11" font-weight="600" fill="#0f172a" text-anchor="middle">P2P Berth Mutual Exchange</text>
  </g>
  <!-- UC5 -->
  <g transform="translate(200, 315)">
    <ellipse cx="90" cy="22" rx="90" ry="22" fill="#ffffff" stroke="#1e3a8a" stroke-width="1.5" filter="url(#shadow3)"/>
    <text x="90" y="26" font-size="11" font-weight="600" fill="#0f172a" text-anchor="middle">View Journey Weather Alert</text>
  </g>

  <!-- Admin UC6 -->
  <g transform="translate(560, 95)">
    <ellipse cx="105" cy="22" rx="105" ry="22" fill="#ffffff" stroke="#b45309" stroke-width="1.5" filter="url(#shadow3)"/>
    <text x="105" y="26" font-size="11" font-weight="600" fill="#0f172a" text-anchor="middle">Manage Station Network (CRUD)</text>
  </g>
  <!-- Admin UC7 -->
  <g transform="translate(560, 150)">
    <ellipse cx="105" cy="22" rx="105" ry="22" fill="#ffffff" stroke="#b45309" stroke-width="1.5" filter="url(#shadow3)"/>
    <text x="105" y="26" font-size="11" font-weight="600" fill="#0f172a" text-anchor="middle">Schedule Fleet &amp; Edit Routes</text>
  </g>
  <!-- Admin UC8 -->
  <g transform="translate(560, 205)">
    <ellipse cx="105" cy="22" rx="105" ry="22" fill="#ffffff" stroke="#b45309" stroke-width="1.5" filter="url(#shadow3)"/>
    <text x="105" y="26" font-size="11" font-weight="600" fill="#0f172a" text-anchor="middle">Configure Dynamic Fare Rules</text>
  </g>
  <!-- TTE UC9 -->
  <g transform="translate(560, 275)">
    <ellipse cx="105" cy="22" rx="105" ry="22" fill="#ffffff" stroke="#15803d" stroke-width="1.5" filter="url(#shadow3)"/>
    <text x="105" y="26" font-size="11" font-weight="600" fill="#0f172a" text-anchor="middle">Verify QR Pass &amp; Clear Berth Swap</text>
  </g>

  <!-- Passenger Links -->
  <line x1="100" y1="180" x2="200" y2="117" stroke="#1e3a8a" stroke-width="1.2"/>
  <line x1="100" y1="180" x2="200" y2="172" stroke="#1e3a8a" stroke-width="1.2"/>
  <line x1="100" y1="180" x2="200" y2="227" stroke="#1e3a8a" stroke-width="1.2"/>
  <line x1="100" y1="180" x2="200" y2="282" stroke="#1e3a8a" stroke-width="1.2"/>
  <line x1="100" y1="180" x2="200" y2="337" stroke="#1e3a8a" stroke-width="1.2"/>

  <!-- Admin Links -->
  <line x1="840" y1="145" x2="770" y2="117" stroke="#b45309" stroke-width="1.2"/>
  <line x1="840" y1="145" x2="770" y2="172" stroke="#b45309" stroke-width="1.2"/>
  <line x1="840" y1="145" x2="770" y2="227" stroke="#b45309" stroke-width="1.2"/>

  <!-- TTE Links -->
  <line x1="840" y1="280" x2="770" y2="297" stroke="#15803d" stroke-width="1.2"/>
  <line x1="840" y1="280" x2="380" y2="282" stroke="#15803d" stroke-width="1" stroke-dasharray="3 3"/>

  <!-- PART B: SEAT & BOOKING LIFECYCLE STATE MACHINE (Bottom Half) -->
  <rect x="25" y="410" width="900" height="275" rx="6" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="45" y="432" font-size="13" font-weight="bold" fill="#0f172a">PART B: Seat Reservation &amp; Berth Lifecycle State Machine Diagram</text>

  <!-- Start State -->
  <circle cx="65" cy="510" r="10" fill="#0f172a"/>

  <line x1="75" y1="510" x2="130" y2="510" stroke="#1e3a8a" stroke-width="1.8" marker-end="url(#uArrow)"/>
  <text x="102" y="502" font-size="9.5" fill="#1e3a8a" text-anchor="middle">init</text>

  <!-- State 1: AVAILABLE -->
  <g transform="translate(130, 485)" filter="url(#shadow3)">
    <rect x="0" y="0" width="120" height="50" rx="8" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
    <text x="60" y="24" font-size="12" font-weight="bold" fill="#065f46" text-anchor="middle">AVAILABLE</text>
    <text x="60" y="40" font-size="9" fill="#047857" text-anchor="middle">Ready for booking</text>
  </g>

  <!-- Transition to LOCKED -->
  <line x1="250" y1="510" x2="330" y2="510" stroke="#1e3a8a" stroke-width="1.8" marker-end="url(#uArrow)"/>
  <text x="290" y="502" font-size="9.5" font-weight="bold" fill="#1e3a8a" text-anchor="middle">lockSeat()</text>

  <!-- State 2: TEMPORARILY_LOCKED -->
  <g transform="translate(330, 480)" filter="url(#shadow3)">
    <rect x="0" y="0" width="150" height="60" rx="8" fill="#fffbeb" stroke="#f59e0b" stroke-width="2"/>
    <text x="75" y="24" font-size="11.5" font-weight="bold" fill="#92400e" text-anchor="middle">TEMP_LOCKED</text>
    <text x="75" y="40" font-size="9" fill="#b45309" text-anchor="middle">TTL: 10 Minutes</text>
    <text x="75" y="52" font-size="8.5" fill="#78350f" text-anchor="middle">Exclusive Session Hold</text>
  </g>

  <!-- Loop back on TTL Expire -->
  <path d="M 405,480 C 405,445 190,445 190,485" fill="none" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#uArrow)"/>
  <text x="300" y="442" font-size="9.5" font-weight="bold" fill="#dc2626" text-anchor="middle">TTL Timeout (10m) / Cancel</text>

  <!-- Transition to CONFIRMED -->
  <line x1="480" y1="510" x2="560" y2="510" stroke="#1e3a8a" stroke-width="1.8" marker-end="url(#uArrow)"/>
  <text x="520" y="502" font-size="9.5" font-weight="bold" fill="#1e3a8a" text-anchor="middle">PaymentOK</text>

  <!-- State 3: CONFIRMED -->
  <g transform="translate(560, 485)" filter="url(#shadow3)">
    <rect x="0" y="0" width="140" height="50" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
    <text x="70" y="24" font-size="12" font-weight="bold" fill="#1e40af" text-anchor="middle">CONFIRMED</text>
    <text x="70" y="40" font-size="9" fill="#2563eb" text-anchor="middle">PNR Issued + QR Pass</text>
  </g>

  <!-- Transition to EXCHANGE_REQUESTED -->
  <line x1="630" y1="535" x2="630" y2="590" stroke="#8b5cf6" stroke-width="1.8" marker-end="url(#uArrow)"/>
  <text x="645" y="565" font-size="9" font-weight="bold" fill="#7c3aed">requestSwap()</text>

  <!-- State 4: EXCHANGE_PENDING -->
  <g transform="translate(560, 590)" filter="url(#shadow3)">
    <rect x="0" y="0" width="140" height="50" rx="8" fill="#faf5ff" stroke="#a855f7" stroke-width="2"/>
    <text x="70" y="22" font-size="11" font-weight="bold" fill="#6b21a8" text-anchor="middle">SWAP_PENDING</text>
    <text x="70" y="38" font-size="9" fill="#9333ea" text-anchor="middle">Consent Handshake</text>
  </g>

  <path d="M 700,615 L 750,615 L 750,510 L 700,510" fill="none" stroke="#8b5cf6" stroke-width="1.5" stroke-dasharray="3 3" marker-end="url(#uArrow)"/>
  <text x="785" y="565" font-size="9" fill="#7c3aed">Accepted</text>

  <!-- Transition to CHECKED_IN -->
  <line x1="700" y1="510" x2="780" y2="510" stroke="#1e3a8a" stroke-width="1.8" marker-end="url(#uArrow)"/>
  <text x="740" y="502" font-size="9.5" font-weight="bold" fill="#1e3a8a" text-anchor="middle">TTE Scan</text>

  <!-- State 5: COMPLETED -->
  <g transform="translate(780, 485)" filter="url(#shadow3)">
    <rect x="0" y="0" width="100" height="50" rx="8" fill="#f1f5f9" stroke="#475569" stroke-width="2"/>
    <text x="50" y="24" font-size="11.5" font-weight="bold" fill="#334155" text-anchor="middle">BOARDED</text>
    <text x="50" y="40" font-size="9" fill="#64748b" text-anchor="middle">Journey Ended</text>
  </g>

  <line x1="880" y1="510" x2="905" y2="510" stroke="#0f172a" stroke-width="1.8" marker-end="url(#uArrow)"/>
  <circle cx="915" cy="510" r="9" fill="none" stroke="#0f172a" stroke-width="2"/>
  <circle cx="915" cy="510" r="5" fill="#0f172a"/>

</svg>'''

print("UML SVGs module loaded successfully.")
