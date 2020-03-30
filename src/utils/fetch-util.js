export const verify = res => {
    if (!res.ok) {
        const contentType = res.headers.get('content-type')
        if (contentType?.indexOf('application/json') !== -1) {
            return res.json().then(
                json => {
                    return Promise.reject(new Error(res.statusText))
                },
                () => Promise.reject(new Error(res.statusText))
            )
        }
        return Promise.reject(new Error(res.statusText))
    }
    return Promise.resolve(res)
}

export const toJson = res => {
    return verify(res).then(res => res.json())
}

export const toCsv = res => {
    return verify(res).then(res => res.text()).then(rows => rows.split('\n').map(row => row.split(',')))
}
