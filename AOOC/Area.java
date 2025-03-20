import java.util.Scanner;

class Rectangle {  
    double length, breadth;

    void setDim(double length, double breadth) {
        this.length = length;
        this.breadth = breadth;
    }

    double getArea() {
        return length * breadth;
    }
}

public class Area {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Rectangle rect = new Rectangle();

        System.out.print("Enter length: ");
        double length = sc.nextDouble();

        System.out.print("Enter breadth: ");
        double breadth = sc.nextDouble();

        rect.setDim(length, breadth);
        System.out.println("Area: " + rect.getArea()); 

        sc.close();
    }
}
