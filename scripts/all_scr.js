function parseSym(str) {
    var newstr = [];
    for(i = 0; i < str.length; i++) {
        switch(str[i]) {
            case '\'':
                newstr += '\\\'';
                break;
            case '\"':
                newstr += '\\\"';
                break;
            case '\<':
                newstr += '\\\<';
                break;
            case '\<':
                newstr += '\\\>';
                break;
            case '\\':
                newstr += '\\\\';
                break;
            case '\{':
                newstr += '\\\{';
                break;
            case '\}':
                newstr += '\\\}';
                break;
            default:
                newstr += str[i];
                break;
        }
        console.log(newstr);
    }
    return newstr;
}