// Prism has no built-in Apex grammar. Apex's syntax is close enough to Java
// that extending Prism's Java grammar gives solid highlighting for free; we
// layer a few Apex-only keywords/annotations and inline SOQL/SOSL on top.
export function registerApexLanguage(Prism) {
  if (!Prism.languages.java || Prism.languages.apex) return;

  Prism.languages.apex = Prism.languages.extend('java', {
    keyword:
      /\b(?:abstract|after|before|with|without|sharing|inherited|trigger|global|webservice|testmethod|virtual|override|class|interface|extends|implements|enum|final|new|null|private|protected|public|return|static|super|this|throw|throws|try|catch|finally|if|else|for|while|do|switch|on|when|break|continue|instanceof|void|transient|get|set)\b/,
  });

  // @AuraEnabled, @future(callout=true), @RestResource(...), etc.
  Prism.languages.insertBefore('apex', 'class-name', {
    annotation: {
      pattern: /@\w+(?:\([^)]*\))?/,
      alias: 'builtin',
    },
  });

  // Inline SOQL/SOSL, e.g. [SELECT Id FROM Account WHERE Id = :accId]
  Prism.languages.insertBefore('apex', 'string', {
    soql: {
      pattern: /\[\s*(?:SELECT|FIND)\b[\s\S]*?\]/i,
      alias: 'string',
    },
  });
}
