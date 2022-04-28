const PayPalButton = paypal.Buttons.driver("vue", window.Vue);

Vue.component("app", {
    // The style prop for the PayPal button should be passed in as `style-object` or `styleObject` to avoid conflict with Vue's `style` reserved prop.
    template: `
        <paypal-buttons :on-approve="onApprove" :create-order="createOrder" :on-shipping-change="onShippingChange" :on-error="onError" :style-object="style" />
    `,
    components: {
        "paypal-buttons": PayPalButton,
    },

    computed: {
        createOrder: function () {
            var price = window.localStorage.getItem('price');
            return (data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: price,
                            },
                        },
                    ],
                });
            }
        },

        onApprove: function () {
            return (data, actions) => {
                window.localStorage.setItem('orderID', data.orderID);
                return actions.order.capture();
            }
        },

        onShippingChange: function () {
            return (data, actions) => {
                if (data.shipping_address.country_code !== 'US') {
                    return actions.reject();
                }
                return actions.resolve();
            }
        },

        onError: function () {
            return (err) => {
                console.error(err);
                alert("There is a problem processing your order.");
                window.location.href = "/html/trainee/home/homepage.html";
            }
        },

        style: function () {
            return {
                shape: 'rect',
                color: 'black',
                layout: 'horizontal',
                label: 'paypal',
                tagline: false
            }
        },
    },
});

var this_;
const vm = new Vue({
    el: "#container",
    data: {
        price: '',
        description: '',
        name: '',
        duration: '',
    },
    
    mounted: function() {
        this_ = this;
        this_.get_tier_info()
        this_.get_orderID();
    },

    methods: {
        get_tier_info () {
            this_ = this;
            this.price = window.localStorage.getItem('price');
            this.description = window.localStorage.getItem('description');
            if (this.price != '0.00') {
                this.duration = 'per month';
            }
            else {
                this.duration = 'one week';
            }

            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                url: "http://35.227.26.131:8000/api/users/trainers/" + window.localStorage.getItem('trainer_id') + "/",
                type: "GET",

                success: function(rs) {
                    this_.name = rs.name;
                },

                error: function(rs) {
                    alert("Error getting trainer's name.");
                }
            });
        },

        async get_orderID() {
            var timer = ms => new Promise(res => setTimeout(res, ms));
            var keeplooping = true;
            while(keeplooping) {
                var orderID = window.localStorage.getItem('orderID');
                if (orderID != null) {
                    keeplooping = false;
                }
                else {
                    keeplooping = true;
                }
                await timer(3000);
            };
            
            if (orderID != null) {
                await timer(3000);
                this.send_orderID(orderID);
            };
        },

        send_orderID(orderID) {
            var datas = {};
            var trainer_id = window.localStorage.getItem('trainer_id');
            var totalPrice = window.localStorage.getItem('price');
            datas.orderID = orderID;
            datas.trainer_id = trainer_id;
            datas.totalPrice = totalPrice;
            var data = JSON.stringify(datas);

            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                url: "http://35.227.26.131:8000/api/orders/create/",
                type: "POST",
                data: data,
                dataType: "json",
                contentType: "application/json; charset=utf_8",

                success: function(rs) {
                    window.localStorage.removeItem('orderID');
                    window.location.href = '/html/trainee/connection/paymentThankyou.html';
                },

                error: function(rs) {
                    alert("Your order went through, but we could not store your order information.");
                }
            });
        },

        back() {
            window.location.href = '/html/trainee/connection/plantiers.html?trainer_id=' + window.localStorage.getItem('trainer_id');
        }
    }
});