var app = new Vue({
    el: '#updatetrainer',
    
    methods: {
        async update_trainers() {
            var this_ = this;
            var timer = ms => new Promise(res => setTimeout(res, ms));
            for (var index = 1; index <= 50; index++) {
                var email = index + "@gmail.com";
                var password = "123456789";
                var datas = {};
                datas.username = email;
                datas.password = password;
                var data = JSON.stringify(datas);

                $.ajax({
                    url: "http://3.83.93.2:8000/api/users/login/",
                    type: "post",
                    dataType: "json",
                    data: data,
                    contentType: "application/json",
                    success: function(rs) {
                        this_.trainer_details(rs.id, rs.token);
                    },
                    error: function(rs, e) {
                        console.log(rs, e);
                    }
                });
                await timer(200);
            };
        },

        trainer_details(id, token) {
            var details = {};
            details.training_style = "Yoga";
            details.description = "Trainer description. This is a test run. Some more text in here would help. My name is Peter Parker, and with great power comes great responsibility.";
            details.avatar = "/images/defaultProfile.png";
            details.image1 = "/images/defaultpicture.png";
            details.image2 = "/images/defaultpicture.png";
            details.image3 = "/images/defaultpicture.png";
            details.image4 = "/images/defaultpicture.png";
            details.image5 = "/images/defaultpicture.png";
            details.image6 = "/images/defaultpicture.png";
            var detail = JSON.stringify(details);
        
            $.ajax({
                headers: {
                    Authorization: "Bearer " + token
                },
                url: "http://3.83.93.2:8000/api/users/trainers/update/" + id + "/",
                type: "PUT",
                data: detail,
                dataType: "json",
                contentType: "application/json; charset=utf_8",
        
                success: function(rs) {
                    console.log("Update trainer success.");
                },
        
                error: function(rs) {
                    console.log("Update trainer failed.");
                }
            });
        },
    }     
})