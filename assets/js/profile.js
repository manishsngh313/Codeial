// function previewImg(e){
//     console.log('manish');
//     // var e = $('#img-upload');
//     console.log($(e));
//     $('#img-preview').attr('src', e.target.result);
    
// }

       
function previewImg(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function (e) {
            $('#img-preview').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}