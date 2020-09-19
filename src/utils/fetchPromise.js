export default async function fetchAsync(path) {
    return new Promise((resolve, err) => {
        fetch(path).then((res) => resolve(res.json())).catch(err);
    })
}