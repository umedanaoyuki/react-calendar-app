import { FormEvent, useState } from "react";
import { NewSchedule, Schedule } from "../types/calendar";
import { format, parse } from "date-fns";

const INIT_SCHEDULE: NewSchedule = {
  title: "",
  date: format(new Date(), "yyyy-MM-dd"),
  description: "",
};

type PropsType = {
  closeModal: () => void;
  addSchedule: (schedule: Schedule) => void;
};

export const useCreateSchedule = ({ closeModal, addSchedule }: PropsType) => {
  const [newSchedule, setNewSchedule] = useState<NewSchedule>(INIT_SCHEDULE);

  const [errorMessage, setErrorMessage] = useState("");

  const changeNewSchedule = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewSchedule({
      ...newSchedule,
      [name]: value,
    });
  };

  const handleCreateSchedule = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { title, date, description } = newSchedule;

    if (title === "") {
      setErrorMessage("タイトルを入力してください");
      return;
    } else {
      setErrorMessage("");
    }

    const schedule: Schedule = {
      id: Math.floor(Math.random() * 10000),
      title,
      date: parse(date, "yyyy-MM-dd", new Date()),
      description: description,
    };
    addSchedule(schedule);
    setNewSchedule(INIT_SCHEDULE);
    closeModal();
  };

  return {
    newSchedule,
    errorMessage,
    changeNewSchedule,
    handleCreateSchedule,
  };
};
