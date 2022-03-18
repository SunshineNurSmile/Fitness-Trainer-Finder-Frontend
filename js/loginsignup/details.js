var app = new Vue({
    el: '#app',
    data: {
        gender: '',
        weight: '',
        heightft: '',
        heightin: '',
        dob: ''
    },
    mounted: function() {},
    methods: {
        jump_to_AT(){
            if (this.gender == ''||this.weight == ''||this.heightft == '' ||this.heightin == '' ||this.dob == '') {
                alert("The information cannot be empty");
                window.location.reload();
            }
            else{
                var datas = {};
                datas.gender = this.gender;
                datas.weight = this.weight + "LB";
                datas.height = this.heightft + "\'" + this.heightin + "\"";
                datas.dob = this.dob;
                window.localStorage.user_profile = JSON.stringify(datas);
                window.location.href = "/html/loginsignup/chooseStyle.html";
            }
        }
    }
})