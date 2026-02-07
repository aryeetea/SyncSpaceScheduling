import { AvailabilityStatus } from '../types/schedule';
import { useState } from 'react';

interface TimeBlockProps {
  hour: number;
  status: AvailabilityStatus | null;
  onStatusChange: (status: AvailabilityStatus | null) => void;
  onDragOver: () => void;
  isHighlighted?: boolean;
  availabilityScore?: number;
}

export function TimeBlock({ hour, status, onStatusChange, onDragOver, isHighlighted, availabilityScore = 0 }: TimeBlockProps) {
  const [isPressed, setIsPressed] = useState(false);

  const formatTime = (hour: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:00 ${period}`;
  };

  const getNextStatus = (currentStatus: AvailabilityStatus | null): AvailabilityStatus | null => {
    if (currentStatus === null) return 'available';
    if (currentStatus === 'available') return 'remote';
    if (currentStatus === 'remote') return 'busy';
    return null;
  };

  // Calculate subtle highlighting based on availability score
  const getSmartHighlighting = () => {
    if (availabilityScore === 0) return '';
    
    // Higher scores (more people available) = brighter and clearer
    // Lower scores = softer and more faded
    if (availabilityScore >= 0.7) {
      // High availability - subtle glow
      return 'smart-highlight-high';
    } else if (availabilityScore >= 0.4) {
      // Medium availability - slight brightness
      return 'smart-highlight-medium';
    } else if (availabilityScore > 0) {
      // Low availability - softer appearance
      return 'smart-highlight-low';
    }
    
    return '';
  };

  const getStatusStyles = () => {
    const smartHighlight = getSmartHighlighting();
    
    if (!status) {
      return `bg-white/5 border-white/10 hover:bg-white/10 ${smartHighlight}`;
    }
    
    switch (status) {
      case 'available':
        return `bg-emerald-400/15 border-emerald-400/25 hover:bg-emerald-400/20 ${smartHighlight}`;
      case 'remote':
        return `bg-blue-400/15 border-blue-400/25 hover:bg-blue-400/20 ${smartHighlight}`;
      case 'busy':
        return `bg-rose-400/15 border-rose-400/25 hover:bg-rose-400/20 ${smartHighlight}`;
      default:
        return `bg-white/5 border-white/10 hover:bg-white/10 ${smartHighlight}`;
    }
  };

  const getStatusDot = () => {
    if (!status) return null;
    
    switch (status) {
      case 'available':
        return <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400/70 animate-gentle-pulse" />;
      case 'remote':
        return <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-400/70 animate-gentle-pulse" />;
      case 'busy':
        return <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-400/70 animate-gentle-pulse" />;
      default:
        return null;
    }
  };

  const handleMouseDown = () => {
    setIsPressed(true);
    onStatusChange(getNextStatus(status));
  };

  const handleMouseEnter = () => {
    if (isPressed) {
      onDragOver();
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  return (
    <div
      className={`hangyaku-font relative h-14 sm:h-16 rounded-xl border transition-all duration-300 cursor-pointer select-none ${getStatusStyles()} ${
        isHighlighted ? 'ring-2 ring-yellow-400/50' : ''
      }`}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs text-slate-300/60">{formatTime(hour)}</span>
      </div>
      {getStatusDot()}
    </div>
  );
}