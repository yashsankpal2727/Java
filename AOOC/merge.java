public class merge {
    public static void main(String[] args) {
        int[] array1 = {1, 3, 5, 7,10};
        int[] array2 = {2, 4, 6, 8,9};

        int[] mergedArray = mergeSortedArrays(array1, array2);

        System.out.println("Merged array:");
        for (int num : mergedArray) {
            System.out.print(num + " ");
        }
    }

    public static int[] mergeSortedArrays(int[] array1, int[] array2) {
        int[] mergedArray = new int[array1.length + array2.length];
        
        int i = 0, j = 0, k = 0;

        while (i < array1.length && j < array2.length) {
            if (array1[i] <= array2[j]) {
                mergedArray[k++] = array1[i++];
            } else {
                mergedArray[k++] = array2[j++];
            }
        }


        return mergedArray;
    }
}