import Modal from "react-modal";
import { Schedule } from "../../types/calendar";
import { format } from "date-fns";
import { PrimaryBtn } from "../atoms/PrimaryBtn";

type PropsType = {
  selectedSchedule: Schedule | null;
  closeModal: () => void;
  deleteSchedule: (schedule: Schedule) => void;
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    width: "30%",
    transform: "translate(-50%, -50%)",
  },
};

export const ScheduleDetailsModal = ({
  selectedSchedule,
  closeModal,
  deleteSchedule,
}: PropsType) => {
  const handleDeleteSchedule = (selectedSchedule: Schedule) => {
    if (selectedSchedule) {
      deleteSchedule(selectedSchedule);
    }
    closeModal();
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
              onClick={() => handleDeleteSchedule(selectedSchedule)}
            >
              削除
            </PrimaryBtn>
            <PrimaryBtn size="sm" onClick={closeModal}>
              閉じる
            </PrimaryBtn>
          </div>
          <h3 className="text-center text-3xl text-lime-800 font-bold pb-5">
            {selectedSchedule.title}
          </h3>
          <p>{format(selectedSchedule.date, "yyyy年M月d日")}</p>
          <p>{selectedSchedule.description}</p>
        </div>
      )}
    </Modal>
  );
};
