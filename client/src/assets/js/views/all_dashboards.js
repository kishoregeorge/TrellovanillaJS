import controllers from '../controllers/dashboard.js';

window.controllers = controllers;

var views = {
    home: function home(data, params) {
        var retrievedObject = localStorage.getItem('Dashboard');

        console.log('retrievedObject: ', JSON.parse(retrievedObject));
        controllers.home_page(JSON.parse(retrievedObject))
    }
}
export default views ;