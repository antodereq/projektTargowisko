document.addEventListener("DOMContentLoaded", function () {
    let mapaObject = document.getElementById("mapa");
    let mapContainer = document.querySelector(".map-container");
    let scale = 1, pointX = 0, pointY = 0, panning = false, start = { x: 0, y: 0 };

    mapaObject.addEventListener("load", function () {
        let svgDocument = mapaObject.contentDocument;
        let svgElement = svgDocument.querySelector("svg");

        function setTransform() {
            svgElement.setAttribute("transform", `translate(${pointX}, ${pointY}) scale(${scale})`);
        }

        // Przesuwanie mapy myszką
        svgElement.addEventListener("mousedown", function (e) {
            e.preventDefault();  // Zapobiega domyślnemu zachowaniu, np. zaznaczaniu tekstu

            // Pobieramy pozycję kontenera na stronie
            let rect = mapContainer.getBoundingClientRect();

            // Obliczamy punkt początkowy, uwzględniając pozycję kontenera
            start = { x: e.clientX - rect.left - pointX, y: e.clientY - rect.top - pointY };

            panning = true;  // Ustawiamy panning na true, aby rozpocząć przesuwanie
            svgElement.style.cursor = "grabbing";  // Zmiana kursora
        });

        window.addEventListener("mouseup", function () {
            panning = false;  // Wyłączamy panning
            svgElement.style.cursor = "grab";  // Przywracamy kursor
        });

        window.addEventListener("mousemove", function (e) {
            if (!panning) return;  // Jeśli panning nie jest aktywowany, nic nie rób // jeśli zakomentuję ten fragment kodu, to mapa będzie cały czas śledzić kursor

            // Pobieramy pozycję kontenera na stronie
            let rect = mapContainer.getBoundingClientRect();

            // Obliczamy nowe współrzędne przesunięcia, uwzględniając przesunięcie kontenera
            pointX = e.clientX - rect.left - start.x;
            pointY = e.clientY - rect.top - start.y;

            setTransform();  // Ustawiamy nową transformację dla mapy
        });

        // Blokowanie przewijania strony przy scrollowaniu nad mapą
        mapContainer.addEventListener("wheel", function (e) {
            e.preventDefault();
        }, { passive: false });

        // Zoomowanie mapy rolką myszy
        svgElement.addEventListener("wheel", function (e) {
            e.preventDefault();
            let zoomFactor = (e.deltaY > 0) ? 0.9 : 1.1;
            scale *= zoomFactor;
            setTransform();
        }, { passive: false });

        // Przycisk zoom-in
        document.getElementById("zoomIn").addEventListener("click", function () {
            scale *= 1.1;
            setTransform();
        });

        // Przycisk zoom-out
        document.getElementById("zoomOut").addEventListener("click", function () {
            scale *= 0.9;
            setTransform();
        });

        // Resetowanie mapy
        document.getElementById("reset").addEventListener("click", function () {
            scale = 1;
            pointX = 0;
            pointY = 0;
            setTransform();
        });

        // Przesuwanie mapy przyciskami
        document.getElementById("moveUp").addEventListener("click", function () {
            pointY -= 20;  // Przesuwamy mapę w górę
            setTransform();
        });

        document.getElementById("moveDown").addEventListener("click", function () {
            pointY += 20;  // Przesuwamy mapę w dół
            setTransform();
        });

        document.getElementById("moveLeft").addEventListener("click", function () {
            pointX -= 20;  // Przesuwamy mapę w lewo
            setTransform();
        });

        document.getElementById("moveRight").addEventListener("click", function () {
            pointX += 20;  // Przesuwamy mapę w prawo
            setTransform();
        });
    });
});