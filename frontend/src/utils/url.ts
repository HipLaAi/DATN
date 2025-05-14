export const URL = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  HOME: {
    HOME: '',
    BOARD: '/board',
    MESSAGE: '/message',
    FOLLOW: '/follow',
    VIDEO: '/video',
  },
  WORKSPACE: {
    ROUTER: {
      WORKSPACE: '/workspace/:idWorkspace',
      TABLE: 'table',
      SETTING: 'setting',
      COLLAB: {
        COLLAB: 'collab',
        MEMBER: 'member',
        GUEST: 'guest',
      },
    },

    BUILDER: {
      WORKSPACE: (idWorkspace: any) => `/workspace/${idWorkspace}`,
      TABLE: (idWorkspace: any) => `/workspace/${idWorkspace}/table`,
      SETTING: (idWorkspace: any) => `/workspace/${idWorkspace}/setting`,
      MEMBER: (idWorkspace: any) => `/workspace/${idWorkspace}/collab/member`,
      GUEST: (idWorkspace: any) => `/workspace/${idWorkspace}/collab/guest`,
    },
  },

  BOARD: {
    ROUTER: {
      BOARD: '/workspace/:idWorkspace/board/:id',
      LIST: '',
      TABLE: 'table',
      DASHBOARD: 'dashboard',
      CALENDER: 'calender',
      MINDMAP: 'mindmap',
      WHITEBOARD: 'whiteboard',
    },

    BUILDER: {
      LIST: (idWorkspace: any, id: any) => `/workspace/${idWorkspace}/board/${id}`,
      TABLE: (idWorkspace: any, id: any) => `/workspace/${idWorkspace}/board/${id}/table`,
      CALENDER: (idWorkspace: any, id: any) => `/workspace/${idWorkspace}/board/${id}/calender`,
      DASHBOARD: (idWorkspace: any, id: any) => `/workspace/${idWorkspace}/board/${id}/dashboard`,
      MINDMAP: (idWorkspace: any, id: any) => `/workspace/${idWorkspace}/board/${id}/mindmap`,
      WHITEBOARD: (idWorkspace: any, id: any) => `/workspace/${idWorkspace}/board/${id}/whiteboard`,

      // TABLE: (idWorkspace: any) => `/workspace/${idWorkspace}/table`,
      // SETTING: (idWorkspace: any) => `/workspace/${idWorkspace}/setting`,
      // MEMBER: (idWorkspace: any) => `/workspace/${idWorkspace}/collab/member`,
      // GUEST: (idWorkspace: any) => `/workspace/${idWorkspace}/collab/guest`,
    },
  },
};
