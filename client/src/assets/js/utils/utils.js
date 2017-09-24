import views from '../views/all_dashboards'
import draggie from '../draggie'

var extract_params = function (params_string) {
    var params = {};
    var raw_params = params_string.split('&');

    var j = 0;
    for (var i = raw_params.length - 1; i >= 0; i--) {
        var url_params = raw_params[i].split('=');
        if (url_params.length == 2) {
            params[url_params[0]] = url_params[1];
        }
        else if (url_params.length == 1) {
            params[j] = url_params[0];
            j += 1;
        }
        else {
            //param not readable. pass.
        }
    }

    return params;
}

export default {
    router: function (route, data) {
        route = route || location.hash.slice(1) || 'home';

        var temp = route.split('?');
        var route_split = temp.length;
        var function_to_invoke = temp[0] || false;

        if (route_split > 1) {
            var params = extract_params(temp[1]);
        }

        //fire away...
        if (function_to_invoke) {
            views[function_to_invoke](data, params);
        }
    },

    render: function (element_id, content, append_child = true, renderbefore) {
        var tempnode = document.createElement('div');
        tempnode.innerHTML = content;
        var parentnode = document.getElementById(element_id);
        if (renderbefore) {
            var renderbeforeel = document.getElementById(renderbefore);
        }
        if (!append_child) {
            while (parentnode.hasChildNodes()) {
                parentnode.removeChild(parentnode.lastChild);
            }
        }

        tempnode.childNodes.forEach((cnode) => {
            if (renderbeforeel) {
                parentnode.insertBefore(cnode, renderbeforeel);
            }
            else {
                parentnode.appendChild(cnode.cloneNode(true))
            }
        });
        draggie.destroy();
        draggie.initialize();
        document.getElementById(element_id).scrollIntoView();
    }
}
