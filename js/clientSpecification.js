var app = new Vue({
    el: '#app',
    data: {
        
    },

    methods:{
        trainer_signup() {
            window.location.href = "/html/trainer/loginsignup/signup.html";
        },

        trainee_signup() {
            window.location.href = "/html/trainee/loginsignup/signup.html";
        }
    }
})