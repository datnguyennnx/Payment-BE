export class Node<T> {
  value: T
  next: Node<T> | null
  prev: Node<T> | null
  constructor() {
    this.value = this.value
    this.next = null;
    this.prev = null;
  }
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
    
    addFirst(value: T){
       if(this.isEmpty()){
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

    addLast(value: T){
       if(this.isEmpty()){
          let tmp = new Node();
          tmp.value = value;
          this.head = tmp;
          this.tail = tmp;
          this.size++;
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

    printAllEmail(): void {
      let curr = this.head;
      let index = 1
      while (curr) {
        console.log( index, " " , curr.value._email);
        index++
        curr = curr.next;
      }
    }

    getNodeValue(index: any) {
        if (index < 0 || index >= this.length) {
          return null;
        }
        let current = this.head;
        let count = 0;
        while (count < index) {
          current = current.next;
          count++;
        }
        return current.value;
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

    indexOf(value: T) {
        if(this.isEmpty()) {
            return  -1;
        }
        let index = 0;
        let tmp = this.head;
        while(tmp != null) {
            if(tmp.value === value) {
                return value;
            }
            tmp = tmp.next;
            index++;
        }
        return "Value is not exit";
    }
    bubbleSort(start) {
      var swapped;
      var ptr1;
      var lptr = null;

      // Checking for empty list
      if (start == null) return null;

      do {
        swapped = 0;
        ptr1 = start;

        while (ptr1.next != lptr) {
          if (ptr1.value._balance > ptr1.next.value._balance) {
            var t = ptr1.value._balance
            ptr1.value._balance = ptr1.next.value._balance
            ptr1.next.value._balance = t
            swapped = 1;
          }
          ptr1 = ptr1.next;
        }
        lptr = ptr1;
      } while (swapped != 0);
      return start;
    }
  }