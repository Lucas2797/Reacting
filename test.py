class Reimol():
    name1 = "caco"
    def __init__(self, name):
        self.name = name


class Faria(Reimol):
    sobrenome = "faria"

    def __init__(self, name, sobrenome1):
        super().__init__(name)
        self.sobrenome1 = sobrenome1

    def test(self):
        print(super().name1)
        print(self.name)
        print(self.sobrenome1)



test = {
    "a":2,
    "b":test["a"]    
    }



print(test(2))

Faria("lucas", "reimol").test()