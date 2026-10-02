// Original, hand-drawn line icons (24x24, stroke-based, currentColor).
// No third-party icon library, no Salesforce marks — just simple shapes
// that hint at each topic so lesson pages read as less text-only.
const ICONS = {
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
