// go to top
let mybutton = document.getElementById("toTop");

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    var mybutton = document.getElementById("toTop");
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

//lightbox
function openModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    captionText.innerHTML = dots[slideIndex - 1].alt;
}

//search
function searchPosts() {
    var searchInput = document.getElementById("searchInput").value.toLowerCase();
    var articles = document.querySelectorAll(".arttool");
    for (var i = 0; i < articles.length; i++) {
        var title = articles[i].querySelector("h2").innerText.toLowerCase();
        if (title.includes(searchInput)) {
            articles[i].style.display = "block";
        } else {
            articles[i].style.display = "none";
        }
    }
}

function sortPosts(category) {
    var articles = document.querySelectorAll(".arttool");
    for (var i = 0; i < articles.length; i++) {
        var section = articles[i].closest("section");
        if (category === "all" || section.id === category) {
            articles[i].style.display = "block";
        } else {
            articles[i].style.display = "none";
        }
    }
}
