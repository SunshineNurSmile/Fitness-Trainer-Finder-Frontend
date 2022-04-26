var app = new Vue({
    el: '#populatetrainee',
    
    methods: {
        async populate_trainees() {
            var this_ = this;
            var timer = ms => new Promise(res => setTimeout(res, ms));
            for (var index = 51; index <= 100; index++) {
                var email = index + "@gmail.com";
                var password = "123456789";
                var datas = {};
                datas.username = email;
                datas.password = password;
                var data = JSON.stringify(datas);

                $.ajax({
                    url: "http://34.201.24.7/api/users/login/",
                    type: "post",
                    dataType: "json",
                    data: data,
                    contentType: "application/json",
                    success: function(rs) {
                        this_.trainee_info(rs.token);
                    },
                    error: function(rs, e) {
                        console.log(rs, e);
                    }
                });
                await timer(200);
            };
        },

        trainee_info(token) {
            var infos = {};
            infos.heightft = "5";
            infos.heightin = "10";
            infos.weight = "130";
            infos.training_style = "Yoga";
            infos.gender = "Male";
            infos.dob = "1998-04-01";
            infos.description = "This is trainee description. This is for automatically populate the backend database. The more words in here the better. Hello, my name is Yuanyi Wang, and I am doing automated database population."
            infos.avatar = "/images/defaultProfile.png"
            var info = JSON.stringify(infos);
        
            $.ajax({
                headers: {
                    Authorization: "Bearer " + token
                },
                url: "http://34.201.24.7/api/users/trainees/create",
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