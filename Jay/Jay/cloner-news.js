//https://www.thatsoftwaredude.com/content/6125/how-to-paginate-through-a-collection-in-javascript

function fetchingById(id) {
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((resp) => resp.json()).then(NewsData)
}

let posts = []


function NewsData(article) {
  let element = document.createElement('div')
  element.id = article.id
  console.log(element.id)
  let titleclone = document.createElement('span')

  // titleclone.innerHTML = '<strong><i><a href="#" >CloneNews-leaks</a></i></strong><br/><span style="color:red;">live-headlines</span>';
  let title = document.createElement('h3')
  title.style.fontSize = "30px";
  title.textContent = article.title
  let text = document.createElement('p')
  text.style.color = "#3d7897";
  text.style.fontFamily = "Arial";
  text.style.textAlign = "justify";
  text.style.lineHeight = "25px";
  text.textContent = article.text
  let type = document.createElement('p')
  type.textContent = article.type
  let pool = document.createElement('p')
  pool.textContent = article.pool
  element.appendChild(titleclone)
  element.appendChild(title)
  element.appendChild(text)
  element.appendChild(type)
  element.appendChild(pool)




  let unix_timestamp = article.time
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(unix_timestamp * 1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  let ftime = document.createElement('p')
  ftime.textContent = formattedTime
  element.appendChild(ftime)
  console.log(formattedTime);

  document.body.appendChild(element)
  console.log(article)
  posts.push(article)
}

// const urls = [
// 'https://hacker-news.firebaseio.com/v0/askstories.json',
// 'https://hacker-news.firebaseio.com/v0/showstories.json',
// 'https://hacker-news.firebaseio.com/v0/jobstories.json',
// 'https://hacker-news.firebaseio.com/v0/topstories.json',
// 'https://hacker-news.firebaseio.com/v0/updates.json'
// ]
// 

const ask1url = 'https://hacker-news.firebaseio.com/v0/askstories.json';
const showurl = 'https://hacker-news.firebaseio.com/v0/showstories.json';
const jobsurl = 'https://hacker-news.firebaseio.com/v0/jobstories.json';
const top1url = 'https://hacker-news.firebaseio.com/v0/topstories.json';
const updsurl = 'https://hacker-news.firebaseio.com/v0/updates.json';

// Promise.all(urls.map(url=>fetch(url))).then(responses => responses.forEach(response => response.json().then(ids=> ids.forEach(id=>fetchingById(id)))))
const LoadData = async () => {
  try {
    const results = await Promise.all([
      fetch(ask1url),
      fetch(showurl),
      fetch(jobsurl),
      fetch(top1url),
      fetch(updsurl),
    ])
    const dataPromises = results.map(results => results.json().then(ids => ids.forEach(id => fetchingById(id))))
    const finalData = await (await Promise.all(dataPromises));
    return (finalData)
  } catch (err) {
    console.error(err);
  }
};

(async () => {
  const data = await LoadData();
  // console.log(data)

})();