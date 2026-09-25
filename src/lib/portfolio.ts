import fs from 'fs/promises';
import path from 'path';
import { PortfolioData } from '@/types/portfolio';

export async function getPortfolioData(): Promise<PortfolioData> {
  const dataPath = path.join(process.cwd(), 'src', 'data', 'portfolio.json');
  const fileContents = await fs.readFile(dataPath, 'utf8');
  return JSON.parse(fileContents) as PortfolioData;
}
