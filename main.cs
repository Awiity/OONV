using System;
using System.Collections.Generic;

public class Character{
    public int Atk{get;private set;}
    public int Hp{get;private set;}
    public int Def{get;private set;}
    
    public Character(){
        Random random = new Random();
        this.Hp = random.Next(10, 20);
        this.Atk = random.Next(2, 4);
        this.Def = random.Next(1, 2);
    }
    public void Attack(Character enemy){
        Random random = new Random();
        int damage = this.Atk - random.Next(0, enemy.Def);
        enemy.TakeDamage(damage);
    }
    public void TakeDamage(int damageTaken){
        if (damageTaken >= this.Hp){
            this.Hp = 0;
            this.Die();
        }
        else {
            this.Hp = this.Hp - damageTaken;
        }
    }
    public void Die(){
        Console.WriteLine("DEATH");
    }

}
public class Hero: Character{
    public int actionP{get;private set;}
    public int level{get;private set;}
    public int exp{get;private set;}
    public int reqExp{get;private set;}

    public Dictionary<string, int> Skills {get; private set;}

    public string nameHero = "None";

    public Hero(string name = "Stas"){
        Random rand = new Random();
        this.nameHero = name;
        this.actionP = rand.Next(1, 5);
        this.level = 1;
        this.exp = 0;
        this.reqExp = 10;
        this.Skills = new Dictionary<string, int>(){
            {"Cleave",1},
            {"Ice Nova",2},
            {"Multistrike",3}
        };
    }
    
    
}

public class Goblin: Character{
    public int expOnDeath{get;private set;}

    public Goblin(){
        Random rand = new Random();
        this.expOnDeath = rand.Next(5, 10);
    }
}
public class Battle{
    public Goblin[] Goblins;
    public void GenerateEnemies(){
        Random rand = new Random();
        for(int i = 0; i < rand.Next(2,4); i++){
            Goblins[i] = new Goblin();
        }
        
    }

    public void StartBattle(Goblin[] goblins, Hero[] heroes){

        while(true){
            
            foreach(var item in heroes){
                Console.WriteLine($"{item.nameHero}, {item.actionP}");
            }
            Console.WriteLine("VS.");
            foreach(var item in goblins){
                Console.WriteLine($"Goblin, {item.expOnDeath}, {item.Atk}");
            }
            Console.ReadLine();
        }
    }
}
public class Program {
    public static void Main(){
        Hero hero1 = new Hero("Stasyan");
        Hero hero2 = new Hero("Sasha");
        Hero[] heroes = new [] {hero1, hero2};
        Goblin[] tempGob = new [] {new Goblin(), new Goblin()};
        

        Battle battle1 = new Battle();

        battle1.StartBattle(tempGob, heroes);
    }
}