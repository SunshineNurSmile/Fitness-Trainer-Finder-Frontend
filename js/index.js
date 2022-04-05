var app = new Vue({
    el: '#app',
    data: {
        
    },

    methods:{
        jump_to_spec() {
            window.location.href = "/html/clientSpecification.html";
        },

        jump_to_login() {
            window.location.href = "/html/login.html";
        }
    }
})