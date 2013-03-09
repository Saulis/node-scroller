
/// <reference path="jquery.d.ts" />

class NodeScroller {
    private current = 0;
    private nodeIds = [];

    constructor(nodes : NodeList) {
        for(var i = 0; i < nodes.length; i++) {
            this.nodeIds[i] = nodes.item(i).id;
        }

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

    private getNext() : string {
        return this.nodeIds[++this.current];
    }

    scrollToPrevious() {
        if(this.hasPrevious()) {
            this.scrollTo(this.getPrevious());
        }
    }

    scrollToNext() {
        if(this.hasNext()) {
            this.scrollTo(this.getNext());
        }
    }

    private scrollTo(id : string) {
        var position = $("#" + id).position().top;
        $(document).scrollTop(position);
    }

    handleOnKeyUp(e: Event) {
        switch(e.keyCode) {
            case 40:
                this.scrollToNext();
                return;
            case 38:
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
