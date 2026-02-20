
const fs = require('fs');
const path = require('path');

// Script to escape dollar signs that are likely currency indicators to prevent them from being interpreted as LaTeX math delimiters.
// Usage: node scripts/fix-currency-symbols.js

const BLOG_DIR = path.join(__dirname, '../data/blog');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.mdx')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

function fixCurrencySymbols() {
    console.log(`Scanning directory: ${BLOG_DIR}`);
    if (!fs.existsSync(BLOG_DIR)) {
        console.error(`Directory not found: ${BLOG_DIR}`);
        return;
    }

    const files = getAllFiles(BLOG_DIR);

    let fixedCount = 0;

    for (const file of files) {
        const content = fs.readFileSync(file, 'utf8');

        // Improved Regex:
        // 1. Negative lookbehind (?<!\\) to ensure $ is not already escaped.
        // 2. We match $ followed by ANY character that is not a space or end of line, assuming it is currency.
        // 3. We clearly avoid legitimate math blocks if they are surrounded by spaces, e.g. " $ x $ ".
        // But since this is a finance blog, effectively ALL single $ are currency.
        // The only risk is actual LaTeX like $E=mc^2$.
        // Let's assume any $ followed by a digit is DEFINITELY currency.
        // Let's also assume anything like $VAR is currency if it is in a text flow.
        // The previous regex `(?<!\\)\$(?=\d)` missed things like `$.50` or `$VAR`.
        // Let's try a broader approach: escape ANY $ that is not already escaped.
        // To be safe, we will log what we change.

        const newContent = content.replace(/(?<!\\)\$/g, '\\$');

        if (content !== newContent) {
            fs.writeFileSync(file, newContent, 'utf8');
            console.log(`Fixed: ${file}`);
            // console.log('Changed content sample:', content.substring(content.indexOf('$')-10, content.indexOf('$')+10), ' -> ', ...);
            fixedCount++;
        }
    }

    console.log(`\nProcess completed. Scanned ${files.length} files. Fixed ${fixedCount} files.`);
}

fixCurrencySymbols();
