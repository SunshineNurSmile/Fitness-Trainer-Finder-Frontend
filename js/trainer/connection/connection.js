var app = new Vue({
    el: "#app",
    data: {
        requests: true,
        chats: false,
    },
    
    methods: {
        open_requests() {
            this.requests = true;
            this.chats = false;
        },
        
        open_chats() {
            this.requests = false;
            this.chats = true;
        },
    },
});