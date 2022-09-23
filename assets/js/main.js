const hoursTableEl = $("#hours");

let currentTime = moment();

let currentDay = moment().format("Do MMM, YYYY");
$("#currentDay").text(currentDay);

let schedule = {
    row0: "",
    row1: "",
    row2: "",
    row3: "",
    row4: "",
    row5: "",
    row6: "",
    row7: "",
    row8: ""
}

if (!localStorage.getItem("schedule")){
    localStorage.setItem("schedule", JSON.stringify(schedule));
}else{
    schedule = JSON.parse(localStorage.getItem("schedule"));
}

let timer = setInterval(function(){
    for (let i = 0; i < 9; i ++){
        let tableRow = $(`#row${i}`);
        tableRow.removeClass("past");
        tableRow.removeClass("present");
        tableRow.removeClass("future");
        if (currentTime.hour() < (i + 9)){
            tableRow.addClass("future");
        }else if(currentTime.hour() === (i+9)){
            tableRow.addClass("present");
        }else{
            tableRow.addClass("past");
        }
    }
}, 1000);

for (let i = 0; i < 9; i++){
    let timeBlock = $("<tr>");
    let timeCol = $("<td>");
    let inputCol = $("<td>");
    let saveCol = $("<td>");
    let timeBlockTextArea= $("<textarea>");
    let saveButton = $("<button>");

    if (currentTime.hour() < (i + 9)){
        timeBlock.addClass("future");
    }else if(currentTime.hour() === (i+9)){
        timeBlock.addClass("present");
    }else{
        timeBlock.addClass("past");
    }

    saveButton.addClass("saveBtn fas fa-save");

    saveCol.append(saveButton);
    saveCol.addClass("col-1");

    timeBlockTextArea.val(schedule[`row${i}`]);
    inputCol.append(timeBlockTextArea);
    inputCol.addClass("col-10");

    timeCol.text(`${i + 9}h`);
    timeCol.addClass("hour col-1");

    timeBlock.append(timeCol);
    timeBlock.append(inputCol);
    timeBlock.append(saveCol);

    timeBlock.addClass("time-block row");
    timeBlock.prop("id", `row${i}`);
    hoursTableEl.append(timeBlock);
}

hoursTableEl.on("click", ".saveBtn", function(e){
    let saveRow = $(this).parent().parent().attr("id");
    let saveItem = $(this).parent().parent().children().eq(1).children().eq(0);
    let saveText = saveItem.val();
    schedule[saveRow] = saveText;
    localStorage.setItem("schedule", JSON.stringify(schedule));
});
