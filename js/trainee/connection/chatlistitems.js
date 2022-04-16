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
                url: "http://127.0.0.1:8000/api/users/trainees/chat/get/",
                type: "GET",

                success: function(rs) {
                    if (rs != null) {
                        console.log(rs);
                        this_.information = rs;
                    }
                },
            })
        },

        start_chat(id) {

        }
    }
})