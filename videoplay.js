var this_;
var app = new Vue({
    el: '#app',
    data: {
        videourl: '',
    },

    created: function() {
        this_ = this;
        this_.initPerMsg();
    },

    methods: {
        initPerMsg() {
            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                url: "http://127.0.0.1:8000/api/users/trainers/thefile",
                type: "GET",
                
                success: function(rs) {
                    this_.videourl = rs;
                    if (rs != null) {
                        console.log(rs);
                        this_.videourl = rs;
                        console.log(this_.videourl);
                    }
                }
            })
        }

    },
})