
/*================================
    INDEX.HTML JavaScript
 ================================ */
document.addEventListener('DOMContentLoaded', () => {
    const menyKnapp = 
    document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    menyKnapp.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});

document
.querySelectorAll('.nav-links a')
.forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

/*================================
    SCHEMA.HTML JavaScript
 ================================ */
 const program = document.getElementById('program');
 const year = document.getElementById('year');
 const grid = document.getElementById('courseGrid');

 if(program && year && grid){
    const courses = {
        ekonomi: {
            1: ['Företagsekonomi', 'Matematik 1b', 'Svenska 1/SVA1', 'Engelska 5', 'Idrott och hälsa 1', 'Historia 1b', 'Jurdik'],
            2: ['Samhällskunskap 1b', 'Matematik 2b', 'Naturkunskap 1b', 'Svenska 2/SVA2', 'Engelska 6', 'Psykologi 1a', 'Religionskunskap 1', 'Entrepenörskap', 'Marknadsföring', 'Moderna språk 4', 'Psykologi 2a/2b'],
            3: ['Samhällskunskap 2', 'Matematik 3b', 'Gymnasiearbete', 'Svenska 3/SVA3', 'Engelska 7', 'Filosofi 1a', 'Internationell ekonomi', 'Äffärsjuridik', 'Engelska 7', 'Redovisning 2', 'Rätten och samhället', 'Ledarskap och organisation']
 },
        teknik: {
            1: ['Matematik 1c', 'Matematik 2c', 'Fysik 1a', 'Svenska 1/SVA1', 'Engelska 5', 'Idrott och hälsa 1','Teknik 1', 'Kemi 1', 'samhällskunskap 1b'],
            2: ['Matematik 3c', 'Matematik 4', 'Fysik 1a', 'Fysik 2', 'Svenska 2/SVA2', 'Engelska 6', 'Teknik 2', 'Kemi 2', 'Webbutveckling 1', 'Programmering 1', 'Design 1','CAD 1', 'Artitektur', 'Hållbart samhällsbyggande', 'Produktionsmetoder 1', 'Tillämpad programmering/Spelprogrammering'],
            3: ['Matematik 5', 'Svenska 3/SVA3', 'Engelska 7', 'Gymnasiearbete', 'Religionskunskap 1', 'Historia 1b', 'Fysik 2', 'Fysik 3', 'Kemi 2', 'Moderna språk 4'],
        },
        samhälle: { 
            1:['Matematik 1b', 'Svenska 1/SVA1', 'Engelska 5', 'Idrott och hälsa 1', 'Historia 1b', 'Samhällskunskap 1b', 'Moderna språk 4'],
            2:['Matematik 2b', 'Svenska 2/SVA2', 'Engelska 6', 'Psykologi 1', 'Religionskunskap 1', 'Geografi 1', 'Samhällskunskap 2', 'Historia 2a', 'Psykologi 2a','Sociologi', 'Ledarskap och organisation', 'Medieproduktion 1', 'Medieproduktion 2', 'Journalistik, reklam och information 1', 'Kriminologi/Rätten och samhället','Fotografisk bild 1'],
            3:['Svenska 3/SVA3', 'Engelska 7', 'Gymnasiearbete', 'Filosofi 1', 'Religionskunskap 2', 'Kommunikation','Fördjupad kriminologi', 'Samhällskunskap 3', 'Internationella relationer', 'Etnicitet och kulturmöten', 'Humanistisk och samhällsvetenskaplig specialisering']
        },
        natur: {
            1:['Matematik 1c', 'Matematik 2c', 'Svenska 1/SVA1', 'Engelska 5', 'Idrott och hälsa 1','Kemi 1', 'Biologi 1', 'Samhällskunskap 1b','Moderna språk 4'],
            2:['Matematik 3c', 'Matematik 4', 'Svenska 2/SVA2', 'Engelska 6','Fysik 1a', 'Historia 1a1', 'Biologi 2', 'Kemi 2', 'Fysik 2', 'Geografi 1', 'Samhällskunskap 2', 'Moderna språk 4', 'Bioteknik', 'Programmering 1'],
            3:['Matematik 5', 'Svenska 3/SVA3', 'Engelska 7', 'Gymnasiearbete', 'Filosofi 1a', 'Psykologi 1', 'Kemi 2', 'Fysik 2', 'Miljö- och energikunskap','Naturvetenskaplig specialisering']
            }
    };
    function renderCourses(){
        grid.innerHTML = '';
        const p= program.value;
        const y = year.value;
        if(!p||!y){
        return;
        }
        courses[p][y].forEach(course => {
            const div = document.createElement('div');
            div.className = 'course';
            div.innerHTML = `<h3>${course}</h3> <p> Klicka för att lägga till</p>`;
            div.addEventListener('click', () => {
                div.classList.toggle('selected');
            });
            grid.appendChild(div);
        });
    }
    program.addEventListener('change', renderCourses);
    year.addEventListener('change', renderCourses);
        
}

