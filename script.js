/**
 * INDUS PORTAL - INDUSTRIAL MATERIAL PROCUREMENT PLATFORM
 * Main JavaScript File (script.js)
 * 
 * Features:
 *  - Comprehensive Industrial Materials Dataset (16 Verified Materials across 4 Categories)
 *  - Interactive Technical Specification Comparison Drawer & Matrix Modal
 *  - Real-Time Search, Category Tabs, Stock Availability & Price Sorting Filters
 *  - Enterprise RFQ Submission with Dual Storage (AWS Lambda API + LocalStorage Cache)
 *  - Printable Formal Purchase Requisition Generator
 *  - Live 4-Phase RFQ Status Tracker Widget
 *  - Verified Mill Supplier Onboarding Application Workflow
 *  - Advanced Admin Procurement Dashboard (Live Status Management, Status Filters, CSV Export)
 */

// ==========================================================================
// 1. INDUSTRIAL MATERIALS DATASET (16 Verified Technical Specifications)
// ==========================================================================
const materialsData = [
  // --- Category 1: Steel Plates ---
  {
    id: "mat-plate-01",
    name: "ASTM A36 / IS 2062 Mild Steel Plate",
    category: "Steel Plates",
    categoryKey: "steel-plates",
    standard: "ASTM A36 / IS 2062 Gr E250",
    priceINR: "₹62,500",
    priceUnit: "per Metric Ton",
    priceNumeric: 62500,
    stockStatus: "In Stock - Mill Tested",
    leadTime: "24-48 Hours Ready Stock",
    minOrder: "5 Metric Tons (MT)",
    millOrigin: "TATA Steel / SAIL / JSPL",
    description: "Structural grade hot-rolled carbon steel plate suited for heavy fabrication, bridges, and industrial building frames.",
    specs: {
      "Thickness Range": "5 mm to 65 mm",
      "Standard Width": "1250 / 1500 / 2000 mm",
      "Yield Strength": "Min 250 MPa",
      "Tensile Strength": "410 - 540 MPa",
      "Certification": "EN 10204 3.1 MTR"
    },
    iconType: "plate"
  },
  {
    id: "mat-plate-02",
    name: "Boiler Quality Plate SA 516 Grade 70",
    category: "Steel Plates",
    categoryKey: "steel-plates",
    standard: "ASME SA 516 / ASTM A516 Gr 70",
    priceINR: "₹76,800",
    priceUnit: "per Metric Ton",
    priceNumeric: 76800,
    stockStatus: "Ready Dispatch",
    leadTime: "Immediate Yard Dispatch",
    minOrder: "2 Metric Tons (MT)",
    millOrigin: "Jindal Steel & Power / SAIL",
    description: "High-integrity carbon steel plates for moderate- and lower-temperature service in pressurized boilers and reaction vessels.",
    specs: {
      "Thickness Range": "8 mm to 80 mm",
      "Impact Tested": "Charpy V-Notch at -46°C",
      "Tensile Strength": "485 - 620 MPa",
      "Inspection": "Ultrasonic Tested (UT Level II)",
      "Certification": "EN 10204 3.1 + IBR Form IV"
    },
    iconType: "plate"
  },
  {
    id: "mat-plate-03",
    name: "High Abrasion Hardox 400 Wear Plate",
    category: "Steel Plates",
    categoryKey: "steel-plates",
    standard: "EN 10025-6 / Hardox 400 Equivalent",
    priceINR: "₹1,24,000",
    priceUnit: "per Metric Ton",
    priceNumeric: 124000,
    stockStatus: "Special Lot",
    leadTime: "3-5 Days Cutting & Prep",
    minOrder: "1 Metric Ton (MT)",
    millOrigin: "SSAB Certified Stock / Imported",
    description: "Wear-resistant steel plate with 400 HBW nominal hardness, engineered for excavator buckets, chutes, crushers, and mining skips.",
    specs: {
      "Hardness Range": "370 - 430 HBW",
      "Thickness Range": "6 mm to 50 mm",
      "Yield Point": "1000 MPa",
      "Process": "Quenched & Tempered (Q&T)",
      "Certification": "EN 10204 3.1 MTR"
    },
    iconType: "plate"
  },
  {
    id: "mat-plate-04",
    name: "Weathering Corten Steel Plate ASTM A588",
    category: "Steel Plates",
    categoryKey: "steel-plates",
    standard: "ASTM A588 Gr A/B / IRS M41",
    priceINR: "₹88,500",
    priceUnit: "per Metric Ton",
    priceNumeric: 88500,
    stockStatus: "In Stock - Mill Certified",
    leadTime: "48 Hours Yard Loading",
    minOrder: "3 Metric Tons (MT)",
    millOrigin: "TATA Steel / SAIL Bokaro",
    description: "Atmospheric corrosion-resistant structural steel developing a protective oxide patina, designed for railway wagons, bridges, and architectural facades.",
    specs: {
      "Thickness Range": "3 mm to 40 mm",
      "Corrosion Index": "ASTM G101 >= 6.0",
      "Yield Strength": "Min 345 MPa",
      "Tensile Strength": "Min 485 MPa",
      "Certification": "EN 10204 3.1 MTR"
    },
    iconType: "plate"
  },

  // --- Category 2: Stainless Steel Pipes ---
  {
    id: "mat-pipe-01",
    name: "SS 304 Seamless Industrial Process Pipe",
    category: "Stainless Steel Pipes",
    categoryKey: "ss-pipes",
    standard: "ASTM A312 / ASME SA312 TP304",
    priceINR: "₹420",
    priceUnit: "per Meter",
    priceNumeric: 420,
    stockStatus: "In Stock - Bulk Ready",
    leadTime: "24-48 Hours Ready Stock",
    minOrder: "60 Meters (10 Lengths)",
    millOrigin: "Jindal Stainless (JSL) / Ratnamani",
    description: "Austenitic stainless steel seamless pipe for chemical transport, pharmaceutical processing lines, and water treatment plants.",
    specs: {
      "Nominal Bore (NB)": "1/2 inch to 12 inches",
      "Schedule (Wall)": "SCH 10 / SCH 40 / SCH 80",
      "Surface Finish": "Annealed & Pickled",
      "Hydro Test": "Tested up to 3000 PSI",
      "Certification": "EN 10204 3.1 MTR"
    },
    iconType: "pipe"
  },
  {
    id: "mat-pipe-02",
    name: "SS 316L Chemical Grade Heavy Pipe",
    category: "Stainless Steel Pipes",
    categoryKey: "ss-pipes",
    standard: "ASTM A312 TP316L (Low Carbon)",
    priceINR: "₹680",
    priceUnit: "per Meter",
    priceNumeric: 680,
    stockStatus: "In Stock",
    leadTime: "24-48 Hours Dispatch",
    minOrder: "36 Meters (6 Lengths)",
    millOrigin: "Jindal Stainless / Viraj Profiles",
    description: "Molybdenum-bearing grade offering superior chloride pitting resistance for offshore oil rigs, marine piping, and acid plants.",
    specs: {
      "Molybdenum (Mo)": "2.0% - 3.0%",
      "Schedule (Wall)": "SCH 40 / SCH 80 / SCH 160",
      "End Connections": "Beveled Ends / Plain Ends",
      "Corrosion Norm": "NACE MR0175 Compliant",
      "Certification": "EN 10204 3.1 MTR"
    },
    iconType: "pipe"
  },
  {
    id: "mat-pipe-03",
    name: "SS 201 Welded Ornamental & Flow Tube",
    category: "Stainless Steel Pipes",
    categoryKey: "ss-pipes",
    standard: "ASTM A554 Welded Grade",
    priceINR: "₹230",
    priceUnit: "per Meter",
    priceNumeric: 230,
    stockStatus: "High Inventory",
    leadTime: "Immediate Yard Dispatch",
    minOrder: "100 Meters",
    millOrigin: "Apex Stainless / JSL Sub-Mill",
    description: "Economical austenitic pipe with high tensile strength for architectural railings, exhaust systems, and general industrial ducting.",
    specs: {
      "Outer Diameter": "19 mm to 101.6 mm",
      "Wall Thickness": "1.2 mm to 3.0 mm",
      "Finish": "600 Grit Mirror / Satin Buff",
      "Standard Length": "6.0 Meters (Single Random)",
      "Certification": "Mill Test Certificate"
    },
    iconType: "pipe"
  },
  {
    id: "mat-pipe-04",
    name: "Carbon Steel Seamless Line Pipe API 5L Gr B",
    category: "Stainless Steel Pipes",
    categoryKey: "ss-pipes",
    standard: "API 5L Gr B / ASTM A106 Gr B",
    priceINR: "₹340",
    priceUnit: "per Meter",
    priceNumeric: 340,
    stockStatus: "In Stock - PSL2 Certified",
    leadTime: "24-48 Hours Loading",
    minOrder: "50 Meters",
    millOrigin: "Maharashtra Seamless (MSL) / Jindal SAW",
    description: "Heavy duty carbon steel seamless line pipe designed for high-pressure natural gas lines, refinery hydrocrackers, and steam boilers.",
    specs: {
      "Size Range": "1/2 inch to 24 inches NB",
      "Schedule": "SCH 40 / SCH 80 / SCH XS",
      "Hydrostatic Test": "100% Factory Hydro Tested",
      "Compliance": "IBR / API 5L PSL2 Monogram",
      "Certification": "EN 10204 3.1 + IBR Form III-A"
    },
    iconType: "pipe"
  },

  // --- Category 3: Industrial Valves ---
  {
    id: "mat-valve-01",
    name: "Cast Steel Flanged Gate Valve Class 150",
    category: "Industrial Valves",
    categoryKey: "valves",
    standard: "API 600 / BS 1414 / ASME B16.34",
    priceINR: "₹4,850",
    priceUnit: "per Piece",
    priceNumeric: 4850,
    stockStatus: "Ready in Yard",
    leadTime: "24-48 Hours Dispatch",
    minOrder: "2 Pieces",
    millOrigin: "L&T Valves / Audco / Kirloskar",
    description: "Heavy duty bolted bonnet gate valve with flexible wedge disc and 13Cr stem trim, suitable for steam, oil, and hydrocarbon lines.",
    specs: {
      "Pressure Class": "Class 150 (PN 20)",
      "Size Range": "2 inches to 12 inches (DN50 - DN300)",
      "Body Material": "ASTM A216 Gr WCB",
      "Face-to-Face": "ASME B16.10 Standard",
      "Certification": "EN 10204 3.1 Hydro Tested"
    },
    iconType: "valve"
  },
  {
    id: "mat-valve-02",
    name: "Forged Carbon Steel High-Pressure Ball Valve",
    category: "Industrial Valves",
    categoryKey: "valves",
    standard: "BS 5351 / ISO 17292 / Class 800",
    priceINR: "₹2,150",
    priceUnit: "per Piece",
    priceNumeric: 2150,
    stockStatus: "In Stock",
    leadTime: "24 Hours Ready Stock",
    minOrder: "5 Pieces",
    millOrigin: "Microfinish / L&T Flow Control",
    description: "Three-piece body design with blow-out proof stem, PTFE reinforced seats, and fire-safe construction for utility manifolds.",
    specs: {
      "Pressure Rating": "800 PSI / Class 800",
      "Size Range": "1/2 inch to 2 inches (DN15 - DN50)",
      "Body Material": "ASTM A105 Forged Steel",
      "Connection": "Socket Weld (SW) / Screwed NPT",
      "Certification": "API 607 Fire-Safe Certified"
    },
    iconType: "valve"
  },
  {
    id: "mat-valve-03",
    name: "Wafer Type Cast Iron Butterfly Valve PN16",
    category: "Industrial Valves",
    categoryKey: "valves",
    standard: "API 609 Cat A / EN 593 / PN16",
    priceINR: "₹2,650",
    priceUnit: "per Piece",
    priceNumeric: 2650,
    stockStatus: "Immediate Dispatch",
    leadTime: "Ready Stock Ex-Yard",
    minOrder: "4 Pieces",
    millOrigin: "Advance Valves / Intervalve Poonawalla",
    description: "Concentric disc bi-directional sealing valve with replaceable EPDM liner, designed for cooling water circuits and HVAC lines.",
    specs: {
      "Pressure Rating": "PN10 / PN16",
      "Disc Material": "SS 304 / CF8 Stainless Steel",
      "Liner": "Molded EPDM Food/Industrial Grade",
      "Operation": "Hand Lever / Gear Operator",
      "Certification": "Hydro Tested to ISO 5208"
    },
    iconType: "valve"
  },
  {
    id: "mat-valve-04",
    name: "Dual Plate Wafer Non-Return Check Valve",
    category: "Industrial Valves",
    categoryKey: "valves",
    standard: "API 594 / ASME B16.34 Class 150/300",
    priceINR: "₹3,900",
    priceUnit: "per Piece",
    priceNumeric: 3900,
    stockStatus: "In Stock",
    leadTime: "48 Hours Yard Dispatch",
    minOrder: "2 Pieces",
    millOrigin: "Crescent Valves / L&T Flow",
    description: "Compact dual-plate non-slam check valve with torsion spring closure, eliminating water hammer and protecting downstream pumps.",
    specs: {
      "Design Standard": "API 594 Short Pattern",
      "Size Range": "2 inches to 16 inches (DN50 - DN400)",
      "Body / Plates": "WCB Body / SS 316 Plates",
      "Spring Material": "Inconel X-750 Heavy Duty",
      "Certification": "EN 10204 3.1 MTR"
    },
    iconType: "valve"
  },

  // --- Category 4: Fasteners ---
  {
    id: "mat-fastener-01",
    name: "High Tensile Grade 8.8 / 10.9 Hex Bolts & Nuts",
    category: "Fasteners",
    categoryKey: "fasteners",
    standard: "DIN 933 / DIN 931 / ISO 4017",
    priceINR: "₹45",
    priceUnit: "per Piece (Bulk Lot)",
    priceNumeric: 45,
    stockStatus: "Bulk Quantities Ready",
    leadTime: "Immediate Warehouse Dispatch",
    minOrder: "250 Pieces / 1 Box",
    millOrigin: "Unbrako / Sundram Fasteners (TVS)",
    description: "Precision cold-forged high-strength structural bolts with zinc-phosphated finish for machinery assembly and steel structures.",
    specs: {
      "Size Range": "M10 to M36 Diameter",
      "Length Range": "30 mm to 250 mm",
      "Material Grade": "High Tensile Medium Carbon 8.8",
      "Coating": "Hot Dip Galv (HDG) / Black Oxide",
      "Certification": "IS 1367 / EN 10204 3.1"
    },
    iconType: "fastener"
  },
  {
    id: "mat-fastener-02",
    name: "SS 316 Continuous Thread Stud Bolts",
    category: "Fasteners",
    categoryKey: "fasteners",
    standard: "ASTM A193 Gr B8M / Nuts: A194 Gr 8M",
    priceINR: "₹185",
    priceUnit: "per Stud Set (with 2 Nuts)",
    priceNumeric: 185,
    stockStatus: "In Stock",
    leadTime: "24-48 Hours Loading",
    minOrder: "50 Stud Sets",
    millOrigin: "Precision Fasteners / Viraj Profiles",
    description: "High-alloy austenitic stainless steel stud bolts for pressurized pipe flanges, heat exchangers, and cryogenic valves.",
    specs: {
      "Diameter Range": "1/2 inch to 1-1/2 inches",
      "Thread Type": "UNC / 8-UN Thread Series",
      "Alloy Grade": "AISI 316 Stainless Steel",
      "Proof Load": "Min 30,000 PSI",
      "Certification": "EN 10204 3.1 Chemical & Mechanical"
    },
    iconType: "fastener"
  },
  {
    id: "mat-fastener-03",
    name: "Heavy Duty J-Type Foundation Anchor Bolts",
    category: "Fasteners",
    categoryKey: "fasteners",
    standard: "IS 5624 / ASTM F1554 Gr 36/55",
    priceINR: "₹310",
    priceUnit: "per Anchor Unit",
    priceNumeric: 310,
    stockStatus: "Factory Custom Cut",
    leadTime: "3-4 Days Fabrication",
    minOrder: "20 Anchor Sets",
    millOrigin: "Apex Structural Fasteners / SAIL Stock",
    description: "Cast-in-place concrete foundation anchor bolts with hook profile for heavy machine bases, tower columns, and substation gantries.",
    specs: {
      "Diameter": "M16 to M48",
      "Total Length": "300 mm to 1200 mm",
      "Core Material": "IS 2062 / EN8 Structural Steel",
      "Accessories": "Supplied with Heavy Hex Nut & Washer",
      "Certification": "Tensile & Bend Tested Certificate"
    },
    iconType: "fastener"
  },
  {
    id: "mat-fastener-04",
    name: "SS 304 / 316 Spring Washers & Nylon Locknuts",
    category: "Fasteners",
    categoryKey: "fasteners",
    standard: "DIN 127B / DIN 985 / ISO 7040",
    priceINR: "₹18",
    priceUnit: "per Set",
    priceNumeric: 18,
    stockStatus: "In Stock - High Inventory",
    leadTime: "Immediate Dispatch",
    minOrder: "500 Sets",
    millOrigin: "Unbrako / Sterling Fasteners",
    description: "Anti-vibration locking fasteners engineered to prevent loosening under dynamic cyclic shock in rotating equipment and turbines.",
    specs: {
      "Thread Sizes": "M6 to M30 Metric Coarse",
      "Locking Element": "Reinforced Polyamide Nylon Ring",
      "Spring Steel": "Hardened AISI 304 / 316",
      "Hardness Range": "44 to 51 HRC",
      "Certification": "RoHS & Reach Compliant"
    },
    iconType: "fastener"
  }
];

// ==========================================================================
// 2. INDUSTRIAL TECHNICAL SVG ICONS
// ==========================================================================
function getIndustrialIcon(type) {
  switch (type) {
    case "plate":
      return `
        <svg class="card-svg-graphic" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="10,22 34,10 54,20 30,32" stroke="#93c5fd" fill="rgba(147, 197, 253, 0.15)"/>
          <polygon points="10,22 30,32 30,38 10,28" stroke="#60a5fa" fill="rgba(96, 165, 250, 0.3)"/>
          <polygon points="30,32 54,20 54,26 30,38" stroke="#3b82f6" fill="rgba(59, 130, 246, 0.4)"/>
          <polygon points="10,38 34,26 54,36 30,48" stroke="#93c5fd" fill="rgba(147, 197, 253, 0.2)"/>
          <polygon points="10,38 30,48 30,54 10,44" stroke="#60a5fa" fill="rgba(96, 165, 250, 0.45)"/>
          <polygon points="30,48 54,36 54,42 30,54" stroke="#3b82f6" fill="rgba(59, 130, 246, 0.6)"/>
          <line x1="6" y1="22" x2="6" y2="44" stroke="#cbd5e1" stroke-dasharray="2 2" stroke-width="1.5"/>
          <circle cx="6" cy="22" r="1.5" fill="#cbd5e1"/>
          <circle cx="6" cy="44" r="1.5" fill="#cbd5e1"/>
        </svg>
      `;
    case "pipe":
      return `
        <svg class="card-svg-graphic" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2">
          <ellipse cx="18" cy="32" rx="8" ry="16" stroke="#93c5fd" fill="rgba(147, 197, 253, 0.2)"/>
          <ellipse cx="18" cy="32" rx="4" ry="10" stroke="#bfdbfe" fill="rgba(15, 39, 68, 0.8)"/>
          <path d="M18,16 L48,16" stroke="#93c5fd"/>
          <path d="M18,48 L48,48" stroke="#93c5fd"/>
          <path d="M48,16 C53,16 57,23 57,32 C57,41 53,48 48,48" stroke="#60a5fa" fill="rgba(96, 165, 250, 0.35)"/>
          <line x1="22" y1="24" x2="48" y2="24" stroke="rgba(255,255,255,0.4)" stroke-dasharray="3 3"/>
          <line x1="22" y1="38" x2="48" y2="38" stroke="rgba(255,255,255,0.4)" stroke-dasharray="3 3"/>
        </svg>
      `;
    case "valve":
      return `
        <svg class="card-svg-graphic" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2">
          <ellipse cx="32" cy="14" rx="14" ry="4" stroke="#f59e0b" fill="rgba(245, 158, 11, 0.25)"/>
          <line x1="32" y1="14" x2="32" y2="28" stroke="#f59e0b" stroke-width="2.5"/>
          <path d="M12,24 L12,46 L32,35 L52,46 L52,24 L32,35 Z" stroke="#93c5fd" fill="rgba(96, 165, 250, 0.25)"/>
          <line x1="12" y1="20" x2="12" y2="50" stroke="#bfdbfe" stroke-width="3"/>
          <line x1="52" y1="20" x2="52" y2="50" stroke="#bfdbfe" stroke-width="3"/>
          <circle cx="32" cy="35" r="4" fill="#93c5fd"/>
        </svg>
      `;
    case "fastener":
      return `
        <svg class="card-svg-graphic" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="18,16 28,11 38,16 38,26 28,31 18,26" stroke="#93c5fd" fill="rgba(147, 197, 253, 0.25)"/>
          <path d="M25,29 L25,54 C25,56 31,56 31,54 L31,29" stroke="#60a5fa" fill="rgba(96, 165, 250, 0.15)"/>
          <line x1="25" y1="36" x2="31" y2="38" stroke="#bfdbfe"/>
          <line x1="25" y1="42" x2="31" y2="44" stroke="#bfdbfe"/>
          <line x1="25" y1="48" x2="31" y2="50" stroke="#bfdbfe"/>
          <polygon points="40,38 48,34 56,38 56,48 48,52 40,48" stroke="#f59e0b" fill="rgba(245, 158, 11, 0.2)"/>
          <circle cx="48" cy="43" r="3" stroke="#f59e0b"/>
        </svg>
      `;
    default:
      return `
        <svg class="card-svg-graphic" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="16" y="16" width="32" height="32" rx="4" stroke="#93c5fd"/>
        </svg>
      `;
  }
}

// ==========================================================================
// 3. APPLICATION STATE
// ==========================================================================
const state = {
  currentCategory: "all",
  searchQuery: "",
  stockFilter: "all",
  sortBy: "default",
  compareList: [],
  activeMaterials: [...materialsData]
};

// Seed B2B Enquiries for Realistic Offline / Startup Demonstration
const SEED_ENQUIRIES = [
  {
    enquiryId: "IMR-2026-8841",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    buyerName: "Rajesh Varma",
    companyName: "Larsen & Toubro Heavy Engineering",
    buyerEmail: "r.varma@heavyeng.lnt.com",
    buyerPhone: "+91 98201 44321",
    materialName: "Boiler Quality Plate SA 516 Grade 70",
    quantity: "60",
    quantityUnit: "Metric Tons (MT)",
    deliveryLocation: "Plant Yard 2, Hazira Complex, Surat - 394510",
    urgency: "Urgent (< 48 Hours)",
    testing: "EN 10204 3.1 MTR, UT Level II, IBR Form IV",
    status: "Quoted",
    additionalNotes: "Charpy impact tested at -46 deg C. Third-party inspection by TUV."
  },
  {
    enquiryId: "IMR-2026-8792",
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    buyerName: "Amit Kulkarni",
    companyName: "Tata Projects EPC Division",
    buyerEmail: "kulkarni.a@tataprojects.com",
    buyerPhone: "+91 94220 89102",
    materialName: "SS 316L Chemical Grade Heavy Pipe",
    quantity: "1200",
    quantityUnit: "Meters (m)",
    deliveryLocation: "Mundra Petrochemical Site, Kutch, Gujarat",
    urgency: "Standard (7-10 Days)",
    testing: "EN 10204 3.1 MTR, NACE MR0175",
    status: "Supplier Matching",
    additionalNotes: "SCH 80 wall thickness required. Single random 6m lengths."
  },
  {
    enquiryId: "IMR-2026-8650",
    createdAt: new Date(Date.now() - 3600000 * 42).toISOString(),
    buyerName: "Vikram Singhania",
    companyName: "Jindal Fabrication Works",
    buyerEmail: "v.singhania@jindalfab.in",
    buyerPhone: "+91 97555 12098",
    materialName: "High Tensile Grade 8.8 / 10.9 Hex Bolts & Nuts",
    quantity: "5000",
    quantityUnit: "Pieces / Nos",
    deliveryLocation: "Urla Industrial Area, Raipur, Chhattisgarh",
    urgency: "Standard (7-10 Days)",
    testing: "IS 1367 / EN 10204 3.1",
    status: "PO Issued",
    additionalNotes: "Hot-dip galvanized M24x120mm with heavy hex nuts."
  },
  {
    enquiryId: "IMR-2026-8519",
    createdAt: new Date(Date.now() - 3600000 * 70).toISOString(),
    buyerName: "S. Sundaram",
    companyName: "Chennai Petrochem Ancillaries Ltd",
    buyerEmail: "sundaram.s@chennaipetrochem.com",
    buyerPhone: "+91 98401 23984",
    materialName: "Cast Steel Flanged Gate Valve Class 150",
    quantity: "45",
    quantityUnit: "Pieces / Nos",
    deliveryLocation: "Manali Refinery Gate 3, Chennai - 600068",
    urgency: "Project Delivery (30+ Days)",
    testing: "API 600 Hydrostatic Test, EN 10204 3.1",
    status: "New RFQ",
    additionalNotes: "8 inch (DN200) WCB Body with 13Cr Trim. Hydro report mandatory."
  },
  {
    enquiryId: "IMR-2026-8412",
    createdAt: new Date(Date.now() - 3600000 * 110).toISOString(),
    buyerName: "Harpreet Singh",
    companyName: "Punjab Agro Engineering Works",
    buyerEmail: "harpreet@punjabagroeng.com",
    buyerPhone: "+91 98140 77123",
    materialName: "ASTM A36 / IS 2062 Mild Steel Plate",
    quantity: "35",
    quantityUnit: "Metric Tons (MT)",
    deliveryLocation: "Focal Point Phase V, Ludhiana, Punjab",
    urgency: "Standard (7-10 Days)",
    testing: "EN 10204 3.1 MTR",
    status: "Fulfilled",
    additionalNotes: "Flame-cut into 1500x3000mm profiles. Delivered with weighbridge slip."
  }
];

// ==========================================================================
// 4. DOM ELEMENTS
// ==========================================================================
const materialsGrid = document.getElementById("materialsGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("materialSearchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const categoryTabs = document.getElementById("categoryTabs");
const resultCountText = document.getElementById("resultCountText");
const resetFiltersBtn = document.getElementById("resetFiltersBtn");
const emptyResetBtn = document.getElementById("emptyResetBtn");
const stockFilterSelect = document.getElementById("stockFilterSelect");
const sortSelect = document.getElementById("sortSelect");

// Comparison Drawer & Modal Elements
const compareDrawer = document.getElementById("compareDrawer");
const compareCountBadge = document.getElementById("compareCountBadge");
const compareChipsList = document.getElementById("compareChipsList");
const openCompareBtn = document.getElementById("openCompareBtn");
const clearCompareBtn = document.getElementById("clearCompareBtn");
const compareModal = document.getElementById("compareModal");
const compareModalCloseBtn = document.getElementById("compareModalCloseBtn");
const compareModalCloseBottomBtn = document.getElementById("compareModalCloseBottomBtn");
const compareMatrixContainer = document.getElementById("compareMatrixContainer");

// Enquiry Form Elements
const enquiryForm = document.getElementById("enquiryForm");
const materialSelect = document.getElementById("materialSelect");
const optgroupPlates = document.getElementById("optgroupPlates");
const optgroupPipes = document.getElementById("optgroupPipes");
const optgroupValves = document.getElementById("optgroupValves");
const optgroupFasteners = document.getElementById("optgroupFasteners");
const quantityUnit = document.getElementById("quantityUnit");
const submitBtn = document.getElementById("submitBtn");

// Success Modal Elements
const successModal = document.getElementById("successModal");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalDoneBtn = document.getElementById("modalDoneBtn");
const modalRfqCode = document.getElementById("modalRfqCode");
const modalBuyerName = document.getElementById("modalBuyerName");
const modalCompany = document.getElementById("modalCompany");
const modalMaterial = document.getElementById("modalMaterial");
const modalQuantity = document.getElementById("modalQuantity");
const modalEmail = document.getElementById("modalEmail");
const printRequisitionBtn = document.getElementById("printRequisitionBtn");

// RFQ Live Tracker Elements
const trackerSearchBtn = document.getElementById("trackerSearchBtn");
const trackerInput = document.getElementById("trackerInput");
const trackerResultCard = document.getElementById("trackerResultCard");
const trackerError = document.getElementById("trackerError");

// Supplier Onboarding Elements
const openSupplierModalBtn = document.getElementById("openSupplierModalBtn");
const supplierModal = document.getElementById("supplierModal");
const supplierModalCloseBtn = document.getElementById("supplierModalCloseBtn");
const supplierForm = document.getElementById("supplierForm");

// Admin Dashboard Elements
const adminBtn = document.getElementById("adminBtn");
const adminModal = document.getElementById("adminModal");
const adminModalCloseBtn = document.getElementById("adminModalCloseBtn");
const adminCloseBottomBtn = document.getElementById("adminCloseBottomBtn");
const adminRefreshBtn = document.getElementById("adminRefreshBtn");
const adminSearchInput = document.getElementById("adminSearchInput");
const adminCountBadge = document.getElementById("adminCountBadge");
const adminTableBody = document.getElementById("adminTableBody");
const adminLoading = document.getElementById("adminLoading");
const adminEmpty = document.getElementById("adminEmpty");
const adminExportBtn = document.getElementById("adminExportBtn");
const adminStatusTabs = document.getElementById("adminStatusTabs");

// Navigation & Toast Elements
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mainNav = document.getElementById("mainNav");
const backToTopBtn = document.getElementById("backToTopBtn");
const toastNotification = document.getElementById("toastNotification");
const toastMessage = document.getElementById("toastMessage");

let allEnquiries = [];
let currentAdminFilter = "all";

// ==========================================================================
// 5. APPLICATION INITIALIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initEnquiriesCache();
  populateDropdownOptions();
  renderMaterials();
  updateCategoryCounts();
  setupEventListeners();
  setupNavbarScrollSpy();
  updateCompareDrawer();

  // Support direct view routing for screenshots, demonstrations, and deep links
  const urlParams = new URLSearchParams(window.location.search);
  const viewMode = urlParams.get("view");
  if (viewMode === "admin") {
    setTimeout(() => openAdminModal(), 200);
  } else if (viewMode === "compare") {
    state.compareList = ["mat-plate-01", "mat-plate-02", "mat-pipe-01"];
    updateCompareDrawer();
    renderMaterials();
    setTimeout(() => openCompareModal(), 250);
  } else if (viewMode === "catalog") {
    setTimeout(() => {
      const el = document.getElementById("materials");
      if (el) el.scrollIntoView();
    }, 200);
  } else if (viewMode === "pipeline") {
    setTimeout(() => {
      const el = document.getElementById("how-it-works");
      if (el) el.scrollIntoView();
    }, 200);
  } else if (viewMode === "rfq") {
    setTimeout(() => {
      const el = document.getElementById("enquiry");
      if (el) el.scrollIntoView();
    }, 200);
  }
});

// Initialize persistent enquiry storage with realistic B2B seeds
function initEnquiriesCache() {
  const localData = localStorage.getItem("indus_enquiries_cache");
  if (!localData) {
    localStorage.setItem("indus_enquiries_cache", JSON.stringify(SEED_ENQUIRIES));
    allEnquiries = [...SEED_ENQUIRIES];
  } else {
    try {
      allEnquiries = JSON.parse(localData);
      if (!Array.isArray(allEnquiries) || allEnquiries.length === 0) {
        allEnquiries = [...SEED_ENQUIRIES];
        localStorage.setItem("indus_enquiries_cache", JSON.stringify(SEED_ENQUIRIES));
      }
    } catch (e) {
      allEnquiries = [...SEED_ENQUIRIES];
    }
  }
}

// Populate Material Select Dropdown in RFQ Form
function populateDropdownOptions() {
  if (!optgroupPlates || !optgroupPipes || !optgroupValves || !optgroupFasteners) return;

  optgroupPlates.innerHTML = "";
  optgroupPipes.innerHTML = "";
  optgroupValves.innerHTML = "";
  optgroupFasteners.innerHTML = "";

  materialsData.forEach(mat => {
    const opt = document.createElement("option");
    opt.value = mat.name;
    opt.textContent = `${mat.name} (${mat.standard})`;

    switch (mat.categoryKey) {
      case "steel-plates":
        optgroupPlates.appendChild(opt);
        break;
      case "ss-pipes":
        optgroupPipes.appendChild(opt);
        break;
      case "valves":
        optgroupValves.appendChild(opt);
        break;
      case "fasteners":
        optgroupFasteners.appendChild(opt);
        break;
    }
  });
}

// Update counts on Category Filter Tabs
function updateCategoryCounts() {
  const countAll = document.getElementById("countAll");
  const countPlates = document.getElementById("countPlates");
  const countPipes = document.getElementById("countPipes");
  const countValves = document.getElementById("countValves");
  const countFasteners = document.getElementById("countFasteners");

  if (countAll) countAll.textContent = materialsData.length;
  if (countPlates) countPlates.textContent = materialsData.filter(m => m.categoryKey === "steel-plates").length;
  if (countPipes) countPipes.textContent = materialsData.filter(m => m.categoryKey === "ss-pipes").length;
  if (countValves) countValves.textContent = materialsData.filter(m => m.categoryKey === "valves").length;
  if (countFasteners) countFasteners.textContent = materialsData.filter(m => m.categoryKey === "fasteners").length;
}

// ==========================================================================
// 6. RENDER MATERIAL CARDS
// ==========================================================================
function renderMaterials() {
  if (!materialsGrid || !emptyState) return;

  const query = state.searchQuery.toLowerCase().trim();
  const category = state.currentCategory;
  const stockFilter = state.stockFilter;
  const sortBy = state.sortBy;

  // Filter dataset
  let filtered = materialsData.filter(item => {
    const matchesCategory = (category === "all" || item.categoryKey === category);

    // Stock availability filter
    let matchesStock = true;
    if (stockFilter === "in-stock") {
      matchesStock = item.stockStatus.toLowerCase().includes("in stock") || item.stockStatus.toLowerCase().includes("ready");
    } else if (stockFilter === "mill-order") {
      matchesStock = item.stockStatus.toLowerCase().includes("custom") || item.stockStatus.toLowerCase().includes("special");
    }

    // Search query matches product name, standard, specs, mill origin or description
    const specsString = Object.entries(item.specs).map(([k, v]) => `${k} ${v}`).join(" ");
    const searchBlob = `${item.name} ${item.standard} ${item.category} ${item.millOrigin || ""} ${item.description} ${specsString}`.toLowerCase();
    const queryWords = query.split(/\s+/).filter(word => word.length > 0);
    const matchesQuery = queryWords.length === 0 || queryWords.every(word => searchBlob.includes(word));

    return matchesCategory && matchesStock && matchesQuery;
  });

  // Sorting
  if (sortBy === "price-asc") {
    filtered.sort((a, b) => a.priceNumeric - b.priceNumeric);
  } else if (sortBy === "price-desc") {
    filtered.sort((a, b) => b.priceNumeric - a.priceNumeric);
  } else if (sortBy === "name-asc") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  state.activeMaterials = filtered;

  if (resultCountText) {
    resultCountText.textContent = `Showing ${filtered.length} of ${materialsData.length} verified industrial materials`;
  }

  if (filtered.length === 0) {
    materialsGrid.innerHTML = "";
    materialsGrid.style.display = "none";
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";
  materialsGrid.style.display = "grid";

  materialsGrid.innerHTML = filtered.map(item => {
    const isInCompare = state.compareList.includes(item.id);
    const specsHtml = Object.entries(item.specs).slice(0, 4).map(([key, val]) => `
      <div class="spec-grid-row">
        <span class="spec-name">${key}</span>
        <span class="spec-val">${val}</span>
      </div>
    `).join("");

    return `
      <article class="material-card" data-id="${item.id}" data-category="${item.categoryKey}">
        <div class="card-header-visual">
          <span class="card-category-badge">${item.category}</span>
          <span class="card-stock-badge">
            <span class="stock-dot">●</span> ${item.stockStatus}
          </span>
          ${getIndustrialIcon(item.iconType)}
        </div>

        <div class="card-body">
          <div class="card-top-meta">
            <h3 class="card-title">${item.name}</h3>
            <span class="card-standard-tag">${item.standard}</span>
          </div>

          <p class="card-description">${item.description}</p>

          <div class="card-spec-table">
            ${specsHtml}
            <div class="spec-grid-row">
              <span class="spec-name">Mill Origin</span>
              <span class="spec-val"><strong>${item.millOrigin || "Audited Mills"}</strong></span>
            </div>
            <div class="spec-grid-row">
              <span class="spec-name">Min Order (MOQ)</span>
              <span class="spec-val">${item.minOrder || "1 Unit"}</span>
            </div>
          </div>

          <div class="card-footer">
            <div class="price-box">
              <span class="price-label">Indicative Mill Base Rate</span>
              <span class="price-value">${item.priceINR}</span>
              <span class="price-unit">${item.priceUnit} + GST</span>
              <span class="price-disclaimer">Ex-works. Final freight & surcharge confirmed on RFQ.</span>
            </div>
            <div class="card-actions-row">
              <button 
                type="button" 
                class="btn-compare-toggle ${isInCompare ? 'active' : ''}" 
                data-id="${item.id}"
                title="Compare specifications side-by-side"
              >
                ${isInCompare ? '✓ In Compare' : '+ Compare'}
              </button>
              <button 
                type="button" 
                class="btn btn-primary btn-sm btn-enquire" 
                data-material-name="${item.name}"
                data-category-key="${item.categoryKey}"
              >
                Enquire Now &rarr;
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join("");

  // Attach Enquire button listeners
  materialsGrid.querySelectorAll(".btn-enquire").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const materialName = e.currentTarget.getAttribute("data-material-name");
      const categoryKey = e.currentTarget.getAttribute("data-category-key");
      selectMaterialForEnquiry(materialName, categoryKey);
    });
  });

  // Attach Compare toggle button listeners
  materialsGrid.querySelectorAll(".btn-compare-toggle").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.getAttribute("data-id");
      toggleCompareItem(id);
    });
  });
}

// ==========================================================================
// 7. SPECIFICATION COMPARISON SYSTEM
// ==========================================================================
function toggleCompareItem(id) {
  const index = state.compareList.indexOf(id);
  if (index > -1) {
    state.compareList.splice(index, 1);
    showToast("Removed material from comparison");
  } else {
    if (state.compareList.length >= 4) {
      alert("You can compare up to 4 materials simultaneously. Remove one to add another.");
      return;
    }
    state.compareList.push(id);
    const item = materialsData.find(m => m.id === id);
    showToast(`Added "${item ? item.name : 'Material'}" to comparison matrix`);
  }

  updateCompareDrawer();
  renderMaterials();
}

function updateCompareDrawer() {
  if (!compareDrawer) return;

  const count = state.compareList.length;
  if (count > 0) {
    compareDrawer.classList.add("show");
    if (compareCountBadge) compareCountBadge.textContent = `${count} Selected (Max 4)`;

    if (compareChipsList) {
      compareChipsList.innerHTML = state.compareList.map(id => {
        const item = materialsData.find(m => m.id === id);
        if (!item) return "";
        return `
          <span class="compare-chip">
            ${item.name.length > 25 ? item.name.substring(0, 22) + '...' : item.name}
            <button type="button" class="compare-chip-remove" data-id="${item.id}">&times;</button>
          </span>
        `;
      }).join("");

      compareChipsList.querySelectorAll(".compare-chip-remove").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const id = e.currentTarget.getAttribute("data-id");
          toggleCompareItem(id);
        });
      });
    }
  } else {
    compareDrawer.classList.remove("show");
  }
}

function clearCompareList() {
  state.compareList = [];
  updateCompareDrawer();
  renderMaterials();
  showToast("Comparison list cleared");
}

function openCompareModal() {
  if (!compareModal || !compareMatrixContainer) return;

  if (state.compareList.length === 0) {
    alert("Please select at least 1 material using the '+ Compare' button before viewing the matrix.");
    return;
  }

  const selectedItems = state.compareList.map(id => materialsData.find(m => m.id === id)).filter(Boolean);

  let headerCols = selectedItems.map(item => `
    <th class="product-header-col">
      <div class="compare-prod-title">${item.name}</div>
      <span class="compare-prod-badge">${item.category}</span>
      <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.5rem;">${item.standard}</div>
      <button 
        type="button" 
        class="btn btn-primary btn-sm btn-modal-select" 
        data-material-name="${item.name}" 
        data-category-key="${item.categoryKey}"
        style="width: 100%; font-size: 0.78rem; padding: 0.35rem;"
      >
        Select for RFQ &rarr;
      </button>
    </th>
  `).join("");

  const rows = [
    { label: "Engineering Standard / Norm", key: "standard" },
    { label: "Indicative Base Price", render: (item) => `<strong>${item.priceINR}</strong> <span style="font-size: 0.75rem;">${item.priceUnit}</span>` },
    { label: "Stock Availability", key: "stockStatus" },
    { label: "Dispatch Lead Time", key: "leadTime" },
    { label: "Minimum Order Quantity", key: "minOrder" },
    { label: "Verified Mill Origin", key: "millOrigin" },
    { label: "Material Certification", render: (item) => item.specs["Certification"] || "EN 10204 3.1 MTR" },
    { label: "Dimensions / Schedule", render: (item) => item.specs["Thickness Range"] || item.specs["Nominal Bore (NB)"] || item.specs["Size Range"] || "-" },
    { label: "Mechanical / Pressure Rating", render: (item) => item.specs["Yield Strength"] || item.specs["Tensile Strength"] || item.specs["Pressure Rating"] || item.specs["Pressure Class"] || item.specs["Proof Load"] || "-" },
    { label: "Technical Application", key: "description" }
  ];

  let matrixRowsHtml = rows.map(r => {
    let cells = selectedItems.map(item => {
      let val = r.render ? r.render(item) : (item[r.key] || "-");
      return `<td>${val}</td>`;
    }).join("");

    return `
      <tr>
        <th class="spec-header-col">${r.label}</th>
        ${cells}
      </tr>
    `;
  }).join("");

  compareMatrixContainer.innerHTML = `
    <table class="compare-table">
      <thead>
        <tr>
          <th class="spec-header-col">Parameter / Specification</th>
          ${headerCols}
        </tr>
      </thead>
      <tbody>
        ${matrixRowsHtml}
      </tbody>
    </table>
  `;

  // Attach modal RFQ buttons
  compareMatrixContainer.querySelectorAll(".btn-modal-select").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const matName = e.currentTarget.getAttribute("data-material-name");
      const catKey = e.currentTarget.getAttribute("data-category-key");
      closeCompareModal();
      selectMaterialForEnquiry(matName, catKey);
    });
  });

  compareModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeCompareModal() {
  if (compareModal) {
    compareModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// ==========================================================================
// 8. AUTO-FILL ENQUIRY FORM FROM CATALOG / MODAL
// ==========================================================================
function selectMaterialForEnquiry(materialName, categoryKey) {
  if (materialSelect) {
    let found = false;
    for (let i = 0; i < materialSelect.options.length; i++) {
      if (materialSelect.options[i].value === materialName) {
        materialSelect.selectedIndex = i;
        found = true;
        break;
      }
    }
    if (!found) {
      materialSelect.value = materialName;
    }

    materialSelect.classList.remove("invalid");
    const matErr = document.getElementById("materialError");
    if (matErr) matErr.textContent = "";

    // Suggest appropriate Unit of Measurement
    if (quantityUnit) {
      if (categoryKey === "steel-plates") {
        quantityUnit.value = "Metric Tons (MT)";
      } else if (categoryKey === "ss-pipes") {
        quantityUnit.value = "Meters (m)";
      } else if (categoryKey === "valves") {
        quantityUnit.value = "Pieces / Nos";
      } else if (categoryKey === "fasteners") {
        quantityUnit.value = "Pieces / Nos";
      }
    }
  }

  const enquirySection = document.getElementById("enquiry");
  if (enquirySection) {
    enquirySection.scrollIntoView({ behavior: "smooth" });
  }

  setTimeout(() => {
    const qtyInput = document.getElementById("quantity");
    if (qtyInput) qtyInput.focus();
  }, 600);

  showToast(`Selected "${materialName}" in the RFQ Form`);
}

window.filterByCategory = function(categoryKey) {
  document.querySelectorAll(".cat-btn").forEach(tab => {
    if (tab.getAttribute("data-category") === categoryKey) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });

  state.currentCategory = categoryKey;
  updateResetButtonVisibility();
  renderMaterials();

  const matSection = document.getElementById("materials");
  if (matSection) {
    matSection.scrollIntoView({ behavior: "smooth" });
  }
};

// ==========================================================================
// 9. EVENT LISTENERS
// ==========================================================================
function setupEventListeners() {
  // Search input debounced
  let debounceTimeout = null;
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      clearTimeout(debounceTimeout);
      const value = e.target.value;
      state.searchQuery = value;
      if (clearSearchBtn) clearSearchBtn.style.display = value.length > 0 ? "block" : "none";

      debounceTimeout = setTimeout(() => {
        renderMaterials();
        updateResetButtonVisibility();
      }, 150);
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      state.searchQuery = "";
      clearSearchBtn.style.display = "none";
      renderMaterials();
      updateResetButtonVisibility();
      searchInput.focus();
    });
  }

  // Category filter tabs
  if (categoryTabs) {
    categoryTabs.addEventListener("click", (e) => {
      const btn = e.target.closest(".cat-btn");
      if (!btn) return;
      document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.currentCategory = btn.getAttribute("data-category");
      renderMaterials();
      updateResetButtonVisibility();
    });
  }

  // Secondary filters (Stock availability & Sorting)
  if (stockFilterSelect) {
    stockFilterSelect.addEventListener("change", (e) => {
      state.stockFilter = e.target.value;
      renderMaterials();
      updateResetButtonVisibility();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      state.sortBy = e.target.value;
      renderMaterials();
    });
  }

  // Reset Filters
  if (resetFiltersBtn) resetFiltersBtn.addEventListener("click", resetAllFilters);
  if (emptyResetBtn) emptyResetBtn.addEventListener("click", resetAllFilters);

  // Compare Drawer Buttons
  if (openCompareBtn) openCompareBtn.addEventListener("click", openCompareModal);
  if (clearCompareBtn) clearCompareBtn.addEventListener("click", clearCompareList);
  if (compareModalCloseBtn) compareModalCloseBtn.addEventListener("click", closeCompareModal);
  if (compareModalCloseBottomBtn) compareModalCloseBottomBtn.addEventListener("click", closeCompareModal);
  if (compareModal) {
    compareModal.addEventListener("click", (e) => {
      if (e.target === compareModal) closeCompareModal();
    });
  }

  // RFQ Form Submission
  if (enquiryForm) {
    enquiryForm.addEventListener("submit", handleEnquirySubmit);
  }

  // Success Modal & Requisition Printing
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modalDoneBtn) modalDoneBtn.addEventListener("click", closeModal);
  if (printRequisitionBtn) {
    printRequisitionBtn.addEventListener("click", () => {
      window.print();
    });
  }
  if (successModal) {
    successModal.addEventListener("click", (e) => {
      if (e.target === successModal) closeModal();
    });
  }

  // RFQ Tracker Handler
  if (trackerSearchBtn) {
    trackerSearchBtn.addEventListener("click", handleTrackRfq);
  }
  if (trackerInput) {
    trackerInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleTrackRfq();
    });
  }

  // Supplier Onboarding Modal
  if (openSupplierModalBtn) {
    openSupplierModalBtn.addEventListener("click", () => {
      if (supplierModal) {
        supplierModal.style.display = "flex";
        document.body.style.overflow = "hidden";
      }
    });
  }
  if (supplierModalCloseBtn) {
    supplierModalCloseBtn.addEventListener("click", closeSupplierModal);
  }
  if (supplierModal) {
    supplierModal.addEventListener("click", (e) => {
      if (e.target === supplierModal) closeSupplierModal();
    });
  }
  if (supplierForm) {
    supplierForm.addEventListener("submit", handleSupplierSubmit);
  }

  // Admin Dashboard Handlers
  if (adminBtn) adminBtn.addEventListener("click", openAdminModal);
  if (adminModalCloseBtn) adminModalCloseBtn.addEventListener("click", closeAdminModal);
  if (adminCloseBottomBtn) adminCloseBottomBtn.addEventListener("click", closeAdminModal);
  if (adminRefreshBtn) adminRefreshBtn.addEventListener("click", loadAdminEnquiries);
  if (adminSearchInput) adminSearchInput.addEventListener("input", handleAdminSearch);
  if (adminExportBtn) adminExportBtn.addEventListener("click", exportAdminCsv);
  if (adminStatusTabs) {
    adminStatusTabs.addEventListener("click", (e) => {
      const btn = e.target.closest(".admin-status-btn");
      if (!btn) return;
      document.querySelectorAll(".admin-status-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentAdminFilter = btn.getAttribute("data-status");
      filterAndRenderAdminTable();
    });
  }
  if (adminModal) {
    adminModal.addEventListener("click", (e) => {
      if (e.target === adminModal) closeAdminModal();
    });
  }

  // Keyboard Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (successModal && successModal.style.display === "flex") closeModal();
      if (adminModal && adminModal.style.display === "flex") closeAdminModal();
      if (compareModal && compareModal.style.display === "flex") closeCompareModal();
      if (supplierModal && supplierModal.style.display === "flex") closeSupplierModal();
    }
  });

  // Mobile menu
  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      mobileMenuBtn.classList.toggle("open");
      mobileMenuBtn.setAttribute("aria-expanded", isOpen);
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        mobileMenuBtn.classList.remove("open");
      });
    });
  }

  // Back to Top Button
  window.addEventListener("scroll", () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

function updateResetButtonVisibility() {
  const hasFilter = (state.currentCategory !== "all" || state.searchQuery.trim().length > 0 || state.stockFilter !== "all");
  if (resetFiltersBtn) {
    resetFiltersBtn.style.display = hasFilter ? "inline-block" : "none";
  }
}

function resetAllFilters() {
  state.currentCategory = "all";
  state.searchQuery = "";
  state.stockFilter = "all";
  state.sortBy = "default";

  if (searchInput) searchInput.value = "";
  if (clearSearchBtn) clearSearchBtn.style.display = "none";
  if (stockFilterSelect) stockFilterSelect.value = "all";
  if (sortSelect) sortSelect.value = "default";

  document.querySelectorAll(".cat-btn").forEach(b => {
    if (b.getAttribute("data-category") === "all") b.classList.add("active");
    else b.classList.remove("active");
  });

  updateResetButtonVisibility();
  renderMaterials();
}

function closeSupplierModal() {
  if (supplierModal) {
    supplierModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

function handleSupplierSubmit(e) {
  e.preventDefault();
  const millName = document.getElementById("suppMillName").value.trim();
  const contactName = document.getElementById("suppContactName").value.trim();
  const phone = document.getElementById("suppPhone").value.trim();
  const email = document.getElementById("suppEmail").value.trim();
  const location = document.getElementById("suppLocation").value.trim();

  if (!millName || !contactName || !phone || !email) {
    alert("Please fill all required supplier onboarding details.");
    return;
  }

  const supplierRecord = {
    supplierId: "SUP-" + Math.floor(1000 + Math.random() * 9000),
    submittedAt: new Date().toISOString(),
    millName,
    contactName,
    phone,
    email,
    location,
    status: "Under Mill Audit"
  };

  const storedSuppliers = JSON.parse(localStorage.getItem("indus_suppliers") || "[]");
  storedSuppliers.unshift(supplierRecord);
  localStorage.setItem("indus_suppliers", JSON.stringify(storedSuppliers));

  supplierForm.reset();
  closeSupplierModal();
  showToast(`Supplier Onboarding Submitted! Ref ID: ${supplierRecord.supplierId}`);
  alert(`Thank you, ${contactName}! Your supplier application for "${millName}" has been received under Reference Code ${supplierRecord.supplierId}. Our Mill Verification Desk will review credentials within 24 hours.`);
}

// ==========================================================================
// 10. RFQ SUBMISSION & DUAL-PERSISTENCE
// ==========================================================================
async function handleEnquirySubmit(e) {
  e.preventDefault();
  clearFormValidationErrors();

  const buyerName = document.getElementById("buyerName");
  const companyName = document.getElementById("companyName");
  const buyerEmail = document.getElementById("buyerEmail");
  const buyerPhone = document.getElementById("buyerPhone");
  const matSelect = document.getElementById("materialSelect");
  const quantity = document.getElementById("quantity");
  const unit = document.getElementById("quantityUnit");
  const deliveryLocation = document.getElementById("deliveryLocation");
  const deliveryUrgency = document.getElementById("deliveryUrgency");
  const notes = document.getElementById("additionalNotes");

  // Compliance checkboxes
  const mtrCheck = document.getElementById("checkMtr");
  const utCheck = document.getElementById("checkUt");
  const tpiCheck = document.getElementById("checkTpi");

  let testingArr = [];
  if (mtrCheck && mtrCheck.checked) testingArr.push("EN 10204 3.1 MTR");
  if (utCheck && utCheck.checked) testingArr.push("UT Level II");
  if (tpiCheck && tpiCheck.checked) testingArr.push("Third-Party Inspection (TPI)");
  const testingStr = testingArr.length > 0 ? testingArr.join(", ") : "Standard Mill Inspection";

  let isValid = true;
  if (!buyerName.value.trim() || buyerName.value.trim().length < 2) {
    showFieldError("nameError", buyerName, "Please enter your full name.");
    isValid = false;
  }
  if (!companyName.value.trim() || companyName.value.trim().length < 2) {
    showFieldError("companyError", companyName, "Please enter your company or firm name.");
    isValid = false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(buyerEmail.value.trim())) {
    showFieldError("emailError", buyerEmail, "Please enter a valid official email address.");
    isValid = false;
  }
  const phoneClean = buyerPhone.value.replace(/[^0-9]/g, "");
  if (phoneClean.length < 8) {
    showFieldError("phoneError", buyerPhone, "Please enter a valid contact phone number.");
    isValid = false;
  }
  if (!matSelect.value) {
    showFieldError("materialError", matSelect, "Please select an industrial material from the catalog.");
    isValid = false;
  }
  if (!quantity.value || Number(quantity.value) <= 0) {
    showFieldError("quantityError", quantity, "Please enter a valid required quantity.");
    isValid = false;
  }

  if (!isValid) return;

  const generatedRfqId = "IMR-" + Date.now().toString().slice(-6) + "-" + Math.floor(100 + Math.random() * 900);

  const submissionData = {
    enquiryId: generatedRfqId,
    createdAt: new Date().toISOString(),
    buyerName: buyerName.value.trim(),
    companyName: companyName.value.trim(),
    buyerEmail: buyerEmail.value.trim(),
    buyerPhone: buyerPhone.value.trim(),
    materialName: matSelect.value,
    quantity: quantity.value,
    quantityUnit: unit.value,
    deliveryLocation: deliveryLocation ? deliveryLocation.value.trim() : "Standard Factory Dispatch",
    urgency: deliveryUrgency ? deliveryUrgency.value : "Standard (7-10 Days)",
    testing: testingStr,
    status: "New RFQ",
    additionalNotes: notes ? notes.value.trim() : ""
  };

  // 1. Dual-Persistence: ALWAYS immediately save to LocalStorage cache
  allEnquiries.unshift(submissionData);
  localStorage.setItem("indus_enquiries_cache", JSON.stringify(allEnquiries));

  // 2. Button Spinner
  const normalText = submitBtn.querySelector(".btn-text-normal");
  const spinnerText = submitBtn.querySelector(".btn-spinner");
  if (normalText) normalText.style.display = "none";
  if (spinnerText) spinnerText.style.display = "inline";
  submitBtn.disabled = true;

  // 3. Attempt async AWS Lambda Gateway POST (with graceful fallback)
  try {
    const response = await fetch(
      "https://isntrcfm59.execute-api.ap-southeast-2.amazonaws.com/default/IndusPortalEnquiryHandler",
      {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(submissionData)
      }
    );
    if (response.ok) {
      const rawData = await response.json();
      const result = typeof rawData === "string" ? JSON.parse(rawData) : rawData;
      if (result.enquiryId) submissionData.enquiryId = result.enquiryId;
    }
  } catch (error) {
    console.warn("AWS Gateway async sync notice: Stored in persistent local storage cache.", error);
  } finally {
    if (normalText) normalText.style.display = "inline";
    if (spinnerText) spinnerText.style.display = "none";
    submitBtn.disabled = false;
  }

  // 4. Populate and display success modal
  if (modalRfqCode) modalRfqCode.textContent = submissionData.enquiryId;
  if (modalBuyerName) modalBuyerName.textContent = submissionData.buyerName;
  if (modalCompany) modalCompany.textContent = submissionData.companyName;
  if (modalMaterial) modalMaterial.textContent = submissionData.materialName;
  if (modalQuantity) modalQuantity.textContent = `${submissionData.quantity} ${submissionData.quantityUnit}`;
  if (modalEmail) modalEmail.textContent = submissionData.buyerEmail;

  enquiryForm.reset();
  openModal();
  showToast(`RFQ ${submissionData.enquiryId} submitted successfully!`);
}

function showFieldError(errorElementId, inputElement, message) {
  const errorSpan = document.getElementById(errorElementId);
  if (errorSpan) errorSpan.textContent = message;
  if (inputElement) inputElement.classList.add("invalid");
}

function clearFormValidationErrors() {
  document.querySelectorAll(".field-error").forEach(span => span.textContent = "");
  document.querySelectorAll(".form-group input, .form-group select, .form-group textarea").forEach(i => i.classList.remove("invalid"));
}

function openModal() {
  if (successModal) {
    successModal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
}

function closeModal() {
  if (successModal) {
    successModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// ==========================================================================
// 11. RFQ LIVE TRACKER
// ==========================================================================
function handleTrackRfq() {
  if (!trackerInput || !trackerResultCard) return;

  const query = trackerInput.value.trim().toUpperCase();
  if (!query) {
    alert("Please enter a valid RFQ Reference ID (e.g. IMR-2026-8841).");
    return;
  }

  const found = allEnquiries.find(item => (item.enquiryId || "").toUpperCase().includes(query));

  if (!found) {
    if (trackerError) {
      trackerError.style.display = "block";
      trackerError.textContent = `No active RFQ found matching "${query}". Please check your reference code or submit a new enquiry.`;
    }
    trackerResultCard.style.display = "none";
    return;
  }

  if (trackerError) trackerError.style.display = "none";

  const status = found.status || "New RFQ";
  let step1Class = "completed";
  let step2Class = "";
  let step3Class = "";
  let step4Class = "";

  if (status === "New RFQ") {
    step2Class = "active";
  } else if (status === "Supplier Matching") {
    step1Class = "completed";
    step2Class = "completed";
    step3Class = "active";
  } else if (status === "Quoted") {
    step1Class = "completed";
    step2Class = "completed";
    step3Class = "completed";
    step4Class = "active";
  } else if (status === "PO Issued" || status === "Fulfilled") {
    step1Class = "completed";
    step2Class = "completed";
    step3Class = "completed";
    step4Class = "completed";
  }

  trackerResultCard.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid var(--border-light); padding-bottom: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
      <div>
        <span class="admin-rfq-badge" style="font-size: 0.95rem; padding: 0.35rem 0.75rem;">${escapeHtml(found.enquiryId)}</span>
        <h4 style="font-size: 1.15rem; color: var(--primary-navy); margin-top: 0.5rem;">${escapeHtml(found.materialName)} (${escapeHtml(String(found.quantity))} ${escapeHtml(found.quantityUnit)})</h4>
        <span style="font-size: 0.85rem; color: var(--text-secondary);">${escapeHtml(found.companyName)} &bull; Buyer: ${escapeHtml(found.buyerName)}</span>
      </div>
      <div style="text-align: right;">
        <span class="status-badge ${getStatusBadgeClass(status)}" style="font-size: 0.85rem; padding: 0.4rem 0.9rem;">${escapeHtml(status)}</span>
        <span style="display: block; font-size: 0.75rem; color: var(--text-muted); margin-top: 0.35rem;">Destination: ${escapeHtml(found.deliveryLocation || "Standard Dispatch")}</span>
      </div>
    </div>

    <!-- 4-Phase Visual Pipeline -->
    <div class="tracker-steps-timeline">
      <div class="tracker-step-item ${step1Class}">
        <div class="tracker-step-icon">1</div>
        <div class="tracker-step-label">RFQ Logged</div>
        <div class="tracker-step-sub">Specs Verified</div>
      </div>
      <div class="tracker-step-item ${step2Class}">
        <div class="tracker-step-icon">2</div>
        <div class="tracker-step-label">Mill Matching</div>
        <div class="tracker-step-sub">Direct Mill Sourcing</div>
      </div>
      <div class="tracker-step-item ${step3Class}">
        <div class="tracker-step-icon">3</div>
        <div class="tracker-step-label">Commercial Quote</div>
        <div class="tracker-step-sub">Freight & GST Performa</div>
      </div>
      <div class="tracker-step-item ${step4Class}">
        <div class="tracker-step-icon">4</div>
        <div class="tracker-step-label">Mill Dispatch</div>
        <div class="tracker-step-sub">MTR & Delivery</div>
      </div>
    </div>
  `;

  trackerResultCard.style.display = "block";
  showToast(`Loaded tracker status for ${found.enquiryId}`);
}

function getStatusBadgeClass(status) {
  switch (status) {
    case "New RFQ": return "new";
    case "Supplier Matching": return "matching";
    case "Quoted": return "quoted";
    case "PO Issued": return "po";
    case "Fulfilled": return "fulfilled";
    default: return "new";
  }
}

// ==========================================================================
// 12. ADMIN PROCUREMENT DESK (STATUS MANAGEMENT & CSV EXPORT)
// ==========================================================================
function openAdminModal() {
  if (adminModal) {
    adminModal.style.display = "flex";
    document.body.style.overflow = "hidden";
    loadAdminEnquiries();
  }
}

function closeAdminModal() {
  if (adminModal) {
    adminModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

async function loadAdminEnquiries() {
  if (!adminTableBody || !adminLoading || !adminEmpty) return;

  adminLoading.style.display = "block";
  adminEmpty.style.display = "none";
  if (adminCountBadge) adminCountBadge.textContent = "Loading...";

  try {
    const response = await fetch(
      "https://isntrcfm59.execute-api.ap-southeast-2.amazonaws.com/default/IndusPortalEnquiryHandler",
      { method: "GET" }
    );
    if (response.ok) {
      const rawData = await response.json();
      const result = typeof rawData === "string" ? JSON.parse(rawData) : rawData;
      if (result && Array.isArray(result.enquiries) && result.enquiries.length > 0) {
        // Merge with local records
        const remoteIds = new Set(result.enquiries.map(e => e.enquiryId));
        const localOnly = allEnquiries.filter(e => !remoteIds.has(e.enquiryId));
        allEnquiries = [...localOnly, ...result.enquiries];
        localStorage.setItem("indus_enquiries_cache", JSON.stringify(allEnquiries));
      }
    }
  } catch (error) {
    console.warn("Live DynamoDB GET offline or CORS restricted. Displaying synchronized local storage cache.", error);
  } finally {
    adminLoading.style.display = "none";
    updateAdminStatsSummary();
    filterAndRenderAdminTable();
  }
}

function updateAdminStatsSummary() {
  const totalEl = document.getElementById("adminStatTotal");
  const matchingEl = document.getElementById("adminStatMatching");
  const quotedEl = document.getElementById("adminStatQuoted");
  const closedEl = document.getElementById("adminStatClosed");

  if (totalEl) totalEl.textContent = allEnquiries.length;
  if (matchingEl) matchingEl.textContent = allEnquiries.filter(e => (e.status === "New RFQ" || e.status === "Supplier Matching")).length;
  if (quotedEl) quotedEl.textContent = allEnquiries.filter(e => e.status === "Quoted").length;
  if (closedEl) closedEl.textContent = allEnquiries.filter(e => (e.status === "PO Issued" || e.status === "Fulfilled")).length;
}

function filterAndRenderAdminTable() {
  let filtered = [...allEnquiries];

  // Status Filter
  if (currentAdminFilter !== "all") {
    filtered = filtered.filter(item => {
      const st = (item.status || "New RFQ").toLowerCase();
      if (currentAdminFilter === "new") return st === "new rfq";
      if (currentAdminFilter === "matching") return st === "supplier matching";
      if (currentAdminFilter === "quoted") return st === "quoted";
      if (currentAdminFilter === "closed") return st === "po issued" || st === "fulfilled";
      return true;
    });
  }

  // Search Input filter
  if (adminSearchInput && adminSearchInput.value.trim()) {
    const q = adminSearchInput.value.toLowerCase().trim();
    filtered = filtered.filter(item => {
      const id = (item.enquiryId || "").toLowerCase();
      const name = (item.buyerName || "").toLowerCase();
      const comp = (item.companyName || "").toLowerCase();
      const mat = (item.materialName || "").toLowerCase();
      const email = (item.buyerEmail || "").toLowerCase();
      return id.includes(q) || name.includes(q) || comp.includes(q) || mat.includes(q) || email.includes(q);
    });
  }

  renderAdminTable(filtered);
}

function renderAdminTable(items) {
  if (!adminTableBody) return;
  adminTableBody.innerHTML = "";

  if (!items || items.length === 0) {
    if (adminEmpty) adminEmpty.style.display = "block";
    if (adminCountBadge) adminCountBadge.textContent = "0 Enquiries";
    return;
  }

  if (adminEmpty) adminEmpty.style.display = "none";
  if (adminCountBadge) adminCountBadge.textContent = `${items.length} ${items.length === 1 ? "Enquiry" : "Enquiries"}`;

  items.forEach(item => {
    const tr = document.createElement("tr");
    const formattedDate = item.createdAt ? new Date(item.createdAt).toLocaleString("en-IN", { dateStyle: "short", timeStyle: "short" }) : "Recent";
    const currentStatus = item.status || "New RFQ";

    tr.innerHTML = `
      <td>
        <span class="admin-rfq-badge">${escapeHtml(item.enquiryId || "-")}</span>
        <span class="admin-date-sub">${escapeHtml(formattedDate)}</span>
      </td>
      <td>
        <strong>${escapeHtml(item.buyerName || "-")}</strong>
        <span class="admin-contact-sub">${escapeHtml(item.companyName || "-")}</span>
      </td>
      <td>
        <strong>${escapeHtml(item.materialName || "-")}</strong>
        <span class="admin-date-sub">${escapeHtml(item.testing || "MTR 3.1 Certified")}</span>
      </td>
      <td>
        ${escapeHtml(String(item.quantity || "-"))} ${escapeHtml(item.quantityUnit || "")}
      </td>
      <td>
        <a href="mailto:${escapeHtml(item.buyerEmail || '')}">${escapeHtml(item.buyerEmail || "-")}</a>
        <span class="admin-contact-sub">${escapeHtml(item.buyerPhone || "-")}</span>
      </td>
      <td>
        <div class="admin-actions-cell">
          <select class="admin-status-select" data-id="${item.enquiryId}">
            <option value="New RFQ" ${currentStatus === "New RFQ" ? "selected" : ""}>New RFQ</option>
            <option value="Supplier Matching" ${currentStatus === "Supplier Matching" ? "selected" : ""}>Supplier Matching</option>
            <option value="Quoted" ${currentStatus === "Quoted" ? "selected" : ""}>Quoted</option>
            <option value="PO Issued" ${currentStatus === "PO Issued" ? "selected" : ""}>PO Issued</option>
            <option value="Fulfilled" ${currentStatus === "Fulfilled" ? "selected" : ""}>Fulfilled</option>
          </select>
          <span class="status-badge ${getStatusBadgeClass(currentStatus)}">${escapeHtml(currentStatus)}</span>
        </div>
      </td>
    `;

    adminTableBody.appendChild(tr);
  });

  // Attach status change dropdown listeners
  adminTableBody.querySelectorAll(".admin-status-select").forEach(select => {
    select.addEventListener("change", (e) => {
      const enquiryId = e.target.getAttribute("data-id");
      const newStatus = e.target.value;
      updateEnquiryStatus(enquiryId, newStatus);
    });
  });
}

function updateEnquiryStatus(enquiryId, newStatus) {
  const item = allEnquiries.find(e => e.enquiryId === enquiryId);
  if (item) {
    item.status = newStatus;
    localStorage.setItem("indus_enquiries_cache", JSON.stringify(allEnquiries));
    showToast(`Updated status of ${enquiryId} to "${newStatus}"`);
    updateAdminStatsSummary();
    filterAndRenderAdminTable();
  }
}

function handleAdminSearch() {
  filterAndRenderAdminTable();
}

function exportAdminCsv() {
  if (!allEnquiries || allEnquiries.length === 0) {
    alert("No enquiries to export.");
    return;
  }

  const headers = ["RFQ ID", "Date", "Buyer Name", "Company", "Email", "Phone", "Material", "Quantity", "Unit", "Location", "Urgency", "Testing Required", "Status", "Notes"];
  
  const csvRows = [headers.join(",")];

  allEnquiries.forEach(e => {
    const row = [
      `"${e.enquiryId || ''}"`,
      `"${e.createdAt || ''}"`,
      `"${(e.buyerName || '').replace(/"/g, '""')}"`,
      `"${(e.companyName || '').replace(/"/g, '""')}"`,
      `"${e.buyerEmail || ''}"`,
      `"${e.buyerPhone || ''}"`,
      `"${(e.materialName || '').replace(/"/g, '""')}"`,
      `"${e.quantity || ''}"`,
      `"${e.quantityUnit || ''}"`,
      `"${(e.deliveryLocation || '').replace(/"/g, '""')}"`,
      `"${e.urgency || ''}"`,
      `"${(e.testing || '').replace(/"/g, '""')}"`,
      `"${e.status || 'New RFQ'}"`,
      `"${(e.additionalNotes || '').replace(/"/g, '""')}"`
    ];
    csvRows.push(row.join(","));
  });

  const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `IndusPortal_Procurement_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("Enquiries exported successfully to CSV!");
}

// ==========================================================================
// 13. UTILITY FUNCTIONS
// ==========================================================================
let toastTimeout = null;
function showToast(message) {
  if (!toastNotification || !toastMessage) return;
  toastMessage.textContent = message;
  toastNotification.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastNotification.classList.remove("show");
  }, 4000);
}

function setupNavbarScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let currentId = "";
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  });
}

function escapeHtml(text) {
  if (typeof text !== "string") return text;
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
