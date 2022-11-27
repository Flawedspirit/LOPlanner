const nonDraggable = [
    "Skyrim.esm",
    "Update.esm",
    "Dawnguard.esm",
    "HearthFires.esm",
    "Dragonborn.esm"
];

$(document).ready(function() {
    $('.draggable').sortable();

    $('ul.droptrue').sortable({
        connectWith: "ul"
    });

    $('ul.dropfalse').sortable({
        connectWith: "ul",
        dropOnEmpty: true
    });

    $('.cards').disableSelection();

    if(!localStorage.getItem('cards')) {
        $('#load-btn').attr('disabled', true);
    }

    $('#update-btn').click(function() {
        localStorage.setItem('cards', $('#source-field').val().trim());
        $('#load-btn').attr('disabled', false);
        const cards = $('#source-field').val().trim().split('\n');

        if(localStorage.getItem('cards')) {
            $('#source-field').attr('disabled', false);
        }

        $('.draggable').empty();
        for(i = 0; i < cards.length; i++) {
            if(cards[i].length != 0) {
                if(!nonDraggable.includes(cards[i])) {
                    $('#mods').append('<li class="card ui-state-default" data-value="' + cards[i] + '">' + cards[i] + '</li>');
                }
            }
        }
    });

    $('#load-btn').click(function() {
        $('#source-field').val(localStorage.getItem('cards'));
    });

    $('#save-btn').click(function() {
        let out = [];
        out = out.concat(nonDraggable);
        console.log(out);

        $('#mods li').each(function() {
            let modLine = $(this).attr('data-value');
            out.push(modLine);
        });

        $('#out-field').val(out.join('\n'));
    });
});
