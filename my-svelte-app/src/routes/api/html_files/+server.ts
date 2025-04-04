import fs from 'fs';
import path from 'path';

export async function GET() {
	const inputDir = path.resolve('static/html_slides');
	const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.xhtml'));

	const cleanedSlides = files.map(file => {
		const raw = fs.readFileSync(path.join(inputDir, file), 'utf-8');

		// Clean: remove outer <html>, <head>, <body>
		let cleaned = raw
			.replace(/<\?xml[^>]*\?>/, '') // remove <?xml ... ?>
			.replace(/<!DOCTYPE[^>]*>/i, '') // remove doctype
			.replace(/<\/?(html|head|body)[^>]*>/gi, '') // remove html/head/body tags
			.replace(/\.\.\/images\//g, '/images/'); // fix image paths

		console.log(`✅ Cleaned content from ${file}:`, cleaned.substring(0, 100)); // Debug log

		return cleaned.trim();
	});

	return new Response(JSON.stringify(cleanedSlides), {
		headers: { 'Content-Type': 'application/json' }
	});
}
