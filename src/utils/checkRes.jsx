export default function checkResponse(res) {
    if (!res.ok) {
        throw new Error('Ошибка сети');
    }
    return res.json();
}