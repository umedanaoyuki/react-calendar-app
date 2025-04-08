import { getDate } from "date-fns";
import { dateColor } from "../../libs/date";
import { DateList, Schedule } from "../../types/calendar";
import { ScheduleBtn } from "../atoms/ScheduleBtn";
import { useState } from "react";
import { ScheduleDetailsModal } from "./ScheduleDetailsModal";

type PropsType = {
  currentDate: Date;
  dateList: DateList;
  setDateList: (dateList: DateList) => void;
  deleteSchedule: (schedule: Schedule) => void;
  changeSchedule: (
    originalSchedule: Schedule | null,
    selectedSchedule: Schedule
  ) => void;
};

export const CalenderBody = ({
  currentDate,
  dateList,
  deleteSchedule,
  changeSchedule,
}: PropsType) => {
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );

  // 編集ボタンの表示について（初期は編集モードではない）
  const [isEditting, setIsEditting] = useState<boolean>(false);

  const closeModal = () => {
    setSelectedSchedule(null);
    setIsEditting(false);
  };

  const handleIsEdittingChange = (isEditting: boolean) => {
    setIsEditting(!isEditting);
  };

  return (
    <>
      <tbody>
        {dateList.map((oneWeek, index) => (
          <tr
            key={`week-${getDate(oneWeek[0].date)}-${index}`}
            className="mx-10"
          >
            {oneWeek.map((item, index) => (
              <td
                key={`day-${getDate(oneWeek[0].date)}-${index}`}
                className="bg-white h-[10vh] border-2 border-solid border-lime-800"
              >
                <span
                  className={`inline-block w-[20px] leading-[20px] text-center ${dateColor(
                    item.date,
                    currentDate
                  )}`}
                >
                  {getDate(item.date)}
                </span>
                <div className="flex flex-col items-center gap-1 pb-2">
                  {item.schedules.map((schedule) => (
                    <ScheduleBtn
                      key={schedule.id}
                      onClick={() => setSelectedSchedule(schedule)}
                    >
                      {schedule.title}
                    </ScheduleBtn>
                  ))}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <ScheduleDetailsModal
        selectedSchedule={selectedSchedule}
        closeModal={closeModal}
        deleteSchedule={deleteSchedule}
        isEditting={isEditting}
        setSelectedSchedule={setSelectedSchedule}
        handleIsEdittingChange={handleIsEdittingChange}
        changeSchedule={changeSchedule}
      />
    </>
  );
};
