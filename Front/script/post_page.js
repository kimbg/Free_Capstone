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
                `
            )
        }
        GetComment(postid)
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
