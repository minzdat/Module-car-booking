

export const setTab = (tab: string) => {
    return {
        type: 'SET_TAB',
        payload: tab,
    }
}

export const setStatus = (status: string) => {
    return {
        type: 'SET_STATUS',
        payload: status
    }
}

export const setUserInfo = (userInfo: any) => {
    return {
        type: 'SET_USER_INFO',
        payload: userInfo
    }
}