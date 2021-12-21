$(document).ready(() => {
    const script_element = document.createElement('script');
    const css_element = document.createElement('link');
    css_element.setAttribute('rel', 'stylesheet');

    const attribute = window.location.href.split('/')[4]

    if(attribute == 'main') 
    {
        script_element.setAttribute('src', '/static/script/main_page.js');
        document.querySelector('head').appendChild(script_element);
    }
    else if(attribute == 'user')
    {
        script_element.setAttribute('src', '/static/script/user_page.js');
        css_element.setAttribute('href', '/static/css/user_page.css');
        document.querySelector('head').appendChild(script_element);
        document.querySelector('head').appendChild(css_element);
    }
    else if(attribute == 'post')
    {
        script_element.setAttribute('src', '/static/script/post_page.js');
        css_element.setAttribute('href', '/static/css/post_page.css');
        document.querySelector('head').appendChild(script_element);
        document.querySelector('head').appendChild(css_element);
    }

    $.ajax({
        url : '/page/get_myself',
        type : 'POST',
    })
    .done((data) => {
        $("#open_menu_btn").attr("src", `/profile/${data[0].id}.jpg`);
    })

    $.ajax({
        url : '/page/get_friend',
        type : 'POST',
    })
    .done((data) => {
        for(let i = 0; i < data.length; i++) {
            $('#side').append(
                `
                <div id = "${data[i].friend_id}/" class = "post">
                    <div class = "postuser">
                        <div class = "filter">
                            <img class = "profile" src = "/profile/${data[i].friend_id}.jpg">
                        </div>
                        ${data[i].friend_id}
                    </div>
                </div>
                `
            )
        }
    })
})

//메뉴 다이얼로그

$('#open_menu_btn').on('click', () => {
    if($('#menu_dlg').css("display") == "none")
        $('#menu_dlg').css("display", "grid");
    else
        $('#menu_dlg').css("display", "none");
})

//업로드 다이얼로그

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
            EXIF.getData(file[0], async () => {
                const tags = await EXIF.getAllTags(file[0]);
                latitude = 0;
                longitude = 0;
               try
               {
                    latitu1 = tags.GPSLatitude[0].valueOf();
                    latitu2 = tags.GPSLatitude[1].valueOf();
                    latitu3 = tags.GPSLatitude[2].valueOf();
    
                    longitu1 = tags.GPSLongitude[0].valueOf();
                    longitu2 = tags.GPSLongitude[1].valueOf();
                    longitu3 = tags.GPSLongitude[2].valueOf();
    
                    latitude = await latitu1 + latitu2 / 60 + latitu3 / 3600;
                    longitude = await longitu1 + longitu2 / 60 + longitu3 / 3600;
               }
               catch (err)
               {
                    console.log(err);      
               }
               finally {
                   $("#lat").text(latitude);
                   $("#lng").text(longitude);
                   console.log('lat : ',$("#lat").text());
                   console.log('lng : ',$("#lng").text());

               }
            });
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

$(document).on('click', '.postimage', (e) => {
    window.location.href='/page/post/'+ e.target.closest('.post').getAttribute('id').split('/')[1];
})

$(document).on('click', '.postuser', (e) => {
    window.location.href='/page/user/'+ e.target.closest('.post').getAttribute('id').split('/', 1);
})