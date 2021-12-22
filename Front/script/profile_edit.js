$(document).ready(() => {
    $.ajax({
        url : '/page/get_myself',
        type : 'POST',
    })
    .done((data) => {
        $("#profile_picture").attr("src", `/profile/${data[0].id}.jpg`)
        $("#profile_username").val(data[0].name)
        $("#profile_password").val(data[0].password)
        $("#profile_birth").val(data[0].birth)
    })
})

$('#change_picture').on('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    $('#fileselector').click()
})

$('#canclebnt').on('click', (e) => {
    $(location).attr('href', '/')
})

$('#fileselector').on("change", (e) => {
    updateThumbnail(e.target.files)
})

function updateThumbnail(file) {

    if (file[0].type.split('/')[0] == "image") {
        const reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload = (e) => {
            $('#profile_picture').attr("src", e.target.result);
        }
    }
}