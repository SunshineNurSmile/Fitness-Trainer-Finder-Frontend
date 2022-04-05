var app = new Vue({
    el: "#app",
    data: {
        Styles: true,
        Trainers: false,
    },
    
    methods: {
        open_Styles() {
            this.Styles = true;
            this.Trainers = false;
        },
        
        open_Trainers() {
            this.Styles = false;
            this.Trainers = true;
        },
    },
});

const menu = document.querySelector(".menu");
const close = document.querySelector(".close");
const nav = document.querySelector("nav");

menu.addEventListener("click", () => {
    nav.classList.add("open-nav");
});

close.addEventListener("click", () => {
    nav.classList.remove("open-nav");
});