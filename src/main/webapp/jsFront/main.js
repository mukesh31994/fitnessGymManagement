$(document).ready(function () {


    $('.carousel').carousel({
        interval: 6000
    });

    // Owl carousel
    $("#owl-example").owlCarousel(
            {
                items: 1,
                autoPlay: true,
                pagination: false,
            });

    $("#team").owlCarousel({

        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        singleItem: true,
        paginationSpeed: 400,
        autoHeight: true,
        itemsCustom: [
            [0, 1],
            [450, 2],
            [600, 2],
            [700, 2],
            [1000, 4],
            [1200, 4],
            [1400, 4],
            [1600, 4]
        ],
    });

    // $("#clients").owlCarousel({

    //     navigation : false, // Show next and prev buttons
    //     slideSpeed : 300,
    //     paginationSpeed : 400,
    //     autoHeight : true,
    //     itemsCustom : [
    //        [0, 1],
    //        [450, 2],
    //        [600, 2],
    //        [700, 2],
    //        [1000, 4],
    //        [1200, 5],
    //        [1400, 5],
    //        [1600, 5]
    //      ],
    // });

    // $("#testimonial").owlCarousel({
    //   navigation : false, // Show next and prev buttons
    //   slideSpeed : 300,
    //   paginationSpeed : 400,
    //   singleItem:true
    //   });




});

