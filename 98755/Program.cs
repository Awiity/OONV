/*



*/

public interface GUIFactory{
    public Button createButton();
    public CheckBox createCheckBox();
}

public class MacFactory : GUIFactory{
    public Button createButton(){
        return new MacButton();
    }
    public CheckBox createCheckBox(){
        return new MacCheckBox();
    }
}
public class WinFactory : GUIFactory{
    public Button createButton(){
        return new WinButton();
    }
    public CheckBox createCheckBox(){
        return new WinCheckBox();
    }
}

public interface Button{
    public void paint();
}

public class MacButton : Button {
    public void paint(){Console.WriteLine("*MacOS styled Button*");}
}
public class WinButton : Button {
    public void paint(){Console.WriteLine("*WinOS styled Button*");}
}

public interface CheckBox{
    public void paint();
}

public class MacCheckBox : CheckBox {
    public void paint(){Console.WriteLine("*MacOS styled CheckBox*");}
}
public class WinCheckBox : CheckBox {
    public void paint(){Console.WriteLine("*WinOS styled CheckBox*");}
}

class Application{
    private GUIFactory? _factory;
    private Button? _button;
    private CheckBox? _checkBox;
    public Application(GUIFactory factory){
        this._factory = factory;
    }
    public void createUI(){
        this._button = this._factory.createButton();
        this._checkBox = this._factory.createCheckBox();
    }
    public void render(){
        if (_button != null || _checkBox != null){
            _button.paint();
            _checkBox.paint();
        }
    }
}

public class Program{
    public static void Main(){
        WinFactory factoryWin = new WinFactory();
        MacFactory factoryMac = new MacFactory();

        Application appka2 = new Application(factoryMac);
        Application appka = new Application(factoryWin);
        appka.createUI();
        appka2.createUI();
        appka.render();
        appka2.render();

    }
}