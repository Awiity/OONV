public interface IPrototype{public IPrototype Clone();}

public class Student : IPrototype{
    private int _Age;
    private string _Name;
    private string _IdInfo;


    public Student(int age, string name, string idInfo){
        this._Age = age;
        this._Name = name;
        this._IdInfo = idInfo;
    }

    public IPrototype Clone(){
        return new Student(_Age, _Name, _IdInfo);
    }
    public int Age{ get { return _Age;}}
    public string Name{ get { return _Name;}}
    public string IdInfo{ get { return _IdInfo;}}
    
}
public class Program{
    public static void Main(){
        Student student = new Student(18, "John Doe", "1234567890");
        Student clonedStudent = (Student) student.Clone();

        Console.WriteLine($" Name: {clonedStudent.Name},\n Age: {clonedStudent.Age},\n Id: {clonedStudent.IdInfo}.");

    }
}