var this_;
var app = new Vue({
    el: '#app',
    data: {
        information:[],
    },

    created: function() {
        this_ = this;
        this_.get_data();
    },
    
    methods: {
        get_data(){
            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                url: "http://10.142.0.2:8000/api/users/trainees/chat/get/",
                type: "GET",

                success: function(rs) {
                    if (rs != '') {
                        this_.information = rs;
                    }
                    else {
                        alert("Please send chat requests to trainers in your home page. If you have already done so, wait for them to accept your requests.");
                        window.frames.parent.location.href = '/html/trainee/home/homepage.html';
                    }
                },
                error: function(rs) {
                    alert("Please send chat requests to trainers in your home page. If you have already done so, wait for them to accept your requests.");
                    window.frames.parent.location.href = '/html/trainee/home/homepage.html';
                }
            })
        },

        async start_chat(id, avatar, name) {
            var timer = ms => new Promise(res => setTimeout(res, ms));
            window.localStorage.setItem('avatar', avatar);
            window.localStorage.setItem('name', name);
            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                url: "http://10.142.0.2:8000/api/users/trainers/" + id + "/",
                type: "GET",

                success: function(rs) {
                    if (rs != null) {
                        window.localStorage.setItem('receiver', rs.user_id);
                    }
                },
            });
            await timer (500);
            if (window.localStorage.getItem('receiver') != null && window.localStorage.getItem('receiver') != '') {
                window.parent.frames.location.href = '/html/trainee/connection/chatEnv.html';
            }
        }
    }
})