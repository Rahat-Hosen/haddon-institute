"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function EventCalendar() {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      timeZone="Australia/Brisbane"
      events={[
        {
          title: "Informational Evening - Theo 101S",
          start: "2023-11-20T18:45:00",
          end: "2023-11-20T20:00:00",
          url: "/event/informational-evening-theo-101s",
        },
        {
          title: "THEO 101S",
          start: "2023-12-04",
          end: "2024-01-29",
          url: "/course/theology-for-today-s-world",
        },
      ]}
    />
  );
}
