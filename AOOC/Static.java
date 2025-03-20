public class Static {

    static int count = 0;       // Static Variable

    static {        // Static block 
        System.out.println("Static block executed. Initializing count..");
        count = 10;
    }

    static void displayCount() {        // static method 
        System.out.println("Count value: " +count);
    }

    Static() {      // Constructor
        count++;
        System.out.println("Constructor executed, Updated count: " +count);
    }
    public static void main(String[] args) {

        Static.displayCount();
        
        Static obj1 = new Static();
        Static obj2 = new Static();

        Static.displayCount();
    }
}
