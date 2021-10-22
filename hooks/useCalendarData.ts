import React, { useState, useEffect } from "react";

type calendarData = {};
interface Props {
  year: number;
  month: number;
}

export default function useCalendarData({ year, month }: Props) {
  const [calendarData, setCalendarData] = useState<calendarData>();
  const d = new Date();
  const data = {
    months: [
      { name: "Leden", nuberOfDays: 31 },
      { name: "Únor", nuberOfDays: year % 4 === 0 ? 29 : 28 },
      { name: "Březen", nuberOfDays: 31 },
      { name: "Duben", nuberOfDays: 30 },
      { name: "Květen", nuberOfDays: 31 },
      { name: "Červen", nuberOfDays: 30 },
      { name: "Červenec", nuberOfDays: 31 },
      { name: "Srpen", nuberOfDays: 31 },
      { name: "Září", nuberOfDays: 30 },
      { name: "Říjen", nuberOfDays: 31 },
      { name: "Listopad", nuberOfDays: 30 },
      { name: "Prosinec", nuberOfDays: 31 },
    ],
    days: [
      "Pondělí",
      "Úterý",
      "Středa",
      "Čtvrtek",
      "Pátek",
      "Sobota",
      "Neděle",
    ],
  };
  d.getDate()
}
