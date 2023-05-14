"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoubleLinkedList = exports.Node = void 0;
var Node = /** @class */ (function () {
    function Node() {
        this.value = this.value;
        this.next = null;
        this.prev = null;
    }
    return Node;
}());
exports.Node = Node;
var DoubleLinkedList = /** @class */ (function () {
    function DoubleLinkedList() {
        this.size = 0;
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    DoubleLinkedList.prototype.addFirst = function (value) {
        if (this.isEmpty()) {
            var tmp = new Node();
            tmp.value = value;
            this.head = tmp;
            this.tail = tmp;
            this.size++;
        }
        else {
            var tmp = new Node();
            tmp.next = this.head;
            tmp.prev = null;
            tmp.value = value;
            this.head.prev = tmp;
            this.head = tmp;
            this.size++;
        }
    };
    DoubleLinkedList.prototype.addLast = function (value) {
        if (this.isEmpty()) {
            var tmp = new Node();
            tmp.value = value;
            this.head = tmp;
            this.tail = tmp;
            this.size++;
        }
        else {
            var tmp = new Node();
            tmp.next = null;
            tmp.prev = this.tail;
            tmp.value = value;
            this.tail.next = tmp;
            this.tail = tmp;
            this.size++;
        }
    };
    DoubleLinkedList.prototype.isEmpty = function () {
        return this.size <= 0;
    };
    DoubleLinkedList.prototype.length = function () {
        return this.size;
    };
    DoubleLinkedList.prototype.printAll = function () {
        var curr = this.head;
        while (curr) {
            console.log(curr.value);
            curr = curr.next;
        }
    };
    DoubleLinkedList.prototype.printAllEmail = function () {
        var curr = this.head;
        var index = 1;
        while (curr) {
            console.log(index, " ", curr.value._email);
            index++;
            curr = curr.next;
        }
    };
    DoubleLinkedList.prototype.getNodeValue = function (index) {
        if (index < 0 || index >= this.length) {
            return null;
        }
        var current = this.head;
        var count = 0;
        while (count < index) {
            current = current.next;
            count++;
        }
        return current.value;
    };
    DoubleLinkedList.prototype.removeFirst = function () {
        if (this.isEmpty()) {
            return;
        }
        if (this.size == 1) {
            this.head = null;
            this.tail = null;
            this.size--;
        }
        else {
            this.head = this.head.next;
            this.head.prev = null;
            this.size--;
        }
    };
    DoubleLinkedList.prototype.removeLast = function () {
        if (this.isEmpty()) {
            return;
        }
        if (this.size == 1) {
            this.head = null;
            this.tail = null;
            this.size--;
        }
        else {
            this.tail = this.tail.prev;
            this.tail.next = null;
            this.size--;
        }
    };
    DoubleLinkedList.prototype.traverse = function () {
        var current = this.head;
        while (current != null) {
            console.log(current);
            current = current.next;
        }
    };
    DoubleLinkedList.prototype.indexOf = function (value) {
        if (this.isEmpty()) {
            return -1;
        }
        var index = 0;
        var tmp = this.head;
        while (tmp != null) {
            if (tmp.value === value) {
                return value;
            }
            tmp = tmp.next;
            index++;
        }
        return "Value is not exit";
    };
    DoubleLinkedList.prototype.bubbleSort = function (start) {
        var swapped;
        var ptr1;
        var lptr = null;
        // Checking for empty list
        if (start == null)
            return null;
        do {
            swapped = 0;
            ptr1 = start;
            while (ptr1.next != lptr) {
                if (ptr1.value._balance > ptr1.next.value._balance) {
                    var t = ptr1.value._balance;
                    ptr1.value._balance = ptr1.next.value._balance;
                    ptr1.next.value._balance = t;
                    swapped = 1;
                }
                ptr1 = ptr1.next;
            }
            lptr = ptr1;
        } while (swapped != 0);
        return start;
    };
    return DoubleLinkedList;
}());
exports.DoubleLinkedList = DoubleLinkedList;
