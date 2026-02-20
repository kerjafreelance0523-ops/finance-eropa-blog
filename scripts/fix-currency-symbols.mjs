import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Script to escape dollar signs that are likely currency indicators to prevent them from being interpreted as LaTeX math delimiters.
// Usage: node scripts/fix-currency-symbols.mjs

const BLOG_DIR = 'data/blog';

async function fixCurrencySymbols() {
    const files = await glob(`${BLOG_DIR}/**/*.mdx`);

    let fixedCount = 0;

    for (const file of files) {
        const content = fs.readFileSync(file, 'utf8');

        // Regex to find unescaped dollar signs followed immediately by a digit.
        // Negative lookbehind (?<!\\) checks that the $ is not already escaped.
        // Lookahead (?=\d) checks that the $ is followed by a digit.
        // This helps avoid replacing $ in actual math blocks like $E=mc^2$ (unless it starts with a number, which is rare for math blocks without space).
        const newContent = content.replace(/(?<!\\)\$(?=\d)/g, '\\$');

        if (content !== newContent) {
            fs.writeFileSync(file, newContent, 'utf8');
            console.log(`Fixed: ${file}`);
            fixedCount++;
        }
    }

    console.log(`\nProcess completed. Fixed ${fixedCount} files.`);
}

fixCurrencySymbols();
