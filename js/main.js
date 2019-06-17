$('select').selectric();
$('.loading-image').hide();
$(".list").on("change", function(event) {
    console.log();
    $('.loading-image').show();
    let category = $(".list").val();
    const apiKey = "jYE146W4VGCWAYWjuJ90wMczAbRKlMMA";
    $.ajax({
        method: "GET",
        url: `https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${apiKey}`
    }).done(function(data){
        $('.container, .logo img').addClass('done');       
        $(".image-grid").empty();
        $('.loading-image').hide();
         let count = 0;
         data.results.forEach(element => {
             if (count < 12 && element.multimedia.length >= 5 ) {
                count = count + 1;                 
                $(".image-grid").append(`<li><a href="${element.url}"><div class="image-style" style="background-image: url('${element.multimedia[4].url}');"><p>${element.title}</p></div></a></li>`);
             }
         });
    })
  });
