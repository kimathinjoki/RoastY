//urls
//1. Random meal

const randomMeal = 'https://www.themealdb.com/api/json/v1/1/random.php'

//2.meal categories
const mealCategories = 'https://www.themealdb.com/api/json/v1/1/categories.php'

//ROW DATA
const randomMealRow =  document.getElementById('random-meal')
const mealCategoryRow = document.getElementById('meal-categories')
const countriesRow = document.getElementById('meals-countries')

//link data
const categoryLink = document.getElementById('categories-link')
const countryLink = document.getElementById('countries-link')

//click events for links
categoryLink.addEventListener('click',()=>{
    //hide random meal
    randomMealRow.style.display = 'none'
    // jide countries
    countriesRow.style.display = "none"
    // show categories
    mealCategoryRow.removeAttribute('hidden')
    mealCategoryRow.style.display = "flex"
})

countryLink.addEventListener('click',()=>{
    //hide random meal
    randomMealRow.style.display = 'none'
    //hide categories
    mealCategoryRow.style.display = 'none'
    //show countries
    countriesRow.removeAttribute('hidden')
    countriesRow.style.display = 'flex'
})



document.addEventListener("DOMContentLoaded",()=>{

    //create random meal element
    const createRandomMeal = (image, name, description)=>{
        const cardDiv =document.createElement('div')
        cardDiv.classList.add('card', 'col-12')

        const rowDiv = document.createElement('div')
        rowDiv.classList.add('row')

        const imgDiv =document.createElement('div')
        imgDiv.classList.add('col-6')

        const bodyDiv = document.createElement('div')
        bodyDiv.classList.add('col-6', 'card-body')

        const mealImg = document.createElement('img')
        mealImg.classList.add('card-img')
        mealImg.src = image

        const mealTitle = document.createElement('h5')
        mealTitle.classList.add('card-title')
        mealTitle.innerText = name

        const mealDescription = document.createElement('p')
        mealDescription.classList.add('card-test')
        mealDescription.innerText = description

        //append body elements
        bodyDiv.appendChild(mealTitle)
        bodyDiv.appendChild(mealDescription)

        //append image elements
        imgDiv.appendChild(mealImg)

        //append divs to row
        rowDiv.appendChild(imgDiv)
        rowDiv.appendChild(bodyDiv)

        //append to row card
        cardDiv.appendChild(rowDiv)


        return cardDiv






    }



    //load element by category
     const createCategory = (image, name)=>{

        const cardDiv = document.createElement('div')
        cardDiv.classList.add('card', 'col-4')

        const categoryImg = document.createElement('img')
        categoryImg.classList.add('card-img-top')
        categoryImg.src = image

        const categoryTitle =document.createElement('h4')
        categoryTitle.classList.add('card-title')
        categoryTitle.innerTextc = name


        cardDiv.appendChild(categoryImg)
        cardDiv.appendChild(categoryTitle)

        return cardDiv
     }

    // document.getElementById('random-meal').appendChild(
    //     createRandomMeal('meal.jpg', 'mlo', 'kenyan dish at you display')
    // )

    //load random meal
    const loadRandomMeal = ()=>{
        fetch(randomMeal)
            .then(response => response.json())
            .then(data =>{
                const mealData = data.meals[0]
                console.log(mealData)
                const meal = mealData.strMeal
                const description = mealData.strInstructions
                const image = mealData.strMealThumb
                const mealElement = createRandomMeal(image,meal,description)
                randomMealRow.appendChild(mealElement)

            })

    }


    //load meal categories
    const loadMealCategories = ()=>{
        fetch(mealCategories)
            .then(response => response.json())
            .then(data =>{
                const categoriesData = data.categories
                const categoryElems = categoriesData.map(
                    cat => createCategory(cat.strCategoryThumb,cat.strCategory)
                )
                mealCategoryRow.append(...categoryElems)


            })
    }
    loadMealCategories()
    loadRandomMeal()

})