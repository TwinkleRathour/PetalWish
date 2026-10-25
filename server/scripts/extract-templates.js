/**
 * Copies the template catalogue out of the frontend (../script.js → INITIAL_TEMPLATES)
 * into src/data/templates.json, the seed file for MongoDB.
 *
 * Run again after adding templates to script.js:  npm run extract-templates
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const serverRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceFile = path.resolve(serverRoot, '../script.js');
const outFile = path.join(serverRoot, 'src/data/templates.json');

// Pricing rule for the seeded catalogue (amounts in paise): wedding & luxury designs are premium
const PREMIUM_PRICE = 9900; // ₹99
const TRENDING_COUNT = 8; // the homepage "Trending" strip shows the first 8 templates
const isPremium = (t) => t.category === 'Wedding' || t.style === 'Luxury';

const source = fs.readFileSync(sourceFile, 'utf8');
const marker = 'const INITIAL_TEMPLATES = ';
const start = source.indexOf(marker);
const end = source.indexOf('\n  const STORAGE_KEYS', start);
if (start === -1 || end === -1) {
  console.error('Could not find INITIAL_TEMPLATES in script.js');
  process.exit(1);
}

const literal = source.slice(start + marker.length, end).trim().replace(/;$/, '');
// The array is a plain object literal; evaluate it in an empty sandbox
const templates = vm.runInNewContext(`(${literal})`, Object.create(null), { timeout: 1000 });

const seed = templates.map((t, index) => {
  const premium = isPremium(t);
  return {
    slug: t.id,
    title: t.title,
    category: t.category,
    style: t.style,
    color: t.color,
    orientation: t.orientation || 'Portrait',
    tags: (t.tags || []).map((tag) => String(tag).toLowerCase()),
    bg: t.bg,
    elements: t.elements,
    isPremium: premium,
    price: premium ? PREMIUM_PRICE : 0,
    currency: 'INR',
    isPublished: true,
    isTrending: index < TRENDING_COUNT,
    sortOrder: index
  };
});

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, `${JSON.stringify(seed, null, 2)}\n`);
console.log(`Wrote ${seed.length} templates (${seed.filter((t) => t.isPremium).length} premium) to ${path.relative(serverRoot, outFile)}`);
