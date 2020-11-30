//Latest image to be requested
var request;
//Image currently being shown
var $current;
//Cache object
var cache = {};
//Container for image
var $frame = $('#photo-viewer');
//Container for (thumb)image
var $thumbs = $('.thumb');

//function to fade between images
//pass in new image as parameter
function crossfade($img) {
    //if there is current picture showing stop animation and fade it out
    if ($current) { 
        $current.stop().fadeOut('slow');
    }
    
    //set the css margins for the image
    $img.css({
        //negative margin for half of image's width
        marginLeft: -$img.width() / 2,
        //negative margin for half of image's height
        marginTop: -$img.height() / 2
    });
    
    //stop animation on new image and fade in
    $img.stop().fadeTo('slow', 1);
    
    //new image becomes current image
    $current = $img;
    
}

$(document).on('click', '.thumb', function (el) {
    var $img;
    var src = this.href;
    request = src;
             
    el.preventDefault();
    $thumbs.removeClass('active');
    $(this).addClass('active');

    if (cache.hasOwnProperty(src)) {
        if (cache[src].isLoading === false) {
            crossfade(cache[src].$img);
        }
    } else {
        $img = $('<img/>');
        cache[src] = {
            $img:$img,
            isLoading: true
        };
    
    $img.on('load', function() {
        $img.hide();
        
        $frame.removeClass('is-loading').append($img);
        cache[src].isLoading = false;
        
        if (request === src) {
            crossfade($img);
        }
    });
    
    $frame.addClass('is-loading');
    
    $img.attr({
        'src':src,
        'alt': this.title || ''
    });
}
});
             
$('.thumb').eq(0).click();



//MENU FILTER FUNCTION

const menuOption = document.getElementById('dropdown');
const bubbleTeaImages = document.getElementsByClassName('bubble-tea-image');
const optionAll = document.getElementById('option-all');
const optionFruity = document.getElementById('option-fruity');
const optionMilky = document.getElementById('option-milky');


menuOption.addEventListener('click', filterMenu);

optionAll.addEventListener('click', filterMenu);
optionFruity.addEventListener('click', filterMenu);
optionMilky.addEventListener('click', filterMenu);


function filterMenu() {
    for (var i = 0; i < bubbleTeaImages.length; i++) {
        if (menuOption.value == "all") {
            bubbleTeaImages[i].style.display = "block";
    }
        if (menuOption.value == "fruity") {
            if (bubbleTeaImages[i].classList.contains("fruity")) {
                bubbleTeaImages[i].style.display = "block";
                } else {
                bubbleTeaImages[i].style.display = "none";
                }
        };
        if (menuOption.value == "milky") {
            if (bubbleTeaImages[i].classList.contains("milky")) {
                bubbleTeaImages[i].style.display = "block";
                } else {
                bubbleTeaImages[i].style.display = "none";
                }
        };
    }
    
    }

//Mobile Menu -- Appear


const mobileNavIcon = document.getElementById('mobile-nav');
const navEl = document.getElementById('navigation');
const ulEl= document.getElementById('navigation-list');

ulEl.addEventListener('click', toggleNav);
mobileNavIcon.addEventListener('click', toggleNav);


function toggleNav() {
console.log(navEl.classList);
    if (navEl.classList == "hidden") {
        navEl.classList = "visible";
        ulEl.classList = "visible";
    } else {
        navEl.classList = "hidden";
        ulEl.classList = "hidden";
    }
console.log(navEl.classList);   
}

//Bubble-Tea Menu Clicker

const descriptionDiv = document.getElementById("bubble-tea-description");
const descriptionText = document.getElementById("description-text");
const closeDescription = document.getElementById("close-description");
const bubbleTeaIcons = document.getElementsByClassName("bubble-tea-image");


function teaListeners() {
    for (let i = 0; i < bubbleTeaIcons.length; i++) {
        bubbleTeaIcons[i].addEventListener('click', toggleTea);
    }
}

teaListeners();
closeDescription.addEventListener('click', toggleTea);

function toggleTea() {
    if (descriptionDiv.classList == "menu-hidden") {
        descriptionDiv.classList = "menu-visible";
    } else {
        descriptionDiv.classList = "menu-hidden";
        }   
}