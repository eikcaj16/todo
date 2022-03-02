function addInfoToList(info = []) {
    createListBlock(info.title, info.description, info.due_datetime, info.checked);
}

const createListBlock = (title, description, datetime, checked) => {
    const list_block = document.createElement("div");
    list_block.className = "list_elem";
    list_block.id = "elem_" + count;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = checked;
    list_block.appendChild(checkbox);

    const span = document.createElement('span');
    span.textContent = title;
    list_block.appendChild(span);

    const btn = document.createElement("button");
    btn.id = list_block.id + "_btn";
    btn.textContent = "ⓘ"
    btn.addEventListener('click', function (event) {
        let s = event.target.id;
        showHideDetail(s.substr(0, s.indexOf("btn")) + "detail");
    });
    list_block.appendChild(btn);

    createDetailBlock(title, description, datetime, list_block);

    const lists = document.getElementById("lists");
    lists.appendChild(list_block);
    count++;
}

const createDetailBlock = (title, description, datetime, list_block) => {
    const detail_block = document.createElement("div");
    detail_block.id = list_block.id + "_detail";

    // const title_div = document.createElement("div");
    // title_div.className = "title_div";
    // title_div.textContent = title;
    // detail_block.appendChild(title_div);

    const datetime_div = document.createElement("div");
    datetime_div.className = "datetime_div";
    let dt = new Date(datetime);
    datetime_div.textContent = `${dt.toLocaleDateString()} ${dt.toLocaleTimeString()}`;
    detail_block.appendChild(datetime_div);

    const desc_div = document.createElement("div");
    desc_div.className = "desc_div";
    desc_div.textContent = description;
    detail_block.appendChild(desc_div);

    // detail_block.hidden = true;
    detail_block.style.display = "none";
    list_block.appendChild(detail_block);
}

const showHideDetail = (detail_id) => {
    const detail = document.getElementById(detail_id);

    if (detail.style.display !== 'none') {
        detail.style.display = 'none';
    } else {
        detail.style.display = 'block';
    }
}

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

const init = () => {
    fetchData();
}


// const form_apply_btn = document.getElementById("form_submit_btn");
// form_apply_btn.addEventListener('submit', function (event) {
//     event.preventDefault();
//     console.log(document.getElementById("form_title").title);
//     console.log("here");
// })

let count = 0;  // the global list element counter (including the deleted elements)


const form = document.getElementById("info_form");
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

const add_btn = document.getElementById("add_btn");
add_btn.addEventListener('click', function () {
    form.style.display = 'block';
})