// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  salesforceIntegrationSidebar: [
    {
      type: 'category',
      label: 'Salesforce Integration',
      // No `link` here: this category's first item is now a nested category
      // (Foundations), not a doc id, so a `link` duplicating a doc that also
      // appears in `items` breaks Docusaurus's prev/next pagination sequence.
      items: [
        {
          type: 'category',
          label: 'Foundations',
          // Same reason: no `link` — see note above.
          items: [
            'salesforce-integration/inbound-vs-outbound',
            'salesforce-integration/protocols-explained',
            'salesforce-integration/request-response-anatomy',
            'salesforce-integration/callouts-in-salesforce',
            'salesforce-integration/json-xml-basics',
            'salesforce-integration/authentication-basics',
            'salesforce-integration/why-salesforce-is-different',
            'salesforce-integration/integration-terms',
            'salesforce-integration/glossary',
          ],
        },
        'salesforce-integration/integration-patterns',
        'salesforce-integration/outbound-callouts',
        'salesforce-integration/salesforce-apis',
        'salesforce-integration/authentication',
        'salesforce-integration/inbound-apex-rest-soap',
        'salesforce-integration/declarative-options',
        'salesforce-integration/platform-events-cdc',
        'salesforce-integration/async-apex-limits',
        'salesforce-integration/salesforce-connect',
        'salesforce-integration/security-monitoring',
      ],
    },
  ],
};

export default sidebars;
