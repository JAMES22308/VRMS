export class SearchView{
    displayAllValues(allValues){
        const searchResultsBody = document.getElementById("searchResultsBody")
        let html = ``
        for (let i=0; i<allValues.length; i++){
            html += `<tr>`
            html += `<td>${allValues[i].make}</td>`
            html += `<td>${allValues[i].model}</td>`
            html += `<td>${allValues[i].location}</td>`
            html += `<td>${allValues[i].status}</td>`
            html += `</tr>`
        }
        searchResultsBody.innerHTML = html
    }

    sortedValues(sorted){
        const searchResultsBody = document.getElementById("searchResultsBody")
        let html = ``
        for (let i=0; i<sorted.length; i++){
            html += `<tr>`
            html += `<td>${sorted[i].make}</td>`
            html += `<td>${sorted[i].model}</td>`
            html += `<td>${sorted[i].location}</td>`
            html += `<td>${sorted[i].status}</td>`
            html += `</tr>`
        }
        searchResultsBody.innerHTML = html
    }
}