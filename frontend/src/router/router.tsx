import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout/HomeLayout";
import Board from "../page/Board";
import Home from "../page/Home/Home";
import BoardLayout from "../layout/BoardLayout/BoardLayout";
import Work from "../page/Work/Work";
import BoardDetials from "../page/Board/id";
import AuthLayout from "../layout/AuthLayout/AuthLayout";
import Login from "../page/Auth/Login/Login";
import BoardContent from "../page/Board/BoardContent/BoardContent";
import Register from "../page/Auth/Register/Register";
import Table from "../page/Board/BoardContent/Table/Table";
import { URL } from "../utils/url";
import Schedule from "../page/Board/BoardContent/Calender/Calender";
import TableWorkPage from "../page/Work/compoent/WorkPage/TableWorkPage";
import { MemberWorkPage } from "../page/Work/compoent/WorkPage/MemberWorkPage";
import SettingWorkPage from "../page/Work/compoent/WorkPage/SettingWorkPage";
import DashBoard from "../page/Board/BoardContent/DashBoard/DashBoard";

const route = createBrowserRouter([
  {
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "list-board",
        element: <Board />
      },
    ]
  },
  {
    element: <BoardLayout />,
    children: [
      {
        path: "workspace/:idWorkspace",
        element: <Work />,
        children: [
          {
            path: "",
            element: <TableWorkPage />
          },
          {
            path: "member",
            element: <MemberWorkPage />
          },
          {
            path: "guest",
            element: <MemberWorkPage />
          },
          {
            path: "setting",
            element: <SettingWorkPage />
          }
        ]
      },
      {
        path: "workspace/:idWorkspace" + URL.BOARD + ":id",
        element: <BoardDetials />,
        children: [
          {
            path: "",
            element: <BoardContent />,
          },
          {
            path: "calender",
            element: <Schedule />
          },
          {
            path: "table",
            element: <Table />
          },
          {
            path: "dashboard",
            element: <DashBoard />
          }
        ]
      }
    ]
  },
  {
    path: "*",
    element:
      <>
    
      </>
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        // element: <Login />
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      }
    ]
  }
]);

export default route;