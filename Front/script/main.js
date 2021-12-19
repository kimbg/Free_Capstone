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
