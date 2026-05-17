const fs = require('fs');
const html = fs.readFileSync('official-ncert-page.html', 'utf8');

const lines = html.split('\n');
let currentClass = null;
let currentSubject = null;
let data = {};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  const classMatch = line.match(/document\.test\.tclass\.value\s*==\s*['"]?(\d+)['"]?/);
  const subjectMatch = line.match(/document\.test\.tsubject\.options\[sind\]\.text\s*==\s*['"]([^'"]+)['"]/);
  
  if (classMatch && subjectMatch) {
      currentClass = classMatch[1];
      currentSubject = subjectMatch[1];
      if (!data[currentClass]) data[currentClass] = {};
      if (!data[currentClass][currentSubject]) data[currentClass][currentSubject] = { books: [] };
  } else if (classMatch) {
      currentClass = classMatch[1];
  } else if (subjectMatch && currentClass) {
      currentSubject = subjectMatch[1];
      if (!data[currentClass]) data[currentClass] = {};
      if (!data[currentClass][currentSubject]) data[currentClass][currentSubject] = { books: [] };
  }

  if (currentClass && currentSubject) {
    if (line.includes('.text') && line.includes('=') && !line.includes('..Select Book Title..')) {
      const titleMatch = line.match(/\.text\s*=\s*['"]([^'"]+)['"]/);
      if (titleMatch) {
        let title = titleMatch[1];
        if (title !== '') {
          // Check for link matching over next 3 lines
          let linkMatch = null;
          let j = i + 1;
          while (j <= i + 5 && j < lines.length) {
            let nextLine = lines[j];
            if (nextLine.includes('.text =')) break; // Next title definition
            if (nextLine.includes('.value')) {
                let m = nextLine.match(/\.value\s*=\s*['"]textbook\.php\?([^=]+)=0-(\d+)['"]/);
                if (m) {
                    linkMatch = m;
                    break;
                }
            }
            j++;
          }
          
          if (!data[currentClass]) data[currentClass] = {};
          if (!data[currentClass][currentSubject]) data[currentClass][currentSubject] = { books: [] };

          if (linkMatch) {
            let id = linkMatch[1];
            let maxChapters = parseInt(linkMatch[2], 10);
            let chapters = [];
            for(let c=1; c<=maxChapters; c++) {
              chapters.push({ name: 'Chapter '+c, pdf: (c<10 ? '0'+c : c) + '.pdf' });
            }
            
            if (!data[currentClass][currentSubject].books.find(b => b.id === id)) {
                data[currentClass][currentSubject].books.push({
                    id: id,
                    title: title,
                    linkPrefix: 'https://ncert.nic.in/textbook/pdf/'+id,
                    chapters: chapters
                });
            }
          } else if (title.toLowerCase().includes('coming soon')) {
            if (!data[currentClass][currentSubject].books.find(b => b.id === 'coming_soon')) {
                data[currentClass][currentSubject].books.push({
                    id: 'coming_soon',
                    title: title,
                    linkPrefix: '',
                    chapters: []
                });
            }
          }
        }
      }
    }
  }
}
fs.writeFileSync('ncert_data.json', JSON.stringify(data, null, 2));
console.log("Parsed " + Object.keys(data).length + " classes");
