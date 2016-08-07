 var a

function tts()
{
    console.log("hello");
    speak(a);
}

function replaceString(oldS, newS, fullS) {
    for (var i = 0; i < fullS.length; i++) {
        if (fullS.substring(i, i + oldS.length) == oldS) {
            fullS = fullS.substring(0, i) + newS + fullS.substring(i + oldS.length, fullS.length);
        }
    }
    return fullS;
}
                
function filterString(s)
{
    for (var i = 0; i < s.length; i++)
    {
        var pos1 = s.indexOf('<');  
        var pos2 = s.indexOf('>'); 
        if(pos1!=-1&&pos2!=-1)
        {
            if(pos1!=0&&pos2!=s.length-1)
                s = s.replace(s.substring(pos1, pos2+1), "");
            else
            {
                if(pos1==0&&pos2!=s.length-1)
                    s = s.replace(s.substring(pos1, pos2+1), "");
                else
                    s = s.replace(s.substring(pos1, pos2), "");
            }
        }
    }
    return s;
}

function getText()
{
    //alert("hella");
    var myString = document.getElementById("searchInput").value;
    $(document).ready(function(){
 
        $.ajax({
            type: "GET",
            url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page="+myString+"&callback=?&redirects=1",
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
 
                var markup = data.parse.text["*"];
                var blurb = $('<div></div>').html(markup);
                            
                // remove links as they will not work
                blurb.find('a').each(function() {
                    $(this).replaceWith($(this).html());
                });
 
                // remove any references
                blurb.find('sup').remove();
                            
                // remove cite error
                blurb.find('.mw-ext-cite-error').remove();
                $('#article').html($(blurb).find('p'));
                            
                a=document.getElementById('article').innerHTML;
                            
                a=replaceString("<p>",'', a);
                a=replaceString("</p>",'', a);
                a=replaceString("<b>",'', a);
                a=replaceString("</b>",'', a);
                a=replaceString("<i>",'', a);
                a=replaceString("</i>",'', a);
                a=replaceString("<br>",'', a);
                           
                a=filterString(a);
 
            },
            error: function (errorMessage) {
            }
        });
    });
}