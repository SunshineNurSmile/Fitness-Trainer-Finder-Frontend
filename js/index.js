var app = new Vue({
    el: '#app',
    data: {
        
    },

    methods:{
        jump_to_spec() {
            alert("This is a class project. Please don't enter any confidential information or upload any illegal files or pay with actual PayPal account.");
            window.location.href = "/html/clientSpecification.html";
        },

        jump_to_login() {
            alert("This is a class project. Please don't enter any confidential information or upload any illegal files or pay with actual PayPal account.");
            window.location.href = "/html/login.html";
        }
    }
})