import {
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  getDate,
  getMonth,
  isSameMonth,
  isToday,
  startOfMonth,
} from "date-fns";
import { DAYS_LIST } from "../../constants/calendar";
import { useEffect, useState } from "react";
import { CalendarHeader } from "../organisms/CalendarHeader";
import { CalenderBody } from "../organisms/CalenderBody";

export const CalendarPage = () => {
  const today = new Date();
  const [dateList, setDateList] = useState<Date[][]>([]);

  const dateColor = (targetDate: Date, currentDate: Date): string => {
    console.log({ targetDate, currentDate });

    if (isToday(targetDate)) return "bg-lime-800 text-white rounded-full";
    return isSameMonth(targetDate, currentDate)
      ? "text-black"
      : "text-gray-300";
  };

  useEffect(() => {
    const monthOfSundayList = eachWeekOfInterval({
      start: startOfMonth(today),
      end: endOfMonth(today),
    });

    const newDateList: Date[][] = monthOfSundayList.map((date) => {
      return eachDayOfInterval({
        start: date,
        end: endOfWeek(date),
      });
    });
    setDateList(newDateList);
  }, []);

  return (
    <>
      <h1 className=" font-bold text-3xl mb-5">{`${getMonth(today) + 1}月`}</h1>
      <table className="w-[80%] border-collapse border-2 border-solid border-lime-800 table-fixed">
        <CalendarHeader />
        <CalenderBody currentDate={today} dateList={dateList} />
      </table>
    </>
  );
};
