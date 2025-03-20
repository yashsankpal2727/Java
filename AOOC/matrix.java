
import java.util.Scanner;

public class matrix {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Input matrices
        int[][] matrix1 = new int[2][2];
        int[][] matrix2 = new int[2][2];

        System.out.println("Enter elements of the first 2x2 matrix:");
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                matrix1[i][j] = scanner.nextInt();
            }
        }

        System.out.println("Enter elements of the second 2x2 matrix:");
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                matrix2[i][j] = scanner.nextInt();
            }
        }

        System.out.println("Choose an operation:");
        System.out.println("1. Addition");
        System.out.println("2. Multiplication");
        System.out.println("3. Transpose of the first matrix");
        int choice = scanner.nextInt();

        switch (choice) {
            case 1:
                int[][] additionResult = addMatrices(matrix1, matrix2);
                System.out.println("Result of addition:");
                printMatrix(additionResult);
                break;
            case 2:
                int[][] multiplicationResult = multiplyMatrices(matrix1, matrix2);
                System.out.println("Result of multiplication:");
                printMatrix(multiplicationResult);
                break;
            case 3:
                int[][] transposeResult = transposeMatrix(matrix1);
                System.out.println("Transpose of the first matrix:");
                printMatrix(transposeResult);
                break;
            default:
                System.out.println("Invalid choice");
        }

        scanner.close();
    }

    public static int[][] addMatrices(int[][] matrix1, int[][] matrix2) {
        int[][] result = new int[2][2];
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                result[i][j] = matrix1[i][j] + matrix2[i][j];
            }
        }
        return result;
    }

    public static int[][] multiplyMatrices(int[][] matrix1, int[][] matrix2) {
        int[][] result = new int[2][2];
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                for (int k = 0; k < 2; k++) {
                    result[i][j] += matrix1[i][k] * matrix2[k][j];
                }
            }
        }
        return result;
    }

    public static int[][] transposeMatrix(int[][] matrix) {
        int[][] result = new int[2][2];
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                result[j][i] = matrix[i][j];
            }
        }
        return result;
    }

    public static void printMatrix(int[][] matrix) {
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
    }
}