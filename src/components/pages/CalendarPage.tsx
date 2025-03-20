import { useRecoilValue } from "recoil";
import { loginUserState } from "../../store/loginUserState";

export const CalendarPage = () => {
  const loginUser = useRecoilValue(loginUserState);

  return (
    <div>
      <p>{loginUser.id}</p>
      <p>{loginUser.name}</p>
    </div>
  );
};
