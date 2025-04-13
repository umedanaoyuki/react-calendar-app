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

    // 既存のスケジュールを更新
    newDateList[firstIndex][secondIndex].schedules = newDateList[firstIndex][
      secondIndex
    ].schedules.map((item) => (item.id === schedule.id ? schedule : item));

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

    setDateList(newDateList);
  };

  // 予定変更
  const changeSchedule = (
    originalSchedule: Schedule | null,
    selectedSchedule: Schedule
  ) => {
    if (originalSchedule) {
      deleteSchedule(originalSchedule);
    }
    addSchedule(selectedSchedule);
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

  return {
    dateList,
    setDateList,
    addSchedule,
    editSchedule,
    deleteSchedule,
    changeSchedule,
  };
};
