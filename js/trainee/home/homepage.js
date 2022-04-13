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