console.log("HexoHub web loaded");

// --- Filtrace katalogu podle kategorie ---
const filterButtons = document.querySelectorAll(".filters button");
const catalogCards = document.querySelectorAll(".catalog-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.getAttribute("data-category");

        // aktivní tlačítko
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        catalogCards.forEach(card => {
            if(category === "all" || card.getAttribute("data-category") === category){
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});

// --- Jednoduchý scroll efekt pro animaci sekcí ---
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + window.innerHeight * 0.8;

    sections.forEach(section => {
        if(scrollPos > section.offsetTop){
            section.style.opacity = 1;
            section.style.transform = "translateY(0)";
            section.style.transition = "all 0.8s ease-out";
        } else {
            section.style.opacity = 0;
            section.style.transform = "translateY(50px)";
        }
    });
});

// --- připravené pro budoucí funkce ---
// - dynamické načítání featured serverů z API
// - upvoty serverů
// - notifikace nových partnerů
