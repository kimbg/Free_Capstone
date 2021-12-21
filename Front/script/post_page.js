$(document).ready(() => {
    postid = window.location.href.split('/')[5]
    PostInfo(postid);
})

function PostInfo(postid) {
    $.ajax({
        url : '/page/getpost',
        type : 'POST',
        data : {'id' : postid}
    })
    .done((data) => {
    
        if(data != 'noData') {
            $('#content_bar').append(
                `
                <div id = "${data[0].user_id}/${data[0].number}" class = "post">
                    <div class = "postuser">
                        <div class = "filter">
                            <img class = "profile" src = "/profile/${data[0].user_id}.jpg">
                        </div>
                        ${data[0].user_id}
                    </div>
                    <img class = "postimage" src = "/photo/${data[0].number}.jpg">
                    <h3 class = "postcomment">
                        ${data[0].comment}
                    </h3>
                </div>

                <div class = "add_comment_btn" id = "add_comment_btn/${data[0].number}">
                    <img class = "comment_img" src = "/static/image/comment.png">
                    ADD COMMENT
                </div>
                `
            )

            GetComment(postid)
        }
    })
}

function GetComment(postid)
{
    $.ajax({
        url : '/page/getcomments',
        type : 'POST',
        data : {'id' : postid}
    })
    .done((data) => {
        if(data != 'noData') {
            for(let i = 0; i < data.length; i++) {
                $('#content_bar').append(
                    `
                    <div id = "${data[i].user_id}/${i}" class = "post">
                        <div class = "postuser">
                            <div class = "filter">
                                <img class = "profile" src = "/profile/${data[i].user_id}.jpg">
                            </div>
                            ${data[i].user_id}
                        </div>
                        <h3 class = "postcomment">
                            ${data[i].comment}
                        </h3>
                    </div>
                    `
                )
            }
        }
    })
}

$(document).on('click', '.postuser', (e) => {
    window.location.href='/page/user/'+ e.target.closest('.post').getAttribute('id').split('/', 1);
})

$(document).on('click', '.add_comment_btn', (e) => {
    console.log($(location).attr('href').split('/')[5])
    $ ("#main").append(
        `
        <div id = "comment_dlg_background">
            <div id = "comment_dlg">
                <img id = "close_comment_dlg_btn" src = "/static/image/xbox.png">
                <span></span>
                <textarea id = "comment_textarea" placeholder = "글을 입력해주세요" name = "comment1"></textarea>
                <img id = "comment_btn" src = "/static/image/comment.png">
            </div>
        </div>
        `
    )
})

$(document).on('click', '#close_comment_dlg_btn', (e) => {
    $(comment_dlg_background).remove()
})

$(document).on('click', '#comment_btn', (e) => {
    $.ajax({
        url : `/page/write_comment/${$(location).attr('href').split('/')[5]}`,
        type : 'POST',
        data : {'comment' : $(comment_textarea).val()}
    })
    .done(() => {
        location.reload();
    })
})