var this_;
var app = new Vue({
    el: '#app',
    data: {
        name: '',
        total: '',
        information:[]
    },
    created: function() {
        this_ = this;
        this_.get_name();
        this_.get_income();
    },
    methods: {
        get_name(){
            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                url: "http://127.0.0.1:8000/api/users/trainers/",
                type: "GET",

                success: function(rs) {
                    if (rs != null) {
                        this_.name = rs.name;
                    }
                },
            })
        },

        get_income() {
            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                url: "http://127.0.0.1:8000/api/orders/trainerorders/",
                type: "GET",

                success: function(rs) {
                    if (rs != null) {
                        console.log(rs);
                        this_.information = rs;
                        for (var index = 0; index < this_.information.length; index++) {
                            this_.total = this_.total + this_.information[index].totalPrice;
                        }
                    }
                },
            })
        }
    }
})