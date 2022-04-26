var this_;
var app = new Vue({
    el: '#app',
    data: {
        id: '',

        price1: '0',
        price2: '',
        price3: '',

        description1: '',
        description2: '',
        description3: '',

        put: false,
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
                url: "http://34.201.24.7/api/users/trainers/payment/get/",
                type: "GET",
                
                success: function(rs) {
                    if (rs != null) {
                        this_.id = rs.id;
                        
                        this_.price2 = rs.price2;
                        this_.price3 = rs.price3;

                        this_.description1 = rs.description1;
                        this_.description2 = rs.description2;
                        this_.description3 = rs.description3;
                        this_.put = true;
                    }
                }
            })
        },

        submit() {
            var datas = {};
            datas.price1 = this.price1;
            datas.price2 = this.price2;
            datas.price3 = this.price3;

            datas.description1 = this.description1;
            datas.description2 = this.description2;
            datas.description3 = this.description3;
                    
            var data = JSON.stringify(datas);

            if (this.put == false) {
                $.ajax({
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    },
                    url: "http://34.201.24.7/api/users/trainers/payment/create/",
                    type: "POST",
                    data: data,
                    dataType: "json",
                    contentType: "application/json; charset=utf_8",
    
                    success: function(rs) {
                        alert("Information Modified.")
                        window.location.href = "/html/trainer/account/paymentPlans.html";
                    },
    
                    error: function(rs) {
                        alert("Something Went Wrong.")
                    }
                })
            }
            else {
                $.ajax({
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    },
                    url: "http://34.201.24.7/api/users/trainers/payment/update/",
                    type: "PUT",
                    data: data,
                    dataType: "json",
                    contentType: "application/json; charset=utf_8",
    
                    success: function(rs) {
                        alert("Information Modified.")
                        window.location.href = "/html/trainer/account/paymentPlans.html";
                    },
    
                    error: function(rs) {
                        alert("Something Went Wrong.")
                    }
                })
            }
        },
        
        cancel() {
            window.location.href = "/html/trainer/account/paymentPlans.html";
        },

        back() {
            this.cancel();
        }
    },
})