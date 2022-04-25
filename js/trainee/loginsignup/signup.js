var app = new Vue({
    el: '#app',
    data: {
        Fname: '',
        Lname: '',
        email: '',
        password: ''
    },

    methods: {
        signup(){
            if (this.Fname == ''||this.Lname == ''||this.email == ''||this.password == '') {
                alert("The information cannot be empty");
                location.reload();
                return;
            }

            if (!this.email.includes("@") || !this.email.includes(".")) {
                alert("Please enter a valid email address.");
                location.reload();
                return;
            }

            if (this.password.length < 8) {
                alert("Please enter a stronger password");
                location.reload();
                return;
            }

            var datas = {};
            datas.first_name = this.Fname;
            datas.last_name = this.Lname;
            datas.email = this.email;
            datas.password = this.password;
            var data = JSON.stringify(datas);
            console.log(data);

            $.ajax({
                url: "http://3.83.93.2:8000/api/users/register/",
                type: "post",
                dataType: "json",
                data: data,
                contentType: "application/json",
                success: function(rs) {
                    console.log(rs);
                    window.localStorage.setItem('token', rs.token);
                    alert("Registration successful!");
                    window.location.href = "/html/trainee/loginsignup/details.html";
                },
                
                error: function(xhr, status, error){
                    var errorMessage = xhr.status + ': ' + xhr.statusText
                    alert('Error - ' + errorMessage);
                }
            });
        }
    }
})