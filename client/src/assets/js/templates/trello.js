var templates = {};
templates.all_dashboards = function (data) {

    var no_of_cards = data.order.length;
    var content = "";
    for (var i = 0; i < no_of_cards; i++) {
        var card = data.cards[data.order[i]];
        var tasksHtml = []
        if (card) {

            content += templates.addCard(card);

            var no_of_tasks = card.order.length;
            card.order.forEach(function (value) {
                var task = card.tasks[value]
                if (task) {
                    var tc = templates.addTask(task);
                    tasksHtml.push(tc)
                }
            });

            content = content + tasksHtml.join("") + templates.addTaskComposer(card)+`<a id=${card.title}-newtask" class="open-card-composer js-open-card-composer" onclick="return controllers.add_new_task(event,this)" >Add a Task…</a>
            </div>
            </div>
            </div>`
        }
    };
    return content + templates.addLast();
}

templates.addLast = (data) => {
    return `<div class="js-add-list list-wrapper mod-add is-idle trello-js-add-list">
            <div>
            <span class="placeholder js-open-add-list" onclick="return controllers.add_new_card(event,this)">Add a Card…</span><input class="list-name-input" type="text" name="name" placeholder="Add a Card…" autocomplete="off" dir="auto" maxlength="512">
            <div class="list-add-controls u-clearfix"><button class="primary mod-list-add-button js-save-edit" onclick="return controllers.save_new_card()">Save</button><a class="icon-lg icon-close dark-hover js-cancel-edit" onclick="return controllers.cancel_new_card(event,this)"></a></div>
            </div>
            </div>`
}

templates.addCard = (data = {
    title: "New Card",
    order: []
}) => {
    var content = `<div class="js-list list-wrapper card-draggable task-droppable" id=${data.title}>
                    
                <div class="list js-list-content">
                    <div class="card-handle"> 
                        <div id= ${data.title}-list-header class="list-header js-list-header u-clearfix is-menu-shown" onclick="return controllers.edit_card_headers(event,this)">
                            <div class="list-header-target js-editing-target"></div>
                            <h2 class="list-header-name-assist js-list-name-assist" dir="auto">${data.text}</h2>
                            <textarea id= ${data.title}-list-header-name onfocusout="return controllers.update_card_header(event,this)" class="list-header-name mod-list-name js-list-name-input" aria-label=${data.text} spellcheck="false" dir="auto" maxlength="512" style="overflow: hidden; word-wrap: break-word; height: 24.8px;">${data.text}</textarea>
                           
                        </div>
                        <p id=${data.title}-count class="list-header-num-cards js-num-cards" style="float: right;margin-right: 1rem;color:#04517c">${data.order.length} tasks</p>
                    </div> 
                    <div id="${data.title}-tasks-content" class="drop-content list-cards u-fancy-scrollbar u-clearfix js-list-cards js-sortable ui-sortable" style="min-height:10px">`
    return content;
}

templates.addTask = (data = { text: "" }) => {
    var content = `<div id=${data.title} class="list-card js-member-droppable task-draggable handle" onclick="return controllers.edit_task(event,this)">
                        <div class="task-handle">
                            <div class="list-card-details">
                                <div class="list-card-labels js-card-labels"></div>
                                <span class="list-card-title js-card-name" dir="auto">${data.text}</span>
                            </div>
                        </div>
                                <textarea style= "display:none" id= ${data.title}-list-task-name onfocusout="return controllers.update_task(event,this)" class="list-header-task-name list-header-name trello-mod-list-name js-list-name-input" aria-label=${data.text} spellcheck="false" dir="auto" maxlength="512" style="overflow: hidden; word-wrap: break-word; height: 24.8px;">${data.text}
                                </textarea>
                        
                    </div>`;
    return content;
}

templates.add_new_card = function () {
    var addModal = document.getElementsByClassName("js-add-list");
    addModal[0].classList.remove("is-idle");
    // var card = templates.addCard() + templates.addTask() + templates.addLast();
    // return card;

}

templates.addTaskComposer = (data) => {
    return `<div id = ${data.title}-card-composer class="card-composer hide">
                <div class="list-card js-composer">
                <div class="list-card-details u-clearfix">
                    <div class="list-card-labels u-clearfix js-list-card-composer-labels"></div>
                    <textarea id=${data.title}-taskarea class="list-card-composer-textarea js-card-title" dir="auto" style="overflow: hidden; word-wrap: break-word; resize: none; height: 54px;"></textarea>
                    <div class="list-card-members js-list-card-composer-members"></div>
                </div>
                </div>
                <div class="cc-controls u-clearfix">
                <div class="cc-controls-section"><button id=${data.title}-button class="primary confirm mod-compact js-add-card" onclick="return controllers.save_new_task(event,this)">Add</button><a id=${data.title}-cancel class="icon-lg icon-close dark-hover js-cancel" onclick="return controllers.hide_new_task(event,this)"></a></div>
                </div>
            </div>`
}

templates.add_new_task = (id) => {
    var addModal = document.getElementById(id);
    addModal.classList.remove("hide");
}

templates.hide_new_task = (id) => {
    var addModal = document.getElementById(id);
    addModal.classList.add("hide");
}

templates.hide_new_card = (id)=>{
    var addModal = document.getElementsByClassName("js-add-list");
    addModal[0].classList.add("is-idle");
}

export default templates;
