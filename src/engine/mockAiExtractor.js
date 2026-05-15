const diagnosisLibrary = [
  {
    diagnosis: 'Acute Appendicitis',
    organs: [
      { name: 'Appendix', condition: 'Inflamed', score: 38 },
      { name: 'Liver', condition: 'Mild fatty changes', score: 68 },
      { name: 'Gallbladder', condition: 'Normal', score: 89 },
      { name: 'Kidneys', condition: 'Normal', score: 87 },
    ],
    findings: [
      { name: 'Appendiceal wall thickening', severity: 72, organ: 'Appendix' },
      { name: 'Periappendiceal fat stranding', severity: 63, organ: 'Appendix' },
      { name: 'Small right hepatic calcification', severity: 30, organ: 'Liver' },
    ],
    measurements: [
      { name: 'Appendix diameter', unit: 'mm', value: 11 },
      { name: 'Inflammatory spread', unit: '%', value: 68 },
      { name: 'Free fluid', unit: 'grade', value: 1 },
    ],
    riskIndicators: ['Inflammation increased', 'Local tenderness correlation needed'],
  },
  {
    diagnosis: 'Abdominal Inflammation Follow-up',
    organs: [
      { name: 'Appendix', condition: 'Mild residual inflammation', score: 55 },
      { name: 'Liver', condition: 'Stable', score: 72 },
      { name: 'Gallbladder', condition: 'Normal', score: 90 },
      { name: 'Kidneys', condition: 'Normal', score: 88 },
    ],
    findings: [
      { name: 'Residual appendix inflammation', severity: 58, organ: 'Appendix' },
      { name: 'Mesenteric fat edema', severity: 47, organ: 'Appendix' },
      { name: 'Mild hepatic steatosis', severity: 35, organ: 'Liver' },
    ],
    measurements: [
      { name: 'Appendix diameter', unit: 'mm', value: 9 },
      { name: 'Inflammatory spread', unit: '%', value: 52 },
      { name: 'Free fluid', unit: 'grade', value: 0 },
    ],
    riskIndicators: ['Continue follow-up', 'Watch for pain increase'],
  },
];

function seededValue(seed, min, max) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const normalized = Math.abs(hash % 1000) / 1000;
  return Math.round(min + normalized * (max - min));
}

function toSeverityLabel(score) {
  if (score >= 76) return 'High';
  if (score >= 56) return 'Moderate';
  if (score >= 36) return 'Mild';
  return 'Minimal';
}

export async function mockExtractReport(file, patientId) {
  const key = `${file.name}-${file.size}-${file.lastModified}`;
  const selected = diagnosisLibrary[seededValue(key, 0, diagnosisLibrary.length - 1)];
  const jitter = seededValue(key, -7, 7);
  const severityScore = Math.max(18, Math.min(95, selected.findings[0].severity + jitter));
  const riskScore = Math.max(20, Math.min(96, severityScore + seededValue(key, -6, 10)));
  const confidence = Math.max(78, Math.min(99, seededValue(key, 84, 97)));

  const findings = selected.findings.map((finding, index) => ({
    id: `F-${index + 1}`,
    label: finding.name,
    organ: finding.organ,
    score: Math.max(10, Math.min(98, finding.severity + seededValue(`${key}-${index}`, -8, 8))),
  }));

  const organs = selected.organs.map((organ, index) => ({
    id: `O-${index + 1}`,
    name: organ.name,
    condition: organ.condition,
    score: Math.max(20, Math.min(98, organ.score + seededValue(`${organ.name}-${key}`, -7, 6))),
  }));

  const now = new Date();
  const reportDate = now.toISOString().slice(0, 10);
  const ext = file.name.split('.').pop()?.toLowerCase() || 'dat';

  return {
    patientId,
    reportId: `RPT-${now.getTime()}`,
    scanId: `SCAN-${now.getTime()}`,
    reportDate,
    sourceType: ext === 'pdf' ? 'pdf' : 'image',
    fileName: file.name,
    diagnosis: selected.diagnosis,
    severity: toSeverityLabel(severityScore),
    severityScore,
    findings,
    organs,
    measurements: selected.measurements,
    riskScore,
    confidence,
    riskIndicators: selected.riskIndicators,
  };
}
