// Employee class
class Employee {
    private String firstName;
    private String lastName;
    private double monthlySalary;

    // Constructor
    public Employee(String firstName, String lastName, double monthlySalary) {
        this.firstName = firstName;
        this.lastName = lastName;
        setMonthlySalary(monthlySalary); // Using setter to validate salary
    }

    // Getter and Setter for firstName
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    // Getter and Setter for lastName
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    // Getter and Setter for monthlySalary
    public double getMonthlySalary() {
        return monthlySalary;
    }

    public void setMonthlySalary(double monthlySalary) {
        if (monthlySalary > 0) {
            this.monthlySalary = monthlySalary;
        } else {
            this.monthlySalary = 0.0; // If negative, set to 0.0
        }
    }

    // Method to calculate yearly salary
    public double getYearlySalary() {
        return monthlySalary * 12;
    }

    // Method to give a 10% raise
    public void giveRaise() {
        this.monthlySalary *= 1.10; // Increase salary by 10%
    }
}

// Test class
public class EmployeeTest {
    public static void main(String[] args) {
        // Creating two Employee objects
        Employee emp1 = new Employee("yash", "sankpal", 5000);
        Employee emp2 = new Employee("raj", "patil", 7000);

        // Displaying initial yearly salaries
        System.out.println("Initial Yearly Salaries:");
        System.out.println(emp1.getFirstName() + " " + emp1.getLastName() + ": " + emp1.getYearlySalary());
        System.out.println(emp2.getFirstName() + " " + emp2.getLastName() + ": " + emp2.getYearlySalary());

        // Giving a 10% raise
        emp1.giveRaise();
        emp2.giveRaise();

        // Displaying updated yearly salaries after raise
        System.out.println("\nYearly Salaries After 10% Raise:");
        System.out.println(emp1.getFirstName() + " " + emp1.getLastName() + ": " + emp1.getYearlySalary());
        System.out.println(emp2.getFirstName() + " " + emp2.getLastName() + ": " + emp2.getYearlySalary());
    }
}
