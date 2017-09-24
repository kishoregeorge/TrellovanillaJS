import utils from '../utils/utils';
import templates from '../templates/trello';
import model from '../models/dashboard';

var controllers = {};
controllers.home_page = function (data, params) {
    var all_posts = data;

    var initialtemplate = templates.all_dashboards(data);
    utils.render(
        'board',
        initialtemplate,
        false
    );
};

controllers.home_page_error = function (data, params) {
    utils.render(
        'page-content',
        data
    );
};

controllers.show_loader = function (element) {
    utils.render(
        element,
        templates.loader()
    );
};

controllers.add_new_card = (event, el) => {
    var new_card = templates.add_new_card();
    // utils.render(
    //     'board',
    //     new_card
    // );
}

controllers.add_new_task = (event, el) => {
    console.log(el.id);
    var cardId = el.id.split("-")[0];
    var cardTitle = cardId + "-card-composer";
    templates.add_new_task(cardTitle);
}

controllers.save_new_card = () => {
    //console.log("yippekayyay");
    var name = document.getElementsByClassName("list-name-input")[0].value;
    model.createnewcard(name);
    utils.router();
}

controllers.cancel_new_card = (event, el) => {
    var new_card = templates.hide_new_card();
    // utils.render(
    //     'board',
    //     new_card
    // );
}

controllers.save_new_task = (event, button) => {
    console.log(button.id);
    var cardId = button.id.split("-")[0];
    var cardTitle = cardId + "-taskarea";
    var name = document.getElementById(cardTitle).value;
    console.log(name);
    var taskmodel = model.createnewtask(cardId, name);
    var content = templates.addTask(taskmodel)
    document.getElementById(`${cardId}-count`).innerText = `${model.getTaskCount(cardId)} tasks`;
    var cardcontent = `${cardId}-tasks-content`;
    var composerid = `${cardId}-card-composer`
    templates.hide_new_task(composerid);
    utils.render(cardcontent, content, true, composerid);
}

controllers.hide_new_task = (event, el) => {
    var cardId = el.id.split("-")[0];
    var composerid = `${cardId}-card-composer`
    templates.hide_new_task(composerid);
}

controllers.edit_card_headers = (event, el) => {
    var cardId = el.id.split("-")[0];
    el.getElementsByClassName("list-header-target")[0].classList.add("is-hidden");
    el.getElementsByClassName('list-header-name')[0].classList.add("is-editing");
    el.getElementsByClassName('list-header-name')[0].focus();
    //el.getElementById(`${cardId}-list-header-name`).classList.add("is-editing");
}

controllers.update_card_header = (event, el) => {
    var cardId = el.id.split("-")[0];
    var value = el.value;
    model.updateCard(cardId, value);
    el.parentElement.getElementsByClassName("list-header-target")[0].classList.remove("is-hidden");
    el.parentElement.getElementsByClassName('list-header-name')[0].classList.remove("is-editing");
}

controllers.edit_task = (event, el) => {
    var taskId = el.id.split("-")[0];
    var handle = el.getElementsByClassName("task-handle")[0];
    handle.style.display = "none";
    var value = handle.getElementsByClassName("list-card-title")[0].innerText.trim(" ");
    var textarea = el.getElementsByClassName("list-header-task-name")[0];
    textarea.style.display = "block";
    textarea.value = value;
    textarea.focus();

    //el.getElementById(`${cardId}-list-header-name`).classList.add("is-editing");
}

controllers.update_task = (event, el) => {
    var par = el.parentElement;
    par.getElementsByClassName("task-handle")[0].style.display = "block";
    par.getElementsByClassName("list-header-task-name")[0].style.display = "none";
    var gp = par.parentElement;
    var taskid = el.id.split("-")[0];
    var cardid = gp.id.split("-")[0];
    model.updateTask(cardid, taskid, el.value);
    el.parentElement.getElementsByClassName("list-card-title")[0].innerText = el.value.trim(" ");
}
export default controllers;