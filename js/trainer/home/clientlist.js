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
                url: "http://35.227.26.131/api/users/trainers/mytrainees",
                type: "GET",

                success: function(rs) {
                    if (rs.length != 0) {
                        this_.information = rs;
                    }
                    else {
                        alert("You don't have any clients yet.");
                    }
                },
                error: function(rs) {
                    alert("You don't have any clients yet.");
                }
            })
        },

        async send_message(id, avatar, name) {
            var timer = ms => new Promise(res => setTimeout(res, ms));
            window.localStorage.setItem('avatar', avatar);
            window.localStorage.setItem('name', name);
            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                url: "http://35.227.26.131/api/users/trainees/" + id + "/",
                type: "GET",

                success: function(rs) {
                    if (rs != null) {
                        window.localStorage.setItem('receiver', rs.user);
                    }
                },
            });
            await timer(500);
            if (window.localStorage.getItem('receiver') != null || window.localStorage.getItem('receiver') != '') {
                window.parent.frames.location.href = '/html/trainer/connection/chatEnv.html';
            }
        }
    }
})