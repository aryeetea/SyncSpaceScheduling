import { TimeBlock } from './TimeBlock';
import { GlassCard } from './GlassCard';
import { DaySchedule, AvailabilityStatus, TIME_SLOTS } from '../types/schedule';

interface DayColumnProps {
  day: string;
  schedule: DaySchedule;
  onUpdateBlock: (hour: number, status: AvailabilityStatus | null) => void;
  highlightedHours?: number[];
  getAvailabilityScore: (dayIndex: number, hour: number) => number;
}

export function DayColumn({ day, schedule, onUpdateBlock, highlightedHours = [], getAvailabilityScore }: DayColumnProps) {
  const handleDragOver = (hour: number, status: AvailabilityStatus | null) => {
    onUpdateBlock(hour, status);
  };

  // Get day index for score calculation
  const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayIndex = DAYS.findIndex(d => d === day.toLowerCase());

  return (
    <div className="flex flex-col min-w-[130px] sm:min-w-[140px] animate-slide-up" style={{ animationDelay: `${dayIndex * 0.05}s` }}>
      <GlassCard className="!p-3.5 sm:!p-4 relative overflow-hidden glass-shimmer">
        {/* Day header */}
        <div className="mb-3.5 sm:mb-4 text-center">
          <h3 className="hangyaku-font text-slate-200/90 text-base sm:text-lg">{day}</h3>
        </div>
        
        {/* Time blocks */}
        <div className="space-y-2">
          {TIME_SLOTS.map((hour) => {
            const block = schedule.blocks.find(b => b.hour === hour);
            const availabilityScore = getAvailabilityScore(dayIndex, hour);
            
            return (
              <TimeBlock
                key={hour}
                hour={hour}
                status={block?.status || null}
                onStatusChange={(status) => onUpdateBlock(hour, status)}
                onDragOver={() => handleDragOver(hour, block?.status || null)}
                isHighlighted={highlightedHours.includes(hour)}
                availabilityScore={availabilityScore}
              />
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}