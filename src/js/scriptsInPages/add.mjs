import {setAppendOtherData, setEventListener} from "./formSubmission.mjs";

function appendOtherData(formData){
    formData.append("numOfPairs", numOfPairs);
}

setAppendOtherData(appendOtherData);
setEventListener("/add");


/*Handles the user wanting to add form elements so they can
add another part of the video that should be skipped.*/

let numOfPairs = 1;
let addPartButton = document.getElementById("addPart");
let secondsInput = document.getElementById("groupOfSecondsInputs");

addPartButton.addEventListener("click", function(){
    numOfPairs++;
    secondsInput.insertAdjacentHTML(
        "beforeend",
        `
            <div class="secondsInput">
                <input type="number" name="start${numOfPairs}" min="0" placeholder="start second" class="startInput"/>
                <input type="number" name="end${numOfPairs}" min="0" placeholder="end second" class="endInput"/>
            </div>
        `
    );
});