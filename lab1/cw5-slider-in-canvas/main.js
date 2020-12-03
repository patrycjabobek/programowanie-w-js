document.addEventListener("DOMContentLoaded", slider);
var canvas;
var ctx;

var slide = {
    width: 1200,
    height: 675,
    speed: 4000,
};
var imgStartTop = 0;
var imgStartLeft = 0;
var sliderImages = new Array();

function slider() {
    // pobranie uchwytu do elem. canvas
    canvas = document.getElementById('plotno');

    // pobranie 'kontekstu' 2d za pomocą którego będziemy rysować
    if (!canvas.getContext) {
        throw new Error('Brak f. canvas.getContext');
    }
    ctx = canvas.getContext('2d');
  
    // ładowanie zdjęć
    for (var i = 1; i <= 5; i++) {
        sliderImages[i] = new Image();
        sliderImages[i].addEventListener("load", function () {       
            //ctx.drawImage(this, imgStartLeft, imgStartTop, slide.width, slide.height);
            imgStartLeft += 300;
        });
        sliderImages[i].src = "./img/m" + i + ".jpg";
    }

    // anim start
    anim();
}

var trX = 0;
var offsetX = 0;

function anim() {
    // mała zabawa z przesunięciem - slajdy zwalniają na końcu
    trX += (1-(trX/slide.width))*80+1;
    // czyszczenie obszaru rysowania
    ctx.clearRect(0, 0, slide.width, slide.height);

    // przerysowanie zdjęć w pozycji (-offsetX-trX+i*slide.width, 0)
    for (var i in sliderImages) {
        ctx.drawImage(sliderImages[i], -offsetX-trX+i*slide.width, 0, slide.width, slide.height);
    }
    
    // w czasie animacji zdjęć
    if (trX < slide.width) {
        // jeśli koniec animacji - zrób anim wstecz
        if (offsetX >= slide.width * (sliderImages.length - 1)) {
            animReverse();
        } else {
            requestAnimationFrame(anim);
        }
    // czekaj 2s i animuj ponownie
    } else { 
        setTimeout(anim, 2000);
        offsetX += slide.width;
        trX = 0;
    }
}

// funkcja animuje zdjęcia "wstecz" - w prawo do początkowej pozycji
function animReverse() {
    trX += 80;
    ctx.clearRect(0, 0, slide.width, slide.height);
    for (var i in sliderImages) {
        ctx.drawImage(sliderImages[i], -offsetX + trX + i * slide.width, 0, slide.width, slide.height);
    }
    if (trX+slide.width < offsetX)
        requestAnimationFrame(animReverse);
    else {
        setTimeout(anim, 2000);
        offsetX = slide.width;
        trX = 0;
    }
}

// -----------------

