import { useEffect, useState } from 'react';

const stages = [
  'Connecting securely',
  'Reading latest scan',
  'Highlighting important areas',
  'Building plain-language summary',
  'Preparing report view',
];

export function useRealtimeEvents(enabled = true) {
  const [event, setEvent] = useState({
    type: 'DEVICE_CONNECTED',
    progress: 100,
    message: 'Secure patient session ready',
  });

  useEffect(() => {
    if (!enabled) return undefined;

    let index = 0;
    const interval = window.setInterval(() => {
      index = (index + 1) % stages.length;
      setEvent({
        type: index === stages.length - 1 ? 'ANALYSIS_COMPLETED' : 'ANALYSIS_PROGRESS',
        progress: Math.min(100, 22 + index * 19),
        message: stages[index],
      });
    }, 3200);

    return () => window.clearInterval(interval);
  }, [enabled]);

  return event;
}
