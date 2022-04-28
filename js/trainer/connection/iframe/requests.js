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
                url: "http://10.142.0.2:8000/api/users/trainers/mynotes",
                type: "GET",

                success: function(rs) {
                    if (rs != null) {
                        this_.information = rs;
                    }
                    
                },
                error: function() {}
            })
        },

        acceptChat(id) {
            var datas = {};
            datas.trainee_id = id;
            var data = JSON.stringify(datas);
            
            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                url: "http://10.142.0.2:8000/api/users/trainers/chat/create/",
                type: "POST",
                data: data,
                dataType: "json",
                contentType: "application/json; charset=utf_8",

                success: function(rs) {
                    alert("Chat Request Accepted!")
                },

                error: function(rs) {
                    alert("Something Went Wrong.")
                }
            })
            this.deleteRequest(id);
        },

        deleteRequest(id) {
            var datas = {};
            datas.trainee_id = id;
            var data = JSON.stringify(datas);

            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                url: "http://10.142.0.2:8000/api/users/trainers/note/delete/",
                type: "DELETE",
                data: data,
                dataType: "json",
                contentType: "application/json; charset=utf_8",

                success: function(rs) {
                    window.location.reload();
                },

                error: function(rs) {
                    alert(rs);
                }
            })
        }
    }
})