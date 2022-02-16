import env from "react-dotenv";

const host = env.APP_URL

export function getContainerAll() {
    console.log("getContainerAll", env)
    return window.fetch(`http://${host}/container/all`,
        {
            method: 'GET',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        })
        .then(r => {
            return r.json();
        })
}
