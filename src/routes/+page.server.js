// +page.server.js
import fs from 'fs';
import path from 'path';

export async function load() {
  const coversDir = path.resolve('static/covers');
  const files = fs.readdirSync(coversDir);

  const books = files
    .filter(file => /\.(jpe?g|png)$/i.test(file))
    .map(file => path.parse(file).name);

  return { books };
}
