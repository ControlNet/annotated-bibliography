(function($) {
    function renderBibTex(data) {
        const fullAbsRe = /\tabstract = {.+?},/;
        data = data.split("\n").filter(row => !row.match(fullAbsRe)).join("\n")
        $("#bibtex_input").val(data);
        console.log(`My Library.bib Loaded: ${data.length}`)
    }

    $.get('/data/My Library.bib', renderBibTex).then(() => {
        $.getScript("https://cdn.jsdelivr.net/gh/pcooksey/bibtex-js@1.0.0/src/bibtex_js.js");
    });

})(jQuery);