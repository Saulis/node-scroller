
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

    private windowBottomIsUnderCurrentNode() : bool {
        var currentNode = this.getCurrentNode();

        var windowBottomPosition = $(window).scrollTop() + $(window).height();
        var currentNodeBottomPosition = currentNode.position().top + currentNode.height();
        var bottomMargin = 100;

        return windowBottomPosition - bottomMargin > currentNodeBottomPosition;
    }

    private windowTopIsOverCurrentNode() : bool {
        var currentNode = this.getCurrentNode();

        var windowTopPosition = $(window).scrollTop();
        var currentNodeTopPosition = currentNode.position().top;

        return windowTopPosition < currentNodeTopPosition;
    }

    private getNext() : string {
        return this.nodeIds[++this.current];
    }

    private canScrollToPrevious() : bool {
        return this.hasPrevious() && this.windowTopIsOverCurrentNode();
    }

    private canScrollToNext() : bool {
        return this.hasNext() && this.windowBottomIsUnderCurrentNode();
    }

    scrollToPrevious() {
        if(this.canScrollToPrevious()) {
            this.scrollTo(this.getPrevious());
        }
    }

    scrollToNext() {
        if(this.canScrollToNext()) {
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
