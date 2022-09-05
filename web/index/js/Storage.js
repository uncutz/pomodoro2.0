export default class LocalStorage
{
    /**
     *
     * @param key {string}
     */
    getItem(key) {
        return JSON.parse(window.localStorage.getItem(key));
    }

    /**
     *
     * @param key {string}
     * @param value {string}
     */
    setItem(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value))
    }
}