function loadTypeTimelines() {
  // it's not a type POST, so in the ajax object do not need a "Data" property
  $.ajax({
    type: "GET",
    url: "http://localhost:5000/timeline/getAllEvents",
    success: (res) => {
      for (i = 0; i < res.length; i++) {
        let singleEvent = ` <p> Event Description - ${res[i].text} </p>
                <p> Event Time - ${res[i].time} </p>
                <p> Event Hits - ${res[i].hits} </p> 
                <input class="hide" type="button" value="Remove">
                <hr>`;
        if (res[i].text.includes("type")) {
          $("#filter-type").append(`${singleEvent}`);
        } else if (res[i].text.includes("region")) {
          $("#filter-region").append(`${singleEvent}`);
        } else {
          $("#search-name").append(`${singleEvent}`);
        }
      }
    },
  });
}

function hide_() {
  $(this).parent().remove();
}

function clearTimeline() {
  $("#container").empty();
}

function setup() {
  loadAllTypelines();
  $("body").on("click", ".hide", hide_);
  $("body").on("click", "#clear-btn", clearTimeline);
}

$(document).ready(setup);
