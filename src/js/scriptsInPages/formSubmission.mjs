export {setEventListener, setAppendOtherData};

let appendOtherData = null;

function setAppendOtherData(appendOtherDataPar){
    appendOtherData = appendOtherDataPar;
}

function setEventListener(url){
    const submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", eventHandler.bind({url, appendOtherData}));
}

async function eventHandler(){
    const article = document.getElementsByTagName("article")[0];
    const form = document.getElementsByTagName("form")[0];
    const formData = new FormData(form);

    if(appendOtherData !== null){
        appendOtherData(formData);
    }

    const responseText = await (
        fetch(this.url, {
            method: "POST",
            body: formData
        })
        .then(
            response => response.text()
        )
    );
    article.innerHTML = responseText;
}