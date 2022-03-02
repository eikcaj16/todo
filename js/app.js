/**
 * Assignment 6
 * app.js
 * Yiqing Huang
 */

/**
 * Add information read from JSON to List
 * @param info the array of information
 */
function addInfoToList(info = []) {
    createListBlock(info.title, info.description, info.due_datetime, info.checked);
}

/**
 * Create a list block
 *
 * @param title
 * @param description
 * @param datetime
 * @param checked
 */
const createListBlock = (title, description, datetime, checked) => {
    const list_block = document.createElement("div");
    list_block.className = "list_elem";
    list_block.id = "elem_" + count;

    // checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = list_block.id + "_checkbox";
    checkbox.checked = checked;
    list_block.appendChild(checkbox);

    // title
    const span = document.createElement('span');
    span.textContent = title;
    list_block.appendChild(span);

    // more information button
    const btn = document.createElement("button");
    btn.id = list_block.id + "_btn";
    btn.textContent = "ⓘ"
    btn.addEventListener('click', function (event) {
        let s = event.target.id;
        // find the detail block according to the button id
        showHideDetail(s.substr(0, s.indexOf("btn")) + "detail");
    });
    list_block.appendChild(btn);

    // detail block (hidden)
    createDetailBlock(title, description, datetime, list_block);

    const lists = document.getElementById("lists");
    lists.appendChild(list_block);
    count++;
}

/**
 * Create a detail block
 *
 * @param title
 * @param description
 * @param datetime
 * @param list_block
 */
const createDetailBlock = (title, description, datetime, list_block) => {
    const detail_block = document.createElement("div");
    detail_block.id = list_block.id + "_detail";
    detail_block.className = "detail_block";

    // datetime
    const datetime_div = document.createElement("div");
    datetime_div.className = "datetime_div";
    let dt = new Date(datetime);
    datetime_div.textContent = `${dt.toLocaleDateString()} ${dt.toLocaleTimeString()}`;
    detail_block.appendChild(datetime_div);

    // description
    const desc_div = document.createElement("div");
    desc_div.className = "desc_div";
    desc_div.textContent = description;
    detail_block.appendChild(desc_div);

    // hide the block initially
    detail_block.style.display = "none";
    list_block.appendChild(detail_block);
}

/**
 * If the detail block is hidden, make it visible
 * Otherwise, hide it
 *
 * @param detail_id detail block id
 */
const showHideDetail = (detail_id) => {
    const detail = document.getElementById(detail_id);

    if (detail.style.display !== 'none') {
        detail.style.display = 'none';
    } else {
        detail.style.display = 'block';
    }
}

/**
 * Fetch data from JSON file
 */
const fetchData = () => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function (response) {
        if (this.status === 200) {
            const data = this.responseText;
            const infos = JSON.parse(data);
            infos.forEach(info => addInfoToList(info));
        }
    });
    xhr.open('GET', 'data/database.json');
    xhr.send();
}

/**
 * Init
 */
const init = () => {
    fetchData();
}


let count = 0;  // the global list element counter (including the deleted elements)


const form = document.getElementById("info_form");

// Add a listener to submit button, and get the inputted data
form.addEventListener('submit', event => {
    event.preventDefault();

    // add to list
    createListBlock(document.getElementById("form_title").value,
        document.getElementById("form_description").value,
        document.getElementById("form_datetime").value,
        false);

    // clean up & hide the panel
    document.getElementById("form_title").value = "";
    document.getElementById("form_description").value = "";
    document.getElementById("form_datetime").value = "";
    form.style.display = 'none';
});

// If the add data block is hidden, make it visible
// else hide it
const add_btn = document.getElementById("add_btn");
add_btn.addEventListener('click', function () {
    if (form.style.display !== 'none') {
        add_btn.textContent = "+";
        form.style.display = 'none';
    } else {
        add_btn.textContent = "×";
        form.style.display = 'block';
    }
})