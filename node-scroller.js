var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var NodeScroller = (function () {
    function NodeScroller(nodes) {
        this.current = 0;
        this.nodeIds = [];
        for(var i = 0; i < nodes.length; i++) {
            this.nodeIds[i] = nodes.item(i).id;
        }
    }
    NodeScroller.prototype.getNode = function (id) {
        return $("#" + id);
    };
    NodeScroller.prototype.getCurrentNode = function () {
        var currentNodeId = this.nodeIds[this.current];
        return this.getNode(currentNodeId);
    };
    NodeScroller.prototype.hasPrevious = function () {
        return this.current > 0;
    };
    NodeScroller.prototype.getPrevious = function () {
        return this.nodeIds[--this.current];
    };
    NodeScroller.prototype.hasNext = function () {
        return this.current < this.nodeIds.length - 1;
    };
    NodeScroller.prototype.windowBottomIsUnderCurrentNode = function () {
        var currentNode = this.getCurrentNode();
        var windowBottomPosition = $(window).scrollTop() + $(window).height();
        var currentNodeBottomPosition = currentNode.position().top + currentNode.height();
        var bottomMargin = 100;
        return windowBottomPosition - bottomMargin > currentNodeBottomPosition;
    };
    NodeScroller.prototype.windowTopIsOverCurrentNode = function () {
        var currentNode = this.getCurrentNode();
        var windowTopPosition = $(window).scrollTop();
        var currentNodeTopPosition = currentNode.position().top;
        return windowTopPosition < currentNodeTopPosition;
    };
    NodeScroller.prototype.getNext = function () {
        return this.nodeIds[++this.current];
    };
    NodeScroller.prototype.canScrollToPrevious = function () {
        return this.hasPrevious() && this.windowTopIsOverCurrentNode();
    };
    NodeScroller.prototype.canScrollToNext = function () {
        return this.hasNext() && this.windowBottomIsUnderCurrentNode();
    };
    NodeScroller.prototype.scrollToPrevious = function () {
        if(this.canScrollToPrevious()) {
            this.scrollTo(this.getPrevious());
        }
    };
    NodeScroller.prototype.scrollToNext = function () {
        if(this.canScrollToNext()) {
            this.scrollTo(this.getNext());
        }
    };
    NodeScroller.prototype.scrollTo = function (id) {
        var position = this.getNode(id).position().top;
        $(document.body).animate({
            scrollTop: position
        }, 250);
    };
    NodeScroller.prototype.handleOnKeyUp = function (e) {
        switch(e.keyCode) {
            case 40:
                this.scrollToNext();
                return;
            case 38:
                this.scrollToPrevious();
                return;
        }
    };
    return NodeScroller;
})();
var ParagraphScroller = (function (_super) {
    __extends(ParagraphScroller, _super);
    function ParagraphScroller() {
        _super.call(this, document.body.getElementsByTagName("p"));
    }
    return ParagraphScroller;
})(NodeScroller);
$(document).ready(function () {
    var scroller = new ParagraphScroller();
    document.onkeyup = function (e) {
        return scroller.handleOnKeyUp(e);
    };
});
//@ sourceMappingURL=node-scroller.js.map
