import { setTab, setStatus, setUserInfo } from "../Actions/requestAction";



interface UserInfo {
    Id: string | null,
    FullName: string | null,
    Email: string | null,
    AvatarPath: string | null,
    UserRoles: [],
}

type RequestState = {
    tab: string | null,
    status: string | null,
    userInfo: UserInfo,
}

type RequestAction = ReturnType<typeof setTab | typeof setStatus | typeof setUserInfo>;

const initState: RequestState = {
    tab: 'get-all',
    status: '',
    userInfo: {
        Id: "",
        FullName: "",
        Email: "",
        AvatarPath: "",
        UserRoles: [],
    },
}

export const requestReducer = (state = initState, action: RequestAction): RequestState => {
    switch (action.type) {
        case 'SET_TAB':
            return {
                ...state,
                tab: action.payload
            }
        case 'SET_STATUS':
            return {
                ...state,
                status: action.payload
            }
        case 'SET_USER_INFO':
            return {
                ...state,
                userInfo: action.payload
            }
        default:
            return state;
    }
}

