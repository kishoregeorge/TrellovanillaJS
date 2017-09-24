import utils from './utils/utils'

import draggie from './draggie';
window.onload = function () {
    console.log('Application loaded at ' + Date.now());

    //register router
    window.addEventListener(
        "hashchange",
        function () { utils.router() }
    );
    var obj = localStorage.getItem('Dashboard');
    if (!obj) {
        var Dashboard = { "order": ["C1"], "cards": { "C1": { "text": "Welcome Card", "title": "C1", "createdat": Date.now(), "hasmanytasks": true, "order": ["T1"], "tasks": { "T1": { "title": "T1", "text": "This is a Task ", "createdat": Date.now(), "editedat": Date.now() } } } } }

        // Put the object into storage
        localStorage.setItem('Dashboard', JSON.stringify(Dashboard));
    }

    // Retrieve the object from storage
    var retrievedObject = localStorage.getItem('Dashboard');

    console.log('retrievedObject: ', JSON.parse(retrievedObject));
    utils.router();    
    draggie.initialize();
};