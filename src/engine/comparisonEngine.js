function scoreDelta(current, previous) {
  return Math.round((current || 0) - (previous || 0));
}

function classifyDelta(delta, threshold = 4) {
  if (delta >= threshold) return 'worsened';
  if (delta <= -threshold) return 'improved';
  return 'stable';
}

export function compareReports(previousReport, currentReport) {
  if (!previousReport) {
    return {
      baseline: true,
      severityDelta: 0,
      severityTrend: 'baseline',
      findingChanges: [],
      organChanges: [],
      newAbnormalities: currentReport.findings.map((finding) => finding.label),
      summary: 'This is your first report. It will be used as the baseline for future comparisons.',
    };
  }

  const prevFindingsByLabel = new Map(
    previousReport.findings.map((item) => [item.label.toLowerCase(), item]),
  );
  const prevOrgansByName = new Map(
    previousReport.organs.map((item) => [item.name.toLowerCase(), item]),
  );

  const findingChanges = currentReport.findings.map((finding) => {
    const previous = prevFindingsByLabel.get(finding.label.toLowerCase());
    const delta = scoreDelta(finding.score, previous?.score || 0);
    const trend = previous ? classifyDelta(delta, 5) : 'new';
    return {
      label: finding.label,
      organ: finding.organ,
      current: finding.score,
      previous: previous?.score ?? null,
      delta,
      trend,
    };
  });

  const organChanges = currentReport.organs.map((organ) => {
    const previous = prevOrgansByName.get(organ.name.toLowerCase());
    const delta = scoreDelta(organ.score, previous?.score || organ.score);
    return {
      organ: organ.name,
      current: organ.score,
      previous: previous?.score ?? null,
      delta,
      trend: previous ? classifyDelta(delta, 4) : 'new',
      condition: organ.condition,
    };
  });

  const severityDelta = scoreDelta(currentReport.severityScore, previousReport.severityScore);
  const severityTrend = classifyDelta(severityDelta, 3);
  const newAbnormalities = findingChanges
    .filter((item) => item.trend === 'new')
    .map((item) => item.label);

  let summary = 'Your condition appears stable compared to your previous report.';
  if (severityTrend === 'worsened') {
    summary = `Your condition appears slightly worse than your previous report.`;
  } else if (severityTrend === 'improved') {
    summary = `Your condition appears better than your previous report.`;
  }

  return {
    baseline: false,
    severityDelta,
    severityTrend,
    findingChanges,
    organChanges,
    newAbnormalities,
    summary,
  };
}
