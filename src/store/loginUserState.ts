import { atom } from "recoil";

type LoginUserType = {
  id: number;
  name: string;
};

export const loginUserState = atom<LoginUserType>({
  key: "loginUser",
  default: {
    id: 0,
    name: "",
  },
});
