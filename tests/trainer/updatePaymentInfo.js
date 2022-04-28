var app = new Vue({
    el: '#updatepayment',
    
    methods: {
        async update_payment_info() {
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
                    url: "http://10.142.0.2:8000/api/users/login/",
                    type: "post",
                    dataType: "json",
                    data: data,
                    contentType: "application/json",
                    success: function(rs) {
                        this_.trainer_price(rs.token);
                    },
                    error: function(rs, e) {
                        console.log(rs, e);
                    }
                });
                await timer(200);
            };
        },

        trainer_price(token) {
            var prices = {};
            prices.price1 = 0;
            prices.price2 = 19.99;
            prices.price3 = 29.99;
            prices.description1 = "This is the description for plan tier 1, which is the free tier option.";
            prices.description2 = "This is the description for plan tier 2, which is the basic tier option.";
            prices.description3 = "This is the description for plan tier 3, which is the premium tier option.";
            var price = JSON.stringify(prices);
        
            $.ajax({
                headers: {
                    Authorization: "Bearer " + token
                },
                url: "http://10.142.0.2:8000/api/users/trainers/payment/create/",
                type: "POST",
                data: price,
                dataType: "json",
                contentType: "application/json; charset=utf_8",
        
                success: function(rs) {
                    console.log("Create payment plan success");
                },
        
                error: function(rs) {
                    console.log("Create payment plan failed.");
                }
            });
        }
    }     
})