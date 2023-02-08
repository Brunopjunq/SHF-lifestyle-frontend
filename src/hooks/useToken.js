export default function useToken() {
    const userInfos = JSON.parse(localStorage.getItem("shf_lifestyle"))

    if(!userInfos) {
        return "";
    }

    return userInfos.token;
}