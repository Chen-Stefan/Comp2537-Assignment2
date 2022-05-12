

function loadAllTimelines() {          // it's not a type POST, so in the ajax object do not need a "Data" property
    $.ajax({
        type: "GET",
        url: "http://localhost:5000/timeline/getAllEvents",
        success: (response) => {
            $("main").html(JSON.stringify(response));
        }
    })
}

function setup() {
    loadAllTimelines();
}



$(document).ready(setup);