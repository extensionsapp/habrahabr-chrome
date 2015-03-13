var habr = {

    init: function() {

        var last = document.createElement('div'),
            published = document.createElement('div');
        last.setAttribute('id', 'last_id');
        last.setAttribute('class', 'post shortcuts_item');
        last.setAttribute('style', 'display:none;');
        published.setAttribute('class', 'published');
        published.innerText = '20 января 2015 в 00:01';
        last.appendChild(published);
        document.getElementsByClassName('posts')[0].appendChild(last);

        habr.feed('geektimes.ru');

    },

    feed: function(host) {

        var href = location.href;
        href = href.replace('habrahabr.ru',host);

        var xhr = new XMLHttpRequest();
        xhr.open("GET", href, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {

                var html = document.createElement('div');
                html.innerHTML = xhr.responseText;
                var posts = html.getElementsByClassName('post');

                for (var i = 0; i < posts.length; i++) {

                    var post = document.createElement('div');
                    post.innerHTML = posts[i].innerHTML;

                    var date = post.getElementsByClassName('published')[0].innerText;

                    var postDate = habr.getDate(date);

                    post.getElementsByClassName('title')[0].setAttribute('style','padding-right:71px;');
                    post.getElementsByClassName('favorite')[0].parentNode.removeChild(post.getElementsByClassName('favorite')[0]);
                    post.getElementsByClassName('plus')[0].parentNode.removeChild(post.getElementsByClassName('plus')[0]);
                    post.getElementsByClassName('minus')[0].parentNode.removeChild(post.getElementsByClassName('minus')[0]);

                    habr.addChild(post.innerHTML, postDate, host, posts[i].id);

                    if (i == posts.length-1 && host == 'geektimes.ru') {
                        habr.feed('megamozg.ru');
                    }

                }

            }
        };
        xhr.send(null);

    },

    addChild: function(data, time, host, id) {

        var posts = document.getElementsByClassName('post');

        for (var i = 0; i < posts.length; i++) {

            var date = posts[i].getElementsByClassName('published')[0].innerText;

            var postDate = habr.getDate(date);

            var postAdd = document.createElement('div');
            postAdd.setAttribute('class', 'post shortcuts_item');
            postAdd.setAttribute('id', id);
            postAdd.setAttribute('style', 'background:url("http://' + host + '/images/logo.svg") right top no-repeat; background-size: 71px;');
            postAdd.innerHTML = data;

            if (time >= postDate) {
                document.getElementsByClassName('posts')[0].insertBefore(postAdd, document.getElementById(posts[i].id));
                break;
            }

        }

    },

    getDate: function(date) {

        var d = new Date(),
            dateYear,
            dateMonth,
            dateDay,
            dateHour,
            dateMin,
            dateMinSec,
            parseDate;

        if (date.indexOf('сегодня') + 1) {

            date = date.replace('сегодня в ', '');
            dateMinSec = date.split(':');

            dateYear  = d.getFullYear();
            dateMonth = d.getMonth();
            dateDay   = d.getDate();
            dateHour  = dateMinSec[0];
            dateMin   = dateMinSec[1];

        }
        else if (date.indexOf('вчера') + 1) {

            date = date.replace('вчера в ', '');
            dateMinSec = date.split(':');

            dateYear  = d.getFullYear();
            dateMonth = d.getMonth();
            dateDay   = d.getDate()-1;
            dateHour  = dateMinSec[0];
            dateMin   = dateMinSec[1];

        }
        else {

            parseDate = /([0-9]{1,2})\s(января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря)\s([0-9]{4})\sв\s([0-9]{2}):([0-9]{2})/gi.exec(date);

            if (!parseDate) {
                parseDate = /([0-9]{1,2})\s(января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря)\sв\s([0-9]{2}):([0-9]{2})/gi.exec(date);
                dateYear = d.getFullYear();
                dateDay = parseDate[1];
                dateHour = parseDate[3];
                dateMin = parseDate[4];
            }
            else {
                dateYear = parseDate[3];
                dateDay = parseDate[1];
                dateHour = parseDate[4];
                dateMin = parseDate[5];
            }

            switch (parseDate[2]) {
                case 'января':
                    dateMonth = 0;
                    break;
                case 'февраля':
                    dateMonth = 1;
                    break;
                case 'марта':
                    dateMonth = 2;
                    break;
                case 'апреля':
                    dateMonth = 3;
                    break;
                case 'мая':
                    dateMonth = 4;
                    break;
                case 'июня':
                    dateMonth = 5;
                    break;
                case 'июля':
                    dateMonth = 6;
                    break;
                case 'августа':
                    dateMonth = 7;
                    break;
                case 'сентября':
                    dateMonth = 8;
                    break;
                case 'октября':
                    dateMonth = 9;
                    break;
                case 'ноября':
                    dateMonth = 10;
                    break;
                case 'декабря':
                    dateMonth = 11;
                    break;
                default :
                    dateMonth = 0;
            }

        }

        return new Date(dateYear, dateMonth, dateDay, dateHour, dateMin);

    }

};

habr.init();
