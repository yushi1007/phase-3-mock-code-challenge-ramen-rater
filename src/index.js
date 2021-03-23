// write your code here

const body = document.querySelector('body')
const ramenMenu = body.querySelector('div#ramen-menu')
const url = "http://localhost:3000/ramens"
const ramenInfo = body.querySelector('div#ramen-detail')



const renderRamenImage = ramenObject => {
          
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

        ramenInfo.innerHTML = `      
        <img class="detail-image" src="${ramenObject.image}" alt="${ramenObject.name}" />
        <h2 class="name">${ramenObject.name}</h2>
        <h3 class="restaurant">${ramenObject.restaurant}</h3>`

    const ramenRating = document.querySelector('#ramen-rating')
        ramenRating.rating.value = ramenObject.rating
        ramenRating.comment.value =ramenObject.comment
}


const fetchAllRamen = event => {
        // const ramenId = event.dataset.id

        fetch(url)
            .then(response => response.json())
            .then(ramenObjects => { 
                addRamenToMenu(ramenObjects)
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

fetchAllRamen()