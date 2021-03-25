// write your code here
const ramenMenu = document.querySelector('div#ramen-menu')
// Why we don't need the 'div#ramen-rating'
const ramenRating = document.querySelector('#ramen-rating')
const form = document.querySelector('form#new-ramen')
// 1
fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramenImages => {

        const ramenMenu = document.querySelector('div#ramen-menu')

        ramenImages.forEach(ramenImage => {
        const img = document.createElement('img')        
        img.src = ramenImage.image
        img.alt = ramenImage.name
        // make sure find id
        img.dataset.id = ramenImage.id
        ramenMenu.append(img)
    })
})

// 2
ramenMenu.addEventListener('click', event => {
    
    if (event.target.matches('img')) {

            

            fetch(`http://localhost:3000/ramens/${event.target.dataset.id}`)
                .then(response => response.json())
                .then(ramenInfo => {

                    const ramenDetails = document.querySelector('div#ramen-detail')
                    const img = ramenDetails.querySelector('img')
                    img.src = ramenInfo.image
                    img.alt = ramenInfo.name

                    const h2 = ramenDetails.querySelector('h2.name')
                    h2.textContent = ramenInfo.name

                    const h3 = ramenDetails.querySelector('h3.restaurant')
                    h3.textContent = ramenInfo.restaurant

                    ramenRating.dataset.id = ramenInfo.id
                    ramenRating.rating.value = ramenInfo.rating
                    ramenRating.comment.value = ramenInfo.comment
                })
    }
})
// 3
ramenRating.addEventListener('submit', e => {
    e.preventDefault()

    const rating = e.target.rating.value
    const comment = e.target.comment.value

    fetch(`http://localhost:3000/ramens/${e.target.dataset.id}`, {
        method: 'PATCH',
        headers:{       
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            rating: rating, 
            comment: comment
        })
    })
        .then(response => response.json())
        .then(newRating => (newRating))

})

// 4
fetch('http://localhost:3000/ramens/1')
.then(response => response.json())
.then(ramenLoad => {
    const ramenDetails = document.querySelector('div#ramen-detail')
    const img = ramenDetails.querySelector('img')
    img.src = ramenLoad.image
    img.alt = ramenLoad.name

    const h2 = ramenDetails.querySelector('h2.name')
    h2.textContent = ramenLoad.name

    const h3 = ramenDetails.querySelector('h3.restaurant')
    h3.textContent = ramenLoad.restaurant

    ramenRating.dataset.id = ramenLoad.id
    ramenRating.rating.value = ramenLoad.rating
    ramenRating.comment.value = ramenLoad.comment
})

// 5 

form.addEventListener('submit', e => {
    e.preventDefault()

    const name = e.target.name.value
        const restaurant = e.target.restaurant.value
        const image = e.target.image.value
        const rating = e.target.rating.value
        const comment = e.target["new-comment"].value

        const newRamenObject = {
            name, restaurant, image, rating, comment           
        }
            
        fetch('http://localhost:3000/ramens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newRamenObject)
        })
        .then(response => response.json())
        .then(newInfo => (newInfo))
        
           e.target.reset() 
})

