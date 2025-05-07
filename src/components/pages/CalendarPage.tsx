import {
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  getMonth,
  isSameDay,
  startOfMonth,
} from "date-fns";
import { CalendarHeader } from "../organisms/CalendarHeader";
import { CalenderBody } from "../organisms/CalenderBody";
import { useCalendar } from "../../hooks/useCalendar";
import { useEffect, useState } from "react";
import { CalendarNav } from "../organisms/CalendarNav";
import { DateList, Schedule } from "../../types/calendar";
import { getScheduleList } from "../../api/calendar";

export const CalendarPage = ({ newDate }: { newDate: Date }) => {
  console.log("CalendarPage");
  const [currentDate, setCurrentDate] = useState<Date>(newDate);

  const [allSchedules, setAllSchedules] = useState<Schedule[]>(() =>
    getScheduleList()
  );
  const [dateList, setDateList] = useState<DateList>([]);
  console.log({ dateList });
  const { addSchedule, deleteSchedule, changeSchedule } = useCalendar({
    currentDate: currentDate,
    dateList,
    setDateList,
    allSchedules,
    setAllSchedules,
  });

  useEffect(() => {
    const monthOfSundayList = eachWeekOfInterval({
      start: startOfMonth(currentDate),
      end: endOfMonth(currentDate),
    });

    const newDateList: DateList = monthOfSundayList.map((date) => {
      return eachDayOfInterval({
        start: date,
        end: endOfWeek(date),
      }).map((date) => ({
        date,
        schedules: allSchedules.filter((sch) => isSameDay(sch.date, date)),
      }));
    });

    setDateList(newDateList);
  }, [currentDate, allSchedules]);

  return (
    <>
      <h1 className=" font-bold text-3xl mb-5">{`${
        getMonth(currentDate) + 1
      }月`}</h1>
      <CalendarNav setCurrentDate={setCurrentDate} addSchedule={addSchedule} />
      <table className="w-[80%] border-collapse border-2 border-solid border-lime-800 table-fixed">
        <CalendarHeader />
        <CalenderBody
          currentDate={currentDate}
          dateList={dateList}
          setDateList={setDateList}
          deleteSchedule={deleteSchedule}
          changeSchedule={changeSchedule}
        />
      </table>
    </>
  );
};
