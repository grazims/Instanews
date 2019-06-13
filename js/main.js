

$(".list").on("change", function(event) {
    console.log();
    let category = $(".list").val();
    const apiKey = "jYE146W4VGCWAYWjuJ90wMczAbRKlMMA";
    $.ajax({
        method: "GET",
        url: `https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${apiKey}`
    }).done(function(data){
        $(".image-grid").empty();
        //  console.log(data.results); 
         // data.results[].url,
         // data.results[].title
         // data.results[].multimedia[4].url
         let count = 0;
         data.results.every((element, index) => {
            console.log(index);
            //  console.log(element.url);
            //  console.log(element.title);
             console.log(element.multimedia);
             if (index < 12 && element.multimedia.length >= 5 ) {
                 $(".image-grid").append(`<li><a href="${element.url}"><div class="image-style" style="background-image: url('${element.multimedia[4].url}');"><p>${element.title}</p></div></a></li>`);
                 //count = count + 1;
                 return true;           
             }

             if (index >= 12) {
                return false;
             }
         });

    })
  });

//   const array = ["one", "two", "three"]
//   array.forEach(function (item, index) {
//     console.log(item, index);
//   });