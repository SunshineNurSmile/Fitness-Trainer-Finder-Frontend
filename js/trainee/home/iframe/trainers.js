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
                url: "http://35.227.26.131/api/users/trainers/list/",
                type: "GET",

                success: function(rs) {
                    if (rs != null) {
                        this_.information = rs;
                    }
                },
                error: function() {}
            })
        },
        
        viewProfile(id) {
            window.parent.frames.location.href = '/html/trainee/connection/trainercard.html?trainer_id=' + id;
        }
    }
})