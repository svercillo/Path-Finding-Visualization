class Node {
    public Map<Pair, Integer> set = new HashMap<>();
    public Pair last;
    
    public Node(Map<Pair, Integer> s, Pair l){
        set = s;
        last =l;
    }
    
    @Override 
    public String toString(){
        return last + ":     " + set; 
    }
}

class Solution {
    public int COUNT =1;
    // public Set<Set<Pair>> paths = new HashSet<>();
    public Stack<Node> stack = new Stack<>();
    public int numways =0;
    public int[][] grid;
    
    public int uniquePathsWithObstacles(int[][] grid){
        if (grid[0][0] == 1) return 0;
        this.grid = grid;

        Map<Pair, Integer> s = new HashSet<>();
        s.put(new Pair(0,0), 0);
        Node node = new Node(s, new Pair(0,0));
        this.traverse(node);
        return numways;
    }
    
    public void traverse(Node path){
        List<Pair> valid = new ArrayList<>();
        int i = (int) path.last.getKey();
        int j = (int) path.last.getValue();

        
        
        if (i ==this.grid.length-1 && j == this.grid[0].length-1){
            if (this.grid[i][j] == 0){
                System.out.println(path.set);
                numways ++;
            }
            return;
        }

        // up
        if (i-1 >= 0){
            if (this.grid[i-1][j] ==0){
                Pair next = new Pair(i-1, j);
                if (path.set.get(next) == null) valid.add(next);
            }
        }
        
        // down
        if (i+1< this.grid.length){
            if (this.grid[i+1][j] ==0){
                Pair next = new Pair(i+1, j);
                if (path.set.get(next) == null) valid.add(next);
            }
        }
        
        // left 
        if (j-1 >= 0){
            if (this.grid[i][j-1] ==0){
                Pair next = new Pair(i, j-1);
                if (path.set.get(next) == null) valid.add(next);
            }
        }
            
        // right
        if (j +1< this.grid[0].length){
            if (this.grid[i][j+1] ==0){
                Pair next = new Pair (i, j+1);
                if (path.set.get(next) == null) valid.add(next);
            }
        }


        if (valid.size() == 0){
            return;
        }

        
        // Pair pair = valid.get(valid.size()-1);  
        // valid.remove(valid.size()-1);
        for (Pair p : valid){    
            Map<Pair, Integer> set = new HashMap<>(path.set);
            set.put(p, path.set.get(path.last)+1);
            Node n = new Node(set, p);
            this.traverse(n);
        }
        // path.set.add(pair);
        // Node n = new Node(path.set, pair);
        // this.traverse(n);
    }
}
