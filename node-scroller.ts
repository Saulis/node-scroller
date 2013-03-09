
/// <reference path="jquery.d.ts" />

class NodeScroller {
    private current = 0;
    private nodeIds = [];

    constructor(nodes : NodeList) {
        for(var i = 0; i < nodes.length; i++) {
            this.nodeIds[i] = nodes.item(i).id;
        }

    }

    hasPrevious() : bool {
        return this.current > 0;
    }

    getPrevious() : string {
        return this.nodeIds[--this.current];
    }

    hasNext() : bool {
        return this.current < this.nodeIds.length - 1;
    }

    getNext() : string {
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

    scrollTo(id : string) {
        var position = $("#" + id).position().top;
        $(document).scrollTop(position);
    }
}

$(document).ready(function (){
    var scroller = new NodeScroller(document.body.getElementsByTagName("p"));

    document.onkeyup = function(e: Event) {
        switch(e.keyCode) {
            case 40:
                scroller.scrollToNext();
                return;
            case 38:
                scroller.scrollToPrevious();
                return;
        }
    }
});
