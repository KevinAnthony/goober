const host = process.env.REACT_APP_SERVICE_URL

export function getContainerAll() {
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
