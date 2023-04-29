import { AccountUser } from "./Account";

export class Node<T> {
  value: AccountUser | undefined;
  next: Node<T> | null;
  prev: Node<T> | null;
}


export class DoubleLinkedList<T> {
    head: Node<T> | null;
    tail: Node<T> | null;
    size = 0;
    constructor() {
      this.head = null;
      this.tail = null;
      this.size = 0;
    }
    
    addFirst(value: AccountUser){
       if(this.isEmpty())
       {
           let tmp = new Node();
           tmp.value = value;
           this.head = tmp;
           this.tail = tmp;
           this.size++;
       } else {
           let tmp = new Node();
           tmp.next = this.head;
           tmp.prev = null;
           tmp.value = value;
           this.head.prev = tmp;
           this.head = tmp;
           this.size++;
       }
   }

    addLast(value: AccountUser){
       if(this.isEmpty()){
           let tmp = new Node();
           this.head = tmp;
           this.tail = tmp;
           this.size++;
           return;
       } else {
           let tmp = new Node();
           tmp.next = null;
           tmp.prev = this.tail;
           tmp.value = value;
           this.tail.next = tmp;
           this.tail = tmp;
           this.size++;
       }
   }    


    isEmpty(): boolean {
       return this.size <= 0;
    }
  
    length(): number {
      return this.size;
    }
    
    printAll(): void {
      let curr = this.head;
      while (curr) {
        console.log(curr.value);
        curr = curr.next;
      }
    }

    removeFirst() {
       if(this.isEmpty()) {
           return;
       }
       if(this.size == 1) {
           this.head = null;
           this.tail = null;
           this.size--;
       } else {
           this.head = this.head.next;
           this.head.prev = null;
           this.size--;
       }
   }

    removeLast() {
       if(this.isEmpty()) {
           return;
       }
       if(this.size == 1) {
           this.head = null;
           this.tail = null;
           this.size--;
       } else {
           this.tail = this.tail.prev;
           this.tail.next = null;
           this.size--;
       }
   }

    traverse() {
      let current = this.head;
      while (current != null) {
        console.log(current);
        current = current.next;
      }
    }

    public indexOf(value: AccountUser) {
        if(this.isEmpty()) {
            return  -1;
        }
        let index = 0;
        let tmp = this.head;
        while(tmp != null) {
            if(tmp.value === value) {
                return index;
            }
            tmp = tmp.next;
            index++;
        }
        return "Value is not exit";
    }
  }