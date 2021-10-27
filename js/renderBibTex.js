(function($) {
    function renderBibTex(data) {
        const fullAbsRe = /\tabstract = {.+?},/;
        data = data.split("\n").filter(row => !row.match(fullAbsRe)).join("\n")
        $("#bibtex_input").val(data);
    }

    $.get('/data/My Library.bib', renderBibTex);
})(jQuery);