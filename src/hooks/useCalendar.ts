import { useEffect, useState } from "react";
import { DateList, Schedule } from "../types/calendar";
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  isSameDay,
  startOfMonth,
} from "date-fns";
import { getScheduleList } from "../api/calendar";

type PropsType = {
  currentDate: Date;
};

export const useCalendar = ({ currentDate }: PropsType) => {
  const [dateList, setDateList] = useState<DateList>([]);

  const getDateListIndex = (
    currentDateList: DateList,
    schedule: Schedule
  ): number[] => {
    const firstIndex = currentDateList.findIndex((oneWeek) =>
      oneWeek.some((item) => isSameDay(item.date, schedule.date))
    );
    if (firstIndex === -1) return [-1, -1];
    const secondIndex = currentDateList[firstIndex].findIndex((item) =>
      isSameDay(item.date, schedule.date)
    );

    return [firstIndex, secondIndex];
  };

  const addSchedule = (schedule: Schedule) => {
    const newDateList = [...dateList];
    const firstIndex = newDateList.findIndex((oneWeek) =>
      oneWeek.some((item) => isSameDay(item.date, schedule.date))
    );
    if (firstIndex === -1) return;
    const secondIndex = newDateList[firstIndex].findIndex((item) =>
      isSameDay(item.date, schedule.date)
    );
    newDateList[firstIndex][secondIndex].schedules = [
      ...newDateList[firstIndex][secondIndex].schedules,
      schedule,
    ];
    setDateList(newDateList);
  };

  const editSchedule = (schedule: Schedule) => {
    const newDateList = [...dateList];

    const firstIndex = newDateList.findIndex((oneWeek) =>
      oneWeek.some((item) => isSameDay(item.date, schedule.date))
    );
    if (firstIndex === -1) return;
    const secondIndex = newDateList[firstIndex].findIndex((item) =>
      isSameDay(item.date, schedule.date)
    );
    newDateList[firstIndex][secondIndex].schedules = [
      ...newDateList[firstIndex][secondIndex].schedules,
      {
        id: schedule.id, // 既存のスケジュールのIDを使用
        date: schedule.date, // 既存のスケジュールの日付を使用
        title: schedule.title,
        description: schedule.description,
      },
    ];
    setDateList(newDateList);
  };

  // 予定削除
  const deleteSchedule = (schedule: Schedule) => {
    const newDateList = [...dateList];

    const firstIndex = newDateList.findIndex((oneWeek) =>
      oneWeek.some((item) => isSameDay(item.date, schedule.date))
    );
    if (firstIndex === -1) return;
    const secondIndex = newDateList[firstIndex].findIndex((item) =>
      isSameDay(item.date, schedule.date)
    );

    newDateList[firstIndex][secondIndex].schedules = newDateList[firstIndex][
      secondIndex
    ].schedules.filter((item) => item.id !== schedule.id);

    // newDateList[firstIndex][secondIndex].schedules = [

    console.log({ newDateList });

    console.log("削除");

    // setDateList();
  };

  useEffect(() => {
    const monthOfSundayList = eachWeekOfInterval({
      start: startOfMonth(currentDate),
      end: endOfMonth(currentDate),
    });

    const newDateList: DateList = monthOfSundayList.map((date) => {
      return eachDayOfInterval({
        start: date,
        end: endOfWeek(date),
      }).map((date) => ({ date, schedules: [] as Schedule[] }));
    });

    const scheduleList = getScheduleList();
    scheduleList.forEach((schedule) => {
      const [firstIndex, secondIndex] = getDateListIndex(newDateList, schedule);
      if (firstIndex === -1) return;

      newDateList[firstIndex][secondIndex].schedules = [
        ...newDateList[firstIndex][secondIndex].schedules,
        schedule,
      ];
    });

    setDateList(newDateList);
  }, [currentDate]);

  return { dateList, addSchedule, editSchedule, deleteSchedule };
};
