export const patient = {
  id: 'MV-2049-ALYA',
  name: 'Alya Mehra',
  age: 34,
  careTeam: 'Radiology + Pulmonary Care',
  nextReview: '18 May 2026',
};

export const reports = [
  {
    id: 'RPT-0526',
    date: '14 May 2026',
    title: 'Chest Scan Review',
    status: 'Ready to view',
    severity: 42,
    change: -8,
    summary:
      'Your latest scan shows mild inflammation, with signs of improvement compared with your previous report.',
    confidence: 92,
    preview:
      'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=1200&q=80',
    findings: [
      {
        label: 'Inflammation',
        status: 'Improving',
        detail: 'Less visible than last time, especially around the lower left region.',
        tone: 'positive',
      },
      {
        label: 'Breathing space',
        status: 'Stable',
        detail: 'No concerning narrowing was detected in the reviewed scan area.',
        tone: 'neutral',
      },
      {
        label: 'Follow-up need',
        status: 'Routine',
        detail: 'A normal follow-up is recommended to confirm the improvement continues.',
        tone: 'calm',
      },
    ],
  },
  {
    id: 'RPT-0426',
    date: '21 Apr 2026',
    title: 'Chest Scan Review',
    status: 'Reviewed',
    severity: 50,
    change: 6,
    summary: 'Moderate irritation was present, with no urgent warning signs.',
    confidence: 88,
  },
  {
    id: 'RPT-0326',
    date: '20 Mar 2026',
    title: 'Chest Scan Review',
    status: 'Reviewed',
    severity: 44,
    change: -3,
    summary: 'Mild changes were present and treatment response was being monitored.',
    confidence: 86,
  },
];

export const progressionData = [
  { month: 'Jan', severity: 62, comfort: 42, predicted: null },
  { month: 'Feb', severity: 56, comfort: 50, predicted: null },
  { month: 'Mar', severity: 44, comfort: 63, predicted: null },
  { month: 'Apr', severity: 50, comfort: 58, predicted: null },
  { month: 'May', severity: 42, comfort: 70, predicted: 42 },
  { month: 'Jun', severity: null, comfort: null, predicted: 36 },
  { month: 'Jul', severity: null, comfort: null, predicted: 31 },
  { month: 'Aug', severity: null, comfort: null, predicted: 27 },
];

export const organStatus = [
  { organ: 'Lungs', score: 74, label: 'Healing trend', tone: 'blue' },
  { organ: 'Heart area', score: 91, label: 'Looks steady', tone: 'green' },
  { organ: 'Airways', score: 82, label: 'Open and stable', tone: 'teal' },
  { organ: 'Lower chest', score: 68, label: 'Watch gently', tone: 'amber' },
];

export const timeline = [
  {
    date: '14 May',
    title: 'Latest scan received',
    text: 'Mild inflammation detected. Overall direction is improving.',
    type: 'improved',
  },
  {
    date: '21 Apr',
    title: 'Temporary increase',
    text: 'Symptoms and scan score rose slightly, but stayed in a manageable range.',
    type: 'watch',
  },
  {
    date: '20 Mar',
    title: 'Treatment response seen',
    text: 'Early signs of recovery appeared after medication changes.',
    type: 'improved',
  },
  {
    date: '16 Feb',
    title: 'Baseline scan',
    text: 'Initial score recorded so future change could be compared clearly.',
    type: 'neutral',
  },
];

export const symptoms = [
  { name: 'Cough', current: 38, previous: 54 },
  { name: 'Breathlessness', current: 31, previous: 45 },
  { name: 'Chest tightness', current: 28, previous: 36 },
  { name: 'Fatigue', current: 42, previous: 48 },
];
