const searchForm = document.querySelector('.search')
const searchBtn = document.querySelector('.search-btn')
const topicField = document.querySelector('#news')
const topicHead = document.querySelector('.topic-dyn')
const searchHead = document.querySelector('.topic-headings')


const newsSection = document.querySelector('.news-section')
newsSection.innerHTML = ''


const retrieve= function(e){
    e.preventDefault()
    
    const apiKey = '6afeef4ca5194f5b95d6729a524386ed'
    const topic = topicField.value
    const url = `https://newsapi.org/v2/everything?q=${topic}&from=2021-08-10&sortBy=popularity&apiKey=${apiKey}`
    newsSection.innerHTML = ''
    searchHead.style.display = 'block'
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data.articles.forEach(function(article){
                const img = article.urlToImage
                const title = article.title
                const excerpt = article.content.substring(0,200)
                const url = article.url
                const source = article.source.name
                const author = article.author
                const news = `
                <div class="card news-item">
                    <img class="card-img-top" src="${img}" alt="${title}">
                    <div class="card-body">
                        <h5 class="card-title news-title">${title}</h5>
                        <p class="card-text news-excerpt">${excerpt}</p>
                        <a href="${url}" target="_blank" class="btn btn-primary">Read More</a>
                    </div>
                    <div class="card-footer text-muted source-section">
                        <ul>
                            <li>Source: ${source}</li>
                            <li>Author: ${author}</li>
                        </ul>
                    </div>
                </div>
                `
                topicHead.textContent = topic
                newsSection.insertAdjacentHTML('afterbegin', news)
            })
        });
        topicField.value = ''
}
searchForm.addEventListener('submit', retrieve)