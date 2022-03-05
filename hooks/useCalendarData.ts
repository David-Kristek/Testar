import React, { useState, useEffect, useMemo } from "react";

type monthData = { month: number; day: number }[][];
type dataType = {
  months: {
    name: string;
    nuberOfDays: number;
  }[];
  days: string[];
};
export const data = {
  months: [
    { name: "Leden" },
    { name: "Únor" },
    { name: "Březen" },
    { name: "Duben" },
    { name: "Květen" },
    { name: "Červen" },
    { name: "Červenec" },
    { name: "Srpen" },
    { name: "Září" },
    { name: "Říjen" },
    { name: "Listopad" },
    { name: "Prosinec" },
  ],
  days: ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek"],
};
export const getWeekDay = (nWeekDay: number) => {
  let res;
  if (nWeekDay === 0) res = 6;
  else res = nWeekDay - 1;
  return res;
};
export const weekDay = (date: DateData) => {
  const dateIns = new Date(date.year, date.month, date.day);
  // console.log(dateIns.getDay() - 1, );
  return {
    title: data.days[dateIns.getDay() - 1].slice(0, 2),
    num: dateIns.getDay() - 1,
  };
};
export const dateEquals = (a: DateData, b: DateData) => {
  return a.day === b.day && a.month === b.month && a.year === b.year;
};
export default function useCalendarData(year: number, month: number) {
  const [calendarData, setCalendarData] = useState<monthData>();

  const data: dataType = {
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
    days: ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek"],
  };
  // const month = monthN - 1;

  useEffect(() => {
    const date = new Date(year, month, 1);
    var FirstDayInMonth;
    var MonthData = [];
    var plusS = false;
    // dopočítání jaký den v týdnu je první v měsíci (protože v JS začínají dny od neděle)
    const nWeekDay = date.getDay();
    FirstDayInMonth = getWeekDay(nWeekDay);
    var dayCount = 1;
    //  for -> max 6 týdnů, v případě méně dá se uvnitř break
    for (let week = 0; week < 6; week++) {
      var weekData = [];
      // pokud je první den v měsíci sobota nebo neděle (5, 6) a je první týden (1 + 4)
      if (FirstDayInMonth >= dayCount + 4) {
        // počítání je posunuto
        dayCount += 7 - FirstDayInMonth;
        // začína se od pondělí
        FirstDayInMonth = 0;
      }
      // pokud jsou v dalším týdnu dny jenom z dalšího měsíce -> zruší se cyklus
      if (dayCount - FirstDayInMonth > data.months[month].nuberOfDays) break;
      // for od pondělí do pátku
      for (let weekDay = 1; weekDay <= 5; weekDay++) {
        // pokud je počítání dnů menší než začátek měsíce, vypisuje se minulý měsíc
        if (dayCount < FirstDayInMonth + 1) {
          var previousMonthNumber = month === 0 ? 11 : month - 1;
          var previousMonth = data.months[previousMonthNumber];

          weekData.push({
            month: previousMonthNumber,
            // postupně stoupá ( + dayCount) od   rozdílu max dnů minulého měsíce a začátku dnů tohoto měsíce
            day: previousMonth.nuberOfDays - FirstDayInMonth + dayCount,
          });
        }
        // pokud již dny přesahují max dnů měsíce -> začíná od 1 další měsíc
        else if (dayCount - FirstDayInMonth > data.months[month].nuberOfDays) {
          var nextMonthNumber = month === 11 ? 0 : month + 1;
          weekData.push({
            month: nextMonthNumber,
            day: dayCount - data.months[month].nuberOfDays - FirstDayInMonth,
          });
        } else
          weekData.push({
            month: month,
            day: dayCount - FirstDayInMonth,
          });
        dayCount++;
      }
      // weekend
      dayCount += 2;
      MonthData.push(weekData);
    }
    // console.log(MonthData);

    setCalendarData(MonthData);
  }, [year, month]);
  return { data, calendarData };
}
