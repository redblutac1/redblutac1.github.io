window.mode = "HTML";

window.loaded = false;

document.getElementById('htmllogo').style.cursor = 'pointer';
document.getElementById('pythonlogo').style.cursor = 'pointer';

document.getElementById('tasklist').style.cursor = 'pointer';

languagePluginLoader.then(() => {
    console.log(pyodide.runPython('import sys\nsys.version'));
});

function getTask(task) {
    task = task || "none";
    if(task === "Start collaborating"){
        TogetherJS(this);
        return false;
    }
    else if(task === "Run") {
        runit();
    }
    else if(task === "Save") {
        checkInDB(89320);
    }
}

function exposeBanner() {
    var banner = document.getElementById("newlang");
    var htmllogo = document.getElementById("htmllogo");
    banner.style.height = '100px';
    htmllogo.style.height = '70px';
    htmllogo.style.width = '157px';
    var pythonlogo = document.getElementById("pythonlogo");
    pythonlogo.style.height = '70px';
    pythonlogo.style.width = '187px';
}

function hideBanner() {
    var banner = document.getElementById("newlang");
    var htmllogo = document.getElementById("htmllogo");
    banner.style.height = '10px';
    htmllogo.style.height = '0px';
    htmllogo.style.width = '0px';
    var pythonlogo = document.getElementById("pythonlogo");
    pythonlogo.style.height = '0px';
    pythonlogo.style.width = '0px';
}

function updateLang(hover,click) {
    hover = hover || "none";
    click = click || 'none';
    var HTMLlogo = document.getElementById('htmllogo');
    var pythonlogo = document.getElementById('pythonlogo');
    if(click === 'HTML') {
        window.mode = 'HTML';
        pythonlogo.src = '../images/pythonlogoblack.png'
        closePyWin();
    }
    else if(click === 'Python') {
        window.mode = 'Python';
        HTMLlogo.src = '../images/htmllogoblack.png';
        openPyWin();
    }
    if(window.mode === 'HTML') {
        HTMLlogo.src = '../images/htmllogowhite.png';
        pythonlogo.src = '../images/pythonlogoblack.png';
        if(hover === 'Python') {
            pythonlogo.src = '../images/pythonlogowhite.png';
        }
    }
    else {
        HTMLlogo.src = '../images/htmllogoblack.png';
        pythonlogo.src = '../images/pythonlogowhite.png';
        if(hover === 'HTML') {
            htmllogo.src = '../images/htmllogowhite.png';
        }
    }
}

function sendQuery(conn, sql, getVal) {
    $.post('../scripts/sendQuery.php', { conn: conn, sql: sql, getVal: true }, function(result) {
        console.log(result);
        return result;
    });
}

function closeConnection(conn) {
    $.post('../scripts/closeConnection.php', { conn: conn }, function(result) {
            console.log(result);
    });
}

function checkInDB($sql,$getVal) {
    $.ajax({
        url:'combined_func_php.php',
        data: {$sql:$sql, $getVal:$getVal},
        success: function (response) {
            $('#output').html(response.responseText);
        },
        error: function () {
            $('#output').html('Bummer: there was an error!');
        }
    });
    return false;
}
/*
    var sql = "SELECT EXISTS(SELECT * FROM codes WHERE codeid=" + codeid.toString() + ")"
    $.post('../scripts/sendQuery.php', { conn: window.connection, sql: sql, getVal: true }, function(result) {
        console.log(result);
        return result;
    });
}
*/

function show() {
    var src = document.getElementById('src').value;
    var newsrc = src;
    if(newsrc.includes('<script')) {
        if(/<script((\S|\s)*?)\/>/.test(newsrc)) {
            newsrc = newsrc.replace(/<script((\S|\s)*?)\/>/,'');
        }
        else if(/<script((\S|\s)*?)<\/script>/.test(newsrc)) {
            newsrc = newsrc.replace(/<script((\S|\s)*?)<\/script>/,'');
        }
    }
    document.getElementById('output').srcdoc = newsrc;
}

function outf(text) { 
    var mypre = document.getElementById("pre"); 
    mypre.innerHTML = mypre.innerHTML + text; 
} 
function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}
function runit() { 
    var prog = document.getElementById("src").value;
    var mypre = document.getElementById("pre");
    mypre.innerHTML = ''; 
    Sk.output = "pre";
    Sk.configure({output:outf, read:builtinRead, __future__:Sk.python3}); 
    (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'drawing';
    var myPromise = Sk.misceval.asyncToPromise(function() {
        return Sk.importMainWithBody("<stdin>", false, prog, true);
    });
    myPromise.then(function(mod) {
        console.log('success');
    },
        function(err) {
        console.log(err.toString());
    });
} 

function resIframe() {
    document.getElementById('output').srcdoc = '';
}

function openPyWin() {
    var ifr = document.getElementById("output");
    var pre = document.getElementById('pre');
    var canvas = document.getElementById("drawing");
    ifr.style.height = '0px';
    ifr.style.width = '0px';
    pre.style.height = '200px';
    pre.style.width = '45%';
    canvas.style.height = '200px';
    canvas.style.width = '45%';
}

function closePyWin() {
    var ifr = document.getElementById("output");
    var pre = document.getElementById('pre');
    var canvas = document.getElementById("drawing");
    ifr.style.height = '500px';
    ifr.style.width = '45%';
    pre.style.height = '0px';
    pre.style.width = '0px';
    canvas.style.height = '0px';
    canvas.style.width = '0px';
}

function showLang() {
    var langdiv = document.getElementById("language");
    langdiv.style.height = '60px';
}

function hideLang() {
    var langdiv = document.getElementById("language");
    langdiv.style.height = '25px';
}

function exeCode() {
    if(window.mode == "HTML") {
        show();
    }
    else if(window.mode == "Python"){
        openPyWin();
    }
}