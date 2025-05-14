import { createBrowserRouter } from "react-router-dom";
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
import TableWorkPage from "../page/Work/component/WorkPage/TableWorkPage";
import { CollaboratorWorkPage } from "../page/Work/component/WorkPage/CollaboratorWorkPage";
import SettingWorkPage from "../page/Work/component/WorkPage/SettingWorkPage";
import DashBoard from "../page/Board/BoardContent/DashBoard/DashBoard";
import FuzzyText from "../component/Reactbits/FuzzyText";
import Aurora from "../component/Reactbits/Aurora/Aurora";
import Board from "../page/Home/Board/Board";
import { Member } from "../page/Work/component/WorkPage/Collaborator/Member";
import { Guest } from "../page/Work/component/WorkPage/Collaborator/Guest";
import MindMap from "../page/Board/BoardContent/MindMap/MindMap";
import Whiteboard from "../page/Board/BoardContent/WhiteBoard/WhiteBoard";
import VideoCallComponent from "../component/VideoCall/VideoCallComponent ";
import Main from "../page/Home/Main/Main";
import ChatComponent from "../page/Home/Message/Message";

const route = createBrowserRouter([
  {
    element: <BoardLayout />,
    children: [
      {
        path: URL.HOME.BOARD,
        element: <Board />
      },
      {
        path: "/",
        element: <Main />
      },
      {
        path: "videocall",
        element: <VideoCallComponent />
      },
      {
        path: "message",
        element: <ChatComponent />
      },
      {
        path: URL.WORKSPACE.ROUTER.WORKSPACE,
        element: <Work />,
        children: [
          {
            path: URL.WORKSPACE.ROUTER.TABLE,
            element: <TableWorkPage />
          },
          {
            path: URL.WORKSPACE.ROUTER.COLLAB.COLLAB,
            element: <CollaboratorWorkPage />,
            children: [
              {
                path: URL.WORKSPACE.ROUTER.COLLAB.MEMBER,
                element: <Member />
              },
              {
                path: URL.WORKSPACE.ROUTER.COLLAB.GUEST,
                element: <Guest />
              },
            ]
          },
          {
            path: URL.WORKSPACE.ROUTER.SETTING,
            element: <SettingWorkPage />
          }
        ]
      },
      {
        path: URL.BOARD.ROUTER.BOARD,
        element: <BoardDetials />,
        children: [
          {
            path: URL.BOARD.ROUTER.LIST,
            element: <BoardContent />,
          },
          {
            path: URL.BOARD.ROUTER.CALENDER,
            element: <Schedule />
          },
          {
            path: URL.BOARD.ROUTER.TABLE,
            element: <Table />
          },
          {
            path: URL.BOARD.ROUTER.DASHBOARD,
            element: <DashBoard />
          },
          {
            path: URL.BOARD.ROUTER.MINDMAP,
            element: <MindMap />
          },
          {
            path: URL.BOARD.ROUTER.WHITEBOARD,
            element: <Whiteboard />
          }
        ]
      }
    ]
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: URL.AUTH.LOGIN,
        element: <Login />
      },
      {
        path: URL.AUTH.REGISTER,
        element: <Register />
      }
    ]
  },
  {
    path: "*",
    element:
      <>
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
            textAlign: "center",
            gap: "1rem",
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1
          }}>
            <Aurora colorStops={["#008DFF", "#7CFF67", "#008DFF"]} blend={0.5} amplitude={0.5} speed={1} />
          </div>
          <FuzzyText
            fontSize={"clamp(2rem, 8vw, 10rem)"}
            color={"black"}
            baseIntensity={0.1}
            hoverIntensity={0.2}
            enableHover={true}
          >
            404
          </FuzzyText>
          <FuzzyText
            fontSize={"clamp(1.5rem, 5vw, 6rem)"}
            color={"black"}
            baseIntensity={0.1}
            hoverIntensity={0.2}
            enableHover={true}
          >
            Not Found
          </FuzzyText>
        </div>
      </>
  },
]);

export default route;