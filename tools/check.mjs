import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const files = ['index.html', 'privacy.html', '404.html'];
const issues = [];
for (const file of files) {
  const html = await readFile(path.join(root, file), 'utf8');
  if (!/<meta\s+name="viewport"/i.test(html)) issues.push(`${file}: viewport missing`);
  if (!/<html\s+lang=/i.test(html)) issues.push(`${file}: language missing`);
  if ((html.match(/<h1(?:\s|>)/g) || []).length !== 1) issues.push(`${file}: expected one h1`);
  if (/<script\b|<iframe\b|https?:\/\/[^"']+\.(?:js|css)/i.test(html)) issues.push(`${file}: unexpected active/external dependency`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(x => x[1]);
  if (new Set(ids).size !== ids.length) issues.push(`${file}: duplicate IDs`);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const href = match[1];
    if (/^(https?:|mailto:)/.test(href)) continue;
    const [pathname, hash] = href.split('#');
    const target = pathname && pathname !== './' && pathname !== '/' ? pathname.replace(/^\.\//, '').replace(/^\//, '') : (pathname ? 'index.html' : file);
    try {
      if (!(await stat(path.join(root, target))).isFile()) throw Error();
      if (hash) {
        const targetHtml = target === file ? html : await readFile(path.join(root, target), 'utf8');
        if (!targetHtml.includes(`id="${hash}"`)) issues.push(`${file}: missing anchor ${href}`);
      }
    } catch { issues.push(`${file}: missing local file ${href}`); }
  }
}
const index = await readFile(path.join(root, 'index.html'), 'utf8');
const head = index.match(/<head>([\s\S]*?)<\/head>/i)?.[1] || '';
if (!head.includes('SEARCH_CONSOLE_VERIFICATION')) issues.push('Verification insertion marker missing in head');
if (/GOOGLE_VERIFICATION_CODE/.test(index)) issues.push('Example verification code must not be published');
const verification = [...index.replace(/<!--[\s\S]*?-->/g, '').matchAll(/<meta\b[^>]*name=["']google-site-verification["'][^>]*>/gi)];
for (const [tag] of verification) if (!head.includes(tag) || !/content=["'][^"']+["']/.test(tag)) issues.push('Verification tag missing content or outside head');
for (const file of ['index.html','privacy.html']) {
 const html = await readFile(path.join(root,file),'utf8');
 if (!html.includes('DreamMoa') || !html.includes('Future Soul Games')) issues.push(`${file}: business/brand distinction missing`);
}
if (issues.length) { console.error(issues.join('\n')); process.exitCode = 1; }
else console.log(`PASS: ${files.length} pages; local links, anchors, metadata, brand identity and verification location checked. Verification tags installed: ${verification.length}.`);
