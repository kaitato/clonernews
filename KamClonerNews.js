function fetchingById(id) {
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((resp)=>resp.json()).then(loadData);
};/*fetchingById*/

let idx = 0;
let posts = [];

const loadData = cost => {
  /*
  let element = document.createElement('div');
  element.id = cost.id;
  let titleclone = document.createElement('span');
  titleclone.innerHTML = '<strong><i><a href="#" >CloneNews-leaks</a></i></strong><br/><span style="color:red;">live-headlines</span>';
  let title = document.createElement('h3');
  title.style.fontSize = "30px";
  title.textContent = cost.title;
  let text = document.createElement('p');
  text.style.color = "#3d7897";
  text.style.fontFamily = "Arial";
  text.style.textAlign = "justify";
  text.style.lineHeight = "25px";
  text.textContent = cost.text;
  let type = document.createElement('p');
  type.textContent = cost.type;
  let pool = document.createElement('p');
  pool.textContent = cost.pool;
  element.appendChild(titleclone);
  element.appendChild(title);
  element.appendChild(text);
  element.appendChild(type);
  element.appendChild(pool);*/

  /*let unix_timestamp = cost.time;
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(unix_timestamp * 1000);
  /*obtain the year, month and day*/
  /*var year1 = date.getFullYear();
  var month1 = date.getMonth();
  var day1 = date.getDay();
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();
  // Will display time in 10:30:23 format
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  let ftime = document.createElement('p');
  ftime.textContent = formattedTime;
  element.appendChild(ftime);
  console.log('Full Year:', year1,'Month:', month1, 'Day no:', day1, ' Formatted Time:', formattedTime);
  document.body.appendChild(element);*/
  console.log('Cost:', cost);
  posts.push(cost);
  /*Sort the posts array in date order*/
  posts.sort(function(a,b){return(posts[idx-1].time,posts[idx].time)});
  console.log('Index:', idx, 'Posts[0].id:', posts[0].id, 'Posts[0].time:', posts[0].time);
  idx++;
  if (idx > 717) {
    displayHTML();
  };
};/*loadData = cost*/

const urls = [
  'https://hacker-news.firebaseio.com/v0/askstories.json',
  'https://hacker-news.firebaseio.com/v0/showstories.json',
  'https://hacker-news.firebaseio.com/v0/jobstories.json',
  'https://hacker-news.firebaseio.com/v0/topstories.json',
  'https://hacker-news.firebaseio.com/v0/updates.json'
];

Promise.all(urls.map(url => fetch(url))).then (
  responses => responses.forEach(response => response.json().then(ids => ids.forEach(id=>fetchingById(id))))
  );/*Promise.all*/

function displayHTML() {
    var idx2 = 0;
    console.log('Display HTML entered, Index:', idx2);
    for (idx2=0;idx2 < posts.length; idx2++) {
      let element = document.createElement('div');
      element.id = posts[idx2].id;
      let titleclone = document.createElement('span');
      titleclone.innerHTML = '<strong><i><a href="#" >CloneNews-leaks</a></i></strong><br/><span style="color:red;">live-headlines</span>';
      let title = document.createElement('h3');
      title.style.fontSize = "30px";
      title.textContent = 'Title: ' + posts[idx2].title;
      let text = document.createElement('p');
      text.style.color = "#3d7897";
      /*text.style.color = "#ff0000";*/
      text.style.fontFamily = "Arial";
      text.style.textAlign = "justify";
      text.style.lineHeight = "25px";
      text.textContent = posts[idx2].text;
      let type = document.createElement('p');
      type.textContent = posts[idx2].type;
      let pool = document.createElement('p');
      pool.textContent = 'Pool: ' + posts[idx2].pool;
      element.appendChild(titleclone);
      element.appendChild(title);
      element.appendChild(text);
      element.appendChild(type);
      element.appendChild(pool);
      document.body.appendChild(element);
    }/*for loop*/    
};/*displayHTML*/
