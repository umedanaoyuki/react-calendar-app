import Modal from "react-modal";
import { Schedule } from "../../types/calendar";
import { format } from "date-fns";
import { PrimaryBtn } from "../atoms/PrimaryBtn";

type PropsType = {
  isEditting: boolean;
  handleIsEdittingChange: (isEditting: boolean) => void;
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
  isEditting,
  handleIsEdittingChange,
  selectedSchedule,
  closeModal,
  deleteSchedule,
}: PropsType) => {
  // const [isEditting, setIsEditting] = useState<boolean>(false);

  const handleDeleteSchedule = (selectedSchedule: Schedule) => {
    if (selectedSchedule) {
      deleteSchedule(selectedSchedule);
    }
    closeModal();
  };

  const handleEditSchedule = (isEditting: boolean) => {
    // console.log({ isEditting });

    // 保存ボタンの表示
    if (!isEditting) {
      handleIsEdittingChange(isEditting);
    } else {
      console.log("保存");
    }
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
