import model from './models/dashboard';

class Draggie {
    /**
     * @constructor
     * @param {HTMLElement} element
     * @param {HTMLElement} targetElement
     */
    constructor(element, targetElement, handle) {
        this.element = element;
        this.targetElement = targetElement;
        this.graphic = element.querySelector('span');
        this.drag = new Draggabilly(this.element, {
            handle: handle,
            containment: '.card-droppable'
        });

        this._dragClass = 'is-dragging';
        this._targetHoverClass = 'hovering';
        this._isTransitioningClass = 'transitioning';
        this.parent = element.parentNode;
        this.nextSibling = element.nextSibling;
    }

    /**
     * init.
     */
    init() {
        //this._setRandomRotate(this.graphic, 20);
        this._addEventListeners();
    }

    /**
     * Add event listeners.
     * @private
     */
    _addEventListeners() {
        this._boundDragStart = (pointer) => this._dragStartHandler(pointer);
        this._boundDragMove = (pointer) => this._dragMoveHandler(pointer);
        this._boundDragEnd = (pointer) => this._dragEndHandler(pointer);
        this.drag.on('dragStart', this._boundDragStart);
        this.drag.on('dragMove', this._boundDragMove);
        this.drag.on('dragEnd', this._boundDragEnd);
    }

    /**
     * Drag start handler.
     * @param {Object} pointer
     * @private
     */
    _dragStartHandler(pointer) {
        this.isDragging = true;
        document.body.classList.add(this._dragClass);

        this.element.style.zIndex = 1;
        //logic to remove from parentnode
        var parentNode = this.element.parentNode;
        //this.element.classList.add("active-card");
        //this.element.classList.add("ui-sortable-helper");
        if (this.element.classList.contains("task-draggable")) {
            parentNode.removeChild(this.element);
            var cloneElement = this.element;
            const x = pointer.x;
            const y = pointer.y;
            cloneElement.style.left = x + "px";
            cloneElement.style.top = y + "px";
            cloneElement.style.position = 'absolute';
            cloneElement.style.width = '254px';
            cloneElement.style.height = '70px';
            document.getElementsByTagName("BODY")[0].appendChild(cloneElement);
        }
        //clone

    }

    /**
     * Drag move handler.
     * @param {Object} pointer
     * @private
     */
    _dragMoveHandler(pointer) {
        //clone
        //console.log(pointer);
        if (this.element.classList.contains("task-draggable")) {
            const x = pointer.screenX - 50;
            const y = pointer.screenY - 50;
            this.element.style.left = x + "px";
            this.element.style.top = y + "px";
            if (this._checkIfCursorOnTarget(pointer)) {
                // this.targetElement.classList.add(this._targetHoverClass);
            } else {
                //this.targetElement.classList.remove(this._targetHoverClass);
            }
        }
    }

    /**
     * Drag end handler.
     * @param {Object} pointer
     * @private
     */
    _dragEndHandler(pointer) {
        if (this.element.classList.contains("task-draggable")) {
            var dropLoc = this._checkIfCursorOnTarget(pointer)
            if (dropLoc) {
                this._droppedOnTarget(dropLoc);
            } else {
                this._resetElementPosition();
                //this.targetElement.classList.remove(this._targetHoverClass);
            }
            document.body.classList.remove(this._dragClass);
        }
    }

    /**
     * Check if the drag element was dropped on the target area.
     * @param {Object} pointer
     * @returns {Boolean}
     * @private
     */
    _checkIfCursorOnTarget(pointer) {
        for (var i = 0; i < this.targetElement.length; i++) {
            const targetLocation = this.targetElement[i].getBoundingClientRect();
            const targetX = targetLocation.left + targetLocation.width;
            const targetY = targetLocation.top + targetLocation.height;
            const x = pointer.x;
            const y = pointer.y;

            if (x >= targetLocation.left && x <= targetX &&
                y >= targetLocation.top && y <= targetY) {
                return this.targetElement[i];
            }

        }

        return false;
    }

    /**
     * Dropped on target!
     * @private
     */
    _droppedOnTarget(droploc) {
        if (!droploc.classList.contains("card-droppable")) {
            this.element.style.left = 0;
            this.element.style.top = 0;
            this.element.style.position = 'relative';
        }
        this.element.style.height = "100%";
        //this.element.style.width="100%";
        var appendbefore = droploc.getElementsByClassName("card-composer")[0]
        var cardid = this.parent.id.split("-")[0];
        var taskid = this.element.id;
        var tocardid = droploc.id;
        if (cardid != tocardid) {
            var newtask = model.moveTask(cardid, taskid, tocardid)
            if (newtask) {
                var tempnode = document.createElement('div');
                tempnode.innerHTML = this.element.outerHTML.replace(new RegExp(taskid, 'g'), newtask.title);
                var dropnode = droploc.getElementsByClassName("drop-content")[0];
                tempnode.childNodes.forEach((cnode) => {
                    dropnode.insertBefore(cnode, appendbefore);
                });
                this.element.remove();
                draggie.destroy();
                draggie.initialize();
            }
        }
        else {
            this._resetElementPosition();
        }
    }

    /**
     * Animate the element back to its original position (by adding a class).
     * @private
     */
    _resetElementPosition() {
        var parentNode = this.parent;
        var nextSibling = this.nextSibling;
        this.element.style.left = this.element.style.top = 0;
        this.element.style.height = "100%";
        this.element.style.position = 'relative';
        parentNode.insertBefore(this.element, nextSibling);
    }
}

var draggie = {};
var draggies = [];
draggie.initialize = function () {

    const draggableElems = document.querySelectorAll('.card-draggable');
    const droppableElems = document.querySelectorAll('.card-droppable');

    const draggabletaskElems = document.querySelectorAll('.task-draggable');
    const droppabletaskElems = document.querySelectorAll('.task-droppable');
    for (var i = 0, l = draggabletaskElems.length; i < l; i++) {
        //for (var j = 0; j < droppabletaskElems.length; j++) {
        const a = new Draggie(draggabletaskElems[i], droppabletaskElems, '.task-handle');
        a.init();
        draggies.push(a);
        //}
    }

    for (var i = 0, l = draggableElems.length; i < l; i++) {
        //for (var j = 0; j < droppableElems.length; j++) {
        const a = new Draggie(draggableElems[i], droppableElems, '.card-handle');
        a.init();
        draggies.push(a);
        //}
    }


}

draggie.destroy = function () {
    for (var i = 0; i < draggies.length; i++) {
        draggies[i] = null;
    }
}

export default draggie;
