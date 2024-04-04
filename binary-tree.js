/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;
    let depth = 0;
    let queue = [this.root];
    while (queue.length > 0) {
      depth += 1;
      let nextQueue = [];
      for (let node of queue) {
        if (!node.left && !node.right) return depth;
        if (node.left) nextQueue.push(node.left);
        if (node.right) nextQueue.push(node.right);
      }
      queue = nextQueue;
    }
    return depth;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth(node = this.root) {
    if (node === null) return 0;
    let leftDepth = this.maxDepth(node.left);
    let rightDepth = this.maxDepth(node.right);
    return Math.max(leftDepth, rightDepth) + 1;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSumHelper(node) {
    if (node === null) return 0;
    const leftSum = Math.max(0, this.maxSumHelper(node.left));
    const rightSum = Math.max(0, this.maxSumHelper(node.right));
    this.maxPathSum = Math.max(this.maxPathSum, node.val + leftSum + rightSum);
    return node.val + Math.max(leftSum, rightSum);
  }

  maxSum() {
    this.maxPathSum = -Infinity;
    this.maxSumHelper(this.root);
    return this.maxPathSum === -Infinity ? 0 : this.maxPathSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;
    let smallestAboveBound = null;
    let queue = [this.root];
    while (queue.length > 0) {
      let node = queue.shift();
      if (node.val > lowerBound && (smallestAboveBound === null || node.val < smallestAboveBound)) {
        smallestAboveBound = node.val;
      }
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return smallestAboveBound;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    function findDepthAndParent(node, target, depth = 0, parent = null) {
      if (!node) return null;
      if (node === target) return { depth, parent };

      let left = findDepthAndParent(node.left, target, depth + 1, node);
      if (left) return left;

      let right = findDepthAndParent(node.right, target, depth + 1, node);
      if (right) return right;

      return null;
    }

    const node1Info = findDepthAndParent(this.root, node1);
    const node2Info = findDepthAndParent(this.root, node2);

    if (!node1Info || !node2Info) return false;
    return node1Info.depth === node2Info.depth && node1Info.parent !== node2Info.parent;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {
    if (!this.root) return '';
    let result = [];
    let queue = [this.root];
    while (queue.length > 0) {
      let node = queue.shift();
      if (node) {
        result.push(node.val);
        queue.push(node.left);
        queue.push(node.right);
      } else {
        result.push('null');
      }
    }
    return result.join(' ');
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    if (!stringTree) return new BinaryTree();

    const values = stringTree.split(' ').map(val => val === "null" ? null : parseInt(val));
    let index = 0;

    const root = new BinaryTreeNode(values[index++]);
    const queue = [root];

    while (queue.length > 0) {
      const node = queue.shift();

      if (index < values.length) {
        const leftVal = values[index++];
        if (leftVal !== null) {
          node.left = new BinaryTreeNode(leftVal);
          queue.push(node.left);
        }
      }

      if (index < values.length) {
        const rightVal = values[index++];
        if (rightVal !== null) {
          node.right = new BinaryTreeNode(rightVal);
          queue.push(node.right);
        }
      }
    }

    return new BinaryTree(root);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    // Helper function to find the path from root to a given node
    function findPath(node, target, path) {
      if (!node) return false;

      path.push(node);

      if (node === target) return true;

      if ((node.left && findPath(node.left, target, path)) ||
        (node.right && findPath(node.right, target, path))) {
        return true;
      }

      path.pop();
      return false;
    }

    let path1 = [];
    let path2 = [];

    if (!findPath(this.root, node1, path1) || !findPath(this.root, node2, path2)) {
      return null;
    }

    let lca = null;
    for (let i = 0; i < Math.min(path1.length, path2.length); i++) {
      if (path1[i] === path2[i]) {
        lca = path1[i];
      } else {
        break;
      }
    }

    return lca;
  }

}

module.exports = { BinaryTree, BinaryTreeNode };
