import { useState, useEffect } from 'react';
import { DayColumn } from './DayColumn';
import { MemberList } from './MemberList';
import { GlassCard } from './GlassCard';
import { BestTimesSummary } from './BestTimesSummary';
import { AvailabilityStatus, DAYS, TIME_SLOTS, STATUS_LABELS, Member, DayAvailability } from '../types/schedule';
import { ArrowLeft, Copy, Check, RotateCcw, Calendar, Volume2, VolumeX } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import backgroundImage from 'figma:asset/d2f09520fc8cbcb89ca77411bd30348fd61b17ed.png';
import { sounds } from '../utils/sounds';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-090a6328`;

interface GroupRoomProps {
  groupName: string;
  groupCode: string;
  userName: string;
  memberId: string;
  onBack: () => void;
}

export function GroupRoom({ groupName, groupCode, userName, memberId, onBack }: GroupRoomProps) {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState<Member[]>([]);
  const [lastWeekTemplate, setLastWeekTemplate] = useState<DaySchedule[] | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isMuted, setIsMuted] = useState(() => sounds.getMuted());

  // Initialize empty availability structure
  const createEmptyAvailability = () => {
    return DAYS.map(day => ({
      day,
      blocks: TIME_SLOTS.map(hour => ({
        hour,
        status: null
      }))
    }));
  };

  // Fetch group data and members
  const fetchGroupData = async () => {
    try {
      const response = await fetch(`${API_URL}/groups/${groupCode}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch group data');
      }

      const data = await response.json();
      
      // Transform API data to Member format
      const transformedMembers: Member[] = data.members.map((m: any) => ({
        id: m.id,
        name: m.name,
        avatar: '',
        availability: m.availability || createEmptyAvailability()
      }));

      setMembers(transformedMembers);
    } catch (error) {
      console.error('Error fetching group data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Save availability to server
  const saveAvailability = async (availability: any) => {
    setIsSaving(true);
    try {
      const response = await fetch(`${API_URL}/groups/${groupCode}/availability`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          memberId,
          availability
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save availability');
      }
    } catch (error) {
      console.error('Error saving availability:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    fetchGroupData();
    
    // Load last week's template from localStorage
    const savedTemplate = localStorage.getItem(`lastWeek_${memberId}`);
    if (savedTemplate) {
      setLastWeekTemplate(JSON.parse(savedTemplate));
    }
    
    // Poll for updates every 5 seconds
    const interval = setInterval(fetchGroupData, 5000);
    return () => clearInterval(interval);
  }, [groupCode]);

  // Save current availability as "last week" template when user makes changes
  useEffect(() => {
    if (!isLoading && members.length > 0) {
      const current = members.find(m => m.id === memberId);
      if (current && current.availability) {
        // Check if there's any availability set
        const hasAvailability = current.availability.some(day =>
          day.blocks.some(block => block.status !== null)
        );
        
        if (hasAvailability) {
          localStorage.setItem(`lastWeek_${memberId}`, JSON.stringify(current.availability));
          setLastWeekTemplate(current.availability);
        }
      }
    }
  }, [members, memberId, isLoading]);

  const currentMember = members.find(m => m.id === memberId) || {
    id: memberId,
    name: userName,
    avatar: '',
    availability: createEmptyAvailability()
  };

  // Calculate availability scores for subtle highlighting
  const getAvailabilityScore = (dayIndex: number, hour: number): number => {
    if (members.length <= 1) return 0;
    
    const availableCount = members.filter(member => {
      const block = member.availability[dayIndex]?.blocks.find(b => b.hour === hour);
      return block?.status === 'available' || block?.status === 'remote';
    }).length;
    
    return availableCount / members.length; // Returns 0-1
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(groupCode);
    sounds.copy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUpdateBlock = (dayIndex: number, hour: number, status: AvailabilityStatus | null) => {
    // Play sound based on status
    if (status === 'available') {
      sounds.availableChime();
    } else if (status === 'remote') {
      sounds.remoteChime();
    } else if (status === 'busy') {
      sounds.busyTone();
    } else {
      sounds.softClick();
    }

    setMembers(prev => {
      const updated = [...prev];
      const userIndex = updated.findIndex(m => m.id === memberId);
      
      if (userIndex !== -1) {
        const userAvailability = updated[userIndex].availability[dayIndex];
        const blockIndex = userAvailability.blocks.findIndex(b => b.hour === hour);
        
        if (blockIndex !== -1) {
          userAvailability.blocks[blockIndex].status = status;
          
          // Save the entire availability array to the server
          saveAvailability(updated[userIndex].availability);
        }
      }
      
      return updated;
    });
  };

  const handleResetSchedule = () => {
    sounds.clear();
    const emptyAvailability = createEmptyAvailability();
    setMembers(prev => {
      const updated = [...prev];
      const userIndex = updated.findIndex(m => m.id === memberId);
      
      if (userIndex !== -1) {
        updated[userIndex].availability = emptyAvailability;
        saveAvailability(emptyAvailability);
      }
      
      return updated;
    });
  };

  const handleCopyFromLastWeek = () => {
    if (lastWeekTemplate) {
      sounds.copy();
      // Deep clone the template to avoid reference issues
      const copiedAvailability = JSON.parse(JSON.stringify(lastWeekTemplate));
      
      setMembers(prev => {
        const updated = [...prev];
        const userIndex = updated.findIndex(m => m.id === memberId);
        
        if (userIndex !== -1) {
          updated[userIndex].availability = copiedAvailability;
          saveAvailability(copiedAvailability);
        }
        
        return updated;
      });
    }
  };

  const onLeave = () => {
    sounds.transition();
    onBack();
  };

  const toggleMute = () => {
    const newMuted = sounds.toggleMute();
    setIsMuted(newMuted);
    if (!newMuted) {
      sounds.softClick();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center">
        <div className="fixed inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }} />
        <div className="fixed inset-0 bg-slate-950/15" />
        <div className="relative z-10">
          <GlassCard>
            <p className="hangyaku-font text-slate-300">loading group...</p>
          </GlassCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background image */}
      <div 
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Light overlay to enhance readability while showing the image */}
      <div className="fixed inset-0 bg-slate-950/15" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen p-4 sm:p-6" onMouseUp={() => {}}>
        <div className="max-w-[1600px] mx-auto space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row sm:items-center sm:justify-between animate-slide-in-left">
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={onLeave}
                className="hangyaku-font flex items-center gap-2 px-4 py-2.5 sm:py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-300 transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                back home
              </button>
              
              <h1 className="hangyaku-font text-xl sm:text-2xl text-slate-100 truncate">{groupName}</h1>
            </div>
            
            <div className="flex items-center gap-3 flex-wrap">
              <GlassCard className="!p-3 flex items-center gap-3 flex-1 sm:flex-initial">
                <span className="hangyaku-font text-sm text-slate-300/70">group code:</span>
                <code className="hangyaku-font text-sm text-slate-100 font-mono">{groupCode}</code>
                <button
                  onClick={handleCopyCode}
                  className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300"
                  title="Copy code"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-400" />
                  )}
                </button>
              </GlassCard>
              
              <button
                onClick={handleResetSchedule}
                className="hangyaku-font flex items-center gap-2 px-4 py-2.5 sm:py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-300 transition-all duration-300"
                title="Clear all availability"
              >
                <RotateCcw className="w-4 h-4" />
                clear
              </button>
            </div>
          </div>

          {/* Legend */}
          <GlassCard className="!p-4 animate-slide-up animate-delay-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-8 flex-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400/70 animate-gentle-pulse" />
                  <span className="hangyaku-font text-sm text-slate-300/80">available (in person)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-400/70 animate-gentle-pulse" style={{ animationDelay: '0.3s' }} />
                  <span className="hangyaku-font text-sm text-slate-300/80">available (remote)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400/70 animate-gentle-pulse" style={{ animationDelay: '0.6s' }} />
                  <span className="hangyaku-font text-sm text-slate-300/80">busy</span>
                </div>
              </div>
              
              {/* Copy from last week button - subtle and minimal */}
              {lastWeekTemplate && (
                <button
                  onClick={handleCopyFromLastWeek}
                  className="hangyaku-font flex items-center justify-center sm:justify-start gap-2 px-3 py-2 sm:py-1.5 text-xs text-slate-400/70 hover:text-slate-300 hover:bg-white/5 rounded-lg transition-all"
                  title="Copy availability from last week"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  copy from last week
                </button>
              )}
            </div>
          </GlassCard>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            {/* Calendar */}
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-3 min-w-max">
                {DAYS.map((day, index) => (
                  <DayColumn
                    key={day}
                    day={day}
                    schedule={currentMember.availability[index]}
                    onUpdateBlock={(hour, status) => handleUpdateBlock(index, hour, status)}
                    getAvailabilityScore={getAvailabilityScore}
                  />
                ))}
              </div>
            </div>

            {/* Sidebar - Best Times and Members */}
            <div className="lg:sticky lg:top-6 h-fit">
              <div className="space-y-4">
                <BestTimesSummary members={members} />
                <MemberList members={members} currentUserId={memberId} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sound Toggle */}
      <button
        onClick={toggleMute}
        className="fixed top-6 right-6 z-50 p-3 bg-white/5 hover:bg-white/10 border border-slate-300/20 rounded-xl text-slate-300 transition-all duration-300"
        title={isMuted ? "Unmute sounds" : "Mute sounds"}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>
    </div>
  );
}