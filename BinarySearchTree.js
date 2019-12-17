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
        } else if (key < this.key) {
            if (this.left === null) {
                this.left = new BinarySearchTree(key, value, this);
            } else {
                this.left.insert(key, value);
            }
        } else {
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
        } else if (key < this.key && this.left) {
            return this.left.find(key);
        } else if (key > this.key && this.right) {
            return this.right.find(key);
        } else {
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
            } else if (this.left) {
                this._replaceWith(this.left);
            } else if (this.right) {
                this._replaceWith(this.right);
            } else {
                this._replaceWith(null);
            }
        } else if (key < this.key && this.left) {
            this.left.remove(key);
        } else if (key > this.key && this.right) {
            this.right.remove(key);
        } else {
            throw new Error('Key Error');
        }
    }

    _replaceWith(node) {
        if (this.parent) {
            if (this === this.parent.left) {
                this.parent.left = node;
            } else if (this === this.parent.right) {
                this.parent.right = node;
            }

            if (node) {
                node.parent = this.parent;
            }
        } else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            } else {
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
//          2     6
//               / \
//              5   9
//                 /
//                7

// if we were to remove the root here, it would look to the 
// minimum value on the right side of a BST is the node in its leftmost subtree.
// so 4 would become the root value here.


//           E
//         /   \
//        A     S
//              /\
//             Q    Y
//            /\    /\
//           E     U
//          /\    /\
//            I  S
//            /\  /\
//              O   T
//              /\
//             N

//here if we delete the root, the repacement value would be the second E.
//So Q's new left would be I instead of E.

function main() {
    let newNumbersTree = new BinarySearchTree();
    newNumbersTree.insert(3, 3);
    newNumbersTree.insert(1, 1);
    newNumbersTree.insert(4, 4);
    newNumbersTree.insert(6, 6);
    newNumbersTree.insert(9, 9);
    newNumbersTree.insert(2, 2);
    newNumbersTree.insert(5, 5);
    //newNumbersTree.insert(7, 7);
//newNumbersTree.remove(3,3);
//console.log(newNumbersTree);
//console.log(tree(newNumbersTree));
    //console.log(findHeight(newNumbersTree));
    //console.log(balanceBST(newNumbersTree))
    let newEasyQuestionTree = new BinarySearchTree();
    newEasyQuestionTree.insert('E');
    newEasyQuestionTree.insert('A');
    newEasyQuestionTree.insert('S');
    newEasyQuestionTree.insert('Y');
    newEasyQuestionTree.insert('Q');
    newEasyQuestionTree.insert('U');
    newEasyQuestionTree.insert('E');
    newEasyQuestionTree.insert('S');
    //newEasyQuestionTree.right.left._replaceWith(new BinarySearchTree('Z', null,newEasyQuestionTree.right.right ));
    //console.log(newEasyQuestionTree.right.left);
    newEasyQuestionTree.insert('I');
    newEasyQuestionTree.insert('O');
    newEasyQuestionTree.insert('N');
    //newEasyQuestionTree.remove('E');
    //console.log(balanceBST(newEasyQuestionTree))
    //console.log(balanceBST(newEasyQuestionTree));

    let newNumbersTree2 = new BinarySearchTree();
    newNumbersTree2.insert(10, 10);
    newNumbersTree2.insert(5, 5);
    newNumbersTree2.insert(4, 4);
    newNumbersTree2.insert(3, 3);
    newNumbersTree2.insert(2, 2);
    newNumbersTree2.insert(1, 1);
    console.log(sameBST([3, 5, 4, 6, 1, 0, 2], [3, 1, 5, 2, 4, 6, 0]))
    console.log(sameBST([3, 5, 4, 0, 1, 6, 2], [3, 1, 5, 2, 4, 6, 0]))
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
// the runtime would be o(n) because it must go through every node
// in the tree.

// if we pass in our new numbers tree (with key and value both equalling
// the number) then we should get back a result of 37 (prior to removing the root).
// as the function will add each value together.

function tree(t) {
    if (!t) {
        return 0;
    }
    return tree(t.left) + t.value + tree(t.right);
}


//5. This code has a runtime of o(n) because it must run through every single node.
function findHeight(tree, tempHeight = 1, maxHeight = [0, 0]) {
    if (tempHeight >= maxHeight[0]) {
        maxHeight[0] = tempHeight;
    }
    if (tree.left && tree.right) {
        tempHeight += 1;
        findHeight(tree.right, tempHeight, maxHeight);
        findHeight(tree.left, tempHeight, maxHeight);
    } else if (tree.left) {
        tempHeight += 1;
        findHeight(tree.left, tempHeight, maxHeight);
    } else if (tree.right) {
        tempHeight += 1;
        findHeight(tree.right, tempHeight, maxHeight);
    }
    return maxHeight[0];
}

//6.
function isBST(tree, bool = [true]) {
    if (tree.left && tree.right) {
        if (tree.left.key > tree.right.key) {
            bool[0] = false;
        }
        isBST(tree.left, bool);
        isBST(tree.right, bool);
    } else if (tree.left) {
        if (tree.left.key > tree.key) {
            bool[0] = false
        }
        isBST(tree.left, bool);
    } else if (tree.right) {
        if (tree.right.key < tree.key) {
            bool[0] = false
        }
        isBST(tree.right, bool);
    }
    return bool[0];
}

//7.

function thirdLargestNode(tree, num = [0, 0, 0]) {
    if (tree.key > num[2]) {
        num[0] = num[1];
        num[1] = num[2];
        num[2] = tree.key
    } else if (tree.key > num[1]) {
        num[0] = num[1];
        num[1] = tree.key
    } else if (tree.key > num[0]) {
        num[0] = tree.key;
    }
    if (tree.left && tree.right) {
        thirdLargestNode(tree.left, num);
        thirdLargestNode(tree.right, num);
    } else if (tree.left) {
        thirdLargestNode(tree.left, num);
    } else if (tree.right) {
        thirdLargestNode(tree.right, num);
    }
    return num[0];
}

//.8
//                       5
//                    /    \
//                   3      9
//                  / \    /  \
//                 1   2  7   10
//                /
//               0
//
//
//
//
//
function balanceBST(tree) {
    let bool = false;
    if (tree.parent === null) {
        let right = findHeight(tree.right);
        let left = findHeight(tree.left)
        if (left > right) {
            bool = (left - right) <= 1
        } else {
            bool = (right - left) <= 1
        }
    }
    return bool;
}

//.9 [3, 5, 4, 6, 1, 0, 2]    [3, 1, 5, 2, 4, 6, 0]
//
//
//                    3
//                  /   \
//                 1     5
//                / \   / \
//               0   2 4   6
//
//[3, 5, 4, 0, 1, 6, 2]
//                    3
//                  /   \
//                 0     5
//                  \   / \
//                   1 4   6
//                    \
//                     2
function sameBST(arr, arr2) {
    if (arr[0] !== arr2[0] || arr.length !== arr2.length) {
        return false;
    }
    if( arr.length === 0 ) {
        return true;
    }
    let leftArr = [[],[]];
    let rightArr = [[],[]];

    for (let i = 1; i < arr.length; i++) {
        if (arr[0] > arr[i]) {
            leftArr[0].push(arr[i]);
        } else {
            rightArr[0].push(arr[i]);
        }
        if (arr2[0] > arr2[i]) {
            leftArr[1].push(arr2[i])
        }else {
            rightArr[1].push(arr2[i]);
        }
    }
    return (sameBST(leftArr[0], leftArr[1]) && sameBST(rightArr[0], rightArr[1]));

}