var model = {};
model.createnewcard = (name) => {
    var retrievedObject = localStorage.getItem('Dashboard');
    var dashboard = JSON.parse(retrievedObject);
    var key = `C${dashboard.order.length + 1}`;
    var card = { "title": key, "text": name, "createdat": Date.now(), "hasmanytasks": true, "order": [], "tasks": {} }
    dashboard.cards[key] = card;
    dashboard.order.push(key);
    // Put the object into storage
    localStorage.setItem('Dashboard', JSON.stringify(dashboard));
    return;
}

model.createnewtask = (cardid, text) => {

    var retrievedObject = localStorage.getItem('Dashboard');
    var dashboard = JSON.parse(retrievedObject);
    var card = dashboard.cards[cardid];
    var key = `T${card.order.length + 1}`;
    var task = { title: key, text: text, createdat: Date.now(), editedat: Date.now() }
    card.order.push(key);
    card.tasks[key] = task;
    // Put the object into storage
    localStorage.setItem('Dashboard', JSON.stringify(dashboard));
    return task;
}

model.moveTask = (fromcard, taskid, tocardid) => {
    if (fromcard != tocardid) {
        var retrievedObject = localStorage.getItem('Dashboard');
        var dashboard = JSON.parse(retrievedObject);
        var card = dashboard.cards[fromcard];
        var task = card.tasks[taskid];
        if (task) {
            var index = card.order.indexOf(taskid);
            if (index > -1) {
                card.order.splice(index, 1);
            }
            var tocard = dashboard.cards[tocardid]

            var key = `T${tocard.order.length + 1}`;
            task.title = key;
            tocard.order.push(key);
            tocard.tasks[key] = task;
            delete card.tasks[taskid];
            localStorage.setItem('Dashboard', JSON.stringify(dashboard));
            return task;
        }
    }

}

model.updateCard = (cardid, value) => {
    var retrievedObject = localStorage.getItem('Dashboard');
    var dashboard = JSON.parse(retrievedObject);
    var card = dashboard.cards[cardid];
    card.text = value;
    localStorage.setItem('Dashboard', JSON.stringify(dashboard));
}

model.updateTask = (cardid, taskid, value) => {
    var retrievedObject = localStorage.getItem('Dashboard');
    var dashboard = JSON.parse(retrievedObject);
    var card = dashboard.cards[cardid];
    var task = card.tasks[taskid];
    task.text = value.trim(" ");
    task.editedat = Date.now();
    localStorage.setItem('Dashboard', JSON.stringify(dashboard));
}


export default model