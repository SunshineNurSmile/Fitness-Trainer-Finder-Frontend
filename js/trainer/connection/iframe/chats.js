var this_;
var app = new Vue({
    el: '#app',
    data: {
        information:[]
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
                url: "http://3.83.93.2:8000/api/users/trainers/chat/get/",
                type: "GET",

                success: function(rs) {
                    if (rs != null) {
                        this_.information = rs;
                    }
                },
            })
        },

        async start_Chat(id, avatar, name) {
            var timer = ms => new Promise(res => setTimeout(res, ms));
            window.localStorage.setItem('avatar', avatar);
            window.localStorage.setItem('name', name);
            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                url: "http://3.83.93.2:8000/api/users/trainees/" + id + "/",
                type: "GET",

                success: function(rs) {
                    if (rs != null) {
                        console.log(rs);
                        window.localStorage.setItem('receiver', rs.user);
                    }
                },
            });
            await timer(200);
            window.parent.frames.location.href = '/html/trainer/connection/chatEnv.html';
        }
    }
})