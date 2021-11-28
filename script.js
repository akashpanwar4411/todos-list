let itemJsonArray  = [];
let itemJsonArrayStr;
let title;
let desc;
function displayItems(){
    // if local storage is not empty then display
   if(localStorage.getItem('itemsJson') != null){
        // adding items to itemJsonArray before going to display
        // because whenever the page will be refresh we need to 
        // display the items which are already preasent to local storage
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);

        // Populating the table that we are going to display
        let tableBody = document.getElementById('tableBody');
        let str = "";
        itemJsonArray.forEach((element, index)=>{
            str += `
            <tr>
                <td>${index+1}</td>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td><button class="btn btn-sm btn-primary" onclick = "deleteItem(${index})">Delete</button></td>
            </tr>
            `
        });
        tableBody.innerHTML = str;
   }
   else{ 
       // if the local storage is empty then the list should be    empty
       document.getElementById('tableBody').innerHTML = ``;
   }
}
function addItem(){
    title = document.getElementById('tit').value;
    desc = document.getElementById('desc').value;

    // we need to only add items if the title has some content to it
    // we are not concerning about description of title
    if(title.length != 0){
        itemJsonArray.push([title, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
        displayItems();
    }

    // if you want to clear the title and description on page after
    // the user added item to list for new input then uncomment below
    // two lines
    // document.getElementById('tit').value = "";
    // document.getElementById('desc').value = "";
}
function deleteItem(itemIndex){
    // console.log("delete ", itemIndex);
    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    // deleting item
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    displayItems(); 
}
function clearStorage(){
    // coinfirm with the user first before clearing the storage
    if(confirm("Click ok if you want to clear the list")){
        //clearing local storage
        localStorage.clear();
        // clearing itemJsonArray because I dont want that the array
        // contain any element after I clear the list
        itemJsonArray.splice(0, itemJsonArray.length);
        displayItems();
        console.log("dfjaflk");
    }
}
let add = document.getElementById('add');
add.addEventListener("click", addItem);
displayItems();
