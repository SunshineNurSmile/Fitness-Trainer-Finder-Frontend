var this_;
var app = new Vue({
    el: '#app',
    data: {
        trainer_id: '',

        price2: '',
        price3: '',

        description1: '',
        description2: '',
        description3: '',
    },

    created: function() {
        this_ = this;
        this_.trainer_id = this_.getRequest("trainer_id");
        this_.initPerMsg();
    },
    
    methods: {
        getRequest(name) {
            var url = location.search;
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            }
            if (!theRequest[name]) {
                theRequest[name] = null;
            }
            return theRequest[name]
        },

        initPerMsg() {
            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                url: "http://127.0.0.1:8000/api/users/trainers/payment/" + this.trainer_id + "/",
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
                    else {
                        alert("Error Loading Information!");
                    }
                }
            })
        },

        back() {
            window.location.href = '/html/trainee/connection/trainercard.html?trainer_id=' + this.trainer_id;
        }
    }
})

// // Render the PayPal button into #paypal-button-container
// paypal.Buttons({

//     // Set up the transaction
//     createOrder: function(data, actions) {
//         return actions.order.create({
//             purchase_units: [{
//                 amount: {
//                     value: '88.44'
//                 }
//             }]
//         });
//     },

//     // Finalize the transaction
//     onApprove: function(data, actions) {
//         return actions.order.capture().then(function(orderData) {
//             // Successful capture! For demo purposes:
//             console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
//             var transaction = orderData.purchase_units[0].payments.captures[0];
//             alert('Transaction '+ transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');

//             // Replace the above to show a success message within this page, e.g.
//             // const element = document.getElementById('paypal-button-container');
//             // element.innerHTML = '';
//             // element.innerHTML = '<h3>Thank you for your payment!</h3>';
//             // Or go to another URL:  actions.redirect('thank_you.html');
//         });
//     }


// }).render('#paypal-button-container');