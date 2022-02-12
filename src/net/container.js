export function getContainerAll() {
    return window.fetch("http://127.0.0.1:8080/container/all",
        {
            method: 'GET',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        })
        .then(r => {
            return r.json();
        })
}
