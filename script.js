/*================================
    GLOBAL - Hamburger-meny
 ================================ */
document.addEventListener('DOMContentLoaded', () => {
    const menyKnapp = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menyKnapp && navLinks) {
        menyKnapp.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    /*================================
        SCHEMA.HTML - Kursval & Drag-and-drop
     ================================ */
    const program = document.getElementById('program');
    const year = document.getElementById('year');
    const grid = document.getElementById('courseGrid');

    if (program && year && grid) {

        const courses = {
            ekonomi: {
                1: ['Företagsekonomi', 'Matematik 1b', 'Svenska 1/SVA1', 'Engelska 5', 'Idrott och hälsa 1', 'Historia 1b', 'Juridik'],
                2: ['Samhällskunskap 1b', 'Matematik 2b', 'Naturkunskap 1b', 'Svenska 2/SVA2', 'Engelska 6', 'Psykologi 1a', 'Religionskunskap 1', 'Entreprenörskap', 'Marknadsföring', 'Moderna språk 4', 'Psykologi 2a/2b'],
                3: ['Samhällskunskap 2', 'Matematik 3b', 'Gymnasiearbete', 'Svenska 3/SVA3', 'Engelska 7', 'Filosofi 1a', 'Internationell ekonomi', 'Affärsjuridik', 'Redovisning 2', 'Rätten och samhället', 'Ledarskap och organisation']
            },
            teknik: {
                1: ['Matematik 1c', 'Matematik 2c', 'Fysik 1a', 'Svenska 1/SVA1', 'Engelska 5', 'Idrott och hälsa 1', 'Teknik 1', 'Kemi 1', 'Samhällskunskap 1b'],
                2: ['Matematik 3c', 'Matematik 4', 'Fysik 1a', 'Fysik 2', 'Svenska 2/SVA2', 'Engelska 6', 'Teknik 2', 'Kemi 2', 'Webbutveckling 1', 'Programmering 1', 'Design 1', 'CAD 1', 'Arkitektur', 'Hållbart samhällsbyggande', 'Produktionsmetoder 1', 'Tillämpad programmering'],
                3: ['Matematik 5', 'Svenska 3/SVA3', 'Engelska 7', 'Gymnasiearbete', 'Religionskunskap 1', 'Historia 1b', 'Fysik 2', 'Fysik 3', 'Kemi 2', 'Moderna språk 4'],
            },
            samhalle: {
                1: ['Matematik 1b', 'Svenska 1/SVA1', 'Engelska 5', 'Idrott och hälsa 1', 'Historia 1b', 'Samhällskunskap 1b', 'Moderna språk 4'],
                2: ['Matematik 2b', 'Svenska 2/SVA2', 'Engelska 6', 'Psykologi 1', 'Religionskunskap 1', 'Geografi 1', 'Samhällskunskap 2', 'Historia 2a', 'Psykologi 2a', 'Sociologi', 'Ledarskap och organisation', 'Medieproduktion 1', 'Medieproduktion 2', 'Journalistik, reklam och information 1', 'Kriminologi', 'Fotografisk bild 1'],
                3: ['Svenska 3/SVA3', 'Engelska 7', 'Gymnasiearbete', 'Filosofi 1', 'Religionskunskap 2', 'Kommunikation', 'Fördjupad kriminologi', 'Samhällskunskap 3', 'Internationella relationer', 'Etnicitet och kulturmöten', 'Humanistisk och samhällsvetenskaplig specialisering']
            },
            natur: {
                1: ['Matematik 1c', 'Matematik 2c', 'Svenska 1/SVA1', 'Engelska 5', 'Idrott och hälsa 1', 'Kemi 1', 'Biologi 1', 'Samhällskunskap 1b', 'Moderna språk 4'],
                2: ['Matematik 3c', 'Matematik 4', 'Svenska 2/SVA2', 'Engelska 6', 'Fysik 1a', 'Historia 1a1', 'Biologi 2', 'Kemi 2', 'Fysik 2', 'Geografi 1', 'Samhällskunskap 2', 'Moderna språk 4', 'Bioteknik', 'Programmering 1'],
                3: ['Matematik 5', 'Svenska 3/SVA3', 'Engelska 7', 'Gymnasiearbete', 'Filosofi 1a', 'Psykologi 1', 'Kemi 2', 'Fysik 2', 'Miljö- och energikunskap', 'Naturvetenskaplig specialisering']
            }
        };

        /* Håller reda på vilken kurs som dras */
        let draggedCourse = null;

        /* Renderar kurskorten baserat på valt program och årskurs */
        function renderCourses() {
            grid.innerHTML = '';
            const p = program.value;
            const y = year.value;

            if (!p || !y) return;

            courses[p][y].forEach(courseName => {
                const div = document.createElement('div');
                div.className = 'course';
                div.draggable = true;
                div.innerHTML = `<h3>${courseName}</h3><p>Klicka eller dra till schemat</p>`;

                /* Klick - markera/avmarkera kursen */
                div.addEventListener('click', () => {
                    div.classList.toggle('selected');
                });

                /* Drag start - spara kursnamnet */
                div.addEventListener('dragstart', (e) => {
                    draggedCourse = courseName;
                    /* setData krävs av vissa webbläsare för att drag ska fungera */
                    e.dataTransfer.setData('text/plain', courseName);
                    e.dataTransfer.effectAllowed = 'copy';
                    div.classList.add('dragging');
                });

                /* Drag end - ta bort dragging-klassen */
                div.addEventListener('dragend', () => {
                    div.classList.remove('dragging');
                });

                grid.appendChild(div);
            });
        }

        program.addEventListener('change', renderCourses);
        year.addEventListener('change', renderCourses);

        /*================================
            Drag-and-drop till tabellen
         ================================ */
        const tableDropCells = document.querySelectorAll('td[contenteditable="true"]');

        tableDropCells.forEach(cell => {

            cell.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'copy';
                cell.classList.add('drop-target');
            });

            cell.addEventListener('dragleave', () => {
                cell.classList.remove('drop-target');
            });

            cell.addEventListener('drop', (e) => {
                e.preventDefault();
                cell.classList.remove('drop-target');

                /* Hämta kursnamn antingen från variabeln eller dataTransfer */
                const kurs = draggedCourse || e.dataTransfer.getData('text/plain');
                if (!kurs) return;

                const tag = document.createElement('span');
                tag.className = 'course-tag';
                tag.textContent = kurs;

                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-tag';
                removeBtn.textContent = '×';
                removeBtn.setAttribute('aria-label', `Ta bort ${kurs}`);
                removeBtn.addEventListener('click', () => tag.remove());

                tag.appendChild(removeBtn);
                cell.appendChild(tag);
                draggedCourse = null;
            });
        });
    }

    /*================================
        KONTAKT.HTML - Formulärvalidering
     ================================ */
    const formulär = document.getElementById('kontaktFormulär');

    if (formulär) {

        /* Hjälpfunktion: visa eller dölj ett felmeddelande */
        function visaFel(fältId, felId, skaVisas) {
            const fält = document.getElementById(fältId);
            const felText = document.getElementById(felId);
            if (skaVisas) {
                fält.classList.add('fel');
                felText.classList.add('synlig');
            } else {
                fält.classList.remove('fel');
                felText.classList.remove('synlig');
            }
        }

        /* Validerar e-postformat med regex */
        function giltigEpost(epost) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(epost);
        }

        /* Validerar hela formuläret, returnerar true om allt är ok */
        function valideraFormulär() {
            const epost = document.getElementById('epost').value.trim();
            const arende = document.getElementById('arende').value;
            const arenderad = document.getElementById('arenderad').value.trim();
            const meddelande = document.getElementById('meddelande').value.trim();

            let alltOk = true;

            if (!giltigEpost(epost)) {
                visaFel('epost', 'epost-fel', true);
                alltOk = false;
            } else {
                visaFel('epost', 'epost-fel', false);
            }

            if (!arende) {
                visaFel('arende', 'arende-fel', true);
                alltOk = false;
            } else {
                visaFel('arende', 'arende-fel', false);
            }

            if (arenderad.length < 3) {
                visaFel('arenderad', 'arenderad-fel', true);
                alltOk = false;
            } else {
                visaFel('arenderad', 'arenderad-fel', false);
            }

            if (meddelande.length < 10) {
                visaFel('meddelande', 'meddelande-fel', true);
                alltOk = false;
            } else {
                visaFel('meddelande', 'meddelande-fel', false);
            }

            return alltOk;
        }

        formulär.addEventListener('submit', (e) => {
            e.preventDefault();
            if (valideraFormulär()) {
                formulär.style.display = 'none';
                document.getElementById('bekraftelse').classList.add('synlig');
            }
        });

        /* Validera i realtid när användaren lämnar ett fält */
        document.getElementById('epost').addEventListener('blur', () => {
            const epost = document.getElementById('epost').value.trim();
            visaFel('epost', 'epost-fel', !giltigEpost(epost) && epost !== '');
        });

        document.getElementById('arenderad').addEventListener('blur', () => {
            const val = document.getElementById('arenderad').value.trim();
            visaFel('arenderad', 'arenderad-fel', val.length > 0 && val.length < 3);
        });

        document.getElementById('meddelande').addEventListener('blur', () => {
            const val = document.getElementById('meddelande').value.trim();
            visaFel('meddelande', 'meddelande-fel', val.length > 0 && val.length < 10);
        });

        /*================================
            OpenStreetMap - Leaflet karta
         ================================ */
        const avaKoordinater = [59.4439, 18.0686];

        const karta = L.map('karta').setView(avaKoordinater, 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(karta);

        L.marker(avaKoordinater)
            .addTo(karta)
            .bindPopup('<strong>Åva Gymnasium</strong><br>Täby')
            .openPopup();
    }
});