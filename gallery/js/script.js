var $more = document.getElementById('more-btn');

var total = 0;
var allDone = false;

var $cont = document.getElementById('cont');
addPhoto(data, 9, true);

function addPhoto(arr, len, rem) {

    var markup = '';
    if (typeof rem === 'boolean') total = len;
    for (var a = 0; a < len; a++) {
        var phone = arr[a];
        markup += '<div class="card col-md-4">'
        markup += '<img class="card-img-top" width="250" height="300" src="' + phone.img + '" alt="Card image cap">'
        markup += '<div class="card-body">'
        markup += '<h5 class="card-title">' + phone.name + ' </h5>'
        markup += '<p class="card-text">' + phone.text + ' of ' + phone.category + ' phone with ' + phone.inch + ' inch display</p>'
        markup += '</div> </div>';


    }
    $cont.innerHTML = markup;
}

////////////////////////////////////

document.getElementById('select-azza').addEventListener('change', function (e) {

    var userChoose = e.target.value;
    if (userChoose === '') {
        allDone = true;
        addPhoto(data, data.length);
    } else {
        var dataCash = Object.assign([], data);

        var dataNew = dataCash.sort(sort);
        if (userChoose === 'za') {
            dataNew = dataCash.reverse(sort);
        }


        addPhoto(dataNew, dataNew.length);

    }
    return
});




document.getElementById('select-old').addEventListener('change', function (e) {
    var userChoose = e.target.value;
    allDone = true;
    if (userChoose === '') {
        addPhoto(data, data.length);
    } else {
        var firstLett = parseInt(userChoose.substr(0, 1));
        var lastLett = parseInt(userChoose.substr(2, 1));
        var dataNew = data.filter(function (val) {
            return val.inch > firstLett && val.inch < lastLett;
        });
        addPhoto(dataNew, dataNew.length);
    }
});



function sort(a, b) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;

}


////////////////////////////////////////////////////////

document.getElementById('search').addEventListener('keyup', function (e) {
    var userText = e.target.value.toLowerCase().trim();
    if (userText.length > 0) {
        var dataNew = data.filter(function (phone) {
            return phone.name.toLowerCase().indexOf(userText) === 0;

        });
        addPhoto(dataNew, dataNew.length);
    } else {
        addPhoto(data, data.length);
    }
});


///////////////////////////////////////////////////////////////////////

var $cat = document.getElementsByClassName('cat-btn');
for (var a = 0; a < $cat.length; a++) {
    $cat[a].addEventListener('click', function (e) {
        e.preventDefault();
        allDone = true;
        var userClick = e.target.text.toLowerCase();
        if (userClick !== 'all') {
            var dataNew = data.filter(function (val) {
                return val.category.toLowerCase() === userClick;
            });
            addPhoto(dataNew, dataNew.length);
        } else {
            addPhoto(data, data.length);
        }
    });
}



//////////////////////////////////////////////////////////////////////
var $uptop = document.getElementById('uptop');
var isMobile = /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(navigator.userAgent);

function calc() {
    if (total === data.length) {
        allDone = true;
    } else if (total + 9 < data.length) {
        total += 9;
    } else {
        total += data.length - total;
    }

}

window.onscroll = function () {
    var $preloader = document.getElementById('pre-loader');
    var sc = Math.ceil(document.documentElement.scrollTop - 17);
    var wh = window.innerHeight;
    var dh = document.documentElement.scrollHeight;

    var edh = wh * 2;
    if (sc + wh >= edh) {
        $uptop.style.bottom = '150px';
        $uptop.style.opacity = '1';
    } else {
        $uptop.style.opacity = '0';
        $uptop.style.bottom = '20px';
    }
    if (!isMobile) {
        if (sc + wh == dh) {
            calc();
            if (!allDone) {

                $preloader.style.display = 'block';
                setTimeout(function () {
                    addPhoto(data, total, true);
                    $preloader.style.display = 'none';
                }, 300)
            }
        }
    } else {
        if (!allDone) {
            $more.style.display = 'block';
            $more.addEventListener('click', function (e) {
                e.preventDefault();

                calc();
                addPhoto(data, total, true);



            });
        } else {
            $more.style.display = 'none';
        }
    }
}


var up = document.getElementById('upToThere');
$uptop.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
        behavior: 'smooth',
        top: up.offsetTop
    });
});