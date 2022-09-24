const hoursTableEl = $("#hours");

let currentTime = moment();

let currentDay = moment().format("dddd, MMMM Do");
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
} // Store the various tasks throughout the day, to be later store in local storage

if (!localStorage.getItem("schedule")){ // If there is no current schedule in local memory, save the empty schedule
    localStorage.setItem("schedule", JSON.stringify(schedule));
}else{
    schedule = JSON.parse(localStorage.getItem("schedule")); // Get the current schedule
}

let timer = setInterval(function(){ // Update every 10 seconds to see if the hour has changed and if any of the table row's colours need to be updated
    currentTime = moment();
    for (let i = 0; i < 9; i ++){ // Loop through the rows
        let tableRow = $(`#row${i}`);
        // Remove the current styling
        tableRow.removeClass("past");
        tableRow.removeClass("present");
        tableRow.removeClass("future");
        // Add the new styling
        if (currentTime.hour() < (i + 9)){
            tableRow.addClass("future");
        }else if(currentTime.hour() === (i+9)){
            tableRow.addClass("present");
        }else{
            tableRow.addClass("past");
        }
    }
}, 10000);

for (let i = 0; i < 9; i++){ // Loop through the rows for the first time
    let timeBlock = $("<tr>"); // Table row
    let timeCol = $("<td>"); // Time portion of the table row
    let inputCol = $("<td>"); // Input portion of the table row
    let saveCol = $("<td>"); // Save portion of the table row
    let timeBlockTextArea= $("<textarea>"); // Text entry area
    let saveButton = $("<button>"); // Save button

    if (currentTime.hour() < (i + 9)){
        timeBlock.addClass("future");
    }else if(currentTime.hour() === (i+9)){
        timeBlock.addClass("present");
    }else{
        timeBlock.addClass("past");
    }

    saveButton.addClass("saveBtn fas fa-save"); // Add the save button icon

    saveCol.append(saveButton); // Add the button to the section
    saveCol.addClass("col-1"); // Add styling

    timeBlockTextArea.val(schedule[`row${i}`]); // Add the saved schedule information into text area
    inputCol.append(timeBlockTextArea);
    inputCol.addClass("col-10"); // Add styling

    timeCol.text(`${i + 9}h`);
    timeCol.addClass("hour col-1"); // Add styling

    // Add the different aspects of the row to the row
    timeBlock.append(timeCol);
    timeBlock.append(inputCol);
    timeBlock.append(saveCol);

    timeBlock.addClass("time-block row"); // Add styling
    timeBlock.prop("id", `row${i}`);
    hoursTableEl.append(timeBlock); // Add the row to the planner
}

hoursTableEl.on("click", ".saveBtn", function(){ // On click of the save button
    let saveRow = $(this).parent().parent().attr("id"); // The ID of the row that has been saved
    let saveItem = $(this).parent().parent().children().eq(1).children().eq(0); // The textarea
    let saveText = saveItem.val(); // The value of the textarea
    schedule[saveRow] = saveText; // Update the schedule
    localStorage.setItem("schedule", JSON.stringify(schedule)); // Save the new schedule to local storage
});
