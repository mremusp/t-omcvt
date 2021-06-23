const apiUrl = ('http://www.mocky.io/v2/58fda6ce0f0000c40908b8c8')
const articlesPerPage = 5
const listContainer = document.querySelector('.articles')
let articles = []

fetch(apiUrl)
  .then(res => {
    if (res.ok) {
      console.log('success')
    } else {
      console.log('no success')
    }
    return res.json()
  })
  .then(data => {
    let pageNumber = 1
    let activePage = 0

    articles = data.news
    pageNumber = Math.ceil(data.news.length / articlesPerPage);
    let pages = []
    for(i = 0; i < pageNumber; i++) {
      let paginationButton = document.createElement('button')
      paginationButton.textContent = "\u00A0"
      paginationButton.setAttribute('page', i)
      paginationButton.addEventListener('click', setPage)
      pages.push(paginationButton)
    }

    pages.forEach(page => {
      document.querySelector('.pagination').appendChild(page)
    })
    console.log(pages)

    pages[activePage].classList.add('active')
    renderList(activePage)
    
    setInterval( () => {
      pages[activePage% pageNumber].classList.remove('active')
      activePage++
      pages[activePage % pageNumber].classList.add('active')
      renderList(activePage % pageNumber)
    
    }, 300000)
    
  })


function renderList(activePage) {
  let ul = document.createElement('ul')

  for (i = (articlesPerPage * activePage); i < (activePage * articlesPerPage + articlesPerPage); i++){
    let li = document.createElement('li')
    let title = document.createElement('p')
    let desc = document.createElement('p')

    title.className = 'article-title'
    title.textContent = articles[i].title
    desc.className = 'article-details'
    desc.textContent = articles[i].details

    li.appendChild(title)
    li.appendChild(desc)
    ul.appendChild(li)
  }
  listContainer.innerHTML = ul.outerHTML

}

function setPage(e) {
  document.querySelector('.active').classList.remove('active')
  e.target.classList.add('active')
  renderList(e.target.getAttribute('page'))
  console.log(e.target.getAttribute('page'))  
}


