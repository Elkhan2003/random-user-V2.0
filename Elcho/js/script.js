let tableHeader = `
<tr>
<th>First name</th>
<th>Last name</th>
<th>Gender</th>
<th>City</th>
<th>Country</th>
<th>Phone</th>
<th>Age</th>
</tr>
`;
// table header in HTML format as a string

let results = null;
let searchTerm = "";
let numberToDisplay = 10;
let search = document.getElementById("search");
let table = document.getElementById("table");
let dropDown = document.getElementById("dropDown");
let peopleToDisplay = [];
// initialize variables for the table, search, dropdown, and people to display

function renderData() {
	table.innerHTML = tableHeader;
	peopleToDisplay = [];
	// clear the table and reset the peopleToDisplay array

	for (let person of results) {
		let name = person.name.first + " " + person.name.last;
		let lowerCaseName = name.toLowerCase();
		// concatenate first and last name into one string, convert it to lower case

		if (lowerCaseName.includes(searchTerm)) {
			peopleToDisplay.push(person);
		}
	}
	// filter the people to only include those whose names match the search term

	peopleToDisplay = peopleToDisplay.splice(0, numberToDisplay);
	// only display the number of people specified by the dropdown selection

	for (let person of peopleToDisplay) {
		let tableRow = `
<tr>
<td>${person.name.first}</td>
<td>${person.name.last}</td>
<td>${person.gender}</td>
<td>${person.location.city}</td>
<td>${person.location.country}</td>
<td>${person.phone}</td>
<td>${person.registered.age}</td>
</tr>
`;
		table.innerHTML += tableRow;
	}
}
// render the data by first setting the table header, then the table rows for each person

dropDown.addEventListener("change", function (event) {
	numberToDisplay = +event.target.value;
	renderData();
});
// update the number of people to display when the dropdown selection changes

search.addEventListener("keyup", function (event) {
	searchTerm = event.target.value.toLowerCase();
	renderData();
});
// update the search term and re-render the data whenever the search input changes

function getUsers() {
	fetch(`https://randomuser.me/api/?results=100`)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			results = data.results;
			renderData();
		});
}

// async function getUsers() {
// 	const response = await ky.get("https://randomuser.me/api/?results=100");
// 	const data = await response.json();
// 	results = data.results;
// 	renderData();
// }

// fetch data from the API and render it when the getUsers function is called

getUsers();
