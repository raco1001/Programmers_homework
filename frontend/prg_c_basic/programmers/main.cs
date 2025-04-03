using System;



class Program {
    static int Add(int a){
	    return a + 1;
    }

    delegate int AddDelegate(int a);
    
    static void Main(string[] args) {
        Console.WriteLine(Add(1));

        AddDelegate addDelegate = a => a + 1;

        Console.WriteLine(addDelegate(1));
    }
}