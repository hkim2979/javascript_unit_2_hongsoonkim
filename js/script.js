/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

//Selecting UL class from the HTML
const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');

const itemsPerPage = 9;
/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {

   //Index of the list items to be displayed on the page. start index 0 and end index 8. This will display total of 9 items.
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;

   //Remove previous display
   studentList.innerHTML = '';

   //Iterate over data and create DOM element to store inside UL element.
   for(let i = 0; i < list.length; i++) {
      if(i >= startIndex && i < endIndex) {
         const studentItem = `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>
         `;
         studentList.insertAdjacentHTML('beforeend', studentItem);
      }
   }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {

   //Calculation for page numbers
   const numOfPages = Math.ceil(list.length / itemsPerPage);

   //Remove previous display
   linkList.innerHTML = '';

   //Iterate to display button numbers. DOM created inside UL element class .link-list
   for(let i = 1; i <= numOfPages; i++) {
      const html = `
         <li>
            <button>${i}</button>
         </li>
      `;
      linkList.insertAdjacentHTML('beforeend', html);
   }

   //Adding a class name active on button
   linkList.querySelector('button').classList.add('active');
}

//click event
linkList.addEventListener('click', (e) => {
   const activeButton = linkList.querySelector('.active');
   const clickedButton = e.target.closest('button');

   //If button is clicked, remove the active class from the previous button
   //Then adding new active class on button.
   //showPage() will pass the list parameter and text content of the target
   if(clickedButton) {
      activeButton.classList.remove('active');
      clickedButton.classList.add('active');
      showPage(data, clickedButton.innerHTML);
   }
});

//Adding search bar
function addSearch() {
   const headerElement = document.querySelector('.header');

   //search components
   const inputBox = `
      <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
   `;

   headerElement.insertAdjacentHTML('beforeend', inputBox);
}

//call addSearch() on top of the below inputBar so that the #search can be selected. addSearch function in the bottom will display as null
addSearch();

const inputBar = document.querySelector('#search');

//event listener to take user input by creating empty array and have input into all lowercase.
//Iterate over data to get all the names.
//If alphabet matches, then push data into empty array.
//If length of the array is bigger than 0, call functions. If less, then show no result.
inputBar.addEventListener('keyup', () => {
   const dataArr = [];
   const userInput = inputBar.value.toLowerCase();

   for(let i = 0; i < data.length; i++) {
      const nameTitle = data[i].name.title.toLowerCase();
      const nameFirst = data[i].name.first.toLowerCase();
      const nameLast = data[i].name.last.toLowerCase();

      const fullName = nameTitle + " " + nameFirst + " " + nameLast;
      
      if(fullName.includes(userInput)) {
         dataArr.push(data[i]);
      }
   }

   if(dataArr.length > 0) {
      addPagination(dataArr);
      showPage(dataArr, 1);
    } else {
      const html = "<h3>No results found</h3>";
      studentList.innerHTML = html;
      linkList.innerHTML = "";
    }
});

// Call functions
addPagination(data);
showPage(data, 1);