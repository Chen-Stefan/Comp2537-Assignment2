

function loadAllTimelines() {          // it's not a type POST, so in the ajax object do not need a "Data" property
    $.ajax({
        type: "GET",
        url: "http://localhost:5000/timeline/getAllEvents",
        success: (res) => {
            for (i = 0; i < res.length; i++) {
                $("main").append(`
                    <p> Event Description - ${res[i].text} </p>
                    <p> Event Time - ${res[i].time} </p>
                    <p> Event Hits - ${res[i].hits} </p>
                `)
            }
        }
    })
}

function setup() {
    loadAllTimelines();
}



$(document).ready(setup);