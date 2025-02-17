// write your code here

const body = document.querySelector('body')
const ramenMenu = body.querySelector('div#ramen-menu')
const url = "http://localhost:3000/ramens"
const ramenInfo = body.querySelector('div#ramen-detail')
const ramenRating = document.querySelector('#ramen-rating')



const renderRamenImage = ramenObject => {

        ramenRating.dataset.id = ramenObject.id
        
        ramenMenu.innerHTML +=
         `<img class="detail-image" src="${ramenObject.image}" alt="${ramenObject.name}" data-id=${ramenObject.id}/>`
}

const addRamenToMenu = ramenObject => {
    ramenMenu.innerHTML = ""
    ramenObject.forEach(ramen => {
        renderRamenImage(ramen)
    })
}

const renderRamenInfo = ramenObject => {
        //ramenInfo.dataset.id = ramenObject.id
        console.log(ramenObject.id)
        ramenInfo.innerHTML = `      
        <img class="detail-image" src="${ramenObject.image}" alt="${ramenObject.name}" />
        <h2 class="name">${ramenObject.name}</h2>
        <h3 class="restaurant">${ramenObject.restaurant}</h3>`
        ramenRating.dataset.id = ramenObject.id
        ramenRating.rating.value = ramenObject.rating
        ramenRating.comment.value =ramenObject.comment
}

const ramenOnLoad = oneRamen => {

    ramenInfo.innerHTML = `      
    <img class="detail-image" src="${oneRamen.image}" alt="${oneRamen.name}" />
    <h2 class="name">${oneRamen.name}</h2>
    <h3 class="restaurant">${oneRamen.restaurant}</h3>`
    
    ramenRating.dataset.id = oneRamen.id
    ramenRating.rating.value = oneRamen.rating
    ramenRating.comment.value = oneRamen.comment   

} 

const fetchAllRamen = event => {
        // const ramenId = event.dataset.id

        fetch(url)
            .then(response => response.json())
            .then(ramenObjects => { 
                addRamenToMenu(ramenObjects)
                ramenOnLoad(ramenObjects[0])
                })

}


const fetchOneRamen = event => {
    const ramenId = event.dataset.id

    fetch(`${url}/${ramenId}`)
        .then(response => response.json())
        .then(ramenInfo => { 
            renderRamenInfo(ramenInfo)
            })

}

ramenMenu.addEventListener('click', event => {
    if (event.target.matches('img')) {
        fetchOneRamen(event.target)
    }
})

// const form = document.querySelector('form#ramen-rating')
ramenRating.addEventListener('submit', event => {
    event.preventDefault()

    const ramenId = event.target.dataset.id
    const rating = event.target.rating.value
    const comment = event.target.comment.value

    const newRamenInfo = {
        rating,
        comment
    }
    fetch(`${url}/${ramenId}`,{ 
        
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(newRamenInfo)
    })
            .then(response => response.json())
            .then(newInfo => (newInfo))
})

fetchAllRamen()

const collectNewInfo = event => {
    event.preventDefault()

        const name = event.target.name.value
        const restaurant = event.target.restaurant.value
        const image = event.target.image.value
        const rating = event.target.rating.value
        const comment = event.target["new-comment"].value

        const newRamenObject = {
            name, restaurant, image, rating, comment           
        }
            
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newRamenObject)
        })
        .then(response => response.json())
        .then(newInfo => {
            renderRamenInfo(newInfo)
            addRamenToMenu(newInfo) 
        })
           event.target.reset() 
}

const form = document.querySelector('form#new-ramen')

form.addEventListener('submit', collectNewInfo)


    
