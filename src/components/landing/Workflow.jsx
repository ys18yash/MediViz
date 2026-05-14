import { FileImage, LineChart, MessageCircleHeart, ScanLine } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { SectionHeader } from '../ui/SectionHeader';

const steps = [
  { title: 'Open securely', text: 'Use your patient ID or the QR code sent by your care team.', icon: ScanLine },
  { title: 'View your report', text: 'Your scan is translated into clear visuals and simple summaries.', icon: FileImage },
  { title: 'Track change', text: 'Progression charts show whether findings are improving or need attention.', icon: LineChart },
  { title: 'Feel guided', text: 'AI insights prepare calm, practical questions for your doctor.', icon: MessageCircleHeart },
];

export function Workflow() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="How it helps"
          title="A gentler way to read medical updates"
          text="The interface focuses on what changed, what it means, and what to do next."
        />
        <div className="grid gap-4 md:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <GlassCard key={step.title} delay={index * 0.06} className="p-5">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-slate-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
