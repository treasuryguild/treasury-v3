let orgEl = "treasuryguild";
let repoEl = "treasury-v3";
let value2 = [];
let fundList = "";
let fund = "";
let fundJ = "";
let fund2 = "";

function listQ() {
    fundList = this.value;
    console.log(fundList);
    localStorage.setItem("fund", fundList);
    fund = localStorage.getItem("fund");
    axios.get(`https://api.github.com/repos/${orgEl}/${repoEl}/contents/proposals`)
    .then(response => {
    const data = response.data;
    console.log(data);
    // Loop over each object in data array
    for (let i in data) {
        //console.log(data[i]);
        value2[i] = data[i].name
        var n = i;
        axios.get(`https://raw.githubusercontent.com/${orgEl}/${repoEl}/main/proposals/${data[i].name}`)
        .then(response => {
            const data2 = response.data;
            fund2 = data2.fund;
            fundJ = ("Fund" + parseInt(fund2.replace( /^\D+/g, '')));
            console.log(i);
            //console.log(fund);
                
        // Get the ul with id of of userRepos
        let ul = document.getElementById('userRepos');
        // Create variable that will create li's to be added to ul
        let li = document.createElement('div');
        if (fundJ == fund) {
        // Create the html markup for each li
        li.innerHTML = (`
            <button onclick="goHere(${i});">${value2[i].replace(/\..+$/, '')}</button>
        `);}
        // Append each li to the ul
        ul.appendChild(li);      
        if (i == 0) {
            while (ul.hasChildNodes()) {
                ul.removeChild(ul.firstChild);
              }
            } 
    })
    .catch(error => console.error(error)) 
    }
})
.catch(error => console.error(error))
};

document.getElementById("list").onchange = listQ;

function goHere(i) {
    localStorage.setItem("prop", value2[i]);
    location.href='/treasury-v3/pages/proposal.html';
    // location.href='/treasury-v3/pages/proposal.html';
}