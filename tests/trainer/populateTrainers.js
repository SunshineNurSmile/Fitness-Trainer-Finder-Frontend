var app = new Vue({
    el: '#populatetrainer',
    
    methods: {
        async populate_trainers() {
            var this_ = this;
            var timer = ms => new Promise(res => setTimeout(res, ms));
            for (var index = 1; index <= 10; index++) {
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
                        this_.trainer_info(rs.token);
                    },
                    error: function(rs, e) {
                        console.log(rs, e);
                    }
                });
                await timer(200);
            };
        },

        trainer_info(token) {
            var infos = {};
            infos.training_style = "Yoga";
            infos.gender = "Male";
            infos.dob = "1998-04-01";
            var info = JSON.stringify(infos);
        
            $.ajax({
                headers: {
                    Authorization: "Bearer " + token
                },
                url: "http://35.227.26.131:8000/api/users/trainers/create",
                type: "POST",
                dataType: "json",
                data: info,
                contentType: "application/json",
                success: function(rs) {
                    console.log("putting info success.");
                },
                error: function(rs) {
                    console.log("putting info failed");
                }
            });
        },
    }     
})