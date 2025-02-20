public class Foreach {

    public static int findMax(int[] n) {
        int max = n[0];

        for(int n1: n) {
            if(n1 > max) {
                max = n1;
            }
        }
        return max;
    }
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        int[] n = {125, 132, 95, 116, 110};
        for(int e: arr) {
            System.out.println(e + " ");
    }
        System.out.println(findMax(n));
    }
}