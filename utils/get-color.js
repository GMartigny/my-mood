const apiUrl = "https://api.noopschallenge.com/hexbot";

// Kind of overkill to call an API endpoint, but why not
export default async () => {
    const response = await fetch(apiUrl);
    if (response.ok) {
        const json = await response.json();
        return json.colors[0].value;
    }

    return null;
};
