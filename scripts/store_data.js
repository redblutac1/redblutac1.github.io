window.loaded = false;

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

function checkInDB(codeid) {
    $.ajax({
        url:'combined_func_php.php',
        data: {sql:$sql, getval:$getval}
        complete: function (response) {
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