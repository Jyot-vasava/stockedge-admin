export const APIURL = (import.meta.env.VITE_API_URL as string | undefined) ?? '';

export const getApiHealthUrl = (apiUrl = APIURL): string => {
    const base = (apiUrl ?? '').trim().replace(/\/$/, '');
    if (!base) return '/api/v1/health';

    const cleanBase = base.replace(/\/api(?:\/v\d+)?$/i, '');
    return `${cleanBase}/api/v1/health`;
};

export const fetchJson = async <T>(url: string, options?: RequestInit): Promise<T> => {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }
    return response.json() as Promise<T>;
};
