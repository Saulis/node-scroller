
/// <reference path="jquery.d.ts" />

class NodeScroller {
    private current = 0;
    private nodeIds = [];

    constructor(nodes : NodeList) {
        for(var i = 0; i < nodes.length; i++) {
            this.nodeIds[i] = nodes.item(i).id;
        }

    }

    private getNode(id: string) : JQuery {
        return $("#" + id);
    }

    private getCurrentNode() : JQuery {
        var currentNodeId = this.nodeIds[this.current];

        return this.getNode(currentNodeId);
    }

    private hasPrevious() : bool {
        return this.current > 0;
    }

    private getPrevious() : string {
        return this.nodeIds[--this.current];
    }

    private hasNext() : bool {
        return this.current < this.nodeIds.length - 1;
    }

    private currentBottomIsVisible() : bool {
        var currentNode = this.getCurrentNode();

        var bottom = $(window).scrollTop() + $(window).height();

        return bottom - 100 > currentNode.position().top + currentNode.height();
    }

    private currentTopIsVisible() : bool {
        var currentNode = this.getCurrentNode();

        var top = $(window).scrollTop();

        return top < currentNode.position().top;
    }

    private getNext() : string {
        return this.nodeIds[++this.current];
    }

    scrollToPrevious() {
        if(this.hasPrevious() && this.currentTopIsVisible()) {
            this.scrollTo(this.getPrevious());
        }
    }

    scrollToNext() {
        if(this.hasNext() && this.currentBottomIsVisible()) {
            this.scrollTo(this.getNext());
        }
    }

    private scrollTo(id : string) {
        var position = this.getNode(id).position().top;

        $(document.body).animate({
           scrollTop:   position
        }, 250);
    }

    handleOnKeyUp(e: Event) {
        switch(e.keyCode) {
            case 40: //arrow down
                this.scrollToNext();
                return;
            case 38: //arrow up
                this.scrollToPrevious();
                return;
        }
    }
}

class ParagraphScroller extends NodeScroller {
    constructor () {
        super(document.body.getElementsByTagName("p"));
    }
}

$(document).ready(function () {
    var scroller = new ParagraphScroller();

    document.onkeyup = e => scroller.handleOnKeyUp(e);

});
