document.addEventListener("DOMContentLoaded", function(event) {

  const monsterContainer = document.querySelector('#monster-container')
  const forwardButton = document.querySelector('#forward')
  const backButton = document.querySelector('#back')
  const monsterForm = document.querySelector('#monster-form')

  let pageNum = 1

  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`, { method: "GET"})
    .then(function(response) {
      return response.json()
    })
    .then(function(monsters){
      return monsters.forEach(function(monster) {
        monsterContainer.innerHTML += `
          <div>
            <h3>${monster.name}</h3>
            <p>${monster.age}</p>
            <p>${monster.description}</p>
          </div>
        `
      })
    })

  monsterForm.addEventListener("submit", function(e){
    // e.preventDefault()
    const monsterName = e.target.querySelector("#name").value
    const monsterAge = e.target.querySelector("#age").value
    const monsterDescription = e.target.querySelector("#description").value
    fetch('http://localhost:3000/monsters/', {
      method: "POST",

      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

      body:
        JSON.stringify({
        "name": monsterName,
        "age": parseFloat(monsterAge),
        "description": monsterDescription
      })

    })

  })

  forwardButton.addEventListener("click", function(e){
    pageNum += 1
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`, { method: "GET"})
      .then(function(response) {
        return response.json()
      })
      .then(function(monsters){
        monsterContainer.innerHTML = ""
        return monsters.forEach(function(monster) {
          monsterContainer.innerHTML += `
            <div>
              <h3>${monster.name}</h3>
              <p>${monster.age}</p>
              <p>${monster.description}</p>
            </div>
          `
        })
      })
    })

    backButton.addEventListener("click", function(e){
      if (pageNum > 1) {
        pageNum -= 1
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`, { method: "GET"})
          .then(function(response) {
            return response.json()
          })
          .then(function(monsters){
            monsterContainer.innerHTML = ""
            return monsters.forEach(function(monster) {
              monsterContainer.innerHTML += `
                <div>
                  <h3>${monster.name}</h3>
                  <p>${monster.age}</p>
                  <p>${monster.description}</p>
                </div>
              `
            })
          })
        }
      })


})
