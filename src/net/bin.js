const host = process.env.REACT_APP_API_URL

export function createBin(bin) {
    console.log(JSON.stringify(bin))
    return window.fetch(`http://${host}/bin`,
        {
            method: 'POST',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bin)
        })
        .then(r => {
            return r.json();
        })
}

export function putBin(bin) {
    const json = JSON.stringify(bin)
    return window.fetch(`http://${host}/bin/${bin.id}`,
        {
            method: 'PUT',
            redirect: 'follow',
            mode: 'cors',
            referrerPolicy: 'no-referrer',
            credentials: 'same-origin',
            headers: {
                'Host': window.location.origin,
                'Origin': window.location.origin,
                'Content-Type': 'application/json',
                'Content-Length': json.length.toString()
            },
            body: json
        }).then(r => {
        return r.json();
    })
}

export function deleteBin(bin) {
    return window.fetch(`http://${host}/bin/${bin.id}`,
        {
            method: 'DELETE',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        })
        .then(r => {
            return r.json();
        })
}

export function getBin(bin) {
    return window.fetch(`http://${host}/bin/${bin.id}`,
        {
            method: 'GET',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        })
        .then(r => {
            return r.json();
        })
}
