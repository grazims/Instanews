

$(".list").on("change", function(event) {
    console.log();
    let category = $(".list").val();
    const apiKey = "jYE146W4VGCWAYWjuJ90wMczAbRKlMMA";
    $.ajax({
        method: "GET",
        url: `https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${apiKey}`
    }).done(function(data){
        console.log(data.results);
        // $(".home").append();

    })
  });
