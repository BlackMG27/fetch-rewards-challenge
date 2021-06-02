//setup the variables 
const itemArr = [];

fetch(`https://fetch-hiring.s3.amazonaws.com/hiring.json`)
    .then(res => res.json())
    .then(data => {
        //filter out the ones with '' and null names 
        data = data.filter(a => {
            const notA = a.name != null && a.name != "";
            return notA;
        })
        console.log(data)
    })

    