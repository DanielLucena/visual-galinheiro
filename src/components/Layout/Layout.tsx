import { ReactNode } from "react";
import ModalSideBar from "../SideBar/ModalSideBar";

export const Layout = (props: { children: ReactNode }) => {
  return (
    <>
      <ModalSideBar />

      <main>{props.children}</main>
    </>
  );
};
