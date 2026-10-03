// Single source of truth for the Salesforce Integration course's lesson order,
// used by the progress tracker and the course overview checklist.
// Keep this in sync with sidebars.js when you add/reorder lessons.
export const SALESFORCE_INTEGRATION_TOPICS = [
  {id: 'inbound-vs-outbound', title: 'Inbound vs Outbound Integration'},
  {id: 'protocols-explained', title: 'HTTP, REST and SOAP: Protocols Explained'},
  {id: 'request-response-anatomy', title: 'Anatomy of a Request and Response'},
  {id: 'json-xml-basics', title: 'JSON and XML Basics'},
  {id: 'authentication-basics', title: 'Authentication Basics'},
  {id: 'why-salesforce-is-different', title: 'Why Salesforce Is Different for Integrators'},
  {id: 'integration-terms', title: 'Terms You Will Meet'},
  {id: 'integration-patterns', title: 'Integration Patterns'},
  {id: 'outbound-callouts', title: 'Outbound Callouts'},
  {id: 'salesforce-apis', title: 'Salesforce APIs'},
  {id: 'authentication', title: 'Authentication'},
  {id: 'inbound-apex-rest-soap', title: 'Inbound Apex REST and SOAP'},
  {id: 'declarative-options', title: 'Declarative Integration Options'},
  {id: 'platform-events-cdc', title: 'Platform Events and Change Data Capture'},
  {id: 'async-apex-limits', title: 'Async Apex and Governor Limits'},
  {id: 'salesforce-connect', title: 'Salesforce Connect'},
  {id: 'security-monitoring', title: 'Security and Monitoring'},
];

export function topicPath(id) {
  return `/docs/salesforce-integration/${id}`;
}
