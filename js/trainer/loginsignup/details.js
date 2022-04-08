var app = new Vue({
    el: '#app',
    data: {
        training_style: '',
        gender: '',
        dob: ''
    },
    
    methods: {
        jump_to_home(){
            if (this.gender == ''||this.dob == ''||this.training_style == '') {
                alert("The information cannot be empty");
                window.location.reload();
            }
            else{
                var datas = {};
                datas.training_style = this.training_style
                datas.gender = this.gender;
                datas.dob = this.dob;
                var data = JSON.stringify(datas);
                console.log(datas);
                
                $.ajax({
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    },
                    url: "http://127.0.0.1:8000/api/users/trainers/create",
                    type: "POST",
                    dataType: "json",
                    data: data,
                    contentType: "application/json",
                    success: function(rs) {
                        window.location.href = '/html/trainer/account/accountPage.html';
                    },
                    error: function(xhr, status, error){
                        var errorMessage = xhr.status + ': ' + xhr.statusText
                        alert('Error - ' + errorMessage);
                    }
                });
            }
        }
    }
})