var app = new Vue({
    el: '#populateuser',
    
    methods: {
        async populate_users() {
            var timer = ms => new Promise(res => setTimeout(res, ms));
            for (var index = 1; index <= 10; index++) {
                var datas = {};
                datas.first_name = "Trainer";
                datas.last_name = index.toString();
                datas.email = index.toString() + "@gmail.com";
                datas.password = "123456789";
                var data = JSON.stringify(datas);

                $.ajax({
                    url: "http://35.227.26.131:8000/api/users/register/",
                    type: "post",
                    dataType: "json",
                    data: data,
                    contentType: "application/json",
                    success: function(rs) {
                        console.log("registration success.");
                    },
                    error: function(rs) {
                        console.log("registration failure.");
                    }
                });
                await timer(200);
            };

            for (var index = 11; index <= 20; index++) {
                var datas = {};
                datas.first_name = "Trainee";
                datas.last_name = index.toString();
                datas.email = index.toString() + "@gmail.com";
                datas.password = "123456789";
                var data = JSON.stringify(datas);
                $.ajax({
                    url: "http://35.227.26.131:8000/api/users/register/",
                    type: "post",
                    dataType: "json",
                    data: data,
                    contentType: "application/json",
                    success: function(rs) {
                        console.log("registration success.");
                    },
                    error: function(rs) {
                        console.log("registration failure.");
                    }
                });
                await timer(200);
            };
        }
    }     
})