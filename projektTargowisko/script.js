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

        function updateMapLimits() {
            let rect = mapContainer.getBoundingClientRect();
            let svgWidth = svgElement.getBBox().width * scale;
            let svgHeight = svgElement.getBBox().height * scale;

            // Ograniczenie ruchu w prawo (lewy brzeg mapy nie może przekroczyć prawej granicy kontenera)
            if (pointX > 0) {
                pointX = 0;
            }

            // Ograniczenie ruchu w lewo (prawy brzeg mapy nie może przekroczyć lewej granicy kontenera)
            if (pointX < rect.width - svgWidth) {
                pointX = rect.width - svgWidth;
            }

            // Ograniczenie ruchu w górę
            if (pointY > 0) {
                pointY = 0;
            }

            // Ograniczenie ruchu w dół
            if (pointY < rect.height - svgHeight) {
                pointY = rect.height - svgHeight;
            }
        }

        // Przesuwanie mapy zaczyna się tylko wtedy, gdy trzymasz lewy przycisk myszy
        svgElement.addEventListener("mousedown", function (e) {
            e.preventDefault();  // Zapobiega domyślnemu zachowaniu, np. zaznaczaniu tekstu

            // Pobieramy pozycję kontenera na stronie
            let rect = mapContainer.getBoundingClientRect();

            // Obliczamy punkt początkowy, uwzględniając pozycję kontenera
            start = { x: e.clientX - rect.left - pointX, y: e.clientY - rect.top - pointY };

            panning = true;  // Rozpoczynamy przesuwanie
            svgElement.style.cursor = "grabbing";  // Zmiana kursora
        });

        // Obsługa ruchu myszy podczas przesuwania, jeśli przycisk jest wciśnięty
        svgElement.addEventListener("mousemove", function (e) {
            if (!panning) return;  // Jeśli panning nie jest aktywowany, nic nie rób

            // Pobieramy pozycję kontenera na stronie
            let rect = mapContainer.getBoundingClientRect();

            // Obliczamy nowe współrzędne przesunięcia, uwzględniając przesunięcie kontenera
            pointX = e.clientX - rect.left - start.x;
            pointY = e.clientY - rect.top - start.y;

            // Aktualizujemy limity mapy
            updateMapLimits();
            setTransform();
        });

        // Kończenie przesuwania mapy, kiedy puszczamy przycisk myszy
        svgElement.addEventListener("mouseup", function () {
            if (panning) {
                panning = false;  // Wyłączamy panning
                svgElement.style.cursor = "grab";  // Przywracamy kursor
            }
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

            // Ograniczamy zoom, żeby mapa nie była za mała ani za duża
            if (scale < 0.1) scale = 0.1;
            if (scale > 5) scale = 5;

            setTransform();
        }, { passive: false });

        // Przycisk zoom-in
        document.getElementById("zoomIn").addEventListener("click", function () {
            scale *= 1.1;
            if (scale > 5) scale = 5;
            setTransform();
        });

        // Przycisk zoom-out
        document.getElementById("zoomOut").addEventListener("click", function () {
            scale *= 0.9;
            if (scale < 0.1) scale = 0.1;
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
            updateMapLimits();
            setTransform();
        });

        document.getElementById("moveDown").addEventListener("click", function () {
            pointY += 20;  // Przesuwamy mapę w dół
            updateMapLimits();
            setTransform();
        });

        document.getElementById("moveLeft").addEventListener("click", function () {
            pointX -= 20;  // Przesuwamy mapę w lewo
            updateMapLimits();
            setTransform();
        });

        document.getElementById("moveRight").addEventListener("click", function () {
            pointX += 20;  // Przesuwamy mapę w prawo
            updateMapLimits();
            setTransform();
        });
    });
});


// document.addEventListener("DOMContentLoaded", function () {
//     let mapaObject = document.getElementById("mapa");
//     let mapContainer = document.querySelector(".map-container");
//     let scale = 1, pointX = 0, pointY = 0, panning = false, start = { x: 0, y: 0 };

//     mapaObject.addEventListener("load", function () {
//         let svgDocument = mapaObject.contentDocument;
//         let svgElement = svgDocument.querySelector("svg");

//         function setTransform() {
//             svgElement.setAttribute("transform", `translate(${pointX}, ${pointY}) scale(${scale})`);
//         }

//         // Przesuwanie mapy zaczyna się tylko wtedy, gdy trzymasz lewy przycisk myszy
//         svgElement.addEventListener("mousedown", function (e) {
//             e.preventDefault();  // Zapobiega domyślnemu zachowaniu, np. zaznaczaniu tekstu

//             // Pobieramy pozycję kontenera na stronie
//             let rect = mapContainer.getBoundingClientRect();

//             // Obliczamy punkt początkowy, uwzględniając pozycję kontenera
//             start = { x: e.clientX - rect.left - pointX, y: e.clientY - rect.top - pointY };

//             panning = true;  // Rozpoczynamy przesuwanie
//             svgElement.style.cursor = "grabbing";  // Zmiana kursora
//         });

//         // Obsługa ruchu myszy podczas przesuwania, jeśli przycisk jest wciśnięty
//         svgElement.addEventListener("mousemove", function (e) {
//             if (!panning) return;  // Jeśli panning nie jest aktywowany, nic nie rób

//             // Pobieramy pozycję kontenera na stronie
//             let rect = mapContainer.getBoundingClientRect();

//             // Obliczamy nowe współrzędne przesunięcia, uwzględniając przesunięcie kontenera
//             pointX = e.clientX - rect.left - start.x;
//             pointY = e.clientY - rect.top - start.y;

//             setTransform();
//         });

//         // Kończenie przesuwania mapy, kiedy puszczamy przycisk myszy
//         svgElement.addEventListener("mouseup", function () {
//             if (panning) {
//                 panning = false;  // Wyłączamy panning
//                 svgElement.style.cursor = "grab";  // Przywracamy kursor
//             }
//         });

//         // Blokowanie przewijania strony przy scrollowaniu nad mapą
//         mapContainer.addEventListener("wheel", function (e) {
//             e.preventDefault();
//         }, { passive: false });

//         // Zoomowanie mapy rolką myszy
//         svgElement.addEventListener("wheel", function (e) {
//             e.preventDefault();
//             let zoomFactor = (e.deltaY > 0) ? 0.9 : 1.1;
//             scale *= zoomFactor;
//             setTransform();
//         }, { passive: false });

//         // Przycisk zoom-in
//         document.getElementById("zoomIn").addEventListener("click", function () {
//             scale *= 1.1;
//             setTransform();
//         });

//         // Przycisk zoom-out
//         document.getElementById("zoomOut").addEventListener("click", function () {
//             scale *= 0.9;
//             setTransform();
//         });

//         // Resetowanie mapy
//         document.getElementById("reset").addEventListener("click", function () {
//             scale = 1;
//             pointX = 0;
//             pointY = 0;
//             setTransform();
//         });

//         // Przesuwanie mapy przyciskami
//         document.getElementById("moveUp").addEventListener("click", function () {
//             pointY -= 20;  // Przesuwamy mapę w górę
//             setTransform();
//         });

//         document.getElementById("moveDown").addEventListener("click", function () {
//             pointY += 20;  // Przesuwamy mapę w dół
//             setTransform();
//         });

//         document.getElementById("moveLeft").addEventListener("click", function () {
//             pointX -= 20;  // Przesuwamy mapę w lewo
//             setTransform();
//         });

//         document.getElementById("moveRight").addEventListener("click", function () {
//             pointX += 20;  // Przesuwamy mapę w prawo
//             setTransform();
//         });
//     });
// });
