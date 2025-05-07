import { DateList, Schedule } from "../types/calendar";
import { isSameDay } from "date-fns";

type PropsType = {
  currentDate: Date;
  dateList: DateList;
  setDateList: (dateList: DateList) => void;
  allSchedules: Schedule[];
  setAllSchedules: (schedules: Schedule[]) => void;
};

export const useCalendar = ({
  dateList,
  setDateList,
  allSchedules,
  setAllSchedules,
}: PropsType) => {
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
    setAllSchedules([...allSchedules, schedule]);
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
    setAllSchedules(
      allSchedules.map((item) => (item.id === schedule.id ? schedule : item))
    );
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
    setAllSchedules(allSchedules.filter((item) => item.id !== schedule.id));
  };

  // 予定変更
  const changeSchedule = (
    originalSchedule: Schedule | null,
    selectedSchedule: Schedule
  ) => {
    if (originalSchedule) {
      setAllSchedules(
        allSchedules
          .filter((item) => item.id !== originalSchedule.id)
          .concat(selectedSchedule)
      );
    } else {
      addSchedule(selectedSchedule);
    }
  };

  return {
    dateList,
    addSchedule,
    editSchedule,
    deleteSchedule,
    changeSchedule,
  };
};
