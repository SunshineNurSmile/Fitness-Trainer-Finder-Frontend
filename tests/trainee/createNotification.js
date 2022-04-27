var app = new Vue({
    el: '#createnote',
    
    methods: {
        async create_notifications() {
            var this_ = this;
            var timer = ms => new Promise(res => setTimeout(res, ms));
            for (var index = 51; index <= 60; index++) {
                var email = index + "@gmail.com";
                var password = "123456789";
                var datas = {};
                datas.username = email;
                datas.password = password;
                var data = JSON.stringify(datas);

                $.ajax({
                    url: "http://35.227.26.131:8000/api/users/login/",
                    type: "post",
                    dataType: "json",
                    data: data,
                    contentType: "application/json",
                    success: function(rs) {
                        this_.create_request("1", rs.token);
                        this_.create_request("2", rs.token);
                        this_.create_request("3", rs.token);
                        this_.create_request("4", rs.token);
                        this_.create_request("5", rs.token);
                        this_.create_request("6", rs.token);
                        this_.create_request("7", rs.token);
                        this_.create_request("8", rs.token);
                        this_.create_request("9", rs.token);
                        this_.create_request("10", rs.token);
                    },
                    error: function(rs, e) {
                        console.log(rs, e);
                    }
                });
                await timer(200);
            };
        },

        create_request(id, token) {
            var datas = {};
            datas.trainer_id = id;
            var data = JSON.stringify(datas);

            $.ajax({
                headers: {
                    Authorization: "Bearer " + token
                },
                url: "http://35.227.26.131:8000/api/users/trainees/createnote/",
                type: "POST",
                data: data,
                dataType: "json",
                contentType: "application/json; charset=utf_8",
                
                success: function(rs) {
                    if (rs != null) {
                        console.log("Chat request sent!");
                    }
                },
                error: function(rs) {
                    console.log("Error sending chat request.");
                }
            })
        }
    }     
})