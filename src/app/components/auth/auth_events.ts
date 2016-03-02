export interface IAuthEvents {
    loginSuccess: string;
    loginFailed: string;
    logoutSuccess: string;
}

export const AUTH_EVENTS: IAuthEvents = {
    loginSuccess: "auth-login-success",
    loginFailed: "auth-login-failed",
    logoutSuccess: "auth-logout-success"
};