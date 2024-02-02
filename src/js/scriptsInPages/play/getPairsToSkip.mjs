export {getPairsToSkip};

async function getPairsToSkip(title){
    const jsonRows = await fetch(
        "/play",
        {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({title})
        }
    );
    const rows = await jsonRows.json();
    return rows;
}