
class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
    }

    else if (key < this.key) {
      if (this.left === null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      else {
        this.left.insert(key, value);
      }
    }
    else {
      if (this.right === null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (this.key === key) {
      return this.value;
    }

    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      else if (this.left) {
        this._replaceWith(this.left);
      }
      else if (this.right) {
        this._replaceWith(this.right);
      }
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      }
      else if (this === this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }
  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}

//           3
//         /   \
//        1     4
//       / \   / \
//         2      6
//               / \
//              5   9
//                 / \
//                7

// if we were to remove the root here, it would look to the 
// minimum value on the right side of a BST is the node in its leftmost subtree.
// so 4 would become the root value here.


//           E
//         /   \
//        A     S
//              /\
//             Q   Y
//            /\   /\
//           E    U 
//          /\    /\
//            I   S  
//            /\  /\
//              O   T
//              /\
//             N

//here if we delete the root, the repacement value would be the second E.
//So Q's new left would be I instead of E.

function main(){
let newNumbersTree = new BinarySearchTree();
newNumbersTree.insert(3,3);
newNumbersTree.insert(1,1);
newNumbersTree.insert(4,4);
newNumbersTree.insert(6,6);
newNumbersTree.insert(9,9);
newNumbersTree.insert(2,2);
newNumbersTree.insert(5,5);
newNumbersTree.insert(7,7);
//newNumbersTree.remove(3,3);
//console.log(newNumbersTree);
console.log(tree(newNumbersTree));

  let newEasyQuestionTree = new BinarySearchTree();
  newEasyQuestionTree.insert('E');
  newEasyQuestionTree.insert('A');
  newEasyQuestionTree.insert('S');
  newEasyQuestionTree.insert('Y');
  newEasyQuestionTree.insert('Q');
  newEasyQuestionTree.insert('U');
  newEasyQuestionTree.insert('E');
  newEasyQuestionTree.insert('S');
  newEasyQuestionTree.insert('T');
  newEasyQuestionTree.insert('I');
  newEasyQuestionTree.insert('O');
  newEasyQuestionTree.insert('N');
  newEasyQuestionTree.remove('E');
  //console.log(newEasyQuestionTree.right.left);
}


main();


//4. this code takes in a BST to calculate the combined 
//values of all the nodes in the tree.
// if the tree does not exist !t - the 
//tree will return 0, signifying
// that the value of the tree is 0.
//  otherwise, it recursively calls itself 
// and adds to the value of each node in every branch.
// it goes down both the left and right branches.
// if we pass in our new numbers tree (with key and value both equalling
// the number) then we should get back a result of 37 (prior to removing the root).
// as the function will add each value together.

function tree(t){
  if(!t){
      return 0;
  }
  return tree(t.left) + t.value + tree(t.right);
}
