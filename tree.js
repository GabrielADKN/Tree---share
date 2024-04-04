/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    function sumValuesInNode(node) {
      if (!node) return 0;
      let sum = node.val;
      for (let child of node.children) {
        sum += sumValuesInNode(child);
      }
      return sum;
    }
    return sumValuesInNode(this.root);
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    function countEvensInNode(node) {
      if (!node) return 0;
      let count = node.val % 2 === 0 ? 1 : 0;
      for (let child of node.children) {
        count += countEvensInNode(child);
      }
      return count;
    }

    return countEvensInNode(this.root);
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    function countGreater(node, lowerBound) {
      if (!node) return 0;
      let count = node.val > lowerBound ? 1 : 0;
      for (let child of node.children) {
        count += countGreater(child, lowerBound);
      }
      return count;
    }
    return countGreater(this.root, lowerBound);
  }
}

module.exports = { Tree, TreeNode };
