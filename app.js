//setup the variables 
const results = document.getElementById('results');
let thisList,
    newList;

fetch(`https://fetch-hiring.s3.amazonaws.com/hiring.json`)
    .then(res => res.json())
    .then(data => {
        //filter out the ones with '' and null names 
        data = data.filter(a => {
            const notA = a.name != null && a.name != "";
            return notA;
        })
        //group the list by id 
        thisList = data.reduce((a, d) => {
            //if the list doesn't exist in the array
            if(!a[d.listId]){
                //sets the listId as an array 
                a[d.listId] = [d]
                //also checks to see if that object is in the array
            }else{
                //pushes the object into that specific array
                a[d.listId].push(d)
            }
            return a;
        }, {});
        //gets the values of object and turns them into an array
        newList = Object.values(thisList);

        //sort the objects in the array
        for(let list in newList){
            newList[list].sort((a,b) => {
                //sort by the 
                return a.id - b.id
            })
        }

        //map the values into the webpage
            //create the html values 
            //loop through the arrays
            for(let t in newList){
                //set up the ul element
                let resultUl = document.createElement('ul');
                resultUl.classList.add('result__list');
                resultUl.id = `result-${t}`
                //loop through inner arrays
                newList[t].map(list => {
                    //set up li
                    let resultLi = document.createElement('li');
                    resultLi.classList.add('result__list-item')
                    //set the inner array value to the innerHTML
                    resultLi.innerHTML = `<strong>List id:</strong> ${list.listId} <strong>Name:</strong> ${list.name}`
                    //push it into the resultUl 
                    resultUl.appendChild(resultLi)
                })
                //push resultUl into the results section
                results.appendChild(resultUl);
            }     
    })

    