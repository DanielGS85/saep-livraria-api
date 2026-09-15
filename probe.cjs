const ts = require('typescript');
const real = require('fs').readFileSync('src/models/livro.ts','utf8');
function diag(src, kind) {
  const f = ts.createSourceFile('x.ts', src, ts.ScriptTarget.ES2022, true, kind ?? ts.ScriptKind.TS);
  const d = f.parseDiagnostics[0];
  if (!d) return 'OK';
  const p = f.getLineAndCharacterOfPosition(d.start);
  return `${p.line+1}:${p.character} TS${d.code} ${ts.flattenDiagnosticMessageText(d.messageText,' ')}`;
}
console.log('--- arquivo real como JS (sem suporte a TS) ---');
console.log(diag(real, ts.ScriptKind.JS));
console.log('--- prefixos truncados do arquivo real ---');
for (let n = 6; n <= 14; n++) console.log(String(n).padStart(2), JSON.stringify(real.slice(0,n)), '->', diag(real.slice(0,n)));
console.log('--- outros candidatos ---');
const extra = {
  "import (":  "import (\n  Column,\n) from 'typeorm';\n",
  "import [":  "import [\n  Column,\n] from 'typeorm';\n",
  "import <":  "import <Column> from 'typeorm';\n",
  "import ;{": "import ; { Column } from 'typeorm';\n",
  "import( )": "import ( ) { Column }\n",
  "@Entity 1a linha": "@Entity('livros')\n",
  "code fence": "```typescript\nimport { Column } from 'typeorm';\n```\n",
  "import  ;":  "import  ;\n",
  "titulo!:":   "  titulo!: string;\n",
};
for (const [k,v] of Object.entries(extra)) console.log(k.padEnd(18), '->', diag(v));
