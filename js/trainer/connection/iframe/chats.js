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
                url: "http://35.227.26.131:8000/api/users/trainers/chat/get/",
                type: "GET",

                success: function(rs) {
                    if (rs != null) {
                        this_.information = rs;
                    }
                },
            })
        },

        start_Chat(id, avatar, name) {
            window.localStorage.setItem('avatar', avatar);
            window.localStorage.setItem('name', name);
            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                url: "http://35.227.26.131:8000/api/users/trainees/" + id + "/",
                type: "GET",

                success: function(rs) {
                    if (rs != null) {
                        window.parent.frames.location.href = '/html/trainer/connection/chatEnv.html?trainee_user_id=' + rs.user;
                    }
                },
            });
        }
    }
})