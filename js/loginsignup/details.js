var app = new Vue({
    el: '#app',
    data: {
        gender: '',
        weight: '',
        height: '',
        dob: ''
    },
    mounted: function() {},
    methods: {
        jump_to_AT(){
            if (this.gender == ''||this.weight == ''||this.height == ''||this.dob == '') {
                alert("The information cannot be empty");
                window.location.reload();
            }
            else{
                var datas = {};
                datas.gender = this.gender;
                datas.weight = this.weight;
                datas.height = this.height;
                datas.dob = this.dob;
                window.localStorage.user_profile = JSON.stringify(datas);
                window.location.href = "/html/loginsignup/chooseStyle.html";
            }
        }
    }
})