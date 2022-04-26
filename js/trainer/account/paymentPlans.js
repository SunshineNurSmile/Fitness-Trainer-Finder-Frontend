var this_;
var app = new Vue({
    el: '#app',
    data: {
        price2: '',
        price3: '',

        description1: 'Edit Your Description Using the Button Above.',
        description2: 'Edit Your Description Using the Button Above.',
        description3: 'Edit Your Description Using the Button Above.',
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
                    console.log(rs);
                    if (rs != null) {                        
                        this_.price2 = rs.price2;
                        this_.price3 = rs.price3;

                        this_.description1 = rs.description1;
                        this_.description2 = rs.description2;
                        this_.description3 = rs.description3;
                    }
                }
            })
        },

        editPayment() {
            window.location.href = "/html/trainer/account/editPaymentPlan.html";
        }
    },
})