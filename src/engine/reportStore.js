import { compareReports } from './comparisonEngine';
import { mockExtractReport } from './mockAiExtractor';

const STORAGE_PREFIX = 'mediviz.reportHistory.';

function storageKey(patientId) {
  return `${STORAGE_PREFIX}${patientId}`;
}

function read(patientId) {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(storageKey(patientId));
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(patientId, data) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(storageKey(patientId), JSON.stringify(data));
}

function sortByDateDesc(reports) {
  return [...reports].sort((a, b) => new Date(b.reportDate) - new Date(a.reportDate));
}

export function getReportHistory(patientId) {
  return sortByDateDesc(read(patientId));
}

export async function ingestReport(patientId, file) {
  const history = getReportHistory(patientId);
  const previous = history[0] || null;

  const parsed = await mockExtractReport(file, patientId);
  const comparison = compareReports(previous, parsed);

  const report = {
    ...parsed,
    comparison,
    createdAt: new Date().toISOString(),
  };

  const nextHistory = sortByDateDesc([report, ...history]);
  write(patientId, nextHistory);
  return {
    report,
    history: nextHistory,
  };
}
