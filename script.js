

document.addEventListener("DOMContentLoaded", function() {
    const text = 'Add your notes....';
    const speed = 150;
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            document.getElementById("typewriter").textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter();
});

let addbtn = document.querySelector('#addbtn');
let container = document.querySelector('.container');

let saveNotes = () => {
    let notes = document.querySelectorAll('.note textarea');
    let data = [];
    notes.forEach((note) => {
        data.push(note.value);
    });
    localStorage.setItem('notes', JSON.stringify(data));
};

let addnote = (text = "") => {
    let note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `
        <div class="tool">
            <i class="save fa-solid fa-floppy-disk"></i>
            <i class="trash fa-solid fa-trash"></i>
        </div>
        <textarea>${text}</textarea>
    `;

    note.querySelector('.trash').addEventListener('click', function() {
        note.remove();
        saveNotes();
    });

    note.querySelector('.save').addEventListener('click', function() {
        saveNotes();
    });

    container.appendChild(note);
    saveNotes();
};

addbtn.addEventListener('click', () => {
    addnote();
});

(function() {
    let notes = localStorage.getItem('notes');
    if (notes) {
        notes = JSON.parse(notes);
        notes.forEach((note) => {
            addnote(note);
        });
    }
})();
