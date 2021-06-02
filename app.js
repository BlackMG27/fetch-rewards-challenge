//setup the variables 
const itemArr = [];
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
        console.log(data)
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
        console.log(thisList);
        //gets the values of object and turns them into an array
        newList = Object.values(thisList);
        console.log(newList)

        //sort the objects in the array
        for(let list in newList){
            newList[list].sort((a,b) => {
                return a.id - b.id
            })
        }
        console.log(newList)
    })

    