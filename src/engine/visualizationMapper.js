function toInsightTone(trend) {
  if (trend === 'improved') return 'positive';
  if (trend === 'worsened') return 'neutral';
  return 'calm';
}

function toTimelineType(trend) {
  if (trend === 'improved') return 'improved';
  if (trend === 'worsened') return 'watch';
  return 'neutral';
}

function monthLabel(dateText) {
  return new Date(dateText).toLocaleString('en-US', { month: 'short' });
}

function riskLevel(score) {
  if (score >= 75) return 'High';
  if (score >= 55) return 'Moderate';
  return 'Low';
}

function projection(history) {
  if (!history.length) return [];
  const severitySeries = history
    .map((item) => item.severityScore)
    .reverse()
    .slice(-4);
  const latest = history[0].severityScore;
  const first = severitySeries[0] || latest;
  const drift = Math.round((latest - first) / Math.max(1, severitySeries.length - 1));

  const now = new Date();
  return Array.from({ length: 3 }).map((_, idx) => {
    const point = new Date(now.getFullYear(), now.getMonth() + idx + 1, 1);
    return {
      month: point.toLocaleString('en-US', { month: 'short' }),
      predicted: Math.max(12, Math.min(96, latest + drift * (idx + 1))),
    };
  });
}

export function mapReportsToView(history) {
  const sorted = [...history].sort((a, b) => new Date(b.reportDate) - new Date(a.reportDate));
  const latest = sorted[0] || null;
  const previous = sorted[1] || null;
  const baseline = sorted[sorted.length - 1] || null;

  if (!latest) {
    return {
      hasReports: false,
      latestReportCard: null,
      organStatus: [],
      timeline: [],
      progressionData: [],
      symptoms: [],
      downloadReports: [],
      prediction: {
        confidence: 0,
        direction: 'Not available',
        level: 'Not available',
        message: 'Upload reports to generate a prediction timeline.',
      },
    };
  }

  const change = latest.comparison?.severityDelta ?? 0;
  const trendWord = change > 0 ? 'worse' : change < 0 ? 'improved' : 'steady';
  const summary =
    latest.comparison?.summary ||
    `Your latest report looks ${trendWord} compared with the previous one.`;

  const findings = (latest.comparison?.findingChanges || []).map((item) => ({
    label: item.label,
    status:
      item.trend === 'worsened'
        ? 'Needs attention'
        : item.trend === 'improved'
          ? 'Improving'
          : item.trend === 'new'
            ? 'New finding'
            : 'Stable',
    detail:
      item.previous == null
        ? `${item.label} appears in this report and was not highlighted previously.`
        : `${item.label} changed from ${item.previous} to ${item.current}.`,
    tone: toInsightTone(item.trend),
  }));

  const organStatus = latest.organs.map((item) => ({
    organ: item.name,
    score: item.score,
    label: item.condition,
  }));

  const historyAsc = [...sorted].reverse();
  const measured = historyAsc.map((item) => ({
    month: monthLabel(item.reportDate),
    severity: item.severityScore,
    predicted: null,
  }));
  const predicted = projection(sorted);
  const progressionData = [
    ...measured,
    ...predicted.map((item) => ({
      month: item.month,
      severity: null,
      predicted: item.predicted,
    })),
  ];

  const timeline = sorted.map((item) => ({
    date: new Date(item.reportDate).toLocaleString('en-US', { day: '2-digit', month: 'short' }),
    title: item.diagnosis,
    text: item.comparison?.summary || 'Baseline report stored for future comparison.',
    type: toTimelineType(item.comparison?.severityTrend),
  }));

  const symptoms = latest.findings.slice(0, 4).map((item) => {
    const previousFinding = previous?.findings.find((prev) => prev.label === item.label);
    return {
      name: item.label.split(' ').slice(0, 2).join(' '),
      current: item.score,
      previous: previousFinding?.score ?? item.score,
    };
  });

  const downloadReports = sorted.map((item) => ({
    id: item.reportId,
    title: item.diagnosis,
    date: new Date(item.reportDate).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
  }));

  return {
    hasReports: true,
    latestReportCard: {
      id: latest.reportId,
      date: latest.reportDate,
      title: latest.diagnosis,
      status: latest.comparison?.baseline ? 'Baseline stored' : 'Compared with previous report',
      severity: latest.severityScore,
      change,
      summary,
      confidence: latest.confidence,
      preview:
        'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=80',
      findings: findings.length ? findings : [{ label: 'Initial baseline', status: 'Stored', detail: summary, tone: 'calm' }],
      riskScore: latest.riskScore,
      severityLabel: latest.severity,
      reportJson: latest,
    },
    organStatus,
    timeline,
    progressionData,
    symptoms,
    downloadReports,
    prediction: {
      confidence: latest.confidence,
      direction: change > 2 ? 'Likely worsening' : change < -2 ? 'Likely improving' : 'Likely stable',
      level: riskLevel(latest.riskScore),
      message:
        change > 2
          ? 'The trend suggests inflammation may continue unless symptoms improve quickly.'
          : change < -2
            ? 'The trend suggests continued recovery if current care remains consistent.'
            : 'The trend is steady. Follow-up reports will improve prediction confidence.',
      baselineDate: baseline?.reportDate || latest.reportDate,
    },
  };
}
