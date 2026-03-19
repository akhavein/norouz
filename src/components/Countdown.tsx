import { padTwo } from '../utils/dateHelpers';

interface CountdownProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function TimeUnit({ value, label, shortLabel }: { value: number; label: string; shortLabel: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-stone-900 tabular-nums leading-none">
        {padTwo(value)}
      </span>
      <span className="mt-2 text-xs sm:text-sm font-medium text-stone-400 uppercase tracking-widest">
        <span className="hidden min-[375px]:inline">{label}</span>
        <span className="inline min-[375px]:hidden">{shortLabel}</span>
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-stone-300 self-start mt-1 sm:mt-2 md:mt-3">
      :
    </span>
  );
}

export function Countdown({ days, hours, minutes, seconds }: CountdownProps) {
  return (
    <div className="flex items-start justify-center gap-3 sm:gap-4 md:gap-6" role="timer" aria-live="polite" aria-atomic="true">
      <TimeUnit value={days} label="Days" shortLabel="d" />
      <Separator />
      <TimeUnit value={hours} label="Hours" shortLabel="h" />
      <Separator />
      <TimeUnit value={minutes} label="Minutes" shortLabel="m" />
      <Separator />
      <TimeUnit value={seconds} label="Seconds" shortLabel="s" />
    </div>
  );
}
