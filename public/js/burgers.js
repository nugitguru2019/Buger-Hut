/* HTML Variables */



const submitBtn = document.querySelector(`#submit`);

const devourBtns = document.querySelectorAll(`.devour`);

const burgerInput = document.querySelector(`#burger-name`);



/* Click Functions */



function handleSubmit(event) {

    event.preventDefault();



    const burgerName = burgerInput.value.trim()



    if(!burgerName) {

        burgerInput.placeholder = `Please submit a valid burger order`;

        // Borrowed from the following source to edit pseudoclasses in vanilla JS: https://stackoverflow.com/questions/311052/setting-css-pseudo-class-rules-from-javascript

        document.styleSheets[0].insertRule('#burger-name::placeholder { color: red; }', 0);

    } else if(burgerName.length > 50) {

        burgerInput.value = ``;

        burgerInput.placeholder = `The burger order you've submitted is too long`;

        document.styleSheets[0].insertRule('#burger-name::placeholder { color: red; }', 0);

    } else {

        burgerInput.placeholder = `Describe your burger here`;

        document.styleSheets[0].insertRule('#burger-name::placeholder { color: gray; }', 0);



        const data = {

            name: burgerInput.value.trim()

        };

	

        axios

            .post(`/api/burgers`, data)

            .then(result => {

                console.log(`Burger added!`);

                location.reload();

            })

            .catch(err => {

                console.log(err);

            });

    }

}



function handleDevour(event) {

    event.preventDefault();



    const id = this.dataset.id;



    axios

        .put(`/api/burgers/${id}`)

        .then(result => {

            console.log(`Burger eaten!`);

            location.reload();

        })

        .catch(err => {

            console.log(err);

        });

}



/* Function calls */



submitBtn.addEventListener(`click`, handleSubmit);

devourBtns.forEach(btn => btn.addEventListener(`click`, handleDevour));