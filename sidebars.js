// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  salesforceIntegrationSidebar: [
    {
      type: 'category',
      label: 'Salesforce Integration',
      link: {
        type: 'doc',
        id: 'salesforce-integration/integration-patterns',
      },
      items: [
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
