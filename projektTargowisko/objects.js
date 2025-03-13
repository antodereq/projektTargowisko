document.addEventListener("DOMContentLoaded", function () {
    let mapaObject = document.getElementById("mapa");
    let mapContainer = document.querySelector(".map-container");

    mapaObject.addEventListener("load", function () {
        let svgDocument = mapaObject.contentDocument;
        let svgElement = svgDocument.querySelector("svg");
        
        // Dodawanie figur do SVG
        let path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path1.setAttribute("d", "m226.84,201.84l-61.66,12.47c0,0 4.97,24.47 4.97,24.47c0,0 61.38,-12.69 61.38,-12.69c0,0 -4.69,-24.25 -4.69,-24.25z");
        path1.setAttribute("id", "svg_2801");
        path1.setAttribute("fill", "rgba(255, 255, 0, 0)"); // Ustawiamy przezroczystość

        // Dodajemy event listener na hover (mouseenter i mouseleave)
        path1.addEventListener('mouseenter', () => {
            path1.setAttribute('fill', 'rgba(255, 255, 0, 0.5)'); // Zmieniamy kolor na żółty z półprzezroczystością
        });
        path1.addEventListener('mouseleave', () => {
            path1.setAttribute('fill', 'rgba(255, 255, 0, 0)'); // Powracamy do przezroczystości
        });

        let path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path2.setAttribute("d", "m245.22,197.72c0,0 -17.81,3.75 -17.84,3.72c-0.03,-0.03 5.09,24.41 5.06,24.38c-0.03,-0.03 18.09,-3.59 18.06,-3.63c-0.03,-0.03 -5.28,-24.47 -5.28,-24.47z");
        path2.setAttribute("id", "svg_2799");
        path2.setAttribute("fill", "rgba(255, 255, 0, 0)"); // Ustawiamy przezroczystość

        // Dodajemy event listener na hover (mouseenter i mouseleave)
        path2.addEventListener('mouseenter', () => {
            path2.setAttribute('fill', 'rgba(255, 255, 0, 0.5)'); // Zmieniamy kolor na żółty z półprzezroczystością
        });
        path2.addEventListener('mouseleave', () => {
            path2.setAttribute('fill', 'rgba(255, 255, 0, 0)'); // Powracamy do przezroczystości
        });

        let path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path3.setAttribute("d", "m264.22,193.34c0,0 -18.38,3.94 -18.41,3.91c-0.03,-0.03 5.34,24.72 5.31,24.69c-0.03,-0.03 17.84,-3.59 17.81,-3.63c-0.03,-0.03 -4.72,-24.97 -4.72,-24.97l0.01,0z");
        path3.setAttribute("id", "svg_2800");
        path3.setAttribute("fill", "rgba(255, 255, 0, 0)"); // Ustawiamy przezroczystość

        // Dodajemy event listener na hover (mouseenter i mouseleave)
        path3.addEventListener('mouseenter', () => {
            path3.setAttribute('fill', 'rgba(255, 255, 0, 0.5)'); // Zmieniamy kolor na żółty z półprzezroczystością
        });
        path3.addEventListener('mouseleave', () => {
            path3.setAttribute('fill', 'rgba(255, 255, 0, 0)'); // Powracamy do przezroczystości
        });

        let path4 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path4.setAttribute("d", "m299.41,186.66c0,0 -32.69,6.63 -32.72,6.59c-0.03,-0.03 4.66,24.47 4.63,24.44c-0.03,-0.03 32.97,-6.84 32.94,-6.88c-0.03,-0.03 -4.84,-24.16 -4.84,-24.16l-0.01,0.01z");
        path4.setAttribute("id", "svg_2802");
        path4.setAttribute("fill", "rgba(255, 255, 0, 0)"); // Ustawiamy przezroczystość

        // Dodajemy event listener na hover (mouseenter i mouseleave)
        path4.addEventListener('mouseenter', () => {
            path4.setAttribute('fill', 'rgba(255, 255, 0, 0.5)'); // Zmieniamy kolor na żółty z półprzezroczystością
        });
        path4.addEventListener('mouseleave', () => {
            path4.setAttribute('fill', 'rgba(255, 255, 0, 0)'); // Powracamy do przezroczystości
        });

        let path5 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path5.setAttribute("d", "m338.53,178.16l-36.78,7.22l4.25,27.31l37.75,-8.13l-5.22,-26.41l0,0.01z");
        path5.setAttribute("id", "svg_2803");
        path5.setAttribute("fill", "rgba(255, 255, 0, 0)"); // Ustawiamy przezroczystość

        // Dodajemy event listener na hover (mouseenter i mouseleave)
        path5.addEventListener('mouseenter', () => {
            path5.setAttribute('fill', 'rgba(255, 255, 0, 0.5)'); // Zmieniamy kolor na żółty z półprzezroczystością
        });
        path5.addEventListener('mouseleave', () => {
            path5.setAttribute('fill', 'rgba(255, 255, 0, 0)'); // Powracamy do przezroczystości
        });

        let path6 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path6.setAttribute("d", "m359.16,174.34c0,0 -18.19,3.44 -18.22,3.41c-0.03,-0.03 5.16,26.47 5.13,26.44c-0.03,-0.03 18.72,-3.66 18.69,-3.69c-0.03,-0.03 -5.59,-26.16 -5.59,-26.16l-0.01,0z");
        path6.setAttribute("id", "svg_2804");
        path6.setAttribute("fill", "rgba(255, 255, 0, 0)"); // Ustawiamy przezroczystość

        // Dodajemy event listener na hover (mouseenter i mouseleave)
        path6.addEventListener('mouseenter', () => {
            path6.setAttribute('fill', 'rgba(255, 255, 0, 0.5)'); // Zmieniamy kolor na żółty z półprzezroczystością
        });
        path6.addEventListener('mouseleave', () => {
            path6.setAttribute('fill', 'rgba(255, 255, 0, 0)'); // Powracamy do przezroczystości
        });

        // Dodanie ścieżek do elementu SVG
        svgElement.appendChild(path1);
        svgElement.appendChild(path2);
        svgElement.appendChild(path3);
        svgElement.appendChild(path4);
        svgElement.appendChild(path5);
        svgElement.appendChild(path6);
    });
});