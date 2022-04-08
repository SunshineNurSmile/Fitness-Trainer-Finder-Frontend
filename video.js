var app = new Vue({
    el: '#app',
    data: {
        file: '',
    },

    methods: {
        upload(video) {
            this.file = video.target.files[0];
        },

        video_upload(start, model_id) {
            var max_length = 1024 * 1024 * 10;
            var end;
            var this_ = this;
            var existingPath = model_id;
            var formData = new FormData();
            var nextChunk = start + max_length + 1;
            var currentChunk = this.file.slice(start, nextChunk);
            var uploadedChunk = start + currentChunk.size;
            if (uploadedChunk >= this.file.size) {
                end = 1;
            }
            else {
                end = 0;
            }
            formData.append('file', currentChunk);
            formData.append('filename', this.file.name);
            formData.append('end', end);
            formData.append('existingPath', existingPath);
            formData.append('nextSlice', nextChunk);

            $.ajax({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                url: 'http://127.0.0.1:8000/api/users/trainers/uploadFile',
                type: 'POST',
                dataType: 'JSON',
                cache: false,
                processData: false,
                contentType: false,
                data: formData,
                
                success: function(rs) {
                    if (nextChunk < this_.file.size) {
                        existingPath = rs.existingPath
                        this_.video_upload(nextChunk, existingPath);
                    } 
                    else {
                        alert(rs.data);
                    }
                }
            })
        }
    },
})