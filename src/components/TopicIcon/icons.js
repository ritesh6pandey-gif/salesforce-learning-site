// Original, hand-drawn line icons (24x24, stroke-based, currentColor).
// No third-party icon library, no Salesforce marks — just simple shapes
// that hint at each topic so lesson pages read as less text-only.
const ICONS = {
  'inbound-vs-outbound': (
    <>
      <path d="M4 8h7" />
      <path d="M8 5l3 3-3 3" />
      <path d="M20 16h-7" />
      <path d="M16 13l-3 3 3 3" />
    </>
  ),
  'protocols-explained': (
    <>
      <rect x="3" y="5" width="7" height="6" rx="1.2" />
      <rect x="14" y="13" width="7" height="6" rx="1.2" />
      <path d="M10 8h4a3 3 0 0 1 3 3v2" />
    </>
  ),
  'request-response-anatomy': (
    <>
      <rect x="3" y="4" width="18" height="6" rx="1.2" />
      <rect x="3" y="14" width="18" height="6" rx="1.2" />
      <path d="M7 10v4" />
      <path d="M17 10v4" />
    </>
  ),
  'callouts-in-salesforce': (
    <>
      <rect x="3" y="9" width="7" height="6" rx="1.3" />
      <path d="M10 10.5h4.5" />
      <path d="M13 7.5 17 10.5l-4 3" />
      <path d="M17 10.5c2.2 0 3.5 1.1 3.5 3v3" />
    </>
  ),
  'json-xml-basics': (
    <>
      <path d="M8 4c-2 0-3 1-3 3v2c0 1-.5 1.5-1.5 1.5C4.5 10.5 5 11 5 12s-.5 1.5-1.5 1.5C4.5 13.5 5 14 5 15v2c0 2 1 3 3 3" />
      <path d="M16 4c2 0 3 1 3 3v2c0 1 .5 1.5 1.5 1.5-1 0-1.5.5-1.5 1.5s.5 1.5 1.5 1.5c-1 0-1.5.5-1.5 1.5v2c0 2-1 3-3 3" />
    </>
  ),
  'authentication-basics': (
    <>
      <circle cx="9" cy="9" r="4" />
      <path d="M12 12l7 7" />
      <path d="M16 15l2-2" />
      <path d="M18.5 17.5l2-2" />
    </>
  ),
  'why-salesforce-is-different': (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1" />
      <rect x="13" y="4" width="7" height="7" rx="1" />
      <rect x="4" y="13" width="7" height="7" rx="1" />
      <rect x="13" y="13" width="7" height="7" rx="1" />
      <path d="M7.5 7.5h0" />
    </>
  ),
  'integration-terms': (
    <>
      <path d="M5 4h11l3 3v13H5z" />
      <path d="M16 4v3h3" />
      <path d="M8 11h8" />
      <path d="M8 14h8" />
      <path d="M8 17h5" />
    </>
  ),
  glossary: (
    <>
      <path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6.5A1.5 1.5 0 0 1 5 19.5Z" />
      <path d="M5 19.5A1.5 1.5 0 0 1 6.5 18H19" />
      <path d="M8.5 8h7" />
      <path d="M8.5 11.5h5" />
    </>
  ),
  'integration-patterns': (
    <>
      <path d="M8 7a3 3 0 1 0 0 6" />
      <path d="M16 11a3 3 0 1 0 0 6" />
      <path d="M8 10h5a3 3 0 0 1 3 3" />
    </>
  ),
  'outbound-callouts': (
    <>
      <rect x="3" y="4" width="9" height="16" rx="1.5" />
      <path d="M13 12h8" />
      <path d="M17.5 8.5 21 12l-3.5 3.5" />
    </>
  ),
  'salesforce-apis': (
    <>
      <rect x="4" y="4" width="16" height="4" rx="1" />
      <rect x="4" y="10" width="16" height="4" rx="1" />
      <rect x="4" y="16" width="16" height="4" rx="1" />
    </>
  ),
  authentication: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="15.5" r="1.4" />
    </>
  ),
  'inbound-apex-rest-soap': (
    <>
      <rect x="12" y="4" width="9" height="16" rx="1.5" />
      <path d="M11 12H3" />
      <path d="M6.5 8.5 3 12l3.5 3.5" />
    </>
  ),
  'declarative-options': (
    <>
      <path d="M4 20 15 9" />
      <path d="M13 4l2 2" />
      <path d="M17 8l2 2" />
      <path d="M15.5 5.5l3 3" />
      <circle cx="5.5" cy="18.5" r="1.6" />
    </>
  ),
  'platform-events-cdc': (
    <>
      <circle cx="12" cy="12" r="2.1" />
      <path d="M8.3 8.3a5.2 5.2 0 0 0 0 7.4" />
      <path d="M15.7 8.3a5.2 5.2 0 0 1 0 7.4" />
      <path d="M5.4 5.4a9.2 9.2 0 0 0 0 13.2" />
      <path d="M18.6 5.4a9.2 9.2 0 0 1 0 13.2" />
    </>
  ),
  'async-apex-limits': (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  'salesforce-connect': (
    <>
      <path d="M9 15l6-6" />
      <path d="M11 5.5 13.5 3a3.2 3.2 0 0 1 4.5 4.5L15.5 10" />
      <path d="M13 18.5 10.5 21a3.2 3.2 0 0 1-4.5-4.5L8.5 14" />
    </>
  ),
  'security-monitoring': (
    <>
      <path d="M12 3.5 5 6.5v5c0 4.3 2.9 7.3 7 8.5 4.1-1.2 7-4.2 7-8.5v-5L12 3.5Z" />
      <path d="M9.2 12.2l1.9 1.9 3.7-3.7" />
    </>
  ),
  lwc: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.2" />
      <rect x="13" y="4" width="7" height="7" rx="1.2" />
      <rect x="4" y="13" width="7" height="7" rx="1.2" />
      <rect x="13" y="13" width="7" height="7" rx="1.2" />
    </>
  ),
  agentforce: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3v2.4" />
      <path d="M12 18.6V21" />
      <path d="M3 12h2.4" />
      <path d="M18.6 12H21" />
      <path d="M5.6 5.6l1.7 1.7" />
      <path d="M16.7 16.7l1.7 1.7" />
      <path d="M18.4 5.6l-1.7 1.7" />
      <path d="M7.3 16.7l-1.7 1.7" />
    </>
  ),
};

export default ICONS;
