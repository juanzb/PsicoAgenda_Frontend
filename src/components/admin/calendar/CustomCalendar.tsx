import { Calendar, dateFnsLocalizer, type View, type ToolbarProps } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale";
import "./calendar-overrides.css";
import { useMemo, type ReactNode, useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, List } from "lucide-react";
import { Button } from "../../ui/button/Button";

const locales = {
  "es-ES": es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export interface ICalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  doctorId: string;
  patientName: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

interface CustomCalendarProps {
  events: ICalendarEvent[];
  onSelectEvent?: (event: ICalendarEvent) => void;
  onSelectSlot?: (slotInfo: { start: Date; end: Date }) => void;
  defaultView?: View;
}

const CustomToolbar = (toolbar: ToolbarProps<ICalendarEvent>) => {
  const goToBack = () => {
    toolbar.onNavigate("PREV");
  };

  const goToNext = () => {
    toolbar.onNavigate("NEXT");
  };

  const goToToday = () => {
    toolbar.onNavigate("TODAY");
  };

  const label = () => {
    const date = toolbar.date;
    const view = toolbar.view;

    if (view === "month") {
      return format(date, "MMMM yyyy", { locale: es });
    }
    if (view === "week") {
      const start = startOfWeek(date, { locale: es });
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      return `${format(start, "dd MMM", { locale: es })} - ${format(end, "dd MMM", { locale: es })}`;
    }
    if (view === "day") {
      return format(date, "EEEE, dd 'de' MMMM", { locale: es });
    }
    return format(date, "MMMM yyyy", { locale: es });
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-muted/20 p-3 rounded-xl border border-border/40">
      {/* Navegación de Fecha */}
      <div className="flex items-center gap-1.5">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={goToToday}
          className="rounded-md font-black text-[10px] uppercase h-8 px-3 bg-white"
        >
          Hoy
        </Button>
        <div className="flex items-center gap-1 ml-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={goToBack}
            className="w-8 h-8 p-0 rounded-md hover:bg-white"
          >
            <ChevronLeft size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={goToNext}
            className="w-8 h-8 p-0 rounded-md hover:bg-white"
          >
            <ChevronRight size={16} />
          </Button>
        </div>
        <h2 className="text-sm font-black text-foreground uppercase tracking-widest ml-4 flex items-center gap-2">
           <CalendarIcon size={16} className="text-primary" /> {label()}
        </h2>
      </div>

      {/* Selector de Vistas */}
      <div className="flex items-center gap-1 p-1 bg-white rounded-lg border border-border/40">
        {[
          { id: "month", label: "Mes" },
          { id: "week", label: "Semana" },
          { id: "day", label: "Día" },
          { id: "agenda", label: "Agenda" },
        ].map((view) => (
          <button
            key={view.id}
            onClick={() => toolbar.onView(view.id as View)}
            className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider transition-all ${
              toolbar.view === view.id 
                ? "bg-primary text-white shadow-md shadow-primary/20" 
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            {view.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export function CustomCalendar({
  events,
  onSelectEvent,
  onSelectSlot,
  defaultView = "month",
}: CustomCalendarProps): ReactNode {
  const [view, setView] = useState<View>(defaultView);
  const [date, setDate] = useState(new Date());

  const { messages } = useMemo(
    () => ({
      messages: {
        allDay: "Todo el día",
        previous: "Anterior",
        next: "Siguiente",
        today: "Hoy",
        month: "Mes",
        week: "Semana",
        day: "Día",
        agenda: "Agenda",
        date: "Fecha",
        time: "Hora",
        event: "Evento",
        noEventsInRange: "No hay citas en este rango",
        showMore: (total: number) => `+ Ver más (${total})`,
      },
    }),
    [],
  );

  const eventStyleGetter = (event: ICalendarEvent) => {
    let backgroundColor = "var(--color-primary)"; 
    if (event.status === "cancelled") backgroundColor = "var(--color-destructive)";
    if (event.status === "pending") backgroundColor = "#f59e0b"; // Amber

    return {
      className: "rounded-md border-none shadow-sm",
      style: {
        backgroundColor,
      },
    };
  };

  return (
    <div className="h-full min-h-[520px] animate-in fade-in duration-500 flex flex-col">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%", flex: 1 }}
        messages={messages}
        culture="es-ES"
        selectable={!!onSelectSlot}
        onSelectSlot={onSelectSlot}
        onSelectEvent={(e: object) => onSelectEvent?.(e as ICalendarEvent)}
        eventPropGetter={eventStyleGetter}
        view={view}
        onView={(v) => setView(v)}
        date={date}
        onNavigate={(d) => setDate(d)}
        components={{
          toolbar: CustomToolbar,
        }}
        views={["month", "week", "day", "agenda"]}
      />
    </div>
  );
}
