import Modal from "react-modal";
import { Schedule } from "../../types/calendar";
import { format, parseISO } from "date-fns";
import { PrimaryBtn } from "../atoms/PrimaryBtn";
import { ChangeEvent } from "react";

type PropsType = {
  isEditting: boolean;
  handleIsEdittingChange: (isEditting: boolean) => void;
  selectedSchedule: Schedule | null;
  closeModal: () => void;
  deleteSchedule: (schedule: Schedule) => void;
  setSelectedSchedule: (schedule: Schedule | null) => void;
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    width: "30%",
    height: "50%",
    overflow: "hidden",
    transform: "translate(-50%, -50%)",
  },
};

export const ScheduleDetailsModal = ({
  isEditting,
  handleIsEdittingChange,
  selectedSchedule,
  closeModal,
  deleteSchedule,
  setSelectedSchedule,
}: PropsType) => {
  const handleDeleteSchedule = (selectedSchedule: Schedule) => {
    if (selectedSchedule) {
      deleteSchedule(selectedSchedule);
    }
    closeModal();
  };

  const handleEditSchedule = (isEditting: boolean) => {
    console.log("通過1");
    // 保存ボタンの表示
    if (!isEditting) {
      console.log("通過2");
      handleIsEdittingChange(isEditting);
    } else {
      console.log("保存");
      handleIsEdittingChange(isEditting);
    }
  };

  const onChangeSchedule = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    selectedSchedule: Schedule,
    field: keyof Schedule
  ) => {
    const value =
      field === "date" ? parseISO(event.target.value) : event.target.value;
    setSelectedSchedule({
      ...selectedSchedule,
      [field]: value,
    });
  };

  return (
    <Modal
      isOpen={!!selectedSchedule}
      style={customStyles}
      onRequestClose={closeModal}
      appElement={document.getElementById("root") as HTMLElement}
    >
      {selectedSchedule && (
        <div className="flex flex-col gap-8">
          <div className="flex justify-center gap-4">
            <PrimaryBtn
              size="sm"
              onClick={() => handleEditSchedule(isEditting)}
            >
              {isEditting ? "保存" : "編集"}
            </PrimaryBtn>
            <PrimaryBtn
              size="sm"
              onClick={() => handleDeleteSchedule(selectedSchedule)}
            >
              削除
            </PrimaryBtn>
            <PrimaryBtn size="sm" onClick={closeModal}>
              閉じる
            </PrimaryBtn>
          </div>
          <input
            type="text"
            data-edit={isEditting}
            className="text-center text-3xl text-lime-800 font-bold data-[edit=true]:border-green-600 data-[edit=true]:border data-[edit=true]:rounded-md"
            value={selectedSchedule.title}
            disabled={!isEditting}
            onChange={(e) => onChangeSchedule(e, selectedSchedule, "title")}
          />
          <input
            type="date"
            data-edit={isEditting}
            className="data-[edit=true]:border-green-600 data-[edit=true]:border data-[edit=true]:rounded-md"
            value={format(selectedSchedule.date, "yyyy-MM-dd")}
            disabled={!isEditting}
            onChange={(e) => onChangeSchedule(e, selectedSchedule, "date")}
          />
          <textarea
            data-edit={isEditting}
            className="h-48 w-full overflow-auto data-[edit=true]:border-green-600 data-[edit=true]:border data-[edit=true]:rounded-md"
            value={selectedSchedule.description}
            disabled={!isEditting}
            onChange={(e) =>
              onChangeSchedule(e, selectedSchedule, "description")
            }
          />
        </div>
      )}
    </Modal>
  );
};
