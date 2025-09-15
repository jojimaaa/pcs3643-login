import ILoginFields from "./ILogInFields";
import ILoginResponseBody from "./ILoginResponseBody";

export default interface ITryLoginResponse {
    success : boolean,
    data : ILoginResponseBody | undefined
}