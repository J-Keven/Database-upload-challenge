import fs from 'fs';
import scvParser from 'csv-parse';

interface Data {
  title: string;
  type: string;
  value: number;
  category: string;
}

async function readCsv(filePath: string): Promise<Data[]> {
  const readCsvStream = fs.createReadStream(filePath);

  const parseStream = scvParser({
    from_line: 2,
    ltrim: true,
    rtrim: true,
  });

  const lines: Data[] = [];

  const parseCSV = readCsvStream.pipe(parseStream);
  parseCSV.on('data', (line: string[]) => {
    const [title, type, value, category] = line;

    const trasaction = {
      title,
      type,
      value: Number(value),
      category,
    };

    lines.push(trasaction);
  });

  await new Promise(resolve => {
    parseCSV.on('end', resolve);
  });

  return lines;
}

export default readCsv;
