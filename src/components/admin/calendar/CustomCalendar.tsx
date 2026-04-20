import { Calendar, dateFnsLocalizer, type View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale";
import "./calendar-overrides.css";
import { useMemo, type ReactNode } from "react";

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
  defaultView?: View;
}

export function CustomCalendar({
  events,
  onSelectEvent,
  defaultView = "month",
}: CustomCalendarProps): ReactNode {
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
    let backgroundColor = "#148874"; // Primary emerald
    if (event.status === "cancelled") backgroundColor = "#ef4444"; // Destructive
    if (event.status === "pending") backgroundColor = "#f59e0b"; // Amber

    return {
      style: {
        backgroundColor,
      },
    };
  };

  return (
    <div className="h-full min-h-[600px] animate-in fade-in duration-500">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        messages={messages}
        culture="es-ES"
        onSelectEvent={(e) => onSelectEvent?.(e as ICalendarEvent)}
        eventPropGetter={eventStyleGetter}
        defaultView={defaultView}
        views={["month", "week", "day", "agenda"]}
      />
    </div>
  );
}
