$(document).ready(() => {
    const script_element = document.createElement('script');
    const css_element = document.createElement('link');
    css_element.setAttribute('rel', 'stylesheet');

    const attribute = window.location.href.split('/')[4]

    if(attribute == 'main') 
    {
        script_element.setAttribute('src', '/static/script/main_page.js');
        css_element.setAttribute('href', '/static/css/main_page.css');
    }
    else if(attribute == 'user')
    {
        script_element.setAttribute('src', '/static/script/user_page.js');
        css_element.setAttribute('href', '/static/css/user_page.css');
    }
    else if(attribute == 'post')
    {
        script_element.setAttribute('src', '/static/script/post_page.js');
        css_element.setAttribute('href', '/static/css/post_page.css');
    }

    document.querySelector('head').appendChild(script_element);
    document.querySelector('head').appendChild(css_element);
})

$('#open_dlg_btn').on('click', () => {
    $("#write_dlg_background").css("display", "grid");
})

$('#close_dlg_btn').on('click', () => {
    $("#write_dlg_background").css("display", "none");
})

$('#drop_box').on('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    $('#fileselector').click()
})
.on("dragover", (e) => {
    e.preventDefault();
    e.stopPropagation();
    $('#drop_box').css("background-color", "#FFD8D8");
})
.on("dragleave", (e) => {
    e.preventDefault();
    e.stopPropagation();
    $('#drop_box').css("background-color", "#FFFFFF");
})
.on("drop", (e) => {
    e.preventDefault();
    $('#drop_box').css("background-color", "#FFFFFF");

    const file = e.originalEvent.dataTransfer.files;

    if(file != null && file != undefined)
    {
        console.log(file)
        $('#fileselector').prop("files", e.originalEvent.dataTransfer.files)
        updateThumbnail(file)
    }
})

function updateThumbnail(file) {
    $('#drop_box_span').css("display", "none");
    $('#thumnail').css("display", "block");

    if (file[0].type.split('/')[0] == "image") {
        const reader = new FileReader();

        reader.readAsDataURL(file[0]);
        reader.onload = () => {
            $('#thumnail').css("backgroundImage", `url('${reader.result}')`);
        }
    }
    else {
        $('#thumnail').css("backgroundImage", `url('http://placehold.it/150x150')`);
    }

    $("#upload_form").css("display", "grid");
    $("#write_dlg").css("grid-template-rows", "2fr 1fr");
}

$('#fileselector').on("change", (e) => {
    updateThumbnail(e.target.files)
})