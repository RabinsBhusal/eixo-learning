import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CalendarEvent, CalendarEventType } from '../types';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  User,
  Users,
  CheckCircle2,
  ExternalLink,
  Download,
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter,
  Sparkles,
  MapPin,
  Share2,
} from 'lucide-react';

export const CalendarPage: React.FC = () => {
  const { calendarEvents, toggleRegisterEvent, currentUser, openAuthModal } = useApp();
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'agenda'>('month');
  const [selectedEventType, setSelectedEventType] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(calendarEvents[0] || null);

  // Helper to generate Google Calendar URL
  const generateGoogleCalendarUrl = (event: CalendarEvent) => {
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(`${event.description}\n\nLead Tutor: ${event.tutorName}\nPlatform: EIXO Learning Campus`);
    const location = encodeURIComponent(event.meetingLink || event.location || 'EIXO Live Studio');
    
    // Convert startTime / endTime to Google Calendar format
    // e.g. 20261028T180000Z
    const startDate = '20261028T180000Z';
    const endDate = '20261028T193000Z';

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startDate}/${endDate}`;
  };

  // Helper to download .ICS file for Teams / Outlook / Apple
  const downloadIcsFile = (event: CalendarEvent) => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//EIXO Learning//Campus Calendar//EN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.meetingLink || event.location || 'EIXO Live Studio'}
DTSTART:20261028T180000Z
DTEND:20261028T193000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.title.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredEvents = calendarEvents.filter((ev) => {
    if (selectedEventType === 'all') return true;
    return ev.eventType === selectedEventType;
  });

  const getEventBadgeColor = (type: CalendarEventType) => {
    switch (type) {
      case 'live-masterclass':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'office-hours':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      case 'exam-workshop':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'study-group':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'assignment-deadline':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const formatEventDate = (isoString?: string) => {
    if (!isoString) return 'Wed, 28 Oct 2026';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return isoString;
    }
  };

  const formatEventTime = (isoString?: string) => {
    if (!isoString) return '18:00 - 19:30 GMT';
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) + ' GMT';
    } catch {
      return '18:00 GMT';
    }
  };

  // Days of sample calendar month grid
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-200 pb-20">
      {/* Header Banner */}
      <div className="bg-linear-to-b from-[#0e1628] to-[#070a12] border-b border-white/10 pt-8 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
              <CalendarIcon className="w-4 h-4" />
              <span>Live Masterclasses & Faculty Surgeries</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              EIXO Interactive Learning Calendar
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Teams & Google Calendar synced schedule for live Xero workshops, ACCA exam surgeries, and 1-on-1 tutor office hours.
            </p>
          </div>

          {/* Sync / Switcher buttons */}
          <div className="flex items-center gap-2">
            <div className="bg-[#0b0f19] p-1 rounded-xl border border-white/10 flex text-xs">
              <button
                onClick={() => setViewMode('month')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  viewMode === 'month' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  viewMode === 'week' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setViewMode('agenda')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  viewMode === 'agenda' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                Agenda List
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Filter Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-[#0b0f19] p-3 rounded-2xl border border-white/10">
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All Sessions' },
              { id: 'live-masterclass', label: '🎓 Live Masterclasses' },
              { id: 'office-hours', label: '👨‍🏫 1-on-1 Office Hours' },
              { id: 'exam-workshop', label: '⚙️ Exam Workshops' },
              { id: 'study-group', label: '👥 Study Groups' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedEventType(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedEventType === tab.id
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-bold text-white">October / November 2026</span>
          </div>
        </div>

        {/* View Layouts */}
        {viewMode === 'agenda' ? (
          /* Agenda View */
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="bg-[#0b0f19] hover:bg-[#0e1628] p-5 rounded-2xl border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#070a12] border border-white/10 flex flex-col items-center justify-center text-center shrink-0">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase">
                      OCT
                    </span>
                    <span className="text-lg font-black text-white font-mono">
                      28
                    </span>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getEventBadgeColor(
                          event.eventType
                        )}`}
                      >
                        {event.eventType.replace('-', ' ').toUpperCase()}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{formatEventTime(event.startTime)}</span>
                      </span>
                      <span className="text-xs text-slate-500">({event.location})</span>
                    </div>

                    <h3 className="text-base font-bold text-white leading-snug">{event.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">{event.description}</p>
                    
                    <div className="flex items-center gap-2 mt-2 text-xs text-slate-300">
                      <img
                        src={event.tutorAvatar}
                        alt={event.tutorName}
                        referrerPolicy="no-referrer"
                        className="w-4 h-4 rounded-full object-cover"
                      />
                      <span>{event.tutorName}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-cyan-400 font-semibold">{event.attendeesCount} enrolled</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={generateGoogleCalendarUrl(event)}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors border border-white/10"
                    title="Sync to Google Calendar"
                  >
                    <ExternalLink className="w-3 h-3 text-emerald-400" />
                    <span>Google Cal</span>
                  </a>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadIcsFile(event);
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors border border-white/10"
                    title="Sync to Microsoft Teams / Outlook"
                  >
                    <Download className="w-3 h-3 text-indigo-400" />
                    <span>Teams (.ics)</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleRegisterEvent(event.id);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      event.isRegistered
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    }`}
                  >
                    {event.isRegistered ? 'Registered ✓' : 'RSVP Free'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Month / Week Grid View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Calendar Grid */}
            <div className="lg:col-span-8 bg-[#0b0f19] p-5 rounded-3xl border border-white/10 shadow-xl">
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 pb-3 border-b border-white/10 mb-2">
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
                <div>Sun</div>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {daysInMonth.map((day) => {
                  const dayEvents = calendarEvents.filter((_, idx) => (idx % 7) + 1 === (day % 7) + 1);
                  const isToday = day === 28;

                  return (
                    <div
                      key={day}
                      className={`min-h-20 sm:min-h-24 p-1.5 rounded-xl border flex flex-col justify-between transition-all ${
                        isToday
                          ? 'bg-[#0f1d33] border-emerald-500/50'
                          : 'bg-[#070a12] border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span className={isToday ? 'text-emerald-400 font-mono' : 'text-slate-400 font-mono'}>
                          {day}
                        </span>
                        {isToday && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        )}
                      </div>

                      <div className="space-y-1 mt-1">
                        {dayEvents.slice(0, 2).map((ev) => (
                          <button
                            key={ev.id}
                            onClick={() => setSelectedEvent(ev)}
                            className="w-full text-left p-1 rounded bg-emerald-950/60 border border-emerald-500/30 text-[9px] font-semibold text-emerald-300 truncate hover:bg-emerald-900/60 transition-colors block"
                          >
                            {ev.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Event Focus Drawer / Card */}
            <div className="lg:col-span-4">
              {selectedEvent ? (
                <div className="bg-[#0b0f19] p-5 rounded-3xl border border-white/10 sticky top-20 shadow-2xl space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span
                      className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border ${getEventBadgeColor(
                        selectedEvent.eventType
                      )}`}
                    >
                      {selectedEvent.eventType.replace('-', ' ').toUpperCase()}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">90 mins</span>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">
                    {selectedEvent.title}
                  </h3>

                  <div className="space-y-2 text-xs text-slate-300 bg-[#070a12] p-3.5 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-emerald-400" />
                      <span className="font-bold text-white">{formatEventDate(selectedEvent.startTime)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-400" />
                      <span>{formatEventTime(selectedEvent.startTime)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-cyan-400" />
                      <span>{selectedEvent.attendeesCount} Registered Learners</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {selectedEvent.description}
                  </p>

                  <div className="pt-2 border-t border-white/10 flex items-center gap-3">
                    <img
                      src={selectedEvent.tutorAvatar}
                      alt={selectedEvent.tutorName}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-full object-cover border border-emerald-500/40"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">{selectedEvent.tutorName}</p>
                      <p className="text-[10px] text-slate-400">Lead Live Faculty Instructor</p>
                    </div>
                  </div>

                  {/* Sync Buttons */}
                  <div className="pt-2 space-y-2">
                    <button
                      onClick={() => toggleRegisterEvent(selectedEvent.id)}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                        selectedEvent.isRegistered
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      {selectedEvent.isRegistered ? 'Seat Confirmed ✓' : 'Register for Live Session'}
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={generateGoogleCalendarUrl(selectedEvent)}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#070a12] hover:bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Google Cal</span>
                      </a>

                      <button
                        onClick={() => downloadIcsFile(selectedEvent)}
                        className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#070a12] hover:bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold transition-colors"
                      >
                        <Download className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Teams / iCal</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-[#0b0f19] p-6 text-center rounded-3xl border border-white/10">
                  <p className="text-xs text-slate-400">Click on any date to inspect session topics.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
