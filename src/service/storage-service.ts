export const getLocalStorageItem = (key: string): string | null => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(key);
};

export const setLocalStorageItem = (key: string, value: string): void => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, value);
};
